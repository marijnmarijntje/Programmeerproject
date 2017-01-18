var getData = function(dataset, countrycode){
	data = [];


	for (var item in dataset) {
	 	data.push({ date: parseInt(item), 
	 				co2emissions: parseFloat(dataset[item][countrycode]["co2emissions"]),
	 				gdp: parseFloat(dataset[item][countrycode]["gdp"]) });
    }

    draw_duallinegraph(data);
}

var draw_duallinegraph = function(data) {

	d3.selectAll(".dualgraph-vis").remove();

	var margin = {top: 30, right: 80, bottom: 30, left: 80},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y").parse,
	    bisectDate = d3.bisector((function(d) { return d.date; })).left,
	    formatValue = d3.format(",.2f"),
	    formatCurrency = function(d) { return formatValue(d); };

    var x = d3.scale.linear().domain(d3.extent(data, function(d) { return d.date; })).range([0, width]);
	var y1 = d3.scale.linear().domain([0, d3.max(data, function(d) { return Math.max(d.co2emissions); })]).range([height, 0]); 
	var y2 = d3.scale.linear().domain([0, d3.max(data, function(d) { return Math.max(d.gdp); })]).range([height, 0]);

	var line1 = d3.svg.line()
	    .x(function(d, i) { return x(d.date); })
	    .y(function(d) { return y1(d.co2emissions); });

	var line2 = d3.svg.line()
	    .x(function(d, i) { return x(d.date); })
	    .y(function(d) { return y2(d.gdp); });

	var svg = d3.select("#dualgraph").append("svg")
			.attr("class", "dualgraph-vis")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true).tickFormat(d3.format("d"));
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
 
	svg.append("path").attr("d", line1(data)).attr("class", "data1");
  	
  	svg.append("path").attr("d", line2(data)).attr("class", "data2");

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
	  	  .attr("class", "text")
	      .attr("x", 9)
	      .attr("dy", ".35em");

	  focus.append("text")
	  	  .attr("class", "text2")
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
	    var x0 = x.invert(d3.mouse(this)[0]),
	        i = bisectDate(data, x0, 1),
	        d0 = data[i - 1],
	        d1 = data[i],
	        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
	   	focus.select("circle.circle").attr("transform", "translate(" + x(d.date) + "," + y1(d.co2emissions) + ")");
	   	focus.select("circle.circle2").attr("transform", "translate(" + x(d.date) + "," + y2(d.gdp) + ")");
	  	focus.select("text.text").attr("x", 9).attr("dy", 0).text("emissions: " + formatValue(d.co2emissions));
	  	focus.select("text.text2").attr("x", 9).attr("dy", 15).text("gdp: " + formatValue(d.gdp));
	}

	// LINE
	function timeMove(year) {
		var x0 = x.invert(d3.mouse(this)[0]),
	     	i = bisectDate(data, x0, 1),
	        d0 = data[i - 1],
	        d1 = data[i];
	        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
	    focus.attr("transform", "translate(" + x(d.date) + ")");
	}
}

