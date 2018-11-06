import "jest";
import { get } from "lodash-es";
import {
    ChildOptionItem,
    getDataLocationsOfChildren,
    mapDataToComponent,
    mapSchemaLocationFromDataLocation,
} from "./";

import Children from "./__tests__/components/children";
import General from "./__tests__/components/general-example";
import TextField from "./__tests__/components/text-field";

import * as alignHorizontalSchema from "./__tests__/schemas/align-horizontal.schema.json";
import * as arraysSchema from "./__tests__/schemas/arrays.schema.json";
import * as generalSchema from "./__tests__/schemas/general-example.schema.json";
import * as anyOfSchema from "./__tests__/schemas/any-of.schema.json";
import * as childrenSchema from "./__tests__/schemas/children.schema.json";
import * as textFieldSchema from "./__tests__/schemas/text-field.schema.json";

/**
 * Map schema location from data location
 */
describe("mapSchemaLocationFromDataLocation", () => {
    test("should return a schema location from a root data location", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "",
            {},
            alignHorizontalSchema
        );

        expect(schemaLocation).toBe("");
    });
    test("should return a schema location from a nested property", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "alignHorizontal",
            { alignHorizontal: "left" },
            alignHorizontalSchema
        );

        expect(schemaLocation).toBe("properties.alignHorizontal");
    });
    test("should return a schema location from an array", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "strings[0]",
            { strings: ["a"] },
            arraysSchema
        );

        expect(schemaLocation).toBe("properties.strings.items");
    });
    test("should return a schema location from a nested array item", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "objects[1].string",
            { objects: [{ string: "foo" }, { string: "bar" }] },
            arraysSchema
        );

        expect(schemaLocation).toBe("properties.objects.items.properties.string");
    });
    test("should return a schema location from anyOf/oneOf locations", () => {
        const schemaLocationRoot: string = mapSchemaLocationFromDataLocation(
            "",
            { number: 5 },
            anyOfSchema
        );
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "number",
            { number: 5 },
            anyOfSchema
        );

        expect(schemaLocationRoot).toBe("");
        expect(schemaLocation).toBe("anyOf.1.properties.number");
    });
    test("should return a schema location from a nested anyOf/oneOf location", () => {
        const schemaLocationRootProperty: string = mapSchemaLocationFromDataLocation(
            "nestedAnyOf",
            { nestedAnyOf: { string: "foo" } },
            anyOfSchema
        );
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "nestedAnyOf.string",
            { nestedAnyOf: { string: "foo" } },
            anyOfSchema
        );

        expect(schemaLocationRootProperty).toBe("anyOf.2.properties.nestedAnyOf");
        expect(schemaLocation).toBe(
            "anyOf.2.properties.nestedAnyOf.anyOf.1.properties.string"
        );
    });
    test("should return a schema location from a child location", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "children",
            { children: { id: childrenSchema.id, props: {} } },
            childrenSchema
        );

        expect(schemaLocation).toBe("reactProperties.children");
    });
    test("should return a schema location from a child location", () => {
        const schemaLocationComponent: string = mapSchemaLocationFromDataLocation(
            "children",
            { children: { id: childrenSchema.id, props: {} } },
            childrenSchema
        );
        const schemaLocationString: string = mapSchemaLocationFromDataLocation(
            "children",
            { children: "Hello world" },
            childrenSchema
        );

        expect(schemaLocationComponent).toBe("reactProperties.children");
        expect(schemaLocationString).toBe("reactProperties.children");
    });
    test("should return a schema location from children locations", () => {
        const schemaLocationComponent: string = mapSchemaLocationFromDataLocation(
            "children[0]",
            { children: [{ id: childrenSchema.id, props: {} }, "Hello world"] },
            childrenSchema
        );
        const schemaLocationString: string = mapSchemaLocationFromDataLocation(
            "children[1]",
            { children: [{ id: childrenSchema.id, props: {} }, "Hello world"] },
            childrenSchema
        );

        expect(schemaLocationComponent).toBe("reactProperties.children");
        expect(schemaLocationString).toBe("reactProperties.children");
    });
});

