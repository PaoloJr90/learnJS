import { Worker } from 'worker_threads';

// array of 100 with the value =  1 billion
const jobs = Array.from({ length: 100 }, () => 1e9);

const tick = performance.now();
// console.log('tick', tick);
let completedWorkers = 0;

// divide total jobs into chunks for each worker
function chunkify(array, n) {
    let chunks = [];
    for (let i = n; i > 0; i--) {
        chunks.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return chunks;
}

function run(jobs, concurrentWorkers) {
    const chunks = chunkify(jobs, concurrentWorkers);

    chunks.forEach((data, i) => {
        const worker = new Worker("./worker.mjs");
        // pass data to worker to be processes 
        worker.postMessage(data);
        // listen for message from worker - can collec data from worker and process it on the main thread
        // threads can share data between them
        worker.on('message', () => {
            console.log(`Worker ${i} completed in ${performance.now() - tick} ms`);
            completedWorkers++;
            if (completedWorkers === concurrentWorkers) {
                console.log(`${concurrentWorkers} workers took ${performance.now() - tick} ms`);
                process.exit();
            }
        });
    })
}

run(jobs, 1);
// run(jobs, 2);
// run(jobs, 4);
// run(jobs, 6);
// run(jobs, 8);