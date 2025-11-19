/**
 * 磁吸功能模块
 * 提供组件网格对齐和连线锚点磁吸功能
 */

class MagneticSnap {
    constructor(options = {}) {
        // 配置参数
        this.gridSize = options.gridSize || 20; // 网格大小，与CSS中的background-size保持一致
        this.snapDistance = options.snapDistance || 15; // 磁吸距离
        this.anchorSnapDistance = options.anchorSnapDistance || 25; // 锚点磁吸距离
        this.enabled = options.enabled !== false; // 默认启用
        
        // 磁吸指示器
        this.gridIndicator = null;
        this.anchorIndicator = null;
        this.createIndicators();
    }

    /**
     * 创建磁吸指示器
     */
    createIndicators() {
        // 禁用网格磁吸指示器创建
        // this.gridIndicator = document.createElement('div');
        // this.gridIndicator.style.cssText = `
        //     position: absolute;
        //     width: 8px;
        //     height: 8px;
        //     background: #4CAF50;
        //     border: 2px solid white;
        //     border-radius: 50%;
        //     pointer-events: none;
        //     z-index: 1000;
        //     display: none;
        //     box-shadow: 0 0 4px rgba(76, 175, 80, 0.6);
        // `;
        // document.body.appendChild(this.gridIndicator);

        // 禁用锚点磁吸指示器创建
        // this.anchorIndicator = document.createElement('div');
        // this.anchorIndicator.style.cssText = `
        //     position: absolute;
        //     width: 24px;
        //     height: 24px;
        //     background: rgba(255, 152, 0, 0.3);
        //     border: 2px solid #FF9800;
        //     border-radius: 50%;
        //     pointer-events: none;
        //     z-index: 1000;
        //     display: none;
        //     box-shadow: 0 0 8px rgba(255, 152, 0, 0.6);
        //     animation: pulse 1s infinite;
        // `;

        // 禁用脉冲动画创建
        // if (!document.getElementById('magnetic-snap-styles')) {
        //     const style = document.createElement('style');
        //     style.id = 'magnetic-snap-styles';
        //     style.textContent = `
        //         @keyframes pulse {
        //             0% {
        //                 transform: scale(1);
        //                 opacity: 0.6;
        //                 box-shadow: 0 0 8px rgba(255, 152, 0, 0.6);
        //             }
        //             50% {
        //                 transform: scale(1.3);
        //                 opacity: 1;
        //                 box-shadow: 0 0 16px rgba(255, 152, 0, 0.8);
        //             }
        //             100% {
        //                 transform: scale(1);
        //                 opacity: 0.6;
        //                 box-shadow: 0 0 8px rgba(255, 152, 0, 0.6);
        //             }
        //         }
        //     `;
        //     document.head.appendChild(style);
        // }
        // document.body.appendChild(this.anchorIndicator);
    }

    /**
     * 网格对齐功能 - 将坐标对齐到最近的网格点
     * @param {number} x - X坐标
     * @param {number} y - Y坐标
     * @param {HTMLElement} canvasElement - 画布元素
     * @returns {Object} 对齐后的坐标 {x, y, snapped}
     */
    snapToGrid(x, y, canvasElement) {
        if (!this.enabled) return { x, y, snapped: false };

        const canvasRect = canvasElement.getBoundingClientRect();
        
        // 计算相对于画布的坐标
        const relativeX = x - canvasRect.left;
        const relativeY = y - canvasRect.top;
        
        // 计算最近的网格点
        const gridX = Math.round(relativeX / this.gridSize) * this.gridSize;
        const gridY = Math.round(relativeY / this.gridSize) * this.gridSize;
        
        // 计算距离
        const distance = Math.sqrt(
            Math.pow(relativeX - gridX, 2) + Math.pow(relativeY - gridY, 2)
        );
        
        // 如果在磁吸范围内，则对齐到网格
        if (distance <= this.snapDistance) {
            this.showGridIndicator(canvasRect.left + gridX, canvasRect.top + gridY);
            return {
                x: canvasRect.left + gridX,
                y: canvasRect.top + gridY,
                snapped: true,
                gridX: gridX,
                gridY: gridY
            };
        } else {
            this.hideGridIndicator();
            return { x, y, snapped: false };
        }
    }

