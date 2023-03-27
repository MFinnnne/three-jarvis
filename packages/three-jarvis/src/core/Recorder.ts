import ObjectChanged from './ObjectChanged';
import { Command } from './Type';

type afterExecuteCallBack = (cmd: Command, optionalName?: string) => void;
/**
 * Operation records
 * @class Recorder
 */
export default class Recorder {
    private undoStack: Command[] = [];
    private redoStack: Command[] = [];

    private _afterExecute: afterExecuteCallBack[] = [];
    get afterExecute(): afterExecuteCallBack[] {
        return this._afterExecute;
    }

    public execute(cmd: Command, optionalName?: string): void {
        cmd.exec();
        ObjectChanged.getInstance().update(cmd.object);
        this.afterExecute.forEach((fn) => {
            fn(cmd, optionalName);
        });
        this.undoStack.push(cmd);
    }

    public undo() {
        const command = this.undoStack.pop();
        if (command) {
            command.undo();
            this.redoStack.push(command);
            ObjectChanged.getInstance().update(command.object);
        }
    }

    public redo() {
        const command = this.redoStack.pop();
        if (command) {
            command.exec();
            ObjectChanged.getInstance().update(command.object);
        }
    }
}
