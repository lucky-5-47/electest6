/**
 * 异步二进制计数器组件模块
 * 异步计数器（又称波纹计数器）各触发器不是同时翻转，而是依次翻转
 * 前一位的输出作为下一位的时钟输入
 */

// 异步二进制计数器 SVG模板
const binaryAsyncCounterSvg = {
    'binary-async-counter': `
        <svg class="component-svg" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
            <g id="async-counter-group" transform="translate(110, 80)">
                <!-- 芯片主体 -->
                <rect id="async-counter-bg" x="-90" y="-70" width="180" height="140" rx="8" fill="#E8F5FF" stroke="black" stroke-width="2"/>

                <!-- 芯片标识 -->
                <text x="0" y="-45" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="black">ASYNC COUNTER</text>
                <text x="0" y="-30" font-family="Arial" font-size="10" text-anchor="middle" fill="black">4位异步二进制计数器</text>

                <!-- 左侧输入端口 -->
                <!-- 时钟输入 CLK -->
                <line x1="-90" y1="-10" x2="-100" y2="-10" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor clock-input" data-anchor-type="clock" data-pin="CLK" cx="-105" cy="-10" r="5" fill="#0066cc"/>
                <text x="-70" y="-6" font-family="Arial" font-size="10" fill="black">CLK</text>
                <!-- 时钟边沿指示 -->
                <path d="M-95,-15 L-90,-10 L-95,-5" fill="none" stroke="black" stroke-width="1"/>

                <!-- 异步复位 RST' (低电平有效) -->
                <line x1="-90" y1="15" x2="-96" y2="15" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="-96" cy="15" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="-99" y1="15" x2="-105" y2="15" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="RST" cx="-105" cy="15" r="5" fill="black"/>
                <text x="-70" y="19" font-family="Arial" font-size="9" fill="black">RST'</text>

                <!-- 计数显示区域 -->
                <rect x="-40" y="-5" width="80" height="25" rx="4" fill="white" stroke="#666" stroke-width="1"/>
                <text id="counter-display" x="0" y="12" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle" fill="black">0000</text>

                <!-- 右侧输出端口 -->
                <!-- Q0输出 (LSB) -->
                <line x1="90" y1="-50" x2="100" y2="-50" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q0" cx="105" cy="-50" r="5" fill="black"/>
                <text x="70" y="-46" font-family="Arial" font-size="10" fill="black">Q0</text>

                <!-- Q1输出 -->
                <line x1="90" y1="-25" x2="100" y2="-25" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q1" cx="105" cy="-25" r="5" fill="black"/>
                <text x="70" y="-21" font-family="Arial" font-size="10" fill="black">Q1</text>

                <!-- Q2输出 -->
                <line x1="90" y1="0" x2="100" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q2" cx="105" cy="0" r="5" fill="black"/>
                <text x="70" y="4" font-family="Arial" font-size="10" fill="black">Q2</text>

                <!-- Q3输出 (MSB) -->
                <line x1="90" y1="25" x2="100" y2="25" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q3" cx="105" cy="25" r="5" fill="black"/>
                <text x="70" y="29" font-family="Arial" font-size="10" fill="black">Q3</text>

                <!-- 溢出输出 OVF -->
                <line x1="90" y1="50" x2="100" y2="50" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="OVF" cx="105" cy="50" r="5" fill="black"/>
                <text x="70" y="54" font-family="Arial" font-size="9" fill="black">OVF</text>

                <!-- 内部逻辑示意 - 异步链 -->
                <text x="0" y="40" font-family="Arial" font-size="8" text-anchor="middle" fill="#666">Q0→CLK1→Q1→CLK2→Q2→CLK3→Q3</text>

                <!-- 分隔线 -->
                <line x1="-80" y1="32" x2="80" y2="32" stroke="#ccc" stroke-width="1" stroke-dasharray="2,2"/>
            </g>
        </svg>
    `
};

