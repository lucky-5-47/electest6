/**
 * 选中框管理系统
 * 用于管理电路组件的选中状态和选中框的显示
 */

// 选中框的尺寸配置
const SELECTION_BOX_CONFIG = {
    // 输入/输出组件
    'input': { width: 140, height: 80 },
    'output': { width: 140, height: 80 },
    
    // 时钟组件
    'clock': { width: 130, height: 70 },
    
    // LED和按钮
    'led-diode': { width: 130, height: 70 },
    'push-button': { width: 130, height: 70 },
    'switch': { width: 130, height: 70 },
    
    // 线路部分
    'pin': { width: 130, height: 70 },
    'splitter': { width: 130, height: 70 },
    'probe': { width: 130, height: 70 },
    'power': { width: 130, height: 70 },
    'ground': { width: 130, height: 70 },
    'text': { width: 130, height: 70 },
    
    // 逻辑门 - 宽一点矮一点
    'and-gate': { width: 160, height: 110 },
    'or-gate': { width: 160, height: 110 },
    'not-gate': { width: 160, height: 110 },
    'xor-gate': { width: 160, height: 110 },
    'nand-gate': { width: 160, height: 110 },
    'nor-gate': { width: 160, height: 110 },
    
    // 74LS芯片
    '74ls138': { width: 130, height: 170 },
    '74ls139': { width: 130, height: 170 },
    '74ls151': { width: 130, height: 170 },
    '74ls153': { width: 130, height: 170 },
    '74ls160': { width: 130, height: 170 },
    '74ls161': { width: 130, height: 170 },
    '74ls175': { width: 130, height: 170 },
    '74280': { width: 130, height: 170 },
    
    // 其他大型芯片
    'mod-n-counter': { width: 130, height: 170 },
    'binary-async-counter': { width: 130, height: 170 },
    'majority-voter-3': { width: 130, height: 170 },
    'majority-voter-5': { width: 130, height: 170 },
    'majority-voter-7': { width: 130, height: 170 },
    
    // 时序逻辑组件
    'd-flipflop': { width: 130, height: 170 },
    'jk-flipflop': { width: 130, height: 170 },
    't-flipflop': { width: 130, height: 170 },
    'tp-flipflop': { width: 130, height: 170 },
    'rs-latch': { width: 130, height: 170 },
    'counter': { width: 130, height: 170 },
    'adder': { width: 130, height: 170 },
    'subtractor': { width: 130, height: 170 },
    'divider': { width: 130, height: 170 },
    'complement': { width: 130, height: 170 },
};

/**
 * 获取组件的选中框尺寸
 * @param {string} componentType - 组件类型
 * @returns {object} - {width, height}
 */
function getSelectionBoxSize(componentType) {
    return SELECTION_BOX_CONFIG[componentType] || { width: 140, height: 110 };
}

/**
 * 创建选中框
 * @param {HTMLElement} component - 组件元素
 * @param {number} boxWidth - 方框宽度
 * @param {number} boxHeight - 方框高度
 */
function createSelectionBox(component, boxWidth, boxHeight) {
    // 移除旧的方框（如果存在）
    removeSelectionBox(component);

    // 创建新的方框
    const selectionBox = document.createElement('div');
    selectionBox.className = 'selection-box';
    selectionBox.style.position = 'absolute';
    selectionBox.style.border = '2px solid #007bff';
    selectionBox.style.width = boxWidth + 'px';
    selectionBox.style.height = boxHeight + 'px';
    
    // 计算位置：居中显示
    const offsetX = (component.offsetWidth - boxWidth) / 2;
    const offsetY = (component.offsetHeight - boxHeight) / 2;
    
    selectionBox.style.left = offsetX + 'px';
    selectionBox.style.top = offsetY + 'px';
    selectionBox.style.pointerEvents = 'none';
    selectionBox.style.zIndex = '1000';
    selectionBox.style.boxSizing = 'border-box';
    selectionBox.style.borderRadius = '2px';

    // 确保组件是相对定位
    if (component.style.position !== 'absolute' && component.style.position !== 'relative' && component.style.position !== 'fixed') {
        component.style.position = 'relative';
    }

    component.appendChild(selectionBox);
}

