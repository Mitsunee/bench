import benchmark from "benchmark";
const suite = new benchmark.Suite();

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non enim praesent elementum facilisis leo vel. Cras pulvinar mattis nunc sed blandit libero volutpat. Vitae sapien pellentesque habitant morbi tristique. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Neque volutpat ac tincidunt vitae semper. Condimentum lacinia quis vel eros donec ac odio tempor. Viverra maecenas accumsan lacus vel. Scelerisque eu ultrices vitae auctor eu augue ut. Donec enim diam vulputate ut pharetra sit amet aliquam id. Felis imperdiet proin fermentum leo vel orci porta. Auctor eu augue ut lectus arcu bibendum at varius. Elit scelerisque mauris pellentesque pulvinar. Eget arcu dictum varius duis. Felis eget velit aliquet sagittis id consectetur purus. Orci eu lobortis elementum nibh tellus molestie nunc non. Sodales ut eu sem integer vitae. Adipiscing at in tellus integer.
Morbi tristique senectus et netus et malesuada fames. Nisi lacus sed viverra tellus in hac habitasse. Erat nam at lectus urna duis. Venenatis tellus in metus vulputate eu scelerisque. Metus dictum at tempor commodo. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dui vivamus arcu felis bibendum. Consectetur libero id faucibus nisl tincidunt eget. Tellus in hac habitasse platea. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. At risus viverra adipiscing at in tellus. Vestibulum morbi blandit cursus risus at ultrices. A diam sollicitudin tempor id eu. Aenean pharetra magna ac placerat vestibulum lectus mauris.
Tellus orci ac auctor augue mauris. Quisque non tellus orci ac auctor. Tellus mauris a diam maecenas sed enim ut sem viverra. At tellus at urna condimentum mattis pellentesque id nibh. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Consectetur adipiscing elit pellentesque habitant. Est pellentesque elit ullamcorper dignissim. Scelerisque eu ultrices vitae auctor. Id volutpat lacus laoreet non curabitur gravida arcu ac. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Condimentum id venenatis a condimentum vitae sapien pellentesque.
Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Ornare lectus sit amet est placerat. Neque convallis a cras semper auctor neque vitae tempus. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Tortor aliquam nulla facilisi cras fermentum odio. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Leo vel fringilla est ullamcorper. Dapibus ultrices in iaculis nunc. Tristique senectus et netus et malesuada fames ac turpis egestas. Neque convallis a cras semper auctor neque vitae tempus. Ullamcorper a lacus vestibulum sed arcu non odio. Vitae suscipit tellus mauris a diam maecenas sed enim. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Id velit ut tortor pretium viverra suspendisse potenti nullam ac.
Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. A lacus vestibulum sed arcu non odio euismod lacinia. Pharetra massa massa ultricies mi. Tellus elementum sagittis vitae et. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Semper quis lectus nulla at volutpat diam ut. Tincidunt augue interdum velit euismod in pellentesque. Vulputate mi sit amet mauris commodo quis. Libero nunc consequat interdum varius. Tristique nulla aliquet enim tortor at auctor.`;

const arr = lorem.replace(/\n/g, " ").split(" ");

/**
 * Flat-maps and filters an array. Return (a) value(s) inside an array to put them in the new array, return undefined, null or false to skip the element
 */
function arrayFilterMap(arr, cb) {
  const newArr = new Array();
  for (let i = 0; i < arr.length; i++) {
    const results = cb(arr[i], i, arr);
    if (!results || results.length < 0) continue;
    for (let j = 0; j < results.length; j++) {
      newArr.push(results[i]);
    }
  }
  return newArr;
}

suite.add("filter, then map", () => {
  arr
    .filter(word => !word.endsWith(".") && !word.length < 3)
    .map(word => word.length);
});

suite.add("flatMap", () => {
  arr.flatMap(word => {
    if (word.endsWith(".") || word.length < 3) return [];
    return [word];
  });
});

suite.add("reduce", () => {
  arr.reduce((newArr, word) => {
    if (!word.endsWith(".") && word.length >= 3) {
      newArr.push(word);
    }
    return newArr;
  }, []);
});

suite.add("custom implementation", () => {
  arrayFilterMap(arr, word => {
    if (word.endsWith(".") || word.length < 3) return;
    return [word];
  });
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
