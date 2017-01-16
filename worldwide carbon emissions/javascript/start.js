
d3.json("data/interactive_visu_data.json", function(error, dataset) {        
    if (error) throw error;

    // timeslider
    formatDate = d3.time.format("%Y");

    // parameters
    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
      },
      width = 960 - margin.left - margin.right,
      height = 130 - margin.bottom - margin.top;

    // scale function
    var timeScale = d3.time.scale()
      .domain([new Date("1960"), new Date("2013")])
      .range([0, width])
      .clamp(true);

    // initial value
    var startValue = timeScale(new Date("2012"));
    startingValue = new Date("2012");
    year = formatDate(startingValue);
    // draw_worldmap(year);

    // defines brush
    var brush = d3.svg.brush()
      .x(timeScale)
      .extent([startingValue, startingValue])
      .on("brush", brushed);

    var svg = d3.select("#time-slider").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      // classic transform to position g
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
      .attr("class", "x axis")
    // put in middle of screen
    .attr("transform", "translate(0," + height / 2 + ")")
    // inroduce axis
    .call(d3.svg.axis()
      .scale(timeScale)
      .orient("bottom")
      .tickFormat(function(d) {
        return formatDate(d);
      })
      .tickSize(0)
      .tickPadding(12)
      .tickValues([timeScale.domain()[0], timeScale.domain()[1]]))
      .select(".domain")
      .select(function() {
            return this.parentNode.appendChild(this.cloneNode(true));
      })
      .attr("class", "halo");

    var slider = svg.append("g")
      .attr("class", "slider")
      .call(brush);

    slider.selectAll(".extent,.resize")
      .remove();

    slider.select(".background")
      .attr("height", height);

    var handle = slider.append("g")
      .attr("class", "handle")

    handle.append("path")
      .attr("transform", "translate(0," + height / 2 + ")")
      .attr("d", "M 0 -5 V 5")

    handle.append('text')
      .text(startingValue)
      .attr("transform", "translate(" + (-18) + " ," + (height / 2 - 25) + ")");

    slider
      .call(brush.event)

    function brushed() {
      var value = brush.extent()[0];

      if (d3.event.sourceEvent) { 
        value = timeScale.invert(d3.mouse(this)[0]);
        brush.extent([value, value]);
        year = formatDate(value);
        draw_worldmap(year);

      }

          handle.attr("transform", "translate(" + timeScale(value) + ",0)");
          handle.select('text').text(formatDate(value));
            
    }    











    var draw_worldmap = function(year){
        
        d3.selectAll(".datamap").remove();

        data = dataset[year];
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
    }    













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

var svg = d3.select("#piechart").append("svg")
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