// 异步二进制计数器逻辑函数
const binaryAsyncCounterLogic = {
    'binary-async-counter': (inputs, currentState = {}) => {
        // 获取输入值
        const CLK = inputs.CLK || 0;
        const RST = inputs.RST !== undefined ? inputs.RST : 1;  // 复位端，低电平有效

        console.log('异步计数器输入:', { CLK, RST });

        // 确保输入值是数字类型
        const clk = Number(CLK);
        const rst = Number(RST);

        // 获取当前状态
        let q0 = currentState.Q0 || 0;
        let q1 = currentState.Q1 || 0;
        let q2 = currentState.Q2 || 0;
        let q3 = currentState.Q3 || 0;
        
        // 检测时钟边沿
        const prevCLK = currentState.prevCLK || 0;
        const prevQ0 = currentState.prevQ0 || 0;
        const prevQ1 = currentState.prevQ1 || 0;
        const prevQ2 = currentState.prevQ2 || 0;
        
        const clockEdge = (prevCLK === 0 && clk === 1);  // CLK上升沿
        const q0Edge = (prevQ0 === 1 && q0 === 0);       // Q0下降沿
        const q1Edge = (prevQ1 === 1 && q1 === 0);       // Q1下降沿
        const q2Edge = (prevQ2 === 1 && q2 === 0);       // Q2下降沿

        console.log('边沿检测:', { clockEdge, q0Edge, q1Edge, q2Edge });
        console.log('当前状态:', { q0, q1, q2, q3 });

        // 异步复位逻辑
        if (rst === 0) {
            q0 = 0; q1 = 0; q2 = 0; q3 = 0;
            console.log('异步复位');
        } else {
            // 异步计数器逻辑：波纹计数
            // 第一级：CLK上升沿触发Q0翻转
            if (clockEdge) {
                q0 = 1 - q0;  // Q0翻转
                console.log('CLK上升沿，Q0翻转为:', q0);
            }

            // 第二级：Q0下降沿触发Q1翻转
            if (q0Edge) {
                q1 = 1 - q1;  // Q1翻转
                console.log('Q0下降沿，Q1翻转为:', q1);
            }

            // 第三级：Q1下降沿触发Q2翻转
            if (q1Edge) {
                q2 = 1 - q2;  // Q2翻转
                console.log('Q1下降沿，Q2翻转为:', q2);
            }

            // 第四级：Q2下降沿触发Q3翻转
            if (q2Edge) {
                q3 = 1 - q3;  // Q3翻转
                console.log('Q2下降沿，Q3翻转为:', q3);
            }
        }

        // 计算溢出输出 OVF：计数从15跳回0时产生脉冲
        const currentCount = (q3 << 3) | (q2 << 2) | (q1 << 1) | q0;
        const prevCount = currentState.count || 0;
        const ovf = (prevCount === 15 && currentCount === 0) ? 1 : 0;

        const outputs = {
            Q0: q0, Q1: q1, Q2: q2, Q3: q3,
            OVF: ovf,
            prevCLK: clk,
            prevQ0: q0, prevQ1: q1, prevQ2: q2,
            count: currentCount
        };

        console.log('异步计数器输出:', outputs);
        return outputs;
    }
};

// 异步计数器初始化函数
function initializeBinaryAsyncCounter(componentDiv, type) {
    if (type !== 'binary-async-counter') return;

    const id = componentDiv.dataset.id;

    // 初始化组件状态
    if (typeof componentStates !== 'undefined') {
        componentStates.set(id, {
            CLK: 0, RST: 1,
            Q0: 0, Q1: 0, Q2: 0, Q3: 0,
            OVF: 0,
            prevCLK: 0, prevQ0: 0, prevQ1: 0, prevQ2: 0,
            count: 0
        });
    }

    // 设置组件标题
    componentDiv.title = '4位异步二进制计数器（波纹计数器） - 双击查看详细说明';

    // 添加双击事件监听器
    componentDiv.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        showAsyncCounterDialog();
    });

    // 初始化显示
    updateAsyncCounterDisplay(componentDiv);

    console.log('异步二进制计数器组件初始化完成:', id);
}

