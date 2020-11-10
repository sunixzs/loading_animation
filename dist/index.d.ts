export declare class LoadingAnimation {
    constructor(element: HTMLElement, mode?: string, show?: boolean, styles?: any, iconHtml?: string);
    private _loader;
    private _targetElement;
    mode: string;
    iconHtml: string;
    cssClass: string;
    private _css;
    private _styleElement;
    private _rand;
    private _cssRandomClass;
    animationCss: string;
    styles: any;
    add(): void;
    show(): void;
    hide(): void;
    remove(): void;
    fadeOut(): void;
    private _createLoader;
    private _element;
    private _overrideStyles;
}
