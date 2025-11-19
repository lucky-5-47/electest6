/**
 * 74LS138 3线-8线译码器组件模块
 * 实现74LS138芯片的完整功能，包括使能控制和输出译码
 */

// 74LS138 SVG模板
const ls138Component = {
    '74ls138': `
        <svg class="component-svg" viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
            <g id="ls138-group" transform="translate(100, 160)">
                <!-- 芯片主体 - 更细长的形状 -->
                <rect id="ls138-bg" x="-80" y="-140" width="160" height="280" rx="8" fill="#E8F4FD" stroke="black" stroke-width="2"/>

                <!-- 芯片标识 -->
                <text x="0" y="-110" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="black">74LS138</text>
                <text x="0" y="-95" font-family="Arial" font-size="10" text-anchor="middle" fill="black">3-8 DECODER</text>

                <!-- 左侧输入端口 -->
                <!-- A2 -->
                <line x1="-90" y1="-80" x2="-80" y2="-80" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A2" cx="-95" cy="-80" r="4" fill="black"/>
                <text x="-70" y="-76" font-family="Arial" font-size="9" fill="black">A2</text>

                <!-- A1 -->
                <line x1="-90" y1="-60" x2="-80" y2="-60" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A1" cx="-95" cy="-60" r="4" fill="black"/>
                <text x="-70" y="-56" font-family="Arial" font-size="9" fill="black">A1</text>

                <!-- A0 -->
                <line x1="-90" y1="-40" x2="-80" y2="-40" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A0" cx="-95" cy="-40" r="4" fill="black"/>
                <text x="-70" y="-36" font-family="Arial" font-size="9" fill="black">A0</text>

                <!-- G1 -->
                <line x1="-90" y1="-10" x2="-80" y2="-10" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="G1" cx="-95" cy="-10" r="4" fill="black"/>
                <text x="-70" y="-6" font-family="Arial" font-size="9" fill="black">G1</text>

                <!-- G2A (低电平有效) -->
                <line x1="-80" y1="10" x2="-86" y2="10" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="-86" cy="10" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="-89" y1="10" x2="-95" y2="10" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="G2A" cx="-95" cy="10" r="4" fill="black"/>
                <text x="-70" y="14" font-family="Arial" font-size="8" fill="black">G̅2̅A̅</text>

                <!-- G2B (低电平有效) -->
                <line x1="-80" y1="30" x2="-86" y2="30" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="-86" cy="30" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="-89" y1="30" x2="-95" y2="30" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="G2B" cx="-95" cy="30" r="4" fill="black"/>
                <text x="-70" y="34" font-family="Arial" font-size="8" fill="black">G̅2̅B̅</text>

                <!-- 右侧输出端口 -->
                <!-- Y0 (低电平有效输出) -->
                <line x1="80" y1="-80" x2="86" y2="-80" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="86" cy="-80" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="89" y1="-80" x2="95" y2="-80" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y0" cx="95" cy="-80" r="4" fill="black"/>
                <text x="50" y="-76" font-family="Arial" font-size="8" fill="black">Y̅0̅</text>

                <!-- Y1 (低电平有效输出) -->
                <line x1="80" y1="-60" x2="86" y2="-60" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="86" cy="-60" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="89" y1="-60" x2="95" y2="-60" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y1" cx="95" cy="-60" r="4" fill="black"/>
                <text x="50" y="-56" font-family="Arial" font-size="8" fill="black">Y̅1̅</text>

                <!-- Y2 (低电平有效输出) -->
                <line x1="80" y1="-40" x2="86" y2="-40" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="86" cy="-40" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="89" y1="-40" x2="95" y2="-40" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y2" cx="95" cy="-40" r="4" fill="black"/>
                <text x="50" y="-36" font-family="Arial" font-size="8" fill="black">Y̅2̅</text>

                <!-- Y3 (低电平有效输出) -->
                <line x1="80" y1="-20" x2="86" y2="-20" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="86" cy="-20" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="89" y1="-20" x2="95" y2="-20" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y3" cx="95" cy="-20" r="4" fill="black"/>
                <text x="50" y="-16" font-family="Arial" font-size="8" fill="black">Y̅3̅</text>

                <!-- Y4 (低电平有效输出) -->
                <line x1="80" y1="0" x2="86" y2="0" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="86" cy="0" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="89" y1="0" x2="95" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y4" cx="95" cy="0" r="4" fill="black"/>
                <text x="50" y="4" font-family="Arial" font-size="8" fill="black">Y̅4̅</text>

                <!-- Y5 (低电平有效输出) -->
                <line x1="80" y1="20" x2="86" y2="20" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="86" cy="20" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="89" y1="20" x2="95" y2="20" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y5" cx="95" cy="20" r="4" fill="black"/>
                <text x="50" y="24" font-family="Arial" font-size="8" fill="black">Y̅5̅</text>

                <!-- Y6 (低电平有效输出) -->
                <line x1="80" y1="40" x2="86" y2="40" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="86" cy="40" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="89" y1="40" x2="95" y2="40" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y6" cx="95" cy="40" r="4" fill="black"/>
                <text x="50" y="44" font-family="Arial" font-size="8" fill="black">Y̅6̅</text>

                <!-- Y7 (低电平有效输出) -->
                <line x1="80" y1="60" x2="86" y2="60" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="86" cy="60" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="89" y1="60" x2="95" y2="60" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y7" cx="95" cy="60" r="4" fill="black"/>
                <text x="50" y="64" font-family="Arial" font-size="8" fill="black">Y̅7̅</text>

                <!-- 内部逻辑示意 -->
                <text x="0" y="90" font-family="Arial" font-size="9" text-anchor="middle" fill="#666">3→8 DECODE</text>

                <!-- 分隔线 -->
                <line x1="-70" y1="-25" x2="70" y2="-25" stroke="#ccc" stroke-width="1" stroke-dasharray="2,2"/>
            </g>
        </svg>
    `
};

