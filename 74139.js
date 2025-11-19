/**
 * 74139 1路-4路数据分配器组件模块
 * 实现74139芯片的完整功能，包括数据分配和使能控制
 * 输入：D/EN'（数据输入/使能输入，低电平有效）、A1、A0（地址选择输入）
 * 输出：Y3'、Y2'、Y1'、Y0'（4路输出，低电平有效）
 */

// 74139 SVG模板
const ls139Component = {
    '74139': `
        <svg class="component-svg" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
            <g id="ls139-group" transform="translate(100, 120)">
                <!-- 芯片主体 -->
                <rect id="ls139-bg" x="-80" y="-100" width="160" height="200" rx="8" fill="#E8F5E8" stroke="black" stroke-width="2"/>

                <!-- 芯片标识 -->
                <text x="0" y="-75" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="black">74139</text>
                <text x="0" y="-60" font-family="Arial" font-size="10" text-anchor="middle" fill="black">1路-4路数据分配器</text>

                <!-- 左侧输入端口 -->
                <!-- 数据输入/使能输入 D/EN' (低电平有效) -->
                <line x1="-80" y1="-30" x2="-86" y2="-30" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="-86" cy="-30" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="-89" y1="-30" x2="-95" y2="-30" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D" cx="-95" cy="-30" r="4" fill="black"/>
                <text x="-70" y="-26" font-family="Arial" font-size="8" fill="black">D/EN'</text>

                <!-- 底部地址选择输入 -->
                <!-- 地址选择 A0 -->
                <line x1="-20" y1="90" x2="-20" y2="100" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A0" cx="-20" cy="105" r="4" fill="black"/>
                <text x="-25" y="85" font-family="Arial" font-size="9" fill="black">A0</text>

                <!-- 地址选择 A1 -->
                <line x1="20" y1="90" x2="20" y2="100" stroke="black" stroke-width="2"/>
                <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A1" cx="20" cy="105" r="4" fill="black"/>
                <text x="15" y="85" font-family="Arial" font-size="9" fill="black">A1</text>

                <!-- 右侧输出端口 -->
                <!-- 输出 Y0' (低电平有效) -->
                <line x1="80" y1="-40" x2="86" y2="-40" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="86" cy="-40" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="89" y1="-40" x2="95" y2="-40" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y0" cx="95" cy="-40" r="4" fill="red"/>
                <text x="65" y="-36" font-family="Arial" font-size="9" fill="black">Y0'</text>

                <!-- 输出 Y1' (低电平有效) -->
                <line x1="80" y1="-20" x2="86" y2="-20" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="86" cy="-20" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="89" y1="-20" x2="95" y2="-20" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y1" cx="95" cy="-20" r="4" fill="red"/>
                <text x="65" y="-16" font-family="Arial" font-size="9" fill="black">Y1'</text>

                <!-- 输出 Y2' (低电平有效) -->
                <line x1="80" y1="0" x2="86" y2="0" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="86" cy="0" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="89" y1="0" x2="95" y2="0" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y2" cx="95" cy="0" r="4" fill="red"/>
                <text x="65" y="4" font-family="Arial" font-size="9" fill="black">Y2'</text>

                <!-- 输出 Y3' (低电平有效) -->
                <line x1="80" y1="20" x2="86" y2="20" stroke="black" stroke-width="2"/>
                <!-- 低电平有效指示圆圈 -->
                <circle cx="86" cy="20" r="3" fill="white" stroke="black" stroke-width="1"/>
                <line x1="89" y1="20" x2="95" y2="20" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y3" cx="95" cy="20" r="4" fill="red"/>
                <text x="65" y="24" font-family="Arial" font-size="9" fill="black">Y3'</text>

                <!-- 内部逻辑示意 -->
                <text x="0" y="-10" font-family="Arial" font-size="8" text-anchor="middle" fill="gray">DATA</text>
                <text x="0" y="0" font-family="Arial" font-size="8" text-anchor="middle" fill="gray">DEMUX</text>
                <text x="0" y="10" font-family="Arial" font-size="8" text-anchor="middle" fill="gray">A1A0</text>
            </g>
        </svg>
    `
};

