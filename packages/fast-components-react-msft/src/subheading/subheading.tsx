import * as React from "react";
import { get } from "lodash-es";
import { Foundation, HandledProps, TypographySize, TypographyTag  } from "@microsoft/fast-components-react-base";
import {
    ISubheadingHandledProps,
    ISubheadingManagedClasses,
    ISubheadingUnhandledProps,
    SubheadingLevel,
    SubheadingTag
} from "./subheading.props";

import { Typography } from "../typography";
import { IManagedClasses, ISubheadingClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";

class Subheading extends Foundation<
    ISubheadingHandledProps & IManagedClasses<ISubheadingClassNameContract>,
    React.HTMLAttributes<HTMLElement>,
    {}
> {
    public static defaultProps: Partial<ISubheadingHandledProps> = {
        size: SubheadingLevel._1,
        tag: SubheadingTag.h3
    };

    public static displayName: string = "Subheading";

    protected handledProps: HandledProps<ISubheadingHandledProps & IManagedClasses<ISubheadingClassNameContract>> = {
        size: void 0,
        managedClasses: void 0,
        tag: void 0
    };

    private get size(): TypographySize {
        switch (this.props.size) {
            case SubheadingLevel._1:
                return TypographySize._3;
            case SubheadingLevel._2:
                return TypographySize._4;
            case SubheadingLevel._3:
                return TypographySize._5;
            case SubheadingLevel._4:
                return TypographySize._6;
            case SubheadingLevel._5:
                return TypographySize._7;
            case SubheadingLevel._6:
                return TypographySize._8;
        }
    }

    public render(): React.ReactElement<HTMLHeadingElement | HTMLParagraphElement> {
        return (
            <Typography
                {...this.unhandledProps()}
                tag={TypographyTag[this.props.tag]}
                size={this.size}
                className={this.generateClassNames()}
            >
                {this.props.children}
            </Typography>
        );
    }

    protected generateClassNames(): string {
        /* tslint:disable-next-line */
        return super.generateClassNames(`${get(this.props, "managedClasses.subheading")} ${get(this.props, `managedClasses.subheading__${this.props.size}`)}`);
    }
}

export default Subheading;
export * from "./subheading.props";
export { ISubheadingClassNameContract };
