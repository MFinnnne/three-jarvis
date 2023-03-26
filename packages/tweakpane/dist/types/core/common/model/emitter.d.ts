declare type Handler<E> = (ev: E) => void;
/**
 * A type-safe event emitter.
 * @template E The interface that maps event names and event objects.
 */
export declare class Emitter<E> {
    private readonly observers_;
    constructor();
    /**
     * Adds an event listener to the emitter.
     * @param eventName The event name to listen.
     * @param handler The event handler.
     */
    on<EventName extends keyof E>(eventName: EventName, handler: Handler<E[EventName]>): Emitter<E>;
    /**
     * Removes an event listener from the emitter.
     * @param eventName The event name.
     * @param handler The event handler to remove.
     */
    off<EventName extends keyof E>(eventName: EventName, handler: Handler<E[EventName]>): Emitter<E>;
    emit<EventName extends keyof E>(eventName: EventName, event: E[EventName]): void;
}
export {};