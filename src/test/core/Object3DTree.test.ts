import { BoxGeometry, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, PointLight, Scene } from 'three';
import { Object3DTree, VNodeTree } from '../../app/Object3DTree';

function checkModelDataTree(vNodeTree: VNodeTree) {
    expect(vNodeTree.self.tagName).toBe('div');
    expect(vNodeTree.self.className).toBeDefined();
    expect(vNodeTree.self.id).toBeDefined();
    vNodeTree.children?.forEach((child) => {
        checkModelDataTree(child);
    });
}

describe('test vom', () => {
    test('should parse three scene to vnode tree', () => {
        const scene = new Scene();
        const pointLight = new PointLight(0xffffff, 1, 100, 2);
        scene.add(pointLight);
        const perspectiveCamera = new PerspectiveCamera(45, 1920 / 1080, 0.1, 1000);
        scene.add(perspectiveCamera);
        const group = new Group();
        const boxGeometry1 = new BoxGeometry(1, 1, 1);
        const material1 = new MeshBasicMaterial({ color: 0x00ff00 });
        const mesh3 = new Mesh(boxGeometry1, material1);
        group.add(mesh3);
        scene.add(group);
        const vNodeTree1 = Object3DTree.threeObject2VNodeTree(scene);
        Object3DTree.print(vNodeTree1);
        checkModelDataTree(vNodeTree1);
    });
});
