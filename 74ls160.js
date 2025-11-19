/**
 * 74LS160 4位同步十进制计数器组件模块
 * 实现74LS160芯片的完整功能，包括同步计数、预置、清零和使能控制
 * 与74LS161的区别：74LS160是十进制计数器（0-9），74LS161是二进制计数器（0-15）
 */

// 74LS160 SVG模板
const ls160Component = {
    '74ls160': `
        <svg class="component-svg" viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
            <g id="ls160-group" transform="translate(100, 140)">
                <!-- 芯片主体 -->
                <rect id="ls160-bg" x="-80" y="-120" width="160" height="240" rx="8" fill="#FFE8E8" stroke="black" stroke-width="2"/>

                <!-- 芯片标识 -->
                <text x="0" y="-95" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="black">74LS160</text>
                <text x="0" y="-80" font-family="Arial" font-size="10" text-anchor="middle" fill="black">DEC COUNTER</text>

                <!-- 左侧输入端口 -->
                <!-- 清零端 RD' (低电平有效) -->
                <line x1="-80" y1="-60" x2="-86" y2="-60" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="-86" cy="-60" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="-89" y1="-60" x2="-95" y2="-60" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="RD" cx="-95" cy="-60" r="4" fill="black"/>
                <text x="-70" y="-56" font-family="Arial" font-size="8" fill="black">RD'</text>

                <!-- 时钟输入 CP -->
                <line x1="-80" y1="-40" x2="-86" y2="-40" stroke="black" stroke-width="2"/>
                <!-- 时钟符号 -->
                <polygon points="-86,-43 -89,-40 -86,-37" fill="none" stroke="black" stroke-width="1"/>
                <line x1="-89" y1="-40" x2="-95" y2="-40" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="CP" cx="-95" cy="-40" r="4" fill="black"/>
                <text x="-70" y="-36" font-family="Arial" font-size="9" fill="black">CP</text>

                <!-- 预置控制 LD' (低电平有效) -->
                <line x1="-80" y1="-20" x2="-86" y2="-20" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="-86" cy="-20" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="-89" y1="-20" x2="-95" y2="-20" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="LD" cx="-95" cy="-20" r="4" fill="black"/>
                <text x="-70" y="-16" font-family="Arial" font-size="8" fill="black">LD'</text>

                <!-- 使能端 EP -->
                <line x1="-90" y1="0" x2="-80" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="EP" cx="-95" cy="0" r="4" fill="black"/>
                <text x="-70" y="4" font-family="Arial" font-size="9" fill="black">EP</text>

                <!-- 使能端 ET -->
                <line x1="-90" y1="20" x2="-80" y2="20" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="ET" cx="-95" cy="20" r="4" fill="black"/>
                <text x="-70" y="24" font-family="Arial" font-size="9" fill="black">ET</text>

                <!-- 预置数据输入 A0-A3 -->
                <line x1="-90" y1="40" x2="-80" y2="40" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A0" cx="-95" cy="40" r="4" fill="black"/>
                <text x="-70" y="44" font-family="Arial" font-size="9" fill="black">A0</text>

                <line x1="-90" y1="60" x2="-80" y2="60" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A1" cx="-95" cy="60" r="4" fill="black"/>
                <text x="-70" y="64" font-family="Arial" font-size="9" fill="black">A1</text>

                <line x1="-90" y1="80" x2="-80" y2="80" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A2" cx="-95" cy="80" r="4" fill="black"/>
                <text x="-70" y="84" font-family="Arial" font-size="9" fill="black">A2</text>

                <line x1="-90" y1="100" x2="-80" y2="100" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A3" cx="-95" cy="100" r="4" fill="black"/>
                <text x="-70" y="104" font-family="Arial" font-size="9" fill="black">A3</text>

                <!-- 右侧输出端口 -->
                <!-- 计数输出 Q0-Q3 -->
                <line x1="80" y1="-40" x2="90" y2="-40" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q0" cx="95" cy="-40" r="4" fill="black"/>
                <text x="50" y="-36" font-family="Arial" font-size="9" fill="black">Q0</text>

                <line x1="80" y1="-20" x2="90" y2="-20" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q1" cx="95" cy="-20" r="4" fill="black"/>
                <text x="50" y="-16" font-family="Arial" font-size="9" fill="black">Q1</text>

                <line x1="80" y1="0" x2="90" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q2" cx="95" cy="0" r="4" fill="black"/>
                <text x="50" y="4" font-family="Arial" font-size="9" fill="black">Q2</text>

                <line x1="80" y1="20" x2="90" y2="20" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Q3" cx="95" cy="20" r="4" fill="black"/>
                <text x="50" y="24" font-family="Arial" font-size="9" fill="black">Q3</text>

                <!-- 进位输出 RCO -->
                <line x1="80" y1="60" x2="90" y2="60" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="RCO" cx="95" cy="60" r="4" fill="black"/>
                <text x="50" y="64" font-family="Arial" font-size="8" fill="black">RCO</text>

                <!-- 内部逻辑示意 -->
                <text x="0" y="40" font-family="Arial" font-size="9" text-anchor="middle" fill="#666">DEC CTR</text>

                <!-- 分隔线 -->
                <line x1="-70" y1="-10" x2="70" y2="-10" stroke="#ccc" stroke-width="1" stroke-dasharray="2,2"/>
            </g>
        </svg>
    `
};

