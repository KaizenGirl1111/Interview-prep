/*
⚡ Promise.all() — "Wait for everything"

🧠 Concept: Runs all async calls in parallel → resolves when all succeed.
💻 Frontend use-cases:

Fetch user profile + dashboard + notifications together before showing the home screen.

Load multiple assets/images before showing a product page.

Call multiple microservices (e.g., pricing, reviews, availability).

👉 Example answer:

“I use Promise.all when I need multiple API calls to finish before rendering the component.”

🧩 Promise.allSettled() — "Get all results, even if some fail"

🧠 Concept: Always waits for every promise — returns both successes and failures.
💻 Frontend use-cases:

Show partial data even if some API calls fail (like loading 3 widgets, one fails).

Collect analytics or background sync results where failures are acceptable.

Running test cases or health checks and displaying pass/fail status for each.

👉 Example answer:

“I use Promise.allSettled when I want all promises to complete, even if some reject, like fetching dashboard widgets.”

🏃 Promise.any() — "Take the first success"

🧠 Concept: Resolves as soon as one promise fulfills (ignores failures).
💻 Frontend use-cases:

Fetching from multiple mirror APIs/CDNs — use whichever responds fastest.

Trying different caching layers (e.g., localStorage → IndexedDB → network).

Feature fallback: try modern API, fallback to polyfill if modern one fails.

👉 Example answer:

“I use Promise.any when I want the fastest successful result, like fetching from backup servers.”

🕓 Promise.race() — "Whichever settles first (success or fail)"

🧠 Concept: Resolves/rejects as soon as any promise settles (first finish wins).
💻 Frontend use-cases:

Implementing timeout for slow network requests.

Cancelling long async tasks if user navigates away or cancels.

Handling competing animations or user interactions (first input wins).

👉 Example answer:

“I use Promise.race to add a timeout wrapper or cancel a fetch request if it takes too long.”


*/

function myPromiseAll(taskList) {
  // check taskList is array
  let completed = 0;
  const result = new Array(taskList.length);
  return new Promise((resolve, reject) => {
    for (let i = 0; i < taskList.length; i++) {
        Promise.resolve(taskList[i])
        .then((data) => {
          result[i] = data;
          completed++;
          if (completed == taskList.length) resolve(result);
        })
        .catch((err) => reject(err));
    }
  });
}

function myPromiseAllSettled(taskList) {
  let completed = 0;
  let result = new Array(taskList.length);
  return new Promise((resolve) => {
    for (let i = 0; i < taskList.length; i++) {
      Promise.resolve(taskList[i])
        .then((value) => {result[i] = { status: "fulfilled", value }})
        .catch((error) => {result[i] = { status: "rejected", reason: error }})
        .finally(() => {
          completed++;
          if (completed == taskList.length) {
            resolve(result);
          }
        });
    }
  });
}

function myPromiseAny(taskList) {
  let rejectedCount = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < taskList.length; i++) {
      Promise.resolve(taskList[i]).then(resolve).catch((error) => {
        rejectedCount++;
        if (rejectedCount == taskList.length)
          reject(AggregateError("All promises rejected", error));
      });
    }
  });
}

function myPromiseRace(taskList) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < taskList.length; i++) {
      Promise.resolve(taskList[i]).then(resolve).catch(reject);
    }
  });
}

const mixedTasks = [
  new Promise((resolve) => setTimeout(() => resolve("Task 1"), 1000)),
  new Promise((_, reject) =>
    setTimeout(() => reject("Promise rejected"),4000)),
  new Promise((resolve) => setTimeout(() => resolve("Task 2"),2000)),
];

myPromiseAll(mixedTasks).then((value)=>console.log("Promise all ",value)).catch(err=>console.log("Promise all ",err))
myPromiseAllSettled(mixedTasks).then((value)=>console.log("Promise all settled ",value)).catch(err=>console.log(err))
myPromiseAny(mixedTasks).then((value)=>console.log("Promise any ",value)).catch(err=>console.log(err))
myPromiseRace(mixedTasks).then(value=>console.log("Promise race ",value)).catch(err=>console.log("Promise race ",err))

//promise is a class. .race() is like a method 