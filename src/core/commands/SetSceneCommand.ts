import {Command} from "../Type";

export default class SetSceneCommand implements Command {
    name = 'set scene';

    exec(): void {}

    undo(): void {}
}
