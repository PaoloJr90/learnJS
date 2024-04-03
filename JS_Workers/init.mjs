// array of 100 with the value =  1 billion
const jobs = Array.from({ length: 100 }, () => 1e9);

const tick = performance.now();
// console.log(tick);

for (let job of jobs) {
    let count = 0;
    for (let i = 0; i < job; i++) {
        count++;
    }
}

const tock = performance.now();
// console.log(tock);

console.log(`Main thread took ${tock - tick} ms`);
