/**
 * 电路设计平台新建功能
 * 为菜单栏中的"新建"按钮添加实际功能
 */

(function() {
    'use strict';
    
    // 等待页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewFileFunction);
    } else {
        initNewFileFunction();
    }
    
    /**
     * 初始化新建文件功能
     */
    function initNewFileFunction() {
        console.log('正在初始化新建文件功能...');
        
        // 等待一小段时间确保所有元素都已加载
        setTimeout(() => {
            addNewFileEventListener();
        }, 500);
    }
    
    /**
     * 为新建菜单项添加事件监听器
     */
    function addNewFileEventListener() {
        // 查找所有下拉菜单中的链接
        const menuLinks = document.querySelectorAll('.droplist a');
        
        menuLinks.forEach(link => {
            // 找到文本内容包含"新建"的菜单项
            if (link.textContent.trim() === '新建') {
                console.log('找到新建菜单项，正在添加功能...');
                
                // 移除原有的href，防止页面跳转
                link.removeAttribute('href');
                link.style.cursor = 'pointer';
                
                // 添加点击事件监听器
                link.addEventListener('click', handleNewFileClick);
                
                console.log('新建功能已成功添加到菜单');
                return;
            }
        });
        
        console.warn('未找到新建菜单项');
    }
    
    /**
     * 处理新建文件点击事件
     */
    async function handleNewFileClick(event) {
        event.preventDefault();
        event.stopPropagation();

        console.log('新建功能被触发');

        // 显示确认对话框
        const confirmed = await showConfirmDialog(
            '新建空白电路',
            '确定要新建一个空白电路吗？\n\n' +
            '注意：当前未保存的内容将会丢失！\n' +
            '建议先保存当前工作。',
            '📄'
        );

        if (confirmed) {
            executeNewFile();
        } else {
            console.log('用户取消了新建操作');
        }
    }
    
    /**
     * 执行新建文件操作
     */
    function executeNewFile() {
        console.log('开始执行新建文件操作...');
        
        try {
            // 1. 清空画布
            clearCanvas();
            
            // 2. 重置所有状态
            resetAllStates();
            
            // 3. 清空连线
            clearWires();
            
            // 4. 重置计数器
            resetCounters();
            
            // 5. 显示成功通知
            showSuccessNotification('新建空白电路完成！');
            
            console.log('新建文件操作完成');
            
        } catch (error) {
            console.error('新建文件时发生错误:', error);
            showErrorNotification('新建文件失败：' + error.message);
        }
    }
    
    /**
     * 清空画布中的所有组件
     */
    function clearCanvas() {
        console.log('正在清空画布...');
        
        // 查找画布容器
        const canvasContainer = document.querySelector('#canvas') || 
                               document.querySelector('.canvas') ||
                               document.querySelector('svg');
        
        if (canvasContainer) {
            // 清空所有组件
            const components = canvasContainer.querySelectorAll('.component');
            console.log(`找到 ${components.length} 个组件，正在删除...`);
            
            components.forEach(component => {
                component.remove();
            });
            
            // 清空所有SVG元素（连线等）
            const svgElements = canvasContainer.querySelectorAll('line, path, circle, rect');
            svgElements.forEach(element => {
                // 保留背景网格等基础元素
                if (!element.classList.contains('grid-line') && 
                    !element.classList.contains('background')) {
                    element.remove();
                }
            });
            
            console.log('画布清空完成');
        } else {
            console.warn('未找到画布容器');
        }
    }
    
    /**
     * 重置所有组件状态
     */
    function resetAllStates() {
        console.log('正在重置组件状态...');
        
        // 重置全局状态存储
        if (window.componentStates) {
            window.componentStates.clear();
            console.log('componentStates 已清空');
        }
        
        // 重置其他可能的状态存储
        if (window.wireStates) {
            window.wireStates.clear();
            console.log('wireStates 已清空');
        }
        
        if (window.circuitData) {
            window.circuitData = {};
            console.log('circuitData 已重置');
        }
    }
    
    /**
     * 清空所有连线
     */
    function clearWires() {
        console.log('正在清空连线...');
        
        // 清空连线数组
        if (window.wires) {
            window.wires.length = 0;
            console.log('wires 数组已清空');
        }
        
        // 清空连线相关的全局变量
        if (window.currentWire) {
            window.currentWire = null;
        }
        
        if (window.isDrawingWire) {
            window.isDrawingWire = false;
        }
    }
    
    /**
     * 重置ID计数器
     */
    function resetCounters() {
        console.log('正在重置计数器...');
        
        // 重置组件ID计数器（如果存在）
        if (window.componentIdCounter !== undefined) {
            window.componentIdCounter = 0;
        }
        
        if (window.wireIdCounter !== undefined) {
            window.wireIdCounter = 0;
        }
    }
    
    /**
     * 显示成功通知
     */
    function showSuccessNotification(message) {
        showNotification(message, 'success');
    }
    
    /**
     * 显示错误通知
     */
    function showErrorNotification(message) {
        showNotification(message, 'error');
    }
    
    /**
     * 创建自定义对话框
     */
    function createCustomDialog(options) {
        const { title, message, icon = '💬', buttons = [] } = options;

        // 创建对话框遮罩
        const overlay = document.createElement('div');
        overlay.className = 'custom-dialog-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            animation: fadeIn 0.3s ease-out;
        `;

        // 创建对话框主体
        const dialog = document.createElement('div');
        dialog.className = 'custom-dialog';
        dialog.style.cssText = `
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow: hidden;
            animation: slideUp 0.3s ease-out;
            font-family: Arial, sans-serif;
        `;

        // 创建对话框内容
        dialog.innerHTML = `
            <div style="padding: 24px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">${icon}</div>
                <h2 style="margin: 0 0 16px 0; color: #333; font-size: 20px;">${title}</h2>
                <p style="margin: 0 0 24px 0; color: #666; line-height: 1.5; white-space: pre-line;">${message}</p>
                <div class="dialog-buttons" style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;"></div>
            </div>
        `;

        // 添加按钮
        const buttonContainer = dialog.querySelector('.dialog-buttons');
        buttons.forEach(button => {
            const btn = document.createElement('button');
            btn.textContent = button.text;
            btn.className = `dialog-btn ${button.class || 'btn-secondary'}`;
            btn.style.cssText = `
                padding: 10px 20px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.2s ease;
                min-width: 80px;
            `;

            // 设置按钮样式
            const buttonStyles = {
                'btn-primary': 'background: #007bff; color: white;',
                'btn-secondary': 'background: #6c757d; color: white;',
                'btn-success': 'background: #28a745; color: white;',
                'btn-warning': 'background: #ffc107; color: #212529;',
                'btn-danger': 'background: #dc3545; color: white;'
            };

            btn.style.cssText += buttonStyles[button.class] || buttonStyles['btn-secondary'];

            // 添加悬停效果
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-1px)';
                btn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = 'none';
            });

            // 添加点击事件
            btn.addEventListener('click', () => {
                document.body.removeChild(overlay);
                if (button.action) {
                    button.action();
                }
            });

            buttonContainer.appendChild(btn);
        });

        // 添加动画样式
        if (!document.querySelector('#dialog-styles')) {
            const style = document.createElement('style');
            style.id = 'dialog-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
    }

    /**
     * 显示确认对话框
     */
    function showConfirmDialog(title, message, icon = '❓') {
        return new Promise((resolve) => {
            createCustomDialog({
                title,
                message,
                icon,
                buttons: [
                    {
                        text: '确定',
                        class: 'btn-primary',
                        action: () => resolve(true)
                    },
                    {
                        text: '取消',
                        class: 'btn-secondary',
                        action: () => resolve(false)
                    }
                ]
            });
        });
    }

    /**
     * 显示通知消息
     */
    function showNotification(message, type = 'success') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'new-file-notification';

        // 设置样式
        const backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
        notification.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            background: ${backgroundColor};
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            max-width: 300px;
            word-wrap: break-word;
            animation: slideIn 0.3s ease-out;
        `;

        notification.textContent = message;
        document.body.appendChild(notification);

        // 3秒后自动移除通知
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);

        // 点击通知可手动关闭
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
    }
    
    // 导出函数供外部调用（可选）
    window.newFileFunction = {
        execute: executeNewFile,
        clearCanvas: clearCanvas,
        resetStates: resetAllStates
    };
    
    console.log('新建文件功能模块加载完成');
    
})();
