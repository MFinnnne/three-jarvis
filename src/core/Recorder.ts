import objectChanged from './ObjectChanged';
import {Command} from "./Type";
import ObjectChanged from "./ObjectChanged";

/**
 * Operation records
 * @class Recorder
 */
class Recorder {
    private static instance: Recorder;

    // private operatorHistories: Command[] = [];

    public execute(cmd: Command, optionalName?: string): void {
        cmd.exec();
        ObjectChanged.getInstance().update(cmd.object);
    }
}

const recorder = new Recorder();
export default recorder;
