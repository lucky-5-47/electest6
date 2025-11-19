/**
 * 多数表决器组件模块
 * 多数表决器是一个组合逻辑电路，当输入信号中的多数（超过一半）为高电平时，输出为高电平
 * 支持3、5、7输入配置
 */

// 多数表决器 SVG模板
const majorityVoterSvgs = {
    'majority-voter-3': `
        <svg class="component-svg" viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
            <g id="majority-voter-3-group" transform="translate(100, 70)">
                <!-- 芯片主体 -->
                <rect id="majority-voter-bg" x="-80" y="-60" width="160" height="120" rx="8" fill="#FFF8E1" stroke="black" stroke-width="2"/>

                <!-- 芯片标识 -->
                <text x="0" y="-35" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="black">MAJORITY</text>
                <text x="0" y="-20" font-family="Arial" font-size="12" text-anchor="middle" fill="black">3输入表决器</text>

                <!-- 逻辑表达式显示 -->
                <text x="0" y="0" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">Y = AB + AC + BC</text>

                <!-- 左侧输入端口 -->
                <!-- 输入A -->
                <line x1="-80" y1="-30" x2="-90" y2="-30" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A" cx="-95" cy="-30" r="5" fill="black"/>
                <text x="-65" y="-26" font-family="Arial" font-size="12" fill="black">A</text>

                <!-- 输入B -->
                <line x1="-80" y1="0" x2="-90" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="B" cx="-95" cy="0" r="5" fill="black"/>
                <text x="-65" y="4" font-family="Arial" font-size="12" fill="black">B</text>

                <!-- 输入C -->
                <line x1="-80" y1="30" x2="-90" y2="30" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="C" cx="-95" cy="30" r="5" fill="black"/>
                <text x="-65" y="34" font-family="Arial" font-size="12" fill="black">C</text>

                <!-- 右侧输出端口 -->
                <!-- 输出Y -->
                <line x1="80" y1="0" x2="90" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y" cx="95" cy="0" r="5" fill="black"/>
                <text x="60" y="4" font-family="Arial" font-size="12" fill="black">Y</text>

                <!-- 内部逻辑符号 -->
                <text x="0" y="20" font-family="Arial" font-size="8" text-anchor="middle" fill="#666">≥2/3</text>

                <!-- 真值表指示 -->
                <text x="0" y="45" font-family="Arial" font-size="7" text-anchor="middle" fill="#999">双击查看真值表</text>
            </g>
        </svg>
    `,
    'majority-voter-5': `
        <svg class="component-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g id="majority-voter-5-group" transform="translate(100, 100)">
                <!-- 芯片主体 -->
                <rect id="majority-voter-bg" x="-80" y="-90" width="160" height="180" rx="8" fill="#FFF8E1" stroke="black" stroke-width="2"/>

                <!-- 芯片标识 -->
                <text x="0" y="-65" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="black">MAJORITY</text>
                <text x="0" y="-50" font-family="Arial" font-size="12" text-anchor="middle" fill="black">5输入表决器</text>

                <!-- 左侧输入端口 -->
                <!-- 输入A -->
                <line x1="-80" y1="-45" x2="-90" y2="-45" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A" cx="-95" cy="-45" r="4" fill="black"/>
                <text x="-65" y="-41" font-family="Arial" font-size="10" fill="black">A</text>

                <!-- 输入B -->
                <line x1="-80" y1="-20" x2="-90" y2="-20" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="B" cx="-95" cy="-20" r="4" fill="black"/>
                <text x="-65" y="-16" font-family="Arial" font-size="10" fill="black">B</text>

                <!-- 输入C -->
                <line x1="-80" y1="5" x2="-90" y2="5" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="C" cx="-95" cy="5" r="4" fill="black"/>
                <text x="-65" y="9" font-family="Arial" font-size="10" fill="black">C</text>

                <!-- 输入D -->
                <line x1="-80" y1="30" x2="-90" y2="30" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D" cx="-95" cy="30" r="4" fill="black"/>
                <text x="-65" y="34" font-family="Arial" font-size="10" fill="black">D</text>

                <!-- 输入E -->
                <line x1="-80" y1="55" x2="-90" y2="55" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="E" cx="-95" cy="55" r="4" fill="black"/>
                <text x="-65" y="59" font-family="Arial" font-size="10" fill="black">E</text>

                <!-- 右侧输出端口 -->
                <!-- 输出Y -->
                <line x1="80" y1="5" x2="90" y2="5" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y" cx="95" cy="5" r="5" fill="black"/>
                <text x="60" y="9" font-family="Arial" font-size="12" fill="black">Y</text>

                <!-- 内部逻辑符号 -->
                <text x="0" y="-10" font-family="Arial" font-size="8" text-anchor="middle" fill="#666">≥3/5</text>

                <!-- 真值表指示 -->
                <text x="0" y="75" font-family="Arial" font-size="7" text-anchor="middle" fill="#999">双击查看真值表</text>
            </g>
        </svg>
    `,
    'majority-voter-7': `
        <svg class="component-svg" viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
            <g id="majority-voter-7-group" transform="translate(100, 130)">
                <!-- 芯片主体 -->
                <rect id="majority-voter-bg" x="-80" y="-120" width="160" height="240" rx="8" fill="#FFF8E1" stroke="black" stroke-width="2"/>

                <!-- 芯片标识 -->
                <text x="0" y="-95" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="black">MAJORITY</text>
                <text x="0" y="-80" font-family="Arial" font-size="12" text-anchor="middle" fill="black">7输入表决器</text>

                <!-- 左侧输入端口 -->
                <!-- 输入A -->
                <line x1="-80" y1="-75" x2="-90" y2="-75" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A" cx="-95" cy="-75" r="4" fill="black"/>
                <text x="-65" y="-71" font-family="Arial" font-size="10" fill="black">A</text>

                <!-- 输入B -->
                <line x1="-80" y1="-50" x2="-90" y2="-50" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="B" cx="-95" cy="-50" r="4" fill="black"/>
                <text x="-65" y="-46" font-family="Arial" font-size="10" fill="black">B</text>

                <!-- 输入C -->
                <line x1="-80" y1="-25" x2="-90" y2="-25" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="C" cx="-95" cy="-25" r="4" fill="black"/>
                <text x="-65" y="-21" font-family="Arial" font-size="10" fill="black">C</text>

                <!-- 输入D -->
                <line x1="-80" y1="0" x2="-90" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D" cx="-95" cy="0" r="4" fill="black"/>
                <text x="-65" y="4" font-family="Arial" font-size="10" fill="black">D</text>

                <!-- 输入E -->
                <line x1="-80" y1="25" x2="-90" y2="25" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="E" cx="-95" cy="25" r="4" fill="black"/>
                <text x="-65" y="29" font-family="Arial" font-size="10" fill="black">E</text>

                <!-- 输入F -->
                <line x1="-80" y1="50" x2="-90" y2="50" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="F" cx="-95" cy="50" r="4" fill="black"/>
                <text x="-65" y="54" font-family="Arial" font-size="10" fill="black">F</text>

                <!-- 输入G -->
                <line x1="-80" y1="75" x2="-90" y2="75" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="G" cx="-95" cy="75" r="4" fill="black"/>
                <text x="-65" y="79" font-family="Arial" font-size="10" fill="black">G</text>

                <!-- 右侧输出端口 -->
                <!-- 输出Y -->
                <line x1="80" y1="0" x2="90" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y" cx="95" cy="0" r="5" fill="black"/>
                <text x="60" y="4" font-family="Arial" font-size="12" fill="black">Y</text>

                <!-- 内部逻辑符号 -->
                <text x="0" y="-40" font-family="Arial" font-size="8" text-anchor="middle" fill="#666">≥4/7</text>

                <!-- 真值表指示 -->
                <text x="0" y="105" font-family="Arial" font-size="7" text-anchor="middle" fill="#999">双击查看真值表</text>
            </g>
        </svg>
    `
};

