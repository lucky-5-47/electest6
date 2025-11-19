/**
 * 撤销功能模块
 * 提供撤销和重做功能
 */

// 撤销栈和重做栈
let undoStack = [];
let redoStack = [];
const MAX_UNDO_STEPS = 50; // 最大撤销步数

// 保存当前状态到撤销栈
function saveState() {
    try {
        const canvas = document.getElementById('circuit-canvas');
        if (!canvas) return;

        // 获取当前画布状态
        const state = {
            timestamp: Date.now(),
            components: [],
            wires: []
        };

        // 保存所有组件
        const components = canvas.querySelectorAll('.component');
        components.forEach(component => {
            const componentData = {
                id: component.dataset.id,
                type: component.dataset.type,
                position: {
                    x: parseInt(component.style.left) || 0,
                    y: parseInt(component.style.top) || 0
                },
                innerHTML: component.innerHTML
            };

            // 保存组件状态
            if (typeof componentStates !== 'undefined' && componentStates.has(component.dataset.id)) {
                componentData.state = componentStates.get(component.dataset.id);
            }

            // 保存多位数据
            if (typeof componentMultiBitData !== 'undefined' && componentMultiBitData.has(component.dataset.id)) {
                componentData.multiBitData = componentMultiBitData.get(component.dataset.id);
            }

            // 保存位宽
            if (typeof componentBitWidth !== 'undefined' && componentBitWidth.has(component.dataset.id)) {
                componentData.bitWidth = componentBitWidth.get(component.dataset.id);
            }

            state.components.push(componentData);
        });

        // 保存连线信息
        if (typeof wires !== 'undefined') {
            state.wires = wires.map(wire => ({
                start: wire.start ? {
                    componentId: wire.start.closest('.component')?.dataset.id,
                    anchorIndex: Array.from(wire.start.closest('.component')?.querySelectorAll('.anchor') || []).indexOf(wire.start)
                } : null,
                end: wire.end ? {
                    componentId: wire.end.closest('.component')?.dataset.id,
                    anchorIndex: Array.from(wire.end.closest('.component')?.querySelectorAll('.anchor') || []).indexOf(wire.end)
                } : null,
                pathData: wire.line ? wire.line.getAttribute('d') : null
            }));
        }

        // 添加到撤销栈
        undoStack.push(state);
        
        // 限制撤销栈大小
        if (undoStack.length > MAX_UNDO_STEPS) {
            undoStack.shift();
        }

        // 清空重做栈
        redoStack = [];

        console.log('状态已保存到撤销栈，当前栈大小:', undoStack.length);
    } catch (error) {
        console.error('保存状态失败:', error);
    }
}

// 撤销操作
function undo() {
    try {
        if (undoStack.length === 0) {
            console.log('没有可撤销的操作');
            return;
        }

        // 保存当前状态到重做栈
        const currentState = getCurrentState();
        if (currentState) {
            redoStack.push(currentState);
        }

        // 从撤销栈取出上一个状态
        const previousState = undoStack.pop();
        
        // 恢复状态
        restoreState(previousState);
        
        console.log('撤销操作完成，剩余撤销步数:', undoStack.length);
    } catch (error) {
        console.error('撤销操作失败:', error);
    }
}

// 重做操作
function redo() {
    try {
        if (redoStack.length === 0) {
            console.log('没有可重做的操作');
            return;
        }

        // 保存当前状态到撤销栈
        const currentState = getCurrentState();
        if (currentState) {
            undoStack.push(currentState);
        }

        // 从重做栈取出状态
        const nextState = redoStack.pop();
        
        // 恢复状态
        restoreState(nextState);
        
        console.log('重做操作完成，剩余重做步数:', redoStack.length);
    } catch (error) {
        console.error('重做操作失败:', error);
    }
}

// 获取当前状态
function getCurrentState() {
    try {
        const canvas = document.getElementById('circuit-canvas');
        if (!canvas) return null;

        const state = {
            timestamp: Date.now(),
            components: [],
            wires: []
        };

        // 获取所有组件
        const components = canvas.querySelectorAll('.component');
        components.forEach(component => {
            const componentData = {
                id: component.dataset.id,
                type: component.dataset.type,
                position: {
                    x: parseInt(component.style.left) || 0,
                    y: parseInt(component.style.top) || 0
                },
                innerHTML: component.innerHTML
            };

            // 获取组件状态
            if (typeof componentStates !== 'undefined' && componentStates.has(component.dataset.id)) {
                componentData.state = componentStates.get(component.dataset.id);
            }

            state.components.push(componentData);
        });

        return state;
    } catch (error) {
        console.error('获取当前状态失败:', error);
        return null;
    }
}

// 恢复状态
function restoreState(state) {
    try {
        const canvas = document.getElementById('circuit-canvas');
        const wireLayer = document.getElementById('wire-layer');
        
        if (!canvas || !state) return;

        // 清空当前画布
        canvas.innerHTML = '<svg id="wire-layer" xmlns="http://www.w3.org/2000/svg"></svg>';
        
        // 清空连线
        if (wireLayer) {
            wireLayer.innerHTML = '';
        }

        // 清空状态
        if (typeof componentStates !== 'undefined') {
            componentStates.clear();
        }
        if (typeof componentMultiBitData !== 'undefined') {
            componentMultiBitData.clear();
        }
        if (typeof componentBitWidth !== 'undefined') {
            componentBitWidth.clear();
        }
        if (typeof wires !== 'undefined') {
            wires.length = 0;
        }

        // 恢复组件
        state.components.forEach(componentData => {
            const componentDiv = document.createElement('div');
            componentDiv.className = 'component';
            componentDiv.dataset.id = componentData.id;
            componentDiv.dataset.type = componentData.type;
            componentDiv.style.position = 'absolute';
            componentDiv.style.left = componentData.position.x + 'px';
            componentDiv.style.top = componentData.position.y + 'px';
            componentDiv.innerHTML = componentData.innerHTML;

            canvas.appendChild(componentDiv);

            // 恢复组件状态
            if (componentData.state && typeof componentStates !== 'undefined') {
                componentStates.set(componentData.id, componentData.state);
            }
            if (componentData.multiBitData && typeof componentMultiBitData !== 'undefined') {
                componentMultiBitData.set(componentData.id, componentData.multiBitData);
            }
            if (componentData.bitWidth && typeof componentBitWidth !== 'undefined') {
                componentBitWidth.set(componentData.id, componentData.bitWidth);
            }

            // 重新初始化组件
            if (typeof initializeComponent === 'function') {
                initializeComponent(componentDiv, componentData.type);
            }
        });

        console.log('状态恢复完成，组件数量:', state.components.length);
    } catch (error) {
        console.error('恢复状态失败:', error);
    }
}

// 清空撤销栈
function clearUndoStack() {
    undoStack = [];
    redoStack = [];
    console.log('撤销栈已清空');
}

// 绑定键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl+Z 撤销
    if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
    }
    // Ctrl+Y 或 Ctrl+Shift+Z 重做
    else if (e.ctrlKey && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
    }
});

// 暴露到全局作用域
window.saveState = saveState;
window.undo = undo;
window.redo = redo;
window.clearUndoStack = clearUndoStack;

console.log('撤销功能模块已加载');
