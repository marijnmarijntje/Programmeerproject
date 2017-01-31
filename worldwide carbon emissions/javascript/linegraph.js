// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temp); });
    
// Adds the svg canvas
var svg = d3.select("#linegraph")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("/data/linegraph.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.temp = +d.temp;
    });

    // Scale the range of the data
    var max_temp = d3.max(data, function(d) { return d.temp; });
    console.log(max_temp);

    var min_temp = d3.min(data, function(d) { return d.temp; });
    console.log(min_temp);

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([min_temp, max_temp]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // HOVER
    // var focus = svg.append("g")
    //   .style("display", "none");

    //   focus.append("circle")
    //       .attr("r", 5);

    //   focus.append("text")
    //       .attr("x", 9)
    //       .attr("dy", ".35em");

    //   svg.append("rect")
    //       .attr("class", "overlay")
    //       .attr("width", width)
    //       .attr("height", height)
    //       .on("mouseover", function() { focus.style("display", null); })
    //       .on("mouseout", function() { focus.style("display", "none"); })
    //       .on("mousemove", mousemove);

    // function mousemove() {
    //     var x0 = x.invert(d3.mouse(this)[0]),
    //         i = bisectDate(data, x0, 1),
    //         d0 = data[i - 1],
    //         d1 = data[i];
    //         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    //     focus.attr("transform", "translate(" + x(d.date) + "," + y(d.temp) + ")");
    //     focus.append("text").attr("x", 9).attr("dy", 0).text(formatTemp(d.temp));
    //     focus.append("text").attr("x", 9).attr("dy", 0).text(formatTemp(d.date));
    // }
});
