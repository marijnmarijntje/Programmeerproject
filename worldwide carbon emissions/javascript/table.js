var get_table_data = function(dataset, donutyear) {
	var allData = [];
	var tableData = [];
	var noData = []; 
	for (var country in dataset) {
		if (dataset[country]["co2emissions"] != "nd") {
		 	tableData.push({ countrycode: dataset[country]["code"],
		 					Country: dataset[country]["country"],
		 					CO2emissions: parseFloat(dataset[country]["co2emissions"])
		 	});
	 	}
	 	else {
	 		noData.push({ countrycode: dataset[country]["code"],
		 					Country: dataset[country]["country"],
		 					CO2emissions: "No Data"
		 	});
	 	}
    }

    var numranking = tableData.sort(function(a, b) { return a.CO2emissions < b.CO2emissions ? 1 : -1; })
                .slice(0, tableData.length);

    var alphranking = noData.sort(function(a, b) {return a.Country > b.Country ? 1 : -1 })
    			.slice(0, noData.length);;
    
    for (var datapoint in tableData) {
    	allData.push(tableData[datapoint]);
    }
    for (var datapoint in noData) {
    	allData.push(noData[datapoint]);
    }
    
    for (var i = 0; i < allData.length; i++) {
    	allData[i].Ranking = i + 1;
    }

    draw_table(allData, dataset, donutyear);
}

var draw_table = function(tableData, dataset, donutyear) {

	d3.selectAll("table").remove();
	d3.selectAll(".columns").remove();

	var columns = ["Ranking", "Country", "CO2emissions"];

	var table = d3.select("#ranktable")
		.append("table");
	var thead = d3.select("#tablehead")
		.append("thead");
	var tbody = d3.select("#tablebody")
		table.append("tbody");

	var header = thead.append("tr")
		.selectAll("th")
		.data(columns)
		.enter()
		.append("th")
		.attr("class", "columns")
		.attr("id", function(d) { return d;});
  	
  	var rows = tbody.selectAll("tr")
		.data(tableData)
		.enter()
		.append("tr")
		.attr("class", function(d) { return d.countrycode})
		// .attr("id", function(d) {return "hover" + d.countrycode})
		.on("mouseover", function(d){
			d3.select(this)
				.style("background-color", "coral");
			select_country = "." + d.countrycode;
           	over_color = d3.select(select_country).style("fill");
			// countryrow = "." + d.countrycode;
			d3.select(select_country)
				.style("fill", "#8e7216");
		})
		.on("mouseout", function(d){
			d3.select(this)
				.style("background-color","transparent");
			d3.select(select_country)
				.style("fill", over_color);           
		})
		.on("click", function(d) {
			// if (norm_color) {
			// 	d3.select(click_country).style("fill", norm_color);
			// }
			// click_country = "." + d.countrycode;
			// console.log(click_country);
   //         	norm_color = d3.select(click_country).style("fill",);
			// // countryrow = "." + d.countrycode;
			// d3.select(click_country).style("fill", "#8e7216");

			getDataDonut(donutyear, dataset, d.countrycode);
			getDataGraph(orgData, d.countrycode);
			timeMove(year);
		});


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
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

