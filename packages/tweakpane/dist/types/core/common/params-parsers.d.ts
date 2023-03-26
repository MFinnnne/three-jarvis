declare type ParamsParsingResult<T> = {
    succeeded: true;
    value: T | undefined;
} | {
    succeeded: false;
    value: undefined;
};
export declare type ParamsParser<T> = (value: unknown) => ParamsParsingResult<T>;
export declare const ParamsParsers: {
    optional: {
        custom: <T>(parse: (value: unknown) => T | undefined) => ParamsParser<T>;
        boolean: ParamsParser<boolean>;
        number: ParamsParser<number>;
        string: ParamsParser<string>;
        function: ParamsParser<Function>;
        constant: <T_1>(value: T_1) => ParamsParser<T_1>;
        raw: ParamsParser<unknown>;
        object: <O extends Record<string, unknown>>(keyToParserMap: { [Key in keyof O]: ParamsParser<O[Key]>; }) => ParamsParser<O>;
        array: <T_2>(itemParser: ParamsParser<T_2>) => ParamsParser<T_2[]>;
    };
    required: {
        custom: <T>(parse: (value: unknown) => T | undefined) => ParamsParser<T>;
        boolean: ParamsParser<boolean>;
        number: ParamsParser<number>;
        string: ParamsParser<string>;
        function: ParamsParser<Function>;
        constant: <T_1>(value: T_1) => ParamsParser<T_1>;
        raw: ParamsParser<unknown>;
        object: <O extends Record<string, unknown>>(keyToParserMap: { [Key in keyof O]: ParamsParser<O[Key]>; }) => ParamsParser<O>;
        array: <T_2>(itemParser: ParamsParser<T_2>) => ParamsParser<T_2[]>;
    };
};
export declare function parseParams<O extends Record<string, unknown>>(value: Record<string, unknown>, keyToParserMap: {
    [Key in keyof O]: ParamsParser<O[Key]>;
}): O | undefined;
export {};
