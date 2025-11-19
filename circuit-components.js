/**
 * 电路线路组件模块
 * 包含引脚、分线器、探针、电源、接地等组件的定义和逻辑
 */

// 线路组件SVG模板
const circuitComponentSvgs = {
    'pin': `
        <svg class="component-svg" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
            <g id="pin-group" transform="translate(60, 40)">
                <rect id="pin-bg" x="-30" y="-20" width="60" height="40" rx="8" fill="#FFD700" stroke="black" stroke-width="2" class="state-0"/>
                <text x="0" y="-12" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" fill="black">PIN</text>
                <text id="pin-mode" x="0" y="-2" font-family="Arial" font-size="9" text-anchor="middle" fill="black">IN</text>
                <text id="pin-state" x="0" y="8" font-family="Arial" font-size="7" text-anchor="middle" fill="black">2-STATE</text>

                <!-- 数据值显示 -->
                <text id="pin-value" x="0" y="18" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="black">0</text>

                <!-- 输入模式时的输出锚点（右侧） -->
                <g id="pin-input-mode" style="display: block;">
                    <circle class="anchor output-anchor" data-anchor-type="output" cx="40" cy="0" r="5" fill="black"/>
                    <line x1="30" y1="0" x2="35" y2="0" stroke="black" stroke-width="2"/>
                </g>

                <!-- 输出模式时的输入锚点（左侧） -->
                <g id="pin-output-mode" style="display: none;">
                    <circle class="anchor input-anchor" data-anchor-type="input" cx="-40" cy="0" r="5" fill="black"/>
                    <line x1="-35" y1="0" x2="-30" y2="0" stroke="black" stroke-width="2"/>
                </g>
            </g>
        </svg>
    `,
    'splitter': `
        <svg class="component-svg" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
            <g id="splitter-group" transform="translate(100, 90)">
                <!-- 主体矩形 -->
                <rect id="splitter-body" x="-60" y="-50" width="120" height="100" rx="8" fill="#E6E6FA" stroke="black" stroke-width="2"/>

                <!-- 标题 -->
                <text x="0" y="-30" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="black">SPLITTER</text>
                <text x="0" y="-18" font-family="Arial" font-size="10" text-anchor="middle" fill="black">分线器</text>

                <!-- 配置信息 -->
                <text id="splitter-mode" x="0" y="-5" font-family="Arial" font-size="9" text-anchor="middle" fill="black">拆分模式</text>
                <text id="splitter-config" x="0" y="8" font-family="Arial" font-size="8" text-anchor="middle" fill="black">8→2×4</text>
                <text id="splitter-ports" x="0" y="20" font-family="Arial" font-size="7" text-anchor="middle" fill="black">2端口</text>

                <!-- 动态生成的锚点容器 -->
                <g id="splitter-anchors">
                    <!-- 默认配置：一个输入，两个输出 -->
                    <!-- 输入端 -->
                    <circle class="anchor input-anchor" data-anchor-type="input" data-port="input" cx="-80" cy="0" r="5" fill="black"/>
                    <line x1="-75" y1="0" x2="-60" y2="0" stroke="black" stroke-width="3"/>
                    <text x="-90" y="5" font-family="Arial" font-size="8" fill="black">IN</text>

                    <!-- 输出端 -->
                    <circle class="anchor output-anchor" data-anchor-type="output" data-port="output1" cx="80" cy="-15" r="4" fill="black"/>
                    <line x1="60" y1="-15" x2="75" y2="-15" stroke="black" stroke-width="2"/>
                    <text x="85" y="-10" font-family="Arial" font-size="8" fill="black">O1</text>

                    <circle class="anchor output-anchor" data-anchor-type="output" data-port="output2" cx="80" cy="15" r="4" fill="black"/>
                    <line x1="60" y1="15" x2="75" y2="15" stroke="black" stroke-width="2"/>
                    <text x="85" y="20" font-family="Arial" font-size="8" fill="black">O2</text>
                </g>
            </g>
        </svg>
    `,
    'probe': `
        <svg class="component-svg" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
            <g id="probe-group" transform="translate(60, 40)">
                <rect x="-35" y="-20" width="70" height="40" rx="8" fill="#FF6B35" stroke="black" stroke-width="2"/>
                <text x="0" y="-5" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="white">探针</text>
                <text id="probe-value" x="0" y="10" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="white">0</text>
                
                <!-- 输入锚点 -->
                <circle class="anchor input-anchor" data-anchor-type="input" cx="-50" cy="0" r="5" fill="black"/>
                <line x1="-45" y1="0" x2="-35" y2="0" stroke="black" stroke-width="2"/>
                
                <!-- 显示标签 -->
                <text id="probe-label" x="0" y="-35" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="black">PROBE</text>
            </g>
        </svg>
    `,
    'power': `
        <svg class="component-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g id="power-group" transform="translate(50, 50)">
                <rect x="-25" y="-25" width="50" height="50" rx="8" fill="#DC143C" stroke="black" stroke-width="2"/>
                <text x="0" y="-8" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="white">VCC</text>
                <text x="0" y="5" font-family="Arial" font-size="10" text-anchor="middle" fill="white">电源</text>
                <text x="0" y="16" font-family="Arial" font-size="8" text-anchor="middle" fill="white">+5V</text>
                
                <!-- 输出锚点 -->
                <circle class="anchor output-anchor" data-anchor-type="output" cx="0" cy="35" r="5" fill="black"/>
                <line x1="0" y1="25" x2="0" y2="30" stroke="black" stroke-width="2"/>
                
                <!-- 电源符号 -->
                <line x1="-12" y1="-35" x2="12" y2="-35" stroke="black" stroke-width="3"/>
                <line x1="-8" y1="-30" x2="8" y2="-30" stroke="black" stroke-width="2"/>
                <line x1="-4" y1="-25" x2="4" y2="-25" stroke="black" stroke-width="1"/>
            </g>
        </svg>
    `,
    'ground': `
        <svg class="component-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g id="ground-group" transform="translate(50, 50)">
                <rect x="-25" y="-25" width="50" height="50" rx="8" fill="#4B0082" stroke="black" stroke-width="2"/>
                <text x="0" y="-8" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="white">GND</text>
                <text x="0" y="5" font-family="Arial" font-size="10" text-anchor="middle" fill="white">接地</text>
                <text x="0" y="16" font-family="Arial" font-size="8" text-anchor="middle" fill="white">0V</text>
                
                <!-- 输入锚点 -->
                <circle class="anchor input-anchor" data-anchor-type="input" cx="0" cy="-35" r="5" fill="black"/>
                <line x1="0" y1="-30" x2="0" y2="-25" stroke="black" stroke-width="2"/>
                
                <!-- 接地符号 -->
                <line x1="-15" y1="30" x2="15" y2="30" stroke="black" stroke-width="3"/>
                <line x1="-10" y1="35" x2="10" y2="35" stroke="black" stroke-width="2"/>
                <line x1="-5" y1="40" x2="5" y2="40" stroke="black" stroke-width="1"/>
            </g>
        </svg>
    `
};