// 多数表决器逻辑函数
const majorityVoterLogic = {
    'majority-voter-3': (inputs) => {
        const A = Number(inputs.A || 0);
        const B = Number(inputs.B || 0);
        const C = Number(inputs.C || 0);

        console.log('3输入多数表决器:', { A, B, C });

        // 3输入多数表决器逻辑：Y = AB + AC + BC
        const Y = (A & B) | (A & C) | (B & C);

        console.log('3输入多数表决器输出:', Y);
        return { Y: Y };
    },

    'majority-voter-5': (inputs) => {
        const A = Number(inputs.A || 0);
        const B = Number(inputs.B || 0);
        const C = Number(inputs.C || 0);
        const D = Number(inputs.D || 0);
        const E = Number(inputs.E || 0);

        console.log('5输入多数表决器:', { A, B, C, D, E });

        // 5输入多数表决器逻辑：当至少3个输入为1时输出1
        const count = A + B + C + D + E;
        const Y = count >= 3 ? 1 : 0;

        console.log('5输入多数表决器输出:', Y, '(1的个数:', count, ')');
        return { Y: Y };
    },

    'majority-voter-7': (inputs) => {
        const A = Number(inputs.A || 0);
        const B = Number(inputs.B || 0);
        const C = Number(inputs.C || 0);
        const D = Number(inputs.D || 0);
        const E = Number(inputs.E || 0);
        const F = Number(inputs.F || 0);
        const G = Number(inputs.G || 0);

        console.log('7输入多数表决器:', { A, B, C, D, E, F, G });

        // 7输入多数表决器逻辑：当至少4个输入为1时输出1
        const count = A + B + C + D + E + F + G;
        const Y = count >= 4 ? 1 : 0;

        console.log('7输入多数表决器输出:', Y, '(1的个数:', count, ')');
        return { Y: Y };
    }
};

