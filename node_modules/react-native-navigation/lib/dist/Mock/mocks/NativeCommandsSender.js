"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeCommandsSender = void 0;
const tslib_1 = require("tslib");
const LayoutStore_1 = require("../Stores/LayoutStore");
const LayoutNodeFactory_1 = (0, tslib_1.__importDefault)(require("../Layouts/LayoutNodeFactory"));
const EventsStore_1 = require("../Stores/EventsStore");
const lodash_1 = (0, tslib_1.__importDefault)(require("lodash"));
class NativeCommandsSender {
    constructor() { }
    setRoot(_commandId, layout) {
        return new Promise((resolve) => {
            if (LayoutStore_1.LayoutStore.getVisibleLayout()) {
                LayoutStore_1.LayoutStore.getVisibleLayout().componentDidDisappear();
                LayoutStore_1.LayoutStore.setRoot({});
            }
            const layoutNode = LayoutNodeFactory_1.default.create(layout.root);
            LayoutStore_1.LayoutStore.setRoot(layoutNode);
            layoutNode.getVisibleLayout().componentDidAppear();
            resolve(layout.root.nodeId);
        });
    }
    setDefaultOptions(options) {
        LayoutStore_1.LayoutStore.setDefaultOptions(options);
    }
    mergeOptions(componentId, options) {
        LayoutStore_1.LayoutStore.mergeOptions(componentId, options);
    }
    push(_commandId, onComponentId, layout) {
        return new Promise((resolve) => {
            const stack = LayoutStore_1.LayoutStore.getLayoutById(onComponentId).getStack();
            const layoutNode = LayoutNodeFactory_1.default.create(layout, stack);
            stack.getVisibleLayout().componentDidDisappear();
            LayoutStore_1.LayoutStore.push(layoutNode, stack);
            stack.getVisibleLayout().componentDidAppear();
            resolve(stack.getVisibleLayout().nodeId);
        });
    }
    pop(_commandId, componentId, _options) {
        return new Promise((resolve) => {
            const poppedChild = lodash_1.default.last(LayoutStore_1.LayoutStore.getLayoutById(componentId).getStack().children);
            LayoutStore_1.LayoutStore.pop(componentId);
            resolve(poppedChild.nodeId);
        });
    }
    popTo(_commandId, componentId, _options) {
        return new Promise((resolve) => {
            LayoutStore_1.LayoutStore.popTo(componentId);
            resolve(componentId);
        });
    }
    popToRoot(_commandId, componentId, _options) {
        LayoutStore_1.LayoutStore.popToRoot(componentId);
    }
    setStackRoot(_commandId, onComponentId, layout) {
        LayoutStore_1.LayoutStore.setStackRoot(onComponentId, layout);
    }
    showModal(_commandId, layout) {
        return new Promise((resolve) => {
            const layoutNode = LayoutNodeFactory_1.default.create(layout);
            LayoutStore_1.LayoutStore.getVisibleLayout().componentDidDisappear();
            LayoutStore_1.LayoutStore.showModal(layoutNode);
            layoutNode.componentDidAppear();
            resolve(layoutNode.nodeId);
        });
    }
    dismissModal(_commandId, componentId, _options) {
        return new Promise((resolve, reject) => {
            const modal = LayoutStore_1.LayoutStore.getModalById(componentId);
            if (modal) {
                const modalTopParent = modal.getTopParent();
                modalTopParent.componentDidDisappear();
                LayoutStore_1.LayoutStore.dismissModal(componentId);
                EventsStore_1.events.invokeModalDismissed({
                    componentName: modalTopParent.data.name,
                    componentId: modalTopParent.nodeId,
                    modalsDismissed: 1,
                });
                resolve(modalTopParent.nodeId);
                LayoutStore_1.LayoutStore.getVisibleLayout().componentDidAppear();
            }
            else {
                reject(`component with id: ${componentId} is not a modal`);
            }
        });
    }
    dismissAllModals(_commandId, _options) {
        LayoutStore_1.LayoutStore.dismissAllModals();
    }
    showOverlay(_commandId, layout) {
        const layoutNode = LayoutNodeFactory_1.default.create(layout);
        LayoutStore_1.LayoutStore.showOverlay(layoutNode);
        layoutNode.componentDidAppear();
    }
    dismissOverlay(_commandId, componentId) {
        LayoutStore_1.LayoutStore.dismissOverlay(componentId);
    }
    dismissAllOverlays(_commandId) {
        LayoutStore_1.LayoutStore.dismissAllOverlays();
    }
    getLaunchArgs(_commandId) { }
}
exports.NativeCommandsSender = NativeCommandsSender;
