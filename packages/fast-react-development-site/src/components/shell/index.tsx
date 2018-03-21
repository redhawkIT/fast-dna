import * as React from "react";
import manageJss, {IInjectedProps, ComponentStyles} from "@microsoft/fast-react-jss-manager";
import {IDevSiteDesignSystem} from "../design-system";
import ShellActionBar from "./action-bar";
import ShellCanvas from "./canvas";
import ShellHeader from "./header";
import ShellPane from "./pane";
import ShellRow from "./row";

/* tslint:disable-next-line */
export interface IShellProps { }

export interface IShellManagedClasses {
    shell: string;
}

const style: ComponentStyles<IShellManagedClasses, IDevSiteDesignSystem> = {
    shell: {
        fontFamily: "Segoe UI, SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif",
        height: "100vh"
    }
};

class Shell extends React.Component<IShellProps & IInjectedProps<IShellManagedClasses>, {}> {
    public render(): JSX.Element {
        return (
            <div className={this.props.managedClasses.shell}>
                {this.props.children}
            </div>
        );
    }
}

export default manageJss(style)(Shell);
export { ShellActionBar, ShellCanvas, ShellHeader, ShellPane, ShellRow };