describe("getDataLocationsOfChildren", () => {
    const childOptions: ChildOptionItem[] = [
        {
            component: Children,
            schema: childrenSchema,
        },
        {
            component: TextField,
            schema: textFieldSchema,
        },
        { component: General, schema: generalSchema },
    ];

    test("should return the data location of a single react child", () => {
        const data: any = {
            children: {
                id: childrenSchema.id,
                props: {},
            },
        };

        const dataLocationsOfReactChildren: string[] = getDataLocationsOfChildren(
            childrenSchema,
            data,
            childOptions
        );

        expect(dataLocationsOfReactChildren.length).toBe(1);
        expect(dataLocationsOfReactChildren[0]).toBe("children");
    });
    test("should return the data location of a nested react child", () => {
        const data: any = {
            children: {
                id: childrenSchema.id,
                props: {
                    children: {
                        id: generalSchema.id,
                        props: {
                            children: {
                                id: textFieldSchema.id,
                                props: {},
                            },
                        },
                    },
                },
            },
        };

        const dataLocationsOfReactChildren: string[] = getDataLocationsOfChildren(
            childrenSchema,
            data,
            childOptions
        );

        expect(dataLocationsOfReactChildren.length).toBe(3);
        expect(dataLocationsOfReactChildren[0]).toBe("children");
        expect(dataLocationsOfReactChildren[1]).toBe("children.props.children");
        expect(dataLocationsOfReactChildren[2]).toBe(
            "children.props.children.props.children"
        );
    });
    test("should return the data locations of multiple children", () => {
        const data: any = {
            children: [
                {
                    id: childrenSchema.id,
                    props: {
                        children: {
                            id: childrenSchema.id,
                            props: {
                                children: {
                                    id: childrenSchema.id,
                                    props: {},
                                },
                            },
                        },
                    },
                },
                {
                    id: childrenSchema.id,
                    props: {},
                },
            ],
        };

        const dataLocationsOfReactChildren: string[] = getDataLocationsOfChildren(
            childrenSchema,
            data,
            childOptions
        );

        expect(dataLocationsOfReactChildren.length).toBe(4);
        expect(dataLocationsOfReactChildren[0]).toBe("children[0]");
        expect(dataLocationsOfReactChildren[1]).toBe("children[1]");
        expect(dataLocationsOfReactChildren[2]).toBe("children[0].props.children");
        expect(dataLocationsOfReactChildren[3]).toBe(
            "children[0].props.children.props.children"
        );
    });
    test("should return data locations of nested react child with multiple children", () => {
        const data: any = {
            children: {
                id: childrenSchema.id,
                props: {
                    children: {
                        id: childrenSchema.id,
                        props: {
                            children: [
                                {
                                    id: childrenSchema.id,
                                    props: {},
                                },
                                {
                                    id: childrenSchema.id,
                                    props: {},
                                },
                            ],
                        },
                    },
                },
            },
        };

        const dataLocationsOfReactChildren: string[] = getDataLocationsOfChildren(
            childrenSchema,
            data,
            childOptions
        );

        expect(dataLocationsOfReactChildren.length).toBe(4);
        expect(dataLocationsOfReactChildren[0]).toBe("children");
        expect(dataLocationsOfReactChildren[1]).toBe("children.props.children");
        expect(dataLocationsOfReactChildren[2]).toBe(
            "children.props.children.props.children[0]"
        );
        expect(dataLocationsOfReactChildren[3]).toBe(
            "children.props.children.props.children[1]"
        );
    });
    test("should return data locations of an array of nested react children with multiple children", () => {
        const data: any = {
            children: [
                {
                    id: childrenSchema.id,
                    props: {
                        children: {
                            id: childrenSchema.id,
                            props: {
                                children: [
                                    {
                                        id: childrenSchema.id,
                                        props: {},
                                    },
                                    {
                                        id: childrenSchema.id,
                                        props: {},
                                    },
                                ],
                            },
                        },
                    },
                },
            ],
        };

        const dataLocationsOfReactChildren: string[] = getDataLocationsOfChildren(
            childrenSchema,
            data,
            childOptions
        );

        expect(dataLocationsOfReactChildren.length).toBe(4);
        expect(dataLocationsOfReactChildren[0]).toBe("children[0]");
        expect(dataLocationsOfReactChildren[1]).toBe("children[0].props.children");
        expect(dataLocationsOfReactChildren[2]).toBe(
            "children[0].props.children.props.children[0]"
        );
        expect(dataLocationsOfReactChildren[3]).toBe(
            "children[0].props.children.props.children[1]"
        );
    });
});

describe("mapDataToComponent", () => {
    const childOptions: ChildOptionItem[] = [
        { component: Children, schema: childrenSchema },
        { component: TextField, schema: textFieldSchema },
    ];

    test("should map data to a child", () => {
        const textString: string = "Hello world";
        const data: any = {
            children: {
                id: childrenSchema.id,
                props: {},
            },
        };
        const dataWithChildString: any = {
            children: textString,
        };

        const mappedData: any = mapDataToComponent(childrenSchema, data, childOptions);
        const mappedDataWithChildString: any = mapDataToComponent(
            childrenSchema,
            dataWithChildString,
            childOptions
        );

        expect(typeof get(mappedData, "children.type")).toBe("function");
        expect(get(mappedData, "children.type.displayName")).toBe("Children");
        expect(typeof get(mappedDataWithChildString, "children")).toBe("string");
        expect(get(mappedDataWithChildString, "children")).toBe(textString);
    });
    test("should map data to multiple children", () => {
        const data: any = {
            children: [
                {
                    id: childrenSchema.id,
                    props: {},
                },
                "Hello pluto",
            ],
        };

        const mappedData: any = mapDataToComponent(childrenSchema, data, childOptions);

        expect(typeof get(mappedData, "children[0].type")).toBe("function");
        expect(get(mappedData, "children[0].type.displayName")).toBe("Children");
        expect(typeof get(mappedData, "children[1]")).toBe("string");
        expect(get(mappedData, "children[1]")).toBe("Hello pluto");
    });
    test("should map data to nested children", () => {
        const data: any = {
            children: [
                {
                    id: childrenSchema.id,
                    props: {
                        children: {
                            id: textFieldSchema.id,
                            props: {},
                        },
                    },
                },
                {
                    id: textFieldSchema.id,
                    props: {},
                },
            ],
        };

        const mappedData: any = mapDataToComponent(childrenSchema, data, childOptions);

        expect(typeof get(mappedData, "children[0].type")).toBe("function");
        expect(get(mappedData, "children[0].type.displayName")).toBe("Children");
        expect(typeof get(mappedData, "children[0].props.children.type")).toBe(
            "function"
        );
        expect(get(mappedData, "children[0].props.children.type.displayName")).toBe(
            "Text field"
        );
        expect(typeof get(mappedData, "children[1].type")).toBe("function");
        expect(get(mappedData, "children[1].type.displayName")).toBe("Text field");
    });
});
