// Name: Marijn Gulpen
// Student number: 10575243
// This javascript first transforms the data into the correct format
// and then draws a graph with two axes. If there is no data a 'no data' screen 
// will appear.

// Function transforms data in right format and checks if there is (enough) data
var getDataGraph = function(dataset, countrycode){
	
	// List to store datapoints in for every year
	dataLine = [];
	years = [];

	for (var item in dataset) {
		country = dataset[item][countrycode]["country"];
		if (dataset[item][countrycode]["co2emissions"] != "nd" && dataset[item][countrycode]["gdp"] != "nd") {
		 	dataLine.push({ date: parseInt(item), 
		 				co2emissions: parseFloat(dataset[item][countrycode]["co2emissions"]),
		 				gdp: parseFloat(dataset[item][countrycode]["gdp"]) });	
		 	years.push(parseInt(item));
	 	}
    }

    // If there is not data, graph will not be drawn 
    if (years >= 0) {
    	var noData = true;
    }
    firstYear = years[0];
    console.log(firstYear);
   	// If there are more than 4 years missing in a row, graph will not be drawn 
    for (var i = 0; i < years.length - 1; i++) {
    	if (years[i] - years[i + 1] < -4) 
    		noData = true;
    }

    if (!noData) {
    	drawDuallinegraph(dataLine, country)
	}
	else {
    	noDataGraph(country);
	}
}