// 线路组件逻辑函数
const circuitLogicFunctions = {
    'pin': (inputs, component) => {
        // 引脚逻辑：根据配置模式工作
        const mode = component.dataset.pinMode || 'input';
        const isTriState = component.dataset.triState === 'true';

        if (mode === 'input') {
            // 输入模式：输出当前设置的值
            const pinValue = component.dataset.pinValue || '0';
            if (isTriState && (pinValue === 'x' || pinValue === 'X')) {
                return 'x'; // 三态浮动状态
            }
            return parseInt(pinValue);
        } else if (mode === 'output') {
            // 输出模式：显示输入的值
            return inputs[0] || 0;
        } else {
            // 双向模式：根据连接情况决定
            const pinValue = component.dataset.pinValue || '0';
            if (inputs[0] !== undefined) {
                return inputs[0];
            } else if (isTriState && (pinValue === 'x' || pinValue === 'X')) {
                return 'x';
            }
            return parseInt(pinValue);
        }
    },
    
    'splitter': (inputs, component, outputAnchor = null) => {
        // 分线器逻辑：根据配置拆分或合并
        const mode = component.dataset.splitterMode || 'split';
        const portConfigs = JSON.parse(component.dataset.splitterPorts || '[{"type":"input","bitWidth":8},{"type":"output","bitWidth":4},{"type":"output","bitWidth":4}]');

        if (mode === 'split') {
            // 拆分模式：将一个多位输入拆分为多个输出
            let inputValue = inputs[0] || 0;
            let inputBits = [];

            console.log('=== 分线器拆分调试 ===');
            console.log('分线器配置:', component.dataset.splitterPorts);
            console.log('分线器原始输入:', inputValue, '类型:', typeof inputValue, '是否为数组:', Array.isArray(inputValue));
            console.log('分线器inputs数组:', inputs, 'inputs长度:', inputs.length);
            console.log('inputs[0]详细信息:', inputs[0], '类型:', typeof inputs[0], '是否为数组:', Array.isArray(inputs[0]));
            console.log('输出锚点信息:', outputAnchor ? outputAnchor.getAttribute('data-port') : 'null');

            // 如果输入是数组（多位数据），直接使用数组
            if (Array.isArray(inputValue)) {
                console.log('分线器接收到数组输入:', inputValue);
                inputBits = [...inputValue]; // 复制数组
                // 同时计算数值用于显示
                inputValue = 0;
                for (let i = 0; i < inputBits.length; i++) {
                    const bitValue = inputBits[i] || 0;
                    // 大端序：第i个元素是第(length-1-i)位
                    const bitPosition = inputBits.length - 1 - i;
                    inputValue |= (bitValue << bitPosition);
                    console.log(`  数组索引${i} -> 位${bitPosition}: ${bitValue}, 累计值: ${inputValue}`);
                }
                console.log('数组转换后的数值:', inputValue);
            } else {
                console.log('输入不是数组，直接使用数值:', inputValue);
                // 将数值转换为位数组
                const inputBitWidth = portConfigs.find(p => p.type === 'input')?.bitWidth || 4;
                for (let i = 0; i < inputBitWidth; i++) {
                    inputBits[i] = (inputValue >> (inputBitWidth - 1 - i)) & 1;
                }
                console.log('数值转位数组过程:');
                console.log('  输入数值:', inputValue, '位宽:', inputBitWidth);
                console.log('  二进制表示:', inputValue.toString(2).padStart(inputBitWidth, '0'));
                console.log('  转换后位数组:', inputBits);
            }

            const inputBitWidth = portConfigs.find(p => p.type === 'input')?.bitWidth || 8;
            const inputBinary = inputValue.toString(2).padStart(inputBitWidth, '0');

            // 如果指定了输出锚点，返回对应的输出值
            if (outputAnchor) {
                const portId = outputAnchor.getAttribute('data-port');
                const outputPorts = portConfigs.filter(p => p.type === 'output');

                // 找到对应的输出端口配置
                let outputIndex = -1;
                if (portId) {
                    // 根据data-port属性查找
                    if (portId === 'output1') {
                        outputIndex = 0; // 第一个输出端口对应位0-1
                    } else if (portId === 'output2') {
                        outputIndex = 1; // 第二个输出端口对应位2-3
                    } else {
                        const portNumber = parseInt(portId.replace('output', '')) - 1;
                        outputIndex = portNumber;
                    }
                } else {
                    // 根据锚点位置查找（备用方法）
                    const allOutputAnchors = Array.from(component.querySelectorAll('.output-anchor'));
                    outputIndex = allOutputAnchors.indexOf(outputAnchor);
                }

                if (outputIndex >= 0 && outputIndex < outputPorts.length) {
                    const portConfig = outputPorts[outputIndex];
                    const bitWidth = portConfig.bitWidth || 1;

                    // 计算该输出端口对应的位范围（从高位开始分配）
                    let bitStart = 0;
                    for (let i = 0; i < outputIndex; i++) {
                        bitStart += outputPorts[i].bitWidth || 1;
                    }

                    // 从位数组中提取对应的位（从高位开始）
                    const outputBits = [];
                    for (let bit = 0; bit < bitWidth; bit++) {
                        const bitIndex = bitStart + bit;
                        if (bitIndex < inputBits.length) {
                            outputBits.push(inputBits[bitIndex] || 0);
                        } else {
                            outputBits.push(0);
                        }
                    }

                    // 计算数值用于显示（高位在前）
                    let portValue = 0;
                    for (let i = 0; i < outputBits.length; i++) {
                        portValue |= (outputBits[i] << (bitWidth - 1 - i));
                    }

                    // 生成对应的二进制字符串用于调试
                    const portBits = outputBits.map(b => b.toString()).join('');

                    // 计算位范围标签（用于显示，从高位开始）
                    const bitRangeStart = inputBitWidth - 1 - bitStart;
                    const bitRangeEnd = inputBitWidth - bitStart - bitWidth;
                    const bitRangeLabel = bitWidth === 1 ? `${bitRangeStart}` : `${bitRangeEnd}-${bitRangeStart}`;

                    console.log(`分线器拆分详细调试:`);
                    console.log(`  输入位数组: [${inputBits.join(',')}] (从高位到低位)`);
                    console.log(`  输入值: ${inputValue} (二进制: ${inputBinary})`);
                    console.log(`  输出索引: ${outputIndex}, 端口ID: ${outputAnchor?.getAttribute('data-port')}`);
                    console.log(`  位起始索引: ${bitStart}, 位宽: ${bitWidth}, 位范围: ${bitRangeLabel}`);
                    console.log(`  位提取过程:`);
                    for (let bit = 0; bit < bitWidth; bit++) {
                        const bitIndex = bitStart + bit;
                        const bitValue = inputBits[bitIndex] || 0;
                        const actualBitPosition = inputBitWidth - 1 - bitIndex;
                        console.log(`    输入位${actualBitPosition}: inputBits[${bitIndex}] = ${bitValue}, 放在输出位${bitWidth - 1 - bit}`);
                    }
                    console.log(`  输出位数组: [${outputBits.join(',')}] (从高位到低位)`);
                    console.log(`  最终输出: ${portValue} (二进制: ${portBits})`);

                    // 返回位数组而不是数值
                    return outputBits;
                }
            }

            // 如果没有指定输出锚点，返回第一个输出的值（兼容性）
            const firstOutputConfig = portConfigs.find(p => p.type === 'output');
            if (firstOutputConfig) {
                const bitWidth = firstOutputConfig.bitWidth || 1;
                const portBits = inputBinary.slice(-bitWidth) || '0';
                return parseInt(portBits, 2) || 0;
            }

            return 0;
        } else {
            // 合并模式：将多个输入合并为一个输出
            let combinedBinary = '';
            let inputIndex = 0;

            for (const portConfig of portConfigs) {
                if (portConfig.type === 'input' && inputIndex < inputs.length) {
                    const inputValue = inputs[inputIndex] || 0;
                    const bitWidth = portConfig.bitWidth || 1;
                    const inputBinary = inputValue.toString(2).padStart(bitWidth, '0');
                    combinedBinary = inputBinary + combinedBinary; // 高位在前
                    inputIndex++;
                }
            }

            const result = parseInt(combinedBinary, 2) || 0;
            console.log(`分线器合并: 输入=${inputs}, 输出=${result}(${combinedBinary})`);
            return result;
        }
    },
    
    'probe': (inputs, component) => {
        // 探针逻辑：显示输入值，不改变信号
        const value = inputs[0] || 0;
        updateProbeDisplay(component, value);
        return value;
    },
    
    'power': () => {
        // 电源逻辑：始终输出高电平
        return 1;
    },
    
    'ground': () => {
        // 接地逻辑：始终输出低电平
        return 0;
    }
};

