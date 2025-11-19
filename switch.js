/**
 * 开关 (Switch) 元件模块
 * 提供一个跷跷板样式的开关元件
 */

// 开关SVG模板
const switchComponent = {
    'switch': `
        <svg class="component-svg" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
            <g id="switch-group" transform="translate(50, 30)">
                <!-- 开关底座 -->
                <rect id="switch-base" x="-35" y="-8" width="50" height="16" rx="8" fill="#E0E0E0" stroke="#BDBDBD" stroke-width="2"/>
                <!-- 开关轨道 -->
                <rect id="switch-track" x="-30" y="-6" width="40" height="12" rx="6" fill="#B0BEC5" class="switch-state-0"/>
                <!-- 开关滑块 (thumb) -->
                <circle id="switch-thumb" cx="-18" cy="0" r="8" fill="#FAFAFA" stroke="#9E9E9E" stroke-width="1" class="switch-state-0"/>
                <!-- 开关标签 -->
                <text id="switch-text" x="-20" y="25" font-family="Arial" font-size="8" font-weight="bold" text-anchor="middle" fill="#37474F">SW</text>
                <!-- 状态指示文字 -->
                <text id="switch-status" x="0" y="-18" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" fill="#666">OFF</text>
                <!-- 输出锚点 -->
                <circle class="anchor output-anchor" data-anchor-type="output" cx="25" cy="0" r="5" fill="black"/>
                <line x1="15" y1="0" x2="20" y2="0" stroke="black" stroke-width="2"/>
            </g>
        </svg>
    `
};

// 开关逻辑函数
const switchLogicFunction = {
    'switch': (inputs) => {
        // 开关的输出由用户交互决定，不依赖输入
        return 0; // 默认返回0，实际状态在componentStates中管理
    }
};

// 存储开关的状态
let switchStates = new Map();

// Main initialization function
function initializeSwitchComponent(componentSvgs, logicFunctions) {
    try {
        if (componentSvgs) {
            Object.assign(componentSvgs, switchComponent);
        } else {
            console.warn('componentSvgs object not provided to initializeSwitchComponent.');
        }

        if (logicFunctions) {
            Object.assign(logicFunctions, switchLogicFunction);
        } else {
            console.warn('logicFunctions object not provided to initializeSwitchComponent.');
        }
        
        // 添加开关事件处理
        setupSwitchEventHandlers();
        
        console.log('Switch component initialized successfully.');
    } catch (error) {
        console.error('Error initializing Switch component:', error);
    }
}

// 设置开关事件处理器
function setupSwitchEventHandlers() {
    document.addEventListener('click', function(e) {
        const switchComponent = e.target.closest('.component[data-type="switch"]');
        if (switchComponent && !e.target.classList.contains('anchor')) {
            handleSwitchClick(switchComponent);
        }
    });
}

// 处理开关点击
function handleSwitchClick(componentDiv) {
    const id = componentDiv.dataset.id;
    
    // 获取当前状态并切换
    const currentState = switchStates.get(id) || 0;
    const newState = currentState === 0 ? 1 : 0;
    
    // 更新状态
    switchStates.set(id, newState);
    
    // 更新组件状态映射
    if (typeof componentStates !== 'undefined') {
        componentStates.set(id, newState);
    }
    
    // 更新视觉状态
    updateSwitchDisplay(componentDiv, newState);
    
    // 传播信号到连接的元件
    const outputAnchor = componentDiv.querySelector('.output-anchor');
    if (outputAnchor && typeof propagateSignal === 'function') {
        propagateSignal(componentDiv);
    }
    
    console.log(`Switch (ID: ${id}) 状态切换为: ${newState}`);
}

// Function to update the switch's visual state
function updateSwitchDisplay(componentDiv, state) {
    const switchTrack = componentDiv.querySelector('#switch-track');
    const switchThumb = componentDiv.querySelector('#switch-thumb');
    const switchStatus = componentDiv.querySelector('#switch-status');
    
    if (!switchTrack || !switchThumb || !switchStatus) return;

    if (state === 1) {
        // ON state
        switchTrack.setAttribute('fill', '#4CAF50'); // Green track
        switchTrack.setAttribute('class', 'switch-state-1');
        
        switchThumb.setAttribute('cx', '18'); // Move thumb to right
        switchThumb.setAttribute('fill', '#FFFFFF'); // White thumb
        switchThumb.setAttribute('class', 'switch-state-1');
        
        switchStatus.textContent = 'ON';
        switchStatus.setAttribute('fill', '#4CAF50');
    } else {
        // OFF state
        switchTrack.setAttribute('fill', '#B0BEC5'); // Gray track
        switchTrack.setAttribute('class', 'switch-state-0');
        
        switchThumb.setAttribute('cx', '-18'); // Move thumb to left
        switchThumb.setAttribute('fill', '#FAFAFA'); // Light gray thumb
        switchThumb.setAttribute('class', 'switch-state-0');
        
        switchStatus.textContent = 'OFF';
        switchStatus.setAttribute('fill', '#666');
    }
}

// 获取开关状态
function getSwitchState(componentId) {
    return switchStates.get(componentId) || 0;
}

// 设置开关状态（用于程序控制）
function setSwitchState(componentId, state) {
    switchStates.set(componentId, state);
    
    // 查找对应的组件并更新显示
    const component = document.querySelector(`.component[data-id="${componentId}"]`);
    if (component) {
        updateSwitchDisplay(component, state);
        
        // 更新组件状态映射
        if (typeof componentStates !== 'undefined') {
            componentStates.set(componentId, state);
        }
        
        // 传播信号
        if (typeof propagateSignal === 'function') {
            propagateSignal(component);
        }
    }
}

// 重置开关状态
function resetSwitchState(componentId) {
    setSwitchState(componentId, 0);
}
