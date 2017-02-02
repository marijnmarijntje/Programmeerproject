# Programmeerproject Report
## Data visualisatie voor de minor programmeren
## Door Marijn Gulpen 02-01-2017

### **Short description of the application**

In this project data about global temperatures, carbon dioxide emissions and gdp is visualised with the use of three interactive visualisations and two extra interactive components. All visualisations are made with D3. The first visualisation that appears shows the annual global temperature from 1980 till 2015 in a linegraph (source: [NASA](http://climate.nasa.gov/vital-signs/global-temperature). This visualisation is not linked with the other visualisation, however it is possible to hover over the line to get the accurate value of the temperature. This linegraph supports the introduction of the project, namely CO2 emissions and welfare. 
Direct under the data of the CO2 emissions per country is visualisized in a worldmap. The amount of emissions is divided in 5 classes and each class has its own color. The sixth color is for countries that do no have any available data. The table next to the worldmap shows the same data, however it is ranked, countries with the highest emissions are standing on top of the table and the countries with the lowest at the bottom. Each country get its own (unique) ranking number. 
Under these two visualisation there is a timeline that makes it possible to show the data of another year in the visualisations.
By clicking on a country in the worldmap of in the table a donutchart of this country will be drawn. In this donutchart data of that specific country in regard to their CO2 emission sources is visualized. For that specific country the CO2 emissions and the GDP are visualized over the years(depends on the amount of data) in a graph with two y axis. 
The three linked visualisations are all made with data from the [World DataBank](http://databank.worldbank.org/data/home.aspx).
   
### **Technical Design**

Every visualisation has its own javascript file with a "draw function", which actually draws the visualisation, and in some cases also a "get data function", which transforms the data in the correct format for the visualisation. Some javascript files contain more functions, for example a "search function" or a "no data function". 

#### **onload.js**

The first time that all visualisations will be drawn is when they get called in the onload function. This function also opens the data.json(can be found in the folder 'data') with all the data for the interactive visualisations. 
The first function that will be called draws the linegraph in the introduction (*drawLineGraph*). This linegraph has nothing to do with the other visualisations and data.json and therefore is made first. 
When the data.json is opened the functions, which draw the worldmap (*drawWorldmap*), get data for the table (*getDataTable*), the donutchart (*getDataDonut*), the duallinegraph (*getDataGraph*) and the function which makes the timeline in this graph(*drawTimeLine*) are called. The defaultsettings are the year 2012 and the United States as country. The timeline will be drawn in this javascript file as well, since it influences every visualisations and the table. The above mentioned functions will be called a second time (except for the getDataGraph) when another year is selected in the timeslider.

#### **linegraph.js**

This javascript only contains the function *drawLineGraph()*. The data used for this linegraph is a CSV file and can be found in the folder 'data'.

#### **worldmap.js**

The data is already in the right JSON format for this visualisation. The parameter that are given to this function is the data of the specific year that is selected in the timeslider. The fucntion of d3: *new Datamap()* is used to draw the map. When you click on a country in the map the donutchart and duallinegraph will be udpated for this country. A tooltip over the countries makes is possible to show the country name and its emission. These features are both given by the *new Datamap()* function. Another feature that is used is the legend of this function.

#### **donutchart.js**

To draw a donutchart for a specific country it needs to be checked whether or not there is any data available. This is done in the function *getDataDonut()*. This function retrieves the dataset of the specific year and the specific country.  Two other arguments of this function are the countrycode and the year, this is needed because the *drawDonutChart()* function uses these parameters. If there is enough data, or in other words if there is data of every key in the dictonairy of without data, the function *drawDonutChart()* will be called. This function gets the data (which is only the data of the country on which is clicked and its specific year), the year and countrycode. The interactivity of this donutchart lays in the hovering over the slices. The slices will get darker (due to the opacity property of css) and the exaxt percentages will appear in the middle of the visualisation. To make it easier for the user the words in the legend, which are connencted to the darker slice at that poin, will get bold as well. 

#### **duallinegraph.js**

The normal data.JSON is not in the right format for this visualisation and therefore first the function *getDataGraph()* will be called. This function puts the data in a right format, which is a list with dictionaries in it of every year for only selected country. Only the years with data for CO2 emissions as well as for GDP will be stored in this list to use the *interpolate* function of D3. This function can not deal with "no data points" and throws errors if these are in the dataset. Interpolate makes it possible to draw lines between years even though there are years in between without data. For example, there is data for the years 1994 and 1997 but no data for the years 1995 and 1996, a line still will be drawn for that timeperiod. The missing data will be calculated with the data of the other years. However, it will not be realistic if there are missing data points for a couple of years in a row and still a line will be drawn. To overcome this the data first will be checked (still in the *getDataGraph()* function) and if there are more than four years missing in a row (between two years) the *noDataGraph()* function will be called. This function will be called as well when there is no data at all. If there is enough data and not to many years missing the *drawDuallinegraph()* will be called. In this function there is a *mouseMove()* and this function will be called when the user hovers over the graph. The year, CO2 emissions and GDP of the selected country will be shown in the top left of the graph. To make the '2' in subscript .html() is used instead of .text(). The last function in this javascript file is the *drawTimeLine()*, and is made to create the green dotted line in the duallinegrap. This function will only be called when the timeslider selects another year.

#### table.js

This javascript file contains three functions. The data first needs to be converted in the same sort format as for the duallinegraph. The CO2 emission, countryname and countrycode for every country in the selected year will be sorted in a list. The countries with the highest emissions will ranked on top. Countries which do not contain data about this subject will be ranked under the country with the lowest emission. The "no data countries" are sorted in alphabetic order. When the data is sorted and ranked the *drawTable()* will be called and is made with a bootstrap table (*class: table table-condensed*). Only the body of the table has a scroll bar, which causes that the header always be visible. The table is linked with the worldmap in a way that when the users hovers over a row, this will get orange and the country in the worldmap will get another color. So when the mouse is on the Netherlands in the table the Netherlands will change color in the worldmap as well. The table is also linked with the donutchart and the duallinegraph. When the user clicks on a row these two visualisations will be drawn for that specific country. These two interactivities were only possible if every row has its own class named after its countrycode. The last function in this file is the *searchFunction()* and will be called everytime the user types something in the search bar. The searchFunction only looks in the column with countries, so the user can only search by countryname.

### **Challenges and changes**

The design of this application has changed over the weeks for different reasons. In this paragraph I will discuss the changes and the reason for this reason:
* Time period: in the first week the idea was to make a dropdown menu and that the user was able to chose to see the visualisations for three years. However, in the first week I already changed this to a timeslider for the years 1960 till 2013. The reason for this is to visualize more data and more data in this case can lead to a better understandability of the link between welfare and emissions. 
* JSON files: when I was writing the design product I realized that the data needed to be converted in different formats for every visualisation. The plan was at that point to make different JSON files and put them in a queue. Eventually, all data is stored in one JSON and when this JSON was not in the right format this is done in Javascript. This was also an easy way to check for no data points. Because for the donutchart and for the duallinegrap the code gave errors if there were no datapoints. By filtering these out of the dataset before drawing the visualisations no errors occurs. For the table it was hard to sort all data since countries without data could not be sorted in the same way as countries with data. The solution for this was to make two lists and store countries without data in one and countries with data in the other. After ranking both lists, they were put together in one list.
* Donutchart instead of piechart: this change is only done because I thought it was prettier and could display the data better (by putting the percentages in the middle of the circle). Another reason is that I never had made a donut chart and decided that if it was not working I could always change it back to a piechart.  
* Decimals: I tried to change a numbers to the right amount of decimals in Javascript, however most of the times it was not possible due to no datapoints or other errors. Eventually, I changed the amount of decimals in the CSV file before running the CSVtoJSON python script.
* Duallinegraph time period: for some countries the first available data was not in 1960, but later. In the first place, the x-axis was always from 1960 till 2013, resulting in short lines in some cases. This was done because otherwise it would not be clear for the user that the time period has changed on the x-axis. To make the graph prettier the x-axis now has the timeperiod for the available data for the selected country. For example Rusland has only data since 1991 so the x-axis goes from 1991 till 2013. To make this clear to the user the timeperiod is showed in the title as well.

### **Ideal world**

The application has all the components and visualisations that are described in the design product, with changes mentioned above. Things like a timeslider and donutchart made the application idealer to use and better to visualize. However, in the code there are things that could be better if there was more time. For example, I made two *no data functions* (one for the donutchart and one for duallinegraph). It was prettier if only one function was made, since they look quite the same. Another thing that could be added if there was more time is more interactivity between the table and the worldmap; that the tablerow of the specific country will light up when hovering over the worldmap. 


### **References**

*[Timeslider](http://bl.ocks.org/zanarmstrong/ddff7cd0b1220bc68a58)
*[Dualgraph](http://bl.ocks.org/benjchristensen/2579619)
*[Table](http://bl.ocks.org/jonahwilliams/cc2de2eedc3896a3a96d)
*[Donutchart](http://bl.ocks.org/juan-cb/1984c7f2b446fffeedde)
*The worldmap and the linegraph are made with old project from the course Data-Processing