/**
 * 74LS175 四位并行寄存器组件模块
 * 实现74LS175芯片的完整功能，包括四个D触发器、公共时钟、公共清零
 */

// 74LS175 SVG模板
const ls175Component = {
    '74ls175': `
        <svg class="component-svg" viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
            <g id="ls175-group" transform="translate(100, 160)">
                <!-- 芯片主体 -->
                <rect id="ls175-bg" x="-80" y="-140" width="160" height="280" rx="8" fill="#E8F5E8" stroke="black" stroke-width="2"/>

                <!-- 芯片标识 -->
                <text x="0" y="-115" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="black">74LS175</text>
                <text x="0" y="-100" font-family="Arial" font-size="10" text-anchor="middle" fill="black">4-BIT REGISTER</text>

                <!-- 左侧输入端口 -->
                <!-- 清零端 CLR' (低电平有效) -->
                <line x1="-80" y1="-80" x2="-86" y2="-80" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="-86" cy="-80" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="-89" y1="-80" x2="-95" y2="-80" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="CLR" cx="-95" cy="-80" r="4" fill="black"/>
                <text x="-70" y="-76" font-family="Arial" font-size="8" fill="black">CLR'</text>

                <!-- 时钟输入 CLK -->
                <line x1="-90" y1="-60" x2="-80" y2="-60" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor clock-input" data-anchor-type="clock" data-pin="CLK" cx="-95" cy="-60" r="4" fill="#0066cc"/>
                <text x="-70" y="-56" font-family="Arial" font-size="9" fill="black">CLK</text>
                <!-- 时钟边沿指示 -->
                <path d="M-85,-65 L-80,-60 L-85,-55" fill="none" stroke="black" stroke-width="1"/>

                <!-- 数据输入 D1-D4 -->
                <line x1="-90" y1="-20" x2="-80" y2="-20" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D1" cx="-95" cy="-20" r="4" fill="black"/>
                <text x="-70" y="-16" font-family="Arial" font-size="9" fill="black">D1</text>

                <line x1="-90" y1="0" x2="-80" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D2" cx="-95" cy="0" r="4" fill="black"/>
                <text x="-70" y="4" font-family="Arial" font-size="9" fill="black">D2</text>

                <line x1="-90" y1="20" x2="-80" y2="20" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D3" cx="-95" cy="20" r="4" fill="black"/>
                <text x="-70" y="24" font-family="Arial" font-size="9" fill="black">D3</text>

                <line x1="-90" y1="40" x2="-80" y2="40" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D4" cx="-95" cy="40" r="4" fill="black"/>
                <text x="-70" y="44" font-family="Arial" font-size="9" fill="black">D4</text>

                <!-- 右侧输出端口 -->
                <!-- 正相输出 Q1-Q4 -->
                <line x1="80" y1="-40" x2="90" y2="-40" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q1" cx="95" cy="-40" r="4" fill="black"/>
                <text x="50" y="-36" font-family="Arial" font-size="9" fill="black">Q1</text>

                <line x1="80" y1="-20" x2="90" y2="-20" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q2" cx="95" cy="-20" r="4" fill="black"/>
                <text x="50" y="-16" font-family="Arial" font-size="9" fill="black">Q2</text>

                <line x1="80" y1="0" x2="90" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q3" cx="95" cy="0" r="4" fill="black"/>
                <text x="50" y="4" font-family="Arial" font-size="9" fill="black">Q3</text>

                <line x1="80" y1="20" x2="90" y2="20" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q4" cx="95" cy="20" r="4" fill="black"/>
                <text x="50" y="24" font-family="Arial" font-size="9" fill="black">Q4</text>

                <!-- 反相输出 \Q1-\Q4 -->
                <line x1="80" y1="60" x2="90" y2="60" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="NQ1" cx="95" cy="60" r="4" fill="black"/>
                <text x="50" y="64" font-family="Arial" font-size="8" fill="black">\\Q1</text>

                <line x1="80" y1="80" x2="90" y2="80" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="NQ2" cx="95" cy="80" r="4" fill="black"/>
                <text x="50" y="84" font-family="Arial" font-size="8" fill="black">\\Q2</text>

                <line x1="80" y1="100" x2="90" y2="100" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="NQ3" cx="95" cy="100" r="4" fill="black"/>
                <text x="50" y="104" font-family="Arial" font-size="8" fill="black">\\Q3</text>

                <line x1="80" y1="120" x2="90" y2="120" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="NQ4" cx="95" cy="120" r="4" fill="black"/>
                <text x="50" y="124" font-family="Arial" font-size="8" fill="black">\\Q4</text>

                <!-- 内部逻辑示意 -->
                <text x="0" y="60" font-family="Arial" font-size="9" text-anchor="middle" fill="#666">4×D-FF</text>

                <!-- 分隔线 -->
                <line x1="-70" y1="-40" x2="70" y2="-40" stroke="#ccc" stroke-width="1" stroke-dasharray="2,2"/>
                <line x1="-70" y1="40" x2="70" y2="40" stroke="#ccc" stroke-width="1" stroke-dasharray="2,2"/>
            </g>
        </svg>
    `
};

