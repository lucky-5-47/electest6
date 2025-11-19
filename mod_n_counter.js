// 模N计数器组件
window.ModNCounterComponent = {
    // SVG模板
    svg: `
        <svg class="component-svg" viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg">
            <g id="mod-n-counter-group" transform="translate(110, 90)">
                <!-- 芯片主体 -->
                <rect x="-100" y="-80" width="200" height="160"
                      fill="#f0f8ff" stroke="#333" stroke-width="2" rx="8"/>

                <!-- 组件标题 -->
                <text x="0" y="-55" font-family="Arial" font-size="12" font-weight="bold"
                      text-anchor="middle" fill="#333">MOD-N COUNTER</text>
                <text x="0" y="-40" font-family="Arial" font-size="10"
                      text-anchor="middle" fill="#666">可配置模数计数器</text>

                <!-- 左侧输入端口 -->
                <!-- 时钟输入 CLK -->
                <line x1="-100" y1="-20" x2="-90" y2="-20" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="CLK" cx="-105" cy="-20" r="4" fill="black"/>
                <text x="-85" y="-16" font-family="Arial" font-size="9" fill="black">CLK</text>

                <!-- 清零端 CLR' (低电平有效) -->
                <line x1="-100" y1="0" x2="-86" y2="0" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="-86" cy="0" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="-89" y1="0" x2="-105" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="CLR" cx="-105" cy="0" r="4" fill="black"/>
                <text x="-85" y="4" font-family="Arial" font-size="8" fill="black">CLR'</text>

                <!-- 使能端 EN -->
                <line x1="-100" y1="20" x2="-90" y2="20" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="EN" cx="-105" cy="20" r="4" fill="black"/>
                <text x="-85" y="24" font-family="Arial" font-size="9" fill="black">EN</text>

                <!-- 模数设置输入 (4位) -->
                <line x1="-100" y1="40" x2="-90" y2="40" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="MOD" cx="-105" cy="40" r="4" fill="black"/>
                <text x="-85" y="44" font-family="Arial" font-size="8" fill="black">MOD</text>

                <!-- 右侧输出端口 -->
                <!-- 计数输出 Q3-Q0 -->
                <line x1="90" y1="-40" x2="100" y2="-40" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q3" cx="105" cy="-40" r="4" fill="black"/>
                <text x="60" y="-36" font-family="Arial" font-size="9" fill="black">Q3</text>

                <line x1="90" y1="-20" x2="100" y2="-20" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q2" cx="105" cy="-20" r="4" fill="black"/>
                <text x="60" y="-16" font-family="Arial" font-size="9" fill="black">Q2</text>

                <line x1="90" y1="0" x2="100" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q1" cx="105" cy="0" r="4" fill="black"/>
                <text x="60" y="4" font-family="Arial" font-size="9" fill="black">Q1</text>

                <line x1="90" y1="20" x2="100" y2="20" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q0" cx="105" cy="20" r="4" fill="black"/>
                <text x="60" y="24" font-family="Arial" font-size="9" fill="black">Q0</text>

                <!-- 进位输出 RCO -->
                <line x1="90" y1="40" x2="100" y2="40" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="RCO" cx="105" cy="40" r="4" fill="black"/>
                <text x="60" y="44" font-family="Arial" font-size="8" fill="black">RCO</text>

                <!-- 内部逻辑示意 -->
                <text x="0" y="10" font-family="Arial" font-size="9" text-anchor="middle" fill="#666">MOD-N</text>
                <text x="0" y="25" font-family="Arial" font-size="8" text-anchor="middle" fill="#666">COUNTER</text>

                <!-- 分隔线 -->
                <line x1="-80" y1="-30" x2="80" y2="-30" stroke="#ccc" stroke-width="1"/>
                <line x1="-80" y1="50" x2="80" y2="50" stroke="#ccc" stroke-width="1"/>

                <!-- 配置按钮 -->
                <rect x="-32" y="55" width="64" height="16" fill="#e0e0e0" stroke="#999" stroke-width="1" rx="3"
                      class="config-button" style="cursor: pointer;"/>
                <text x="0" y="65" font-family="Arial" font-size="8" text-anchor="middle" fill="#333"
                      class="config-button" style="cursor: pointer;">配置模数</text>
                <!-- 增加透明的点击区域，稍微比按钮大一点点 -->
                <rect x="-35" y="53" width="70" height="20" fill="transparent"
                      class="config-button-area" style="cursor: pointer;"/>


            </g>
        </svg>
    `,
    
    // 逻辑函数
    logic: function(inputs, currentState) {
        // 输入信号
        const CLK = inputs.CLK || 0;
        const CLR = inputs.CLR !== undefined ? inputs.CLR : 1; // 默认高电平（不清零）
        const EN = inputs.EN || 0;
        const MOD = inputs.MOD || 5; // 默认模5计数器

        console.log('模N计数器输入:', { CLK, CLR, EN, MOD });

        // 确保输入值是数字类型
        const clk = Number(CLK);
        const clr = Number(CLR);
        const en = Number(EN);
        const modValue = Number(MOD);

        // 确保currentState存在，如果不存在则初始化为默认状态
        if (!currentState || typeof currentState !== 'object') {
            currentState = {
                Q0: 0, Q1: 0, Q2: 0, Q3: 0,
                RCO: 0, prevCLK: 0, modValue: 5
            };
        }

        // 获取当前状态
        let q0 = currentState.Q0 || 0;
        let q1 = currentState.Q1 || 0;
        let q2 = currentState.Q2 || 0;
        let q3 = currentState.Q3 || 0;
        
        // 检测时钟边沿
        const prevCLK = currentState.prevCLK || 0;
        const clockEdge = (prevCLK === 0 && clk === 1); // 上升沿检测
        
        console.log('当前状态:', { q0, q1, q2, q3, prevCLK, clockEdge, modValue });
        
        // 计算当前计数值
        const currentCount = (q3 << 3) | (q2 << 2) | (q1 << 1) | q0;
        
        // 异步清零
        if (clr === 0) {
            q0 = 0; q1 = 0; q2 = 0; q3 = 0;
            console.log('异步清零');
        } else if (clockEdge && en === 1) {
            // 在时钟上升沿且使能有效时进行计数
            
            // 检查是否达到模数值（同步清零逻辑）
            if (currentCount === (modValue - 1)) {
                // 达到模数值，下一个时钟周期清零
                q0 = 0; q1 = 0; q2 = 0; q3 = 0;
                console.log(`达到模${modValue}，同步清零`);
            } else {
                // 正常计数
                const nextCount = currentCount + 1;
                q0 = nextCount & 1;
                q1 = (nextCount >> 1) & 1;
                q2 = (nextCount >> 2) & 1;
                q3 = (nextCount >> 3) & 1;
                console.log('计数:', currentCount, '->', nextCount, { q0, q1, q2, q3 });
            }
        }
        
        // 计算进位输出 RCO：当计数到模数值-1时，输出高电平
        const rco = (currentCount === (modValue - 1) && en === 1) ? 1 : 0;
        
        const outputs = {
            Q0: q0, Q1: q1, Q2: q2, Q3: q3,
            RCO: rco,
            prevCLK: clk,  // 保存当前时钟状态用于下次边沿检测
            modValue: modValue  // 保存模数值
        };
        
        console.log('模N计数器输出:', outputs);
        return outputs;
    },
    
    // 初始化函数
    initialize: function(componentDiv, type) {
        // 添加配置按钮点击事件
        const configElements = componentDiv.querySelectorAll('.config-button, .config-button-area');
        configElements.forEach(configElement => {
            configElement.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                showModNCounterConfigDialog(componentDiv.dataset.id);
            }, true); // 使用捕获阶段，确保优先处理

            // 添加鼠标悬停效果
            configElement.addEventListener('mouseenter', function() {
                const button = componentDiv.querySelector('.config-button');
                if (button) {
                    button.setAttribute('fill', '#d0d0d0');
                }
            });

            configElement.addEventListener('mouseleave', function() {
                const button = componentDiv.querySelector('.config-button');
                if (button) {
                    button.setAttribute('fill', '#e0e0e0');
                }
            });
        });

        // 添加双击事件显示说明
        componentDiv.addEventListener('dblclick', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showModNCounterHelpDialog();
        });
    }
};

