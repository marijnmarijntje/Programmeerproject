# Programmeerproject Report
## Data visualisatie voor de minor programmeren
## Door Marijn Gulpen 02-01-2017

**Short description of the application**
In this project data about global temperatures, carbon dioxide emissions and gdp is visualised with the use of three interactive visualisations and two extra interactive components. The first visualisation that appears shows the annual global temperature from 1980 till 2015 in a linegraph. This visualisation is not linked with the other visualisation, however it is possible to hover over the line to get the accurate value of the temperature. This linegraph supports the introduction of the project, namely CO2 emissions and welfare. 
Direct under the data of the CO2 emissions per country is visualisized in a worldmap. The amount of emissions is divided in 5 classes and each class has its own color. The sixth color is for countries that do no have any available data. The table next to the worldmap shows the same data, however it is ranked, countries with the highest emissions are standing on top of the table and the countries with the lowest at the bottom. Each country get its own (unique) ranking number. 
Under these two visualisation there is a timeline that makes it possible to show the data of another year in the visualisations.
By clicking on a country in the worldmap of in the table a donutchart of this country will be drawn. In this donutchart data of that specific country in regard to their CO2 emission sources is visualized. For that specific country the CO2 emissions and the GDP are visualized over the years(depends on the amount of data) in a graph with two y axis. 
   

**Clearly describe the technical design: how is the functionality implemented in your code? This should be like your DESIGN.md but updated to reflect the final application. First, give a high level overview, which helps us navigate and understand the total of your code (which components are there?). Second, go into detail, and describe the modules/classes and how they relate.**
Every visualisation has its own javascript file with a "draw function" and in some cases also a "get data function", which transforms the data in the correct format for the visualisation. The first time that all visualisations will be drawn is when they get called in the onload function (can be found in onload.js). This function also opens the data.json with all the data for the interactive visualisations. 
The first function that will be called draws the linegraph in the introduction (*drawLineGraph*). This linegraph has nothing to do with the other visualisations and data.json and therefore is made first. 
When the data.json is opened the functions, which draw the worldmap(*drawworldmap*), get data for the table(*getDataTable*), the donutchart(*getDataDonut*), the duallinegraph(*getDataGraph*) and the function which makes the timeline in this graph(*drawTimeLine*) are called. The defaultsettings are then the year 2012 and the United States as country. 



**Clearly describe challenges that your have met during development. Document all important changes that your have made with regard to your design document (from the PROCESS.md). Here, we can see how much you have learned in the past month.**

**Defend your decisions by writing an argument of a most a single paragraph. Why was it good to do it different than you thought before? Are there trade-offs for your current solution? In an ideal world, given much more time, would you choose another solution?**

**Make sure the document is complete and reflects the final state of the application. The document will be an important part of your grade.**