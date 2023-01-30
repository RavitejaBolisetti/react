
var width = 150;
var height = 150;
var radius = Math.min(width, height) / 2;
var color = d3.scale.category20();
var pie = d3.layout.pie().sort(null);
var arc = d3.svg.arc()
    .innerRadius(radius - 35)
    .outerRadius(radius - 30);
	
/* Chart1 */
var dataset = {things: [10, 90],};
var svg = d3.select("#donut")
    .append("svg")
    .attr("width", width)
    .attr("height", 125)
    .append("g")
    .attr("transform", "translate(" 
        + width / 2.090 + "," 
        + height / 2.38  + ")");
var path = svg.selectAll("path")
    .data(pie(dataset.things))
    .enter().append("path")
    .attr("fill", function(d, i) { return getColors(i); })
    .attr("d", arc);

function getColors (i) {
  var colorArray = ['#E5E5E5','#ea3434'];
  return colorArray[i];
}

svg.append("svg:text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("style","font-family:Ubuntu")
    .attr("font-size","20")
    .attr("fill","#ea3434")
    .text("78990");
	
/* Chart2 */
var chart2 = {things: [40, 60],};
var svg = d3.select("#donut1")
    .append("svg")
    .attr("width", width)
    .attr("height", 125)
    .append("g")
    .attr("transform", "translate(" 
        + width / 2.090 + "," 
        + height / 2.38  + ")");
var path = svg.selectAll("path")
    .data(pie(chart2.things))
    .enter().append("path")
    .attr("fill", function(d, i) { return getColors(i); })
    .attr("d", arc);

function getColors (i) {
  var colorArray = ['#E5E5E5','#ea3434'];
  return colorArray[i];
}

svg.append("svg:text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("style","font-family:Ubuntu")
    .attr("font-size","20")
    .attr("fill","#ea3434")
    .text("789");

/* Chart3 */
var openingStock = {things: [20, 80],};
var svg = d3.select("#donut2")
    .append("svg")
    .attr("width", width)
    .attr("height", 125)
    .append("g")
    .attr("transform", "translate(" 
        + width / 2.090 + "," 
        + height / 2.38  + ")");
var path = svg.selectAll("path")
    .data(pie(openingStock.things))
    .enter().append("path")
    .attr("fill", function(d, i) { return getColors(i); })
    .attr("d", arc);

function getColors (i) {
  var colorArray = ['#E5E5E5','#ea3434'];
  return colorArray[i];
}

svg.append("svg:text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("style","font-family:Ubuntu")
    .attr("font-size","20")
    .attr("fill","#ea3434")
    .text("121");