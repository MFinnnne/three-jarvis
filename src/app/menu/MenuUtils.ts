import { m, VElement, VNode } from "million";
import Ticker from "../../core/Ticker";


export default class MenuUtils {
    public static menItem(itemName: string, child: string[] | VNode, callBack?: (type: string, e: Event) => void): VElement {
        return m("div", {
            className: "menu-item"
        }, [
            // item
            m(
                "div",
                {
                    className: "tag"
                }
                , [
                    // tag
                    m("div", { className: "dropbtn" }, [itemName])
                ]
            ),
            //child
            child instanceof Array
                ?
                m("div", { className: "export" }, [
                    m("div", { className: "dropdown-content" }, [
                        ...child.map(value => {
                            return m(
                                "a",
                                {
                                    href: "#", onClick: (e) => {
                                        if (callBack) {
                                            callBack(value, e);
                                        }
                                    }
                                }, [value]
                            );
                        })
                    ])
                ])
                :
                child
        ]);
    };
}