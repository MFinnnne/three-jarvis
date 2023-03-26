import { Emitter } from '../../model/emitter';
import { Ticker, TickerEvents } from './ticker';
/**
 * @hidden
 */
export declare class IntervalTicker implements Ticker {
    readonly emitter: Emitter<TickerEvents>;
    private readonly interval_;
    private readonly doc_;
    private disabled_;
    private timerId_;
    constructor(doc: Document, interval: number);
    get disabled(): boolean;
    set disabled(inactive: boolean);
    dispose(): void;
    private clearTimer_;
    private setTimer_;
    private onTick_;
}
