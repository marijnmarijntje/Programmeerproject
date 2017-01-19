var get_table_data = function(dataset) {
	var tableData = [];

	for (var country in dataset) {
	 	tableData.push({ Country: dataset[country]["country"],
	 				CO2emissions: parseFloat(dataset[country]["co2emissions"]),
	 				GDP: parseFloat(dataset[country]["gdp"]) });
    }

   	draw_table(tableData);
}

var draw_table = function(data) {

	d3.selectAll("table").remove();

	var table = d3.select("#ranktable")
		.append("table"),
		thead = table.append("thead"),
		tbody = table.append("tbody");

	var columns = Object.keys(data[0])
		.filter(function(d){ return (d); });

	var header = thead.append("tr")
		.selectAll("th")
		.data(columns)
		.enter()
		.append("th")
			.text(function(d){ return d; })

  	var rows = tbody.selectAll("tr")
		.data(data)
		.enter()
		.append("tr")
		.on("mouseover", function(d){
			d3.select(this)
				.style("background-color", "orange");
		})
		.on("mouseout", function(d){
			d3.select(this)
				.style("background-color","transparent");
		});

	var cells = rows.selectAll("td")
		.data(function(row) { return columns.map(function(d, i)
							{ return {i: d, value: row[d]};	}); })
		.enter()
		.append("td")
		.html(function(d){ return d.value ;});
}