// In this function the linegraph will be drawn inclusive tooltip
var drawDuallinegraph = function(data, country) {
	
	d3.selectAll(".dualgraphVis").remove();

	var margin = {top: 55, right: 80, bottom: 40, left: 80},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

	var max_year = d3.max(data, function(d) { return d.date; });
	var min_year = d3.min(data, function(d) { return d.date; });

    d3.select("#title3")
     	.html(function(d) { return "CO<sub>2</sub> emissions  <small>(metric tons per capita)</small> and GDP <small>(current $US)</small> over the years - " 
    					+ '<tspan style="font-weight:bold">' + country + '</tspan>' + " - " + '<tspan style="font-weight:bold">' + min_year + 
    					'</tspan>' + " till " + '<tspan style="font-weight:bold">' + max_year + '</tspan>'});
	
	var bisectDate = d3.bisector((function(d) { return d.date; })).left;

	xLine = d3.scale.linear().domain(d3.extent(data, function(d) { return d.date; })).range([0, width]);
	var y1 = d3.scale.linear().domain([0, d3.max(data, function(d) { return Math.max(d.co2emissions); })]).range([height, 0]); 
	var y2 = d3.scale.linear().domain([0, d3.max(data, function(d) { return Math.max(d.gdp); })]).range([height, 0]);

	// Define the two lines
	var line1 = d3.svg.line()
		.interpolate("linear") 
	    .x(function(d, i) { return xLine(d.date); })
	    .y(function(d) { return y1(d.co2emissions); });

	var line2 = d3.svg.line()
		.interpolate("linear") 
	    .x(function(d, i) { return xLine(d.date); })
	    .y(function(d) { return y2(d.gdp); });

	var svg = d3.select("#dualgraph").append("svg")
			.attr("class", "dualgraphVis")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    	.attr("class", "dualgraph-g")
	        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
    var xAxis = d3.svg.axis().scale(xLine).tickSubdivide(true).tickFormat(d3.format("d"));
	svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis)
	    .append("text")
	      .attr("class", "title")
    	  .attr("y", 35)
    	  .attr("x", 230)
    	  .html('<tspan style="font-size:1em"; style="font-weight: bold"> Year </tspan>');

	var yAxisLeft = d3.svg.axis().scale(y1).ticks(5).orient("left");
	svg.append("g")
	      .attr("class", "y axis axisLeft")
	      .attr("transform", "translate(-15,0)")
	      .call(yAxisLeft)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .html("CO<tspan baseline-shift='sub'font-size='0.6em'>2</tspan> emissions");
	      
	var yAxisRight = d3.svg.axis().scale(y2).ticks(6).orient("right").tickFormat(d3.format("d"));
	svg.append("g")
	      .attr("class", "y axis axisRight")
	      .attr("transform", "translate(" + (width+15) + ",0)")
	      .call(yAxisRight)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -13)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("GDP");

	// Drawing line 1
	var path = svg.append("path")
      .attr("d", line1(data))
      .attr("stroke", "steelblue")
      .attr("stroke-width", "3")
      .attr("fill", "none");

   	var totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(1000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);

    // Drawing line 2
   	var path = svg.append("path")
      .attr("d", line2(data))
      .attr("stroke", "darkred")
      .attr("stroke-width", "3")
      .attr("fill", "none");

    var totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(1000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);

  	// Hover with circle and text elements
  	var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

	  focus.append("circle")
	  	  .attr("class", "circle")
	      .attr("r", 5);

	  focus.append("circle")
	      .attr("class", "circle2")
	      .attr("r", 5);

	  focus.append("text")
	  	  .attr("class", "textyear")
	      .attr("x", 9)
	      .attr("dy", ".35em");

	  focus.append("text")
	  	  .attr("class", "textemissions")
	      .attr("x", 9)
	      .attr("dy", ".35em")

	  focus.append("text")
	  	  .attr("class", "textgdp")
	      .attr("x", 9)
	      .attr("dy", ".35em");

	  svg.append("rect")
	      .attr("class", "overlay")
	      .attr("width", width)
	      .attr("height", height)
	      .on("mouseover", function() { focus.style("display", null); })
	      .on("mouseout", function() { focus.style("display", "none"); })
	      .on("mousemove", mouseMove);

	// When hovering over the graph the year, and exact GDP and emissions will be shown
	function mouseMove() {
	    var x0 = xLine.invert(d3.mouse(this)[0]),
	        i = bisectDate(data, x0, 1),
	        d0 = data[i - 1],
	        d1 = data[i],
	        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
	   	focus.select("circle.circle").attr("transform", "translate(" + xLine(d.date) + "," + y1(d.co2emissions) + ")");
	   	focus.select("circle.circle2").attr("transform", "translate(" + xLine(d.date) + "," + y2(d.gdp) + ")");
	  	focus.select("text.textyear").attr("x", 9).attr("dy", -34).html('<tspan style="font-weight:bold">Year: </tspan>' + d.date);
	  	focus.select("text.textemissions").attr("x", 9).attr("dy", -19).html('<tspan style="font-weight:bold">CO<tspan baseline-shift="sub" font-size="0.7em">2</tspan> emissions: </tspan>' + d.co2emissions);
	  	focus.select("text.textgdp").attr("x", 9).attr("dy", -2).html('<tspan style="font-weight:bold">GDP: </tspan>' + d.gdp);
	}
}


// Function draws a vertical line in the graph to show the selected year in the timeslider
var drawTimeLine = function(year) {

	// Check if the year is actually in the graph
	if (year >= firstYear) {	
		d3.selectAll(".timeline").remove();

		bottom = 16.95;
		height = 196.95;
		length = height - bottom; 

		d3.selectAll(".dualgraph-g").append("line")
			.attr("class", "timeline")
		    .attr("x1", xLine(year))  
		    .attr("y1", 0)
		    .attr("x2", xLine(year))  
		    .attr("y2", length)
		    .style("stroke-width", 1)
		    .style("stroke", "green")
		    .style("fill", "none");	
	}	    
	else {
		d3.selectAll(".timeline").remove();	
	}
}

// Function only used if there is no(t) (enough) data for the duallinegraph
function noDataGraph() {

	d3.selectAll(".dualgraphVis").remove();

	var margin = {top: 10, right: 80, bottom: 10, left: 80},
    width = 600 - margin.left - margin.right,
    height = 40 - margin.top - margin.bottom;

	d3.select("#title3")
	    .attr("width", width + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .html(function(d) { return "Not enough data available to visualize the CO<sub>2</sub> emissions and GDP - " 
	    					+ '<tspan style="font-weight:bold">' + country + '</tspan>' })
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

