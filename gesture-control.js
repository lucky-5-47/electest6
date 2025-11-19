/**
 * 手势控制模块
 * 提供抓取模式和连线模式的切换功能
 */

class GestureControl {
    constructor() {
        // 模式常量
        this.MODES = {
            GRAB: 'grab',      // 抓取模式（五个手指）
            CONNECT: 'connect' // 连线模式（一个手指）
        };
        
        // 当前模式
        this.currentMode = this.MODES.GRAB; // 默认为抓取模式
        
        // DOM元素引用
        this.grabButton = null;
        this.connectButton = null;
        this.canvas = null;
        
        // 初始化
        this.init();
    }
    
    /**
     * 初始化手势控制
     */
    init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupUI());
        } else {
            this.setupUI();
        }
        
        // 设置快捷键
        this.setupKeyboardShortcuts();
    }
    
    /**
     * 设置用户界面
     */
    setupUI() {
        this.canvas = document.getElementById('circuit-canvas');
        this.createGestureButtons();
        this.updateUI();
    }
    
    /**
     * 创建手势按钮
     */
    createGestureButtons() {
        const toolbar = document.querySelector('.quick-toolbar');
        if (!toolbar) return;
        
        // 创建分隔符
        const separator = document.createElement('div');
        separator.className = 'toolbar-separator';
        toolbar.appendChild(separator);
        
        // 创建抓取模式按钮（五个手指）
        this.grabButton = document.createElement('div');
        this.grabButton.className = 'toolbar-item active';
        this.grabButton.id = 'grab-mode-btn';
        this.grabButton.title = '抓取模式 (Ctrl+1)';
        this.grabButton.innerHTML = `
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32">
                <text x="16" y="20" font-family="Arial" font-size="20" text-anchor="middle" fill="currentColor">🖐️</text>
            </svg>
            <div class="tooltip">抓取模式 (Ctrl+1)</div>
        `;

        // 创建连线模式按钮（一个手指）
        this.connectButton = document.createElement('div');
        this.connectButton.className = 'toolbar-item';
        this.connectButton.id = 'connect-mode-btn';
        this.connectButton.title = '连线模式 (Ctrl+1)';
        this.connectButton.innerHTML = `
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32">
                <text x="16" y="20" font-family="Arial" font-size="20" text-anchor="middle" fill="currentColor">👆</text>
            </svg>
            <div class="tooltip">连线模式 (Ctrl+1)</div>
        `;
        
        // 添加到工具栏
        toolbar.appendChild(this.grabButton);
        toolbar.appendChild(this.connectButton);
        
        // 添加点击事件
        this.grabButton.addEventListener('click', () => this.setMode(this.MODES.GRAB));
        this.connectButton.addEventListener('click', () => this.setMode(this.MODES.CONNECT));
    }
    
    /**
     * 设置键盘快捷键
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+1 切换模式
            if (e.ctrlKey && e.key === '1') {
                e.preventDefault();
                this.toggleMode();
            }
        });
    }
    
    /**
     * 设置模式
     * @param {string} mode - 模式 ('grab' 或 'connect')
     */
    setMode(mode) {
        if (mode === this.currentMode) return;
        
        this.currentMode = mode;
        this.updateUI();
        this.updateCanvasCursor();
        this.notifyModeChange();
        
        console.log(`手势模式切换到: ${mode === this.MODES.GRAB ? '抓取模式' : '连线模式'}`);
    }
    
    /**
     * 切换模式
     */
    toggleMode() {
        const newMode = this.currentMode === this.MODES.GRAB ? this.MODES.CONNECT : this.MODES.GRAB;
        this.setMode(newMode);
    }
    
    /**
     * 更新用户界面
     */
    updateUI() {
        if (!this.grabButton || !this.connectButton) return;
        
        // 更新按钮状态
        if (this.currentMode === this.MODES.GRAB) {
            this.grabButton.classList.add('active');
            this.connectButton.classList.remove('active');
        } else {
            this.grabButton.classList.remove('active');
            this.connectButton.classList.add('active');
        }
    }
    
    /**
     * 更新画布光标
     */
    updateCanvasCursor() {
        if (!this.canvas) return;
        
        if (this.currentMode === this.MODES.GRAB) {
            this.canvas.style.cursor = 'grab';
        } else {
            this.canvas.style.cursor = 'crosshair';
        }
    }
    
    /**
     * 通知模式变化
     */
    notifyModeChange() {
        // 触发自定义事件
        const event = new CustomEvent('gestureMode', {
            detail: {
                mode: this.currentMode,
                isGrabMode: this.currentMode === this.MODES.GRAB,
                isConnectMode: this.currentMode === this.MODES.CONNECT
            }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * 获取当前模式
     * @returns {string} 当前模式
     */
    getCurrentMode() {
        return this.currentMode;
    }
    
    /**
     * 是否为抓取模式
     * @returns {boolean}
     */
    isGrabMode() {
        return this.currentMode === this.MODES.GRAB;
    }
    
    /**
     * 是否为连线模式
     * @returns {boolean}
     */
    isConnectMode() {
        return this.currentMode === this.MODES.CONNECT;
    }
    
    /**
     * 显示模式提示
     */
    showModeHint() {
        // 创建临时提示
        const hint = document.createElement('div');
        hint.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            z-index: 10000;
            pointer-events: none;
            animation: fadeInOut 2s ease-in-out;
        `;
        
        hint.textContent = this.currentMode === this.MODES.GRAB ? 
            '🖐️ 抓取模式' : '👆 连线模式';
        
        // 添加动画样式
        if (!document.getElementById('gesture-hint-styles')) {
            const style = document.createElement('style');
            style.id = 'gesture-hint-styles';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(hint);
        
        // 2秒后移除提示
        setTimeout(() => {
            if (hint.parentNode) {
                hint.parentNode.removeChild(hint);
            }
        }, 2000);
    }
    
    /**
     * 销毁手势控制
     */
    destroy() {
        // 移除按钮
        if (this.grabButton) this.grabButton.remove();
        if (this.connectButton) this.connectButton.remove();
        
        // 移除事件监听器
        document.removeEventListener('keydown', this.setupKeyboardShortcuts);
    }
}

// 导出类供外部使用
if (typeof window !== 'undefined') {
    window.GestureControl = GestureControl;
}