// 74139逻辑函数
const ls139Logic = {
    '74139': function(inputs) {
        // D/EN'端口：当为低电平(0)时使能，高电平(1)时禁用
        const D_EN = inputs.D !== undefined ? inputs.D : 1;  // 默认为1（禁用状态）
        const A1 = inputs.A1 || 0;
        const A0 = inputs.A0 || 0;

        // 当D/EN'=1时，所有输出都为1（禁用状态）
        if (D_EN === 1) {
            return {
                Y0: 1,
                Y1: 1,
                Y2: 1,
                Y3: 1
            };
        }

        // 当D/EN'=0时，根据A1A0选择输出通道
        const address = (A1 << 1) | A0;  // 组合地址：00, 01, 10, 11

        // 初始化所有输出为1（高电平，未选中状态）
        let outputs = {
            Y0: 1,
            Y1: 1,
            Y2: 1,
            Y3: 1
        };

        // 根据地址选择对应的输出通道，选中的通道输出低电平(0)
        switch (address) {
            case 0: // A1=0, A0=0 -> 选择Y0'
                outputs.Y0 = 0;  // 选中的输出为低电平
                break;
            case 1: // A1=0, A0=1 -> 选择Y1'
                outputs.Y1 = 0;
                break;
            case 2: // A1=1, A0=0 -> 选择Y2'
                outputs.Y2 = 0;
                break;
            case 3: // A1=1, A0=1 -> 选择Y3'
                outputs.Y3 = 0;
                break;
        }

        return outputs;
    }
};

// 74139对话框样式
const ls139DialogCSS = `
<style id="ls139-dialog-style">
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
    margin: 15px 0;
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

.principle {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    border-left: 4px solid #2196F3;
}

.applications {
    background: #fff3e0;
    padding: 15px;
    border-radius: 5px;
    border-left: 4px solid #ff9800;
}

.usage {
    background: #e8f5e8;
    padding: 15px;
    border-radius: 5px;
    border-left: 4px solid #4caf50;
}
</style>
`;

// 74139说明对话框HTML
const ls139DialogHTML = `
<div id="ls139-dialog" class="component-dialog draggable-dialog resizable-dialog" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; width: 800px; height: 600px; min-width: 600px; min-height: 400px;">
    <div class="dialog-content" style="width: 100%; height: 100%; background: white; border: 2px solid #333; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); display: flex; flex-direction: column;">
        <div class="dialog-header" style="background: #2196F3; color: white; padding: 15px 20px; border-radius: 6px 6px 0 0; cursor: move; user-select: none; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
            <h2>74139 1路-4路数据分配器</h2>
            <button class="dialog-close" onclick="closeLs139Dialog()">&times;</button>
        </div>
        <div class="dialog-body" style="padding: 20px; overflow-y: auto; flex: 1;">
            <div class="dialog-section">
                <h3>功能描述</h3>
                <p>74139是一个1路-4路数据分配器（解复用器），用于将数据信号分配到四路输出中的一路。它具有一个数据/使能输入端、两个地址选择端和四个输出端。</p>
                <ul>
                    <li><strong>D/EN'</strong>：数据输入/使能控制端（低电平有效）</li>
                    <li><strong>A1、A0</strong>：地址选择端，用于选择输出通道</li>
                    <li><strong>Y3'、Y2'、Y1'、Y0'</strong>：四路输出端（低电平有效）</li>
                </ul>
            </div>

            <div class="dialog-section">
                <h3>真值表</h3>
                <table class="truth-table">
                    <tr>
                        <th colspan="3">输入</th>
                        <th colspan="4">输出</th>
                    </tr>
                    <tr>
                        <th>D/EN'</th>
                        <th>A1</th>
                        <th>A0</th>
                        <th>Y3'</th>
                        <th>Y2'</th>
                        <th>Y1'</th>
                        <th>Y0'</th>
                    </tr>
                    <tr><td>1</td><td>×</td><td>×</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                    <tr><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>
                    <tr><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
                    <tr><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
                    <tr><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
                </table>
                <p><small>注：×表示任意值，选中的输出为低电平(0)，未选中的输出为高电平(1)</small></p>
            </div>

            <div class="dialog-section">
                <h3>工作原理</h3>
                <div class="principle">
                    <p><strong>数据分配原理</strong>：当D/EN'=0时，根据A1A0的组合选择对应的输出通道</p>
                    <p><strong>地址译码</strong>：</p>
                    <ul>
                        <li>A1A0=00：选择Y0'输出，Y0'=0，其他输出为1</li>
                        <li>A1A0=01：选择Y1'输出，Y1'=0，其他输出为1</li>
                        <li>A1A0=10：选择Y2'输出，Y2'=0，其他输出为1</li>
                        <li>A1A0=11：选择Y3'输出，Y3'=0，其他输出为1</li>
                    </ul>
                    <p><strong>使能控制</strong>：当D/EN'=1时，所有输出都为1（禁用状态）</p>
                </div>
            </div>

            <div class="dialog-section">
                <h3>应用示例</h3>
                <div class="applications">
                    <p><strong>数据路由</strong>：将一路数据信号路由到多个目标中的一个</p>
                    <p><strong>地址译码</strong>：在存储器系统中进行地址译码</p>
                    <p><strong>多路开关</strong>：实现1选4的数据选择功能</p>
                    <p><strong>时分复用</strong>：在时分复用系统中进行数据分配</p>
                </div>
            </div>

            <div class="dialog-section">
                <h3>使用说明</h3>
                <div class="usage">
                    <p><strong>基本连接</strong>：将数据/使能信号连接到D/EN'端，地址信号连接到A1、A0端</p>
                    <p><strong>使能控制</strong>：D/EN'端接低电平使能，接高电平禁用</p>
                    <p><strong>输出特性</strong>：选中的输出端为低电平(0)，未选中的输出端为高电平(1)</p>
                    <p><strong>级联使用</strong>：多个74139可以级联实现更大规模的数据分配</p>
                </div>
            </div>
        </div>
    </div>
</div>
`;

