import benchmark from "benchmark";
const suite = new benchmark.Suite();
const arr = Array.from({ length: 1000 }, (_, i) => i + 1);

suite.add("direct access", () => {
  for (let i = 0; i < arr.length; i++) arr[i];
  for (let i = 0; i < arr.length; i++) arr[arr.length - i];
});
suite.add("array.at", () => {
  for (let i = 0; i < arr.length; i++) arr.at(i);
  for (let i = 0; i < arr.length; i++) arr.at(-1 * i);
});

suite.on("cycle", function (event) {
  console.log(String(event.target));
});

suite.on("complete", function () {
  console.log(`Fastest is ${this.filter("fastest").map("name")}`);
});

suite.run();
