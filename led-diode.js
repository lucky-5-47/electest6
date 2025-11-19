/**
 * LED二极管组件
 * 单点指示灯，用于显示单个位的逻辑状态
 * 核心功能：输入为1时发光，输入为0时不发光
 */

// LED二极管SVG模板生成函数
function generateLEDSvg(componentId) {
    return `
        <svg class="component-svg" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- LED发光效果渐变 - 亮起状态 -->
                <radialGradient id="led-glow-on-${componentId}" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#FF6666;stop-opacity:1" />
                    <stop offset="70%" style="stop-color:#FF0000;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#CC0000;stop-opacity:0.4" />
                </radialGradient>
                <!-- LED熄灭状态 -->
                <radialGradient id="led-glow-off-${componentId}" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#555555;stop-opacity:1" />
                    <stop offset="70%" style="stop-color:#333333;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#222222;stop-opacity:0.4" />
                </radialGradient>
            </defs>

            <g id="led-group" transform="translate(40, 40)">
                <!-- 外层发光圈 -->
                <circle id="led-outer-glow" cx="0" cy="0" r="25" fill="url(#led-glow-off-${componentId})" opacity="0.3"/>

                <!-- LED主体圆形 -->
                <circle id="led-body" cx="0" cy="0" r="18" fill="#555555" stroke="#333333" stroke-width="2"/>

                <!-- LED内核指示点 -->
                <circle id="led-core" cx="0" cy="0" r="10" fill="#333333"/>

                <!-- 配置信息显示 -->
                <text id="led-config" x="0" y="-30" font-family="Arial" font-size="7" text-anchor="middle" fill="black">1位 LED</text>

                <!-- 标签显示 -->
                <text id="led-label" x="0" y="35" font-family="Arial" font-size="9" font-weight="bold" text-anchor="middle" fill="black">LED</text>

                <!-- 输入锚点 -->
                <circle class="anchor input-anchor" data-anchor-type="input" cx="-30" cy="0" r="4" fill="black"/>
                <line x1="-26" y1="0" x2="-18" y2="0" stroke="black" stroke-width="2"/>
            </g>
        </svg>
    `;
}

// 默认LED二极管SVG模板（用于组件库显示）
const ledDiodeSvg = generateLEDSvg('default');

// LED二极管逻辑函数
function ledDiodeLogic(inputs, component) {
    const value = inputs[0] || 0;
    updateLEDDiode(component, value);
    return value;
}

// 更新LED二极管显示
function updateLEDDiode(component, value) {
    
    const ledBody = component.querySelector('#led-body');
    const ledCore = component.querySelector('#led-core');
    const ledOuterGlow = component.querySelector('#led-outer-glow');
    const ledConfig = component.querySelector('#led-config');
    
    if (!ledBody) {
        console.error('LED二极管元素未找到:', component);
        return;
    }
    
    // 获取配置参数
    const bitWidth = parseInt(component.dataset.bitWidth) || 1;
    const ledColor = component.dataset.ledColor || '#FF0000';
    
    // 处理输入值
    let numericValue = 0;
    let isOn = false;
    
    if (Array.isArray(value)) {
        // 多位输入：将位数组转换为数值
        for (let i = 0; i < value.length; i++) {
            const bitValue = value[i] || 0;
            const bitPosition = value.length - 1 - i;
            numericValue |= (bitValue << bitPosition);
        }
        isOn = numericValue > 0;
    } else {
        numericValue = parseInt(value) || 0;
        isOn = numericValue > 0;
    }
    
    // 获取组件ID用于唯一渐变
    const componentId = component.dataset.id || 'default';

    // 更新LED外观
    if (isOn) {
        if (bitWidth === 1) {
            // 单位模式：使用配置的颜色
            ledBody.setAttribute('fill', ledColor);
            ledCore.setAttribute('fill', lightenColor(ledColor, 0.4));
            updateGradientColor(component, `led-glow-on-${componentId}`, ledColor);
        } else {
            // 多位模式：根据数值决定颜色
            const colorFromValue = getColorFromValue(numericValue, bitWidth);
            ledBody.setAttribute('fill', colorFromValue);
            ledCore.setAttribute('fill', lightenColor(colorFromValue, 0.4));
            updateGradientColor(component, `led-glow-on-${componentId}`, colorFromValue);
        }

        ledOuterGlow.setAttribute('fill', `url(#led-glow-on-${componentId})`);
        ledOuterGlow.style.opacity = '0.6';
    } else {
        ledBody.setAttribute('fill', '#555555');
        ledCore.setAttribute('fill', '#333333');
        ledOuterGlow.setAttribute('fill', `url(#led-glow-off-${componentId})`);
        ledOuterGlow.style.opacity = '0.2';
    }
    
    // 更新配置信息显示
    if (ledConfig) {
        if (bitWidth === 1) {
            ledConfig.textContent = '1位 LED';
        } else {
            ledConfig.textContent = `${bitWidth}位 LED (${numericValue})`;
        }
    }
}