// 线路组件初始化函数
function initializeCircuitComponent(componentDiv, type) {
    const id = componentDiv.dataset.id;
    
    switch(type) {
        case 'pin':
            // 引脚初始化
            componentDiv.dataset.pinMode = 'input';
            componentDiv.dataset.pinValue = '0';
            componentDiv.dataset.triState = 'false';
            componentDiv.style.cursor = 'pointer';
            componentDiv.title = '引脚 - 双击配置输入/输出模式';

            // 初始化锚点显示状态和值显示（默认为输入模式）
            setTimeout(() => {
                const inputModeGroup = componentDiv.querySelector('#pin-input-mode');
                const outputModeGroup = componentDiv.querySelector('#pin-output-mode');

                if (inputModeGroup && outputModeGroup) {
                    inputModeGroup.style.display = 'block';  // 输入模式：显示输出锚点
                    outputModeGroup.style.display = 'none'; // 隐藏输入锚点
                }

                // 初始化值显示
                const pinValue = componentDiv.dataset.pinValue || '0';
                const isTriState = componentDiv.dataset.triState === 'true';
                let initialValue;

                if (isTriState && (pinValue === 'x' || pinValue === 'X')) {
                    initialValue = 'x';
                } else {
                    initialValue = parseInt(pinValue);
                }

                updatePinDisplay(componentDiv, initialValue);
            }, 0);

            // 添加双击配置事件
            componentDiv.addEventListener('dblclick', () => showPinConfigDialog(componentDiv));
            break;
            
        case 'splitter':
            // 分线器初始化
            componentDiv.dataset.splitterMode = 'split';
            componentDiv.dataset.splitterConfig = '4→2×2';
            componentDiv.dataset.splitterPorts = JSON.stringify([
                {type: 'input', bitWidth: 4, label: 'IN'},
                {type: 'output', bitWidth: 2, label: 'O1'},
                {type: 'output', bitWidth: 2, label: 'O2'}
            ]);
            componentDiv.style.cursor = 'pointer';
            componentDiv.title = '分线器 - 双击配置拆分/合并方式';

            // 初始化显示
            updateSplitterDisplay(componentDiv);

            // 添加双击配置事件
            componentDiv.addEventListener('dblclick', () => showSplitterConfigDialog(componentDiv));
            break;
            
        case 'probe':
            // 探针初始化
            componentDiv.style.cursor = 'default';
            componentDiv.title = '探针 - 显示电路中给定点的值';
            break;
            
        case 'power':
            // 电源初始化
            componentDiv.style.cursor = 'default';
            componentDiv.title = '电源 - 提供高电平信号 (+5V)';
            break;
            
        case 'ground':
            // 接地初始化
            componentDiv.style.cursor = 'default';
            componentDiv.title = '接地 - 提供低电平信号 (0V)';
            break;
    }
}

// 更新探针显示
function updateProbeDisplay(component, value) {
    const probeValue = component.querySelector('#probe-value');
    if (probeValue) {
        probeValue.textContent = value.toString();

        // 根据值改变颜色
        if (value > 0) {
            probeValue.setAttribute('fill', '#00FF00');
        } else {
            probeValue.setAttribute('fill', '#FF0000');
        }
    }
}

