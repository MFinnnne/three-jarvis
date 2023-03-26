export declare type Class<T> = new (...args: any[]) => T;
export declare type Tuple3<T> = [T, T, T];
export declare type Tuple4<T> = [T, T, T, T];
export declare function forceCast<T>(v: any): T;
export declare function isEmpty<T>(value: T | null | undefined): value is null | undefined;
export declare function deepEqualsArray<T>(a1: T[], a2: T[]): boolean;
export declare function isPropertyWritable(obj: unknown, key: string): boolean;