import designSystemDefaults, { IDesignSystem } from "../design-system";
import { ComponentStyles, ComponentStyleSheet } from "@microsoft/fast-jss-manager";
import { IDialogClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { toPx } from "@microsoft/fast-jss-utilities";
import { get } from "lodash-es";
import Chroma from "chroma-js";
import { applyAcrylicMaterial } from "../utilities/acrylic";

/* tslint:disable-next-line */
const styles: ComponentStyles<IDialogClassNameContract, IDesignSystem> = (config: IDesignSystem): ComponentStyleSheet<IDialogClassNameContract, IDesignSystem> => {
    const backgroundColor: string = get(config, "backgroundColor") || designSystemDefaults.backgroundColor;
    const foregroundColor: string = get(config, "foregroundColor") || designSystemDefaults.foregroundColor;
    const dialogShadow: string =
        `${toPx(0)} ${toPx(25.6)} ${toPx(57.6)} ${Chroma(foregroundColor).alpha(0.22).css()},
         ${toPx(0)} ${toPx(4.8)} ${toPx(14.4)} ${Chroma(foregroundColor).alpha(0.18).css()}`;

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
