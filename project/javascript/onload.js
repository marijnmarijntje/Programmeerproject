// Name: Marijn Gulpen
// Student number: 10575243
// This javascript file is the homepage file, which loads the data, 
// draws the timeslider and calls the functions of the visualizations

var orgData;
var currentCountry;
var xLine; 
var normColor;
var firstYear;

window.onload = function(){ 
  drawLineGraph();
  
  d3.json("project/data/data.json", function(error, dataset) {      
      if (error) throw error;
      orgData = dataset; 

      formatDate = d3.time.format("%Y");

      var margin = { top: 50, right: 85, bottom: 20,left: 85 },
        width = 1100 - margin.left - margin.right,
        height = 150 - margin.bottom - margin.top;

      var timeScale = d3.time.scale()
        .domain([new Date("1960"), new Date("2013")])
        .range([0, width])
        .clamp(true);

      // Defaultsettings
      var startValue = timeScale(new Date("2012"));
      startingValue = new Date("2012");
      year = formatDate(startingValue);
      currentCountry = "USA";

      // Default visualizations
      drawWorldmap(year);
      getDataTable(dataset[year], year);
  	  getDataDonut(year, dataset[year][currentCountry], currentCountry);
      getDataGraph(dataset, currentCountry);
      drawTimeLine(year);

      // Defines brush
      var brush = d3.svg.brush()
        .x(timeScale)
        .extent([startingValue, startingValue])
        .on("brush", brushed);

      var svg = d3.select("#time-slider").append("svg")
        .attr("class", "svg-slider")
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
        .attr("class", "x timeaxis")
      .attr("transform", "translate(0," + height / 2 + ")")
      .call(d3.svg.axis()
        .scale(timeScale)
        .orient("bottom")
        .tickFormat(function(d) { return formatDate(d); })
        .tickSize(0)
        .tickPadding(12)
        .tickValues([timeScale.domain()[0], timeScale.domain()[1]]))
        .select(".domain")
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "halo");

      // Append slider
      var slider = svg.append("g")
        .attr("class", "slider")
        .call(brush);

      slider.insert("g", ".track-overlay")
  	    .attr("class", "ticks")
  	    .attr("transform", "translate(0," + 18 + ")")

      slider.selectAll(".extent,.resize")
        .remove();

      slider.select(".background")
        .attr("height", height);

      var handle = slider.append("g")
        .attr("class", "handle")

      // Defines the selected year
      handle.append("circle")
        .attr("transform", "translate(0," + height / 2 + ")")
        .style("fill", "white")
        .style("stroke", "grey")
        .attr("r", 8);
        
      handle.append("text")
        .text(startingValue)
        .attr("class", "slideryear")
        .attr("transform", "translate(" + (-18) + " ," + (height / 2 - 18) + ")");

      slider
        .call(brush.event)

      // Function used when the timeslider selects another year
      function brushed() {
        var value = brush.extent()[0];

        if (d3.event.sourceEvent) { 
          value = timeScale.invert(d3.mouse(this)[0]);
          brush.extent([value, value]);
          year = formatDate(value);

          drawWorldmap(year);
          getDataTable(dataset[year], year);
          getDataDonut(year, dataset[year][currentCountry], currentCountry); 
          drawTimeLine(year);
        }

         	handle.attr("transform", "translate(" + timeScale(value) + ",0)");
          handle.select('text').text(formatDate(value));
              
      }
  });
}
