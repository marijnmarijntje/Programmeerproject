// Name: Marijn Gulpen
// Student number: 10575243
// This javascript draws the worldmap.

var drawWorldmap = function(year){
        
    d3.selectAll(".datamap").remove();
    d3.selectAll(".datamaps-legend").remove();

    // Select the right data for selected year
    data = orgData[year];

    var title1 = d3.selectAll("#title1")
        .html(function(d) { return "CO<sub>2</sub> emissions <small>(metric tons per capita)</small> over the world in " + year });
    
    // Make a datamap in worlmap from HTML
    var map = new Datamap( {
        element: document.getElementById("worldmap"),

            // When click on a country the two other visualizations will be updated
            done: function(datamap) {
                datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography) {
                    currentCountry = geography.id;
                    getDataDonut(year, data[currentCountry], geography.id);
                    getDataGraph(orgData, geography.id);
                    drawTimeLine(year);
                });
            },

         
            // If mouse over show countryname and emissions that country
            geographyConfig: {
                popupTemplate: function(geography, data) {
                    if ( !data ) return '<div class="hoverinfo"><strong>' + '<table class="hovertable"><tr><td>No data for this country!</td></tr></table></div>'; 
                    if (data.co2emissions == "nd") { return '<div class="hoverinfo"><strong>' + '<table class="hovertable"><tr><td>Country:</td><td>' + data.country + '</td></tr><tr><td>Emissions:</td><td>' + "No Data" + '</td></tr></table>' + '</div>'};
                    return '<div class="hoverinfo"><strong>' + '<table class="hovertable"><tr><td>Country:</td><td>' + data.country + '</td></tr><tr><td>CO<sub>2</sub> emissions:</td><td>' + data.co2emissions + '</td></tr></table></div>';
                },
                highlightFillColor: "#8e7216"
            },

            // Colorfill for the different catogories
            fills: {
                defaultFill: "#969696",
                noData: "#969696",
                low: "#ffe5bc",
                medLow: "#fdcc8a",
                medium: "#fc8d59",
                medHigh: "#e34a33",
                high: "#b30000"
            },

            // Dataset used for Datamap 
            data : data                        
    });

    // Give the legend more specific information about the catogories
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