// 根据数值获取颜色（多位模式）
function getColorFromValue(value, bitWidth) {
    const maxValue = Math.pow(2, bitWidth) - 1;
    const ratio = value / maxValue;
    
    // 从蓝色到红色的渐变
    const red = Math.floor(255 * ratio);
    const blue = Math.floor(255 * (1 - ratio));
    const green = Math.floor(128 * Math.sin(ratio * Math.PI));
    
    return `rgb(${red}, ${green}, ${blue})`;
}

// 颜色亮化函数
function lightenColor(color, factor) {
    if (color.startsWith('rgb')) {
        const matches = color.match(/\d+/g);
        if (matches && matches.length >= 3) {
            const r = parseInt(matches[0]);
            const g = parseInt(matches[1]);
            const b = parseInt(matches[2]);
            
            const newR = Math.min(255, Math.floor(r + (255 - r) * factor));
            const newG = Math.min(255, Math.floor(g + (255 - g) * factor));
            const newB = Math.min(255, Math.floor(b + (255 - b) * factor));
            
            return `rgb(${newR}, ${newG}, ${newB})`;
        }
    }
    
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const newR = Math.min(255, Math.floor(r + (255 - r) * factor));
    const newG = Math.min(255, Math.floor(g + (255 - g) * factor));
    const newB = Math.min(255, Math.floor(b + (255 - b) * factor));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

// 更新渐变颜色
function updateGradientColor(component, gradientId, color) {
    const gradient = component.querySelector(`#${gradientId}`);
    if (gradient) {
        const stops = gradient.querySelectorAll('stop');
        if (stops.length >= 3) {
            const lightColor = lightenColor(color, 0.3);
            const mediumColor = color;
            const darkColor = darkenColor(color, 0.3);

            stops[0].setAttribute('style', `stop-color:${lightColor};stop-opacity:1`);
            stops[1].setAttribute('style', `stop-color:${mediumColor};stop-opacity:0.8`);
            stops[2].setAttribute('style', `stop-color:${darkColor};stop-opacity:0.4`);
        }
    }
}

// 颜色暗化函数
function darkenColor(color, factor) {
    if (color.startsWith('rgb')) {
        const matches = color.match(/\d+/g);
        if (matches && matches.length >= 3) {
            const r = parseInt(matches[0]);
            const g = parseInt(matches[1]);
            const b = parseInt(matches[2]);
            
            const newR = Math.floor(r * (1 - factor));
            const newG = Math.floor(g * (1 - factor));
            const newB = Math.floor(b * (1 - factor));
            
            return `rgb(${newR}, ${newG}, ${newB})`;
        }
    }
    
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const newR = Math.floor(r * (1 - factor));
    const newG = Math.floor(g * (1 - factor));
    const newB = Math.floor(b * (1 - factor));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

// 初始化LED二极管组件
function initializeLEDDiode(componentDiv) {
    // 为每个LED组件生成唯一的SVG
    const componentId = componentDiv.dataset.id;
    if (componentId && componentId !== 'default') {
        const uniqueSvg = generateLEDSvg(componentId);
        componentDiv.innerHTML = uniqueSvg;
    }

    componentDiv.dataset.bitWidth = '1';
    componentDiv.dataset.ledColor = '#FF0000';
    componentDiv.dataset.ledLabel = 'LED';
    componentDiv.style.cursor = 'pointer';
    componentDiv.title = 'LED二极管 - 右键配置位宽和颜色';

    updateLEDDiode(componentDiv, 0);
    
    // 添加右键配置事件
    componentDiv.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        console.log('LED二极管右键点击，打开配置对话框');
        showLEDConfigDialog(componentDiv);
    });
    
    // 添加左键点击事件
    componentDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('anchor')) return;
        e.preventDefault();
        e.stopPropagation();
        
        const componentId = componentDiv.dataset.id;
        const currentState = (typeof window.componentStates !== 'undefined' && window.componentStates.has(componentId)) 
            ? window.componentStates.get(componentId) : 0;
        const bitWidth = componentDiv.dataset.bitWidth || '1';
        const color = componentDiv.dataset.ledColor || '#FF0000';
        
        console.log(`LED二极管状态信息:`, {
            ID: componentId,
            当前状态: currentState,
            位宽: bitWidth,
            颜色: color,
            是否发光: currentState > 0 ? '是' : '否'
        });
        
        const statusText = currentState > 0 ? '发光' : '熄灭';
        componentDiv.title = `LED二极管 - 当前状态: ${statusText} (${currentState}) - 右键配置`;
    });
}

