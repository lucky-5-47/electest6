/**
 * 74LS153 四选一数据选择器组件
 * 4-to-1 Data Selector/Multiplexer
 */

// 74LS153 SVG模板 - 使用与其他组件一致的坐标系统
const ls153ComponentSvg = `
    <svg class="component-svg" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
        <g id="ls153-group" transform="translate(60, 80)">
            <!-- 芯片主体 -->
            <rect id="ls153-bg" x="-50" y="-70" width="100" height="140" rx="4" fill="#E8F5E8" stroke="black" stroke-width="2"/>

            <!-- 芯片标识 -->
            <text x="0" y="-55" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" fill="black">74LS153</text>
            <text x="0" y="-45" font-family="Arial" font-size="7" text-anchor="middle" fill="black">4-TO-1 MUX</text>

            <!-- 左侧输入端口 -->
            <!-- 数据输入 D0 -->
            <line x1="-50" y1="-35" x2="-45" y2="-35" stroke="black" stroke-width="2"/>
            <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D0" cx="-53" cy="-35" r="3" fill="black"/>
            <text x="-40" y="-32" font-family="Arial" font-size="7" fill="black">D₀</text>

            <!-- 数据输入 D1 -->
            <line x1="-50" y1="-20" x2="-45" y2="-20" stroke="black" stroke-width="2"/>
            <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D1" cx="-53" cy="-20" r="3" fill="black"/>
            <text x="-40" y="-17" font-family="Arial" font-size="7" fill="black">D₁</text>

            <!-- 数据输入 D2 -->
            <line x1="-50" y1="-5" x2="-45" y2="-5" stroke="black" stroke-width="2"/>
            <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D2" cx="-53" cy="-5" r="3" fill="black"/>
            <text x="-40" y="-2" font-family="Arial" font-size="7" fill="black">D₂</text>

            <!-- 数据输入 D3 -->
            <line x1="-50" y1="10" x2="-45" y2="10" stroke="black" stroke-width="2"/>
            <circle class="anchor input-anchor" data-anchor-type="input" data-pin="D3" cx="-53" cy="10" r="3" fill="black"/>
            <text x="-40" y="13" font-family="Arial" font-size="7" fill="black">D₃</text>

            <!-- 地址选择 A0 -->
            <line x1="-50" y1="25" x2="-45" y2="25" stroke="black" stroke-width="2"/>
            <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A0" cx="-53" cy="25" r="3" fill="#0066cc"/>
            <text x="-40" y="28" font-family="Arial" font-size="7" fill="black">A₀</text>

            <!-- 地址选择 A1 -->
            <line x1="-50" y1="40" x2="-45" y2="40" stroke="black" stroke-width="2"/>
            <circle class="anchor input-anchor" data-anchor-type="input" data-pin="A1" cx="-53" cy="40" r="3" fill="#0066cc"/>
            <text x="-40" y="43" font-family="Arial" font-size="7" fill="black">A₁</text>

            <!-- 使能端 S' (低电平有效) -->
            <line x1="-45" y1="55" x2="-48" y2="55" stroke="black" stroke-width="2"/>
            <!-- 低电平有效指示圆圈 -->
            <circle cx="-48" cy="55" r="2" fill="white" stroke="black" stroke-width="1"/>
            <line x1="-50" y1="55" x2="-53" y2="55" stroke="black" stroke-width="2"/>
            <circle class="anchor input-anchor" data-anchor-type="input" data-pin="S" cx="-53" cy="55" r="3" fill="red"/>
            <text x="-40" y="58" font-family="Arial" font-size="6" fill="black">S̄</text>

            <!-- 右侧输出端口 -->
            <!-- 输出 Y -->
            <line x1="45" y1="0" x2="50" y2="0" stroke="black" stroke-width="2"/>
            <circle class="anchor output-anchor" data-anchor-type="output" data-pin="Y" cx="53" cy="0" r="3" fill="green"/>
            <text x="40" y="3" font-family="Arial" font-size="7" fill="black">Y</text>

            <!-- 内部逻辑示意图 -->
            <g opacity="0.3">
                <!-- MUX符号 -->
                <path d="M-35,-40 L-35,45 L35,35 L35,-30 Z" fill="lightblue" stroke="gray" stroke-width="1"/>
                <text x="0" y="-5" font-family="Arial" font-size="8" text-anchor="middle" fill="gray">MUX</text>
                <text x="0" y="5" font-family="Arial" font-size="6" text-anchor="middle" fill="gray">4→1</text>
            </g>

            <!-- 功能指示 -->
            <text x="0" y="65" font-family="Arial" font-size="6" text-anchor="middle" fill="gray">Y = D[A₁A₀] when S̄=0</text>

            <!-- 输出状态显示已移除 -->
        </g>
    </svg>
`;