// 多数表决器初始化函数
function initializeMajorityVoter(componentDiv, type) {
    if (!type.startsWith('majority-voter')) return;

    const id = componentDiv.dataset.id;
    let inputCount = 3; // 默认3输入

    if (type === 'majority-voter-5') {
        inputCount = 5;
    } else if (type === 'majority-voter-7') {
        inputCount = 7;
    }

    // 初始化组件状态
    if (typeof componentStates !== 'undefined') {
        const initialState = { Y: 0 };
        
        // 根据输入数量初始化输入状态
        const inputLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        for (let i = 0; i < inputCount; i++) {
            initialState[inputLabels[i]] = 0;
        }

        componentStates.set(id, initialState);
    }

    // 设置组件标题
    const titles = {
        'majority-voter-3': '3输入多数表决器 - 至少2个输入为1时输出1',
        'majority-voter-5': '5输入多数表决器 - 至少3个输入为1时输出1',
        'majority-voter-7': '7输入多数表决器 - 至少4个输入为1时输出1'
    };
    componentDiv.title = titles[type] + ' - 双击查看详细说明';

    // 添加双击事件监听器
    componentDiv.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        showMajorityVoterDialog(type);
    });

    // 初始化显示
    updateMajorityVoterDisplay(componentDiv, type);

    console.log(`${inputCount}输入多数表决器组件初始化完成:`, id);
}

// 更新多数表决器显示
function updateMajorityVoterDisplay(component, type) {
    const id = component.dataset.id;
    
    if (typeof componentStates === 'undefined') return;
    
    const state = componentStates.get(id);
    if (!state) return;

    // 更新背景颜色根据输出状态
    const bg = component.querySelector('#majority-voter-bg');
    if (bg) {
        bg.setAttribute('fill', state.Y === 1 ? '#C8E6C9' : '#FFF8E1');
    }
}

