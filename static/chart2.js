var svg2 = d3.select("#Part2").select("svg"),
  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60
  },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  padding = 20,
  g = svg2
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3
  .scaleBand()
  .rangeRound([0, width])
  .padding(0.25);

var y = d3.scaleLinear().rangeRound([height, 0]);

d3.json("static/data.json").then(function(data) {
  x.domain(
    data.Data.map(function(d) {
      return d.Date;
    })
  );
  y.domain([
    0,
    d3.max(data.Data, function(d) {
      return Number(d.Calls.CallCount);
    })
  ]);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end");

  g.selectAll(".bar")
    .data(data.Data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.Date);
    })
    .attr("y", function(d) {
      return y(Number(d.Calls.CallCount));
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
      return height - y(Number(d.Calls.CallCount));
    });
  g.append("text")
    .text("# Calls")
    .attr("transform", "translate(-45, -10)");
});