// 更新引脚显示
function updatePinDisplay(component, value) {
    const pinValue = component.querySelector('#pin-value');
    const pinBg = component.querySelector('#pin-bg');

    if (pinValue) {
        // 处理不同类型的值
        if (value === 'x' || value === 'X') {
            pinValue.textContent = 'X';
            pinValue.setAttribute('fill', 'orange');
        } else {
            pinValue.textContent = value.toString();

            // 根据值改变颜色
            if (value > 0) {
                pinValue.setAttribute('fill', 'white');
            } else {
                pinValue.setAttribute('fill', 'black');
            }
        }
    }

    if (pinBg) {
        // 更新背景颜色以反映状态
        if (value === 'x' || value === 'X') {
            pinBg.setAttribute('fill', '#FFA500'); // 橙色表示浮动状态
            pinBg.classList.remove('state-0', 'state-1');
            pinBg.classList.add('state-x');
        } else if (value > 0) {
            pinBg.setAttribute('fill', '#32CD32'); // 绿色表示高电平
            pinBg.classList.remove('state-0', 'state-x');
            pinBg.classList.add('state-1');
        } else {
            pinBg.setAttribute('fill', '#FFD700'); // 金色表示低电平
            pinBg.classList.remove('state-1', 'state-x');
            pinBg.classList.add('state-0');
        }
    }
}

// 更新分线器显示
function updateSplitterDisplay(component) {
    const mode = component.dataset.splitterMode || 'split';
    const portConfigs = JSON.parse(component.dataset.splitterPorts || '[]');

    // 更新模式显示
    const modeText = component.querySelector('#splitter-mode');
    if (modeText) {
        modeText.textContent = mode === 'split' ? '拆分模式' : '合并模式';
    }

    // 更新配置显示
    const configText = component.querySelector('#splitter-config');
    if (configText && portConfigs.length > 0) {
        if (mode === 'split') {
            const inputPort = portConfigs.find(p => p.type === 'input');
            const outputPorts = portConfigs.filter(p => p.type === 'output');
            if (inputPort && outputPorts.length > 0) {
                const outputDesc = outputPorts.map(p => `${p.bitWidth}`).join('×');
                configText.textContent = `${inputPort.bitWidth}→${outputDesc}`;
            }
        } else {
            const inputPorts = portConfigs.filter(p => p.type === 'input');
            const outputPort = portConfigs.find(p => p.type === 'output');
            if (inputPorts.length > 0 && outputPort) {
                const inputDesc = inputPorts.map(p => `${p.bitWidth}`).join('×');
                configText.textContent = `${inputDesc}→${outputPort.bitWidth}`;
            }
        }
    }

    // 更新端口数量显示
    const portsText = component.querySelector('#splitter-ports');
    if (portsText) {
        const totalPorts = portConfigs.length;
        portsText.textContent = `${totalPorts}端口`;
    }

    // 重新生成锚点
    regenerateSplitterAnchors(component);
}

// 重新生成分线器锚点
function regenerateSplitterAnchors(component) {
    const anchorsContainer = component.querySelector('#splitter-anchors');
    if (!anchorsContainer) return;

    const mode = component.dataset.splitterMode || 'split';
    const portConfigs = JSON.parse(component.dataset.splitterPorts || '[]');

    // 保存现有连接关系
    const savedConnections = new Map();
    const savedWires = [];
    const oldAnchors = Array.from(component.querySelectorAll('.anchor'));

    // 保存锚点连接
    oldAnchors.forEach(oldAnchor => {
        const anchorType = oldAnchor.getAttribute('data-anchor-type');
        const portId = oldAnchor.getAttribute('data-port');

        if (typeof window !== 'undefined' && window.anchorConnections && window.anchorConnections.has(oldAnchor)) {
            savedConnections.set(`${anchorType}-${portId}`, window.anchorConnections.get(oldAnchor));
        }
    });

    // 保存连线连接
    if (typeof window !== 'undefined' && window.wires) {
        window.wires.forEach(wire => {
            if ((wire.start && oldAnchors.includes(wire.start)) ||
                (wire.end && oldAnchors.includes(wire.end))) {
                savedWires.push({
                    wire: wire,
                    startType: wire.start ? wire.start.getAttribute('data-anchor-type') : null,
                    startPort: wire.start ? wire.start.getAttribute('data-port') : null,
                    endType: wire.end ? wire.end.getAttribute('data-anchor-type') : null,
                    endPort: wire.end ? wire.end.getAttribute('data-port') : null,
                    isStartOnThisComponent: wire.start && oldAnchors.includes(wire.start),
                    isEndOnThisComponent: wire.end && oldAnchors.includes(wire.end)
                });
            }
        });
    }

    // 清空现有锚点
    anchorsContainer.innerHTML = '';

    let inputCount = 0;
    let outputCount = 0;
    let bitIndex = 0; // 用于计算位分配

    portConfigs.forEach((portConfig) => {
        if (portConfig.type === 'input') {
            // 生成输入锚点
            const y = mode === 'split' ? 0 : (inputCount - (portConfigs.filter(p => p.type === 'input').length - 1) / 2) * 25;
            const anchorGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            anchorGroup.innerHTML = `
                <circle class="anchor input-anchor" data-anchor-type="input" data-port="input${inputCount + 1}" cx="-80" cy="${y}" r="5" fill="black"/>
                <line x1="-75" y1="${y}" x2="-60" y2="${y}" stroke="black" stroke-width="3"/>
                <text x="-90" y="${y + 5}" font-family="Arial" font-size="8" fill="black">${portConfig.label || `I${inputCount + 1}`}</text>
                <text x="-90" y="${y - 8}" font-family="Arial" font-size="6" fill="black">${portConfig.bitWidth}b</text>
            `;
            anchorsContainer.appendChild(anchorGroup);
            inputCount++;
        } else if (portConfig.type === 'output') {
            // 生成输出锚点
            const y = mode === 'split' ? (outputCount - (portConfigs.filter(p => p.type === 'output').length - 1) / 2) * 25 : 0;

            // 计算位分配标签
            const bitWidth = portConfig.bitWidth || 1;
            const bitRangeStart = bitIndex;
            const bitRangeEnd = bitIndex + bitWidth - 1;
            const bitRangeLabel = bitWidth === 1 ? `${bitRangeStart}` : `${bitRangeStart}-${bitRangeEnd}`;

            const anchorGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            anchorGroup.innerHTML = `
                <circle class="anchor output-anchor" data-anchor-type="output" data-port="output${outputCount + 1}" cx="80" cy="${y}" r="4" fill="black"/>
                <line x1="60" y1="${y}" x2="75" y2="${y}" stroke="black" stroke-width="2"/>
                <text x="85" y="${y + 5}" font-family="Arial" font-size="8" fill="black">${portConfig.label || `O${outputCount + 1}`}</text>
                <text x="85" y="${y - 8}" font-family="Arial" font-size="6" fill="black">${bitRangeLabel}</text>
            `;
            anchorsContainer.appendChild(anchorGroup);

            // 在分线器主体上显示位分配信息
            if (mode === 'split') {
                const bitLabelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                bitLabelGroup.innerHTML = `
                    <text x="30" y="${y + 3}" font-family="Arial" font-size="7" fill="black" font-weight="bold">${bitRangeLabel}</text>
                `;
                anchorsContainer.appendChild(bitLabelGroup);
            }

            outputCount++;
            bitIndex += bitWidth;
        }
    });

    // 恢复连接关系
    const newAnchors = Array.from(component.querySelectorAll('.anchor'));

    // 恢复锚点连接
    newAnchors.forEach(newAnchor => {
        const anchorType = newAnchor.getAttribute('data-anchor-type');
        const portId = newAnchor.getAttribute('data-port');
        const key = `${anchorType}-${portId}`;

        if (savedConnections.has(key)) {
            const connections = savedConnections.get(key);
            if (typeof window !== 'undefined' && window.anchorConnections && connections) {
                window.anchorConnections.set(newAnchor, [...connections]);

                // 更新反向连接
                connections.forEach(connectedAnchor => {
                    if (window.anchorConnections.has(connectedAnchor)) {
                        const reverseConnections = window.anchorConnections.get(connectedAnchor);
                        // 移除旧锚点引用，添加新锚点引用
                        const filteredConnections = reverseConnections.filter(anchor =>
                            !oldAnchors.includes(anchor)
                        );
                        filteredConnections.push(newAnchor);
                        window.anchorConnections.set(connectedAnchor, filteredConnections);
                    }
                });
            }
        }
    });

    // 恢复连线连接
    savedWires.forEach(wireInfo => {
        if (wireInfo.isStartOnThisComponent) {
            const newStartAnchor = newAnchors.find(anchor =>
                anchor.getAttribute('data-anchor-type') === wireInfo.startType &&
                anchor.getAttribute('data-port') === wireInfo.startPort
            );
            if (newStartAnchor) {
                wireInfo.wire.start = newStartAnchor;
            }
        }

        if (wireInfo.isEndOnThisComponent) {
            const newEndAnchor = newAnchors.find(anchor =>
                anchor.getAttribute('data-anchor-type') === wireInfo.endType &&
                anchor.getAttribute('data-port') === wireInfo.endPort
            );
            if (newEndAnchor) {
                wireInfo.wire.end = newEndAnchor;
            }
        }
    });

    // 强制重新传播信号
    setTimeout(() => {
        if (typeof window !== 'undefined' && window.propagateSignal) {
            console.log('分线器配置更新后重新传播信号');
            window.propagateSignal();
        }
    }, 50);
}

