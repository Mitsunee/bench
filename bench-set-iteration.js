import benchmark from "benchmark";
const suite = new benchmark.Suite();

const arr = Array.from({ length: 1000 }, () => (Math.random() * 100) % 20);
const set = new Set(arr);

suite.add("Array.from + map", () => {
  const _out = Array.from(set).map((value, key) => ({ value, key }));
});

suite.add("Array.from + classic loop", () => {
  const out = [];
  const arrFrom = Array.from(set);
  for (let key = 0; key < arrFrom.length; key++) {
    out.push({ value: arrFrom[key], key });
  }
});

suite.add("iterate set", () => {
  const out = [];
  let key = 0;
  for (const value of set) {
    out.push({ value, key });
    key++;
  }
});

suite.on("cycle", function (event) {
  console.log(String(event.target));
});

suite.on("complete", function () {
  console.log(`Fastest is ${this.filter("fastest").map("name")}`);
});

suite.run();
