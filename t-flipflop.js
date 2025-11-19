// 确保TFlipFlop类在全局作用域可用
window.TFlipFlop = class TFlipFlop {
    constructor() {
        this.initializeComponent();
    }

    initializeComponent() {
        // 确保全局变量存在
        if (typeof window.componentSvgs === 'undefined') {
            window.componentSvgs = {};
        }

        // 添加T触发器的SVG定义
        window.componentSvgs['t-flipflop'] = `
            <svg class="component-svg" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="20" width="100" height="80" fill="#f0f0f0" stroke="black" stroke-width="2"/>
                <text x="100" y="45" font-family="Arial" font-size="16" text-anchor="middle">T</text>
                <text x="100" y="85" font-family="Arial" font-size="16" text-anchor="middle">FF</text>

                <!-- T输入 -->
                <text x="5" y="45" font-family="Arial" font-size="12">T</text>
                <line x1="25" y1="40" x2="50" y2="40" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" cx="20" cy="40" r="5" fill="black"/>

                <!-- 时钟输入 -->
                <text x="5" y="85" font-family="Arial" font-size="12">CLK</text>
                <line x1="25" y1="80" x2="50" y2="80" stroke="black" stroke-width="2"/>
                <path d="M45,75 L50,80 L45,85" fill="none" stroke="black" stroke-width="1"/>
                <circle class="anchor input-anchor clock-input" data-anchor-type="clock" cx="20" cy="80" r="5" fill="#0066cc"/>

                <!-- Q输出 -->
                <text x="185" y="55" font-family="Arial" font-size="12">Q</text>
                <line x1="150" y1="50" x2="175" y2="50" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" cx="180" cy="50" r="5" fill="black"/>

                <!-- 非Q输出 -->
                <text x="185" y="75" font-family="Arial" font-size="12">Q̄</text>
                <line x1="150" y1="70" x2="175" y2="70" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" cx="180" cy="70" r="5" fill="black"/>
            </svg>
        `;

        // 注册组件到组件菜单
        this.registerComponentToMenu();

        // 添加组件逻辑处理
        this.addComponentLogic();
    }

    registerComponentToMenu() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.addComponentToMenu());
        } else {
            this.addComponentToMenu();
        }
    }

    addComponentToMenu() {
        // 我们不需要手动添加菜单项，因为已经在HTML中定义了
        console.log('T触发器组件菜单项已在HTML中定义');
        
        // 我们只需要确保componentSvgs中有对应的SVG定义
        if (window.componentSvgs && window.componentSvgs['t-flipflop']) {
            console.log('T触发器SVG定义已添加到componentSvgs');
        } else {
            console.error('无法添加T触发器SVG定义');
        }
    }

    addComponentLogic() {
        // 确保sequentialElements存在
        if (typeof window.sequentialElements === 'undefined') {
            window.sequentialElements = new Map();
        }

        // 添加组件创建后的初始化逻辑
        document.addEventListener('component-created', (e) => {
            const component = e.detail.component;
            if (component.dataset.type === 't-flipflop') {
                this.initializeTFlipFlop(component);
            }
        });

        // 添加时钟信号处理逻辑
        document.addEventListener('clock-tick', (e) => {
            const clockComponent = e.detail.component;
            const clockState = e.detail.state;
            const previousState = e.detail.previousState;
            
            // 只在时钟上升沿触发
            if (clockState === 1 && previousState === 0) {
                this.handleClockRisingEdge(clockComponent);
            }
        });

        // 添加信号传播逻辑
        document.addEventListener('signal-propagation', (e) => {
            const component = e.detail.component;
            if (component.dataset.type === 't-flipflop') {
                this.updateTFlipFlopDisplay(component);
            }
        });
    }

    initializeTFlipFlop(component) {
        const id = component.dataset.id;
        
        // 初始化状态
        if (!window.sequentialElements.has(id)) {
            window.sequentialElements.set(id, {
                q: 0,
                qBar: 1,
                lastT: 0,
                lastClock: 0
            });
        }

        // 更新显示
        this.updateTFlipFlopDisplay(component);
    }

    updateTFlipFlopDisplay(component) {
        const id = component.dataset.id;
        const state = window.sequentialElements.get(id);
        
        if (!state) return;

        // 更新显示状态
        const rect = component.querySelector('rect');
        if (rect) {
            rect.setAttribute('fill', state.q === 1 ? '#e8f5e8' : '#f0f0f0');
        }
    }

    handleClockRisingEdge(clockComponent) {
        // 找到所有连接到这个时钟的T触发器
        const clockAnchor = clockComponent.querySelector('.anchor.output-anchor');
        if (!clockAnchor) return;

        // 如果存在anchorConnections映射
        if (typeof window.anchorConnections !== 'undefined') {
            this.propagateClockToConnectedTFlipFlops(clockAnchor);
        }
    }

    propagateClockToConnectedTFlipFlops(clockAnchor) {
        // 递归查找连接到该时钟的所有T触发器
        const visited = new Set();
        this.findConnectedTFlipFlops(clockAnchor, visited);
    }

    findConnectedTFlipFlops(anchor, visited) {
        if (visited.has(anchor)) return;
        visited.add(anchor);

        // 获取连接的锚点数组
        const connectedAnchors = window.anchorConnections.get(anchor);
        if (!connectedAnchors || !Array.isArray(connectedAnchors)) return;

        // 遍历所有连接的锚点
        for (const connectedAnchor of connectedAnchors) {
            const component = connectedAnchor.closest('.component');
            if (!component) continue;

            // 如果是T触发器且连接的是时钟输入
            if (component.dataset.type === 't-flipflop' && connectedAnchor.classList.contains('clock-input')) {
                this.updateTFlipFlopOnClockEdge(component);
            }

            // 递归查找其他连接
            this.findConnectedTFlipFlops(connectedAnchor, visited);
        }
    }

    updateTFlipFlopOnClockEdge(component) {
        const id = component.dataset.id;
        const state = window.sequentialElements.get(id);
        if (!state) return;

        // 获取T输入的值
        const tInputAnchor = component.querySelector('.input-anchor:not(.clock-input)');
        if (!tInputAnchor) return;

        // 获取T输入值
        const tInputValue = this.getInputSignalValue(tInputAnchor);

        // T触发器逻辑：当T=1时翻转状态，T=0时保持状态
        if (tInputValue === 1) {
            // 翻转状态
            state.q = state.q === 0 ? 1 : 0;
            state.qBar = 1 - state.q;
        }

        // 更新状态
        window.sequentialElements.set(id, state);

        // 更新显示
        this.updateTFlipFlopDisplay(component);

        // 传播输出信号
        this.propagateOutputSignals(component, state);
    }

    getInputSignalValue(inputAnchor) {
        // 如果没有连接，默认为0
        if (!window.anchorConnections.has(inputAnchor)) return 0;

        const connectedAnchors = window.anchorConnections.get(inputAnchor);
        if (!connectedAnchors || !Array.isArray(connectedAnchors) || connectedAnchors.length === 0) return 0;

        // 取第一个有效连接的值
        for (const connectedAnchor of connectedAnchors) {
            const connectedComponent = connectedAnchor.closest('.component');
            if (!connectedComponent) continue;

            const componentId = connectedComponent.dataset.id;
            const componentType = connectedComponent.dataset.type;

            // 根据连接组件类型获取信号值
            if (componentType === 'input' || componentType === 'clock') {
                return (window.componentStates && window.componentStates.get(componentId)) || 0;
            } else if (componentType === 'd-flipflop' || componentType === 't-flipflop' || componentType === 'jk-flipflop' || componentType === 'rs-latch') {
                const state = window.sequentialElements.get(componentId);
                if (!state) continue;

                // 检查是Q输出还是Q非输出
                const outputAnchors = Array.from(connectedComponent.querySelectorAll('.output-anchor'));
                const anchorIndex = outputAnchors.indexOf(connectedAnchor);

                return anchorIndex === 0 ? state.q : state.qBar;
            } else if (componentType === 'and-gate' || componentType === 'or-gate' || componentType === 'not-gate' || componentType === 'nand-gate' || componentType === 'xor-gate') {
                // 对于逻辑门，假设输出已经在componentStates中更新
                return (window.componentStates && window.componentStates.get(componentId)) || 0;
            }
        }

        return 0;
    }

    propagateOutputSignals(component, state) {
        const outputAnchors = component.querySelectorAll('.output-anchor');
        const qOutputAnchor = outputAnchors[0];
        const qBarOutputAnchor = outputAnchors[1];

        // 传播Q输出
        if (qOutputAnchor) {
            this.propagateSignalFromAnchor(qOutputAnchor, state.q);
        }

        // 传播Q非输出
        if (qBarOutputAnchor) {
            this.propagateSignalFromAnchor(qBarOutputAnchor, state.qBar);
        }
    }

    propagateSignalFromAnchor(anchor, value) {
        // 如果没有连接，不需要传播
        if (!window.anchorConnections.has(anchor)) return;

        const connectedAnchor = window.anchorConnections.get(anchor);
        const connectedComponent = connectedAnchor.closest('.component');
        if (!connectedComponent) return;

        // 根据连接的组件类型处理信号传播
        const componentType = connectedComponent.dataset.type;
        
        if (componentType === 'output') {
            // 更新输出组件的状态
            const componentId = connectedComponent.dataset.id;
            if (window.componentStates) {
                window.componentStates.set(componentId, value);
            }
            
            // 更新输出显示
            const textElement = connectedComponent.querySelector('.state-text');
            const bgElement = connectedComponent.querySelector('#output-bg');
            
            if (textElement) textElement.textContent = value.toString();
            if (bgElement) {
                bgElement.classList.remove('state-0', 'state-1');
                bgElement.classList.add(value ? 'state-1' : 'state-0');
            }
        } else if (typeof window.propagateSignal === 'function') {
            // 对于其他类型的组件，使用全局的信号传播函数
            window.propagateSignal(connectedComponent);
        }
    }
}

// 等待DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化T触发器
    const tFlipFlop = new TFlipFlop();
    console.log('T触发器组件已初始化');
});

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TFlipFlop;
}