// 显示引脚配置对话框
function showPinConfigDialog(component) {
    const currentMode = component.dataset.pinMode || 'input';
    const currentTriState = component.dataset.triState === 'true';
    const currentValue = component.dataset.pinValue || '0';

    // 判断当前是否为输出引脚
    const isOutput = currentMode === 'output';

    const dialog = document.createElement('div');
    dialog.className = 'config-dialog';
    dialog.innerHTML = `
        <div class="config-dialog-content">
            <h3>🔧 引脚配置</h3>

            <div class="config-group">
                <label><strong>Output?（为输出引脚？）</strong></label>
                <p class="config-description">确定针脚是输出还是输入，No表示输入（与输入端口的功能一致），Yes表示输出，与输出端口的功能一致</p>
                <div class="radio-group">
                    <label class="radio-option">
                        <input type="radio" name="pin-output" value="no" ${!isOutput ? 'checked' : ''}>
                        <span class="radio-label no-option">No (输入)</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="pin-output" value="yes" ${isOutput ? 'checked' : ''}>
                        <span class="radio-label yes-option">Yes (输出)</span>
                    </label>
                </div>
            </div>

            <div class="config-group">
                <label><strong>Three-state?（是否三态）</strong></label>
                <p class="config-description">如果选Yes，数据每一位都有 0,1,x 三种状态（x 表示不确定，或称为浮动）<br>否则只有 0,1 两种状态</p>
                <div class="radio-group">
                    <label class="radio-option">
                        <input type="radio" name="pin-tristate" value="no" ${!currentTriState ? 'checked' : ''}>
                        <span class="radio-label no-option">No (二态: 0,1)</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="pin-tristate" value="yes" ${currentTriState ? 'checked' : ''}>
                        <span class="radio-label yes-option">Yes (三态: 0,1,x)</span>
                    </label>
                </div>
            </div>

            <div class="config-group" id="value-group" style="${isOutput ? 'display:none' : ''}">
                <label><strong>输入值:</strong></label>
                <div id="two-state-input" style="display: ${!currentTriState ? 'block' : 'none'}">
                    <input type="number" id="pin-value-input" value="${currentValue}" min="0" max="1" step="1">
                </div>
                <div id="three-state-input" style="display: ${currentTriState ? 'block' : 'none'}">
                    <select id="pin-tristate-value">
                        <option value="0" ${currentValue === '0' ? 'selected' : ''}>0 (低电平)</option>
                        <option value="1" ${currentValue === '1' ? 'selected' : ''}>1 (高电平)</option>
                        <option value="x" ${currentValue === 'x' ? 'selected' : ''}>X (浮动/不确定)</option>
                    </select>
                </div>
            </div>

            <div class="config-buttons">
                <button onclick="applyPinConfig(this)" class="btn-confirm">确定</button>
                <button onclick="cancelPinConfig(this)" class="btn-cancel">取消</button>
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
        max-width: 500px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;

    // 添加样式到对话框内容
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

        .radio-group {
            display: flex;
            gap: 15px;
            margin-top: 10px;
        }

        .radio-option {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 8px 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            transition: all 0.2s ease;
            flex: 1;
        }

        .radio-option:hover {
            border-color: #2196F3;
            background: #f0f8ff;
        }

        .radio-option input[type="radio"] {
            margin-right: 8px;
            transform: scale(1.2);
        }

        .radio-option input[type="radio"]:checked + .radio-label {
            font-weight: bold;
            color: #2196F3;
        }

        .radio-option.checked {
            border-color: #2196F3;
            background: #e3f2fd;
        }

        .no-option {
            color: #f44336;
        }

        .yes-option {
            color: #4caf50;
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
    `;
    dialog.appendChild(style);

    dialog.dataset.componentId = component.dataset.id;
    document.body.appendChild(dialog);

    // 更新单选按钮样式的函数
    function updateRadioStyles(groupName) {
        const radios = dialog.querySelectorAll(`input[name="${groupName}"]`);
        radios.forEach(radio => {
            const option = radio.closest('.radio-option');
            if (radio.checked) {
                option.classList.add('checked');
            } else {
                option.classList.remove('checked');
            }
        });
    }

    // 监听输出模式变化
    const outputRadios = dialog.querySelectorAll('input[name="pin-output"]');
    outputRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const valueGroup = dialog.querySelector('#value-group');
            const twoStateInput = dialog.querySelector('#two-state-input');
            const threeStateInput = dialog.querySelector('#three-state-input');
            const tristateRadio = dialog.querySelector('input[name="pin-tristate"]:checked');

            if (this.value === 'yes') {
                valueGroup.style.display = 'none';
            } else {
                valueGroup.style.display = 'block';

                // 根据当前三态设置显示正确的输入控件
                const isTriState = tristateRadio && tristateRadio.value === 'yes';
                if (isTriState) {
                    twoStateInput.style.display = 'none';
                    threeStateInput.style.display = 'block';
                } else {
                    twoStateInput.style.display = 'block';
                    threeStateInput.style.display = 'none';
                }
            }

            // 更新选中状态样式
            updateRadioStyles('pin-output');
        });
    });

    // 监听三态模式变化
    const tristateRadios = dialog.querySelectorAll('input[name="pin-tristate"]');
    tristateRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateRadioStyles('pin-tristate');

            // 切换输入控件
            const twoStateInput = dialog.querySelector('#two-state-input');
            const threeStateInput = dialog.querySelector('#three-state-input');
            const valueGroup = dialog.querySelector('#value-group');

            if (this.value === 'yes' && valueGroup.style.display !== 'none') {
                // 切换到三态模式
                twoStateInput.style.display = 'none';
                threeStateInput.style.display = 'block';
            } else if (this.value === 'no' && valueGroup.style.display !== 'none') {
                // 切换到二态模式
                twoStateInput.style.display = 'block';
                threeStateInput.style.display = 'none';
            }
        });
    });

    // 初始化样式
    updateRadioStyles('pin-output');
    updateRadioStyles('pin-tristate');
}

