var svg = d3.select("svg"),
  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3
  .scaleBand()
  .rangeRound([0, width])
  .padding(0.1);

var y = d3.scaleLinear().rangeRound([height, 0]);

d3.json("static/data.json").then(function(data) {
  x.domain(
    data.data.map(function(d) {
      return d.date;
    })
  );
  y.domain([
    0,
    d3.max(data.data, function(d) {
      return Number(d.calls.callcount);
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
    .attr("text-anchor", "end")
    .text("Speed");

  g.selectAll(".bar")
    .data(data.data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.calls.callcount);
    })
    .attr("y", function(d) {
      return y(Number(d.calls.callcount));
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
      return height - y(Number(d.calls.callcount));
    });
});