// 更新异步计数器显示
function updateAsyncCounterDisplay(component) {
    const id = component.dataset.id;
    
    if (typeof componentStates === 'undefined') return;
    
    const state = componentStates.get(id);
    if (!state) return;

    // 更新计数显示
    const counterDisplay = component.querySelector('#counter-display');
    if (counterDisplay) {
        const binaryStr = `${state.Q3}${state.Q2}${state.Q1}${state.Q0}`;
        const decimalValue = (state.Q3 << 3) | (state.Q2 << 2) | (state.Q1 << 1) | state.Q0;
        counterDisplay.textContent = `${binaryStr}(${decimalValue})`;
    }

    // 更新背景颜色根据计数值
    const bg = component.querySelector('#async-counter-bg');
    if (bg) {
        const count = (state.Q3 << 3) | (state.Q2 << 2) | (state.Q1 << 1) | state.Q0;
        const hue = (count * 22.5) % 360; // 每个值对应不同色调
        bg.setAttribute('fill', `hsl(${hue}, 50%, 90%)`);
    }
}

// 异步计数器说明对话框HTML
const asyncCounterDialogHTML = `
<div id="async-counter-dialog" class="component-dialog draggable-dialog resizable-dialog" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; width: 800px; height: 600px; min-width: 600px; min-height: 400px;">
    <div class="dialog-content" style="width: 100%; height: 100%; background: white; border: 2px solid #333; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); display: flex; flex-direction: column;">
        <div class="dialog-header" style="background: #2196F3; color: white; padding: 15px 20px; border-radius: 6px 6px 0 0; cursor: move; user-select: none; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
            <h2 style="margin: 0; font-size: 1.5em;">异步二进制计数器（波纹计数器）</h2>
            <button class="dialog-close" onclick="closeAsyncCounterDialog()" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">&times;</button>
        </div>
        <div class="dialog-body" style="padding: 20px; overflow-y: auto; flex: 1;">
            <div class="dialog-section">
                <h3>功能描述</h3>
                <p>异步二进制计数器（又称波纹计数器）是一种时序逻辑电路，用于计数脉冲信号。与同步计数器不同，异步计数器的各个触发器不是同时翻转，而是依次翻转，前一位的输出作为下一位的时钟输入。</p>
                
                <h4>主要特点：</h4>
                <ul>
                    <li><strong>异步工作</strong>：各触发器按顺序翻转，存在传播延迟</li>
                    <li><strong>波纹效应</strong>：状态变化从低位向高位传播，如波纹</li>
                    <li><strong>电路简单</strong>：结构简单，功耗较低</li>
                    <li><strong>速度限制</strong>：由于累积延迟，工作频率受限</li>
                </ul>
            </div>

            <div class="dialog-section">
                <h3>引脚说明</h3>
                <ul>
                    <li><strong>CLK</strong>：时钟输入端，上升沿有效</li>
                    <li><strong>RST'</strong>：异步复位端，低电平有效</li>
                    <li><strong>Q0~Q3</strong>：4位二进制输出，Q0为最低位</li>
                    <li><strong>OVF</strong>：溢出输出，从15跳回0时产生脉冲</li>
                </ul>
            </div>

            <div class="dialog-section">
                <h3>工作原理</h3>
                <div class="principle">
                    <p><strong>异步计数链：</strong></p>
                    <p>CLK → T0(Q0) → T1(Q1) → T2(Q2) → T3(Q3)</p>
                    
                    <p><strong>翻转过程：</strong></p>
                    <ol>
                        <li>外部时钟CLK上升沿触发第一级触发器T0翻转</li>
                        <li>T0输出Q0的下降沿作为T1的时钟，触发T1翻转</li>
                        <li>T1输出Q1的下降沿作为T2的时钟，触发T2翻转</li>
                        <li>T2输出Q2的下降沿作为T3的时钟，触发T3翻转</li>
                    </ol>
                </div>
            </div>

            <div class="dialog-section">
                <h3>计数序列</h3>
                <table class="truth-table">
                    <tr><th>计数</th><th>Q3</th><th>Q2</th><th>Q1</th><th>Q0</th><th>十进制</th></tr>
                    <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                    <tr><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
                    <tr><td>2</td><td>0</td><td>0</td><td>1</td><td>0</td><td>2</td></tr>
                    <tr><td>3</td><td>0</td><td>0</td><td>1</td><td>1</td><td>3</td></tr>
                    <tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr>
                    <tr><td>15</td><td>1</td><td>1</td><td>1</td><td>1</td><td>15</td></tr>
                    <tr><td>0(溢出)</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                </table>
            </div>

            <div class="dialog-section">
                <h3>与同步计数器的比较</h3>
                <table class="comparison-table">
                    <tr><th>特性</th><th>异步计数器</th><th>同步计数器</th></tr>
                    <tr><td>时钟</td><td>只有第一级直接连时钟</td><td>所有触发器共享时钟</td></tr>
                    <tr><td>速度</td><td>较慢（累积延迟）</td><td>较快</td></tr>
                    <tr><td>功耗</td><td>较低</td><td>较高</td></tr>
                    <tr><td>电路</td><td>简单</td><td>复杂</td></tr>
                    <tr><td>抗干扰</td><td>一般</td><td>较好</td></tr>
                </table>
            </div>
        </div>
        <!-- 调整大小控制 -->
        <div class="resize-handle" style="position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; cursor: nw-resize; background: linear-gradient(-45deg, transparent 0%, transparent 30%, #ccc 30%, #ccc 40%, transparent 40%, transparent 60%, #ccc 60%, #ccc 70%, transparent 70%);"></div>
    </div>
</div>
`;

