import Monitor from "./Monitor";
import {Clock} from "three";

export class MonitorWrapper {

	private _monitor: Monitor;
	private clock: Clock = new Clock();

	constructor(monitor: Monitor) {
		this._monitor = monitor;
	}

	public fps(): void {
		this._monitor.fps = 1 / this.clock.getDelta();
	}
}