// 74LS160逻辑函数 - 根据功能表实现十进制计数器
const ls160LogicFunction = {
    '74ls160': (inputs, currentState = {}) => {
        // 获取输入值，默认为0
        const RD = inputs.RD !== undefined ? inputs.RD : 1;  // 清零端，低电平有效
        const CP = inputs.CP || 0;    // 时钟输入，上升沿有效
        const LD = inputs.LD !== undefined ? inputs.LD : 1;  // 预置端，低电平有效
        const EP = inputs.EP || 0;    // 计数使能端
        const ET = inputs.ET || 0;    // 计数使能端
        
        // 预置数据输入
        const A0 = inputs.A0 || 0;
        const A1 = inputs.A1 || 0;
        const A2 = inputs.A2 || 0;
        const A3 = inputs.A3 || 0;

        console.log('74LS160输入:', { RD, CP, LD, EP, ET, A0, A1, A2, A3 });

        // 确保输入值是数字类型
        const rd = Number(RD);
        const cp = Number(CP);
        const ld = Number(LD);
        const ep = Number(EP);
        const et = Number(ET);
        const a0 = Number(A0);
        const a1 = Number(A1);
        const a2 = Number(A2);
        const a3 = Number(A3);

        // 获取当前状态
        let q0 = currentState.Q0 || 0;
        let q1 = currentState.Q1 || 0;
        let q2 = currentState.Q2 || 0;
        let q3 = currentState.Q3 || 0;
        
        // 检测时钟边沿
        const prevCP = currentState.prevCP || 0;
        const clockEdge = (prevCP === 0 && cp === 1); // 上升沿检测

        console.log('当前状态:', { q0, q1, q2, q3, prevCP, clockEdge });

        // 根据功能表实现逻辑
        if (rd === 0) {
            // 异步清零：当RD'为0时，复位置0，不需要等CP时钟信号
            q0 = 0; q1 = 0; q2 = 0; q3 = 0;
            console.log('异步清零');
        } else if (clockEdge) {
            // 在时钟上升沿时进行操作
            if (ld === 0) {
                // 预置：当RD为1，LD'为0时，在CP时钟信号上升沿时刻，输出等于输入
                q0 = a0; q1 = a1; q2 = a2; q3 = a3;
                console.log('预置数据:', { q0, q1, q2, q3 });
            } else if (ep === 1 && et === 1) {
                // 计数：当RD'、LD'、EP和ET都为1时，为计数功能
                const currentCount = (q3 << 3) | (q2 << 2) | (q1 << 1) | q0;
                // 十进制计数器：0-9循环，到9后回到0
                const nextCount = (currentCount + 1) % 10;

                q0 = nextCount & 1;
                q1 = (nextCount >> 1) & 1;
                q2 = (nextCount >> 2) & 1;
                q3 = (nextCount >> 3) & 1;

                console.log('十进制计数:', currentCount, '->', nextCount, { q0, q1, q2, q3 });
            } else {
                // 保持：当RD和LD'都为1，EP和ET任意一个为0时，输出保持原数据不变
                console.log('保持原数据');
            }
        }

        // 计算进位输出 RCO：当计数到9（1001）且EP=1、ET=1时，RCO为高电平
        const rco = (q0 === 1 && q1 === 0 && q2 === 0 && q3 === 1 && ep === 1 && et === 1) ? 1 : 0;

        const outputs = {
            Q0: q0, Q1: q1, Q2: q2, Q3: q3,
            RCO: rco,
            prevCP: cp  // 保存当前时钟状态用于下次边沿检测
        };

        console.log('74LS160输出:', outputs);
        return outputs;
    }
};

