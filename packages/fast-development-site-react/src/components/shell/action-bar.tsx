import * as React from "react";
import manageJss, { IInjectedProps, ComponentStyles } from "@microsoft/fast-jss-manager-react";
import {IDevSiteDesignSystem} from "../design-system";

/* tslint:disable-next-line */
export interface IShellActionBarProps {}

export interface IShellActionBarManagedClasses {
    shell__action_bar: string;
}

const style: ComponentStyles<IShellActionBarManagedClasses, IDevSiteDesignSystem> = {
    shell__action_bar: {
        background: (config: IDevSiteDesignSystem): string => {
            return config.lightGrey;
        },
        padding: (config: IDevSiteDesignSystem): string => {
            return `${config.navigationBarHeight / 4}px`;
        },
        minHeight: (config: IDevSiteDesignSystem): string => {
            return `${config.navigationBarHeight / 2}px`;
        }
    }
};

class ShellActionBar extends React.Component<IShellActionBarProps & IInjectedProps<IShellActionBarManagedClasses>, {}> {

    public render(): JSX.Element {
        return (
            <div className={this.props.managedClasses.shell__action_bar}>
                {this.props.children}
            </div>
        );
    }
}

export default manageJss(style)(ShellActionBar);
