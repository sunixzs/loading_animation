"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spinner_1 = require("./icons/spinner");
/**
 * Just a loading animation
 */
var LoadingAnimation = /** @class */ (function () {
    /**
     * @param element HTMLElement to add the loading animation
     * @param mode Either 'append' or 'replace' the content of element
     * @param show Show loading animation while constructing (call show() after init)?
     * @param styles Override some styles
     * @param iconHtml Either '' to use the default icon or SVG-markup. Maybe import one of the SVG in ./icons/.
     */
    function LoadingAnimation(element, mode, show, styles, iconHtml) {
        if (mode === void 0) { mode = "append"; }
        if (show === void 0) { show = false; }
        if (styles === void 0) { styles = {}; }
        if (iconHtml === void 0) { iconHtml = ""; }
        this._loader = null;
        // either append or replace
        this.mode = "append";
        // the animated icon (enable one of them)
        // spinner:
        this.iconHtml = spinner_1.ICON;
        // styles
        // prefix class to all elements
        this.cssClass = "loading-animation";
        // css which will be added to head section
        this._css = "";
        // element which holds the css
        this._styleElement = this._element("STYLE");
        // random number which will be added to elements as css class to render the styles only for this instance
        this._rand = Math.floor(Math.random() * Math.floor(10000));
        this._cssRandomClass = "loading-animation-" + this._rand;
        // animation for the icon
        this.animationCss = "\n    @-webkit-keyframes loading-animation-" + this._rand + " {\n        0%{\n            -webkit-transform:rotate(0deg);\n            transform:rotate(0deg);\n        }\n        100%{\n            -webkit-transform:rotate(360deg);\n            transform:rotate(360deg);\n        }\n    }\n    @keyframes loading-animation-" + this._rand + " {\n        0%{\n            -webkit-transform:rotate(0deg);\n            transform:rotate(0deg);\n        }\n        100%{\n            -webkit-transform:rotate(360deg);\n            transform:rotate(360deg);\n        }\n    }";
        this.styles = {
            // container holds all elements
            container: {
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            },
            // the background ^^
            background: {
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255,255,255,0.9)",
            },
            // inner square
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
            // container for the icon
            animation: {
                position: "absolute",
                display: "block",
                top: "50%",
                left: "50%",
                "-webkit-transform": "translate(-50%, -50%)",
                transform: "translate(-50%, -50%)",
                color: "white",
            },
            // wrap around the icon which will be animated
            iconWrap: {
                display: "block",
                width: "3rem",
                height: "3rem",
                "-webkit-transition-origin": "center center",
                transitionOrigin: "center center",
                "-webkit-animation": "loading-animation-" + this._rand + " 2s infinite linear",
                animation: "loading-animation-" + this._rand + " 2s infinite linear",
            },
            // the icon/SVG
            icon: {
                display: "block",
                width: "100%",
                height: "100%",
            },
        };
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
    /**
     * adds a loader (if there is not one)
     */
    LoadingAnimation.prototype.add = function () {
        if (this._loader) {
            return;
        }
        this._loader = this._createLoader();
        if (this.mode === "append") {
            this._targetElement.appendChild(this._loader);
        }
        else if (this.mode === "replace") {
            this._targetElement.innerHTML = "";
            this._targetElement.appendChild(this._loader);
        }
        else {
            console.error("Mode must be either 'append' or 'replace'");
        }
    };
    /**
     * enables the loading animation and creates one if there is no loader
     */
    LoadingAnimation.prototype.show = function () {
        if (this._loader) {
            this._loader.style.display = "block";
        }
        else {
            this.add();
        }
    };
    /**
     * hides the loading animation
     */
    LoadingAnimation.prototype.hide = function () {
        if (this._loader) {
            this._loader.style.display = "none";
        }
    };
    /**
     * removes the loading animation from dom
     */
    LoadingAnimation.prototype.remove = function () {
        if (this._loader) {
            if (this._loader.parentElement === this._targetElement) {
                this._targetElement.removeChild(this._loader);
            }
            this._loader = null;
            if (this._styleElement) {
                document.head.removeChild(this._styleElement);
            }
        }
    };
    /**
     * Fade out and remove animation from dom
     */
    LoadingAnimation.prototype.fadeOut = function () {
        var _this = this;
        var start;
        var duration = 500;
        var step = function (timestamp) {
            if (start === undefined) {
                start = timestamp;
            }
            var elapsed = timestamp - start; // counts from 0 to duration
            if (elapsed > 0) {
                _this._loader.style.opacity = Math.max(0, 1 - elapsed / duration).toString();
            }
            if (elapsed < duration) {
                // Stop the animation after duration
                window.requestAnimationFrame(step);
            }
            else {
                _this.remove();
            }
        };
        window.requestAnimationFrame(step);
    };
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
    LoadingAnimation.prototype._createLoader = function () {
        var container = this._element("DIV", this.cssClass, this.styles.container);
        var background = this._element("DIV", this.cssClass + "__background", this.styles.background);
        var loader = this._element("DIV", this.cssClass + "__loader", this.styles.loader);
        var animation = this._element("DIV", this.cssClass + "__animation", this.styles.animation);
        // animation.innerHTML = this.animationHtml;
        var iconWrap = this._element("DIV", this.cssClass + "__icon-wrap", this.styles.iconWrap);
        var iconCreate = this._element("DIV", "", {}, this.iconHtml);
        var icon = iconCreate.firstElementChild;
        this._element(icon, this.cssClass + "__icon", this.styles.icon);
        // add styles to head
        this._styleElement.setAttribute("type", "text/css");
        var styleText = document.createTextNode(this.animationCss + this._css);
        this._styleElement.appendChild(styleText);
        document.head.appendChild(this._styleElement);
        container.appendChild(background);
        container.appendChild(loader);
        loader.appendChild(animation);
        animation.appendChild(iconWrap);
        iconWrap.appendChild(icon);
        return container;
    };
    /**
     * Creates and/or modifies a single HTMLElement.
     * Also adds styles to css variable which will be added to head section.
     *
     * @param typeOrElement
     * @param cssClass
     * @param styles
     * @param innerHtml
     */
    LoadingAnimation.prototype._element = function (typeOrElement, cssClass, styles, innerHtml) {
        if (cssClass === void 0) { cssClass = ""; }
        if (styles === void 0) { styles = {}; }
        if (innerHtml === void 0) { innerHtml = ""; }
        var element = typeof typeOrElement === "string"
            ? document.createElement(typeOrElement.toUpperCase())
            : typeOrElement;
        if (innerHtml) {
            element.innerHTML = innerHtml;
        }
        if (cssClass) {
            element.setAttribute("class", cssClass + " " + this._cssRandomClass);
            var styleTexts_1 = "";
            Object.keys(styles).forEach(function (property) {
                var cssName = property.replace(/([A-Z])/g, "-$1").toLowerCase(); // camelCase to style-property
                styleTexts_1 += cssName + ":" + styles[property] + ";";
            });
            if (styleTexts_1) {
                this._css += "." + cssClass + "." + this._cssRandomClass + "{" + styleTexts_1 + "}";
            }
        }
        return element;
    };
    /**
     * Overrides/adds properties of the style properties
     *
     * @param styles
     */
    LoadingAnimation.prototype._overrideStyles = function (styles) {
        var _this_1 = this;
        Object.keys(styles).forEach(function (propertyName) {
            var styleElement = null;
            switch (propertyName) {
                case "container":
                    styleElement = _this_1.styles.container;
                    break;
                case "background":
                    styleElement = _this_1.styles.background;
                    break;
                case "loader":
                    styleElement = _this_1.styles.loader;
                    break;
                case "animation":
                    styleElement = _this_1.styles.animation;
                    break;
                case "iconWrap":
                    styleElement = _this_1.styles.iconWrap;
                    break;
                case "icon":
                    styleElement = _this_1.styles.icon;
                    break;
            }
            if (styleElement) {
                Object.keys(styles[propertyName]).forEach(function (property) {
                    styleElement[property] = styles[propertyName][property];
                });
            }
        });
    };
    return LoadingAnimation;
}());
exports.LoadingAnimation = LoadingAnimation;