// 74LS160对话框样式
const ls160DialogCSS = `
<style id="ls160-dialog-style">
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
</style>
`;

// 74LS160说明对话框HTML
const ls160DialogHTML = `
<div id="ls160-dialog" class="component-dialog draggable-dialog resizable-dialog" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; width: 800px; height: 600px; min-width: 600px; min-height: 400px;">
    <div class="dialog-content" style="width: 100%; height: 100%; background: white; border: 2px solid #333; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); display: flex; flex-direction: column;">
        <div class="dialog-header" style="background: #2196F3; color: white; padding: 15px 20px; border-radius: 6px 6px 0 0; cursor: move; user-select: none; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
            <h2>74LS160 4位同步十进制计数器</h2>
            <button class="dialog-close" onclick="closeLs160Dialog()">&times;</button>
        </div>
        <div class="dialog-body">
            <div class="dialog-section">
                <h3>功能描述</h3>
                <p>74LS160是一个4位同步十进制计数器，具有同步预置和异步清零功能。它可以进行0-9的十进制计数，并具有进位输出功能，可以级联使用构成更大的十进制计数器。</p>
                <ul>
                    <li><strong>RD'</strong>：清零端，低电平有效，异步清零</li>
                    <li><strong>CP</strong>：时钟脉冲输入端，上升沿有效</li>
                    <li><strong>LD'</strong>：并行启用控制端，低电平有效</li>
                    <li><strong>EP、ET</strong>：计数控制端，两脚同时为高电平时计数</li>
                    <li><strong>A0~A3</strong>：预置端，可预置任意一个4位BCD码</li>
                    <li><strong>Q0~Q3</strong>：数据输出端</li>
                    <li><strong>RCO</strong>：进位输出端（计数到9时进位），高电平有效</li>
                </ul>
            </div>

            <div class="dialog-section">
                <h3>功能表</h3>
                <table class="truth-table">
                    <tr>
                        <th>CP</th><th>RD'</th><th>LD'</th><th>EP</th><th>ET</th>
                        <th>功能</th><th>输出状态</th>
                    </tr>
                    <tr><td>x</td><td>0</td><td>x</td><td>x</td><td>x</td><td>异步清零</td><td>0000</td></tr>
                    <tr><td>↑</td><td>1</td><td>0</td><td>x</td><td>x</td><td>同步置数</td><td>保持(包括RCO的状态)</td></tr>
                    <tr><td>x</td><td>1</td><td>1</td><td>x</td><td>0</td><td>保持</td><td>RCO=0</td></tr>
                    <tr><td>x</td><td>1</td><td>1</td><td>0</td><td>x</td><td>保持</td><td>RCO=0</td></tr>
                    <tr><td>↑</td><td>1</td><td>1</td><td>1</td><td>1</td><td>同步计数</td><td>十进制计数</td></tr>
                </table>
                <p><small>注：x表示任意状态(0或1)，↑表示上升沿</small></p>
            </div>

            <div class="dialog-section">
                <h3>状态转换图</h3>
                <p>74LS160的有效状态转换遵循十进制计数规律：</p>
                <div class="state-diagram">
                    <p><strong>计数序列</strong>：0000 → 0001 → 0010 → 0011 → 0100 → 0101 → 0110 → 0111 → 1000 → 1001 → 0000</p>
                    <p><strong>进位输出</strong>：当计数到1001(9)且EP=ET=1时，RCO=1</p>
                    <p><strong>无效状态</strong>：1010~1111在正常工作时不会出现，如果出现会在下一个时钟跳转到有效状态</p>
                </div>
            </div>

            <div class="dialog-section">
                <h3>与74LS161的区别</h3>
                <div class="comparison">
                    <p><strong>74LS160</strong>：十进制计数器，计数范围0-9，RCO在计数到9时有效</p>
                    <p><strong>74LS161</strong>：二进制计数器，计数范围0-15，RCO在计数到15时有效</p>
                    <p>两者的引脚定义和控制逻辑完全相同，仅计数模式不同。</p>
                </div>
            </div>

            <div class="dialog-section">
                <h3>应用示例</h3>
                <div class="applications">
                    <p><strong>基本十进制计数</strong>：RD'=1, LD'=1, EP=1, ET=1，连接时钟信号</p>
                    <p><strong>预置计数起点</strong>：设置A0~A3为起始值，LD'=0，给时钟脉冲后LD'=1</p>
                    <p><strong>级联计数器</strong>：低位RCO连接高位EP，实现多位十进制计数</p>
                    <p><strong>分频器应用</strong>：利用RCO输出实现10分频功能</p>
                </div>
            </div>
        </div>
    </div>
</div>
`;

