var draw_donutchart = function(year, data, countrycode) {

    d3.selectAll(".svgdonut").remove();
    d3.selectAll(".svgg").remove();
    
    var svg = d3.select("#donutchart")
    	.append("svg")
        .attr("class", "svgdonut")
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

    var colorRange = d3.scale.category20();
    var color = d3.scale.ordinal()
    	.range(colorRange.range());

    var div = d3.select("#donutchart").append("div").attr("class", "toolTip");
    node = data[countrycode]["piechart"];

    /* ------- PIE SLICES -------*/
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

    /* ------- LEGEND -------*/

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
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { return d; })
        .attr("id", function(d) {return d.seriesname});
        
    slice.on("mousemove", function(d){
        div.style("left", 90+"px");
        div.style("top", 120+"px");
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
                .style("opacity", 0.6);
         d3.select("#" + d.data.seriesname.substring(0, 4))
                .style("font-weight", "normal");
        });

    slice.exit()
        .remove();
}