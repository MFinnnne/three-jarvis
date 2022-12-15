import objectChanged from './ObjectChanged';
import {Command} from "./Type";

/**
 * Operation records
 * @class Recorder
 */
class Recorder {
    private static instance: Recorder;

    // private operatorHistories: Command[] = [];

    public execute(cmd: Command, optionalName?: string): void {
        cmd.exec();
        objectChanged.update(cmd.object);
    }
}

const recorder = new Recorder();
export default recorder;
