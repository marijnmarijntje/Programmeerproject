// Onloadfile

var currentcountry;

window.onload = function() {

	currentcountry = "USA";
	// load json file from localhost
	d3.json("data/data.json", function(error, dataset) {       
	    if (error) throw error;

	    // TIMESLIDER //

	    formatDate = d3.time.format("%Y");

	    // parameters
	    var margin = {
	        top: 50,
	        right: 50,
	        bottom: 20,
	        left: 50
	      },
	      width = 623 - margin.left - margin.right,
	      height = 150 - margin.bottom - margin.top;

	    // scale function
	    var timeScale = d3.time.scale()
	      .domain([new Date("1960"), new Date("2013")])
	      .range([0, width])
	      .clamp(true);

	    // initial value
	    var startValue = timeScale(new Date("2012"));
	    startingValue = new Date("2012");
	    year = formatDate(startingValue);

	    // start visualisations
	    draw_worldmap(dataset, year);
		draw_donutchart(year, dataset[year], currentcountry);
	    get_table_data(dataset[year]);
	    getData(dataset, currentcountry);

	    // defines brush
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
	        draw_worldmap(dataset, year);
	        draw_donutchart(year, dataset[year], currentcountry);
	        get_table_data(dataset[year]);

	      }

	       	handle.attr("transform", "translate(" + timeScale(value) + ",0)");
	        handle.select('text').text(formatDate(value));
	            
	    }

    // close JSON
    });
// close window.onload
} 