// 对话框样式
const asyncCounterDialogCSS = `
<style id="async-counter-dialog-style">
.component-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog-content {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 900px;
    max-height: 90%;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.dialog-header {
    background: #2196F3;
    color: white;
    padding: 15px 20px;
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dialog-header h2 {
    margin: 0;
    font-size: 1.5em;
}

.dialog-close {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
}

.dialog-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

.dialog-body {
    padding: 20px;
}

.dialog-section {
    margin-bottom: 25px;
}

.dialog-section h3 {
    color: #1976D2;
    border-bottom: 2px solid #E3F2FD;
    padding-bottom: 5px;
    margin-bottom: 15px;
}

.dialog-section h4 {
    color: #424242;
    margin-top: 15px;
    margin-bottom: 8px;
}

.truth-table, .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    font-size: 0.9em;
}

.truth-table th, .truth-table td,
.comparison-table th, .comparison-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.truth-table th, .comparison-table th {
    background: #f5f5f5;
    font-weight: bold;
}

.truth-table tr:nth-child(even),
.comparison-table tr:nth-child(even) {
    background: #f9f9f9;
}

.principle p {
    margin: 10px 0;
    line-height: 1.6;
}

.principle ol {
    padding-left: 20px;
}

.principle li {
    margin: 5px 0;
}
</style>
`;

