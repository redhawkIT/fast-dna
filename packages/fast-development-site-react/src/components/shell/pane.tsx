import * as React from "react";
import manageJss, { ComponentStyles, IJSSManagerProps, IManagedClasses } from "@microsoft/fast-jss-manager-react";
import { toPx } from "@microsoft/fast-jss-utilities";
import { IDevSiteDesignSystem } from "../design-system";

export interface IShellPaneProps {
    collapsed?: boolean;
}

export interface IShellPaneManagedClasses {
    shellPane: string;
    shellPane__collapsed: string;
    shellPane__expanded: string;
}

const style: ComponentStyles<IShellPaneManagedClasses, IDevSiteDesignSystem> = {
    shellPane: {
        display: "inline-block",
        overflow: "hidden",
        backgroundColor: (config: IDevSiteDesignSystem): string => {
            return config.lightGray;
        }
    },
    shellPane__collapsed: {
        width: toPx(40),
    },
    shellPane__expanded: {
        width: toPx(300)
    }
};

class ShellPane extends React.Component<IShellPaneProps & IManagedClasses<IShellPaneManagedClasses>, {}> {

    public render(): JSX.Element {
        return (
            <div className={this.props.managedClasses.shellPane}>
                <div className={this.getInnerDivClassNames()}>
                    {this.props.children}
                </div>
            </div>
        );
    }

    private getInnerDivClassNames(): string {
        return this.props.collapsed ? this.props.managedClasses.shellPane__collapsed : this.props.managedClasses.shellPane__expanded;
    }
}

export default manageJss(style)(ShellPane);
