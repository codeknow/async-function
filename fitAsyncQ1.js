/**
 * /* TEAM
 *          63 6F 64 65 4B 6E 6F 77
 *                   .___      ____  __.
 *    ____  ____   __| _/____ |    |/ _| ____
 *  _/ ___\/  _ \ / __ |/ __ \|      <  /    \ /  _ \ \/ \/ /
 *  \  \__(  <_> ) /_/ \  ___/|    |  \|   |  (  <_> )     /
 *   \___  >____/\____ |\___  >____|__ \___|  /\____/ \/\_/
 *       \/           \/    \/        \/    \/
 */

/**
 * Execute "input" map
 * @param {array} arrayNumber
 */

const concurrency = limiter(2);
const input = [1, 2, 3, 4, 5];

Promise.all(input.map((IDs) => {
    return concurrency(() => job(IDs))
})).then(results => {
    console.log('output:', results);
});

function job(IDs) {

    let val = `job ${IDs}`;
    console.log('initiated', val);

    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('       ', val, 'flawless');

            resolve(IDs + 1);

        }, 1300)
    })
}

function limiter(count) {
    let outstanding = 0;
    let jobs = [];

    function remove() {
        outstanding--;

        if (outstanding < count) {
            dequeue()
        }
    }

    function dequeue() {
        let job = jobs.shift();
        semaphore.queue = jobs.length;

        if (job) {
            run(job.fn).then(job.resolve).catch(job.reject);
        }
    }

    function queue(fn) {
        return new Promise((resolve, reject) => {
            jobs.push({fn: fn, resolve: resolve, reject: reject});
            semaphore.queue = jobs.length;
        })
    }

    function run(fn) {
        outstanding++;
        try {
            return Promise.resolve(fn()).then((result) => {
                remove();
                return result
            }, (error) => {
                remove();
                throw error
            })
        } catch (err) {
            remove();
            return Promise.reject(err)
        }
    }

    let semaphore = (fn) => {
        if (outstanding >= count) {
            return queue(fn)
        } else {
            return run(fn)
        }
    };

    return semaphore
}
