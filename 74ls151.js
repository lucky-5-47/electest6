/**
 * 74LS151 8选1数据选择器组件模块
 * 实现74LS151芯片的完整功能，包括数据选择和使能控制
 */

// 74LS151 SVG模板
const ls151Component = {
    '74ls151': `
        <svg class="component-svg" viewBox="0 0 200 360" xmlns="http://www.w3.org/2000/svg">
            <g id="ls151-group" transform="translate(100, 180)">
                <!-- 芯片主体 -->
                <rect id="ls151-bg" x="-80" y="-160" width="160" height="320" rx="8" fill="#E8F4FD" stroke="black" stroke-width="2"/>

                <!-- 芯片标识 -->
                <text x="0" y="-130" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="black">74LS151</text>
                <text x="0" y="-115" font-family="Arial" font-size="10" text-anchor="middle" fill="black">8-1 MUX</text>

                <!-- 左侧输入端口 -->
                <!-- 地址输入端 C, B, A (引脚1-3) -->
                <line x1="-90" y1="-100" x2="-80" y2="-100" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="C" cx="-95" cy="-100" r="4" fill="black"/>
                <text x="-70" y="-96" font-family="Arial" font-size="9" fill="black">C</text>

                <line x1="-90" y1="-80" x2="-80" y2="-80" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="B" cx="-95" cy="-80" r="4" fill="black"/>
                <text x="-70" y="-76" font-family="Arial" font-size="9" fill="black">B</text>

                <line x1="-90" y1="-60" x2="-80" y2="-60" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A" cx="-95" cy="-60" r="4" fill="black"/>
                <text x="-70" y="-56" font-family="Arial" font-size="9" fill="black">A</text>

                <!-- 数据输入端 D0-D7 (引脚4-11) -->
                <line x1="-90" y1="-30" x2="-80" y2="-30" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D0" cx="-95" cy="-30" r="4" fill="black"/>
                <text x="-70" y="-26" font-family="Arial" font-size="9" fill="black">D0</text>

                <line x1="-90" y1="-10" x2="-80" y2="-10" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D1" cx="-95" cy="-10" r="4" fill="black"/>
                <text x="-70" y="-6" font-family="Arial" font-size="9" fill="black">D1</text>

                <line x1="-90" y1="10" x2="-80" y2="10" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D2" cx="-95" cy="10" r="4" fill="black"/>
                <text x="-70" y="14" font-family="Arial" font-size="9" fill="black">D2</text>

                <line x1="-90" y1="30" x2="-80" y2="30" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D3" cx="-95" cy="30" r="4" fill="black"/>
                <text x="-70" y="34" font-family="Arial" font-size="9" fill="black">D3</text>

                <line x1="-90" y1="50" x2="-80" y2="50" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D4" cx="-95" cy="50" r="4" fill="black"/>
                <text x="-70" y="54" font-family="Arial" font-size="9" fill="black">D4</text>

                <line x1="-90" y1="70" x2="-80" y2="70" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D5" cx="-95" cy="70" r="4" fill="black"/>
                <text x="-70" y="74" font-family="Arial" font-size="9" fill="black">D5</text>

                <line x1="-90" y1="90" x2="-80" y2="90" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D6" cx="-95" cy="90" r="4" fill="black"/>
                <text x="-70" y="94" font-family="Arial" font-size="9" fill="black">D6</text>

                <line x1="-90" y1="110" x2="-80" y2="110" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D7" cx="-95" cy="110" r="4" fill="black"/>
                <text x="-70" y="114" font-family="Arial" font-size="9" fill="black">D7</text>

                <!-- 使能端 S̅ (低电平有效) -->
                <line x1="-80" y1="130" x2="-86" y2="130" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="-86" cy="130" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="-89" y1="130" x2="-95" y2="130" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="S" cx="-95" cy="130" r="4" fill="black"/>
                <text x="-70" y="134" font-family="Arial" font-size="8" fill="black">S̅</text>

                <!-- 右侧输出端口 -->
                <!-- 数据输出端 Y (引脚14) -->
                <line x1="80" y1="-40" x2="90" y2="-40" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y" cx="95" cy="-40" r="4" fill="black"/>
                <text x="50" y="-36" font-family="Arial" font-size="9" fill="black">Y</text>

                <!-- 反相数据输出端 W̅ (反相输出) -->
                <line x1="80" y1="-20" x2="86" y2="-20" stroke="black" stroke-width="2"/>
                <!-- 反相输出指示圆圈 -->
                <circle cx="86" cy="-20" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="89" y1="-20" x2="95" y2="-20" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="W" cx="95" cy="-20" r="4" fill="black"/>
                <text x="50" y="-16" font-family="Arial" font-size="8" fill="black">W̅</text>

                <!-- 内部逻辑示意 -->
                <text x="0" y="0" font-family="Arial" font-size="9" text-anchor="middle" fill="#666">8→1 MUX</text>

                <!-- 分隔线 -->
                <line x1="-70" y1="-45" x2="70" y2="-45" stroke="#ccc" stroke-width="1" stroke-dasharray="2,2"/>
            </g>
        </svg>
    `
};

