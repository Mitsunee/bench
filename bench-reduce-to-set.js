import benchmark from "benchmark";
const suite = new benchmark.Suite();

const arr = Array.from({ length: 1000 }, () => (Math.random() * 100) % 20);

suite.add("Array.from new Set", () => {
  const _out = Array.from(new Set(arr));
});

suite.add("filter array", () => {
  const _out = arr.filter((v, i, s) => s.indexOf(v) == i);
});

suite.add("classic for loop", () => {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    if (out.find(v => v === arr[i])) continue;
    out.push(arr[i]);
  }
});

suite.add("classic for loop with internal set", () => {
  const out = [];
  const known = new Set();
  for (let i = 0; i < arr.length; i++) {
    if (known.has(arr[i])) continue;
    out.push(arr[i]);
    known.add(arr[i]);
  }
});

suite.on("cycle", function (event) {
  console.log(String(event.target));
});

suite.on("error", function (event) {
  console.error(event);
});

suite.on("complete", function () {
  console.log(`Fastest is ${this.filter("fastest").map("name")}`);
});

suite.run();
