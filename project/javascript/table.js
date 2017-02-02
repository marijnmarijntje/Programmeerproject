// Name: Marijn Gulpen
// Student number: 10575243
// This javascript first transforms the data into the correct format
// and ranking. After that a table will made with the ranking.

// Function ranks the data in right order and converts it in right format
var getDataTable = function(dataset, donutyear) {
	// List that will used to store all data
	var tableData = [];
	// Lists to store temporary nummerical data and no data points
	var numData = [];
	var noData = []; 

	// Puts the data in the right list and right format
	for (var country in dataset) {
		if (dataset[country]["co2emissions"] != "nd") {
		 	numData.push({ countrycode: dataset[country]["code"],
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

    // Sort countries in descending order
    var numranking = numData.sort(function(a, b) { return a.CO2emissions < b.CO2emissions ? 1 : -1; })
                .slice(0, tableData.length);

    // Sort countries without data in alphabetical order 
    var alphranking = noData.sort(function(a, b) {return a.Country > b.Country ? 1 : -1 })
    			.slice(0, noData.length);;
    
   	// Collects both lists in one big list
    for (var datapoint in numData) {
    	tableData.push(numData[datapoint]);
    }
    for (var datapoint in noData) {
    	tableData.push(noData[datapoint]);
    }
    
    // Gives a ranking to every country based on the big list
    for (var i = 0; i < tableData.length; i++) {
    	tableData[i].Ranking = i + 1;
    }

    drawTable(tableData, dataset, donutyear);
}

var drawTable = function(tableData, dataset, donutyear) {

	d3.selectAll("table").remove();
	d3.selectAll(".columns").remove();

	var columns = ["Ranking", "Country", "CO2emissions"];

	var table = d3.select("#ranktable")
		.append("table")
		.attr("class", "table table-condensed"),
	thead = table.append("thead"),
	tbody = table.append("tbody")
			.attr("class", "tablecontent");

	// Defines header
	var header = thead.append("tr")
		.selectAll("th")
		.data(columns)
		.enter()
		.append("th")
		.attr("id", function(d) { return d;});
  	
  	// Defines rows and gives every row an ID (same as countrycode)
  	var rows = tbody.selectAll("tr")
		.data(tableData)
		.enter()
		.append("tr")
		.attr("class", function(d) { return d.countrycode})
		// Fills country in worldmap when hovering over rows
		.on("mouseover", function(d){
			d3.select(this)
				.style("background-color", "coral");
			selectCountry = "." + d.countrycode;
           	normColor = d3.select(selectCountry).style("fill");
			d3.select(selectCountry)
				.style("fill", "#8e7216");
		})
		.on("mouseout", function(d){
			d3.select(this)
				.style("background-color","transparent");
			d3.select(selectCountry)
				.style("fill", normColor);           
		})
		// Calls the two other visualization when user clicks on a row
		.on("click", function(d) {
			currentCountry = d.countrycode;
			getDataDonut(donutyear, dataset[currentCountry], currentCountry);
			getDataGraph(orgData, currentCountry);
			drawTimeLine(year);
		});

	var cells = rows.selectAll("td")
		.data(function(row) { return columns.map(function(d, i)
							{ return {i: d, value: row[d]};	}); })
		.enter()
		.append("td")
		.html(function(d){ return d.value ;});
}

// Function to search a specific country in the table
function searchFunction() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchbar");
  filter = input.value.toUpperCase();
  table = document.getElementById("ranktable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and does ot display cells that not match the search 
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