// 74LS153逻辑函数
function ls153LogicFunction(inputs) {
    const { D0 = 0, D1 = 0, D2 = 0, D3 = 0, A0 = 0, A1 = 0, S = 1 } = inputs;

    console.log('74LS153逻辑计算 - 输入:', inputs);

    // 当S̄=1时，输出为0（禁止状态）
    if (S === 1) {
        console.log('74LS153禁止状态 (S̄=1)，输出=0');
        return { Y: 0 };
    }

    // 当S̄=0时，根据地址选择输出对应的数据
    const address = (A1 << 1) | A0;
    let Y = 0;

    switch (address) {
        case 0: Y = D0; console.log(`地址00 -> 选择D0=${D0}`); break;
        case 1: Y = D1; console.log(`地址01 -> 选择D1=${D1}`); break;
        case 2: Y = D2; console.log(`地址10 -> 选择D2=${D2}`); break;
        case 3: Y = D3; console.log(`地址11 -> 选择D3=${D3}`); break;
    }

    console.log(`74LS153最终输出: Y=${Y}`);
    return { Y };
}

// 74LS153组件初始化函数
function initialize74LS153Component(componentDiv, type) {
    const componentId = componentDiv.dataset.id;
    
    // 初始化组件状态
    if (window.componentStates) {
        window.componentStates.set(componentId, { Y: 0 });
    }
    
    // 添加双击事件显示帮助对话框
    componentDiv.addEventListener('dblclick', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showLS153Dialog();
    });
    
    // 更新显示
    updateLS153Display(componentDiv);
}

// 更新74LS153显示
function updateLS153Display(componentDiv) {
    const componentId = componentDiv.dataset.id;
    if (!window.componentStates) {
        console.warn('componentStates未初始化');
        return;
    }

    const state = window.componentStates.get(componentId) || { Y: 0 };
    console.log(`更新74LS153显示 - ID: ${componentId}, 状态:`, state);

    // 输出显示元素已移除，只更新背景色表示状态
    const bg = componentDiv.querySelector('#ls153-bg');
    if (bg) {
        bg.setAttribute('fill', state.Y ? '#E8F8E8' : '#F8E8E8');
        console.log(`背景色已更新: ${state.Y ? '#E8F8E8' : '#F8E8E8'}`);
    } else {
        console.warn('未找到背景元素 #ls153-bg');
    }
}