// 应用引脚配置
function applyPinConfig(button) {
    try {
        const dialog = button.closest('.config-dialog');
        const componentId = dialog.dataset.componentId;
        const component = document.querySelector(`[data-id="${componentId}"]`);

        if (!component) {
            throw new Error('找不到对应的组件');
        }

        // 获取输出模式设置
        const outputRadio = dialog.querySelector('input[name="pin-output"]:checked');
        const isOutput = outputRadio ? outputRadio.value === 'yes' : false;
        const mode = isOutput ? 'output' : 'input';

        // 获取三态设置
        const tristateRadio = dialog.querySelector('input[name="pin-tristate"]:checked');
        const triState = tristateRadio ? tristateRadio.value === 'yes' : false;

        // 获取输入值（仅在输入模式下有效）
        let value = '0';
        if (!isOutput) {
            if (triState) {
                // 三态模式：从下拉选择框获取值
                const tristateSelect = dialog.querySelector('#pin-tristate-value');
                value = tristateSelect ? tristateSelect.value : '0';
            } else {
                // 二态模式：从数字输入框获取值
                const valueInput = dialog.querySelector('#pin-value-input');
                value = valueInput ? valueInput.value : '0';

                // 验证二态输入值
                const numValue = parseInt(value);
                if (isNaN(numValue) || numValue < 0 || numValue > 1) {
                    throw new Error('二态模式下输入值必须是 0 或 1');
                }
            }
        }

        // 更新组件数据
        component.dataset.pinMode = mode;
        component.dataset.triState = triState.toString();
        component.dataset.pinValue = value;

        // 更新显示
        const modeText = component.querySelector('#pin-mode');
        const stateText = component.querySelector('#pin-state');

        if (modeText) {
            modeText.textContent = isOutput ? 'OUT' : 'IN';
        }
        if (stateText) {
            stateText.textContent = triState ? '3-STATE' : '2-STATE';
        }

        // 根据模式切换锚点显示
        const inputModeGroup = component.querySelector('#pin-input-mode');
        const outputModeGroup = component.querySelector('#pin-output-mode');

        if (inputModeGroup && outputModeGroup) {
            if (isOutput) {
                // 输出模式：显示输入锚点，隐藏输出锚点
                inputModeGroup.style.display = 'none';
                outputModeGroup.style.display = 'block';
            } else {
                // 输入模式：显示输出锚点，隐藏输入锚点
                inputModeGroup.style.display = 'block';
                outputModeGroup.style.display = 'none';
            }
        }

        // 更新引脚值显示
        let currentValue;
        if (isOutput) {
            currentValue = 0; // 输出模式初始为0
        } else if (triState && (value === 'x' || value === 'X')) {
            currentValue = 'x'; // 三态浮动状态
        } else {
            currentValue = parseInt(value); // 普通数值
        }
        updatePinDisplay(component, currentValue);

        // 更新组件标题
        const modeDesc = isOutput ? '输出' : '输入';
        const stateDesc = triState ? '三态' : '二态';
        component.title = `引脚 - ${modeDesc}模式 (${stateDesc})`;

        console.log('引脚配置已更新:', {
            mode: mode,
            triState: triState,
            value: value
        });

        document.body.removeChild(dialog);

    } catch (error) {
        console.error('应用引脚配置失败:', error);
        alert('配置失败: ' + error.message);
    }
}

// 取消引脚配置
function cancelPinConfig(button) {
    const dialog = button.closest('.config-dialog');
    document.body.removeChild(dialog);
}

// 创建全局命名空间
window.CircuitComponents = {
    initialize: initializeCircuitComponent,
    showPinConfig: showPinConfigDialog,
    showSplitterConfig: showSplitterConfigDialog,
    svgs: circuitComponentSvgs,
    logic: circuitLogicFunctions
};

