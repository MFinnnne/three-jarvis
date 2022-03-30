import {Command} from "../types/types";

class Recorder {

    public execute(cmd: Command, optionalName): void {
        cmd.exec()
    }
}