// 显示异步计数器对话框
function showAsyncCounterDialog() {
    // 确保对话框HTML和CSS已添加到页面
    if (!document.getElementById('async-counter-dialog')) {
        // 添加CSS
        if (!document.getElementById('async-counter-dialog-style')) {
            document.head.insertAdjacentHTML('beforeend', asyncCounterDialogCSS);
        }

        // 添加HTML
        document.body.insertAdjacentHTML('beforeend', asyncCounterDialogHTML);
    }

    const dialog = document.getElementById('async-counter-dialog');
    if (dialog) {
        dialog.style.display = 'flex';

        // 添加点击背景关闭功能
        dialog.addEventListener('click', function(e) {
            if (e.target === dialog) {
                closeAsyncCounterDialog();
            }
        });

        // 添加ESC键关闭功能
        const escHandler = function(e) {
            if (e.key === 'Escape') {
                closeAsyncCounterDialog();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // 添加拖动和调整大小功能
        if (typeof window.makeDraggableAndResizable === 'function') {
            window.makeDraggableAndResizable(dialog);
        }
    }
}

// 关闭异步计数器对话框
function closeAsyncCounterDialog() {
    const dialog = document.getElementById('async-counter-dialog');
    if (dialog) {
        dialog.style.display = 'none';
    }
}

// 主初始化函数
function initializeBinaryAsyncCounterModule(componentSvgs, logicFunctions) {
    try {
        if (componentSvgs) {
            Object.assign(componentSvgs, binaryAsyncCounterSvg);
            console.log('异步二进制计数器 SVG模板已添加');
        } else {
            console.warn('componentSvgs对象未提供给异步计数器模块');
        }

        if (logicFunctions) {
            Object.assign(logicFunctions, binaryAsyncCounterLogic);
            console.log('异步二进制计数器逻辑函数已添加');
        } else {
            console.warn('logicFunctions对象未提供给异步计数器模块');
        }

        console.log('异步二进制计数器模块初始化成功');
    } catch (error) {
        console.error('异步二进制计数器模块初始化失败:', error);
    }
}

// 将函数添加到全局作用域
window.showAsyncCounterDialog = showAsyncCounterDialog;
window.closeAsyncCounterDialog = closeAsyncCounterDialog;
window.initializeBinaryAsyncCounter = initializeBinaryAsyncCounter;
window.updateAsyncCounterDisplay = updateAsyncCounterDisplay;

// 暴露到全局作用域
window.BinaryAsyncCounterComponent = {
    initialize: initializeBinaryAsyncCounter,
    svg: binaryAsyncCounterSvg['binary-async-counter'],
    logic: binaryAsyncCounterLogic['binary-async-counter'],
    initModule: initializeBinaryAsyncCounterModule,
    updateDisplay: updateAsyncCounterDisplay
};

// 自动初始化（如果相关对象已存在）
if (typeof window !== 'undefined') {
    // 立即尝试初始化
    if (window.componentSvgs && window.logicFunctions) {
        initializeBinaryAsyncCounterModule(window.componentSvgs, window.logicFunctions);
    }

    // 等待DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if (window.componentSvgs && window.logicFunctions) {
                    initializeBinaryAsyncCounterModule(window.componentSvgs, window.logicFunctions);
                }
            }, 500);
        });
    } else {
        // DOM已加载，延迟初始化以确保主系统已准备好
        setTimeout(() => {
            if (window.componentSvgs && window.logicFunctions) {
                initializeBinaryAsyncCounterModule(window.componentSvgs, window.logicFunctions);
            }
        }, 500);

        // 再次尝试，确保集成成功
        setTimeout(() => {
            if (window.componentSvgs && !window.componentSvgs['binary-async-counter']) {
                console.warn('异步计数器 SVG模板未成功集成，尝试手动添加...');
                if (window.componentSvgs) {
                    window.componentSvgs['binary-async-counter'] = binaryAsyncCounterSvg['binary-async-counter'];
                    console.log('异步计数器 SVG模板手动添加成功');
                }
            }
            if (window.logicFunctions && !window.logicFunctions['binary-async-counter']) {
                console.warn('异步计数器逻辑函数未成功集成，尝试手动添加...');
                if (window.logicFunctions) {
                    window.logicFunctions['binary-async-counter'] = binaryAsyncCounterLogic['binary-async-counter'];
                    console.log('异步计数器逻辑函数手动添加成功');
                }
            }
        }, 1000);
    }
}
