"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spinner_1 = require("./icons/spinner");
var LoadingAnimation = (function () {
    function LoadingAnimation(element, mode, show, styles, iconHtml) {
        if (mode === void 0) { mode = "append"; }
        if (show === void 0) { show = false; }
        if (styles === void 0) { styles = {}; }
        if (iconHtml === void 0) { iconHtml = ""; }
        this._loader = null;
        this.mode = "append";
        this.iconHtml = spinner_1.ICON;
        this.cssClass = "loading-animation";
        this._css = "";
        this._styleElement = this._element("STYLE");
        this._rand = Math.floor(Math.random() * Math.floor(10000));
        this._cssRandomClass = "loading-animation-" + this._rand;
        this.animationCss = "\n    @-webkit-keyframes loading-animation-" + this._rand + " {\n        0%{\n            -webkit-transform:rotate(0deg);\n            transform:rotate(0deg);\n        }\n        100%{\n            -webkit-transform:rotate(360deg);\n            transform:rotate(360deg);\n        }\n    }\n    @keyframes loading-animation-" + this._rand + " {\n        0%{\n            -webkit-transform:rotate(0deg);\n            transform:rotate(0deg);\n        }\n        100%{\n            -webkit-transform:rotate(360deg);\n            transform:rotate(360deg);\n        }\n    }";
        this.styles = {
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
                "-webkit-animation": "loading-animation-" + this._rand + " 2s infinite linear",
                animation: "loading-animation-" + this._rand + " 2s infinite linear",
            },
            icon: {
                display: "block",
                width: "3rem",
                height: "3rem",
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
    LoadingAnimation.prototype.show = function () {
        if (this._loader) {
            this._loader.style.display = "block";
        }
        else {
            this.add();
        }
    };
    LoadingAnimation.prototype.hide = function () {
        if (this._loader) {
            this._loader.style.display = "none";
        }
    };
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
    LoadingAnimation.prototype.fadeOut = function () {
        var _this = this;
        var start;
        var duration = 500;
        var step = function (timestamp) {
            if (start === undefined) {
                start = timestamp;
            }
            var elapsed = timestamp - start;
            if (elapsed > 0) {
                _this._loader.style.opacity = Math.max(0, 1 - elapsed / duration).toString();
            }
            if (elapsed < duration) {
                window.requestAnimationFrame(step);
            }
            else {
                _this.remove();
            }
        };
        window.requestAnimationFrame(step);
    };
    LoadingAnimation.prototype._createLoader = function () {
        var container = this._element("DIV", this.cssClass, this.styles.container);
        var background = this._element("DIV", this.cssClass + "__background", this.styles.background);
        var loader = this._element("DIV", this.cssClass + "__loader", this.styles.loader);
        var animation = this._element("DIV", this.cssClass + "__animation", this.styles.animation);
        var iconWrap = this._element("DIV", this.cssClass + "__icon-wrap", this.styles.iconWrap);
        var iconCreate = this._element("DIV", "", {}, this.iconHtml);
        var icon = iconCreate.firstElementChild;
        this._element(icon, this.cssClass + "__icon", this.styles.icon);
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
                var cssName = property.replace(/([A-Z])/g, "-$1").toLowerCase();
                styleTexts_1 += cssName + ":" + styles[property] + ";";
            });
            if (styleTexts_1) {
                this._css += "." + cssClass + "." + this._cssRandomClass + "{" + styleTexts_1 + "}";
            }
        }
        return element;
    };
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
