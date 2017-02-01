// Name: Marijn Gulpen
// Student number: 10575243
// This javascript draws the worldmap

var drawWorldmap = function(dataset, year){
        
    d3.selectAll(".datamap").remove();
    d3.selectAll(".datamaps-legend").remove();

    data = dataset[year];

    var title1 = d3.selectAll("#title1")
        .html(function(d) { return "CO<sub>2</sub> emissions (in metric tons per capita) over the world in " + year });

    // make a datamap in worlmap from HTML
    var map = new Datamap( {
        element: document.getElementById("worldmap"),

            done: function(datamap) {
                datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography) {
                    currentcountry = geography.id;
                    getDataDonut(year, data, geography.id);
                    getDataGraph(dataset, geography.id);
                    timeMove(year);
                });
            },

         
            // if mouse over show more information about that country
            geographyConfig: {
                popupTemplate: function(geography, data) {
                    if ( !data ) return '<div class="hoverinfo"><strong>' + '<table class="hovertable"><tr><td>No data for this country!</td></tr></table></div>'; 
                    if (data.co2emissions == "nd") { return '<div class="hoverinfo"><strong>' + '<table class="hovertable"><tr><td>Country:</td><td>' + data.country + '</td></tr><tr><td>Emissions:</td><td>' + "No Data" + '</td></tr></table>' + '</div>'};
                    return '<div class="hoverinfo"><strong>' + '<table class="hovertable"><tr><td>Country:</td><td>' + data.country + '</td></tr><tr><td>Emissions:</td><td>' + data.co2emissions + '</td></tr></table></div>';
                },
                highlightFillColor: "#8e7216"
            },

            // colorchoices for the different catogories
            fills: {
                defaultFill: "#969696",
                noData: "#969696",
                low: "#ffe5bc",
                medLow: "#fdcc8a",
                medium: "#fc8d59",
                medHigh: "#e34a33",
                high: "#b30000"
            },

            // dataset used for coloring and hovering 
            data : data                        
    });

    // give the legend more specific information about the catogories
    map.legend({
        labels: {
            low: "< 1",
            medLow: "1 - 5",
            medium: "5 - 10",
            medHigh: "10 - 20",
            high: "> 20",
            noData: "No Data"
        },
    });
}