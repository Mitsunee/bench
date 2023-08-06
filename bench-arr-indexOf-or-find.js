import benchmark from "benchmark";
const suite = new benchmark.Suite();

const arr = Array.from({ length: 100 }, (_, i) => i);

suite.add("array.indexOf", () => {
  const _out = arr.indexOf(50) >= 0;
});

suite.add("array.find", () => {
  const _out = arr.find(v => v === 50) == 50;
});

suite.add("array.findIndex", () => {
  const _out = arr.findIndex(v => v === 50) >= 0;
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
