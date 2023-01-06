import ObjectChanged from './ObjectChanged';
import { Command } from './Type';
import Jarvis from './Jarvis';

type afterExecuteCallBack = (cmd: Command, optionalName?: string) => void;
/**
 * Operation records
 * @class Recorder
 */
export default class Recorder {
    private jarvis: Jarvis;

    private _afterExecute: afterExecuteCallBack[] = [];
    get afterExecute(): afterExecuteCallBack[] {
        return this._afterExecute;
    }

    constructor(jarvis: Jarvis) {
        this.jarvis = jarvis;
    }

    public execute(cmd: Command, optionalName?: string): void {
        cmd.exec();
        ObjectChanged.getInstance().update(cmd.object);
        this.afterExecute.forEach((fn) => {
            fn(cmd, optionalName);
        });
    }

    public;
}
