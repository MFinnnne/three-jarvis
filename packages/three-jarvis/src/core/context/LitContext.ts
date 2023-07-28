import {createContext} from "@lit-labs/context";
import General from "../General";

export const generalContext = createContext<General>(Symbol('general'));
