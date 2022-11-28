export function roll(x, y, z) {
    let results = [];
    for (let i = 0; i < z; i++) {
        let sum = 0;
        for (let j = 0; j < y; j++) {
            sum += Math.floor(Math.random() * x) + 1;
        }
        results.push(sum);
    }
    return {
        "sides": x,
        "dice": y,
        "rolls": z,
        "results": results
    };
}