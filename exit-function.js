/**
 * 电路设计平台退出功能
 * 为菜单栏中的"退出"按钮添加实际功能
 */

(function() {
    'use strict';
    
    // 等待页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initExitFunction);
    } else {
        initExitFunction();
    }
    
    /**
     * 初始化退出功能
     */
    function initExitFunction() {
        console.log('正在初始化退出功能...');
        
        // 等待一小段时间确保所有元素都已加载
        setTimeout(() => {
            addExitEventListener();
            addBeforeUnloadListener();
        }, 500);
    }
    
    /**
     * 为退出菜单项添加事件监听器
     */
    function addExitEventListener() {
        // 查找所有下拉菜单中的链接
        const menuLinks = document.querySelectorAll('.droplist a');
        
        menuLinks.forEach(link => {
            // 找到文本内容包含"退出"的菜单项
            if (link.textContent.trim() === '退出') {
                console.log('找到退出菜单项，正在添加功能...');
                
                // 移除原有的href，防止页面跳转
                link.removeAttribute('href');
                link.style.cursor = 'pointer';
                
                // 添加点击事件监听器
                link.addEventListener('click', handleExitClick);
                
                console.log('退出功能已成功添加到菜单');
                return;
            }
        });
        
        console.warn('未找到退出菜单项');
    }
    
    /**
     * 添加页面关闭前的监听器
     */
    function addBeforeUnloadListener() {
        // 监听页面关闭/刷新事件
        window.addEventListener('beforeunload', function(event) {
            // 检查是否有未保存的内容
            if (hasUnsavedChanges()) {
                const message = '您有未保存的更改，确定要离开吗？';
                event.returnValue = message; // 标准方式
                return message; // 兼容旧浏览器
            }
        });
        
        console.log('页面关闭监听器已添加');
    }
    
    /**
     * 处理退出按钮点击事件
     */
    function handleExitClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        console.log('退出功能被触发');
        
        // 执行退出流程
        executeExit();
    }
    
    /**
     * 执行退出操作
     */
    async function executeExit() {
        console.log('开始执行退出操作...');

        try {
            // 1. 检查是否有未保存的更改
            if (hasUnsavedChanges()) {
                const saveChoice = await showSaveDialog();

                if (saveChoice === 'cancel') {
                    console.log('用户取消了退出操作');
                    return;
                } else if (saveChoice === 'save') {
                    // 尝试保存
                    const saved = await attemptSave();
                    if (!saved) {
                        console.log('保存失败，退出操作被取消');
                        return;
                    }
                }
            } else {
                // 没有未保存的更改，直接确认退出
                const confirmed = await showConfirmDialog(
                    '确认退出',
                    '确定要退出电路设计平台吗？',
                    '🚪'
                );

                if (!confirmed) {
                    console.log('用户取消了退出操作');
                    return;
                }
            }

            // 2. 执行清理操作
            performCleanup();

            // 3. 显示退出消息
            showExitMessage();

            // 4. 延迟关闭页面
            setTimeout(() => {
                closeApplication();
            }, 2000);

        } catch (error) {
            console.error('退出时发生错误:', error);
            showErrorDialog('退出失败', error.message);
        }
    }
    
    /**
     * 检查是否有未保存的更改
     */
    function hasUnsavedChanges() {
        // 检查画布是否有内容
        const canvas = document.querySelector('#canvas') || 
                      document.querySelector('.canvas') ||
                      document.querySelector('svg');
        
        if (canvas) {
            const components = canvas.querySelectorAll('.component');
            const wires = canvas.querySelectorAll('line, path');
            
            // 如果有组件或连线，认为有未保存的内容
            if (components.length > 0 || wires.length > 0) {
                console.log(`检测到未保存的内容: ${components.length} 个组件, ${wires.length} 条连线`);
                return true;
            }
        }
        
        // 检查是否有全局状态数据
        if (window.componentStates && window.componentStates.size > 0) {
            console.log('检测到组件状态数据');
            return true;
        }
        
        if (window.wires && window.wires.length > 0) {
            console.log('检测到连线数据');
            return true;
        }
        
        return false;
    }
    
    /**
     * 显示保存对话框
     */
    function showSaveDialog() {
        return new Promise((resolve) => {
            createCustomDialog({
                title: '检测到未保存的更改',
                message: '您有未保存的工作内容，请选择如何处理：',
                icon: '⚠️',
                buttons: [
                    {
                        text: '保存并退出',
                        class: 'btn-primary',
                        action: () => resolve('save')
                    },
                    {
                        text: '直接退出',
                        class: 'btn-warning',
                        action: () => {
                            // 显示二次确认对话框
                            createCustomDialog({
                                title: '确认放弃更改',
                                message: '确定要放弃所有未保存的更改吗？\n\n此操作无法撤销！',
                                icon: '🗑️',
                                buttons: [
                                    {
                                        text: '确定放弃',
                                        class: 'btn-danger',
                                        action: () => resolve('discard')
                                    },
                                    {
                                        text: '取消',
                                        class: 'btn-secondary',
                                        action: () => resolve('cancel')
                                    }
                                ]
                            });
                        }
                    },
                    {
                        text: '取消',
                        class: 'btn-secondary',
                        action: () => resolve('cancel')
                    }
                ]
            });
        });
    }
    
    /**
     * 尝试保存当前工作
     */
    async function attemptSave() {
        console.log('尝试保存当前工作...');

        try {
            // 检查是否有保存功能
            if (typeof window.saveCircuit === 'function') {
                window.saveCircuit();
                showSuccessNotification('保存成功！');
                return true;
            } else if (typeof window.save === 'function') {
                window.save();
                showSuccessNotification('保存成功！');
                return true;
            } else {
                // 没有找到保存函数，提示用户手动保存
                await showInfoDialog(
                    '无法自动保存',
                    '请手动保存您的工作：\n\n' +
                    '1. 使用 Ctrl+S 快捷键\n' +
                    '2. 或点击菜单栏的"保存"按钮\n\n' +
                    '保存完成后再次点击退出。',
                    '💾'
                );
                return false;
            }
        } catch (error) {
            console.error('保存失败:', error);
            await showErrorDialog('保存失败', error.message);
            return false;
        }
    }
    
    /**
     * 执行清理操作
     */
    function performCleanup() {
        console.log('正在执行清理操作...');
        
        try {
            // 清理定时器
            if (window.animationFrameId) {
                cancelAnimationFrame(window.animationFrameId);
            }
            
            // 清理事件监听器
            window.removeEventListener('beforeunload', arguments.callee);
            
            // 清理全局变量（可选）
            // 注意：这里不清理数据，因为用户可能还想保留
            
            console.log('清理操作完成');
        } catch (error) {
            console.error('清理操作失败:', error);
        }
    }
    
    /**
     * 显示退出消息
     */
    function showExitMessage() {
        // 创建全屏退出消息
        const exitOverlay = document.createElement('div');
        exitOverlay.className = 'exit-overlay';
        exitOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            font-family: Arial, sans-serif;
            animation: fadeIn 0.5s ease-out;
        `;
        
        exitOverlay.innerHTML = `
            <div style="text-align: center;">
                <h1 style="font-size: 48px; margin-bottom: 20px;">👋</h1>
                <h2 style="font-size: 24px; margin-bottom: 10px;">感谢使用电路设计平台</h2>
                <p style="font-size: 16px; opacity: 0.8;">页面将在 2 秒后关闭...</p>
            </div>
        `;
        
        // 添加动画样式
        if (!document.querySelector('#exit-styles')) {
            const style = document.createElement('style');
            style.id = 'exit-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(exitOverlay);
    }
    
    /**
     * 关闭应用程序
     */
    function closeApplication() {
        console.log('正在关闭应用程序...');
        
        try {
            // 尝试不同的关闭方法
            
            // 方法1: 关闭当前窗口（如果是通过脚本打开的）
            if (window.opener) {
                window.close();
                return;
            }
            
            // 方法2: 尝试关闭标签页
            window.close();
            
            // 方法3: 如果无法关闭，跳转到空白页
            setTimeout(() => {
                window.location.href = 'about:blank';
            }, 1000);
            
        } catch (error) {
            console.error('关闭应用程序失败:', error);

            // 最后的备选方案：显示提示
            showInfoDialog(
                '无法自动关闭',
                '无法自动关闭页面。\n\n' +
                '请手动关闭浏览器标签页或窗口。\n\n' +
                '感谢使用电路设计平台！',
                '👋'
            );
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
            `;
            document.head.appendChild(style);
        }

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        // 点击遮罩关闭（可选）
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                // 可以选择是否允许点击遮罩关闭
                // document.body.removeChild(overlay);
            }
        });
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
     * 显示信息对话框
     */
    function showInfoDialog(title, message, icon = 'ℹ️') {
        return new Promise((resolve) => {
            createCustomDialog({
                title,
                message,
                icon,
                buttons: [
                    {
                        text: '确定',
                        class: 'btn-primary',
                        action: () => resolve()
                    }
                ]
            });
        });
    }

    /**
     * 显示错误对话框
     */
    function showErrorDialog(title, message, icon = '❌') {
        return new Promise((resolve) => {
            createCustomDialog({
                title,
                message,
                icon,
                buttons: [
                    {
                        text: '确定',
                        class: 'btn-danger',
                        action: () => resolve()
                    }
                ]
            });
        });
    }

    /**
     * 显示通知消息
     */
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'exit-notification';

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
            z-index: 10001;
            font-family: Arial, sans-serif;
            font-size: 14px;
            max-width: 300px;
            word-wrap: break-word;
            animation: slideIn 0.3s ease-out;
        `;

        notification.textContent = message;
        document.body.appendChild(notification);

        // 3秒后自动移除
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
    
    // 导出函数供外部调用（可选）
    window.exitFunction = {
        execute: executeExit,
        hasUnsavedChanges: hasUnsavedChanges,
        performCleanup: performCleanup
    };
    
    console.log('退出功能模块加载完成');
    
})();
