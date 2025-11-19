class CircuitLoader {
    constructor() {
        this.initializeOpenFunction();
    }

    initializeOpenFunction() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupOpenButton();
            });
        } else {
            this.setupOpenButton();
        }
    }

    setupOpenButton() {
        const openButton = this.findOpenButton();
        if (openButton) {
            openButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.openCircuitFile();
            });
        }
    }

    findOpenButton() {
        const navLinks = document.querySelectorAll('.droplist a');
        
        for (let link of navLinks) {
            if (link.textContent.trim() === '打开') {
                return link;
            }
        }
        return null;
    }

    openCircuitFile() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.xml';
        
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                this.loadCircuitFromFile(file);
            }
        });
        
        fileInput.click();
    }

    async loadCircuitFromFile(file) {
        try {
            const xmlContent = await this.readFileAsText(file);
            const circuitData = this.parseXML(xmlContent);
            await this.reconstructCircuit(circuitData);
            this.showNotification('电路文件加载成功！', 'success');
        } catch (error) {
            console.error('加载电路文件时出错:', error);
            this.showNotification('加载电路文件失败: ' + error.message, 'error');
        }
    }

    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('读取文件失败'));
            reader.readAsText(file);
        });
    }

    parseXML(xmlContent) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
        
        if (xmlDoc.documentElement.nodeName === 'parsererror') {
            throw new Error('XML格式无效');
        }

        const circuitData = {
            components: [],
            connections: []
        };

        // 解析组件
        const componentElements = xmlDoc.querySelectorAll('component');
        componentElements.forEach(componentEl => {
            const component = {
                id: componentEl.getAttribute('id'),
                type: componentEl.getAttribute('type'),
                position: {
                    x: parseFloat(componentEl.getAttribute('x')),
                    y: parseFloat(componentEl.getAttribute('y'))
                },
                properties: {}
            };

            // 解析属性
            const propertiesEl = componentEl.querySelector('properties');
            if (propertiesEl) {
                Array.from(propertiesEl.children).forEach(prop => {
                    const key = prop.tagName;
                    const value = prop.textContent;
                    
                    // 尝试解析为数字或布尔值
                    if (value === 'true') {
                        component.properties[key] = true;
                    } else if (value === 'false') {
                        component.properties[key] = false;
                    } else if (!isNaN(value) && value !== '') {
                        component.properties[key] = parseFloat(value);
                    } else {
                        component.properties[key] = value;
                    }
                });
            }

            circuitData.components.push(component);
        });

        // 解析连接
        const connectionElements = xmlDoc.querySelectorAll('connection');
        connectionElements.forEach(connectionEl => {
            const connection = {
                id: connectionEl.getAttribute('id'),
                type: connectionEl.getAttribute('type'),
                connectionType: connectionEl.getAttribute('connectionType') || 'anchor-to-anchor'
            };

            // 根据连接类型解析不同的属性
            if (connection.connectionType === 'anchor-to-anchor') {
                const sourceEl = connectionEl.querySelector('source');
                const targetEl = connectionEl.querySelector('target');
                
                if (sourceEl && targetEl) {
                    connection.source = {
                        componentId: sourceEl.getAttribute('componentId'),
                        anchorIndex: parseInt(sourceEl.getAttribute('anchorIndex'))
                    };
                    connection.target = {
                        componentId: targetEl.getAttribute('componentId'),
                        anchorIndex: parseInt(targetEl.getAttribute('anchorIndex'))
                    };
                }
            }

            // 保存路径数据
            const pathDataEl = connectionEl.querySelector('pathData');
            if (pathDataEl) {
                connection.pathData = pathDataEl.textContent;
            }

            circuitData.connections.push(connection);
        });

        return circuitData;
    }

    async reconstructCircuit(circuitData) {
        // 清空当前电路
        this.clearCircuit();

        // 重建组件
        for (const componentData of circuitData.components) {
            await this.createComponent(componentData);
        }

        // 等待组件完全加载
        await this.delay(100);

        // 重建连接
        for (const connectionData of circuitData.connections) {
            this.createConnection(connectionData);
        }

        // 初始化所有组件状态
        this.initializeAllComponentStates(circuitData.components);

        // 延迟更新状态以确保所有连接都已建立
        setTimeout(() => {
            this.updateAllComponentStates(circuitData.components);
        }, 200);
    }

    clearCircuit() {
        // 清空画布
        const canvas = document.getElementById('circuit-canvas');
        if (canvas) {
            canvas.innerHTML = '';
        }

        // 清空连线层
        const wireLayer = document.getElementById('wire-layer');
        if (wireLayer) {
            wireLayer.innerHTML = '';
        }

        // 重置全局状态
        if (window.wires) {
            window.wires.length = 0;
        }
        if (window.anchorConnections) {
            window.anchorConnections.clear();
        }
        if (window.sequentialElements) {
            window.sequentialElements.clear();
        }
        if (typeof componentStates !== 'undefined') {
            componentStates.clear();
        }
    }

    async createComponent(componentData) {
        const canvas = document.getElementById('circuit-canvas');
        if (!canvas) return;

        // 创建组件div
        const componentDiv = document.createElement('div');
        componentDiv.className = 'component';
        componentDiv.dataset.id = componentData.id;
        componentDiv.dataset.type = componentData.type;
        componentDiv.style.position = 'absolute';
        componentDiv.style.left = componentData.position.x + 'px';
        componentDiv.style.top = componentData.position.y + 'px';

        // 设置SVG内容
        if (window.componentSvgs && window.componentSvgs[componentData.type]) {
            componentDiv.innerHTML = window.componentSvgs[componentData.type];
        } else {
            console.warn(`组件类型 ${componentData.type} 的SVG定义未找到`);
            return;
        }

        canvas.appendChild(componentDiv);

        // 添加拖拽功能
        this.addDragFunctionality(componentDiv);

        // 初始化组件状态
        this.initializeComponentState(componentDiv, componentData);

        return componentDiv;
    }

    initializeComponentState(component, componentData) {
        const componentId = component.dataset.id;
        const type = component.dataset.type;

        // 确保全局状态映射存在
        if (typeof componentStates !== 'undefined') {
            componentStates.set(componentId, 0);
        }
        
        if (!window.sequentialElements) {
            window.sequentialElements = new Map();
        }

        // 根据组件类型初始化状态
        switch (type) {
            case 'input':
            case 'output':
                if (componentData.properties.state !== undefined) {
                    if (typeof componentStates !== 'undefined') {
                        componentStates.set(componentId, componentData.properties.state);
                    }
                    this.updateComponentDisplay(component, componentData.properties.state);
                }
                break;

            case 'clock':
                if (componentData.properties.active !== undefined) {
                    if (typeof componentStates !== 'undefined') {
                        componentStates.set(componentId, componentData.properties.active ? 1 : 0);
                    }
                    if (componentData.properties.active && typeof startClockSignal === 'function') {
                        startClockSignal(component);
                    }
                }
                break;

            case 'd-flipflop':
                if (componentData.properties.q !== undefined) {
                    window.sequentialElements.set(componentId, {
                        q: componentData.properties.q,
                        qBar: componentData.properties.qBar || (1 - componentData.properties.q),
                        lastD: componentData.properties.lastD || 0,
                        lastClock: componentData.properties.lastClock || 0
                    });
                    if (typeof updateDFlipFlopDisplay === 'function') {
                        updateDFlipFlopDisplay(component, componentData.properties.q, componentData.properties.qBar);
                    }
                }
                break;

            case 't-flipflop':
            case 'tp-flipflop':
            case 'jk-flipflop':
            case 'rs-latch':
                if (componentData.properties.q !== undefined) {
                    const state = {
                        q: componentData.properties.q,
                        qBar: componentData.properties.qBar || (1 - componentData.properties.q)
                    };
                    
                    // 添加特定组件的历史状态
                    if (componentData.properties.lastT !== undefined) state.lastT = componentData.properties.lastT;
                    if (componentData.properties.lastJ !== undefined) state.lastJ = componentData.properties.lastJ;
                    if (componentData.properties.lastK !== undefined) state.lastK = componentData.properties.lastK;
                    if (componentData.properties.lastR !== undefined) state.lastR = componentData.properties.lastR;
                    if (componentData.properties.lastS !== undefined) state.lastS = componentData.properties.lastS;
                    if (componentData.properties.lastClock !== undefined) state.lastClock = componentData.properties.lastClock;

                    window.sequentialElements.set(componentId, state);
                    
                    if (typeof updateSequentialDisplay === 'function') {
                        updateSequentialDisplay(component, state.q, state.qBar);
                    }
                }
                break;

            case 'counter':
                if (componentData.properties.count !== undefined) {
                    window.sequentialElements.set(componentId, {
                        count: componentData.properties.count,
                        bits: componentData.properties.bits || [0, 0, 0, 0],
                        lastReset: componentData.properties.lastReset || 0,
                        lastClock: componentData.properties.lastClock || 0
                    });
                    
                    if (typeof updateCounterDisplay === 'function') {
                        updateCounterDisplay(component, window.sequentialElements.get(componentId));
                    }
                }
                break;

            case 'half-subtractor':
            case 'full-subtractor':
                if (componentData.properties.state !== undefined && typeof componentStates !== 'undefined') {
                    componentStates.set(componentId, componentData.properties.state);
                    if (typeof updateSubtractorDisplay === 'function') {
                        updateSubtractorDisplay(component);
                    }
                }
                break;
        }
    }

    createConnection(connectionData) {
        if (connectionData.connectionType !== 'anchor-to-anchor') {
            console.warn('目前只支持anchor-to-anchor连接类型');
            return;
        }

        const sourceComponent = document.querySelector(`[data-id="${connectionData.source.componentId}"]`);
        const targetComponent = document.querySelector(`[data-id="${connectionData.target.componentId}"]`);

        if (!sourceComponent || !targetComponent) {
            console.warn('找不到连接的组件');
            return;
        }

        const sourceAnchors = Array.from(sourceComponent.querySelectorAll('.anchor'));
        const targetAnchors = Array.from(targetComponent.querySelectorAll('.anchor'));

        const sourceAnchor = sourceAnchors[connectionData.source.anchorIndex];
        const targetAnchor = targetAnchors[connectionData.target.anchorIndex];

        if (!sourceAnchor || !targetAnchor) {
            console.warn('找不到连接的锚点');
            return;
        }

        // 创建连线
        this.createWireBetweenAnchors(sourceAnchor, targetAnchor, connectionData.pathData);
    }

    createWireBetweenAnchors(startAnchor, endAnchor, pathData) {
        const wireLayer = document.getElementById('wire-layer');
        if (!wireLayer) return;

        // 获取锚点的绝对位置
        const startRect = startAnchor.getBoundingClientRect();
        const endRect = endAnchor.getBoundingClientRect();
        const canvasRect = document.getElementById('circuit-canvas').getBoundingClientRect();

        const startX = startRect.left + startRect.width / 2 - canvasRect.left;
        const startY = startRect.top + startRect.height / 2 - canvasRect.top;
        const endX = endRect.left + endRect.width / 2 - canvasRect.left;
        const endY = endRect.top + endRect.height / 2 - canvasRect.top;

        // 创建SVG路径
        const wire = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        wire.setAttribute('class', 'wire');
        wire.setAttribute('stroke', '#000');
        wire.setAttribute('stroke-width', '2');
        wire.setAttribute('fill', 'none');

        // 使用保存的路径数据或生成新的路径
        if (pathData) {
            wire.setAttribute('d', pathData);
        } else {
            const path = this.calculateBentPath(startX, startY, endX, endY);
            wire.setAttribute('d', path);
        }

        wireLayer.appendChild(wire);

        // 更新全局连接映射
        if (!window.wires) {
            window.wires = [];
        }
        if (!window.anchorConnections) {
            window.anchorConnections = new Map();
        }

        const wireObj = {
            start: startAnchor,
            end: endAnchor,
            line: wire
        };

        window.wires.push(wireObj);

        // 建立锚点连接关系
        if (!window.anchorConnections.has(startAnchor)) {
            window.anchorConnections.set(startAnchor, []);
        }
        if (!window.anchorConnections.has(endAnchor)) {
            window.anchorConnections.set(endAnchor, []);
        }

        window.anchorConnections.get(startAnchor).push(endAnchor);
        window.anchorConnections.get(endAnchor).push(startAnchor);
    }

    calculateBentPath(startX, startY, endX, endY) {
        const midX = (startX + endX) / 2;
        const cornerRadius = 10;
        
        if (Math.abs(startY - endY) < 5) {
            return `M ${startX} ${startY} L ${endX} ${endY}`;
        }
        
        if (startX < endX) {
            const corner1X = midX - cornerRadius;
            const corner1Y = startY;
            const corner2X = midX + cornerRadius;
            const corner2Y = endY;
            
            return `M ${startX} ${startY} L ${corner1X} ${corner1Y} Q ${midX} ${startY} ${midX} ${(startY + endY) / 2} Q ${midX} ${endY} ${corner2X} ${corner2Y} L ${endX} ${endY}`;
        } else {
            return `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
        }
    }

    addDragFunctionality(component) {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        const onMouseDown = (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialLeft = parseInt(component.style.left, 10) || 0;
            initialTop = parseInt(component.style.top, 10) || 0;
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            component.style.left = (initialLeft + deltaX) + 'px';
            component.style.top = (initialTop + deltaY) + 'px';
            
            this.updateComponentWires(component);
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        component.addEventListener('mousedown', onMouseDown);
    }

    updateComponentWires(component) {
        if (!window.wires) return;

        window.wires.forEach(wire => {
            if (wire.start && wire.start.closest('.component') === component ||
                wire.end && wire.end.closest('.component') === component) {
                this.updateWirePath(wire);
            }
        });
    }

    updateWirePath(wire) {
        if (!wire.start || !wire.end || !wire.line) return;

        const startRect = wire.start.getBoundingClientRect();
        const endRect = wire.end.getBoundingClientRect();
        const canvasRect = document.getElementById('circuit-canvas').getBoundingClientRect();

        const startX = startRect.left + startRect.width / 2 - canvasRect.left;
        const startY = startRect.top + startRect.height / 2 - canvasRect.top;
        const endX = endRect.left + endRect.width / 2 - canvasRect.left;
        const endY = endRect.top + endRect.height / 2 - canvasRect.top;

        const path = this.calculateBentPath(startX, startY, endX, endY);
        wire.line.setAttribute('d', path);
    }

    initializeAllComponentStates(components) {
        // 首先初始化所有组件的基本状态
        components.forEach(componentData => {
            const component = document.querySelector(`[data-id="${componentData.id}"]`);
            if (component) {
                this.initializeComponentState(component, componentData);
            }
        });
    }

    updateAllComponentStates(components) {
        // 延迟更新以确保所有连接都已建立
        setTimeout(() => {
            // 首先传播输入和时钟信号
            components.forEach(componentData => {
                const component = document.querySelector(`[data-id="${componentData.id}"]`);
                if (component) {
                    const type = componentData.type;
                    if (type === 'input' || type === 'clock') {
                        if (typeof propagateSignal === 'function') {
                            propagateSignal(component);
                        }
                    }
                }
            });

            // 然后处理时序和算术组件
            setTimeout(() => {
                components.forEach(componentData => {
                    const component = document.querySelector(`[data-id="${componentData.id}"]`);
                    if (component) {
                        const type = componentData.type;
                        if (type === 't-flipflop' || type === 'tp-flipflop' || 
                            type === 'jk-flipflop' || type === 'rs-latch' || type === 'counter') {
                            this.propagateSequentialOutputs(component, componentData);
                        } else if (type === 'counter') {
                            this.propagateCounterOutputs(component, componentData);
                        } else if (type === 'half-subtractor' || type === 'full-subtractor') {
                            this.propagateSubtractorOutputs(component, componentData);
                        }
                    }
                });
            }, 50);
        }, 100);
    }

    propagateSequentialOutputs(component, componentData) {
        if (!window.sequentialElements || !componentData.properties) return;

        const state = window.sequentialElements.get(componentData.id);
        if (!state) return;

        const outputAnchors = Array.from(component.querySelectorAll('.output-anchor'));
        outputAnchors.forEach((anchor, index) => {
            const outputValue = index === 0 ? state.q : state.qBar;
            if (typeof propagateToTarget === 'function') {
                propagateToTarget(anchor, outputValue);
            }
        });
    }

    propagateCounterOutputs(component, componentData) {
        if (!window.sequentialElements || !componentData.properties) return;

        const state = window.sequentialElements.get(componentData.id);
        if (!state) return;

        const outputAnchors = Array.from(component.querySelectorAll('.output-anchor'));
        outputAnchors.forEach((anchor, index) => {
            const outputValue = state.bits[index] || 0;
            if (typeof propagateToTarget === 'function') {
                propagateToTarget(anchor, outputValue);
            }
        });
    }

    propagateSubtractorOutputs(component, componentData) {
        if (!componentData.properties) return;

        // 触发减法器的重新计算
        if (typeof propagateSignal === 'function') {
            propagateSignal(component);
        }
    }

    updateComponentDisplay(component, state) {
        const type = component.dataset.type;
        
        if (type === 'input' || type === 'output') {
            const stateText = component.querySelector('.state-text');
            if (stateText) {
                stateText.textContent = state.toString();
            }

            const bg = component.querySelector('#input-bg, #output-bg');
            if (bg) {
                bg.setAttribute('fill', state === 1 ? '#90EE90' : '#006400');
            }
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showNotification(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        
        // 创建简单的通知
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            border-radius: 4px;
            z-index: 10000;
            font-family: Arial, sans-serif;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
}

// 确保在DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    new CircuitLoader();
});
