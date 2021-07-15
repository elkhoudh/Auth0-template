var fs = require("fs");
var array = fs
  .readFileSync("src/containers/Dashboard/result2.txt")
  .toString()
  .split("\n");
const data = [];
const json = [];
var i,
  j,
  temporary,
  chunk = 2;

for (i = 0, j = array.length; i < j; i += chunk) {
  temporary = array.slice(i, i + chunk);
  // do whatever
  data.push(temporary);
}

data.map((d) => {
  json.push({
    question: d[0],
    answer: "A",
    a: d[1],
  });
});

console.log(JSON.stringify(json));
