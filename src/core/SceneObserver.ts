import {Object3D, Scene} from "three";
import GUI from "../app/GUI";
import Constant from "../constant/Constant";
import Utils from "../util/Utils";


export default class SceneObserver {

    private static OBJECTS_FLAT_MAP: Map<String, Object3D> = new Map();

    static monitorScene(scene: Scene) {
        let prevModelCount = 0;
        setInterval(() => {
            const length = Utils.countAllModels(scene);
            const curModelsCount = scene.children.filter(item => {

                return !item.name.includes(Constant.HELPER_NAME);
            }).length;
            console.log("all models count:", curModelsCount);
            if (prevModelCount !== curModelsCount) {
                console.table(scene.children.flat())
                prevModelCount = curModelsCount;
                SceneObserver.checkScene(scene);
            }
        }, 500)
    }

    private static checkScene(scene: Scene) {

        GUI.objectTreeInit();
    }


}
