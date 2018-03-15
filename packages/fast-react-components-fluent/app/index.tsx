import * as React from "react";
import * as ReactDOM from "react-dom";
import {ButtonHTMLTags} from "@microsoft/fast-react-components-base";
import Button from "../src/button";
import { DesignSystemProvider } from "@microsoft/fast-react-jss-manager";
import fluentDesignSystemDefaults from "../src/design-system";

/**
 * Create the root node
 */
const root: HTMLElement = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

function render(): void {
    ReactDOM.render(
        <div>
            <DesignSystemProvider designSystem={fluentDesignSystemDefaults}>
                <Button tag={ButtonHTMLTags.button}>Hello world</Button>
            </DesignSystemProvider>
        </div>,
        root
    );
}

render();
