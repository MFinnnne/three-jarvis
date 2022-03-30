export default function toDecimal(x): number {
    let f: number = parseFloat(x);
    if (isNaN(f)) {
        throw Error("param is not a number")
    }
    f = Math.round(x * 100) / 100;
    return f;
}
