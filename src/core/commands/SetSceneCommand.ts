import {Command} from "../../types/types";

export default class SetSceneCommand implements Command{
    name: string='set scene';

    exec(): void {
    }

    undo(): void {
    }

}
