import { Command } from '../../types/types';

export default class SetSceneCommand implements Command {
    name = 'set scene';

    exec(): void {}

    undo(): void {}
}
