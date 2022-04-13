function createDeepProxy(target, handler) {
    const preProxy = new WeakMap();
    function makeHandler(path) {
        return {
            set(target, key, value, receiver) {
                if (value != null && typeof value === 'object') {
                    value = proxify(value, [...path, key]);
                }
                target[key] = value;

                if (handler.set) {
                    handler.set(target, [...path, key], value, receiver);
                }
                return true;
            },

            deleteProperty(target, key) {
                if (Reflect.has(target, key)) {
                    unProxy(target, key);
                    const deleted = Reflect.deleteProperty(target, key);
                    if (deleted && handler.deleteProperty) {
                        handler.deleteProperty(target, [...path, key]);
                    }
                    return deleted;
                }
                return false;
            }
        }
    }

    function unProxy(obj, key) {
        if (preProxy.has(obj[key])) {
            // console.log('unproxy',key);
            obj[key] = preProxy.get(obj[key]);
            preProxy.delete(obj[key]);
        }

        for (const k of Object.keys(obj[key])) {
            if (obj[key][k] != null && typeof obj[key][k] === 'object') {
                unProxy(obj[key], k);
            }
        }

    }

    function proxify(obj, path) {
        for (const key of Object.keys(obj)) {
            if (obj[key] != null && typeof obj[key] === 'object') {
                obj[key] = proxify(obj[key], [...path, key]);
            }
        }
        const p = new Proxy(obj, makeHandler(path));
        preProxy.set(p, obj);
        return p;
    }

    return proxify(target, []);
}

const obj = {
    foo: 'baz',
}


const proxied = createDeepProxy(obj, {
    set(target, path, value, receiver) {
        console.log('set', path.join('.'), '=', JSON.stringify(value));
    },

    deleteProperty(target, path) {
        console.log('delete', path.join('.'));
    }
});
