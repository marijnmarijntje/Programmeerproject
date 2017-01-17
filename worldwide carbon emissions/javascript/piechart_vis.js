var draw_piechart = function(year, data, countrycode) {

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
    
    country = data[countrycode].country

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

    node = data[countrycode]["piechart"];

    var g = svg.selectAll(".arc")
            .data(pie(node))
            .enter().append("g")
            .attr("class", "arc")

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

} 

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}