window.onload = function() {

var margin = {top: 30, right: 40, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.scale.linear().range([0, width]);
var y0 = d3.scale.linear().range([height, 0]);
var y1 = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(10);

var yAxisLeft = d3.svg.axis().scale(y0)
    .orient("left").ticks(5);

var yAxisRight = d3.svg.axis().scale(y1)
    .orient("right").ticks(5); 

var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y0(d.close); });

var valueline2 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y1(d.open); });

var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
var data = [
{date: "0",close: "59.8",open: "897"},
{date: "1",close: "63.3",open: "943.5"},
{date: "2",close: "66.6",open: "988"},
{date: "3",close: "69.5",open: "1025.5"},
{date: "4",close: "72.2",open: "1061"},
{date: "5",close: "74.7",open: "1092.5"},
{date: "6",close: "76.9",open: "1119.5"},
{date: "7",close: "79",open: "1146"},
{date: "8",close: "80.8",open: "1167"},
{date: "9",close: "82.5",open: "1187.5"},
{date: "10",close: "84.1",open: "1205.5"},
{date: "11",close: "85.5",open: "1220.5"},
{date: "12",close: "86.8",open: "1235"},
{date: "13",close: "87.9",open: "1245.5"},
{date: "14",close: "89",open: "1257"},
{date: "15",close: "90",open: "1266"},
{date: "16",close: "90.9",open: "1273.5"},
{date: "17",close: "91.7",open: "1280.5"},
{date: "18",close: "92.4",open: "1285"},
{date: "19",close: "93.1",open: "1290.5"},
{date: "20",close: "93.7",open: "1293.5"},
{date: "21",close: "94.3",open: "1296.5"},
{date: "22",close: "94.8",open: "1299"},
{date: "23",close: "95.2",open: "1299"},
{date: "24",close: "95.6",open: "1299.5"},
{date: "25",close: "96",open: "1300"},
{date: "26",close: "96.4",open: "1299.6"},
{date: "27",close: "96.7",open: "1299.5"},
{date: "28",close: "97",open: "1298"},
{date: "29",close: "97.3",open: "1297.5"},
{date: "30",close: "97.5",open: "1294.5"},
{date: "31",close: "97.7",open: "1291.5"},
{date: "32",close: "97.9",open: "1289.5"},
{date: "33",close: "98.1",open: "1286.5"},
{date: "34",close: "98.3",open: "1284.5"},
{date: "35",close: "98.4",open: "1280"},
{date: "36",close: "98.6",open: "1277"},
{date: "37",close: "98.7",open: "1273.5"},
{date: "38",close: "98.8",open: "1269"},
{date: "39",close: "98.9",open: "1265.5"},
{date: "40",close: "99",open: "1261"},
{date: "41",close: "99.1",open: "1256.5"},
{date: "42",close: "99.2",open: "1253"},
{date: "43",close: "99.3",open: "1248.5"},
{date: "44",close: "99.3",open: "1243.5"},
{date: "45",close: "99.4",open: "1239"},
{date: "46",close: "99.4",open: "1233"},
{date: "47",close: "99.5",open: "1229.5"},
{date: "48",close: "99.5",open: "1223.5"},
{date: "49",close: "99.6",open: "1220"},
{date: "50",close: "99.6",open: "1214"},
{date: "51",close: "99.6",open: "1208"},
{date: "52",close: "99.7",open: "1204.5"},
{date: "53",close: "99.7",open: "1198.5"},
{date: "54",close: "99.7",open: "1193.5"},
{date: "55",close: "99.8",open: "1189"},
{date: "56",close: "99.8",open: "1183"},
{date: "57",close: "99.8",open: "1178"},
{date: "58",close: "99.8",open: "1172"},
{date: "59",close: "99.8",open: "1167"},
{date: "60",close: "99.8",open: "1161"},
{date: "61",close: "99.9",open: "1156.5"},
{date: "62",close: "99.9",open: "1151.5"},
{date: "63",close: "99.9",open: "1145.5"},
{date: "64",close: "99.9",open: "1140.5"},
{date: "65",close: "99.9",open: "1134.5"},
{date: "66",close: "99.9",open: "1128.5"},
{date: "67",close: "99.9",open: "1123.5"},
{date: "68",close: "99.9",open: "1117.5"},
{date: "69",close: "99.9",open: "1112.5"},
{date: "70",close: "99.9",open: "1106.5"},
{date: "71",close: "99.9",open: "1100.5"},
{date: "72",close: "99.9",open: "1095.5"},
{date: "73",close: "100",open: "1091"},
{date: "74",close: "100",open: "1086"},
{date: "75",close: "100",open: "1080"},
{date: "76",close: "100",open: "1074"},
{date: "77",close: "100",open: "1069"},
{date: "78",close: "100",open: "1063"},
{date: "79",close: "100",open: "1058"},
{date: "80",close: "100",open: "1052"},
{date: "81",close: "100",open: "1046"},
{date: "82",close: "100",open: "1041"},
{date: "83",close: "100",open: "1035"},
{date: "84",close: "100",open: "1030"},
{date: "85",close: "100",open: "1024"},
{date: "86",close: "100",open: "1018"},
{date: "87",close: "100",open: "1013"},
{date: "88",close: "100",open: "1007"},
{date: "89",close: "100",open: "1002"},
{date: "90",close: "100",open: "996"},
{date: "91",close: "100",open: "990"},
{date: "92",close: "100",open: "985"},
{date: "93",close: "100",open: "979"},
{date: "94",close: "100",open: "974"},
{date: "95",close: "100",open: "968"},
{date: "96",close: "100",open: "962"},
{date: "97",close: "100",open: "957"},
{date: "98",close: "100",open: "951"},
{date: "99",close: "100",open: "946"},
{date: "100",close: "100",open: "940"}
];

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y0.domain([0, d3.max(data, function(d) { console.log(Math.max(d.close));
        return Math.max(d.close);
    })]); 
    y1.domain([0, d3.max(data, function(d) { 
        return Math.max(d.open);
    })]);

    console.log(data);

    svg.append("path")        // Add the valueline path.
        .attr("d", valueline(data));

    svg.append("path")        // Add the valueline2 path.
        .style("stroke", "red")
        .attr("d", valueline2(data));

    svg.append("g")            // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .style("fill", "steelblue")
        .call(yAxisLeft);   

    svg.append("g")             
        .attr("class", "y axis")    
        .attr("transform", "translate(" + width + " ,0)")   
        .style("fill", "red")       
        .call(yAxisRight);
    
    // get the data object that has the max;
    var openMax = 0;
    var openMaxData;
    data.forEach(function(el, i){
        if (parseInt(el.open) > openMax) {
            openMaxData = el;
            openMax = el.open;
        }
    });

    console.log (openMaxDate);
    // append the line
    svg.append("line")
        .attr("class", "maximum")
        .attr("x1", x(openMaxData.date))
        .attr("x2", x(openMaxData.date))
        .attr("y1", 0)
        .attr("y2", height);
}