// 74LS175逻辑函数 - 根据功能表实现
const ls175LogicFunction = {
    '74ls175': (inputs, currentState = {}) => {
        // 获取输入值，默认为0
        const CLR = inputs.CLR !== undefined ? inputs.CLR : 1;  // 清零端，低电平有效
        const CLK = inputs.CLK || 0;    // 时钟输入，上升沿有效
        
        // 数据输入
        const D1 = inputs.D1 || 0;
        const D2 = inputs.D2 || 0;
        const D3 = inputs.D3 || 0;
        const D4 = inputs.D4 || 0;

        console.log('74LS175输入:', { CLR, CLK, D1, D2, D3, D4 });

        // 确保输入值是数字类型
        const clr = Number(CLR);
        const clk = Number(CLK);
        const d1 = Number(D1);
        const d2 = Number(D2);
        const d3 = Number(D3);
        const d4 = Number(D4);

        // 获取当前状态
        let q1 = currentState.Q1 || 0;
        let q2 = currentState.Q2 || 0;
        let q3 = currentState.Q3 || 0;
        let q4 = currentState.Q4 || 0;
        
        // 检测时钟边沿
        const prevCLK = currentState.prevCLK || 0;
        const clockEdge = (prevCLK === 0 && clk === 1); // 上升沿检测

        console.log('当前状态:', { q1, q2, q3, q4, prevCLK, clockEdge });

        // 根据功能表实现逻辑
        if (clr === 0) {
            // 当CLR'为0时，异步清零，无论时钟CLK或输入D的状态如何，所有Q立即置为低电平，\Q置为高电平
            q1 = 0; q2 = 0; q3 = 0; q4 = 0;
            console.log('异步清零');
        } else if (clockEdge) {
            // 在时钟上升沿时进行操作
            // 锁存数据(0)：在时钟上升沿时刻，将D端的低电平数据锁存到输出。Q=L，\Q=H。
            // 锁存数据(1)：在时钟上升沿时刻，将D端的高电平数据锁存到输出。Q=H，\Q=L。
            q1 = d1; q2 = d2; q3 = d3; q4 = d4;
            console.log('锁存数据:', { q1, q2, q3, q4 });
        } else {
            // 保持：时钟为低电平或高电平稳态时，输出保持上一次锁存的值不变。
            console.log('保持原数据');
            // 输出保持不变
        }

        const outputs = {
            Q1: q1, Q2: q2, Q3: q3, Q4: q4,
            NQ1: 1 - q1, NQ2: 1 - q2, NQ3: 1 - q3, NQ4: 1 - q4,  // 反相输出
            prevCLK: clk  // 保存当前时钟状态用于下次边沿检测
        };

        console.log('74LS175输出:', outputs);
        return outputs;
    }
};

