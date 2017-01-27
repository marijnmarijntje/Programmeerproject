var getDataGraph = function(dataset, countrycode){
	dataLine = [];
	years = [];
	allYears = [];
	var counter = 0;

	for (var item in dataset) {
		allYears.push(parseInt(item));
		country = dataset[item][countrycode]["country"];
		if (dataset[item][countrycode]["co2emissions"] != "nd" && dataset[item][countrycode]["gdp"] != "nd"){
		 	dataLine.push({ date: parseInt(item), 
		 				co2emissions: parseFloat(dataset[item][countrycode]["co2emissions"]),
		 				gdp: parseFloat(dataset[item][countrycode]["gdp"]) });	
		 	years.push(parseInt(item));
	 	}
    }

    if (years >= 0) {
    	var noData = true;
    }

    // var totalYears = years[years.length - 1] - years[0]; 
    console.log(allYears);
    // if data is missing two times (not in a row) than graph can not be drawn
    for (var i = 0; i < years.length; i++) {
    	if (years[i] - years[i + 1] != -1) {
    		counter++;
    	}
    	if (counter >= 2) {
    		noData = true;
       	}
    }

    if (!noData) {
    	draw_duallinegraph(dataLine)
	}
	else {
    	noDataGraph(country);
	}
}

var draw_duallinegraph = function(data) {
	
	d3.selectAll(".dualgraph-vis").remove();

	var margin = {top: 60, right: 80, bottom: 30, left: 80},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y").parse,
	    bisectDate = d3.bisector((function(d) { return d.date; })).left;
	
	xLine = d3.scale.linear().domain(d3.extent(data, function(d) { return d.date; })).range([0, width]);
	var y1 = d3.scale.linear().domain([0, d3.max(data, function(d) { return Math.max(d.co2emissions); })]).range([height, 0]); 
	var y2 = d3.scale.linear().domain([0, d3.max(data, function(d) { return Math.max(d.gdp); })]).range([height, 0]);

	var line1 = d3.svg.line()
		.interpolate("linear") 
	    .x(function(d, i) { return xLine(d.date); })
	    .y(function(d) { return y1(d.co2emissions); });

	var line2 = d3.svg.line()
		.interpolate("linear") 
	    .x(function(d, i) { return xLine(d.date); })
	    .y(function(d) { return y2(d.gdp); });

	var svg = d3.select("#dualgraph").append("svg")
			.attr("class", "dualgraph-vis")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    	.attr("class", "dualgraph-g")
	        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xAxis = d3.svg.axis().scale(xLine).tickSize(-height).tickSubdivide(true).tickFormat(d3.format("d"));
	svg.append("g")
	      .attr("class", "graph_x graph_axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	var yAxisLeft = d3.svg.axis().scale(y1).ticks(5).orient("left");
	svg.append("g")
	      .attr("class", "graph_y graph_axis graph_axisLeft")
	      .attr("transform", "translate(-15,0)")
	      .call(yAxisLeft)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("CO2 emissions");

	var yAxisRight = d3.svg.axis().scale(y2).ticks(6).orient("right").tickFormat(d3.format("d"));
	svg.append("g")
	      .attr("class", "graph_y graph_axis graph_axisRight")
	      .attr("transform", "translate(" + (width+15) + ",0)")
	      .call(yAxisRight)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -13)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("GDP");

	var path = svg.append("path")
      .attr("d", line1(data))
      .attr("stroke", "blue")
      .attr("stroke-width", "2")
      .attr("fill", "none");

    var totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(1000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);

   	var path = svg.append("path")
      .attr("d", line2(data))
      .attr("stroke", "red")
      .attr("stroke-width", "2")
      .attr("fill", "none");

    var totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(1000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);

  	// HOVER
  	var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

	  focus.append("circle")
	  	  .attr("class", "circle")
	      .attr("r", 4.5);

	  focus.append("circle")
	      .attr("class", "circle2")
	      .attr("r", 4.5);

	  focus.append("text")
	  	  .attr("class", "textyear")
	      .attr("x", 9)
	      .attr("dy", ".35em");

	  focus.append("text")
	  	  .attr("class", "textemissions")
	      .attr("x", 9)
	      .attr("dy", ".35em")
	      .style("color", "red");

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

	function mouseMove() {
	    var x0 = xLine.invert(d3.mouse(this)[0]),
	        i = bisectDate(data, x0, 1),
	        d0 = data[i - 1],
	        d1 = data[i],
	        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
	   	focus.select("circle.circle").attr("transform", "translate(" + xLine(d.date) + "," + y1(d.co2emissions) + ")");
	   	focus.select("circle.circle2").attr("transform", "translate(" + xLine(d.date) + "," + y2(d.gdp) + ")");
	  	focus.select("text.textyear").attr("x", 9).attr("dy", -32).html('<tspan style="font-weight:bold">Year: </tspan>' + d.date);
	  	focus.select("text.textemissions").attr("x", 9).attr("dy", -17).html('<tspan style="font-weight:bold">CO2missions: </tspan>' + d.co2emissions);
	  	focus.select("text.textgdp").attr("x", 9).attr("dy", -2).html('<tspan style="font-weight:bold">GDP: </tspan>' + d.gdp);
	}
}

var timeMove = function(year) {

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

function noDataGraph() {

	d3.selectAll(".dualgraph-vis").remove();

	var margin = {top: 10, right: 80, bottom: 10, left: 80},
    width = 600 - margin.left - margin.right,
    height = 40 - margin.top - margin.bottom;

	d3.select("#dualgraph").append("text")
		.attr("class", "dualgraph-vis")
	    .attr("width", width + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .html(function(d) { return "Not enough data available of " + country + "<br/> " + "to visualize the CO2 emissions and GDP"; })
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

