// 确保RSLatch类在全局作用域可用
window.RSLatch = class RSLatch {
    constructor() {
        this.initializeComponent();
    }

    initializeComponent() {
        // 确保全局变量存在
        if (typeof window.componentSvgs === 'undefined') {
            window.componentSvgs = {};
        }

        // 添加RS锁存器的SVG定义
        window.componentSvgs['rs-latch'] = `
            <svg class="component-svg" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="20" width="100" height="80" fill="#f0f0f0" stroke="black" stroke-width="2"/>
                <text x="100" y="45" font-family="Arial" font-size="16" text-anchor="middle">RS</text>
                <text x="100" y="85" font-family="Arial" font-size="16" text-anchor="middle">Latch</text>

                <!-- R输入 -->
                <text x="5" y="40" font-family="Arial" font-size="12">R</text>
                <line x1="25" y1="35" x2="50" y2="35" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" cx="20" cy="35" r="5" fill="black"/>

                <!-- S输入 -->
                <text x="5" y="80" font-family="Arial" font-size="12">S</text>
                <line x1="25" y1="75" x2="50" y2="75" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" cx="20" cy="75" r="5" fill="black"/>

                <!-- Q输出 -->
                <text x="185" y="45" font-family="Arial" font-size="12">Q</text>
                <line x1="150" y1="40" x2="175" y2="40" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" cx="180" cy="40" r="5" fill="black"/>

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
        console.log('RS锁存器组件菜单项已在HTML中定义');
        
        // 我们只需要确保componentSvgs中有对应的SVG定义
        if (window.componentSvgs && window.componentSvgs['rs-latch']) {
            console.log('RS锁存器SVG定义已添加到componentSvgs');
        } else {
            console.error('无法添加RS锁存器SVG定义');
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
            if (component.dataset.type === 'rs-latch') {
                this.initializeRSLatch(component);
            }
        });

        // 添加信号传播逻辑
        document.addEventListener('signal-propagation', (e) => {
            const component = e.detail.component;
            if (component.dataset.type === 'rs-latch') {
                this.handleRSLatchSignal(component);
            }
        });
    }

    initializeRSLatch(component) {
        const id = component.dataset.id;
        
        // 初始化状态
        if (!window.sequentialElements.has(id)) {
            window.sequentialElements.set(id, {
                q: 0,
                qBar: 1,
                lastR: 0,
                lastS: 0
            });
        }

        // 更新显示
        this.updateRSLatchDisplay(component);
    }

    updateRSLatchDisplay(component) {
        const id = component.dataset.id;
        const state = window.sequentialElements.get(id);
        
        if (!state) return;

        // 更新显示状态
        const rect = component.querySelector('rect');
        if (rect) {
            rect.setAttribute('fill', state.q === 1 ? '#e8f5e8' : '#f0f0f0');
        }
    }

    handleRSLatchSignal(component) {
        const id = component.dataset.id;
        const state = window.sequentialElements.get(id);
        if (!state) return;

        // 获取R和S输入的值
        const inputAnchors = Array.from(component.querySelectorAll('.input-anchor'));
        if (inputAnchors.length < 2) return;

        const rInputAnchor = inputAnchors[0];
        const sInputAnchor = inputAnchors[1];

        // 获取R和S输入值
        const rInputValue = this.getInputSignalValue(rInputAnchor);
        const sInputValue = this.getInputSignalValue(sInputAnchor);

        // 检查输入是否有变化
        if (rInputValue === state.lastR && sInputValue === state.lastS) {
            return; // 没有变化，不需要更新
        }

        // RS锁存器逻辑：
        // R=0, S=0: 保持状态不变
        // R=0, S=1: 置位(Q=1)
        // R=1, S=0: 复位(Q=0)
        // R=1, S=1: 禁止状态(不确定，但通常实现为保持不变)
        if (rInputValue === 0 && sInputValue === 0) {
            // 保持状态不变
        } else if (rInputValue === 0 && sInputValue === 1) {
            // 置位
            state.q = 1;
            state.qBar = 0;
        } else if (rInputValue === 1 && sInputValue === 0) {
            // 复位
            state.q = 0;
            state.qBar = 1;
        } else if (rInputValue === 1 && sInputValue === 1) {
            // 禁止状态 - 在这里我们选择保持状态不变
            // 在实际的RS锁存器中，这是一个不确定的状态
            console.warn('RS锁存器处于禁止状态(R=1,S=1)');
        }

        // 更新状态
        state.lastR = rInputValue;
        state.lastS = sInputValue;
        window.sequentialElements.set(id, state);

        // 更新显示
        this.updateRSLatchDisplay(component);

        // 传播输出信号
        this.propagateOutputSignals(component, state);
    }

    getInputSignalValue(inputAnchor) {
        // 如果没有连接，默认为0
        if (!window.anchorConnections.has(inputAnchor)) return 0;

        const connectedAnchor = window.anchorConnections.get(inputAnchor);
        const connectedComponent = connectedAnchor.closest('.component');
        if (!connectedComponent) return 0;

        const componentId = connectedComponent.dataset.id;
        const componentType = connectedComponent.dataset.type;

        // 根据连接组件类型获取信号值
        if (componentType === 'input' || componentType === 'clock') {
            return window.componentStates.get(componentId) || 0;
        } else if (componentType === 'd-flipflop' || componentType === 't-flipflop' || componentType === 'jk-flipflop' || componentType === 'rs-latch') {
            const state = window.sequentialElements.get(componentId);
            if (!state) return 0;

            // 检查是Q输出还是Q非输出
            const outputAnchors = Array.from(connectedComponent.querySelectorAll('.output-anchor'));
            const anchorIndex = outputAnchors.indexOf(connectedAnchor);
            
            return anchorIndex === 0 ? state.q : state.qBar;
        } else if (componentType === 'and-gate' || componentType === 'or-gate' || componentType === 'not-gate' || componentType === 'nand-gate' || componentType === 'xor-gate') {
            // 对于逻辑门，假设输出已经在componentStates中更新
            return window.componentStates.get(componentId) || 0;
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
    // 初始化RS锁存器
    const rsLatch = new RSLatch();
    console.log('RS锁存器组件已初始化');
});

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RSLatch;
}
