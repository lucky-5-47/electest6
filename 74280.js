/**
 * 74LS280 9位奇偶产生/校验器组件模块
 * 实现74LS280芯片的完整功能，包括奇偶校验产生和检验
 * 输入：A~I（9个输入）
 * 输出：FEV（偶校验输出）、FOD（奇校验输出）
 */

// 74LS280 SVG模板
const ls280Component = {
    '74280': `
        <svg class="component-svg" viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
            <g id="ls280-group" transform="translate(100, 160)">
                <!-- 芯片主体 -->
                <rect id="ls280-bg" x="-80" y="-140" width="160" height="280" rx="8" fill="#E8F5E8" stroke="black" stroke-width="2"/>

                <!-- 芯片标识 -->
                <text x="0" y="-115" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="black">74LS280</text>
                <text x="0" y="-100" font-family="Arial" font-size="10" text-anchor="middle" fill="black">PARITY GEN/CHK</text>

                <!-- 左侧输入端口 A~I -->
                <!-- 输入A -->
                <line x1="-90" y1="-80" x2="-80" y2="-80" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A" cx="-95" cy="-80" r="4" fill="black"/>
                <text x="-70" y="-76" font-family="Arial" font-size="9" fill="black">A</text>

                <!-- 输入B -->
                <line x1="-90" y1="-60" x2="-80" y2="-60" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="B" cx="-95" cy="-60" r="4" fill="black"/>
                <text x="-70" y="-56" font-family="Arial" font-size="9" fill="black">B</text>

                <!-- 输入C -->
                <line x1="-90" y1="-40" x2="-80" y2="-40" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="C" cx="-95" cy="-40" r="4" fill="black"/>
                <text x="-70" y="-36" font-family="Arial" font-size="9" fill="black">C</text>

                <!-- 输入D -->
                <line x1="-90" y1="-20" x2="-80" y2="-20" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D" cx="-95" cy="-20" r="4" fill="black"/>
                <text x="-70" y="-16" font-family="Arial" font-size="9" fill="black">D</text>

                <!-- 输入E -->
                <line x1="-90" y1="0" x2="-80" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="E" cx="-95" cy="0" r="4" fill="black"/>
                <text x="-70" y="4" font-family="Arial" font-size="9" fill="black">E</text>

                <!-- 输入F -->
                <line x1="-90" y1="20" x2="-80" y2="20" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="F" cx="-95" cy="20" r="4" fill="black"/>
                <text x="-70" y="24" font-family="Arial" font-size="9" fill="black">F</text>

                <!-- 输入G -->
                <line x1="-90" y1="40" x2="-80" y2="40" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="G" cx="-95" cy="40" r="4" fill="black"/>
                <text x="-70" y="44" font-family="Arial" font-size="9" fill="black">G</text>

                <!-- 输入H -->
                <line x1="-90" y1="60" x2="-80" y2="60" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="H" cx="-95" cy="60" r="4" fill="black"/>
                <text x="-70" y="64" font-family="Arial" font-size="9" fill="black">H</text>

                <!-- 输入I -->
                <line x1="-90" y1="80" x2="-80" y2="80" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="I" cx="-95" cy="80" r="4" fill="black"/>
                <text x="-70" y="84" font-family="Arial" font-size="9" fill="black">I</text>

                <!-- 右侧输出端口 -->
                <!-- 偶校验输出 FEV -->
                <line x1="80" y1="-40" x2="90" y2="-40" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="FEV" cx="95" cy="-40" r="4" fill="red"/>
                <text x="70" y="-36" font-family="Arial" font-size="8" text-anchor="end" fill="black">FEV</text>

                <!-- 奇校验输出 FOD -->
                <line x1="80" y1="40" x2="90" y2="40" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="FOD" cx="95" cy="40" r="4" fill="red"/>
                <text x="70" y="44" font-family="Arial" font-size="8" text-anchor="end" fill="black">FOD</text>

                <!-- 内部逻辑示意 -->
                <text x="0" y="-10" font-family="Arial" font-size="12" text-anchor="middle" fill="blue">XOR</text>
                <text x="0" y="5" font-family="Arial" font-size="12" text-anchor="middle" fill="blue">TREE</text>
            </g>
        </svg>
    `
};

// 74280逻辑函数
const ls280LogicFunction = {
    '74280': function(inputs) {
        // 获取输入值
        const A = inputs.A || 0;
        const B = inputs.B || 0;
        const C = inputs.C || 0;
        const D = inputs.D || 0;
        const E = inputs.E || 0;
        const F = inputs.F || 0;
        const G = inputs.G || 0;
        const H = inputs.H || 0;
        const I = inputs.I || 0;

        // 计算输入中1的个数
        const onesCount = A + B + C + D + E + F + G + H + I;

        // 奇偶校验逻辑
        const isEven = (onesCount % 2) === 0;

        return {
            FEV: isEven ? 1 : 0,  // 偶校验输出：偶数个1时为1
            FOD: isEven ? 0 : 1   // 奇校验输出：奇数个1时为1
        };
    }
};

