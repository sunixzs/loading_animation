import { ICON } from "./icons/spinner";

/**
 * Just a loading animation
 */
export class LoadingAnimation {
    /**
     * @param element HTMLElement to add the loading animation
     * @param mode Either 'append' or 'replace' the content of element
     * @param show Show loading animation while constructing (call show() after init)?
     * @param styles Override some styles
     * @param iconHtml Either '' to use the default icon or SVG-markup. Maybe import one of the SVG in ./icons/.
     */
    constructor(
        element: HTMLElement,
        mode: string = "append",
        show: boolean = false,
        styles: any = {},
        iconHtml: string = ""
    ) {
        this._targetElement = element;
        this.mode = mode;
        if (iconHtml) {
            this.iconHtml = iconHtml;
        }

        this._overrideStyles(styles);

        if (show) {
            this.add();
        }
    }

    private _loader: any = null;

    // container where the loading animation will be added
    private _targetElement: HTMLElement;

    // either append or replace
    public mode: string = "append";

    // the animated icon (enable one of them)
    // spinner:
    public iconHtml: string = ICON;

    // styles
    // prefix class to all elements
    public cssClass: string = "loading-animation";

    // css which will be added to head section
    private _css: string = "";

    // element which holds the css
    private _styleElement: HTMLElement = this._element("STYLE");

    // random number which will be added to elements as css class to render the styles only for this instance
    private _rand: number = Math.floor(Math.random() * Math.floor(10000));
    private _cssRandomClass: string = "loading-animation-" + this._rand;

    // animation for the icon
    public animationCss: string = `
    @-webkit-keyframes loading-animation-${this._rand} {
        0%{
            -webkit-transform:rotate(0deg);
            transform:rotate(0deg);
        }
        100%{
            -webkit-transform:rotate(360deg);
            transform:rotate(360deg);
        }
    }
    @keyframes loading-animation-${this._rand} {
        0%{
            -webkit-transform:rotate(0deg);
            transform:rotate(0deg);
        }
        100%{
            -webkit-transform:rotate(360deg);
            transform:rotate(360deg);
        }
    }`;