// 模N计数器配置对话框
function showModNCounterConfigDialog(componentId) {
    // 移除已存在的对话框
    const existingDialog = document.getElementById('mod-n-counter-config-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }
    
    const currentState = componentStates.get(componentId) || {};
    const currentMod = currentState.modValue || 5;
    
    const dialogHTML = `
    <div id="mod-n-counter-config-dialog" class="component-dialog draggable-dialog resizable-dialog" style="display: block; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; background: none; width: 400px; height: auto; min-width: 350px; min-height: 250px;">
        <div class="dialog-content" style="width: 100%; height: 100%; background: white; border: 2px solid transparent; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); display: flex; flex-direction: column;">
            <div class="dialog-header" style="background: #2196F3; padding: 10px; border-radius: 6px 6px 0 0; cursor: move; user-select: none; border-bottom: 1px solid #ddd; position: relative; flex-shrink: 0;">
                <h2 style="margin: 0; font-size: 16px; color: white; padding-right: 35px;">模N计数器配置</h2>
                <button class="dialog-close" onclick="closeModNCounterConfigDialog()" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: #f44336; color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer; font-size: 16px; line-height: 1;">&times;</button>
            </div>
            <div class="dialog-body" style="padding: 20px; flex: 1; overflow-y: auto;">
                <div class="config-group" style="margin-bottom: 15px;">
                    <label for="mod-value-input" style="display: block; margin-bottom: 5px; font-weight: bold;">模数值 (N):</label>
                    <input type="number" id="mod-value-input" min="2" max="15" value="${currentMod}" style="width: 100px; padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                    <span style="font-size: 12px; color: #666; margin-left: 10px;">范围: 2-15</span>
                </div>
                <div class="config-group" style="margin-bottom: 15px;">
                    <p style="margin: 0 0 10px 0;"><strong>MOD 说明:</strong></p>
                    <ul style="font-size: 12px; margin: 0; padding-left: 20px; color: #555;">
                        <li>MOD 表示4位模数输入信号</li>
                        <li>可设置模数范围：2-15</li>
                        <li>计数序列：0→1→...→(N-1)→0</li>
                        <li>当计数到N-1时，RCO输出高电平</li>
                    </ul>
                </div>
                <div class="config-group" style="text-align: center; margin-top: 20px;">
                    <button onclick="applyModNCounterConfig('${componentId}')" style="background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">应用配置</button>
                    <button onclick="closeModNCounterConfigDialog()" style="background: #f44336; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">取消</button>
                </div>
            </div>
            <!-- 调整大小控制 -->
            <div class="resize-handle" style="position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; cursor: nw-resize; background: linear-gradient(-45deg, transparent 0%, transparent 30%, #ccc 30%, #ccc 40%, transparent 40%, transparent 60%, #ccc 60%, #ccc 70%, transparent 70%);"></div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', dialogHTML);

    // 添加拖动和调整大小功能
    makeDraggableAndResizable(document.getElementById('mod-n-counter-config-dialog'));
}

function applyModNCounterConfig(componentId) {
    const modValue = parseInt(document.getElementById('mod-value-input').value);
    
    if (modValue < 2 || modValue > 15) {
        alert('模数值必须在2-15之间');
        return;
    }
    
    // 更新组件状态
    const currentState = componentStates.get(componentId) || {};
    currentState.modValue = modValue;
    componentStates.set(componentId, currentState);
    
    console.log(`模N计数器 ${componentId} 配置为模${modValue}`);
    closeModNCounterConfigDialog();
}

function closeModNCounterConfigDialog() {
    const dialog = document.getElementById('mod-n-counter-config-dialog');
    if (dialog) {
        dialog.remove();
    }
}

// 通用拖动功能
function makeDraggable(element) {
    const header = element.querySelector('.dialog-header');
    if (!header) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let elementX = 0;
    let elementY = 0;

    header.addEventListener('mousedown', dragStart);

    function dragStart(e) {
        // 检查是否点击的是关闭按钮
        if (e.target.classList.contains('dialog-close')) {
            return;
        }

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        // 获取当前元素的位置
        const rect = element.getBoundingClientRect();
        elementX = rect.left;
        elementY = rect.top;

        header.style.cursor = 'grabbing';

        // 添加全局事件监听器
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const newX = elementX + deltaX;
        const newY = elementY + deltaY;

        // 限制在视窗内
        const maxX = window.innerWidth - element.offsetWidth;
        const maxY = window.innerHeight - element.offsetHeight;

        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));

        element.style.left = constrainedX + 'px';
        element.style.top = constrainedY + 'px';
        element.style.transform = 'none'; // 清除居中的transform
    }

    function dragEnd(e) {
        isDragging = false;
        header.style.cursor = 'move';

        // 移除全局事件监听器
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
    }
}

// 拖动和调整大小功能
function makeDraggableAndResizable(element) {
    const header = element.querySelector('.dialog-header');
    const resizeHandle = element.querySelector('.resize-handle');

    if (!header) return;

    let isDragging = false;
    let isResizing = false;
    let startX = 0;
    let startY = 0;
    let elementX = 0;
    let elementY = 0;
    let elementWidth = 0;
    let elementHeight = 0;

    // 拖动功能
    header.addEventListener('mousedown', dragStart);

    function dragStart(e) {
        // 检查是否点击的是关闭按钮
        if (e.target.classList.contains('dialog-close')) {
            return;
        }

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        // 获取当前元素的位置
        const rect = element.getBoundingClientRect();
        elementX = rect.left;
        elementY = rect.top;

        header.style.cursor = 'grabbing';

        // 添加全局事件监听器
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const newX = elementX + deltaX;
        const newY = elementY + deltaY;

        // 限制在视窗内
        const maxX = window.innerWidth - element.offsetWidth;
        const maxY = window.innerHeight - element.offsetHeight;

        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));

        element.style.left = constrainedX + 'px';
        element.style.top = constrainedY + 'px';
        element.style.transform = 'none'; // 清除居中的transform
    }

    function dragEnd(e) {
        isDragging = false;
        header.style.cursor = 'move';

        // 移除全局事件监听器
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
    }

    // 调整大小功能
    if (resizeHandle) {
        resizeHandle.addEventListener('mousedown', resizeStart);

        function resizeStart(e) {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;

            // 获取当前元素的尺寸
            const rect = element.getBoundingClientRect();
            elementWidth = rect.width;
            elementHeight = rect.height;

            // 添加全局事件监听器
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', resizeEnd);

            e.preventDefault();
            e.stopPropagation();
        }

        function resize(e) {
            if (!isResizing) return;

            e.preventDefault();

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const newWidth = elementWidth + deltaX;
            const newHeight = elementHeight + deltaY;

            // 设置最小尺寸
            const minWidth = parseInt(element.style.minWidth) || 400;
            const minHeight = parseInt(element.style.minHeight) || 300;

            // 限制最大尺寸（不超过视窗）
            const maxWidth = window.innerWidth - parseInt(element.style.left || 0);
            const maxHeight = window.innerHeight - parseInt(element.style.top || 0);

            const constrainedWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
            const constrainedHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

            element.style.width = constrainedWidth + 'px';
            element.style.height = constrainedHeight + 'px';
        }

        function resizeEnd(e) {
            isResizing = false;

            // 移除全局事件监听器
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', resizeEnd);
        }
    }
}

// 模N计数器帮助对话框
function showModNCounterHelpDialog() {
    // 移除已存在的对话框
    const existingDialog = document.getElementById('mod-n-counter-help-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }

    const helpHTML = `
    <div id="mod-n-counter-help-dialog" class="component-dialog draggable-dialog resizable-dialog" style="display: block; position: fixed; top: 10%; left: 10%; z-index: 10000; background: none; width: 800px; height: 600px; min-width: 600px; min-height: 400px;">
        <div class="dialog-content" style="width: 100%; height: 100%; background: white; border: 1px solid transparent; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); display: flex; flex-direction: column;">
            <div class="dialog-header" style="background: #2196F3; color: white; padding: 15px 20px; border-radius: 6px 6px 0 0; cursor: move; user-select: none; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
                <h2 style="margin: 0; font-size: 1.5em;">模N计数器功能说明</h2>
                <button class="dialog-close" onclick="closeModNCounterHelpDialog()" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">&times;</button>
            </div>
            <div class="dialog-body" style="padding: 20px; overflow-y: auto; flex: 1;">
                <h3 style="color: #1976D2; border-bottom: 2px solid #E3F2FD; padding-bottom: 5px; margin-bottom: 15px;">📋 功能概述</h3>
                <p>模N计数器是一个可配置的同步计数器，能够实现模2到模15的任意计数功能。它采用同步清零技术，当计数达到设定的模数值时自动清零，实现循环计数。</p>

                <div style="background: #E8F5E8; padding: 10px; border-radius: 4px; margin: 10px 0;">
                    <strong>💡 核心特点：</strong>
                    <ul style="margin: 5px 0; padding-left: 20px;">
                        <li>可配置模数值（2-15）</li>
                        <li>同步计数，时钟上升沿有效</li>
                        <li>异步清零功能</li>
                        <li>进位输出支持级联</li>
                    </ul>
                </div>

                <h3 style="color: #1976D2; border-bottom: 2px solid #E3F2FD; padding-bottom: 5px; margin-bottom: 15px;">🔌 引脚功能</h3>
                <table style="width: 100%; border-collapse: collapse; margin: 10px 0; border: 1px solid #ddd;">
                    <tr style="background: #f5f5f5;">
                        <th style="border: 1px solid #ddd; padding: 10px; text-align: left; font-weight: bold;">引脚名称</th>
                        <th style="border: 1px solid #ddd; padding: 10px; text-align: left; font-weight: bold;">类型</th>
                        <th style="border: 1px solid #ddd; padding: 10px; text-align: left; font-weight: bold;">功能说明</th>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 10px;"><strong>CLK</strong></td>
                        <td style="border: 1px solid #ddd; padding: 10px; color: #2196F3;">输入</td>
                        <td style="border: 1px solid #ddd; padding: 10px;">时钟输入端，上升沿触发计数操作</td>
                    </tr>
                    <tr style="background: #fafafa;">
                        <td style="border: 1px solid #ddd; padding: 10px;"><strong>CLR'</strong></td>
                        <td style="border: 1px solid #ddd; padding: 10px; color: #2196F3;">输入</td>
                        <td style="border: 1px solid #ddd; padding: 10px;">异步清零端，低电平有效，立即将所有输出清零</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 10px;"><strong>EN</strong></td>
                        <td style="border: 1px solid #ddd; padding: 10px; color: #2196F3;">输入</td>
                        <td style="border: 1px solid #ddd; padding: 10px;">使能控制端，高电平时允许计数，低电平时保持当前状态</td>
                    </tr>
                    <tr style="background: #fafafa;">
                        <td style="border: 1px solid #ddd; padding: 10px;"><strong>MOD[3:0]</strong></td>
                        <td style="border: 1px solid #ddd; padding: 10px; color: #2196F3;">输入</td>
                        <td style="border: 1px solid #ddd; padding: 10px;">4位模数设置输入，用于配置计数器的模数值（2-15）</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Q3-Q0</strong></td>
                        <td style="border: 1px solid #ddd; padding: 10px; color: #4CAF50;">输出</td>
                        <td style="border: 1px solid #ddd; padding: 10px;">4位二进制计数输出，Q3为最高位，Q0为最低位</td>
                    </tr>
                    <tr style="background: #fafafa;">
                        <td style="border: 1px solid #ddd; padding: 10px;"><strong>RCO</strong></td>
                        <td style="border: 1px solid #ddd; padding: 10px; color: #4CAF50;">输出</td>
                        <td style="border: 1px solid #ddd; padding: 10px;">进位输出端，当计数值达到(N-1)时输出高电平</td>
                    </tr>
                </table>

                <h3 style="color: #1976D2; border-bottom: 2px solid #E3F2FD; padding-bottom: 5px; margin-bottom: 15px;">⚙️ 工作原理</h3>

                <div style="background: #FFF3E0; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 4px solid #FF9800;">
                    <h4 style="color: #F57C00; margin-top: 0;">同步清零计数原理</h4>
                    <ol style="line-height: 1.8; margin: 10px 0;">
                        <li><strong>正常计数：</strong>从0开始，每个CLK上升沿计数值加1（当EN=1时）</li>
                        <li><strong>模数检测：</strong>当计数值达到(N-1)时，下一个时钟上升沿自动清零</li>
                        <li><strong>循环计数：</strong>实现 0→1→2→...→(N-1)→0 的循环</li>
                        <li><strong>进位信号：</strong>在计数值为(N-1)时，RCO输出高电平</li>
                    </ol>
                </div>

                <div style="background: #E8F5E8; padding: 15px; border-radius: 6px; margin: 10px 0;">
                    <h4 style="color: #388E3C; margin-top: 0;">控制信号说明</h4>
                    <ul style="line-height: 1.8; margin: 10px 0;">
                        <li><strong>CLR'=0：</strong>异步清零，立即将Q3-Q0全部置0，不受时钟影响</li>
                        <li><strong>EN=0：</strong>禁止计数，计数器保持当前状态不变</li>
                        <li><strong>EN=1：</strong>允许计数，在CLK上升沿时进行计数操作</li>
                    </ul>
                </div>

                <h3 style="color: #1976D2; border-bottom: 2px solid #E3F2FD; padding-bottom: 5px; margin-bottom: 15px;">📝 计数示例</h3>

                <div style="background: #F3E5F5; padding: 15px; border-radius: 6px; margin: 10px 0;">
                    <h4 style="color: #7B1FA2; margin-top: 0;">模5计数器示例</h4>
                    <p><strong>设置：</strong>MOD输入 = 0101 (二进制) = 5 (十进制)</p>
                    <p><strong>计数序列：</strong></p>
                    <table style="border-collapse: collapse; margin: 10px 0; width: 100%;">
                        <tr style="background: #f5f5f5;">
                            <th style="border: 1px solid #ddd; padding: 8px;">时钟周期</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Q3Q2Q1Q0</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">十进制</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">RCO</th>
                        </tr>
                        <tr><td style="border: 1px solid #ddd; padding: 8px;">0</td><td style="border: 1px solid #ddd; padding: 8px;">0000</td><td style="border: 1px solid #ddd; padding: 8px;">0</td><td style="border: 1px solid #ddd; padding: 8px;">0</td></tr>
                        <tr><td style="border: 1px solid #ddd; padding: 8px;">1</td><td style="border: 1px solid #ddd; padding: 8px;">0001</td><td style="border: 1px solid #ddd; padding: 8px;">1</td><td style="border: 1px solid #ddd; padding: 8px;">0</td></tr>
                        <tr><td style="border: 1px solid #ddd; padding: 8px;">2</td><td style="border: 1px solid #ddd; padding: 8px;">0010</td><td style="border: 1px solid #ddd; padding: 8px;">2</td><td style="border: 1px solid #ddd; padding: 8px;">0</td></tr>
                        <tr><td style="border: 1px solid #ddd; padding: 8px;">3</td><td style="border: 1px solid #ddd; padding: 8px;">0011</td><td style="border: 1px solid #ddd; padding: 8px;">3</td><td style="border: 1px solid #ddd; padding: 8px;">0</td></tr>
                        <tr style="background: #FFEB3B;"><td style="border: 1px solid #ddd; padding: 8px;">4</td><td style="border: 1px solid #ddd; padding: 8px;">0100</td><td style="border: 1px solid #ddd; padding: 8px;">4</td><td style="border: 1px solid #ddd; padding: 8px;"><strong>1</strong></td></tr>
                        <tr><td style="border: 1px solid #ddd; padding: 8px;">5</td><td style="border: 1px solid #ddd; padding: 8px;">0000</td><td style="border: 1px solid #ddd; padding: 8px;">0</td><td style="border: 1px solid #ddd; padding: 8px;">0</td></tr>
                    </table>
                    <p style="font-size: 12px; color: #666;"><em>注：黄色高亮行表示RCO输出高电平的时刻</em></p>
                </div>

                <h3 style="color: #1976D2; border-bottom: 2px solid #E3F2FD; padding-bottom: 5px; margin-bottom: 15px;">🔧 使用方法</h3>

                <div style="background: #E3F2FD; padding: 15px; border-radius: 6px; margin: 10px 0;">
                    <ol style="line-height: 1.8; margin: 10px 0;">
                        <li><strong>配置模数：</strong>点击组件下方的"配置模数"按钮，设置所需的模数值（2-15）</li>
                        <li><strong>连接时钟：</strong>将时钟信号连接到CLK输入端</li>
                        <li><strong>使能控制：</strong>将EN端连接到高电平以启用计数功能</li>
                        <li><strong>清零控制：</strong>CLR'端通常连接到高电平，需要清零时连接到低电平</li>
                        <li><strong>级联使用：</strong>可以使用RCO输出连接到下一级计数器的CLK输入实现级联</li>
                    </ol>
                </div>

                <div style="background: #E8F5E8; padding: 10px; border-radius: 4px; margin: 10px 0; border-left: 4px solid #4CAF50;">
                    <p style="margin: 5px 0;"><strong>💡 操作提示：</strong></p>
                    <ul style="margin: 5px 0; padding-left: 20px;">
                        <li>双击模N计数器组件可以快速打开此说明对话框</li>
                        <li>拖动对话框标题栏可以移动对话框位置</li>
                        <li>拖动右下角可以调整对话框大小</li>
                    </ul>
                </div>
            </div>
            <!-- 调整大小控制 -->
            <div class="resize-handle" style="position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; cursor: nw-resize; background: linear-gradient(-45deg, transparent 0%, transparent 30%, #ccc 30%, #ccc 40%, transparent 40%, transparent 60%, #ccc 60%, #ccc 70%, transparent 70%);"></div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', helpHTML);

    // 添加拖动和调整大小功能
    makeDraggableAndResizable(document.getElementById('mod-n-counter-help-dialog'));
}

function closeModNCounterHelpDialog() {
    const dialog = document.getElementById('mod-n-counter-help-dialog');
    if (dialog) {
        dialog.remove();
    }
}

// 模N计数器说明对话框
function showModNCounterDialog() {
    // 移除已存在的对话框
    const existingDialog = document.getElementById('mod-n-counter-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }
    
    const dialogHTML = `
    <div id="mod-n-counter-dialog" class="component-dialog" style="display: block;">
        <div class="dialog-content" style="width: 600px; max-height: 80vh; overflow-y: auto;">
            <div class="dialog-header">
                <h2>模N计数器 - 功能说明</h2>
                <button class="dialog-close" onclick="closeModNCounterDialog()">&times;</button>
            </div>
            <div class="dialog-body">
                <div class="dialog-section">
                    <h3>功能描述</h3>
                    <p>模N计数器是一个可配置的计数器，可以实现模2到模15的计数功能。它基于74LS161的同步清零原理实现，通过反馈逻辑在达到指定计数值时自动清零。</p>
                </div>
                
                <div class="dialog-section">
                    <h3>引脚功能</h3>
                    <table border="1" style="width: 100%; border-collapse: collapse;">
                        <tr style="background: #f0f0f0;">
                            <th>引脚</th><th>功能</th><th>说明</th>
                        </tr>
                        <tr><td>CLK</td><td>时钟输入</td><td>上升沿有效，驱动计数器计数</td></tr>
                        <tr><td>CLR'</td><td>清零端</td><td>低电平有效，异步清零所有输出</td></tr>
                        <tr><td>EN</td><td>使能端</td><td>高电平有效，控制计数器是否计数</td></tr>
                        <tr><td>MOD[3:0]</td><td>模数设置</td><td>4位输入，设置计数器的模数值(2-15)</td></tr>
                        <tr><td>Q3-Q0</td><td>计数输出</td><td>4位二进制计数输出</td></tr>
                        <tr><td>RCO</td><td>进位输出</td><td>计数到模数值-1时输出高电平</td></tr>
                    </table>
                </div>
                
                <div class="dialog-section">
                    <h3>工作原理</h3>
                    <h4>同步清零法实现模N计数</h4>
                    <p>本计数器采用同步清零法实现模N计数：</p>
                    <ol>
                        <li><strong>正常计数</strong>：从0开始，每个时钟上升沿计数值加1</li>
                        <li><strong>检测模数</strong>：当计数值达到N-1时，在下一个时钟上升沿清零</li>
                        <li><strong>循环计数</strong>：实现0→1→2→...→(N-1)→0的循环计数</li>
                    </ol>
                    
                    <h4>模5计数器示例</h4>
                    <p>设置模数为5时，计数序列为：0→1→2→3→4→0...</p>
                    <ul>
                        <li>当计数到4(0100)时，RCO输出高电平</li>
                        <li>下一个时钟上升沿，计数器清零回到0</li>
                    </ul>
                </div>
                
                <div class="dialog-section">
                    <h3>使用方法</h3>
                    <ol>
                        <li>点击组件上的"配置模数"按钮设置所需的模数值</li>
                        <li>连接时钟信号到CLK输入</li>
                        <li>将EN使能端连接到高电平(+5V)启用计数</li>
                        <li>观察Q3-Q0输出的计数变化</li>
                        <li>可以使用RCO进位输出级联多个计数器</li>
                    </ol>
                </div>
                
                <div class="dialog-section">
                    <h3>应用场景</h3>
                    <ul>
                        <li><strong>分频器</strong>：实现时钟信号的N分频</li>
                        <li><strong>定时器</strong>：产生固定周期的定时信号</li>
                        <li><strong>状态机</strong>：为有限状态机提供状态计数</li>
                        <li><strong>地址生成</strong>：为存储器或显示器生成地址序列</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', dialogHTML);
}

function closeModNCounterDialog() {
    const dialog = document.getElementById('mod-n-counter-dialog');
    if (dialog) {
        dialog.remove();
    }
}

// 确保组件正确暴露到全局
if (typeof window !== 'undefined') {
    // 如果在浏览器环境中，确保组件已正确暴露
    if (!window.ModNCounterComponent) {
        console.error('ModNCounterComponent 未正确定义！');
    } else {
        console.log('模N计数器组件已加载并暴露到全局');

        // 尝试立即注册到componentSvgs
        if (window.componentSvgs) {
            window.componentSvgs['mod-n-counter'] = window.ModNCounterComponent.svg;
            console.log('模N计数器SVG模板已注册到componentSvgs');
        }

        // 尝试注册逻辑函数
        if (window.logicFunctions) {
            window.logicFunctions['mod-n-counter'] = window.ModNCounterComponent.logic;
            console.log('模N计数器逻辑函数已注册');
        }
    }
}
