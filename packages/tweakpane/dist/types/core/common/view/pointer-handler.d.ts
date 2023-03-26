import { Emitter } from '../model/emitter';
/**
 * Data for pointer events.
 */
export interface PointerData {
    /**
     * The size of the bounds.
     */
    bounds: {
        height: number;
        width: number;
    };
    /**
     * The pointer coordinates.
     */
    point: {
        /**
         * The X coordinate in the element.
         */
        x: number;
        /**
         * The Y coordinate in the element.
         */
        y: number;
    } | null;
}
/**
 * An event for PointerHandler.
 */
export interface PointerHandlerEvent {
    altKey: boolean;
    data: PointerData;
    shiftKey: boolean;
    sender: PointerHandler;
}
export interface PointerHandlerEvents {
    down: PointerHandlerEvent;
    move: PointerHandlerEvent;
    up: PointerHandlerEvent;
}
/**
 * A utility class to handle both mouse and touch events.
 */
export declare class PointerHandler {
    readonly emitter: Emitter<PointerHandlerEvents>;
    private readonly elem_;
    private lastTouch_;
    constructor(element: HTMLElement);
    private computePosition_;
    private onMouseDown_;
    private onDocumentMouseMove_;
    private onDocumentMouseUp_;
    private onTouchStart_;
    private onTouchMove_;
    private onTouchEnd_;
}