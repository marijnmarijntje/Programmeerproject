# Programmeerproject Design Document
## Door Marijn Gulpen 09-07-2017

### **Linegraph** (visualisation 1)
A function will be written called: *var draw_lingegraphdual = function(linegraphdata, countrycode){}*
This visualisation will be the same and has no interactivity with other visualisations and will be made after the other three visualisations are finished.
The JSON and other specific information for this visualisation will be given later.
Database used : [NASA](http://climate.nasa.gov/vital-signs/global-temperature)

### The three linked visualisations
Database used : [worldbank databases](http://databank.worldbank.org/data/home.aspx)
All data for visualisation 2, 3 and 4 will be saved in one JSON file with the next format:
*It needs to be noted that values are exactly the same in the two years but that is just for the example*.

{
1960: 
	{
		"DZA": {"co2emissions": "0.553763578", "gdp": "244.8237353", "piechart": [{"seriesname": "source4", "value": "nd"}, {"seriesname": "source2", "value": "nd"}, {"seriesname": "source3", "value": "nd"}, {"seriesname": "source5", "value": "nd"}, {"seriesname": "source1", "value": "nd"}], "location": "Algeria", "fillkey": "low"}, 
		"AGO": {"co2emissions": "0.104357101", "gdp": "nd", "piechart": [{"seriesname": "source4", "value": "nd"}, {"seriesname": "source2", "value": "nd"}, {"seriesname": "source3", "value": "nd"}, {"seriesname": "source5", "value": "nd"}, {"seriesname": "source1", "value": "nd"}], "location": "Angola", "fillkey": "low"}, 
		"EGY": {"co2emissions": "0.593007187", "gdp": "nd", "piechart": [{"seriesname": "source4", "value": "nd"}, {"seriesname": "source2", "value": "nd"}, {"seriesname": "source3", "value": "nd"}, {"seriesname": "source5", "value": "nd"}, {"seriesname": "source1", "value": "nd"}], "location": "Egypt  Arab Rep.", "fillkey": "low"},
		etc...
	},
...
2013:
	{
		"DZA": {"co2emissions": "0.553763578", "gdp": "244.8237353", "piechart": [{"seriesname": "source4", "value": "nd"}, {"seriesname": "source2", "value": "nd"}, {"seriesname": "source3", "value": "nd"}, {"seriesname": "source5", "value": "nd"}, {"seriesname": "source1", "value": "nd"}], "location": "Algeria", "fillkey": "low"}, 
		"AGO": {"co2emissions": "0.104357101", "gdp": "nd", "piechart": [{"seriesname": "source4", "value": "nd"}, {"seriesname": "source2", "value": "nd"}, {"seriesname": "source3", "value": "nd"}, {"seriesname": "source5", "value": "nd"}, {"seriesname": "source1", "value": "nd"}], "location": "Angola", "fillkey": "low"}, 
		"EGY": {"co2emissions": "0.593007187", "gdp": "nd", "piechart": [{"seriesname": "source4", "value": "nd"}, {"seriesname": "source2", "value": "nd"}, {"seriesname": "source3", "value": "nd"}, {"seriesname": "source5", "value": "nd"}, {"seriesname": "source1", "value": "nd"}], "location": "Egypt  Arab Rep.", "fillkey": "low"},
		etc...
	}
}

* Unit of CO2 emissions is metric tons per capita
* Units of all sources: % of total fuel combustion
* Fillkeys will be based on the highest and lowest CO2emission found over the three years.

#### **Worldmap** (visualisation 2)
To visualize the world map over the years 1960 till 2013 with a timeslider, it is needed to write a function with a parameter for **year**.
The function will look like this: *var draw_worldmap = function(file1, year){}*
Which parameter will be used will be determined with a toggledown menu. 
Data that will be visualized in the map for that specific year:
* CO2 emissions: this will be visualized by coloring the map
* Country name and CO2 emission in numbers: will be shown when hovering over 
* optional = GDP of specific country: will be shown when hovering over 
* optional = Population size: will be shown when hovering over 

When you click on a country two visualisations will be visible:
* A linegraph, for this visualisation the country code needs to be given
* A pieart , for this visualisation the country code and year needs to be given

Both will be explained later.

It may be easier to use a CSV document instead of a JSON.
I found two examples of this:
* *[Example 1 with the use of CSV](https://d3-geomap.github.io/map/choropleth/world/)*
This example uses d3.geomap.chloropleth and its advantage is that the data does not have to be converted into a JSON.
However I'm not sure if its possible to make your own catogories, which was possible with the fillkey in a JSON format.
* *[Example 2 with the use of CSV](https://plot.ly/javascript/choropleth-maps/)*
In this example it is possible to make your own colorscale. It makes use of plotly.js.

### **Linegraph with dual y-axes** (visualisation 3)

A function will be written called: *var draw_lingegraphdual = function(file2, countrycode){}*
The JSON format for the linegraph is shown below. The data will be used from the year 1960 till the year 2013.

{
"DZA": 
	{
		{"date": 1960, "gdp": 290, "CO2emission": 10},
		{"date": 1961, "gdp": 400, "CO2emission": 12},
		{"date": 1962, "gdp": 450, "CO2emission": 9},
		...
		{"date": 2013, "gdp": 300, "CO2emission": 13},
	},
"AGO": 
	{
		{"date": 1960, "gdp": 200, "CO2emission": 13},
		{"date": 1961, "gdp": 210, "CO2emission": 14},
		{"date": 1962, "gdp": 240, "CO2emission": 14},
		...
		{"date": 2013, "gdp": 290, "CO2emission": 12},
	},
"EGY": 
	{
		{"date": 1960, "gdp": 300, "CO2emission": 20},
		{"date": 1961, "gdp": 320, "CO2emission": 30},
		{"date": 1962, "gdp": 450, "CO2emission": 29},
		...
		{"date": 2013, "gdp": 500, "CO2emission": 40},
	}
}

[Example from internet](http://jsfiddle.net/spanndemic/tyLvshfa/) where they made linegraph with two y-axes. However, they pasted the data in the javascript. 

However I decided to make only one JSON file and therefore, more the dual line graph will take more effort since the JSON is not in a perfect format. It is possible though.

### **Piechart** (visualisation 4)

A function will be written called: *var draw_piechart = function(file1, countrycode, year){}*
The countrycode and year needs to be given to this function.

Data for the interactive visualisations are also in file1.

source1: CO2 emissions from manufacturing industries and construction
source2: CO2 emissions from other sectors, excluding residential buildings and commercial and public services
source3: CO2 emissions from transport
source4: CO2 emissions from electricity and heat production, total 
source5: CO2 emissions from residential buildings and commercial and public services

## Drawing of the three interactive visualisations

![GitHub Logo](/doc/design1.jpg)
