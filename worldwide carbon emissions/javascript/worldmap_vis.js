var draw_worldmap = function(dataset, year){
        
    d3.selectAll(".datamap").remove();
    d3.selectAll(".datamaps-legend").remove();

    data = dataset[year];
    // make a datamap in worlmap from HTML
    var map = new Datamap( {
        element: document.getElementById("worldmap"),

            done: function(datamap) {
                datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                    currentcountry = geography.id;
                    draw_piechart(year, data, geography.id);
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
}