// 显示分线器配置对话框
function showSplitterConfigDialog(component) {
    const currentMode = component.dataset.splitterMode || 'split';
    const currentPorts = JSON.parse(component.dataset.splitterPorts || '[]');

    const dialog = document.createElement('div');
    dialog.className = 'config-dialog';
    dialog.innerHTML = `
        <div class="config-dialog-content" style="min-width: 500px;">
            <h3>🔀 分线器配置</h3>

            <div class="config-group">
                <label><strong>工作模式:</strong></label>
                <div style="margin: 10px 0;">
                    <label style="margin-right: 20px;">
                        <input type="radio" name="splitter-mode" value="split" ${currentMode === 'split' ? 'checked' : ''}>
                        拆分模式 (1输入 → 多输出)
                    </label>
                    <label>
                        <input type="radio" name="splitter-mode" value="merge" ${currentMode === 'merge' ? 'checked' : ''}>
                        合并模式 (多输入 → 1输出)
                    </label>
                </div>
            </div>

            <div class="config-group">
                <label><strong>端口配置:</strong></label>
                <div id="ports-config" style="margin: 10px 0;">
                    <!-- 端口配置将动态生成 -->
                </div>
                <button type="button" onclick="addSplitterPort()" style="margin: 5px; padding: 5px 10px; background: #28a745; color: white; border: none; border-radius: 3px;">添加端口</button>
            </div>

            <div class="config-group">
                <label><strong>预设配置:</strong></label>
                <select id="splitter-preset" style="margin: 5px 0; padding: 5px;">
                    <option value="">选择预设...</option>
                    <option value="4-2x2">4位拆分为2位×2</option>
                    <option value="5-2+3">5位拆分为2位+3位</option>
                    <option value="5-1+4">5位拆分为1位+4位</option>
                    <option value="6-2x3">6位拆分为2位×3</option>
                    <option value="8-4x2">8位拆分为4位×2</option>
                    <option value="8-2x4">8位拆分为2位×4</option>
                    <option value="8-1+3+4">8位拆分为1位+3位+4位</option>
                    <option value="16-8x2">16位拆分为8位×2</option>
                    <option value="4x2-8">4位×2合并为8位</option>
                    <option value="2x4-8">2位×4合并为8位</option>
                    <option value="8x2-16">8位×2合并为16位</option>
                </select>
                <button type="button" onclick="applySplitterPreset()" style="margin: 5px; padding: 5px 10px; background: #17a2b8; color: white; border: none; border-radius: 3px;">应用预设</button>
            </div>

            <div class="config-buttons">
                <button onclick="applySplitterConfig(this)">确定</button>
                <button onclick="cancelSplitterConfig(this)">取消</button>
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
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        max-height: 80vh;
        overflow-y: auto;
    `;

    dialog.dataset.componentId = component.dataset.id;
    document.body.appendChild(dialog);

    // 初始化端口配置显示
    updatePortsConfigDisplay(dialog, currentPorts);

    // 监听模式变化
    dialog.querySelectorAll('input[name="splitter-mode"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const portsConfig = getCurrentPortsConfig(dialog);
            updatePortsConfigDisplay(dialog, portsConfig);
        });
    });
}