// 74LS175说明对话框HTML
const ls175DialogHTML = `
<div id="ls175-dialog" class="component-dialog draggable-dialog resizable-dialog" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; width: 800px; height: 600px; min-width: 600px; min-height: 400px;">
    <div class="dialog-content" style="width: 100%; height: 100%; background: white; border: 2px solid #333; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); display: flex; flex-direction: column;">
        <div class="dialog-header" style="background: #4CAF50; color: white; padding: 15px 20px; border-radius: 6px 6px 0 0; cursor: move; user-select: none; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
            <h2 style="margin: 0; font-size: 1.5em;">74LS175 四位并行寄存器</h2>
            <button class="dialog-close" onclick="closeLs175Dialog()" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">&times;</button>
        </div>
        <div class="dialog-body" style="padding: 20px; overflow-y: auto; flex: 1;">
            <div class="dialog-section">
                <h3>功能描述</h3>
                <p>74LS175是一个四位并行寄存器，包含四个独立的D触发器，具有公共时钟和公共清零功能。每个触发器都有独立的数据输入和正反相输出。</p>
                <ul>
                    <li><strong>CLR'</strong>：公共清除引脚，低电平有效，异步操作，优先级最高</li>
                    <li><strong>CLK</strong>：公共时钟输入端，上升沿触发</li>
                    <li><strong>D1~D4</strong>：数据输入端，分别对应四个触发器</li>
                    <li><strong>Q1~Q4</strong>：同相输出端，分别对应四个触发器</li>
                    <li><strong>\\Q1~\\Q4</strong>：反相输出端，分别对应四个触发器</li>
                </ul>
            </div>

            <div class="dialog-section">
                <h3>引脚说明</h3>
                <div class="pin-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 15px 0;">
                    <div>
                        <h4>输入引脚</h4>
                        <ul>
                            <li><strong>CLR' (引脚1)</strong>：公共清除引脚，低电平有效</li>
                            <li><strong>CLK (引脚9)</strong>：公共时钟输入端，上升沿有效</li>
                            <li><strong>D1 (引脚4)</strong>：第一个触发器的数据输入端</li>
                            <li><strong>D2 (引脚5)</strong>：第二个触发器的数据输入端</li>
                            <li><strong>D3 (引脚12)</strong>：第三个触发器的数据输入端</li>
                            <li><strong>D4 (引脚13)</strong>：第四个触发器的数据输入端</li>
                        </ul>
                    </div>
                    <div>
                        <h4>输出引脚</h4>
                        <ul>
                            <li><strong>Q1 (引脚2)</strong>：第一个触发器的同相输出端</li>
                            <li><strong>Q2 (引脚3)</strong>：第二个触发器的同相输出端</li>
                            <li><strong>Q3 (引脚7)</strong>：第三个触发器的同相输出端</li>
                            <li><strong>Q4 (引脚6)</strong>：第四个触发器的同相输出端</li>
                            <li><strong>\\Q1 (引脚8)</strong>：第一个触发器的反相输出端</li>
                            <li><strong>\\Q2 (引脚11)</strong>：第二个触发器的反相输出端</li>
                            <li><strong>\\Q3 (引脚10)</strong>：第三个触发器的反相输出端</li>
                            <li><strong>\\Q4 (引脚15)</strong>：第四个触发器的反相输出端</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="dialog-section">
                <h3>功能表</h3>
                <table class="truth-table">
                    <tr>
                        <th>CLR'</th><th>CLK</th><th>D</th><th>Q输出</th><th>\\Q输出</th><th>功能说明</th>
                    </tr>
                    <tr><td>L</td><td>X</td><td>X</td><td>L</td><td>H</td><td>异步清除。无论时钟CLK或输入D的状态如何，所有Q立即置为低电平，\\Q置为高电平。</td></tr>
                    <tr><td>H</td><td>↑</td><td>L</td><td>L</td><td>H</td><td>锁存数据(0)。在时钟上升沿时刻，将D端的低电平数据锁存到输出。Q=L，\\Q=H。</td></tr>
                    <tr><td>H</td><td>↑</td><td>H</td><td>H</td><td>L</td><td>锁存数据(1)。在时钟上升沿时刻，将D端的高电平数据锁存到输出。Q=H，\\Q=L。</td></tr>
                    <tr><td>H</td><td>L</td><td>X</td><td>保持Qn</td><td>保持\\Qn</td><td>保持。时钟为低电平或高电平稳态时，输出保持上一次锁存的值不变。</td></tr>
                    <tr><td>H</td><td>H</td><td>X</td><td>保持Qn</td><td>保持\\Qn</td><td>保持。时钟为低电平或高电平稳态时，输出保持上一次锁存的值不变。</td></tr>
                    <tr><td>H</td><td>↓</td><td>X</td><td>保持Qn</td><td>保持\\Qn</td><td>保持。时钟下降沿不影响输出，输出保持上一次锁存的值不变。</td></tr>
                </table>
                <p><small>注：X表示任意状态(0或1)，↑表示上升沿，↓表示下降沿，L表示低电平，H表示高电平</small></p>
            </div>

            <div class="dialog-section">
                <h3>工作原理</h3>
                <div class="analysis">
                    <p><strong>异步清零</strong>：当CLR'为低电平时，无论其他信号状态如何，所有四个触发器立即被清零，Q1~Q4输出低电平，\\Q1~\\Q4输出高电平。这是异步操作，具有最高优先级。</p>
                    <p><strong>数据锁存</strong>：当CLR'为高电平且时钟CLK出现上升沿时，各个触发器将对应的D输入数据锁存到输出端。如果Di为高电平，则Qi输出高电平，\\Qi输出低电平；如果Di为低电平，则Qi输出低电平，\\Qi输出高电平。</p>
                    <p><strong>数据保持</strong>：在非时钟上升沿期间（时钟为低电平、高电平稳态或下降沿），所有输出保持上一次锁存的状态不变。</p>
                    <p><strong>独立操作</strong>：四个触发器虽然共享时钟和清零信号，但数据输入和输出是完全独立的，可以分别存储不同的数据位。</p>
                </div>
            </div>
        </div>
        <!-- 调整大小控制 -->
        <div class="resize-handle" style="position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; cursor: nw-resize; background: linear-gradient(-45deg, transparent 0%, transparent 30%, #ccc 30%, #ccc 40%, transparent 40%, transparent 60%, #ccc 60%, #ccc 70%, transparent 70%);"></div>
    </div>
</div>
`;

