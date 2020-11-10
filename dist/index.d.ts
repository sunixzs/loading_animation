/**
 * Just a loading animation
 */
export declare class LoadingAnimation {
    /**
     * @param element HTMLElement to add the loading animation
     * @param mode Either 'append' or 'replace' the content of element
     * @param show Show loading animation while constructing (call show() after init)?
     * @param styles Override some styles
     * @param iconHtml Either '' to use the default icon or SVG-markup. Maybe import one of the SVG in ./icons/.
     */
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
    /**
     * adds a loader (if there is not one)
     */
    add(): void;
    /**
     * enables the loading animation and creates one if there is no loader
     */
    show(): void;
    /**
     * hides the loading animation
     */
    hide(): void;
    /**
     * removes the loading animation from dom
     */
    remove(): void;
    /**
     * Fade out and remove animation from dom
     */
    fadeOut(): void;
    /**
     * Creates the elements for the loading animation and adds the styles
     *
     * <div class="loading-animation">
     *   <div class="loading-animation__background"></div>
     *   <div class="loading-animation__loader">
     *      <div class="loading-animation__animation">
     *         <div class="loading-animation__icon-wrap">
     *            <svg class="loading-animation__icon">[...]</svg
     *         </div>
     *      </div>
     *   </div>
     * </div>
     */
    private _createLoader;
    /**
     * Creates and/or modifies a single HTMLElement.
     * Also adds styles to css variable which will be added to head section.
     *
     * @param typeOrElement
     * @param cssClass
     * @param styles
     * @param innerHtml
     */
    private _element;
    /**
     * Overrides/adds properties of the style properties
     *
     * @param styles
     */
    private _overrideStyles;
}
