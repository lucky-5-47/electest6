// 确保TPFlipFlop类在全局作用域可用
window.TPFlipFlop = class TPFlipFlop {
    constructor() {
        this.initializeComponent();
    }

    initializeComponent() {
        // 确保全局变量存在
        if (typeof window.componentSvgs === 'undefined') {
            window.componentSvgs = {};
        }

        // 添加T'触发器的SVG定义
        window.componentSvgs['tp-flipflop'] = `
            <svg class="component-svg" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="20" width="100" height="80" fill="#f0f0f0" stroke="black" stroke-width="2"/>
                <text x="100" y="45" font-family="Arial" font-size="16" text-anchor="middle">T'</text>
                <text x="100" y="85" font-family="Arial" font-size="16" text-anchor="middle">FF</text>

                <!-- 时钟输入 -->
                <text x="5" y="65" font-family="Arial" font-size="12">CLK</text>
                <line x1="25" y1="60" x2="50" y2="60" stroke="black" stroke-width="2"/>
                <path d="M45,55 L50,60 L45,65" fill="none" stroke="black" stroke-width="1"/>
                <circle class="anchor input-anchor clock-input" data-anchor-type="clock" cx="20" cy="60" r="5" fill="#0066cc"/>

                <!-- Q输出 -->
                <text x="185" y="55" font-family="Arial" font-size="12">Q</text>
                <line x1="150" y1="50" x2="175" y2="50" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" cx="180" cy="50" r="5" fill="black"/>

                <!-- 非Q输出 -->
                <text x="185" y="75" font-family="Arial" font-size="12">Q̄</text>
                <line x1="150" y1="70" x2="175" y2="70" stroke="black" stroke-width="2"/>
                <circle class="anchor output-anchor" data-anchor-type="output" cx="180" cy="70" r="5" fill="black"/>
            </svg>
        `;

        console.log('T\'触发器组件已初始化');
    }
}

// 确保在DOM加载完成后初始化组件
document.addEventListener('DOMContentLoaded', function() {
    new TPFlipFlop();
});
