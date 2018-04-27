import * as React from "react";
import { IFormItemComponentMappingToProperyNamesProps } from "./form-item";

/**
 * Schema form component definition
 * @extends React.Component
 */
class FormItemAlignHorizontal extends React.Component<IFormItemComponentMappingToProperyNamesProps, {}> {

    public render(): JSX.Element {
        return (
            <div>
                <label htmlFor="alignHorizontal">{this.props.label}</label>
                <div>
                    {this.renderInput("left", 1)}
                    {this.renderInput("center", 2)}
                    {this.renderInput("right", 3)}
                </div>
            </div>
        );
    }

    private onChange = (value: string): void => {
        this.props.onChange(this.props.dataLocation, value);
    }

    private isChecked(direction: string): boolean {
        return this.props.data === direction || (typeof this.props.data === "undefined" && this.props.default === direction);
    }

    private renderInput(direction: string, index: number): JSX.Element {
        if (this.props.options && Array.isArray(this.props.options)) {
            const option: string = this.props.options.find((item: string) => {
                return item === direction;
            });

            if (typeof option !== "undefined") {
                return (
                    <span>
                        <input
                            id={`alignHorizontal${index}`}
                            type="radio"
                            value={direction}
                            name="alignHorizontal"
                            aria-label={`${direction} align`}
                            onChange={this.onChange.bind(this, direction)}
                            checked={this.isChecked(direction)}
                        />
                    </span>
                );
            }
        }
    }
}

export default FormItemAlignHorizontal;