// 多数表决器说明对话框HTML生成函数
function generateMajorityVoterDialogHTML(type) {
    let inputCount = 3;
    let threshold = 2;
    let title = "3输入多数表决器";
    let expression = "Y = AB + AC + BC";
    
    if (type === 'majority-voter-5') {
        inputCount = 5;
        threshold = 3;
        title = "5输入多数表决器";
        expression = "Y = 1 当至少3个输入为1";
    } else if (type === 'majority-voter-7') {
        inputCount = 7;
        threshold = 4;
        title = "7输入多数表决器";
        expression = "Y = 1 当至少4个输入为1";
    }

    // 生成真值表
    const inputs = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].slice(0, inputCount);
    let truthTable = `
        <table class="truth-table">
            <tr>
                ${inputs.map(input => `<th>${input}</th>`).join('')}
                <th>Y</th>
                <th>说明</th>
            </tr>
    `;

    // 生成所有可能的输入组合
    const totalCombinations = Math.pow(2, inputCount);
    for (let i = 0; i < totalCombinations; i++) {
        const combination = [];
        let onesCount = 0;
        
        for (let j = 0; j < inputCount; j++) {
            const bit = (i >> j) & 1;
            combination.unshift(bit); // 反转顺序以符合常规显示
            onesCount += bit;
        }
        
        const output = onesCount >= threshold ? 1 : 0;
        const explanation = `${onesCount}个1${onesCount >= threshold ? '≥' : '<'}${threshold}`;
        
        truthTable += `
            <tr ${output === 1 ? 'class="highlight-row"' : ''}>
                ${combination.map(bit => `<td>${bit}</td>`).join('')}
                <td><strong>${output}</strong></td>
                <td>${explanation}</td>
            </tr>
        `;
    }

    truthTable += '</table>';

    return `
<div id="majority-voter-dialog" class="component-dialog draggable-dialog resizable-dialog" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; width: 800px; height: 600px; min-width: 600px; min-height: 400px;">
    <div class="dialog-content" style="width: 100%; height: 100%; background: white; border: 2px solid #333; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); display: flex; flex-direction: column;">
        <div class="dialog-header" style="background: #2196F3; color: white; padding: 15px 20px; border-radius: 6px 6px 0 0; cursor: move; user-select: none; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
            <h2 style="margin: 0; font-size: 1.5em;">${title}</h2>
            <button class="dialog-close" onclick="closeMajorityVoterDialog()" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">&times;</button>
        </div>
        <div class="dialog-body" style="padding: 20px; overflow-y: auto; flex: 1;">
            <div class="dialog-section">
                <h3>功能描述</h3>
                <p>多数表决器是一个组合逻辑电路，用于实现多数决策功能。当输入信号中的多数（超过一半）为高电平时，输出为高电平。</p>
                
                <h4>逻辑表达式：</h4>
                <p class="logic-expression">${expression}</p>
                
                <h4>工作原理：</h4>
                <p>对于${inputCount}输入多数表决器，当至少${threshold}个输入为1时，输出为1；否则输出为0。</p>
            </div>

            <div class="dialog-section">
                <h3>应用场景</h3>
                <ul>
                    <li><strong>容错系统</strong>：在三模冗余系统中，通过多数表决消除单点故障</li>
                    <li><strong>表决电路</strong>：在多处理器系统中进行决策</li>
                    <li><strong>纠错电路</strong>：在数字通信系统中进行错误检测和纠正</li>
                    <li><strong>安全系统</strong>：在关键安全系统中提高可靠性</li>
                </ul>
            </div>

            <div class="dialog-section">
                <h3>真值表</h3>
                ${truthTable}
                <p><small>高亮行表示输出为1的情况</small></p>
            </div>

            <div class="dialog-section">
                <h3>电路特点</h3>
                <div class="characteristics">
                    <p><strong>输入数量</strong>：${inputCount}个</p>
                    <p><strong>阈值</strong>：≥${threshold}个输入为1</p>
                    <p><strong>电路类型</strong>：组合逻辑电路</p>
                    <p><strong>传播延迟</strong>：较小，适合高速应用</p>
                    <p><strong>容错能力</strong>：可以容忍${inputCount - threshold}个输入错误</p>
                </div>
            </div>

            <div class="dialog-section">
                <h3>设计考虑</h3>
                <ul>
                    <li>输入数量通常选择奇数，避免平票情况</li>
                    <li>随着输入数量增加，电路复杂度指数增长</li>
                    <li>在FPGA/ASIC中可以优化实现</li>
                    <li>需要考虑输入信号的时序匹配</li>
                </ul>
            </div>
        </div>
        <!-- 调整大小控制 -->
        <div class="resize-handle" style="position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; cursor: nw-resize; background: linear-gradient(-45deg, transparent 0%, transparent 30%, #ccc 30%, #ccc 40%, transparent 40%, transparent 60%, #ccc 60%, #ccc 70%, transparent 70%);"></div>
    </div>
</div>
`;
}

// 对话框样式
const majorityVoterDialogCSS = `
<style id="majority-voter-dialog-style">
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
    max-width: 1000px;
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
    color: #F57C00;
    border-bottom: 2px solid #FFF3E0;
    padding-bottom: 5px;
    margin-bottom: 15px;
}

.dialog-section h4 {
    color: #424242;
    margin-top: 15px;
    margin-bottom: 8px;
}

.logic-expression {
    background: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
    font-family: 'Courier New', monospace;
    font-size: 1.1em;
    text-align: center;
    border: 1px solid #ddd;
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

.truth-table .highlight-row {
    background: #E8F5E8 !important;
    font-weight: bold;
}

.characteristics p {
    margin: 8px 0;
    line-height: 1.5;
}

.characteristics p strong {
    color: #D84315;
    min-width: 100px;
    display: inline-block;
}
</style>
`;

