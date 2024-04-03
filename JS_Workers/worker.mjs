import { parentPort } from "worker_threads";

// receive date/message from main thread
parentPort.on('message', (jobs) => {

    for (let job of jobs) {
        let count = 0;
        for (let i = 0; i < job; i++) {
            count++;
        }
    }
    // when work is done, pass message/data back to main thread
    // could also use process.exit() to terminate the worker
    parentPort.postMessage('Done');
});