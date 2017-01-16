var draw_piechart = function(year, dataset, countrycode) {

    d3.selectAll(".arc").remove();
    d3.selectAll(".piechart-vis").remove();
    d3.selectAll(".piechart-legend").remove();

    var width = 400,
        height = 200,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#d7191c", "#fdae61", "#80b1d3", "#a6d96a", "#1a9641"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 7)
        .innerRadius(0);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
        return d.value;
        });
    
    // data = dataset[year];
    country = dataset[countrycode].country

    var svg = d3.select("#piechart").append("svg")
        .attr("class", "piechart-vis")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        svg.append("text")
            .text(function(d) { return "CO2 emission sources of " + country + " in " + year; })
                .attr("class", "piechart-title")
                .attr("x", -150)
                .attr("y", 120);

    node = dataset[countrycode]["piechart"];

    var g = svg.selectAll(".arc")
            .data(pie(node))
            .enter().append("g")
            .attr("class", "arc")
            .on("mouseover", function (d) {
                d3.selectAll("#tooltip")
                .style("visibility", "visible")
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
                .style("opacity", 1)
                .select("#value")
                .text(capitalizeFirstLetter(d.data.seriesname)); })
            .on("mouseout", function () {
                // Hide the tooltip
                d3.selectAll("#tooltip")
                .style("opacity", 0); });

        g.append("path")
            .attr("d", arc)
            .style("fill", function (d) {
            return color(d.data.value);})

        g.append("text")
        .attr("class", "numbers")
        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function (d) {return parseFloat(d.data.value).toFixed(1); }); 

        // var legend = d3.select("#piechart").append("svg")
        //   .attr("class", "piechart-legend")
        //   .selectAll("g")
        //   .data(data)
        //   .enter().append("g")
        //   .attr("transform", function(d) { return "translate(0," + 20 + ")"; });

        svg.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d) { return color(d.data.value); });

        svg.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function(d) { return d.data.seriesname; });
} 

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}