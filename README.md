# Programmeerproject Readme
## Data visualization - Programming Minor
## By Marijn Gulpen 02-02-2017

### Carbon dioxide emissions and Welfare

This website contains interactive visualizations about carbon dioxide emissions and its sources and gross domestic product (GDP). The purpose of this visualization is to show the links between these three and cancan be examined for every country. However, the data about emissions will also be shown over the worl which gives a more global view. 

All visualization are made with D3 and the worldmap that will be used is located in the folder "javascript" under "project". 

#### Visualizations

###### **Visualization 1 Linegraph** 
This graph shows the global annual temperature over the years and supports the introduction for the subject. This graph has no interation with the other visualizations and therefor was not part of the minimum viable project.

![GitHub Logo](/doc/linegraph.png)
 
###### **Visualization 2 Worldmap**
Worldmap visualizes CO2 emissions over the years 1960 till 2013 (=*interactive component*). The countryname and exact emission amount will be shown when the user hover over the map. The ranking of the countries based on their emissions is viewed in the table next to it (=*interactive component*)
When the user clicks on a country in the table or in the worldmap, visualizations 3 and 4 will show data for that specific country.

![GitHub Logo](/doc/worldmap.png)

###### **Visualization 3 Donutchart**
Data about the source of the carbon dioxide emissions is visualized in this chart. By hovering over the different parts the percentage will be viewed and the legend will light up. If there is no data for this country, a "no data screen" will be shown.

![GitHub Logo](/doc/donutchart.png)

###### **Visualization 4 Duallinegraph**
This linegraph shows the emissions of the selected country and the GDP over the years. It is possible to hover over the graph to see the exact data. 

![GitHub Logo](/doc/duallinegraph.png)

Visualization 2, 3 and 4 are linked together.

### **References**

* [Timeslider](http://bl.ocks.org/zanarmstrong/ddff7cd0b1220bc68a58)
* [Dualgraph](http://bl.ocks.org/benjchristensen/2579619)
* [Table](http://bl.ocks.org/jonahwilliams/cc2de2eedc3896a3a96d)
* [Donutchart](http://bl.ocks.org/juan-cb/1984c7f2b446fffeedde)
* The worldmap and the linegraph are made with old project from the course Data-Processing