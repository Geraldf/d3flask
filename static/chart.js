function drawchart(ElementID, datapoint) {
  var svg = d3.select("#" + ElementID).select("svg");
  var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60
  };

  var width = +svg.attr("width") - margin.left - margin.right;
  var height = +svg.attr("height") - margin.top - margin.bottom;
  var padding = 20;
  var g = svg
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
        if (datapoint == "CallDuration") {
          d.Calls[datapoint] = d.Calls[datapoint] / 3600;
        }
        return Number(d.Calls[datapoint]);
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
        return y(Number(d.Calls[datapoint]));
      })
      .attr("width", x.bandwidth())
      .attr("height", function(d) {
        return height - y(Number(d.Calls[datapoint]));
      });
    g.append("text")
      .text(datapoint)
      .attr("transform", "translate(-45, -10)");
  });
}

drawchart("Part2", "CallDuration");
drawchart("Part1", "CallCount");
