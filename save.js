class CircuitSaver {
    constructor() {
        this.initializeSaveFunction();
        this.bindMenuEvents();
    }

    initializeSaveFunction() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupSaveButton();
            });
        } else {
            this.setupSaveButton();
        }
    }
    setupSaveButton() {
        const saveButton = this.findSaveButton();
        if (saveButton) {
            saveButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.saveCircuitAsXML();
            });
        }
    }

    findSaveButton() {
        const navLinks = document.querySelectorAll('.droplist a');
        
        for (let link of navLinks) {
            if (link.textContent.trim() === '保存') {
                return link;
            }
        }
        return null;
    }
    bindMenuEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.saveCircuitAsXML();
            }
        });
    }

    saveCircuitAsXML() {
        try {
            const circuitData = this.collectCircuitData();
            const xmlContent = this.generateXML(circuitData);
            this.downloadXMLFile(xmlContent);
            this.showNotification('电路已成功保存为XML格式！', 'success');
        } catch (error) {
            console.error('保存电路时出错：', error);
            this.showNotification('保存失败：' + error.message, 'error');
        }
    }
    collectCircuitData() {
        const canvas = document.getElementById('circuit-canvas');
        const components = Array.from(canvas.querySelectorAll('.component'));
        const wireLayer = document.getElementById('wire-layer');
        const wires = Array.from(wireLayer.querySelectorAll('.wire'));

        const circuitData = {
            metadata: {
                version: '1.0',
                created: new Date().toISOString(),
                description: '电路设计文件'
            },
            components: [],
            connections: []
        };

        components.forEach((component, index) => {
            const componentData = this.extractComponentData(component, index);
            if (componentData) {
                circuitData.components.push(componentData);
            }
        });

        circuitData.connections = this.extractConnectionData();

        return circuitData;
    }
    extractComponentData(component, index) {
        const rect = component.getBoundingClientRect();
        const canvas = document.getElementById('circuit-canvas');
        const canvasRect = canvas.getBoundingClientRect();

        const componentData = {
            id: component.dataset.id || `component_${index}`,
            type: component.dataset.type,
            position: {
                x: parseInt(component.style.left) || (rect.left - canvasRect.left),
                y: parseInt(component.style.top) || (rect.top - canvasRect.top)
            },
            properties: {}
        };

        switch (component.dataset.type) {
            case 'input':
            case 'output':
                const stateText = component.querySelector('.state-text');
                if (stateText) {
                    componentData.properties.state = parseInt(stateText.textContent) || 0;
                }
                break;
                
            case 'clock':
                const clockBg = component.querySelector('#clock-bg');
                if (clockBg) {
                    componentData.properties.active = clockBg.classList.contains('clock-active');
                }
                break;
                
            case 'd-flipflop':
                const rectElement = component.querySelector('rect');
                if (rectElement) {
                    const fill = rectElement.getAttribute('fill');
                    componentData.properties.qState = fill === '#e8f5e8' ? 1 : 0;
                }
                break;
        }

        const anchors = Array.from(component.querySelectorAll('.anchor'));
        componentData.anchors = anchors.map((anchor, anchorIndex) => ({
            id: `${componentData.id}_anchor_${anchorIndex}`,
            type: anchor.getAttribute('data-anchor-type') || 
                  (anchor.classList.contains('input-anchor') ? 'input' : 'output'),
            position: {
                cx: parseFloat(anchor.getAttribute('cx')),
                cy: parseFloat(anchor.getAttribute('cy'))
            },
            isClockInput: anchor.classList.contains('clock-input')
        }));

        return componentData;
    }
    extractConnectionData() {
        if (typeof wires !== 'undefined' && Array.isArray(wires)) {
            return wires.map((wire, index) => this.extractWireData(wire, index));
        }

        const wireElements = document.querySelectorAll('#wire-layer .wire');
        return Array.from(wireElements).map((wireElement, index) => 
            this.extractWireDataFromDOM(wireElement, index)
        );
    }

    extractWireData(wire, index) {
        const wireData = {
            id: `wire_${index}`,
            type: 'connection'
        };

        if (wire.start && wire.end) {
            wireData.connectionType = 'anchor-to-anchor';
            wireData.source = this.getAnchorReference(wire.start);
            wireData.target = this.getAnchorReference(wire.end);
        } else if (wire.branchFrom && wire.end) {
            wireData.connectionType = 'wire-to-anchor';
            wireData.sourceWire = `wire_${this.findWireIndex(wire.branchFrom)}`;
            wireData.branchRatio = wire.branchRatio || 0.5;
            wireData.target = this.getAnchorReference(wire.end);
        } else if (wire.start && wire.connectsTo) {
            wireData.connectionType = 'anchor-to-wire';
            wireData.source = this.getAnchorReference(wire.start);
            wireData.targetWire = `wire_${this.findWireIndex(wire.connectsTo)}`;
            wireData.connectionRatio = wire.connectionRatio || 0.5;
        }

        if (wire.line) {
            const pathData = wire.line.getAttribute('d');
            if (pathData) {
                wireData.pathData = pathData;
            }
        }

        return wireData;
    }
    extractWireDataFromDOM(wireElement, index) {
        return {
            id: `wire_${index}`,
            type: 'connection',
            connectionType: 'unknown',
            pathData: wireElement.getAttribute('d') || '',
            stroke: wireElement.getAttribute('stroke') || '#000',
            strokeWidth: wireElement.getAttribute('stroke-width') || '2'
        };
    }

    getAnchorReference(anchor) {
        const component = anchor.closest('.component');
        const anchors = Array.from(component.querySelectorAll('.anchor'));
        const anchorIndex = anchors.indexOf(anchor);
        
        return {
            componentId: component.dataset.id,
            anchorIndex: anchorIndex,
            anchorType: anchor.getAttribute('data-anchor-type') || 
                       (anchor.classList.contains('input-anchor') ? 'input' : 'output')
        };
    }

    findWireIndex(wireElement) {
        if (typeof wires !== 'undefined' && Array.isArray(wires)) {
            return wires.findIndex(wire => wire.line === wireElement);
        }
        return 0;
    }
    generateXML(circuitData) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<circuit>\n';
        
        xml += '  <metadata>\n';
        xml += `    <version>${this.escapeXML(circuitData.metadata.version)}</version>\n`;
        xml += `    <created>${this.escapeXML(circuitData.metadata.created)}</created>\n`;
        xml += `    <description>${this.escapeXML(circuitData.metadata.description)}</description>\n`;
        xml += '  </metadata>\n';

        xml += '  <components>\n';
        circuitData.components.forEach(component => {
            xml += `    <component id="${this.escapeXML(component.id)}" type="${this.escapeXML(component.type)}">\n`;
            xml += `      <position x="${component.position.x}" y="${component.position.y}" />\n`;
            
            if (Object.keys(component.properties).length > 0) {
                xml += '      <properties>\n';
                Object.entries(component.properties).forEach(([key, value]) => {
                    xml += `        <property name="${this.escapeXML(key)}" value="${this.escapeXML(String(value))}" />\n`;
                });
                xml += '      </properties>\n';
            }

            if (component.anchors && component.anchors.length > 0) {
                xml += '      <anchors>\n';
                component.anchors.forEach(anchor => {
                    xml += `        <anchor id="${this.escapeXML(anchor.id)}" type="${this.escapeXML(anchor.type)}"`;
                    xml += ` cx="${anchor.position.cx}" cy="${anchor.position.cy}"`;
                    if (anchor.isClockInput) {
                        xml += ' clockInput="true"';
                    }
                    xml += ' />\n';
                });
                xml += '      </anchors>\n';
            }

            xml += '    </component>\n';
        });
        xml += '  </components>\n';

        xml += '  <connections>\n';
        circuitData.connections.forEach(connection => {
            xml += `    <connection id="${this.escapeXML(connection.id)}" type="${this.escapeXML(connection.connectionType)}">\n`;
            
            if (connection.source) {
                xml += `      <source componentId="${this.escapeXML(connection.source.componentId)}" `;
                xml += `anchorIndex="${connection.source.anchorIndex}" `;
                xml += `anchorType="${this.escapeXML(connection.source.anchorType)}" />\n`;
            }
            
            if (connection.target) {
                xml += `      <target componentId="${this.escapeXML(connection.target.componentId)}" `;
                xml += `anchorIndex="${connection.target.anchorIndex}" `;
                xml += `anchorType="${this.escapeXML(connection.target.anchorType)}" />\n`;
            }

            if (connection.sourceWire) {
                xml += `      <sourceWire ref="${this.escapeXML(connection.sourceWire)}" branchRatio="${connection.branchRatio}" />\n`;
            }

            if (connection.targetWire) {
                xml += `      <targetWire ref="${this.escapeXML(connection.targetWire)}" connectionRatio="${connection.connectionRatio}" />\n`;
            }

            if (connection.pathData) {
                xml += `      <path><![CDATA[${connection.pathData}]]></path>\n`;
            }

            xml += '    </connection>\n';
        });
        xml += '  </connections>\n';

        xml += '</circuit>';
        return xml;
    }
    escapeXML(str) {
        if (typeof str !== 'string') return str;
        
        return str.replace(/[<>&'"]/g, function (char) {
            switch (char) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case "'": return '&apos;';
                case '"': return '&quot;';
                default: return char;
            }
        });
    }

    downloadXMLFile(xmlContent) {
        const blob = new Blob([xmlContent], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `circuit_design_${timestamp}.xml`;
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '4px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            transition: 'opacity 0.3s ease',
            backgroundColor: type === 'success' ? '#4CAF50' :
                           type === 'error' ? '#f44336' :
                           '#2196F3'
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    validateCircuitData(circuitData) {
        if (!circuitData.components || !Array.isArray(circuitData.components)) {
            throw new Error('无效的电路数据：缺少元件信息');
        }

        if (!circuitData.connections || !Array.isArray(circuitData.connections)) {
            throw new Error('无效的电路数据：缺少连线信息');
        }

        return true;
    }
}

const circuitSaver = new CircuitSaver();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CircuitSaver;
}

window.saveCircuit = () => {
    circuitSaver.saveCircuitAsXML();
};