// 74LS138逻辑函数 - 根据真值表实现
const ls138LogicFunction = {
    '74ls138': (inputs) => {
        // 获取输入值，默认为0
        const A2 = inputs.A2 || 0;
        const A1 = inputs.A1 || 0;
        const A0 = inputs.A0 || 0;
        const G1 = inputs.G1 || 0;    // S1 - 高电平有效
        const G2A = inputs.G2A || 0;  // S̅2̅ - 低电平有效
        const G2B = inputs.G2B || 0;  // S̅3̅ - 低电平有效

        console.log('74LS138输入:', { A2, A1, A0, G1, G2A, G2B });

        // 确保输入值是数字类型
        const a2 = Number(A2) || 0;
        const a1 = Number(A1) || 0;
        const a0 = Number(A0) || 0;
        const g1 = Number(G1) || 0;
        const g2a = Number(G2A) || 0;
        const g2b = Number(G2B) || 0;

        console.log('转换后的输入:', { a2, a1, a0, g1, g2a, g2b });

        // 根据真值表：使能条件是 S1=1 且 S̅2̅=0 且 S̅3̅=0
        // 注意：从真值表看，当S1=0或S̅2̅=1或S̅3̅=1时，所有输出都是1
        const enableCondition = (g1 === 1) && (g2a === 0) && (g2b === 0);

        console.log('使能条件:', enableCondition);

        // 初始化所有输出为1（根据真值表，禁用时所有输出都是1）
        let outputs = {
            Y0: 1, Y1: 1, Y2: 1, Y3: 1,
            Y4: 1, Y5: 1, Y6: 1, Y7: 1
        };

        // 只有在使能条件满足时才进行译码
        if (enableCondition) {
            // 根据A2A1A0的二进制值选择对应的输出线
            const selectedOutput = (a2 << 2) | (a1 << 1) | a0;
            console.log('选择的输出线:', selectedOutput);

            // 将选中的输出设为0，其他保持1（低电平有效输出）
            switch(selectedOutput) {
                case 0: outputs.Y0 = 0; break;  // 000 -> Y0=0
                case 1: outputs.Y1 = 0; break;  // 001 -> Y1=0
                case 2: outputs.Y2 = 0; break;  // 010 -> Y2=0
                case 3: outputs.Y3 = 0; break;  // 011 -> Y3=0
                case 4: outputs.Y4 = 0; break;  // 100 -> Y4=0
                case 5: outputs.Y5 = 0; break;  // 101 -> Y5=0
                case 6: outputs.Y6 = 0; break;  // 110 -> Y6=0
                case 7: outputs.Y7 = 0; break;  // 111 -> Y7=0
            }
        }

        console.log('74LS138输出:', outputs);
        return outputs;
    }
};

