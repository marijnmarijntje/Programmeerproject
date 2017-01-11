# Programmeerproject Design Document
## Door Marijn Gulpen 09-07-2017

### **Linegraph** (visualisation 1)
A function will be written called: *var draw_lingegraphdual = function(linegraphdata, countrycode){}*
This visualisation will be the same and has no interactivity with other visualisations and will be made after the other three visualisations are finished.
The JSON and other specific information for this visualisation will be given later.
Database used : [NASA](http://climate.nasa.gov/vital-signs/global-temperature)

### The three linked visualisations
Database used : [worldbank databases](http://databank.worldbank.org/data/home.aspx)

The three visualisations will be draw with three different JSON files. To do this a *d3.queue* will be used.
[Example from internet](https://github.com/d3/d3-queue)
d3.queue()
    .defer(fs.stat, __dirname + "/../worldmapdata.json")
    .defer(fs.stat, __dirname + "/../linegraphdualdata.json")
    .await(function(error, file1, file2) {
      if (error) throw error;
      console.log(file1, file2);
    });

file1 will be used for visualisation 2 and 4
file2 will be used for visualisation 3

#### **Worldmap** (visualisation 2)
To visualize the world map over 3 different years (2007, 2010 and 2013), it is needed to write a function with a parameter for **year**.
The function will look like this: *var draw_worldmap = function(file1, year){}*
Which parameter will be used will be determined with a toggledown menu. 
Data that will be visualized in the map for that specific year:
* CO2 emissions: this will be visualized by coloring the map
* Country name and CO2 emission in numbers: will be shown when hovering over 
* optional = GDP of specific country: will be shown when hovering over 
* optional = Population size: will be shown when hovering over 

The data needs to be converted from a CSV to a JSON format.
This is an example of how the JSON format needs to look like. Needs to be noted that the numbers are randomly chosen. 

{
2007: 
	{
		"DZA": {"country": "Algeria", "CO2emission": "25.5", "fillKey": "low", "piechart": [{"seriesname": "source1", "value": 44.62809917355373}, {"seriesname": "source2", "value": 55.371900826446286}, {"seriesname": "source3", "value": 44.62809917355373}, {"seriesname": "source4", "value": 44.62809917355373}, {"seriesname": "source5", "value": 44.62809917355373}]}, 
		"AGO": {"country": "Angola", "CO2emission": "156.9", "fillKey": "veryHigh", piechart:[...]}, 
		"EGY": {"country": "Egypt Arab Rep.", "C02emission": "24", "fillKey": "veryLow", piechart:[...]},
		etc..
	},
2010:
	{
		"DZA": {"country": "Algeria", "CO2emission": "25.5", "fillKey": "low", piechart:[...]}, 
		"AGO": {"country": "Angola", "CO2emission": "156.9", "fillKey": "veryHigh", piechart:[...]}, 
		"EGY": {"country": "Egypt Arab Rep.", "C02emission": "24", "fillKey": "veryLow", piechart:[...]}
		etc..
	},
2013:
	{
		"DZA": {"country": "Algeria", "CO2emission": "25.5", "fillKey": "low", piechart:[...]}, 
		"AGO": {"country": "Angola", "CO2emission": "156.9", "fillKey": "veryHigh", piechart:[...]}, 
		"EGY": {"country": "Egypt Arab Rep.", "C02emission": "24", "fillKey": "veryLow", piechart:[...]}
		etc..
	}
}

Fillkeys will be based on the highest and lowest CO2emission found over the three years.

For the *minimum viable product*  I'll use these three years, however if this is done I'll try to make a timeslider instead of a toggle down menu.
For a timeslider I will use more years. So the JSON file will be larger.

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
		{"date": 1960, "gdp": 290, "CO2emission": 10}
		{"date": 1961, "gdp": 400, "CO2emission": 12}
		{"date": 1962, "gdp": 450, "CO2emission": 9}
		...
		{"date": 2013, "gdp": 300, "CO2emission": 13}
	}
"AGO": 
	{
		{"date": 1960, "gdp": 200, "CO2emission": 13}
		{"date": 1961, "gdp": 210, "CO2emission": 14}
		{"date": 1962, "gdp": 240, "CO2emission": 14}
		...
		{"date": 2013, "gdp": 290, "CO2emission": 12}
	}
"EGY": 
	{
		{"date": 1960, "gdp": 300, "CO2emission": 20}
		{"date": 1961, "gdp": 320, "CO2emission": 30}
		{"date": 1962, "gdp": 450, "CO2emission": 29}
		...
		{"date": 2013, "gdp": 500, "CO2emission": 40}
	}
}

[Example from internet](http://jsfiddle.net/spanndemic/tyLvshfa/) where they made linegraph with two y-axes. However, they pasted the data in the javascript. 


### **Piechart** (visualisation 4)

A function will be written called: *var draw_piechart = function(file1, countrycode, year){}*
The countrycode and year needs to be given to this function.

## Drawing of the three interactive visualisations

![GitHub Logo](/doc/design1.jpg)