/**
 * 移除选中框
 * @param {HTMLElement} component - 组件元素
 */
function removeSelectionBox(component) {
    const selectionBox = component.querySelector('.selection-box');
    if (selectionBox) {
        selectionBox.remove();
    }
}

/**
 * 选中组件
 * @param {HTMLElement} component - 组件元素
 * @param {Set} selectedComponents - 已选中的组件集合
 */
function selectComponent(component, selectedComponents) {
    // 检查是否已经选中
    if (selectedComponents.has(component)) {
        return;
    }

    selectedComponents.add(component);

    const componentType = component.dataset.type;
    const size = getSelectionBoxSize(componentType);

    // 创建选中框
    createSelectionBox(component, size.width, size.height);

    // 添加自定义属性记录选中状态
    component.dataset.selected = 'true';
}

/**
 * 取消选中组件
 * @param {HTMLElement} component - 组件元素
 * @param {Set} selectedComponents - 已选中的组件集合
 */
function deselectComponent(component, selectedComponents) {
    selectedComponents.delete(component);

    // 移除选中方框
    removeSelectionBox(component);

    component.dataset.selected = 'false';
}

/**
 * 切换组件选中状态
 * @param {HTMLElement} component - 组件元素
 * @param {Set} selectedComponents - 已选中的组件集合
 */
function toggleComponentSelection(component, selectedComponents) {
    if (selectedComponents.has(component)) {
        deselectComponent(component, selectedComponents);
    } else {
        selectComponent(component, selectedComponents);
    }
}

/**
 * 清除所有选中
 * @param {Set} selectedComponents - 已选中的组件集合
 */
function clearSelection(selectedComponents) {
    selectedComponents.forEach(comp => {
        // 移除选中方框
        removeSelectionBox(comp);
        comp.dataset.selected = 'false';
    });
    selectedComponents.clear();
}

/**
 * 全选所有组件
 * @param {Set} selectedComponents - 已选中的组件集合
 * @param {string} selector - 组件选择器（默认为 '.component'）
 */
function selectAllComponents(selectedComponents, selector = '.component') {
    clearSelection(selectedComponents);
    const components = document.querySelectorAll(selector);
    components.forEach(comp => {
        selectComponent(comp, selectedComponents);
    });
}

/**
 * 获取所有选中的组件
 * @param {Set} selectedComponents - 已选中的组件集合
 * @returns {Array} - 选中的组件数组
 */
function getSelectedComponents(selectedComponents) {
    return Array.from(selectedComponents);
}

/**
 * 检查组件是否被选中
 * @param {HTMLElement} component - 组件元素
 * @param {Set} selectedComponents - 已选中的组件集合
 * @returns {boolean} - 是否被选中
 */
function isComponentSelected(component, selectedComponents) {
    return selectedComponents.has(component);
}

/**
 * 更新选中框尺寸（用于组件大小改变时）
 * @param {HTMLElement} component - 组件元素
 * @param {Set} selectedComponents - 已选中的组件集合
 */
function updateSelectionBox(component, selectedComponents) {
    if (selectedComponents.has(component)) {
        const componentType = component.dataset.type;
        const size = getSelectionBoxSize(componentType);
        createSelectionBox(component, size.width, size.height);
    }
}

// 导出函数供外部使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SELECTION_BOX_CONFIG,
        getSelectionBoxSize,
        createSelectionBox,
        removeSelectionBox,
        selectComponent,
        deselectComponent,
        toggleComponentSelection,
        clearSelection,
        selectAllComponents,
        getSelectedComponents,
        isComponentSelected,
        updateSelectionBox
    };
}