// 显示74LS153帮助对话框
function showLS153Dialog() {
    // 创建对话框
    const dialog = document.createElement('div');
    dialog.className = 'component-dialog';
    dialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        width: 800px;
        height: 600px;
        min-width: 600px;
        min-height: 400px;
    `;

    dialog.innerHTML = `
        <div class="dialog-content" style="
            width: 100%;
            height: 100%;
            background: white;
            border: 2px solid #333;
            border-radius: 8px;
            box-shadow: none;
            display: flex;
            flex-direction: column;
        ">
            <div class="dialog-header" style="
                background: #2196F3;
                color: white;
                padding: 15px 20px;
                border-radius: 6px 6px 0 0;
                cursor: move;
                user-select: none;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-shrink: 0;
            ">
                <h2 style="margin: 0; font-size: 1.5em;">74LS153 四选一数据选择器</h2>
                <button class="dialog-close" onclick="closeLS153Dialog()" style="
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
                ">&times;</button>
            </div>
            <div class="dialog-body" style="padding: 20px; overflow-y: auto; flex: 1;">
                <h3 style="color: #2c3e50; margin-top: 0;">功能说明</h3>
                <p style="line-height: 1.6;">74LS153是一个4选1数据选择器（多路选择器），可以从4个数据输入中选择一个输出。</p>

                <h3 style="color: #2c3e50;">引脚说明</h3>
                <ul style="line-height: 1.8;">
                    <li><strong>D₀-D₃</strong>: 数据输入端</li>
                    <li><strong>A₀, A₁</strong>: 地址选择端（选择控制信号）</li>
                    <li><strong>S̄</strong>: 使能端（低电平有效）</li>
                    <li><strong>Y</strong>: 数据输出端</li>
                </ul>

                <h3 style="color: #2c3e50;">逻辑表达式</h3>
                <p style="background: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace;">
                    <strong>Y = Ā₁Ā₀D₀ + Ā₁A₀D₁ + A₁Ā₀D₂ + A₁A₀D₃</strong><br>
                    当S̄=0时有效，S̄=1时Y=0
                </p>

                <h3 style="color: #2c3e50;">真值表</h3>
                <table style="border-collapse: collapse; width: 100%; margin: 10px 0; font-size: 14px;">
                    <tr style="background: #667eea; color: white;">
                        <th style="border: 1px solid #ddd; padding: 10px;">S̄</th>
                        <th style="border: 1px solid #ddd; padding: 10px;">A₁</th>
                        <th style="border: 1px solid #ddd; padding: 10px;">A₀</th>
                        <th style="border: 1px solid #ddd; padding: 10px;">输出Y</th>
                    </tr>
                    <tr><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">×</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">×</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td></tr>
                    <tr style="background: #f8f9fa;"><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center; background: #e8f5e8;"><strong>D₀</strong></td></tr>
                    <tr><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center; background: #e8f5e8;"><strong>D₁</strong></td></tr>
                    <tr style="background: #f8f9fa;"><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center; background: #e8f5e8;"><strong>D₂</strong></td></tr>
                    <tr><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center; background: #e8f5e8;"><strong>D₃</strong></td></tr>
                </table>

                <h3 style="color: #2c3e50;">使用方法</h3>
                <ol style="line-height: 1.8;">
                    <li>连接数据输入D₀-D₃到数据源</li>
                    <li>连接地址选择A₀、A₁到控制信号</li>
                    <li>连接使能端S̄到控制信号（通常接地使能）</li>
                    <li>从输出端Y获取选中的数据</li>
                </ol>

                <p style="background: #e8f4fd; padding: 10px; border-radius: 4px; border-left: 4px solid #3498db;">
                    <strong>💡 提示：</strong>双击组件可以查看此帮助信息。拖拽标题栏可以移动对话框。
                </p>
            </div>
        </div>
    `;

    document.body.appendChild(dialog);

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

    dialogHeader.addEventListener('mousedown', (e) => {
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
    });

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

    dialogHeader.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });

    // 关闭按钮事件
    dialog.querySelector('.dialog-close').addEventListener('click', () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.removeChild(dialog);
    });

    // 点击外部关闭
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.removeChild(dialog);
        }
    });
}

// 关闭对话框函数
function closeLS153Dialog() {
    const dialogs = document.querySelectorAll('.component-dialog');
    dialogs.forEach(dialog => {
        if (document.body.contains(dialog)) {
            document.body.removeChild(dialog);
        }
    });
}

// 立即暴露到全局作用域
window.LS153Component = {
    initialize: initialize74LS153Component,
    svg: ls153ComponentSvg,
    logic: ls153LogicFunction
};

// 将对话框函数和显示更新函数也暴露到全局作用域
window.showLS153Dialog = showLS153Dialog;
window.closeLS153Dialog = closeLS153Dialog;
window.updateLS153Display = updateLS153Display;

console.log('74LS153最终版脚本加载完成，LS153Component:', window.LS153Component);
console.log('SVG长度:', window.LS153Component.svg.length);
