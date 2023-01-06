import { m, VNode } from 'million';
import Jarvis from '../../core/Jarvis';
import { LoaderUtils } from '../../util/LoadUtils';
import * as THREE from 'three';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';
import PromiseFileReader from '../../util/PromiseFileReader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import AddObjectCommand from '../../core/commands/AddObjectCommand';
import { MeshoptDecoder } from '../../core/jsm/meshopt_decoder.module';

export default class MenuBarImport {
    private readonly jarvis: Jarvis;

    constructor(jarvis: Jarvis) {
        this.jarvis = jarvis;
    }

    element(): VNode {
        return m(
            'div',
            {
                className: 'menu-item',
            },
            [
                m(
                    'div',
                    {
                        className: 'tag import',
                    },
                    [
                        m('input', {
                            type: 'file',
                            id: 'file',
                            style: 'display:none',
                            multiple: true,
                            onchange: (e) => {
                                this.onClick('import', e);
                            },
                        }),
                        m(
                            'label',
                            {
                                for: 'file',
                            },
                            ['import'],
                        ),
                    ],
                ),
            ],
        );
    }

    private onClick(type, e) {
        if (type === 'import') {
            this.importModel(e);
        }
    }

    private importModel(e) {
        const files = (e.target as any).files;
        if (files.length > 0) {
            const filesMap = LoaderUtils.createFilesMap(files);
            const manager = new THREE.LoadingManager();
            manager.setURLModifier(function (url) {
                url = url.replace(/^(\.?\/)/, '');
                const file = filesMap[url];
                if (file) {
                    console.log('Loading', url);
                    return URL.createObjectURL(file);
                }
                return url;
            });
            manager.addHandler(/\.tga$/i, new TGALoader());

            for (let i = 0; i < files.length; i++) {
                const jarvis = this.jarvis;
                PromiseFileReader.readAsArrayBuffer(files[i]).then((event) => {
                    const extension = files[i].name.split('.').pop().toLowerCase();
                    const filename = files[i].name;
                    console.log(`file type:${extension}`);
                    switch (extension) {
                        case 'glb': {
                            const contents = event;
                            const dracoLoader = new DRACOLoader();
                            dracoLoader.setDecoderPath('three/examples/js/libs/draco/gltf/');
                            const loader = new GLTFLoader();
                            loader.setMeshoptDecoder(MeshoptDecoder);
                            loader.setDRACOLoader(dracoLoader);
                            loader.parse(contents as any, '', function (result) {
                                const scene = result.scene;
                                scene.name = filename;
                                scene.animations.push(...result.animations);
                                jarvis.recorder.execute(new AddObjectCommand(jarvis.state.selectedObject, scene));
                            });
                            break;
                        }
                        case 'gltf': {
                            const contents = event;
                            let loader;
                            if (this.isGLTF1(contents)) {
                                alert(
                                    'Import of glTF asset not possible. Only versions >= 2.0 are supported. Please try to upgrade the file to glTF 2.0 using glTF-Pipeline.',
                                );
                            } else {
                                const dracoLoader = new DRACOLoader();
                                dracoLoader.setDecoderPath('three/examples/js/libs/draco/gltf/');
                                loader = new GLTFLoader(manager);
                                loader.setDRACOLoader(dracoLoader);
                            }
                            loader.parse(contents, '', function (result) {
                                const scene = result.scene;
                                scene.name = filename;
                                scene.animations.push(...result.animations);
                                jarvis.recorder.execute(new AddObjectCommand(jarvis.state.selectedObject, scene));
                            });
                            break;
                        }
                    }
                });
            }
        }
    }

    private isGLTF1(contents) {
        let resultContent;
        if (typeof contents === 'string') {
            // contents is a JSON string
            resultContent = contents;
        } else {
            const magic = THREE.LoaderUtils.decodeText(new Uint8Array(contents, 0, 4));
            if (magic === 'glTF') {
                // contents is a .glb file; extract the version
                const version = new DataView(contents).getUint32(4, true);
                return version < 2;
            } else {
                // contents is a .gltf file
                resultContent = THREE.LoaderUtils.decodeText(new Uint8Array(contents));
            }
        }
        const json = JSON.parse(resultContent);
        return json.asset != undefined && json.asset.version[0] < 2;
    }
}