// 74LS175初始化函数
function initialize74LS175Component(componentDiv, type) {
    if (type !== '74ls175') return;

    const id = componentDiv.dataset.id;

    // 初始化组件状态
    if (typeof componentStates !== 'undefined') {
        componentStates.set(id, {
            CLR: 1, CLK: 0,
            D1: 0, D2: 0, D3: 0, D4: 0,
            Q1: 0, Q2: 0, Q3: 0, Q4: 0,
            NQ1: 1, NQ2: 1, NQ3: 1, NQ4: 1,
            prevCLK: 0
        });
    }

    // 设置组件标题
    componentDiv.title = '74LS175 四位并行寄存器 - 双击查看详细说明';

    // 添加双击事件监听器
    componentDiv.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        showLs175Dialog();
    });

    console.log('74LS175组件初始化完成:', id);
}

// 74LS175对话框样式
const ls175DialogCSS = `
<style id="ls175-dialog-style">
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
    max-width: 800px;
    max-height: 90%;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.dialog-header {
    background: #4CAF50;
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
    color: #388E3C;
    border-bottom: 2px solid #C8E6C9;
    padding-bottom: 5px;
    margin-bottom: 15px;
}

.dialog-section h4 {
    color: #424242;
    margin-top: 15px;
    margin-bottom: 8px;
}

.truth-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    font-size: 0.9em;
}

.truth-table th, .truth-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.truth-table th {
    background: #f5f5f5;
    font-weight: bold;
}

.truth-table tr:nth-child(even) {
    background: #f9f9f9;
}

.analysis p, .pin-description p {
    margin: 10px 0;
    line-height: 1.6;
}

.pin-layout ul {
    margin: 5px 0;
    padding-left: 20px;
}

.pin-layout li {
    margin: 3px 0;
}
</style>
`;

