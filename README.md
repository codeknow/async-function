# /-ck-2020
# Software project instructions

## Question 1
Please write an async function that takes 3 arguments
	1. An array of values to iterate over
	2. An async callback that should be called with each item in the array
	3. Optional max concurrency of callbacks that should be resolved at a time  

* input: `map([1, 2, 3], async val => val + 1, { concurrency: 2 })`
* output: [2, 3, 4]

If the concurrency is 2 that means we want up to 2 promises going in parallel at a time (do not wait for the full batch of 2 to finish before starting the next batch). Please make sure you are not just batching promises based on concurrency.

Please do not use an external libraries for Question 1.
