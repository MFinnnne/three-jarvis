import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshoptDecoder } from './jsm/meshopt_decoder.module';
import Constant from '../constant/Constant';
import { LoadConfig } from './Type';

const gltfLoader = new GLTFLoader();
gltfLoader.setMeshoptDecoder(MeshoptDecoder);

export class ThreeJarvisLoader {
    static load(config: LoadConfig, async = false) {
        if (!async) {
            config.beforeLoad();
            const modelPromises: Promise<GLTF>[] = config.loadModelConfigs.map(async (value) => {
                return new Promise((resolve, reject) => {
                    value.beforeRender();
                    console.time(value.path);
                    gltfLoader.load(
                        value.path,
                        (gltf) => {
                            gltf.scene.uuid = value.id;
                            gltf.scene.name = value.name;
                            value.afterRender(gltf);
                            resolve(gltf);
                        },
                        (event) => {
                            console.log(`loading ${event.target} ==> ${event.total}`);
                        },
                        (e) => {
                            reject(e.message);
                        },
                    );
                });
            });
            const t1 = performance.now();
            Promise.all(modelPromises)
                .then((gltf) => {
                    config.afterLoad(gltf);
                })
                .finally(() => {
                    console.log(`all model loaded,time:${performance.now() - t1}`);
                });
        }
    }
}
