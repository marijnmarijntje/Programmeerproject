var get_table_data = function(dataset) {
	var interData = [];


	for (var country in dataset) {
	 	interData.push({ countrycode: dataset[country]["code"],
	 				Country: dataset[country]["country"],
	 				CO2emissions: parseFloat(dataset[country]["co2emissions"]),
	 				GDP: parseFloat(dataset[country]["gdp"]) });
    }
   	draw_table(interData, dataset);
}

var draw_table = function(interData, dataset) {

	d3.selectAll("table").remove();

	var table = d3.select("#ranktable")
		.append("table"),
		thead = table.append("thead"),
		tbody = table.append("tbody");

	var columns = Object.keys(interData[0])
		.filter(function(d){ if(d != "countrycode") { return (d); }; });

	var header = thead.append("tr")
		.selectAll("th")
		.data(columns)
		.enter()
		.append("th")
			.text(function(d){ return d; })

  	var rows = tbody.selectAll("tr")
		.data(interData)
		.enter()
		.append("tr")
		.attr("class", function(d) { return d.countrycode})
		.on("mouseover", function(d){
			d3.select(this)
				.style("background-color", "coral");
			select_country = "." + d.countrycode;
           	norm_color = d3.select(select_country).style("fill");
			countryrow = "." + d.countrycode;
			d3.select(countryrow)
				.style("fill", "black");
		})
		.on("mouseout", function(d){
			d3.select(this)
				.style("background-color","transparent");
			d3.select(countryrow)
				.style("fill", norm_color);           
		});

	// rows
	// 	.data(dataset)
	// 	.on("click", function(d){
	// 		countrycode = "#" + d.countrycode;
	// 		console.log(countrycode);
	// 		draw_donutchart(year, data, countrycode);
 //            getData(dataset, countrycode);
	// 	})


	var cells = rows.selectAll("td")
		.data(function(row) { return columns.map(function(d, i)
							{ return {i: d, value: row[d]};	}); })
		.enter()
		.append("td")
		.html(function(d){ return d.value ;});
}

function myFunction() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("ranktable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}