// 74LS151逻辑函数 - 根据真值表实现
const ls151LogicFunction = {
    '74ls151': (inputs) => {
        // 获取输入值，默认为0
        const C = inputs.C || 0;  // 地址输入C (MSB)
        const B = inputs.B || 0;  // 地址输入B
        const A = inputs.A || 0;  // 地址输入A (LSB)
        const S = inputs.S || 0;  // 使能端 (低电平有效)
        
        // 数据输入D0-D7
        const D0 = inputs.D0 || 0;
        const D1 = inputs.D1 || 0;
        const D2 = inputs.D2 || 0;
        const D3 = inputs.D3 || 0;
        const D4 = inputs.D4 || 0;
        const D5 = inputs.D5 || 0;
        const D6 = inputs.D6 || 0;
        const D7 = inputs.D7 || 0;

        console.log('74LS151输入:', { C, B, A, S, D0, D1, D2, D3, D4, D5, D6, D7 });

        // 确保输入值是数字类型
        const c = Number(C) || 0;
        const b = Number(B) || 0;
        const a = Number(A) || 0;
        const s = Number(S) || 0;
        
        const dataInputs = [
            Number(D0) || 0, Number(D1) || 0, Number(D2) || 0, Number(D3) || 0,
            Number(D4) || 0, Number(D5) || 0, Number(D6) || 0, Number(D7) || 0
        ];

        console.log('转换后的输入:', { c, b, a, s, dataInputs });

        let outputs = { Y: 0, W: 1 };

        // 使能控制：当S̅=0时，数据选择器正常工作；当S̅=1时，输出Y为低电平，W̅为高电平
        if (s === 0) {
            // 根据地址输入CBA选择对应的数据输入
            const selectedIndex = (c << 2) | (b << 1) | a;
            console.log('选择的数据输入索引:', selectedIndex);
            
            const selectedData = dataInputs[selectedIndex];
            console.log('选择的数据值:', selectedData);
            
            outputs.Y = selectedData;      // Y输出选中的数据
            outputs.W = selectedData ? 0 : 1;  // W̅输出选中数据的反相
        } else {
            // 使能端为高电平时，输出Y为低电平，W̅为高电平
            outputs.Y = 0;
            outputs.W = 1;
        }

        console.log('74LS151输出:', outputs);
        return outputs;
    }
};

// 74LS151初始化函数
function initialize74LS151Component(componentDiv, type) {
    if (type !== '74ls151') return;

    const id = componentDiv.dataset.id;

    // 初始化组件状态
    if (typeof componentStates !== 'undefined') {
        componentStates.set(id, {
            C: 0, B: 0, A: 0, S: 0,
            D0: 0, D1: 0, D2: 0, D3: 0,
            D4: 0, D5: 0, D6: 0, D7: 0,
            Y: 0, W: 1
        });
    }

    // 设置组件标题
    componentDiv.title = '74LS151 8选1数据选择器 - 双击查看详细说明';

    // 添加双击事件监听器
    componentDiv.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        showLs151Dialog();
    });

    console.log('74LS151组件初始化完成:', id);
}

