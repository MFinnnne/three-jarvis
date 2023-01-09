import { m, VElement, VNode } from 'million';

export default class MenuUtils {
    public static menItem(
        itemName: string,
        child: (VNode | string)[],
        callBack?: (type: string, e: Event) => void,
    ): VElement {
        return m(
            'div',
            {
                className: 'menu-item',
            },
            [
                m(
                    'div',
                    {
                        className: 'tag',
                    },
                    [m('div', { className: 'dropbtn' }, [itemName])],
                ),
                //child
                m(
                    'div',
                    {
                        className: 'export',
                    },
                    [
                        m(
                            'div',
                            {
                                className: 'dropdown-content',
                            },
                            [
                                ...child.map((value) => {
                                    if (typeof value !== 'string') {
                                        return value;
                                    } else {
                                        if (value === '-') {
                                            return m('hr');
                                        }
                                        return m(
                                            'a',
                                            {
                                                className: 'dropdown-item',
                                                href: '#',
                                                onClick: (e) => {
                                                    if (callBack) {
                                                        callBack(value, e);
                                                    }
                                                },
                                            },
                                            [value],
                                        );
                                    }
                                }),
                            ],
                        ),
                    ],
                ),
            ],
        );
    }
}
