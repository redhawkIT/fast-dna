import * as React from "react";
import manageJss, { ComponentStyles, IJSSManagerProps, IManagedClasses } from "@microsoft/fast-jss-manager-react";
import { IDevSiteDesignSystem } from "../design-system";

/* tslint:disable-next-line */
export interface IShellPaneCollapseProps {
    onUpdate: () => void;
}

export interface IShellPaneCollapseManagedClasses {
    shell_pane_collapse: string;
}

const style: ComponentStyles<IShellPaneCollapseManagedClasses, IDevSiteDesignSystem> = {
    shell_pane_collapse: {
        background: "blue",
        height: "48px",
        width: "48px"
    }
};

class ShellPaneCollapse extends React.Component<IShellPaneCollapseProps & IManagedClasses<IShellPaneCollapseManagedClasses>, {}> {

    public render(): JSX.Element {
        return (
            <button className={this.props.managedClasses.shell_pane_collapse} onClick={this.handleUpdateCollapse}>
                {this.props.children}
            </button>
        );
    }

    private handleUpdateCollapse = (): void => {
        if (this.props.onUpdate) {
            this.props.onUpdate();
        }
    }
}

export default manageJss(style)(ShellPaneCollapse);
