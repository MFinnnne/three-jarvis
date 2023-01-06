function readAs(file, as): Promise<unknown> {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e?.target?.result)
        }
        reader.onprogress = (ev) => {
            const size = '(' + Math.floor(ev.total / 1000).toFixed(2) + ' KB)';
            const progress = Math.floor((ev.loaded / ev.total) * 100) + '%';
            console.log('Loading', file.name, size, progress);
        }
        reader.onerror = function (e) {
            reject(new Error('Error reading' + (<any>file).name + ': ' + e?.target?.result))
        }
        reader.readAsArrayBuffer(file)
    })
}

function readAsArrayBuffer(file): Promise<ArrayBuffer> {
    return readAs(file, 'ArrayBuffer') as Promise<ArrayBuffer>
}

export default {
    readAsArrayBuffer: readAsArrayBuffer,
}
