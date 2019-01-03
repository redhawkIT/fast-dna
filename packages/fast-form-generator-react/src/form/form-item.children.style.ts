import { ellipsis, focusVisible, toPx } from "@microsoft/fast-jss-utilities";
import {
    applyAriaHiddenStyles,
    applyCleanListStyle,
    applyControl,
    applyGlobalStyle,
    applyInputStyle,
    applyLabelStyle,
    applyRemoveItemStyle,
    applySoftRemove,
    colors,
    insetStrongBoxShadow,
    lines,
    rightArrow,
} from "../utilities/form-input.style";
import { ComponentStyles, CSSRules } from "@microsoft/fast-jss-manager";
import { FormItemChildrenClassNameContract } from "../class-name-contracts/";

const styles: ComponentStyles<FormItemChildrenClassNameContract, {}> = {
    "@global": {
        ...applyGlobalStyle(),
    },
    formItemChildren: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
    },
    formItemChildren_control: {
        ...applyControl(),
        verticalAlign: "middle",
    },
    formItemChildren_controlLabel: {
        ...applyLabelStyle(),
        display: "block",
        marginTop: toPx(12),
    },
    formItemChildren_existingChildren: {
        ...applyCleanListStyle(),
    },
    formItemChildren_existingChildrenItem: {
        position: "relative",
        height: "48px",
        paddingLeft: "26px",
        display: "flex",
        alignItems: "center",
        "&::before": {
            position: "absolute",
            content: "''",
            opacity: ".6",
            pointerEvents: "none",
            top: "calc(50% - 8px)",
            width: toPx(16),
            height: toPx(16),
            background: lines,
            left: "0",
        },
    },
    formItemChildren_existingChildrenItemLink: {
        width: "calc(100% - 36px)",
        "&$formItemChildren_existingChildrenItemName, &$formItemChildren_existingChildrenItemContent": {
            ...ellipsis(),
            width: "100%",
            display: "inline-block",
            verticalAlign: "bottom",
        },
    },
    formItemChildren_existingChildrenItemName: {},
    formItemChildren_existingChildrenItemContent: {},
    formItemChildren_childrenList: {
        ...applyCleanListStyle(),
        ...applyAriaHiddenStyles(),
        background: colors.white,
        maxHeight: "200px",
        overflow: "auto",
        position: "absolute",
        right: "0",
        left: "0",
        zIndex: "1",
    },
    formItemChildren_childrenListItem: {
        padding: "10px 8px 10px",
        fontSize: "14px",
        textAlign: "left",
        '&[aria-selected="true"]': {
            background: colors.pink,
        },
    },
    formItemChildren_childrenListControl: {
        position: "relative",
    },
    formItemChildren_childrenListInput: {
        ...applyInputStyle(),
        marginTop: "8px",
        paddingRight: "36px",
        width: "100%",
    },
    formItemChildren_childrenListTrigger: {
        position: "absolute",
        right: "0",
        bottom: "0",
        height: "36px",
        width: "36px",
        background: rightArrow,
        transform: "rotate(90deg)",
        border: "0",
        [`&${focusVisible()}`]: {
            ...insetStrongBoxShadow(colors.pink),
            outline: "none",
        },
    },
    formItemChildren_delete: {
        ...applySoftRemove(),
        cursor: "pointer",
        position: "relative",
        verticalAlign: "middle",
    },
    formItemChildren_deleteButton: {
        ...applyRemoveItemStyle(),
        cursor: "pointer",
        top: "calc(50% - 18px)",
    },
};

export default styles;