// 74139组件初始化函数
function initialize74139Component(componentDiv, type) {
    console.log('74139组件初始化');

    if (!componentDiv) {
        console.error('74139初始化失败：componentDiv为空');
        return;
    }

    const id = componentDiv.dataset.id;
    console.log('初始化74139组件，ID:', id);

    // 设置组件标题
    componentDiv.title = '74139 1路-4路数据分配器 - 双击查看详细说明';

    // 添加双击事件监听器
    componentDiv.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        showLs139Dialog();
    });

    console.log('74139组件初始化完成:', id);
}

// 显示74139说明对话框
function showLs139Dialog() {
    // 确保对话框HTML和CSS已添加到页面
    if (!document.getElementById('ls139-dialog')) {
        // 添加CSS
        if (!document.getElementById('ls139-dialog-style')) {
            document.head.insertAdjacentHTML('beforeend', ls139DialogCSS);
        }

        // 添加HTML
        document.body.insertAdjacentHTML('beforeend', ls139DialogHTML);
    }

    const dialog = document.getElementById('ls139-dialog');
    dialog.style.display = 'flex';

    // 添加ESC键关闭功能
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeLs139Dialog();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);

    // 添加点击外部关闭功能
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            closeLs139Dialog();
        }
    });
}

// 关闭74139说明对话框
function closeLs139Dialog() {
    const dialog = document.getElementById('ls139-dialog');
    if (dialog) {
        dialog.style.display = 'none';
    }
}

// 将函数添加到全局作用域
window.showLs139Dialog = showLs139Dialog;
window.closeLs139Dialog = closeLs139Dialog;
window.initialize74139Component = initialize74139Component;

// 主初始化函数
function initialize74139Module(componentSvgs, logicFunctions) {
    try {
        // 集成SVG模板
        if (componentSvgs && ls139Component) {
            Object.assign(componentSvgs, ls139Component);
            console.log('74139 SVG模板已集成');
        }

        // 集成逻辑函数
        if (logicFunctions && ls139Logic) {
            Object.assign(logicFunctions, ls139Logic);
            console.log('74139逻辑函数已集成');
        }

        console.log('74139模块初始化完成');
    } catch (error) {
        console.error('74139模块初始化失败:', error);
    }
}

// 自动初始化
if (typeof window !== 'undefined') {
    // 将组件和逻辑函数暴露到全局作用域
    window.ls139Component = ls139Component;
    window.ls139Logic = ls139Logic;

    // 浏览器环境
    if (window.componentSvgs && window.logicFunctions) {
        initialize74139Module(window.componentSvgs, window.logicFunctions);
    } else {
        // 延迟初始化，使用多次尝试确保集成成功
        let attempts = 0;
        const maxAttempts = 10;
        const tryInitialize = () => {
            attempts++;
            if (window.componentSvgs && window.logicFunctions) {
                initialize74139Module(window.componentSvgs, window.logicFunctions);
                console.log('74139模块延迟初始化成功，尝试次数:', attempts);
            } else if (attempts < maxAttempts) {
                setTimeout(tryInitialize, 100 * attempts); // 递增延迟
            } else {
                console.warn('74139模块初始化失败：componentSvgs或logicFunctions未找到');
            }
        };
        setTimeout(tryInitialize, 100);
    }
}

// 导出模块（用于Node.js环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ls139Component,
        ls139Logic,
        initialize74139Module,
        initialize74139Component,
        showLs139Dialog,
        closeLs139Dialog
    };
}
