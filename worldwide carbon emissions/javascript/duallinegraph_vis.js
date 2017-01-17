var getData = function(dataset, countrycode){
	gdpList = [];
	co2List = [];
	years = [];
	   
	for (var item in dataset) {
		co2List.push(parseFloat(dataset[item][countrycode]["co2emissions"]));
		gdpList.push(parseFloat(dataset[item][countrycode]["gdp"]));
	 	years.push(item);
    }
    console.log(co2List);
    console.log(gdpList);
    console.log(years);
    draw_duallinegraph(dataset, years, co2List, gdpList);
}

var draw_duallinegraph = function(dataset, years, co2emissions, gdp) {

	d3.selectAll(".dualgraph-vis").remove();
	console.log(years[0]);
	console.log(years.length);

	var margin = {top: 30, right: 40, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

    var x = d3.scale.linear().domain([years[0], years[years.length - 1]]).range([0, width]);
	var y1 = d3.scale.linear().domain([0, d3.max(co2List, function(d) { return Math.max(d); })]) .range([height, 0]); 
	var y2 = d3.scale.linear().domain([0, d3.max(gdpList, function(d) { return Math.max(d); })]).range([height, 0]);

	var line1 = d3.svg.line()
	    .x(function(d, i) { return x(years[i]); })
	    .y(function(d) { return y1(d); });

	var line2 = d3.svg.line()
	    .x(function(d, i) { return x(years[i]); })
	    .y(function(d) { return y2(d); });

	var svg = d3.select("#dualgraph").append("svg")
			.attr("class", "dualgraph-vis")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// x.domain(d3.extent(data, function(d) { return d.years; }));
 //    y1.domain([0, d3.max(co2List, function(d) { return Math.max(d); })]); 
 //    y2.domain([0, d3.max(gdpList, function(d) { return Math.max(d.gdpList); })]);

    var xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true);
	svg.append("g")
	      .attr("class", "graph_x graph_axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	var yAxisLeft = d3.svg.axis().scale(y1).ticks(4).orient("left");
	svg.append("g")
	      .attr("class", "graph_y graph_axis graph_axisLeft")
	      .attr("transform", "translate(-15,0)")
	      .call(yAxisLeft);

	var yAxisRight = d3.svg.axis().scale(y2).ticks(6).orient("right");
	svg.append("g")
	      .attr("class", "graph_y graph_axis graph_axisRight")
	      .attr("transform", "translate(" + (width+15) + ",0)")
	      .call(yAxisRight);
 
	svg.append("path").attr("d", line1(co2List)).attr("class", "data1");
  	
  	svg.append("path").attr("d", line2(gdpList)).attr("class", "data2");
}