// 显示LED配置对话框
function showLEDConfigDialog(component) {
    const currentBitWidth = parseInt(component.dataset.bitWidth) || 1;
    const currentColor = component.dataset.ledColor || '#FF0000';
    const currentLabel = component.dataset.ledLabel || 'LED';

    const dialog = document.createElement('div');
    dialog.className = 'config-dialog';
    dialog.innerHTML = `
        <div class="config-dialog-content">
            <h3>🔴 LED二极管配置</h3>

            <div class="config-group">
                <label><strong>位宽 (Bit Width):</strong></label>
                <p class="config-description">
                    <strong>1位</strong>：显示单个位状态（0=熄灭，1=发光）<br>
                    <strong>多位</strong>：颜色由输入总线值决定，用于直观表示数值大小
                </p>
                <input type="number" id="led-bitwidth" value="${currentBitWidth}" min="1" max="8" step="1" style="width: 80px; padding: 5px;">
                <span style="margin-left: 10px; color: #666;">位 (1-8)</span>
            </div>

            <div class="config-group" id="color-config" style="${currentBitWidth > 1 ? 'display:none' : ''}">
                <label><strong>LED颜色:</strong></label>
                <p class="config-description">选择LED发光时的颜色（仅在1位模式下有效）</p>
                <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input type="color" id="led-color" value="${currentColor}" style="width: 50px; height: 30px;">
                        <span id="led-color-preview" style="padding: 5px 15px; border: 2px solid ${currentColor}; background: ${currentColor}; color: white; border-radius: 5px;">预览</span>
                    </div>
                    <div style="display: flex; gap: 5px;">
                        <button type="button" onclick="setLEDColor('#FF0000')" style="width: 25px; height: 25px; background: #FF0000; border: 1px solid #ccc; border-radius: 3px; cursor: pointer;" title="红色"></button>
                        <button type="button" onclick="setLEDColor('#00FF00')" style="width: 25px; height: 25px; background: #00FF00; border: 1px solid #ccc; border-radius: 3px; cursor: pointer;" title="绿色"></button>
                        <button type="button" onclick="setLEDColor('#0000FF')" style="width: 25px; height: 25px; background: #0000FF; border: 1px solid #ccc; border-radius: 3px; cursor: pointer;" title="蓝色"></button>
                        <button type="button" onclick="setLEDColor('#FFFF00')" style="width: 25px; height: 25px; background: #FFFF00; border: 1px solid #ccc; border-radius: 3px; cursor: pointer;" title="黄色"></button>
                        <button type="button" onclick="setLEDColor('#FF8000')" style="width: 25px; height: 25px; background: #FF8000; border: 1px solid #ccc; border-radius: 3px; cursor: pointer;" title="橙色"></button>
                    </div>
                </div>
            </div>

            <div class="config-group" id="multibit-info" style="${currentBitWidth === 1 ? 'display:none' : ''}">
                <label><strong>多位模式说明:</strong></label>
                <p class="config-description">
                    在多位模式下，LED颜色由输入值自动决定：<br>
                    • 0值 = 蓝色<br>
                    • 中间值 = 紫色/绿色<br>
                    • 最大值 = 红色<br>
                    这样可以直观地看出总线上的数值大小。
                </p>
            </div>

            <div class="config-group">
                <label><strong>标签 (Label):</strong></label>
                <p class="config-description">显示在组件下方的标签文字</p>
                <input type="text" id="led-label" value="${currentLabel}" maxlength="8" style="width: 120px; padding: 5px;">
            </div>

            <div class="config-group">
                <label><strong>颜色预览:</strong></label>
                <p class="config-description">点击按钮临时点亮LED预览颜色效果</p>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button type="button" onclick="previewLEDColor(true)" class="btn-preview-on">💡 点亮预览</button>
                    <button type="button" onclick="previewLEDColor(false)" class="btn-preview-off">⚫ 熄灭</button>
                    <span style="font-size: 12px; color: #666;">预览不会影响实际电路状态</span>
                </div>
            </div>

            <div class="config-buttons">
                <button onclick="applyLEDConfig(this)" class="btn-confirm">确定</button>
                <button onclick="cancelLEDConfig(this)" class="btn-cancel">取消</button>
            </div>
        </div>
    `;
    
    dialog.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;

    dialog.querySelector('.config-dialog-content').style.cssText = `
        background: white;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        min-width: 450px;
        max-width: 550px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .config-description {
            font-size: 13px;
            color: #666;
            margin: 8px 0 12px 0;
            line-height: 1.4;
            background: #f8f9fa;
            padding: 8px 12px;
            border-radius: 6px;
            border-left: 3px solid #2196F3;
        }

        .btn-confirm {
            background: #2196F3;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.2s ease;
            margin-right: 10px;
        }

        .btn-confirm:hover {
            background: #1976D2;
        }

        .btn-cancel {
            background: #f5f5f5;
            color: #666;
            border: 1px solid #ddd;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .btn-cancel:hover {
            background: #e0e0e0;
            border-color: #bbb;
        }

        .btn-preview-on {
            background: #FF6B35;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.2s ease;
        }

        .btn-preview-on:hover {
            background: #E55A2B;
        }

        .btn-preview-off {
            background: #666;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.2s ease;
        }

        .btn-preview-off:hover {
            background: #555;
        }
    `;
    dialog.appendChild(style);

    dialog.dataset.componentId = component.dataset.id;
    // 保存原始配置，用于取消时恢复
    dialog.dataset.originalColor = currentColor;
    dialog.dataset.originalBitWidth = currentBitWidth.toString();
    dialog.dataset.originalLabel = currentLabel;
    document.body.appendChild(dialog);

    // 位宽变化监听
    const bitWidthInput = dialog.querySelector('#led-bitwidth');
    const colorConfig = dialog.querySelector('#color-config');
    const multibitInfo = dialog.querySelector('#multibit-info');
    
    bitWidthInput.addEventListener('input', function() {
        const bitWidth = parseInt(this.value) || 1;
        if (bitWidth === 1) {
            colorConfig.style.display = 'block';
            multibitInfo.style.display = 'none';
        } else {
            colorConfig.style.display = 'none';
            multibitInfo.style.display = 'block';
        }
    });

    // 颜色预览更新
    const colorInput = dialog.querySelector('#led-color');
    const colorPreview = dialog.querySelector('#led-color-preview');
    colorInput.addEventListener('input', function() {
        const color = this.value;
        colorPreview.style.borderColor = color;
        colorPreview.style.backgroundColor = color;

        // 实时预览：如果LED当前是亮着的，立即更新LED颜色
        const componentStates = window.componentStates;
        const currentState = (componentStates && componentStates.has(component.dataset.id)) ? componentStates.get(component.dataset.id) : 0;

        if (currentState > 0) {
            // 临时更新LED颜色进行预览
            component.dataset.ledColor = color;
            updateLEDDiode(component, currentState);
        }
    });
}