// 74LS160初始化函数
function initialize74LS160Component(componentDiv, type) {
    if (type !== '74ls160') return;

    const id = componentDiv.dataset.id;

    // 初始化组件状态
    if (typeof componentStates !== 'undefined') {
        componentStates.set(id, {
            RD: 1, CP: 0, LD: 1, EP: 0, ET: 0,
            A0: 0, A1: 0, A2: 0, A3: 0,
            Q0: 0, Q1: 0, Q2: 0, Q3: 0,
            RCO: 0, prevCP: 0
        });
    }

    // 设置组件标题
    componentDiv.title = '74LS160 4位同步十进制计数器 - 双击查看详细说明';

    // 添加双击事件监听器
    componentDiv.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        showLs160Dialog();
    });

    console.log('74LS160组件初始化完成:', id);
}

// 显示74LS160说明对话框
function showLs160Dialog() {
    // 确保对话框HTML和CSS已添加到页面
    if (!document.getElementById('ls160-dialog')) {
        // 添加CSS
        if (!document.getElementById('ls160-dialog-style')) {
            document.head.insertAdjacentHTML('beforeend', ls160DialogCSS);
        }

        // 添加HTML
        document.body.insertAdjacentHTML('beforeend', ls160DialogHTML);
    }

    const dialog = document.getElementById('ls160-dialog');
    dialog.style.display = 'flex';

    // 添加ESC键关闭功能
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeLs160Dialog();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);

    // 添加点击外部关闭功能
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            closeLs160Dialog();
        }
    });
}

// 关闭74LS160说明对话框
function closeLs160Dialog() {
    const dialog = document.getElementById('ls160-dialog');
    if (dialog) {
        dialog.style.display = 'none';
    }
}

// 将函数添加到全局作用域
window.showLs160Dialog = showLs160Dialog;
window.closeLs160Dialog = closeLs160Dialog;
window.initialize74LS160Component = initialize74LS160Component;

// 主初始化函数
function initialize74LS160Module(componentSvgs, logicFunctions) {
    try {
        if (componentSvgs) {
            Object.assign(componentSvgs, ls160Component);
            console.log('74LS160 SVG模板已添加');
        } else {
            console.warn('componentSvgs对象未提供给74LS160模块');
        }

        if (logicFunctions) {
            Object.assign(logicFunctions, ls160LogicFunction);
            console.log('74LS160逻辑函数已添加');
        } else {
            console.warn('logicFunctions对象未提供给74LS160模块');
        }

        console.log('74LS160模块初始化成功');
    } catch (error) {
        console.error('74LS160模块初始化失败:', error);
    }
}

// 暴露到全局作用域
window.LS160Component = {
    initialize: initialize74LS160Component,
    svg: ls160Component['74ls160'],
    logic: ls160LogicFunction['74ls160'],
    initModule: initialize74LS160Module
};

// 自动初始化（如果相关对象已存在）
if (typeof window !== 'undefined') {
    // 立即尝试初始化
    if (window.componentSvgs && window.logicFunctions) {
        initialize74LS160Module(window.componentSvgs, window.logicFunctions);
    }

    // 延迟初始化，等待主系统加载完成
    setTimeout(() => {
        if (window.componentSvgs && window.logicFunctions) {
            if (!window.componentSvgs['74ls160']) {
                initialize74LS160Module(window.componentSvgs, window.logicFunctions);
            }
        } else {
            console.log('等待主系统加载74LS160组件...');
        }
    }, 500);

    // 再次尝试，确保集成成功
    setTimeout(() => {
        if (window.componentSvgs && !window.componentSvgs['74ls160']) {
            console.warn('74LS160 SVG模板未成功集成，尝试手动添加...');
            if (window.componentSvgs) {
                window.componentSvgs['74ls160'] = ls160Component['74ls160'];
                console.log('74LS160 SVG模板手动添加成功');
            }
        }
        if (window.logicFunctions && !window.logicFunctions['74ls160']) {
            console.warn('74LS160逻辑函数未成功集成，尝试手动添加...');
            if (window.logicFunctions) {
                window.logicFunctions['74ls160'] = ls160LogicFunction['74ls160'];
                console.log('74LS160逻辑函数手动添加成功');
            }
        }
    }, 1000);
}
