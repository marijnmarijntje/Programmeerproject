// Name: Marijn Gulpen
// Student number: 10575243
// This javascript draws the linegraph in the introduction. 
// This graph has no linkages or interactivity with the other visualizations.

function drawLineGraph() {
    var introtitle = d3.selectAll("#introductiontitle")
        .html(function(d) { return "Average global surface temperature <small>(°C)</small> from 1880 till 2015" });

    var margin = {top: 30, right: 80, bottom: 60, left: 40},
        width = 670 - margin.left - margin.right,
        height = 280 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.time.format("%Y").parse,
        formatDate = d3.time.format("%Y"),
        bisectDate = d3.bisector(function(d) { return d.date; }).left; 

    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.temp); });
        
    var svg = d3.select("#linegraph")
        .append("svg")
            .attr("class", "chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get the data from the CSV file
    d3.csv("project/data/linegraph.csv", function(error, data) {
        if (error) throw error;
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.temp = +d.temp;
        });

    // Scale the range of the data 
    var max_temp = d3.max(data, function(d) { return d.temp; });

    var min_temp = d3.min(data, function(d) { return d.temp; });

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([min_temp, max_temp]);

    // Draw the line
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "title")
        .attr("y", 40)
        .attr("x", 265)
        .html('<tspan style="font-size:1em"; style="font-weight: bold"> Year </tspan>');

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .html('<tspan style="font-size:0.9em"> Temperature </tspan>');

    // Add focus for hover
    var focus = svg.append("g")                                
        .style("display", "none");

       // Append the horizontal dotted line
        focus.append("line")
            .attr("class", "x")
            .style("stroke", "steelblue")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("y1", 0)
            .attr("y2", height);

        // Append vertical dotted line
        focus.append("line")
            .attr("class", "y")
            .style("stroke", "steelblue")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("x1", width)
            .attr("x2", width);

        // Append circle 
        focus.append("circle")
            .style("fill", "none")
            .style("stroke", "steelblue")
            .attr("r", 4);

        // Append the year as text
        focus.append("text")
            .attr("class", "lineyear")
            .attr("dx", 8)
            .attr("dy", "-.3em");

        // Append the temperature as text
        focus.append("text")
            .attr("class", "linetemp")
            .attr("dx", 8)
            .attr("dy", "1em");

        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);  

        // Function showing the focus (lines, circle and text) when hovering over
        function mousemove() {                                 
            var x0 = x.invert(d3.mouse(this)[0]),              
                i = bisectDate(data, x0, 1),                   
                d0 = data[i - 1],                              
                d1 = data[i],                                  
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;   
            focus.select("circle").attr("transform", "translate(" + x(d.date) + "," + y(d.temp) + ")");
            focus.select("text.lineyear").attr("transform","translate(" + x(d.date) + "," + y(d.temp) + ")")
                .html('<tspan style="font-weight:bold">Year: </tspan>' + formatDate(d.date));
            focus.select("text.linetemp").attr("transform", "translate(" + x(d.date) + "," + y(d.temp) + ")")
                .html(d.temp + " °C");
            focus.select(".x").attr("transform", "translate(" + x(d.date) + "," + y(d.temp) + ")")
                .attr("y2", height - y(d.temp));
            focus.select(".y").attr("transform", "translate(" + width * -1 + "," + y(d.temp) + ")")
                .attr("x2", width + width);
        }
    });
}