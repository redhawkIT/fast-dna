import { IDesignSystem, withDesignSystemDefaults } from "../design-system";
import { ComponentStyles, ComponentStyleSheet } from "@microsoft/fast-jss-manager";
import { IDialogClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { toPx } from "@microsoft/fast-jss-utilities";
import { get } from "lodash-es";
import Chroma from "chroma-js";
import { applyAcrylicMaterial } from "../utilities/acrylic";

/* tslint:disable-next-line */
const styles: ComponentStyles<IDialogClassNameContract, IDesignSystem> = (config: IDesignSystem): ComponentStyleSheet<IDialogClassNameContract, IDesignSystem> => {
    const designSystem: IDesignSystem = withDesignSystemDefaults(config);
    const backgroundColor: string = designSystem.backgroundColor;
    const foregroundColor: string = designSystem.foregroundColor;
    const dialogShadow: string =
        `0 25.6px 57.6px ${Chroma(foregroundColor).alpha(0.22).css()},
         0 4.8px 14.4px ${Chroma(foregroundColor).alpha(0.18).css()}`;

    return {
        dialog: {
            display: "none",
            "&[aria-hidden=\"false\"]": {
                display: "block"
            }
        },
        dialog_modalOverlay: {
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            ...applyAcrylicMaterial(backgroundColor, 0.6, 0.9, true)
        },
        dialog_contentRegion: {
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: backgroundColor,
            boxShadow: dialogShadow
        }
    };
};

export default styles;
