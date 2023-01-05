import ObjectChanged from "./ObjectChanged";
import { Command } from "./Type";

/**
 * Operation records
 * @class Recorder
 */
export  default  class Recorder {
    private static instance: Recorder;


    // private operatorHistories: Command[] = [];


    public execute(cmd: Command, optionalName?: string): void {
        cmd.exec();
        ObjectChanged.getInstance().update(cmd.object);
    }
}