    public styles: any = {
        container: {
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
        },
        background: {
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255,255,255,0.9)",
        },
        loader: {
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "6rem",
            height: "6rem",
            "-webkit-transform": "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
            borderRadius: "0.5rem",
            backgroundColor: "rgba(211,70,32,0.7)",
            opacity: 0.9,
        },
        animation: {
            position: "absolute",
            display: "block",
            top: "50%",
            left: "50%",
            "-webkit-transform": "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
            color: "white",
        },
        iconWrap: {
            display: "block",
            fontSize: "3rem",
            width: "3rem",
            height: "3rem",
            "-webkit-transition-origin": "center center",
            transitionOrigin: "center center",
            "-webkit-animation": `loading-animation-${this._rand} 2s infinite linear`,
            animation: `loading-animation-${this._rand} 2s infinite linear`,
        },
        icon: {
            display: "block",
            width: "3rem",
            height: "3rem",
        },
    };

    /**
     * adds a loader (if there is not one)
     */
    public add(): void {
        if (this._loader) {
            return;
        }

        this._loader = this._createLoader();
        if (this.mode === "append") {
            this._targetElement.appendChild(this._loader);
        } else if (this.mode === "replace") {
            this._targetElement.innerHTML = "";
            this._targetElement.appendChild(this._loader);
        } else {
            console.error("Mode must be either 'append' or 'replace'");
        }
    }

    /**
     * enables the loading animation and creates one if there is no loader
     */
    public show(): void {
        if (this._loader) {
            this._loader.style.display = "block";
        } else {
            this.add();
        }
    }

    /**
     * hides the loading animation
     */
    public hide(): void {
        if (this._loader) {
            this._loader.style.display = "none";
        }
    }

    /**
     * removes the loading animation from dom
     */
    public remove(): void {
        if (this._loader) {
            if (this._loader.parentElement === this._targetElement) {
                this._targetElement.removeChild(this._loader);
            }
            this._loader = null;
            if (this._styleElement) {
                document.head.removeChild(this._styleElement);
            }
        }
    }

    /**
     * Fade out and remove animation from dom
     */
    public fadeOut(): void {
        let _this = this;
        let start: number;
        let duration: number = 500;
        let step: FrameRequestCallback = function (timestamp) {
            if (start === undefined) {
                start = timestamp;
            }
            const elapsed: number = timestamp - start; // counts from 0 to duration

            if (elapsed > 0) {
                _this._loader.style.opacity = Math.max(0, 1 - elapsed / duration).toString();
            }

            if (elapsed < duration) {
                // Stop the animation after duration
                window.requestAnimationFrame(step);
            } else {
                _this.remove();
            }
        };

        window.requestAnimationFrame(step);
    }

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
    private _createLoader(): HTMLElement {
        let container = this._element("DIV", this.cssClass, this.styles.container);
        let background = this._element(
            "DIV",
            this.cssClass + "__background",
            this.styles.background
        );
        let loader = this._element("DIV", this.cssClass + "__loader", this.styles.loader);
        let animation = this._element("DIV", this.cssClass + "__animation", this.styles.animation);
        // animation.innerHTML = this.animationHtml;
        let iconWrap = this._element("DIV", this.cssClass + "__icon-wrap", this.styles.iconWrap);
        let iconCreate = this._element("DIV", "", {}, this.iconHtml);
        let icon = <HTMLElement>iconCreate.firstElementChild;
        this._element(icon, this.cssClass + "__icon", this.styles.icon);

        // add styles to head
        this._styleElement.setAttribute("type", "text/css");
        let styleText = document.createTextNode(this.animationCss + this._css);
        this._styleElement.appendChild(styleText);
        document.head.appendChild(this._styleElement);

        container.appendChild(background);
        container.appendChild(loader);
        loader.appendChild(animation);
        animation.appendChild(iconWrap);
        iconWrap.appendChild(icon);

        return container;
    }

    /**
     * Creates and/or modifies a single HTMLElement.
     * Also adds styles to css variable which will be added to head section.
     *
     * @param typeOrElement
     * @param cssClass
     * @param styles
     * @param innerHtml
     */
    private _element(
        typeOrElement: string | HTMLElement,
        cssClass: string = "",
        styles: any = {},
        innerHtml: string = ""
    ): HTMLElement {
        let element =
            typeof typeOrElement === "string"
                ? document.createElement(typeOrElement.toUpperCase())
                : typeOrElement;

        if (innerHtml) {
            element.innerHTML = innerHtml;
        }

        if (cssClass) {
            element.setAttribute("class", cssClass + " " + this._cssRandomClass);

            let styleTexts: string = "";
            Object.keys(styles).forEach((property: string) => {
                let cssName = <any>property.replace(/([A-Z])/g, "-$1").toLowerCase(); // camelCase to style-property
                styleTexts += cssName + ":" + styles[property] + ";";
            });
            if (styleTexts) {
                this._css += "." + cssClass + "." + this._cssRandomClass + "{" + styleTexts + "}";
            }
        }

        return element;
    }

    /**
     * Overrides/adds properties of the style properties
     *
     * @param styles
     */
    private _overrideStyles(styles: any): void {
        Object.keys(styles).forEach((propertyName) => {
            let styleElement: any = null;
            switch (propertyName) {
                case "container":
                    styleElement = this.styles.container;
                    break;
                case "background":
                    styleElement = this.styles.background;
                    break;
                case "loader":
                    styleElement = this.styles.loader;
                    break;
                case "animation":
                    styleElement = this.styles.animation;
                    break;
                case "iconWrap":
                    styleElement = this.styles.iconWrap;
                    break;
                case "icon":
                    styleElement = this.styles.icon;
                    break;
            }

            if (styleElement) {
                Object.keys(styles[propertyName]).forEach((property) => {
                    styleElement[property] = styles[propertyName][property];
                });
            }
        });
    }
}