    /**
     * 锚点磁吸功能 - 检测并磁吸到最近的锚点
     * @param {number} x - X坐标
     * @param {number} y - Y坐标
     * @param {HTMLElement} canvasElement - 画布元素
     * @param {HTMLElement} excludeComponent - 排除的组件（通常是当前拖拽的组件）
     * @param {HTMLElement} excludeAnchor - 排除的锚点（通常是起始锚点）
     * @returns {Object} 磁吸结果 {x, y, snapped, anchor}
     */
    snapToAnchor(x, y, canvasElement, excludeComponent = null, excludeAnchor = null) {
        if (!this.enabled) return { x, y, snapped: false, anchor: null };

        const canvasRect = canvasElement.getBoundingClientRect();
        const anchors = canvasElement.querySelectorAll('.anchor');
        let closestAnchor = null;
        let minDistance = this.anchorSnapDistance;

        anchors.forEach(anchor => {
            // 排除指定组件的锚点
            if (excludeComponent && anchor.closest('.component') === excludeComponent) {
                return;
            }

            // 排除指定的锚点（通常是起始锚点）
            if (excludeAnchor && anchor === excludeAnchor) {
                return;
            }

            const anchorRect = anchor.getBoundingClientRect();
            const anchorCenterX = anchorRect.left + anchorRect.width / 2;
            const anchorCenterY = anchorRect.top + anchorRect.height / 2;

            const distance = Math.sqrt(
                Math.pow(x - anchorCenterX, 2) + Math.pow(y - anchorCenterY, 2)
            );

            if (distance < minDistance) {
                minDistance = distance;
                closestAnchor = anchor;
            }
        });

        if (closestAnchor) {
            const anchorRect = closestAnchor.getBoundingClientRect();
            const anchorCenterX = anchorRect.left + anchorRect.width / 2;
            const anchorCenterY = anchorRect.top + anchorRect.height / 2;

            this.showAnchorIndicator(anchorCenterX, anchorCenterY);

            return {
                x: anchorCenterX,
                y: anchorCenterY,
                snapped: true,
                anchor: closestAnchor,
                relativeX: anchorCenterX - canvasRect.left,
                relativeY: anchorCenterY - canvasRect.top,
                distance: minDistance
            };
        } else {
            this.hideAnchorIndicator();
            return { x, y, snapped: false, anchor: null };
        }
    }

    /**
     * 组件位置磁吸 - 将组件位置对齐到网格
     * @param {HTMLElement} component - 组件元素
     * @param {number} x - X坐标
     * @param {number} y - Y坐标
     * @param {HTMLElement} canvasElement - 画布元素
     * @returns {Object} 对齐后的位置 {left, top, snapped}
     */
    snapComponentToGrid(component, x, y, canvasElement) {
        if (!this.enabled) return { left: x, top: y, snapped: false };

        const canvasRect = canvasElement.getBoundingClientRect();
        const componentRect = component.getBoundingClientRect();
        
        // 计算组件左上角相对于画布的位置
        const relativeLeft = x - canvasRect.left;
        const relativeTop = y - canvasRect.top;
        
        // 对齐到网格
        const gridLeft = Math.round(relativeLeft / this.gridSize) * this.gridSize;
        const gridTop = Math.round(relativeTop / this.gridSize) * this.gridSize;
        
        // 计算距离
        const distance = Math.sqrt(
            Math.pow(relativeLeft - gridLeft, 2) + Math.pow(relativeTop - gridTop, 2)
        );
        
        if (distance <= this.snapDistance) {
            // 显示网格指示器在组件中心
            const centerX = canvasRect.left + gridLeft + componentRect.width / 2;
            const centerY = canvasRect.top + gridTop + componentRect.height / 2;
            this.showGridIndicator(centerX, centerY);
            
            return {
                left: gridLeft,
                top: gridTop,
                snapped: true
            };
        } else {
            this.hideGridIndicator();
            return {
                left: relativeLeft,
                top: relativeTop,
                snapped: false
            };
        }
    }

    /**
     * 显示网格磁吸指示器
     */
    showGridIndicator(x, y) {
        // 禁用绿色圆点指示器
        // this.gridIndicator.style.left = (x - 6) + 'px';
        // this.gridIndicator.style.top = (y - 6) + 'px';
        // this.gridIndicator.style.display = 'block';
    }

    /**
     * 隐藏网格磁吸指示器
     */
    hideGridIndicator() {
        // 禁用指示器隐藏
        // if (this.gridIndicator) {
        //     this.gridIndicator.style.display = 'none';
        // }
    }

    /**
     * 显示锚点磁吸指示器
     */
    showAnchorIndicator(x, y) {
        // 禁用橙色圆圈指示器
        // this.anchorIndicator.style.left = (x - 12) + 'px';
        // this.anchorIndicator.style.top = (y - 12) + 'px';
        // this.anchorIndicator.style.display = 'block';
    }

    /**
     * 隐藏锚点磁吸指示器
     */
    hideAnchorIndicator() {
        // 禁用指示器隐藏
        // if (this.anchorIndicator) {
        //     this.anchorIndicator.style.display = 'none';
        // }
    }

    /**
     * 隐藏所有指示器
     */
    hideAllIndicators() {
        this.hideGridIndicator();
        this.hideAnchorIndicator();
    }

    /**
     * 启用磁吸功能
     */
    enable() {
        this.enabled = true;
    }

    /**
     * 禁用磁吸功能
     */
    disable() {
        this.enabled = false;
        this.hideAllIndicators();
    }

    /**
     * 切换磁吸功能状态
     */
    toggle() {
        if (this.enabled) {
            this.disable();
        } else {
            this.enable();
        }
        return this.enabled;
    }

    /**
     * 销毁磁吸功能，清理DOM元素
     */
    destroy() {
        // 禁用指示器销毁（因为没有创建）
        // if (this.gridIndicator) {
        //     this.gridIndicator.remove();
        // }
        // if (this.anchorIndicator) {
        //     this.anchorIndicator.remove();
        // }
    }
}

// 导出类供外部使用
if (typeof window !== 'undefined') {
    window.MagneticSnap = MagneticSnap;
}
