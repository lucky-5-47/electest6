class CircuitExporter {
    constructor() {
        this.initializeExportFunction();
        this.bindMenuEvents();
        this.debug = true; // 启用调试模式
    }

    initializeExportFunction() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupExportButton();
            });
        } else {
            this.setupExportButton();
        }
    }

    setupExportButton() {
        const exportButton = this.findExportButton();
        if (exportButton) {
            exportButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportCircuitAsPNG();
            });
        }
    }

    findExportButton() {
        const navLinks = document.querySelectorAll('.droplist a');
        
        for (let link of navLinks) {
            if (link.textContent.trim() === '导出图片') {
                return link;
            }
        }
        return null;
    }

    bindMenuEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                this.exportCircuitAsPNG();
            }
        });
    }

    log(message, data) {
        if (this.debug) {
            if (data) {
                console.log(`[导出调试] ${message}`, data);
            } else {
                console.log(`[导出调试] ${message}`);
            }
        }
    }

    exportCircuitAsPNG() {
        this.showNotification('正在准备导出图片...', 'info');
        this.log('开始导出图片');
        
        // 尝试多种方法，按顺序执行
        this.directCanvasCapture()
            .catch(error => {
                this.log('直接Canvas捕获失败', error);
                return this.domToImageCapture();
            })
            .catch(error => {
                this.log('Dom-to-Image捕获失败', error);
                return this.html2CanvasCapture();
            })
            .catch(error => {
                this.log('Html2Canvas捕获失败', error);
                this.showNotification('导出失败，请尝试截图', 'error');
            });
    }
    
    // 方法1: 直接Canvas捕获 - 最简单直接的方法
    directCanvasCapture() {
        return new Promise((resolve, reject) => {
            try {
                this.log('尝试直接Canvas捕获');
                const canvas = document.getElementById('circuit-canvas');
                const wireLayer = document.getElementById('wire-layer');
                
                if (!canvas) {
                    throw new Error('找不到电路画布');
                }
                
                this.log('获取画布尺寸');
                const canvasRect = canvas.getBoundingClientRect();
                this.log('画布尺寸', canvasRect);
                
                // 创建新的Canvas
                const outputCanvas = document.createElement('canvas');
                outputCanvas.width = canvasRect.width;
                outputCanvas.height = canvasRect.height;
                const ctx = outputCanvas.getContext('2d');
                
                // 填充白色背景
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
                
                this.log('开始渲染组件');
                
                // 1. 先渲染网格背景
                if (canvas.style.backgroundImage) {
                    this.log('渲染背景网格');
                    const gridImage = new Image();
                    gridImage.crossOrigin = 'anonymous';
                    gridImage.onload = () => {
                        ctx.drawImage(gridImage, 0, 0, outputCanvas.width, outputCanvas.height);
                        continueRendering();
                    };
                    gridImage.onerror = () => {
                        this.log('背景网格加载失败，继续渲染');
                        continueRendering();
                    };
                    
                    // 提取背景图URL
                    const bgUrl = canvas.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
                    gridImage.src = bgUrl;
                } else {
                    continueRendering();
                }
                
                // 继续渲染其他元素
                const continueRendering = () => {
                    // 2. 渲染组件
                    const components = canvas.querySelectorAll('.component');
                    this.log(`找到 ${components.length} 个组件`);
                    
                    // 创建一个临时的HTML元素来渲染所有组件
                    const tempDiv = document.createElement('div');
                    tempDiv.style.position = 'absolute';
                    tempDiv.style.left = '-9999px';
                    tempDiv.style.top = '-9999px';
                    document.body.appendChild(tempDiv);
                    
                    // 克隆所有组件到临时div
                    components.forEach((component, index) => {
                        const clone = component.cloneNode(true);
                        tempDiv.appendChild(clone);
                    });
                    
                    // 使用html2canvas渲染临时div
                    this.loadScript('https://html2canvas.hertzen.com/dist/html2canvas.min.js')
                        .then(() => {
                            return html2canvas(tempDiv, {
                                backgroundColor: null,
                                scale: 2,
                                logging: this.debug,
                                allowTaint: true,
                                useCORS: true
                            });
                        })
                        .then(componentCanvas => {
                            // 将组件画布内容绘制到输出画布
                            ctx.drawImage(componentCanvas, 0, 0, outputCanvas.width, outputCanvas.height);
                            
                            // 3. 渲染连线
                            if (wireLayer) {
                                this.log('开始渲染连线');
                                const wires = wireLayer.querySelectorAll('.wire');
                                this.log(`找到 ${wires.length} 条连线`);
                                
                                // 创建一个临时SVG来渲染所有连线
                                const svgNS = "http://www.w3.org/2000/svg";
                                const tempSvg = document.createElementNS(svgNS, "svg");
                                tempSvg.setAttribute("width", canvasRect.width);
                                tempSvg.setAttribute("height", canvasRect.height);
                                
                                // 克隆所有连线到临时SVG
                                wires.forEach(wire => {
                                    const wireClone = wire.cloneNode(true);
                                    tempSvg.appendChild(wireClone);
                                });
                                
                                // 将SVG转换为图片
                                const svgData = new XMLSerializer().serializeToString(tempSvg);
                                const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
                                const svgUrl = URL.createObjectURL(svgBlob);
                                
                                const wireImage = new Image();
                                wireImage.onload = () => {
                                    // 绘制连线
                                    ctx.drawImage(wireImage, 0, 0, outputCanvas.width, outputCanvas.height);
                                    
                                    // 清理
                                    URL.revokeObjectURL(svgUrl);
                                    document.body.removeChild(tempDiv);
                                    
                                    // 导出最终图片
                                    try {
                                        const pngUrl = outputCanvas.toDataURL('image/png');
                                        this.downloadImage(pngUrl);
                                        this.showNotification('电路已成功导出为PNG图片！', 'success');
                                        resolve();
                                    } catch (error) {
                                        reject(error);
                                    }
                                };
                                
                                wireImage.onerror = (error) => {
                                    document.body.removeChild(tempDiv);
                                    reject(new Error('连线渲染失败'));
                                };
                                
                                wireImage.src = svgUrl;
                            } else {
                                // 没有连线，直接导出
                                document.body.removeChild(tempDiv);
                                try {
                                    const pngUrl = outputCanvas.toDataURL('image/png');
                                    this.downloadImage(pngUrl);
                                    this.showNotification('电路已成功导出为PNG图片！', 'success');
                                    resolve();
                                } catch (error) {
                                    reject(error);
                                }
                            }
                        })
                        .catch(error => {
                            if (document.body.contains(tempDiv)) {
                                document.body.removeChild(tempDiv);
                            }
                            reject(error);
                        });
                };
            } catch (error) {
                reject(error);
            }
        });
    }
    
    // 方法2: Dom-to-Image捕获
    domToImageCapture() {
        return new Promise((resolve, reject) => {
            try {
                this.log('尝试使用Dom-to-Image捕获');
                const canvas = document.getElementById('circuit-canvas');
                
                if (!canvas) {
                    throw new Error('找不到电路画布');
                }
                
                // 加载dom-to-image库
                this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js')
                    .then(() => {
                        // 创建包含画布和连线层的容器
                        const container = document.createElement('div');
                        container.style.position = 'relative';
                        container.style.width = canvas.offsetWidth + 'px';
                        container.style.height = canvas.offsetHeight + 'px';
                        container.style.overflow = 'hidden';
                        container.style.backgroundColor = 'white';
                        
                        // 克隆画布和连线层
                        const canvasClone = canvas.cloneNode(true);
                        canvasClone.style.position = 'absolute';
                        canvasClone.style.left = '0';
                        canvasClone.style.top = '0';
                        container.appendChild(canvasClone);
                        
                        const wireLayer = document.getElementById('wire-layer');
                        if (wireLayer) {
                            const wireLayerClone = wireLayer.cloneNode(true);
                            wireLayerClone.style.position = 'absolute';
                            wireLayerClone.style.left = '0';
                            wireLayerClone.style.top = '0';
                            container.appendChild(wireLayerClone);
                        }
                        
                        // 添加到文档中以便dom-to-image可以处理
                        document.body.appendChild(container);
                        
                        // 使用dom-to-image捕获
                        domtoimage.toPng(container, {
                            bgcolor: '#ffffff',
                            scale: 2,
                            style: {
                                'transform': 'scale(1)',
                                'transform-origin': 'top left'
                            }
                        })
                        .then(dataUrl => {
                            // 移除临时容器
                            document.body.removeChild(container);
                            
                            this.downloadImage(dataUrl);
                            this.showNotification('电路已成功导出为PNG图片！', 'success');
                            resolve();
                        })
                        .catch(error => {
                            // 移除临时容器
                            if (document.body.contains(container)) {
                                document.body.removeChild(container);
                            }
                            reject(error);
                        });
                    })
                    .catch(error => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    // 方法3: Html2Canvas捕获
    html2CanvasCapture() {
        return new Promise((resolve, reject) => {
            try {
                this.log('尝试使用Html2Canvas捕获');
                
                // 创建一个包含所有元素的容器
                const container = document.createElement('div');
                container.style.position = 'fixed';
                container.style.left = '0';
                container.style.top = '0';
                container.style.width = '100%';
                container.style.height = '100%';
                container.style.backgroundColor = 'white';
                container.style.zIndex = '10000';
                container.style.overflow = 'auto';
                
                // 创建一个内部容器来保持原始尺寸
                const innerContainer = document.createElement('div');
                innerContainer.style.position = 'relative';
                container.appendChild(innerContainer);
                
                // 克隆电路画布
                const canvas = document.getElementById('circuit-canvas');
                if (!canvas) {
                    throw new Error('找不到电路画布');
                }
                
                const canvasRect = canvas.getBoundingClientRect();
                innerContainer.style.width = canvasRect.width + 'px';
                innerContainer.style.height = canvasRect.height + 'px';
                
                // 克隆画布内容
                const canvasClone = canvas.cloneNode(true);
                canvasClone.style.position = 'absolute';
                canvasClone.style.left = '0';
                canvasClone.style.top = '0';
                innerContainer.appendChild(canvasClone);
                
                // 克隆连线层
                const wireLayer = document.getElementById('wire-layer');
                if (wireLayer) {
                    const wireLayerClone = wireLayer.cloneNode(true);
                    wireLayerClone.style.position = 'absolute';
                    wireLayerClone.style.left = '0';
                    wireLayerClone.style.top = '0';
                    innerContainer.appendChild(wireLayerClone);
                }
                
                // 添加关闭按钮
                const closeButton = document.createElement('button');
                closeButton.textContent = '关闭预览';
                closeButton.style.position = 'fixed';
                closeButton.style.right = '10px';
                closeButton.style.top = '10px';
                closeButton.style.zIndex = '10001';
                closeButton.style.padding = '5px 10px';
                closeButton.style.backgroundColor = '#f44336';
                closeButton.style.color = 'white';
                closeButton.style.border = 'none';
                closeButton.style.borderRadius = '4px';
                closeButton.style.cursor = 'pointer';
                
                closeButton.addEventListener('click', () => {
                    document.body.removeChild(container);
                    document.body.removeChild(closeButton);
                    reject(new Error('用户取消导出'));
                });
                
                // 添加导出按钮
                const exportButton = document.createElement('button');
                exportButton.textContent = '确认导出';
                exportButton.style.position = 'fixed';
                exportButton.style.right = '120px';
                exportButton.style.top = '10px';
                exportButton.style.zIndex = '10001';
                exportButton.style.padding = '5px 10px';
                exportButton.style.backgroundColor = '#4CAF50';
                exportButton.style.color = 'white';
                exportButton.style.border = 'none';
                exportButton.style.borderRadius = '4px';
                exportButton.style.cursor = 'pointer';
                
                // 添加到文档中
                document.body.appendChild(container);
                document.body.appendChild(closeButton);
                document.body.appendChild(exportButton);
                
                // 显示提示
                this.showNotification('请检查预览并点击"确认导出"按钮', 'info');
                
                // 导出按钮点击事件
                exportButton.addEventListener('click', () => {
                    // 加载html2canvas库
                    this.loadScript('https://html2canvas.hertzen.com/dist/html2canvas.min.js')
                        .then(() => {
                            // 使用html2canvas捕获
                            return html2canvas(innerContainer, {
                                backgroundColor: '#ffffff',
                                scale: 2,
                                logging: this.debug,
                                allowTaint: true,
                                useCORS: true
                            });
                        })
                        .then(canvas => {
                            // 移除临时元素
                            document.body.removeChild(container);
                            document.body.removeChild(closeButton);
                            document.body.removeChild(exportButton);
                            
                            // 导出为PNG
                            try {
                                const pngUrl = canvas.toDataURL('image/png');
                                this.downloadImage(pngUrl);
                                this.showNotification('电路已成功导出为PNG图片！', 'success');
                                resolve();
                            } catch (error) {
                                reject(error);
                            }
                        })
                        .catch(error => {
                            // 移除临时元素
                            if (document.body.contains(container)) {
                                document.body.removeChild(container);
                            }
                            if (document.body.contains(closeButton)) {
                                document.body.removeChild(closeButton);
                            }
                            if (document.body.contains(exportButton)) {
                                document.body.removeChild(exportButton);
                            }
                            
                            reject(error);
                        });
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    // 加载外部脚本
    loadScript(url) {
        return new Promise((resolve, reject) => {
            // 检查脚本是否已加载
            if (url.includes('html2canvas') && typeof html2canvas !== 'undefined') {
                resolve();
                return;
            }
            
            if (url.includes('dom-to-image') && typeof domtoimage !== 'undefined') {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`无法加载脚本: ${url}`));
            document.head.appendChild(script);
        });
    }

    downloadImage(dataUrl) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `circuit_image_${timestamp}.png`;
        
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
}

const circuitExporter = new CircuitExporter();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CircuitExporter;
}

window.exportCircuitImage = () => {
    circuitExporter.exportCircuitAsPNG();
};