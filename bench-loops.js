import benchmark from "benchmark";
const suite = new benchmark.Suite();
const arr = Array.from({ length: 1000 }, (_, i) => i + 1);

suite.add("for classic", () => {
  for (let i = 0; i < arr.length; i++) arr[i];
});
suite.add("for ... in ...", () => {
  for (const i in arr) arr[i];
});
suite.add("for ... of ...", () => {
  for (const v of arr) v;
});
suite.add("Symbol.iterator", () => {
  const iter = arr[Symbol.iterator]();
  let i;
  while (!(i = iter.next()).done) {
    i.value;
  }
});

suite.on("cycle", function (event) {
  console.log(String(event.target));
});

suite.on("complete", function () {
  console.log(`Fastest is ${this.filter("fastest").map("name")}`);
});

suite.run();
