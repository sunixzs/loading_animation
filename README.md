# Loading Animation

Just another loading animation - a colored background with an rotating icon in the middle.  
Use with JavaScript or TypeScript.


## Install

```sh
npm -i @sunixzs/loading_animation
```

... or ...

```sh
yarn add @sunixzs/loading_animation
```

## Use

```ts
const la = require("@sunixzs/loading_animation/dist");

const loadingAnimation = new la.LoadingAnimation(document.body);

loadingAnimation.show(); // let the show begin
loadingAnimation.hide(); // hide the loader but keeps the markup in place
loadingAnimation.remove(); // removes the loader
loadingAnimation.fadeOut(); // fade out the loader and remove() it
```

## API

```ts
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
)
```

## Example with some options

```ts
const la = require("@sunixzs/loading_animation/dist");
const spinner = require("@sunixzs/loading_animation/icons/spinner");

const loadingAnimation = new la.LoadingAnimation(
    document.body
    "append",
    true,
    {
        container: {
            position: "fixed",
            zIndex: 1066,
        },
        background: {
            backgroundColor: "rgba(51,127,137,0.97)",
        },
        loader: {
            backgroundColor: "#f5ead9",
        },
        animation: {
            color: "#327f89",
        },
    },
    spinner.ICON
);

window.setTimeout(function () {
    loadingAnimation.fadeOut();
}, 1000);
```