// 更新端口配置显示
function updatePortsConfigDisplay(dialog, portsConfig) {
    const container = dialog.querySelector('#ports-config');
    const mode = dialog.querySelector('input[name="splitter-mode"]:checked').value;

    container.innerHTML = '';

    portsConfig.forEach((port, index) => {
        const portDiv = document.createElement('div');
        portDiv.style.cssText = 'margin: 5px 0; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background: #f9f9f9;';
        portDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <select onchange="updatePortType(${index}, this.value)" style="padding: 3px;">
                    <option value="input" ${port.type === 'input' ? 'selected' : ''}>输入</option>
                    <option value="output" ${port.type === 'output' ? 'selected' : ''}>输出</option>
                </select>
                <label>位宽:</label>
                <input type="number" value="${port.bitWidth || 1}" min="1" max="64" onchange="updatePortBitWidth(${index}, this.value)" style="width: 60px; padding: 3px;">
                <label>标签:</label>
                <input type="text" value="${port.label || ''}" onchange="updatePortLabel(${index}, this.value)" style="width: 60px; padding: 3px;">
                <button onclick="removePort(${index})" style="background: #dc3545; color: white; border: none; padding: 3px 8px; border-radius: 3px;">删除</button>
            </div>
        `;
        container.appendChild(portDiv);
    });
}

// 获取当前端口配置
function getCurrentPortsConfig(dialog) {
    const container = dialog.querySelector('#ports-config');
    const portDivs = container.children;
    const portsConfig = [];

    for (let i = 0; i < portDivs.length; i++) {
        const portDiv = portDivs[i];
        const typeSelect = portDiv.querySelector('select');
        const bitWidthInput = portDiv.querySelector('input[type="number"]');
        const labelInput = portDiv.querySelector('input[type="text"]');

        portsConfig.push({
            type: typeSelect.value,
            bitWidth: parseInt(bitWidthInput.value) || 1,
            label: labelInput.value || ''
        });
    }

    return portsConfig;
}

// 添加分线器端口
function addSplitterPort() {
    const dialog = document.querySelector('.config-dialog');
    const mode = dialog.querySelector('input[name="splitter-mode"]:checked').value;
    const currentPorts = getCurrentPortsConfig(dialog);

    // 根据模式添加合适的端口类型
    const newPort = {
        type: mode === 'split' ? 'output' : 'input',
        bitWidth: 4,
        label: ''
    };

    currentPorts.push(newPort);
    updatePortsConfigDisplay(dialog, currentPorts);
}

// 应用分线器预设
function applySplitterPreset() {
    const dialog = document.querySelector('.config-dialog');
    const preset = dialog.querySelector('#splitter-preset').value;

    if (!preset) return;

    let portsConfig = [];
    let mode = 'split';

    switch (preset) {
        case '4-2x2':
            mode = 'split';
            portsConfig = [
                {type: 'input', bitWidth: 4, label: 'IN'},
                {type: 'output', bitWidth: 2, label: 'O1'},
                {type: 'output', bitWidth: 2, label: 'O2'}
            ];
            break;
        case '5-2+3':
            mode = 'split';
            portsConfig = [
                {type: 'input', bitWidth: 5, label: 'IN'},
                {type: 'output', bitWidth: 2, label: 'O1'},
                {type: 'output', bitWidth: 3, label: 'O2'}
            ];
            break;
        case '5-1+4':
            mode = 'split';
            portsConfig = [
                {type: 'input', bitWidth: 5, label: 'IN'},
                {type: 'output', bitWidth: 1, label: 'O1'},
                {type: 'output', bitWidth: 4, label: 'O2'}
            ];
            break;
        case '6-2x3':
            mode = 'split';
            portsConfig = [
                {type: 'input', bitWidth: 6, label: 'IN'},
                {type: 'output', bitWidth: 2, label: 'O1'},
                {type: 'output', bitWidth: 2, label: 'O2'},
                {type: 'output', bitWidth: 2, label: 'O3'}
            ];
            break;
        case '8-4x2':
            mode = 'split';
            portsConfig = [
                {type: 'input', bitWidth: 8, label: 'IN'},
                {type: 'output', bitWidth: 4, label: 'O1'},
                {type: 'output', bitWidth: 4, label: 'O2'}
            ];
            break;
        case '8-2x4':
            mode = 'split';
            portsConfig = [
                {type: 'input', bitWidth: 8, label: 'IN'},
                {type: 'output', bitWidth: 2, label: 'O1'},
                {type: 'output', bitWidth: 2, label: 'O2'},
                {type: 'output', bitWidth: 2, label: 'O3'},
                {type: 'output', bitWidth: 2, label: 'O4'}
            ];
            break;
        case '8-1+3+4':
            mode = 'split';
            portsConfig = [
                {type: 'input', bitWidth: 8, label: 'IN'},
                {type: 'output', bitWidth: 1, label: 'O1'},
                {type: 'output', bitWidth: 3, label: 'O2'},
                {type: 'output', bitWidth: 4, label: 'O3'}
            ];
            break;
        case '16-8x2':
            mode = 'split';
            portsConfig = [
                {type: 'input', bitWidth: 16, label: 'IN'},
                {type: 'output', bitWidth: 8, label: 'O1'},
                {type: 'output', bitWidth: 8, label: 'O2'}
            ];
            break;
        case '4x2-8':
            mode = 'merge';
            portsConfig = [
                {type: 'input', bitWidth: 4, label: 'I1'},
                {type: 'input', bitWidth: 4, label: 'I2'},
                {type: 'output', bitWidth: 8, label: 'OUT'}
            ];
            break;
        case '2x4-8':
            mode = 'merge';
            portsConfig = [
                {type: 'input', bitWidth: 2, label: 'I1'},
                {type: 'input', bitWidth: 2, label: 'I2'},
                {type: 'input', bitWidth: 2, label: 'I3'},
                {type: 'input', bitWidth: 2, label: 'I4'},
                {type: 'output', bitWidth: 8, label: 'OUT'}
            ];
            break;
        case '8x2-16':
            mode = 'merge';
            portsConfig = [
                {type: 'input', bitWidth: 8, label: 'I1'},
                {type: 'input', bitWidth: 8, label: 'I2'},
                {type: 'output', bitWidth: 16, label: 'OUT'}
            ];
            break;
    }

    // 更新模式选择
    dialog.querySelector(`input[name="splitter-mode"][value="${mode}"]`).checked = true;

    // 更新端口配置显示
    updatePortsConfigDisplay(dialog, portsConfig);
}

// 应用分线器配置
function applySplitterConfig(button) {
    const dialog = button.closest('.config-dialog');
    const componentId = dialog.dataset.componentId;
    const component = document.querySelector(`[data-id="${componentId}"]`);

    const mode = dialog.querySelector('input[name="splitter-mode"]:checked').value;
    const portsConfig = getCurrentPortsConfig(dialog);

    // 验证配置
    if (portsConfig.length < 2) {
        alert('至少需要2个端口！');
        return;
    }

    const inputPorts = portsConfig.filter(p => p.type === 'input');
    const outputPorts = portsConfig.filter(p => p.type === 'output');

    if (mode === 'split' && (inputPorts.length !== 1 || outputPorts.length < 1)) {
        alert('拆分模式需要1个输入端口和至少1个输出端口！');
        return;
    }

    if (mode === 'merge' && (inputPorts.length < 1 || outputPorts.length !== 1)) {
        alert('合并模式需要至少1个输入端口和1个输出端口！');
        return;
    }

    // 更新组件数据
    component.dataset.splitterMode = mode;
    component.dataset.splitterPorts = JSON.stringify(portsConfig);

    // 更新显示
    updateSplitterDisplay(component);

    document.body.removeChild(dialog);
}

// 更新端口类型
function updatePortType(index, type) {
    // 这个函数会在端口配置更新时被调用
    console.log(`端口 ${index} 类型更新为: ${type}`);
}

// 更新端口位宽
function updatePortBitWidth(index, bitWidth) {
    console.log(`端口 ${index} 位宽更新为: ${bitWidth}`);
}

// 更新端口标签
function updatePortLabel(index, label) {
    console.log(`端口 ${index} 标签更新为: ${label}`);
}

// 删除端口
function removePort(index) {
    const dialog = document.querySelector('.config-dialog');
    const currentPorts = getCurrentPortsConfig(dialog);

    if (currentPorts.length <= 2) {
        alert('至少需要保留2个端口！');
        return;
    }

    currentPorts.splice(index, 1);
    updatePortsConfigDisplay(dialog, currentPorts);
}

// 取消分线器配置
function cancelSplitterConfig(button) {
    const dialog = button.closest('.config-dialog');
    document.body.removeChild(dialog);
}

// 导出模块
window.CircuitComponents = {
    svgs: circuitComponentSvgs,
    logicFunctions: circuitLogicFunctions,
    initialize: initializeCircuitComponent,
    updateProbeDisplay: updateProbeDisplay,
    updatePinDisplay: updatePinDisplay,
    updateSplitterDisplay: updateSplitterDisplay,
    showSplitterConfig: showSplitterConfigDialog
};

// 将配置函数暴露到全局作用域（供HTML中的onclick使用）
window.addSplitterPort = addSplitterPort;
window.applySplitterPreset = applySplitterPreset;
window.updatePortType = updatePortType;
window.updatePortBitWidth = updatePortBitWidth;
window.updatePortLabel = updatePortLabel;
window.removePort = removePort;
window.applySplitterConfig = applySplitterConfig;
window.cancelSplitterConfig = cancelSplitterConfig;