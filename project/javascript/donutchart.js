// Name: Marijn Gulpen
// Student number: 10575243
// This javascript draws the donutchart if there is enough data
// in case there is no data a 'no data' screen  will appear.

// Function checks if there is data for selected country
var getDataDonut = function(year, donutData, countrycode) {

    country = donutData["country"];
    donutData = donutData["piechart"];
    
    for (var key in donutData) {
        if (donutData[key]["value"] == "nd") {
            var noData = true;    
        }
    }

    if (noData) {
        noDataDonut(country);
    }
    else {
        drawDonutChart(year, data, countrycode);
    }   
}

// In this function the donutchart will be drawn inclusive legend and tooltip
var drawDonutChart = function(year, data, countrycode) {

    d3.selectAll(".donutVis").remove();
    d3.selectAll(".svgg").remove();
    
    var width = 620,
        height = 300;

    var svg = d3.select("#donutchart").append("svg")
        .attr("class", "donutVis")
        .attr("width", width)
        .attr("height", height)
    	.append("g")
        .attr("class", "svgg")

    svg.append("g")
    	.attr("class", "slices");

    var width = 250,
        height = 280,
    	radius = Math.min(width, height) / 2;

    var pie = d3.layout.pie()
    	.value(function(d) {
        	return d.value;
    	});

    var arc = d3.svg.arc()
    	.outerRadius(radius * 0.8)
    	.innerRadius(radius * 0.4);

    var outerArc = d3.svg.arc()
    	.innerRadius(radius * 0.9)
    	.outerRadius(radius * 0.9);

    var legendRectSize = 18;
    var legendSpacing = 4;

    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scale.ordinal()
                .range(["#98abc5", "#6b486b", "#c68781", "#d0743c", "#ff8c00"]); 

    var div = d3.select("#donutchart").append("div").attr("class", "toolTip");
    node = data[countrycode]["piechart"];

    d3.select("#title2")
        .html(function(d) { return "CO<sub>2</sub> emissions <small>(% of fuel combustion)</small> by source - " + 
                            '<tspan style="font-weight:bold">' + country + '</tspan>' +  " - " + 
                            '<tspan style="font-weight:bold">' + year + '</tspan>'});

    // Defines parts of chart
    var slice = svg.select(".slices").selectAll("path.slice")
        .data(pie(node), function(d){ return d.data.seriesname })

    slice.enter()
        .insert("path")
        .style("fill", function(d) { return color(d.data.seriesname); })
        .attr("class", "slice");

    slice
        .transition().duration(1000)
        .attrTween('d', function(d) {
            var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
            return function(t) {
                return arc(interpolate(t));
            };
        })

   // Defines the legend of the chart and gives every block a ID
    var legend = svg.selectAll('.legend')
        .data(color.domain())
        .sort(d3.descending)
        .enter()
        .append('g')
        .attr("class", "legend")
        .attr("id", function(d) { return d.substring(0, 4)} )
        .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset =  height * color.domain().length / 2;
            var horz = 7 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append('rect')
        .attr("class", "squares")
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { return d; })
        .attr("id", function(d) {return d.seriesname});

    // Interactive component of the function which also activates 
    // the legend by their ID
    slice.on("mousemove", function(d){
        div.style("left", 105+"px");
        div.style("top", 180+"px");
        div.style("display", "inline-block");
        div.html(d.data.value +"%");
        d3.select(this)
                .style("opacity", 1);
        d3.select("#" + d.data.seriesname.substring(0, 4))
                .style("font-weight", "bold");
        });

    slice.on("mouseout", function(d){
        div.style("display", "none");
        d3.select(this)
                .style("opacity", 0.7);
         d3.select("#" + d.data.seriesname.substring(0, 4))
                .style("font-weight", "normal");
        });

    slice.exit()
        .remove();
}

// Function only used if there is no data for the donutchart
function noDataDonut(country) {

    d3.selectAll(".donutVis").remove();

    var margin = {top: 20, right: 80, bottom: 10, left: 80},
    width = 600 - margin.left - margin.right,
    height = 40 - margin.top - margin.bottom;

    d3.select("#title2")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .html(function(d) { return "No data available to visualize the CO<sub>2</sub> emissions, by sources - " 
                            + '<tspan style="font-weight:bold">' + country + '</tspan>' + " - " +
                            '<tspan style="font-weight:bold">' + year + '</tspan>'})
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}