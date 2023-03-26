import { Emitter } from '../../model/emitter';
import { Ticker, TickerEvents } from './ticker';
/**
 * @hidden
 */
export declare class ManualTicker implements Ticker {
    readonly emitter: Emitter<TickerEvents>;
    disabled: boolean;
    constructor();
    dispose(): void;
    tick(): void;
}
