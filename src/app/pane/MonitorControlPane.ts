import { BladeApi, Pane, TabPageApi } from "tweakpane";
import { Euler, Object3D, Quaternion, Vector3 } from "three";
import DefaultControlPane from "./DefaultControlPane";
import { Point3d } from "@tweakpane/core/dist/es6/input-binding/point-3d/model/point-3d";
import Prompt from "../Prompt";
import Constant from "../../constant/Constant";
import Jarvis from "../../core/Jarvis";

export default class MonitorControlPane extends DefaultControlPane {
    protected object?: Object3D;
    protected jarvis: Jarvis;


    constructor(creator: Jarvis) {
        super(creator);
        this.jarvis = creator;
    }

    public genPane(object?: Object3D): Pane {
        const base = Math.pow(1024, 2);
        const pane = super.genPane(object);
        const monitorFolder = this.pane.addFolder({ title: "monitor" });
        const info = { memory: "", render: "", page: "" };
        monitorFolder.addMonitor(info, "memory", { multiline: true, lineCount: 2 }).on("update", () => {
            const memory = this.jarvis.renderer.info.memory;
            info.memory = `textures: ${memory.textures}\ngeometries: ${memory.geometries}`;
        });
        monitorFolder.addSeparator();
        monitorFolder.addMonitor(info, "render", { multiline: true, lineCount: 5 }).on("update", () => {
            const render = this.jarvis.renderer.info.render;
            info.render = `frame: ${render.frame}\ntriangles: ${render.triangles}\ncalls: ${render.calls}\npoints: ${render.points}\nlines: ${render.lines}`;
        });
        monitorFolder.addSeparator();
        monitorFolder.addMonitor(info, "page", { multiline: true, lineCount: 3 }).on("update", () => {
            const memory = (window.performance as any).memory;
            info.page = `total: ${(memory.totalJSHeapSize / base).toFixed(2)}\nused: ${(memory.usedJSHeapSize / base)
                .toFixed(2)}\nlimit: ${(memory.jsHeapSizeLimit / base).toFixed(2)}`;
        });
        monitorFolder.addSeparator();
        return pane;
    }


}
