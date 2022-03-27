import {Pane} from 'tweakpane';

export default class ControlPanel {

    public init(): void {
        const PARAMS = {
            factor: 123,
            title: 'hello',
            color: '#0f0',
        };

        const pane = new Pane(PARAMS);
        pane.addInput(PARAMS, 'factor');
        pane.addInput(PARAMS, 'title');
        pane.addInput(PARAMS, 'color');

    }
}
