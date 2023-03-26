export declare const TestUtil: {
    createEvent: (win: Window, type: string, options?: Record<string, unknown>) => Event;
    createKeyboardEvent: (win: Window, type: string, options: Record<string, unknown>) => Event;
    closeTo: (actual: number, expected: number, delta: number) => boolean;
};
