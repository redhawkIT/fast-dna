import * as React from "react";
import { ISnapshotTestSuite } from "@microsoft/fast-jest-snapshots-react";
import { IManagedClasses } from "@microsoft/fast-jss-manager-react";
import Button from "./index";
import { IButtonHandledProps as IBaseButtonHandledProps } from "@microsoft/fast-components-react-base";
import {
    ButtonProps,
    IButtonHandledProps,
    IButtonManagedClasses,
    IButtonUnhandledProps
} from "./button.props";
import * as schema from "./button.schema.json";

export default {
    name: "button",
    component: Button,
    schema: schema as any,
    data: [
        {
            children: "Default button"
        },
        {
            primary: true,
            children: "Primary (submit) button"
        },
        {
            outline: true,
            children: "Outline button"
        },
        {
            lightweight: true,
            children: "Lightweight button"
        },
        {
            justified: true,
            children: "Justified button"
        },
        {
            href: "#",
            children: "Anchor"
        },
        {
            disabled: true,
            children: "Default button"
        },
        {
            disabled: true,
            primary: true,
            children: "Primary (submit) button"
        },
        {
            disabled: true,
            outline: true,
            children: "Outline button"
        },
        {
            disabled: true,
            lightweight: true,
            children: "Lightweight button"
        },
        {
            disabled: true,
            justified: true,
            children: "Justified button"
        },
        {
            disabled: true,
            href: "#",
            children: "Anchor"
        }
    ]
} as ISnapshotTestSuite<IButtonHandledProps>;
