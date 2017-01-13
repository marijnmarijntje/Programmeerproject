
d3.json("data/interactive_visu_data.json", function(error, data) {        
    if (error) throw error;

    data = data["2013"]
  
    // var draw_worldmap = function(year){}
    // data = data[year]

    // make a datamap in worlmap from HTML
    var map = new Datamap( {
        element: document.getElementById("worldmap"),

            done: function(datamap) {
                datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                    draw_piechart(data, geography.id);
                });
            },
            // if mouse over show more information about that country
            geographyConfig: {
                popupTemplate: function(geography, data) {
                    if ( !data ) return '<div class="hoverinfo"><strong>' + '<table class="hovertable"><tr><td>No data for this country!</td></tr></table>' + '</div>'; 
                    if (data.co2emissions == "nd") return '<div class="hoverinfo"><strong>' + '<table class="hovertable"><tr><td>Country:</td><td>'+ data.country +'</td></tr><tr><td>Emissions:</td><td>' + "No Data" + '</td></tr></table>' + ' </div>';
                    return '<div class="hoverinfo"><strong>' + '<table class="hovertable"><tr><td>Country:</td><td>'+ data.country +'</td></tr><tr><td>Emissions:</td><td>' + parseFloat(data.co2emissions).toFixed(2) + '</td></tr></table>' + ' </div>';
                },
            },

            // colorchoices for the different catogories
            fills: {
                defaultFill: "#969696",
                noData: "#969696",
                low: '#ffe5bc',
                medLow: '#fdcc8a',
                medium: '#fc8d59',
                medHigh: '#e34a33',
                high: '#b30000'
            },

            // dataset used for coloring and hovering 
            data : data                        
    });

        // give the legend more specific information about the catogories
    map.legend({
        labels: {
            low: "0 - 1",
            medLow: "1 - 5",
            medium: "5 - 10",
            medHigh: "10 - 20",
            high: "> 20",
            noData: "No Data"
    },
});

var draw_piechart = function(data, countrycode) {

d3.selectAll(".arc").remove();
d3.selectAll(".piechart-vis").remove();

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

var svg = d3.select("body").append("svg")
    .attr("class", "piechart-vis")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.append("text")
        .text(function(d) { return "CO2 emission sources of " + country + " in 2013"; })
            .attr("class", "piechart-title")
            .attr("x", -150)
            .attr("y", 120);

node = data[countrycode]["piechart"];

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
    .attr("transform", function (d) {
    return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function (d) {return parseFloat(d.data.value).toFixed(1); }); 
               
    } 
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