// 74LS138说明对话框HTML
const ls138DialogHTML = `
<div id="ls138-dialog" class="component-dialog draggable-dialog resizable-dialog" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; width: 800px; height: 600px; min-width: 600px; min-height: 400px;">
    <div class="dialog-content" style="width: 100%; height: 100%; background: white; border: 2px solid #333; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); display: flex; flex-direction: column;">
        <div class="dialog-header" style="background: #2196F3; color: white; padding: 15px 20px; border-radius: 6px 6px 0 0; cursor: move; user-select: none; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
            <h2 style="margin: 0; font-size: 1.5em;">74LS138 3线-8线译码器</h2>
            <button class="dialog-close" onclick="closeLs138Dialog()" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">&times;</button>
        </div>
        <div class="dialog-body" style="padding: 20px; overflow-y: auto; flex: 1;">
            <div class="dialog-section">
                <h3>功能描述</h3>
                <p>74LS138是一个3线到8线译码器，具有3个使能输入端。当使能条件满足时，根据3位地址输入(A2、A1、A0)的组合，8个输出中只有一个被选中输出低电平，其余输出高电平。</p>
                <ul>
                    <li><strong>输入</strong>：3个地址输入(A2、A1、A0)，3个使能输入(G1、G̅2̅A̅、G̅2̅B̅)</li>
                    <li><strong>输出</strong>：8个互斥的低电平有效输出(Y̅0̅~Y̅7̅)</li>
                    <li><strong>使能条件</strong>：G1=1 且 G̅2̅A̅=0 且 G̅2̅B̅=0</li>
                </ul>
            </div>


            <div class="dialog-section">
                <h3>功能表</h3>
                <table class="truth-table">
                    <tr>
                        <th colspan="3">使能输入</th>
                        <th colspan="3">地址输入</th>
                        <th colspan="8">输出</th>
                    </tr>
                    <tr>
                        <th>G1</th><th>G̅2̅A̅</th><th>G̅2̅B̅</th>
                        <th>A2</th><th>A1</th><th>A0</th>
                        <th>Y̅0̅</th><th>Y̅1̅</th><th>Y̅2̅</th><th>Y̅3̅</th><th>Y̅4̅</th><th>Y̅5̅</th><th>Y̅6̅</th><th>Y̅7̅</th>
                    </tr>
                    <tr><td>0</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                    <tr><td>X</td><td>1</td><td>X</td><td>X</td><td>X</td><td>X</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                    <tr><td>X</td><td>X</td><td>1</td><td>X</td><td>X</td><td>X</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                    <tr><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                    <tr><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                    <tr><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                    <tr><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                    <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
                    <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
                    <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
                    <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>
                </table>
                <p><small>注：X表示任意状态(0或1)，0表示低电平，1表示高电平</small></p>
            </div>

            <div class="dialog-section">
                <h3>典型接线图</h3>
                <div class="wiring-example">
                    <h4>基本译码应用</h4>
                    <pre>
输入端口 → A2, A1, A0 (地址输入)
输入端口(1) → G1 (使能)
输入端口(0) → G̅2̅A̅, G̅2̅B̅ (使能)
Y̅0̅~Y̅7̅ → 输出端口/LED (观察译码结果)
                    </pre>

                    <h4>地址译码器应用</h4>
                    <pre>
3位计数器输出 → A2, A1, A0
控制信号 → G1, G̅2̅A̅, G̅2̅B̅
Y̅0̅~Y̅7̅ → 8个不同的设备使能端
                    </pre>
                </div>
            </div>

            <div class="dialog-section">
                <h3>常见问题与调试建议</h3>
                <div class="troubleshooting">
                    <h4>问题1：所有输出都是高电平(1)</h4>
                    <p><strong>原因</strong>：使能条件不满足</p>
                    <p><strong>解决</strong>：检查G1是否为1，G̅2̅A̅和G̅2̅B̅是否都为0</p>

                    <h4>问题2：输出不随地址变化</h4>
                    <p><strong>原因</strong>：地址输入未正确连接或信号传播问题</p>
                    <p><strong>解决</strong>：检查A2、A1、A0的连接，确保信号源正常工作</p>

                    <h4>问题3：多个输出同时为低电平</h4>
                    <p><strong>原因</strong>：这是不正常的，可能是组件故障</p>
                    <p><strong>解决</strong>：删除组件重新创建，检查连线是否正确</p>

                    <h4>调试技巧</h4>
                    <ul>
                        <li>使用输出端口监测各引脚状态</li>
                        <li>先测试使能功能，再测试译码功能</li>
                        <li>按顺序测试所有地址组合(000~111)</li>
                        <li>检查浏览器控制台的调试信息</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 调整大小控制 -->
        <div class="resize-handle" style="position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; cursor: nw-resize; background: linear-gradient(-45deg, transparent 0%, transparent 30%, #ccc 30%, #ccc 40%, transparent 40%, transparent 60%, #ccc 60%, #ccc 70%, transparent 70%);"></div>
    </div>
</div>
`;