// 74280对话框样式
const ls280DialogCSS = `
<style id="ls280-dialog-style">
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
</style>
`;

// 74280说明对话框HTML
const ls280DialogHTML = `
<div id="ls280-dialog" class="component-dialog draggable-dialog resizable-dialog" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; width: 800px; height: 600px; min-width: 600px; min-height: 400px;">
    <div class="dialog-content" style="width: 100%; height: 100%; background: white; border: 2px solid #333; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); display: flex; flex-direction: column;">
        <div class="dialog-header" style="background: #2196F3; color: white; padding: 15px 20px; border-radius: 6px 6px 0 0; cursor: move; user-select: none; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
            <h2>74LS280 9位奇偶产生/校验器</h2>
            <button class="dialog-close" onclick="closeLs280Dialog()">&times;</button>
        </div>
        <div class="dialog-body" style="padding: 20px; overflow-y: auto; flex: 1;">
            <div class="dialog-section">
                <h3>功能描述</h3>
                <p>74LS280是一个9位奇偶产生/校验器，用于检测数据传输中的单比特错误。它接收9个输入信号（A~I），并产生两个互补的输出信号：偶校验输出（FEV）和奇校验输出（FOD）。</p>
                <ul>
                    <li><strong>A~I</strong>：9个数据输入端</li>
                    <li><strong>FEV</strong>：偶校验输出，当输入中有偶数个1时输出1</li>
                    <li><strong>FOD</strong>：奇校验输出，当输入中有奇数个1时输出1</li>
                </ul>
            </div>

            <div class="dialog-section">
                <h3>真值表</h3>
                <table class="truth-table">
                    <tr>
                        <th>A~I中1的数目</th>
                        <th>FEV</th>
                        <th>FOD</th>
                        <th>说明</th>
                    </tr>
                    <tr><td>偶数个</td><td>1</td><td>0</td><td>偶校验有效</td></tr>
                    <tr><td>奇数个</td><td>0</td><td>1</td><td>奇校验有效</td></tr>
                </table>
                <p><small>注：FEV和FOD始终互补，即FEV = !FOD</small></p>
            </div>

            <div class="dialog-section">
                <h3>工作原理</h3>
                <div class="principle">
                    <p><strong>奇偶校验原理</strong>：通过对所有输入位进行异或运算来实现</p>
                    <p><strong>偶校验</strong>：当数据位中1的个数为偶数时，校验位为0；为奇数时，校验位为1</p>
                    <p><strong>奇校验</strong>：当数据位中1的个数为奇数时，校验位为0；为偶数时，校验位为1</p>
                    <p><strong>逻辑表达式</strong>：</p>
                    <ul>
                        <li>FEV = !(A ⊕ B ⊕ C ⊕ D ⊕ E ⊕ F ⊕ G ⊕ H ⊕ I)</li>
                        <li>FOD = A ⊕ B ⊕ C ⊕ D ⊕ E ⊕ F ⊕ G ⊕ H ⊕ I</li>
                    </ul>
                </div>
            </div>

            <div class="dialog-section">
                <h3>应用示例</h3>
                <div class="applications">
                    <p><strong>数据传输校验</strong>：在串行或并行数据传输中检测单比特错误</p>
                    <p><strong>存储器校验</strong>：为存储器数据添加奇偶校验位</p>
                    <p><strong>通信协议</strong>：在各种通信协议中实现错误检测</p>
                    <p><strong>级联使用</strong>：多个74280可以级联处理更多位的数据</p>
                </div>
            </div>

            <div class="dialog-section">
                <h3>使用说明</h3>
                <div class="usage">
                    <p><strong>基本连接</strong>：将待校验的9位数据连接到A~I输入端</p>
                    <p><strong>偶校验模式</strong>：使用FEV输出，当总的1的个数为偶数时FEV=1</p>
                    <p><strong>奇校验模式</strong>：使用FOD输出，当总的1的个数为奇数时FOD=1</p>
                    <p><strong>错误检测</strong>：比较接收端和发送端的校验位来检测传输错误</p>
                </div>
            </div>
        </div>
    </div>
</div>
`;

// 74LS280组件初始化函数
function initialize74280Component(componentDiv, type) {
    console.log('74LS280组件初始化');

    if (!componentDiv) {
        console.error('74LS280初始化失败：componentDiv为空');
        return;
    }

    const id = componentDiv.dataset.id;
    console.log('初始化74LS280组件，ID:', id);

    // 设置组件标题
    componentDiv.title = '74LS280 9位奇偶产生/校验器 - 双击查看详细说明';

    // 添加双击事件监听器
    componentDiv.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        showLs280Dialog();
    });

    console.log('74LS280组件初始化完成:', id);
}

