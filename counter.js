// 确保Counter类在全局作用域可用
window.Counter = class Counter {
    constructor() {
        this.initializeComponent();
    }

    initializeComponent() {
        // 确保全局变量存在
        if (typeof window.componentSvgs === 'undefined') {
            window.componentSvgs = {};
        }

        // 添加计数器的SVG定义
        window.componentSvgs['counter'] = `
            <svg class="component-svg" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="20" width="120" height="80" fill="#f0f0f0" stroke="black" stroke-width="2"/>
                <text x="100" y="45" font-family="Arial" font-size="16" text-anchor="middle">Counter</text>
                <text x="100" y="65" font-family="Arial" font-size="16" text-anchor="middle" class="counter-value">0</text>
                <text x="100" y="85" font-family="Arial" font-size="12" text-anchor="middle">4-bit</text>

                <!-- 时钟输入 -->
                <text x="5" y="55" font-family="Arial" font-size="12">CLK</text>
                <line x1="25" y1="50" x2="40" y2="50" stroke="black" stroke-width="2"/>
                <path d="M35,45 L40,50 L35,55" fill="none" stroke="black" stroke-width="1"/>
                <circle class="anchor input-anchor clock-input" data-anchor-type="clock" cx="20" cy="50" r="5" fill="#0066cc"/>

                <!-- 复位输入 -->
                <text x="5" y="85" font-family="Arial" font-size="12">RST</text>
                <line x1="25" y1="80" x2="40" y2="80" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" cx="20" cy="80" r="5" fill="black"/>

                <!-- Q0输出 (LSB) -->
                <text x="185" y="35" font-family="Arial" font-size="12">Q0</text>
                <line x1="160" y1="30" x2="175" y2="30" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" cx="180" cy="30" r="5" fill="black"/>

                <!-- Q1输出 -->
                <text x="185" y="55" font-family="Arial" font-size="12">Q1</text>
                <line x1="160" y1="50" x2="175" y2="50" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" cx="180" cy="50" r="5" fill="black"/>

                <!-- Q2输出 -->
                <text x="185" y="75" font-family="Arial" font-size="12">Q2</text>
                <line x1="160" y1="70" x2="175" y2="70" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" cx="180" cy="70" r="5" fill="black"/>

                <!-- Q3输出 (MSB) -->
                <text x="185" y="95" font-family="Arial" font-size="12">Q3</text>
                <line x1="160" y1="90" x2="175" y2="90" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" cx="180" cy="90" r="5" fill="black"/>
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
        console.log('计数器组件菜单项已在HTML中定义');
        
        // 我们只需要确保componentSvgs中有对应的SVG定义
        if (window.componentSvgs && window.componentSvgs['counter']) {
            console.log('计数器SVG定义已添加到componentSvgs');
        } else {
            console.error('无法添加计数器SVG定义');
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
            if (component.dataset.type === 'counter') {
                this.initializeCounter(component);
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
            if (component.dataset.type === 'counter') {
                this.handleCounterSignal(component);
            }
        });
    }

    initializeCounter(component) {
        const id = component.dataset.id;
        
        // 初始化状态
        if (!window.sequentialElements.has(id)) {
            window.sequentialElements.set(id, {
                count: 0,
                bits: [0, 0, 0, 0], // 4位二进制计数
                lastClock: 0,
                lastReset: 0
            });
        }

        // 更新显示
        this.updateCounterDisplay(component);
    }

    updateCounterDisplay(component) {
        const id = component.dataset.id;
        const state = window.sequentialElements.get(id);
        
        if (!state) return;

        // 更新计数值显示
        const counterValueText = component.querySelector('.counter-value');
        if (counterValueText) {
            counterValueText.textContent = state.count.toString();
        }
    }

    handleClockRisingEdge(clockComponent) {
        // 找到所有连接到这个时钟的计数器
        const clockAnchor = clockComponent.querySelector('.anchor.output-anchor');
        if (!clockAnchor) return;

        // 如果存在anchorConnections映射
        if (typeof window.anchorConnections !== 'undefined') {
            this.propagateClockToConnectedCounters(clockAnchor);
        }
    }

    propagateClockToConnectedCounters(clockAnchor) {
        // 递归查找连接到该时钟的所有计数器
        const visited = new Set();
        this.findConnectedCounters(clockAnchor, visited);
    }

    findConnectedCounters(anchor, visited) {
        if (visited.has(anchor)) return;
        visited.add(anchor);

        // 获取连接的锚点数组
        const connectedAnchors = window.anchorConnections.get(anchor);
        if (!connectedAnchors || !Array.isArray(connectedAnchors)) return;

        // 遍历所有连接的锚点
        for (const connectedAnchor of connectedAnchors) {
            const component = connectedAnchor.closest('.component');
            if (!component) continue;

            // 如果是计数器且连接的是时钟输入
            if (component.dataset.type === 'counter' && connectedAnchor.classList.contains('clock-input')) {
                this.updateCounterOnClockEdge(component);
            }

            // 递归查找其他连接
            this.findConnectedCounters(connectedAnchor, visited);
        }
    }

    updateCounterOnClockEdge(component) {
        const id = component.dataset.id;
        const state = window.sequentialElements.get(id);
        if (!state) return;

        // 获取复位输入的值
        const resetAnchor = Array.from(component.querySelectorAll('.input-anchor')).find(anchor => !anchor.classList.contains('clock-input'));
        if (!resetAnchor) return;

        const resetValue = this.getInputSignalValue(resetAnchor);

        // 如果复位信号为高电平，则重置计数器
        if (resetValue === 1) {
            state.count = 0;
            state.bits = [0, 0, 0, 0];
        } else {
            // 否则增加计数
            state.count = (state.count + 1) % 16; // 4位计数器，最大值为15
            
            // 更新二进制位
            state.bits[0] = (state.count & 1) ? 1 : 0;       // LSB
            state.bits[1] = (state.count & 2) ? 1 : 0;
            state.bits[2] = (state.count & 4) ? 1 : 0;
            state.bits[3] = (state.count & 8) ? 1 : 0;       // MSB
        }

        // 更新状态
        state.lastReset = resetValue;
        window.sequentialElements.set(id, state);

        // 更新显示
        this.updateCounterDisplay(component);

        // 传播输出信号
        this.propagateOutputSignals(component, state);
    }

    handleCounterSignal(component) {
        const id = component.dataset.id;
        const state = window.sequentialElements.get(id);
        if (!state) return;

        // 获取复位输入的值
        const resetAnchor = Array.from(component.querySelectorAll('.input-anchor')).find(anchor => !anchor.classList.contains('clock-input'));
        if (!resetAnchor) return;

        const resetValue = this.getInputSignalValue(resetAnchor);

        // 如果复位信号变为高电平，则重置计数器
        if (resetValue === 1 && state.lastReset === 0) {
            state.count = 0;
            state.bits = [0, 0, 0, 0];
            
            // 更新状态
            state.lastReset = resetValue;
            window.sequentialElements.set(id, state);
            
            // 更新显示
            this.updateCounterDisplay(component);
            
            // 传播输出信号
            this.propagateOutputSignals(component, state);
        }
        
        // 更新lastReset状态
        if (resetValue !== state.lastReset) {
            state.lastReset = resetValue;
            window.sequentialElements.set(id, state);
        }
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
                return window.componentStates.get(componentId) || 0;
            } else if (componentType === 'd-flipflop' || componentType === 't-flipflop' || componentType === 'jk-flipflop' || componentType === 'rs-latch') {
                const state = window.sequentialElements.get(componentId);
                if (!state) continue;

                // 检查是Q输出还是Q非输出
                const outputAnchors = Array.from(connectedComponent.querySelectorAll('.output-anchor'));
                const anchorIndex = outputAnchors.indexOf(connectedAnchor);

                return anchorIndex === 0 ? state.q : state.qBar;
            } else if (componentType === 'and-gate' || componentType === 'or-gate' || componentType === 'not-gate' || componentType === 'nand-gate' || componentType === 'xor-gate') {
                // 对于逻辑门，假设输出已经在componentStates中更新
                return window.componentStates.get(componentId) || 0;
            }
        }

        return 0;
    }

    propagateOutputSignals(component, state) {
        const outputAnchors = Array.from(component.querySelectorAll('.output-anchor'));
        
        // 传播4位输出信号
        outputAnchors.forEach((anchor, index) => {
            if (index < state.bits.length) {
                this.propagateSignalFromAnchor(anchor, state.bits[index]);
            }
        });
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
            window.componentStates.set(componentId, value);
            
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
    // 初始化计数器
    const counter = new Counter();
    console.log('计数器组件已初始化');
});

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Counter;
}
