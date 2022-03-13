import { LayoutNode } from '../../src/commands/LayoutTreeCrawler';
export declare class NativeCommandsSender {
    constructor();
    setRoot(_commandId: string, layout: {
        root: any;
        modals: any[];
        overlays: any[];
    }): Promise<unknown>;
    setDefaultOptions(options: object): void;
    mergeOptions(componentId: string, options: object): void;
    push(_commandId: string, onComponentId: string, layout: LayoutNode): Promise<unknown>;
    pop(_commandId: string, componentId: string, _options?: object): Promise<unknown>;
    popTo(_commandId: string, componentId: string, _options?: object): Promise<unknown>;
    popToRoot(_commandId: string, componentId: string, _options?: object): void;
    setStackRoot(_commandId: string, onComponentId: string, layout: object): void;
    showModal(_commandId: string, layout: object): Promise<unknown>;
    dismissModal(_commandId: string, componentId: string, _options?: object): Promise<unknown>;
    dismissAllModals(_commandId: string, _options?: object): void;
    showOverlay(_commandId: string, layout: object): void;
    dismissOverlay(_commandId: string, componentId: string): void;
    dismissAllOverlays(_commandId: string): void;
    getLaunchArgs(_commandId: string): void;
}