// 74LS151说明对话框HTML
const ls151DialogHTML = `
<div id="ls151-dialog" class="component-dialog draggable-dialog resizable-dialog" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; width: 800px; height: 600px; min-width: 600px; min-height: 400px;">
    <div class="dialog-content" style="width: 100%; height: 100%; background: white; border: 2px solid #333; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); display: flex; flex-direction: column;">
        <div class="dialog-header" style="background: #2196F3; color: white; padding: 15px 20px; border-radius: 6px 6px 0 0; cursor: move; user-select: none; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
            <h2 style="margin: 0; font-size: 1.5em;">74LS151 8选1数据选择器</h2>
            <button class="dialog-close" onclick="closeLs151Dialog()" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">&times;</button>
        </div>
        <div class="dialog-body" style="padding: 20px; overflow-y: auto; flex: 1;">
            <div class="dialog-section">
                <h3>功能描述</h3>
                <p>74LS151是一个8选1数据选择器(多路选择器)，具有3个地址输入端和1个使能输入端。当使能端有效时，根据3位地址输入(C、B、A)的组合，从8个数据输入中选择一个输出到Y端，同时W̅端输出Y的反相。</p>
                <ul>
                    <li><strong>地址输入</strong>：3个地址输入(C、B、A)，C为最高位</li>
                    <li><strong>数据输入</strong>：8个数据输入(D0~D7)</li>
                    <li><strong>使能端</strong>：S̅(低电平有效)</li>
                    <li><strong>输出</strong>：Y(数据输出)，W̅(反相数据输出)</li>
                </ul>
            </div>

            <div class="dialog-section">
                <h3>引脚功能表</h3>
                <table class="truth-table">
                    <tr>
                        <th>引脚号</th>
                        <th>引脚名称</th>
                        <th>功能描述</th>
                    </tr>
                    <tr><td>1-3</td><td>C, B, A</td><td>地址输入端，这三个引脚的二进制编码决定了从8个输入数据中选择哪一个输出。CBA的组合可以表示0-7共8种状态，对应8个不同的输入数据通道</td></tr>
                    <tr><td>4-11</td><td>D0-D7</td><td>数据输入端，有8个数据输入通道，分别为D0到D7，等待被选择输出</td></tr>
                    <tr><td>12</td><td>S̅</td><td>使能端，低电平有效。当为低电平时，数据选择器正常工作；当为高电平时，数据选择器被禁止，输出Y为低电平，W̅为高电平</td></tr>
                    <tr><td>13</td><td>W̅</td><td>反相数据输出端，输出与Y相反的逻辑电平</td></tr>
                    <tr><td>14</td><td>Y</td><td>数据输出端，根据地址输入和使能信号，从8个输入数据中选择一个输出</td></tr>
                    <tr><td>15</td><td>GND</td><td>接地端，为芯片提供零电位参考</td></tr>
                    <tr><td>16</td><td>VCC</td><td>电源端，一般接+5V直流电源，为芯片正常工作提供电能</td></tr>
                </table>
            </div>

            <div class="dialog-section">
                <h3>工作原理</h3>
                <div class="working-principle">
                    <h4>使能控制</h4>
                    <p>首先要使能端为低电平，数据选择器才能正常工作。若为高电平，无论地址输入和数据输入如何，输出Y恒为低电平，W̅为高电平。</p>

                    <h4>地址选择</h4>
                    <p>在使能的情况下，根据地址输入端C、B、A的二进制编码来选择对应的输入数据输出。例如，当CBA=000时，选择D0数据输出到Y端；当CBA=001时，选择D1数据输出到Y端，以此类推，直到CBA=111时选择D7数据输出。</p>
                </div>
            </div>

            <div class="dialog-section">
                <h3>功能表</h3>
                <table class="truth-table">
                    <tr>
                        <th>使能</th>
                        <th colspan="3">地址输入</th>
                        <th colspan="2">输出</th>
                    </tr>
                    <tr>
                        <th>S̅</th>
                        <th>C</th><th>B</th><th>A</th>
                        <th>Y</th><th>W̅</th>
                    </tr>
                    <tr><td>1</td><td>X</td><td>X</td><td>X</td><td>0</td><td>1</td></tr>
                    <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>D0</td><td>D̅0̅</td></tr>
                    <tr><td>0</td><td>0</td><td>0</td><td>1</td><td>D1</td><td>D̅1̅</td></tr>
                    <tr><td>0</td><td>0</td><td>1</td><td>0</td><td>D2</td><td>D̅2̅</td></tr>
                    <tr><td>0</td><td>0</td><td>1</td><td>1</td><td>D3</td><td>D̅3̅</td></tr>
                    <tr><td>0</td><td>1</td><td>0</td><td>0</td><td>D4</td><td>D̅4̅</td></tr>
                    <tr><td>0</td><td>1</td><td>0</td><td>1</td><td>D5</td><td>D̅5̅</td></tr>
                    <tr><td>0</td><td>1</td><td>1</td><td>0</td><td>D6</td><td>D̅6̅</td></tr>
                    <tr><td>0</td><td>1</td><td>1</td><td>1</td><td>D7</td><td>D̅7̅</td></tr>
                </table>
                <p><small>注：X表示任意状态(0或1)，Dn表示对应数据输入的状态，D̅n̅表示对应数据输入的反相</small></p>
            </div>
        </div>
        <!-- 调整大小控制 -->
        <div class="resize-handle" style="position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; cursor: nw-resize; background: linear-gradient(-45deg, transparent 0%, transparent 30%, #ccc 30%, #ccc 40%, transparent 40%, transparent 60%, #ccc 60%, #ccc 70%, transparent 70%);"></div>
    </div>
</div>
`;

