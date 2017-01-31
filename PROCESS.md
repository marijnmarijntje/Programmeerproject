# Processbook programmeerproject Marijn Gulpen

## Week 1

### Day 1 (09-01-2017)
Made a proposal with all visualisations.

### Day 2 (10-01-2017)
I was sick and was not able to study.

### Day 3 (11-01-2017)
Collect the right data. For the interactive visualisations I chose to use data from the year 2007, 2010 and 2013. 
However it may be interesting to take years were switches has taken place (wealth of China or new laws that changed the CO2 emissions over years).
All data can be found in the folder *data*. 

I made the Design Product today and made some ideas for the JSON formats and different functions that I need to write.

To do for tomorrow:
- [x] Make sure the right data is downloaded for visualisations 2, 3 and 4.
- [x] Make JSON file
- [X] Make HTML files

### Day 4 (12-01-2017)
I decided to make one big JSON file instead of two files. This is easy for visualisation 2 and 4. However, more attention need to be given to the dual line graph.
I also used all years (1960 till 2013) instead of 3 years. 

### Day 5 (13-01-2017)
Today I made my worldmap, which can only be used for 1 year. The code is now written for 2013.
I also made a linked piechart. It works, however it still needs te be prettier.
The timeslider is already in the HTML file, but not working yet

## Week 2

### Day 6 (16-01-2017)
** Finished for MVP **
* All three visualisations
* Timeslider
* Start of a table -> This is a new idea, which is the last interactive component of the visualisations. In this table you can look up a country and see its ranking of that particular year.

To do for today:
- [X] Timeslider [source](http://bl.ocks.org/zanarmstrong/ddff7cd0b1220bc68a58) of used timeslider

To do for tomorrow:
- [ ] Legend piechart
- [x] Start with the dual graph

### Day 7 (17-01-2016)
Today I made the third visualisation and linked it with the worldmap. 
[Source dualgraph](http://bl.ocks.org/benjchristensen/2579619)
So the timeslider, worldmap, piechart and linegraph are all working, but a little bit buggy and not pretty.

To do for tomorrow:
- [x] Make the dual graph more readable 
- [ ] Start with the table

### Day 8 (18-01-2016)
I made different css files to have a better overview for the different visualisations.
The dual graph is finished for the MVP.
* for next week: make timeslider interactive with dual graph

[Timeslider graph interaction](http://bl.ocks.org/benjchristensen/2657838)

### Day 9 (19-01-2017)
- [x] Make the table (second interactive component)
[Example1](http://bl.ocks.org/jonahwilliams/cc2de2eedc3896a3a96d)
[Example2](http://bl.ocks.org/ahmohamed/4c4980f31abdef64e7e2)
[Example3](http://blockbuilder.org/dhoboy/1ac430a7ca883e7a8c09)

The table needs a search balk and needs to be prettier. This will be done for the deadline tomorrow.

### Day 10 (20-01-2017)
Today I finished a alpha version in which all three visualisations are working. However not pretty enough.
Also the timeslider works (*one iteractive component*).
The second component is the table, which is not interactive yet. Since it needs to light up the country if you hover over the name in the table.
For the beta version all this needs to be done and maybe at an extra interactive component to the line graph so the user can switch between GDP and another variable (not yet decided).
**IMPORTANT** To open the page the HTML file: bootstrap1.html needs to be opened.

## Week 3

### Day 11 (23-01-2017)
- [ ] Donutchart instead of piechart. [example](http://bl.ocks.org/juan-cb/1984c7f2b446fffeedde)
 		* Example can be used also for a select button
 		* [Other example](http://jsfiddle.net/kerplunk/Q3dhh/)

### Day 12 (24-01-2017)
[Example donutchart](http://www.adeveloperdiary.com/d3-js/create-3d-donut-chart-using-d3-js/)
I finished the donutchart(slices are lighting up when you hover hover and also the specific text in the legend will get bold while hover over.)
The table is interactive with the map. For tomorrow I want to make the table interactive with the other two visualisations.

### Day 13 (25-01-2017)
Finished the last interactive component (table is interactive with click funtion and updates the donutchart and the linegraph).
The table is also ranked: the countries with the highest emissions first and no datapoints last. No datapoints are ranked in alphabetic order. 

### Day 14 (26-01-2017)
* Added a vertical line in the graph located on the current year, so for the default the line is shown at 2012.
* I made two 'no data screens' for the donut chart and duallinggraph as well. When you click on a country, if there is not enough data or no data at all. This also fixed the bugs for countries without any data. 

### Day 15 (27-01-2017)
* There is a counter for no data points 

### Weekend (29-01-2017)
Made a new homepage with bootstrap. Timeslider is now located under the worldmap and table and above the other two visualisations so that its more in the center of the page.
--> file is called: homepage.html

## Week 4

### Day 14 
Did some little things:
* Fixed bug in worldmap with click function
* Header of the table is (almost) at the same width as the content
* Changed the colors of the donutchart and linegraph, so that it is more in line with the worldmap
* The linegraph is alway from 1960 till 1930, may be awesome if you could change the x-axis with a click on function so that it could be changed to the amount of data.
* If there are more than 3 datapoints missing (in a row) for the linegraph, the graph will not be made.


### Day 15
* All functions are now capitalized instead of the use of underscores.
* Finished the linegraph in the introduction
* Changed some beauty things: circle at timeslider, same graph style for the linegraph as the duallinegraph, all CO2 are now with subscript 2. 

For tomorrow:
* Write the text on the page
* Write the report
* Online with github (index.html!)