import * as React from "react";
import * as ReactDOM from "react-dom";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { CheckboxHandledProps, CheckboxManagedClasses, CheckboxProps, CheckboxTag, CheckboxUnhandledProps } from "./checkbox.props";
import { CheckboxClassNameContract, ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import { get } from "lodash-es";

/**
 * Checkbox state interface
 */
export interface CheckboxState {
    checked: boolean;
}

class Checkbox extends Foundation<
    CheckboxHandledProps,
    CheckboxUnhandledProps,
    CheckboxState
> {
    public static displayName: string = "Checkbox";

    /**
     * React life-cycle method
     */
    public static getDerivedStateFromProps(nextProps: CheckboxProps, prevState: CheckboxState): null | Partial<CheckboxState> {
        if (typeof nextProps.checked === "boolean" && nextProps.checked !== prevState.checked) {
            return {
                checked: nextProps.checked
            };
        }

        return null;
    }

    /**
     * Handled props instantiation
     */
    protected handledProps: HandledProps<CheckboxHandledProps> = {
        checked: void 0,
        disabled: void 0,
        indeterminate: void 0,
        managedClasses: void 0,
        onChange: void 0,
        tag: void 0
    };

    /**
     * Provides reference to input
     */
    private inputRef: React.RefObject<HTMLInputElement>;

    /**
     * Define constructor
     */
    constructor(props: CheckboxProps) {
        super(props);

        this.state = {
            checked: this.props.checked || false
        };

        this.inputRef = React.createRef();
    }

    /**
     * React life-cycle method
     */
    public componentDidMount(): void {
        this.applyIndeterminateState();
    }

    /**
     * React life-cycle method
     */
    public componentDidUpdate(): void {
        this.applyIndeterminateState();
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLElement> {
        return (
            <this.tag
                {...this.unhandledProps()}
                className={this.generateClassNames()}
            >
                <input
                    className={get(this.props, "managedClasses.checkbox_input")}
                    type="checkbox"
                    ref={this.inputRef}
                    onChange={this.handleCheckboxChange}
                    disabled={this.props.disabled || null}
                    checked={this.state.checked}
                />
                <span className={get(this.props, "managedClasses.checkbox_stateIndicator")} />
                {this.renderLabel()}
            </this.tag>
        );
    }

    /**
     * Generates class names
     */
    protected generateClassNames(): string {
        let classes: string = get(this.props, "managedClasses.checkbox");

        classes = this.props.disabled ? `${classes} ${get(this.props, "managedClasses.checkbox__disabled")}` : classes;

        return super.generateClassNames(classes);
    }

    /**
     * Stores HTML tag for use in render
     */
    private get tag(): string {
        return CheckboxTag[this.props.tag] || CheckboxTag.label;
    }

    /**
     * Render label if it exists
     */
    private renderLabel(): JSX.Element {
        if (this.props.children) {
            return (
                <span className={get(this.props, "managedClasses.checkbox_label")}>
                    {this.props.children}
                </span>
            );
        }
    }

    /**
     * Apply indeterminate state to items that are indeterminate.
     * This method should be called after render because it relies on element references.
     */
    private applyIndeterminateState(): void {
         if (this.props.indeterminate && this.inputRef.current) {
            this.inputRef.current.indeterminate = this.props.indeterminate;
        }
    }

    /**
     * Handles onChange as a controlled component
     */
    private handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (typeof this.props.checked !== "boolean") {
            this.setState({checked: !this.state.checked});
        }

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }
}

export default Checkbox;
export * from "./checkbox.props";
export { CheckboxClassNameContract };