// 74LS151对话框样式
const ls151DialogCSS = `
<style id="ls151-dialog-style">
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

.working-principle p {
    margin: 10px 0;
    line-height: 1.6;
}
</style>
`;

// 显示74LS151对话框
function showLs151Dialog() {
    // 确保对话框HTML和CSS已添加到页面
    if (!document.getElementById('ls151-dialog')) {
        // 添加CSS
        if (!document.getElementById('ls151-dialog-style')) {
            document.head.insertAdjacentHTML('beforeend', ls151DialogCSS);
        }

        // 添加HTML
        document.body.insertAdjacentHTML('beforeend', ls151DialogHTML);
    }

    const dialog = document.getElementById('ls151-dialog');
    if (dialog) {
        dialog.style.display = 'flex';

        // 添加点击背景关闭功能
        dialog.addEventListener('click', function(e) {
            if (e.target === dialog) {
                closeLs151Dialog();
            }
        });

        // 添加ESC键关闭功能
        const escHandler = function(e) {
            if (e.key === 'Escape') {
                closeLs151Dialog();
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

// 关闭74LS151对话框
function closeLs151Dialog() {
    const dialog = document.getElementById('ls151-dialog');
    if (dialog) {
        dialog.style.display = 'none';
    }
}

// 将函数添加到全局作用域
window.showLs151Dialog = showLs151Dialog;
window.closeLs151Dialog = closeLs151Dialog;
window.initialize74LS151Component = initialize74LS151Component;

// 主初始化函数
function initialize74LS151Module(componentSvgs, logicFunctions) {
    try {
        if (componentSvgs) {
            Object.assign(componentSvgs, ls151Component);
            console.log('74LS151 SVG模板已添加');
        } else {
            console.warn('componentSvgs对象未提供给74LS151模块');
        }

        if (logicFunctions) {
            Object.assign(logicFunctions, ls151LogicFunction);
            console.log('74LS151逻辑函数已添加');
        } else {
            console.warn('logicFunctions对象未提供给74LS151模块');
        }

        console.log('74LS151模块初始化成功');
    } catch (error) {
        console.error('74LS151模块初始化失败:', error);
    }
}

// 暴露到全局作用域
window.LS151Component = {
    initialize: initialize74LS151Component,
    svg: ls151Component['74ls151'],
    logic: ls151LogicFunction['74ls151'],
    initModule: initialize74LS151Module
};

// 自动初始化（如果相关对象已存在）
if (typeof window !== 'undefined') {
    // 立即尝试初始化
    if (window.componentSvgs && window.logicFunctions) {
        initialize74LS151Module(window.componentSvgs, window.logicFunctions);
    }

    // 等待DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if (window.componentSvgs && window.logicFunctions) {
                    initialize74LS151Module(window.componentSvgs, window.logicFunctions);
                }
            }, 500);
        });
    } else {
        // DOM已加载，延迟初始化以确保主系统已准备好
        setTimeout(() => {
            if (window.componentSvgs && window.logicFunctions) {
                initialize74LS151Module(window.componentSvgs, window.logicFunctions);
            }
        }, 500);

        // 再次尝试，确保集成成功
        setTimeout(() => {
            if (window.componentSvgs && !window.componentSvgs['74ls151']) {
                console.warn('74LS151 SVG模板未成功集成，尝试手动添加...');
                if (window.componentSvgs) {
                    window.componentSvgs['74ls151'] = ls151Component['74ls151'];
                    console.log('74LS151 SVG模板手动添加成功');
                }
            }
            if (window.logicFunctions && !window.logicFunctions['74ls151']) {
                console.warn('74LS151逻辑函数未成功集成，尝试手动添加...');
                if (window.logicFunctions) {
                    window.logicFunctions['74ls151'] = ls151LogicFunction['74ls151'];
                    console.log('74LS151逻辑函数手动添加成功');
                }
            }
        }, 1000);
    }
}