// 显示多数表决器对话框
function showMajorityVoterDialog(type) {
    // 移除现有对话框
    const existingDialog = document.getElementById('majority-voter-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }

    // 添加CSS（如果不存在）
    if (!document.getElementById('majority-voter-dialog-style')) {
        document.head.insertAdjacentHTML('beforeend', majorityVoterDialogCSS);
    }

    // 添加HTML
    document.body.insertAdjacentHTML('beforeend', generateMajorityVoterDialogHTML(type));

    const dialog = document.getElementById('majority-voter-dialog');
    if (dialog) {
        dialog.style.display = 'flex';

        // 添加点击背景关闭功能
        dialog.addEventListener('click', function(e) {
            if (e.target === dialog) {
                closeMajorityVoterDialog();
            }
        });

        // 添加ESC键关闭功能
        const escHandler = function(e) {
            if (e.key === 'Escape') {
                closeMajorityVoterDialog();
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

// 关闭多数表决器对话框
function closeMajorityVoterDialog() {
    const dialog = document.getElementById('majority-voter-dialog');
    if (dialog) {
        dialog.remove();
    }
}

// 主初始化函数
function initializeMajorityVoterModule(componentSvgs, logicFunctions) {
    try {
        if (componentSvgs) {
            Object.assign(componentSvgs, majorityVoterSvgs);
            console.log('多数表决器 SVG模板已添加');
        } else {
            console.warn('componentSvgs对象未提供给多数表决器模块');
        }

        if (logicFunctions) {
            Object.assign(logicFunctions, majorityVoterLogic);
            console.log('多数表决器逻辑函数已添加');
        } else {
            console.warn('logicFunctions对象未提供给多数表决器模块');
        }

        console.log('多数表决器模块初始化成功');
    } catch (error) {
        console.error('多数表决器模块初始化失败:', error);
    }
}

// 将函数添加到全局作用域
window.showMajorityVoterDialog = showMajorityVoterDialog;
window.closeMajorityVoterDialog = closeMajorityVoterDialog;
window.initializeMajorityVoter = initializeMajorityVoter;
window.updateMajorityVoterDisplay = updateMajorityVoterDisplay;

// 暴露到全局作用域
window.MajorityVoterComponent = {
    initialize: initializeMajorityVoter,
    svgs: majorityVoterSvgs,
    logic: majorityVoterLogic,
    initModule: initializeMajorityVoterModule,
    updateDisplay: updateMajorityVoterDisplay
};

// 自动初始化（如果相关对象已存在）
if (typeof window !== 'undefined') {
    // 立即尝试初始化
    if (window.componentSvgs && window.logicFunctions) {
        initializeMajorityVoterModule(window.componentSvgs, window.logicFunctions);
    }

    // 等待DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if (window.componentSvgs && window.logicFunctions) {
                    initializeMajorityVoterModule(window.componentSvgs, window.logicFunctions);
                }
            }, 500);
        });
    } else {
        // DOM已加载，延迟初始化以确保主系统已准备好
        setTimeout(() => {
            if (window.componentSvgs && window.logicFunctions) {
                initializeMajorityVoterModule(window.componentSvgs, window.logicFunctions);
            }
        }, 500);

        // 再次尝试，确保集成成功
        setTimeout(() => {
            Object.keys(majorityVoterSvgs).forEach(key => {
                if (window.componentSvgs && !window.componentSvgs[key]) {
                    console.warn(`${key} SVG模板未成功集成，尝试手动添加...`);
                    window.componentSvgs[key] = majorityVoterSvgs[key];
                    console.log(`${key} SVG模板手动添加成功`);
                }
            });
            
            Object.keys(majorityVoterLogic).forEach(key => {
                if (window.logicFunctions && !window.logicFunctions[key]) {
                    console.warn(`${key} 逻辑函数未成功集成，尝试手动添加...`);
                    window.logicFunctions[key] = majorityVoterLogic[key];
                    console.log(`${key} 逻辑函数手动添加成功`);
                }
            });
        }, 1000);
    }
}
