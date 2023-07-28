import General from "../General";


export default class ThreeJarvisContext {
	private static contextMap: Map<String, General> = new Map;

	static hasContext(id: string): boolean {
		return this.contextMap.has(id);
	}

	static setContext(id: string, general: General) {
		this.contextMap.set(id, general);
	}

	static getContext(id: string): General {
		return this.contextMap.get(id) as General;
	}

}
