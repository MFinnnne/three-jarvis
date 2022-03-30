import { Command } from '../types/types';
import objectChanged from './ObjectChanged';


/**
 * Operation records
 * @class Recorder
 */
class Recorder {

    private static instance: Recorder;

    // private operatorHistories: Command[] = [];

    public execute(cmd: Command, optionalName?: string): void {
        cmd.exec();
        // this.operatorHistories.push(cmd);
        objectChanged.update(cmd.object);
    }
}

const recorder = new Recorder();
export default recorder;
