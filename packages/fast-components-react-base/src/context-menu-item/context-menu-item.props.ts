import * as React from "react";
import {
    ContextMenuItemClassNameContract,
    ManagedClasses,
} from "@microsoft/fast-components-class-name-contracts-base";
import { ContextMenuItemRole } from "./context-menu-item";
import { Omit } from "utility-types";

export interface ContextMenuItemManagedClasses
    extends ManagedClasses<ContextMenuItemClassNameContract> {}
export interface ContextMenuItemUnhandledProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {}
export interface ContextMenuItemHandledProps extends ContextMenuItemManagedClasses {
    /**
     * The children of the context menu item
     */
    children?: React.ReactNode;

    /**
     * The item's role
     */
    role?: ContextMenuItemRole;

    /**
     * If the menu item is disabled
     */
    disabled?: boolean;
}

export type ContextMenuItemProps = ContextMenuItemHandledProps &
    ContextMenuItemUnhandledProps;
