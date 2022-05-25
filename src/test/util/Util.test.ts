import { Object3D, Scene } from 'three';
import Utils from '../../util/Utils';

describe('test utils', () => {
    test('should count model', () => {
        const scene = new Scene();
        scene.add(new Object3D());
        scene.add(new Object3D());
        const object3D = new Object3D();
        object3D.add(new Object3D());
        scene.add(object3D);
        const number = Utils.countAllModels(scene);
        expect(number).toBe(5);
    });
});