// 74LS138初始化函数
function initialize74LS138Component(componentDiv, type) {
    if (type !== '74ls138') return;

    const id = componentDiv.dataset.id;

    // 初始化组件状态
    if (typeof componentStates !== 'undefined') {
        componentStates.set(id, {
            A2: 0, A1: 0, A0: 0,
            G1: 0, G2A: 0, G2B: 0,
            Y0: 1, Y1: 1, Y2: 1, Y3: 1,
            Y4: 1, Y5: 1, Y6: 1, Y7: 1
        });
    }

    // 设置组件标题
    componentDiv.title = '74LS138 3线-8线译码器 - 双击查看详细说明';

    // 添加双击事件监听器
    componentDiv.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        showLs138Dialog();
    });

    console.log('74LS138组件初始化完成:', id);
}

// 74LS138对话框样式
const ls138DialogCSS = `
<style id="ls138-dialog-style">
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

.wiring-example pre {
    background: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    border-left: 4px solid #2196F3;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    overflow-x: auto;
}

.troubleshooting p {
    margin: 5px 0;
}

.troubleshooting ul {
    margin: 10px 0;
    padding-left: 20px;
}

.troubleshooting li {
    margin: 5px 0;
}
</style>
`;

// 显示74LS138对话框
function showLs138Dialog() {
    // 确保对话框HTML和CSS已添加到页面
    if (!document.getElementById('ls138-dialog')) {
        // 添加CSS
        if (!document.getElementById('ls138-dialog-style')) {
            document.head.insertAdjacentHTML('beforeend', ls138DialogCSS);
        }

        // 添加HTML
        document.body.insertAdjacentHTML('beforeend', ls138DialogHTML);
    }

    const dialog = document.getElementById('ls138-dialog');
    if (dialog) {
        dialog.style.display = 'flex';

        // 添加点击背景关闭功能
        dialog.addEventListener('click', function(e) {
            if (e.target === dialog) {
                closeLs138Dialog();
            }
        });

        // 添加ESC键关闭功能
        const escHandler = function(e) {
            if (e.key === 'Escape') {
                closeLs138Dialog();
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

// 关闭74LS138对话框
function closeLs138Dialog() {
    const dialog = document.getElementById('ls138-dialog');
    if (dialog) {
        dialog.style.display = 'none';
    }
}

// 将函数添加到全局作用域
window.showLs138Dialog = showLs138Dialog;
window.closeLs138Dialog = closeLs138Dialog;
window.initialize74LS138Component = initialize74LS138Component;

// 主初始化函数
function initialize74LS138Module(componentSvgs, logicFunctions) {
    try {
        if (componentSvgs) {
            Object.assign(componentSvgs, ls138Component);
            console.log('74LS138 SVG模板已添加');
        } else {
            console.warn('componentSvgs对象未提供给74LS138模块');
        }

        if (logicFunctions) {
            Object.assign(logicFunctions, ls138LogicFunction);
            console.log('74LS138逻辑函数已添加');
        } else {
            console.warn('logicFunctions对象未提供给74LS138模块');
        }
        
        console.log('74LS138模块初始化成功');
    } catch (error) {
        console.error('74LS138模块初始化失败:', error);
    }
}

// 暴露到全局作用域
window.LS138Component = {
    initialize: initialize74LS138Component,
    svg: ls138Component['74ls138'],
    logic: ls138LogicFunction['74ls138'],
    initModule: initialize74LS138Module
};

// 自动初始化（如果相关对象已存在）
if (typeof window !== 'undefined') {
    // 立即尝试初始化
    if (window.componentSvgs && window.logicFunctions) {
        initialize74LS138Module(window.componentSvgs, window.logicFunctions);
    }

    // 等待DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if (window.componentSvgs && window.logicFunctions) {
                    initialize74LS138Module(window.componentSvgs, window.logicFunctions);
                }
            }, 500);
        });
    } else {
        // DOM已加载，延迟初始化以确保主系统已准备好
        setTimeout(() => {
            if (window.componentSvgs && window.logicFunctions) {
                initialize74LS138Module(window.componentSvgs, window.logicFunctions);
            }
        }, 500);

        // 再次尝试，确保集成成功
        setTimeout(() => {
            if (window.componentSvgs && !window.componentSvgs['74ls138']) {
                console.warn('74LS138 SVG模板未成功集成，尝试手动添加...');
                if (window.componentSvgs) {
                    window.componentSvgs['74ls138'] = ls138Component['74ls138'];
                    console.log('74LS138 SVG模板手动添加成功');
                }
            }
            if (window.logicFunctions && !window.logicFunctions['74ls138']) {
                console.warn('74LS138逻辑函数未成功集成，尝试手动添加...');
                if (window.logicFunctions) {
                    window.logicFunctions['74ls138'] = ls138LogicFunction['74ls138'];
                    console.log('74LS138逻辑函数手动添加成功');
                }
            }
        }, 1000);
    }
}