// 设置LED颜色（快捷按钮）
function setLEDColor(color) {
    const dialog = document.querySelector('.config-dialog');
    const colorInput = dialog.querySelector('#led-color');
    const colorPreview = dialog.querySelector('#led-color-preview');

    colorInput.value = color;
    colorPreview.style.borderColor = color;
    colorPreview.style.backgroundColor = color;

    // 实时预览：如果LED当前是亮着的，立即更新LED颜色
    const componentId = dialog.dataset.componentId;
    const component = document.querySelector(`[data-id="${componentId}"]`);
    if (component) {
        const componentStates = window.componentStates;
        const currentState = (componentStates && componentStates.has(componentId)) ? componentStates.get(componentId) : 0;

        if (currentState > 0) {
            // 临时更新LED颜色进行预览
            component.dataset.ledColor = color;
            updateLEDDiode(component, currentState);
        }
    }
}

// 应用LED配置
function applyLEDConfig(button) {
    try {
        const dialog = button.closest('.config-dialog');
        const componentId = dialog.dataset.componentId;
        const component = document.querySelector(`[data-id="${componentId}"]`);

        if (!component) {
            throw new Error('找不到对应的组件');
        }

        const bitWidth = parseInt(dialog.querySelector('#led-bitwidth').value);
        const color = dialog.querySelector('#led-color').value;
        const label = dialog.querySelector('#led-label').value;

        if (isNaN(bitWidth) || bitWidth < 1 || bitWidth > 8) {
            throw new Error('位宽必须是1-8之间的整数');
        }

        // 保存旧的配置用于比较
        const oldColor = component.dataset.ledColor;
        const oldBitWidth = parseInt(component.dataset.bitWidth) || 1;

        // 更新组件配置
        component.dataset.bitWidth = bitWidth.toString();
        component.dataset.ledColor = color;
        component.dataset.ledLabel = label || 'LED';

        const labelElement = component.querySelector('#led-label');
        if (labelElement) {
            labelElement.textContent = label || 'LED';
        }

        // 获取当前状态
        const componentStates = window.componentStates;
        const currentState = (componentStates && componentStates.has(componentId)) ? componentStates.get(componentId) : 0;

        // 如果颜色发生了变化，并且LED当前是亮着的，立即更新显示
        if (oldColor !== color && currentState > 0) {
            console.log(`LED颜色从 ${oldColor} 更改为 ${color}，立即更新显示`);
            updateLEDDiode(component, currentState);
        } else if (oldBitWidth !== bitWidth) {
            // 如果位宽发生变化，也需要更新显示
            console.log(`LED位宽从 ${oldBitWidth} 更改为 ${bitWidth}，更新显示`);
            updateLEDDiode(component, currentState);
        } else {
            // 正常更新显示
            updateLEDDiode(component, currentState);
        }

        // 更新组件标题
        if (bitWidth === 1) {
            component.title = `LED二极管 - 1位指示灯 (${label})`;
        } else {
            component.title = `LED二极管 - ${bitWidth}位数值指示 (${label})`;
        }



        document.body.removeChild(dialog);

    } catch (error) {
        console.error('应用LED配置失败:', error);
        alert('配置失败: ' + error.message);
    }
}