// 显示74LS175对话框
function showLs175Dialog() {
    // 确保对话框HTML和CSS已添加到页面
    if (!document.getElementById('ls175-dialog')) {
        // 添加CSS
        if (!document.getElementById('ls175-dialog-style')) {
            document.head.insertAdjacentHTML('beforeend', ls175DialogCSS);
        }

        // 添加HTML
        document.body.insertAdjacentHTML('beforeend', ls175DialogHTML);
    }

    const dialog = document.getElementById('ls175-dialog');
    if (dialog) {
        dialog.style.display = 'flex';

        // 添加点击背景关闭功能
        dialog.addEventListener('click', function(e) {
            if (e.target === dialog) {
                closeLs175Dialog();
            }
        });

        // 添加ESC键关闭功能
        const escHandler = function(e) {
            if (e.key === 'Escape') {
                closeLs175Dialog();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // 添加拖动和调整大小功能
        if (typeof makeDraggableAndResizable === 'function') {
            makeDraggableAndResizable(dialog);
        } else if (typeof window.makeDraggableAndResizable === 'function') {
            window.makeDraggableAndResizable(dialog);
        } else {
            // 如果全局函数不存在，使用本地实现
            makeLS175DialogDraggableAndResizable(dialog);
        }
    }
}

// 关闭74LS175对话框
function closeLs175Dialog() {
    const dialog = document.getElementById('ls175-dialog');
    if (dialog) {
        dialog.style.display = 'none';
    }
}

// 74LS175对话框拖动和调整大小功能
function makeLS175DialogDraggableAndResizable(element) {
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
            const minWidth = 600;
            const minHeight = 400;

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

// 将函数添加到全局作用域
window.showLs175Dialog = showLs175Dialog;
window.closeLs175Dialog = closeLs175Dialog;
window.initialize74LS175Component = initialize74LS175Component;

// 主初始化函数
function initialize74LS175Module(componentSvgs, logicFunctions) {
    try {
        if (componentSvgs) {
            Object.assign(componentSvgs, ls175Component);
            console.log('74LS175 SVG模板已添加');
        } else {
            console.warn('componentSvgs对象未提供给74LS175模块');
        }

        if (logicFunctions) {
            Object.assign(logicFunctions, ls175LogicFunction);
            console.log('74LS175逻辑函数已添加');
        } else {
            console.warn('logicFunctions对象未提供给74LS175模块');
        }

        console.log('74LS175模块初始化成功');
    } catch (error) {
        console.error('74LS175模块初始化失败:', error);
    }
}

// 暴露到全局作用域
window.LS175Component = {
    initialize: initialize74LS175Component,
    svg: ls175Component['74ls175'],
    logic: ls175LogicFunction['74ls175'],
    initModule: initialize74LS175Module
};

// 自动初始化（如果相关对象已存在）
if (typeof window !== 'undefined') {
    // 立即尝试初始化
    if (window.componentSvgs && window.logicFunctions) {
        initialize74LS175Module(window.componentSvgs, window.logicFunctions);
    }

    // 等待DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if (window.componentSvgs && window.logicFunctions) {
                    initialize74LS175Module(window.componentSvgs, window.logicFunctions);
                }
            }, 500);
        });
    } else {
        // DOM已加载，延迟初始化以确保主系统已准备好
        setTimeout(() => {
            if (window.componentSvgs && window.logicFunctions) {
                initialize74LS175Module(window.componentSvgs, window.logicFunctions);
            }
        }, 500);

        // 再次尝试，确保集成成功
        setTimeout(() => {
            if (window.componentSvgs && !window.componentSvgs['74ls175']) {
                console.warn('74LS175 SVG模板未成功集成，尝试手动添加...');
                if (window.componentSvgs) {
                    window.componentSvgs['74ls175'] = ls175Component['74ls175'];
                    console.log('74LS175 SVG模板手动添加成功');
                }
            }
            if (window.logicFunctions && !window.logicFunctions['74ls175']) {
                console.warn('74LS175逻辑函数未成功集成，尝试手动添加...');
                if (window.logicFunctions) {
                    window.logicFunctions['74ls175'] = ls175LogicFunction['74ls175'];
                    console.log('74LS175逻辑函数手动添加成功');
                }
            }
        }, 1000);
    }
}