// 显示74LS280说明对话框
function showLs280Dialog() {
    // 确保对话框HTML和CSS已添加到页面
    if (!document.getElementById('ls280-dialog')) {
        // 添加CSS
        if (!document.getElementById('ls280-dialog-style')) {
            document.head.insertAdjacentHTML('beforeend', ls280DialogCSS);
        }

        // 添加HTML
        document.body.insertAdjacentHTML('beforeend', ls280DialogHTML);
    }

    const dialog = document.getElementById('ls280-dialog');
    dialog.style.display = 'flex';

    // 初始化位置：将transform转换为left/top
    const initialRect = dialog.getBoundingClientRect();
    dialog.style.left = initialRect.left + 'px';
    dialog.style.top = initialRect.top + 'px';
    dialog.style.transform = 'none';

    // 添加拖拽功能
    const dialogHeader = dialog.querySelector('.dialog-header');
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let elementX = 0;
    let elementY = 0;

    const mouseDownHandler = (e) => {
        // 如果点击的是关闭按钮，不启动拖拽
        if (e.target.classList.contains('dialog-close') || e.target.tagName === 'BUTTON') {
            return;
        }

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        // 获取当前元素的位置
        const rect = dialog.getBoundingClientRect();
        elementX = rect.left;
        elementY = rect.top;

        dialogHeader.style.cursor = 'grabbing';
        e.preventDefault();
    };

    const dragMove = (e) => {
        if (!isDragging) return;

        e.preventDefault();

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const newX = elementX + deltaX;
        const newY = elementY + deltaY;

        // 限制在视窗内
        const maxX = window.innerWidth - dialog.offsetWidth;
        const maxY = window.innerHeight - dialog.offsetHeight;

        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));

        dialog.style.left = constrainedX + 'px';
        dialog.style.top = constrainedY + 'px';
        dialog.style.transform = 'none';
    };

    const dragEnd = () => {
        isDragging = false;
        dialogHeader.style.cursor = 'move';
    };

    const handleMouseMove = (e) => dragMove(e);
    const handleMouseUp = () => dragEnd();

    dialogHeader.addEventListener('mousedown', mouseDownHandler);
    dialogHeader.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });

    // 添加ESC键关闭功能
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            closeLs280Dialog();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);

    // 添加点击外部关闭功能
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            closeLs280Dialog();
        }
    });
}

// 关闭74LS280说明对话框
function closeLs280Dialog() {
    const dialog = document.getElementById('ls280-dialog');
    if (dialog) {
        dialog.style.display = 'none';
    }
}

// 将函数添加到全局作用域
window.showLs280Dialog = showLs280Dialog;
window.closeLs280Dialog = closeLs280Dialog;
window.initialize74280Component = initialize74280Component;

// 主初始化函数
function initialize74280Module(componentSvgs, logicFunctions) {
    try {
        if (componentSvgs) {
            Object.assign(componentSvgs, ls280Component);
            console.log('74280 SVG模板已添加');
        } else {
            console.warn('componentSvgs对象未提供给74280模块');
        }

        if (logicFunctions) {
            Object.assign(logicFunctions, ls280LogicFunction);
            console.log('74280逻辑函数已添加');
        } else {
            console.warn('logicFunctions对象未提供给74280模块');
        }

        console.log('74280模块初始化成功');
    } catch (error) {
        console.error('74280模块初始化失败:', error);
    }
}

// 暴露到全局作用域
window.LS280Component = {
    initialize: initialize74280Component,
    svg: ls280Component['74280'],
    logic: ls280LogicFunction['74280'],
    initModule: initialize74280Module
};

// 自动初始化（如果相关对象已存在）
if (typeof window !== 'undefined') {
    // 立即尝试初始化
    if (window.componentSvgs && window.logicFunctions) {
        initialize74280Module(window.componentSvgs, window.logicFunctions);
    }

    // 延迟初始化，等待主系统加载完成
    setTimeout(() => {
        if (window.componentSvgs && window.logicFunctions) {
            if (!window.componentSvgs['74280']) {
                initialize74280Module(window.componentSvgs, window.logicFunctions);
            }
        } else {
            console.log('等待主系统加载74280组件...');
        }
    }, 500);

    // 再次尝试，确保集成成功
    setTimeout(() => {
        if (window.componentSvgs && !window.componentSvgs['74280']) {
            console.warn('74280 SVG模板未成功集成，尝试手动添加...');
            if (window.componentSvgs) {
                window.componentSvgs['74280'] = ls280Component['74280'];
                console.log('74280 SVG模板手动添加成功');
            }
        }
        if (window.logicFunctions && !window.logicFunctions['74280']) {
            console.warn('74280逻辑函数未成功集成，尝试手动添加...');
            if (window.logicFunctions) {
                window.logicFunctions['74280'] = ls280LogicFunction['74280'];
                console.log('74280逻辑函数手动添加成功');
            }
        }
    }, 1000);
}
