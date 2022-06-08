import * as THREE from 'three';

import {TGALoader} from 'three/examples/jsm/loaders/TGALoader.js';

import AddObjectCommand from './commands/AddObjectCommand';

import {LoaderUtils} from '../util/LoadUtils';
import recorder from "./Recorder";

export default class Loader {
    texturePath = '';

    public loadItemList(items): void {
        LoaderUtils.getFilesFromItemList(items, function (files, filesMa) {
            Loader.loadFiles(files,);
        });

    };

    public static loadFiles(files) {
        if (files.length > 0) {

            const filesMap = LoaderUtils.createFilesMap(files);

            const manager = new THREE.LoadingManager();
            manager.setURLModifier(function (url) {

                url = url.replace(/^(\.?\/)/, ''); // remove './'

                const file = filesMap[url];

                if (file) {

                    console.log('Loading', url);

                    return URL.createObjectURL(file);

                }

                return url;

            });

            manager.addHandler(/\.tga$/i, new TGALoader());

            for (let i = 0; i < files.length; i++) {

                Loader.loadFile(files[i], manager);

            }

        }

    }

    public static loadFile(file, manager) {

        const filename = file.name;
        const extension = filename.split('.').pop().toLowerCase();

        const reader = new FileReader();
        reader.addEventListener('progress', function (event) {

            const size = '(' + Math.floor(event.total / 1000).toFixed(2) + ' KB)';
            const progress = Math.floor((event.loaded / event.total) * 100) + '%';

            console.log('Loading', filename, size, progress);

        });

        switch (extension) {

            case 'glb': {

                reader.addEventListener('load', async function (event) {

                    const contents = event.target?.result;

                    const {DRACOLoader} = await import( 'three/examples/jsm/loaders/DRACOLoader.js' );
                    const {GLTFLoader} = await import( 'three/examples/jsm/loaders/GLTFLoader.js' );

                    const dracoLoader = new DRACOLoader();
                    dracoLoader.setDecoderPath('three/examples/js/libs/draco/gltf/');

                    const loader = new GLTFLoader();
                    loader.setDRACOLoader(dracoLoader);
                    loader.parse(contents as any, '', function (result) {

                        const scene = result.scene;
                        scene.name = filename;

                        scene.animations.push(...result.animations);
                        recorder.execute(new AddObjectCommand(scene));

                    });

                }, false);
                reader.readAsArrayBuffer(file);

                break;

            }

            case 'gltf': {

                reader.addEventListener('load', async function (event) {

                    const contents = event.target?.result;

                    let loader;

                    if (Loader.isGLTF1(contents)) {

                        alert('Import of glTF asset not possible. Only versions >= 2.0 are supported. Please try to upgrade the file to glTF 2.0 using glTF-Pipeline.');

                    } else {

                        const {DRACOLoader} = await import( 'three/examples/jsm/loaders/DRACOLoader.js' );
                        const {GLTFLoader} = await import( 'three/examples/jsm/loaders/GLTFLoader.js' );

                        const dracoLoader = new DRACOLoader();
                        dracoLoader.setDecoderPath('../examples/js/libs/draco/gltf/');

                        loader = new GLTFLoader(manager);
                        loader.setDRACOLoader(dracoLoader);

                    }

                    loader.parse(contents, '', function (result) {

                        const scene = result.scene;
                        scene.name = filename;

                        scene.animations.push(...result.animations);
                        recorder.execute(new AddObjectCommand(scene));

                    });

                }, false);
                reader.readAsArrayBuffer(file);

                break;

            }

        }
    }

    private static isGLTF1(contents) {

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

        return (json.asset != undefined && json.asset.version[0] < 2);

    }

}


