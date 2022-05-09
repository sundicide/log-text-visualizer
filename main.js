console.clear();

const data = [
  { name: "user1", value: 8290 },
  { name: "user2", value: 6327 },
  { name: "user3", value: 5738 },
  { name: "user4", value: 4439 },
  { name: "user5", value: 3992 },
  { name: "user6", value: 2645 },
  { name: "user7", value: 2224 },
  { name: "user8", value: 2036 },
  { name: "user9", value: 1996 },
  { name: "user10", value: 1763 }
];

const totalValue = data.reduce((acc, curr) => {
  return acc + curr.value;
}, 0);
data.map((d) => (d.percentage = d.value / totalValue));

const interpolator = d3.interpolateNumber(0, 100);

function removeAllItems() {
  d3.select("#root").selectAll("div").remove();
}

function draw() {
  removeAllItems();

  const rootWidth = d3.select("#root").style("width").replace("px", "");

  function calc(d, i) {
    return i === 0
      ? `${rootWidth}px`
      : `${(rootWidth * d.value) / data[0].value}px`;
  }

  d3.select("#root")
    .selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "item")
    .style("width", calc)
    .style("position", "relative")
    .append("span")
    .attr("class", "text-title")
    .text((d, i) => `${i + 1}. ${d.name}`)
    .append("span")
    .attr("class", "text-value")
    .text((d) => d.value);

  d3.selectAll("div.item").append("div").attr("class", "clip");
}

draw();

window.addEventListener("resize", function (event) {
  draw();
});