// 预览LED颜色效果
function previewLEDColor(turnOn) {
    const dialog = document.querySelector('.config-dialog');
    const componentId = dialog.dataset.componentId;
    const component = document.querySelector(`[data-id="${componentId}"]`);

    if (!component) {
        console.error('找不到LED组件');
        return;
    }

    // 获取当前配置的颜色
    const currentColor = dialog.querySelector('#led-color').value;
    const currentBitWidth = parseInt(dialog.querySelector('#led-bitwidth').value) || 1;

    // 临时保存原始配置
    const originalColor = component.dataset.ledColor;
    const originalBitWidth = component.dataset.bitWidth;

    // 应用预览配置
    component.dataset.ledColor = currentColor;
    component.dataset.bitWidth = currentBitWidth.toString();

    if (turnOn) {
        // 点亮LED预览
        updateLEDDiode(component, 1); // 强制点亮
    } else {
        // 熄灭LED
        updateLEDDiode(component, 0); // 强制熄灭

        // 恢复原始配置
        component.dataset.ledColor = originalColor;
        component.dataset.bitWidth = originalBitWidth;
    }
}

// 取消LED配置
function cancelLEDConfig(button) {
    const dialog = button.closest('.config-dialog');
    const componentId = dialog.dataset.componentId;
    const component = document.querySelector(`[data-id="${componentId}"]`);

    // 恢复LED到实际状态和原始配置
    if (component) {
        // 恢复原始配置（如果在预览过程中被修改了）
        const originalColor = dialog.dataset.originalColor;
        const originalBitWidth = dialog.dataset.originalBitWidth;
        const originalLabel = dialog.dataset.originalLabel;

        if (originalColor) component.dataset.ledColor = originalColor;
        if (originalBitWidth) component.dataset.bitWidth = originalBitWidth;
        if (originalLabel) component.dataset.ledLabel = originalLabel;

        // 恢复到实际电路状态
        const componentStates = window.componentStates;
        const actualState = (componentStates && componentStates.has(componentId)) ? componentStates.get(componentId) : 0;
        updateLEDDiode(component, actualState);
    }

    document.body.removeChild(dialog);
}

// 导出模块
window.LEDDiodeComponent = {
    svg: ledDiodeSvg,
    logic: ledDiodeLogic,
    initialize: initializeLEDDiode,
    updateLEDDiode: updateLEDDiode
};

// 将配置函数暴露到全局作用域
window.setLEDColor = setLEDColor;
window.previewLEDColor = previewLEDColor;
window.applyLEDConfig = applyLEDConfig;
window.cancelLEDConfig = cancelLEDConfig;

console.log('LED二极管组件加载完成');
