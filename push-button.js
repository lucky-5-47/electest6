/**
 * 按钮 (Push Button) 元件模块
 * 提供一个可配置触发模式的按钮元件
 */

// 按钮SVG模板
const pushButtonComponent = {
    'push-button': `
        <svg class="component-svg" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
            <g id="push-button-group" transform="translate(50, 30)">
                <!-- 按钮底座 -->
                <circle id="button-base" cx="-20" cy="0" r="18" fill="#B0BEC5" stroke="#37474F" stroke-width="2"/>
                <!-- 可动按钮 -->
                <circle id="button-top" cx="-20" cy="0" r="12" fill="#F44336" stroke="#D32F2F" stroke-width="2" class="button-state-0"/>
                <!-- 按钮标签 -->
                <text id="button-text" x="-20" y="25" font-family="Arial" font-size="8" font-weight="bold" text-anchor="middle" fill="#37474F">PUSH</text>
                <!-- 输出锚点 -->
                <circle class="anchor output-anchor" data-anchor-type="output" cx="15" cy="0" r="5" fill="black"/>
                <line x1="-2" y1="0" x2="10" y2="0" stroke="black" stroke-width="2"/>
            </g>
        </svg>
    `
};

// 按钮逻辑函数
const pushButtonLogicFunction = {
    'push-button': (inputs) => {
        // 按钮的输出由用户交互决定，不依赖输入
        return 0; // 默认返回0，实际状态在componentStates中管理
    }
};

// 按钮配置选项
const BUTTON_TRIGGER_MODES = {
    RISING_EDGE: 'rising',    // 上升沿触发
    FALLING_EDGE: 'falling',  // 下降沿触发
    HIGH: 'high',            // 高电平触发
    LOW: 'low'               // 低电平触发
};

// 存储按钮的配置
let buttonConfigs = new Map();

// Main initialization function
function initializePushButtonComponent(componentSvgs, logicFunctions) {
    try {
        if (componentSvgs) {
            Object.assign(componentSvgs, pushButtonComponent);
        } else {
            console.warn('componentSvgs object not provided to initializePushButtonComponent.');
        }

        if (logicFunctions) {
            Object.assign(logicFunctions, pushButtonLogicFunction);
        } else {
            console.warn('logicFunctions object not provided to initializePushButtonComponent.');
        }
        
        // 添加按钮事件处理
        setupButtonEventHandlers();
        
        console.log('Push Button component initialized successfully.');
    } catch (error) {
        console.error('Error initializing Push Button component:', error);
    }
}

// 设置按钮事件处理器
function setupButtonEventHandlers() {
    document.addEventListener('click', function(e) {
        const buttonComponent = e.target.closest('.component[data-type="push-button"]');
        if (buttonComponent) {
            handleButtonClick(buttonComponent);
        }
    });

    document.addEventListener('mousedown', function(e) {
        const buttonComponent = e.target.closest('.component[data-type="push-button"]');
        if (buttonComponent) {
            handleButtonPress(buttonComponent);
        }
    });

    document.addEventListener('mouseup', function(e) {
        const buttonComponent = e.target.closest('.component[data-type="push-button"]');
        if (buttonComponent) {
            handleButtonRelease(buttonComponent);
        }
    });
}

// 处理按钮按下
function handleButtonPress(componentDiv) {
    const id = componentDiv.dataset.id;
    const config = buttonConfigs.get(id) || { trigger: 'high' };
    
    // 更新视觉状态
    updatePushButtonDisplay(componentDiv, 1);
    
    // 根据触发模式处理输出
    switch(config.trigger) {
        case 'rising':
            // 上升沿：按下瞬间输出1，然后立即回到0
            setButtonOutput(componentDiv, 1);
            setTimeout(() => setButtonOutput(componentDiv, 0), 50);
            break;
        case 'high':
            // 高电平：按下时持续输出1
            setButtonOutput(componentDiv, 1);
            break;
        case 'low':
            // 低电平：按下时输出0
            setButtonOutput(componentDiv, 0);
            break;
    }
}

// 处理按钮释放
function handleButtonRelease(componentDiv) {
    const id = componentDiv.dataset.id;
    const config = buttonConfigs.get(id) || { trigger: 'high' };
    
    // 更新视觉状态
    updatePushButtonDisplay(componentDiv, 0);
    
    // 根据触发模式处理输出
    switch(config.trigger) {
        case 'falling':
            // 下降沿：释放瞬间输出1，然后立即回到0
            setButtonOutput(componentDiv, 1);
            setTimeout(() => setButtonOutput(componentDiv, 0), 50);
            break;
        case 'high':
            // 高电平：释放时回到0
            setButtonOutput(componentDiv, 0);
            break;
        case 'low':
            // 低电平：释放时回到1
            setButtonOutput(componentDiv, 1);
            break;
    }
}

// 处理按钮点击（用于切换配置等）
function handleButtonClick(componentDiv) {
    // 这里可以添加右键菜单等功能
}

// 设置按钮输出并传播信号
function setButtonOutput(componentDiv, value) {
    const id = componentDiv.dataset.id;
    
    // 更新组件状态
    if (typeof componentStates !== 'undefined') {
        componentStates.set(id, value);
    }
    
    // 传播信号到连接的元件
    const outputAnchor = componentDiv.querySelector('.output-anchor');
    if (outputAnchor && typeof propagateSignal === 'function') {
        propagateSignal(outputAnchor, value);
    }
}

// Function to update the button's visual state
function updatePushButtonDisplay(componentDiv, state) {
    const buttonTop = componentDiv.querySelector('#button-top');
    if (!buttonTop) return;

    if (state === 1) {
        // Pressed state
        buttonTop.setAttribute('fill', '#4CAF50'); // Change to green
        buttonTop.setAttribute('stroke', '#388E3C');
        buttonTop.style.transform = 'translateY(2px)'; // Pressed down effect
    } else {
        // Released state
        buttonTop.setAttribute('fill', '#F44336'); // Revert to red
        buttonTop.setAttribute('stroke', '#D32F2F');
        buttonTop.style.transform = 'translateY(0px)'; // Spring back effect
    }
}

// 设置按钮配置
function setButtonConfig(componentId, config) {
    buttonConfigs.set(componentId, config);
}

// 获取按钮配置
function getButtonConfig(componentId) {
    return buttonConfigs.get(componentId) || { trigger: 'high' };
}
