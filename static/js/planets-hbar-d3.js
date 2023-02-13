let plot_options = [{"By Diameter":"diameter"},
                    {"By Population":"population"},
                    {"By Number of Films featured":"no_of_films"},
                    {"By Number of key characters being residents":"no_of_residents"}];

//populate selection box with planet features to plot
for (i in plot_options) {
  d3.select("#selOption").append("option").attr("value", Object.values(plot_options[i])).text(Object.keys(plot_options[i]));
 };

let plot_sorting = [{"The Top 5 Planets":0},
                    {"The Top 10 Planets":1},
                    {"The Bottom 5 Planets":2},
                    {"The Bottom 10 Planets":3}]

//populate selection box with what to show
for (i in plot_sorting) {
  d3.select("#selSorting").append("option").attr("value", Object.values(plot_sorting[i])).text(Object.keys(plot_sorting[i]));
 };

function init() {

  console.log("function init():")

  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 90, left: 40},
  width = 460 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#hbar-plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


  d3.json(`/api/planets-v2`).then(function(data) {
  
    
    
    let total_planets = (Object.keys(data).length);
    let sortedDescByDiameter = data.sort((a, b) => b.diameter - a.diameter);
    let slicedTopFiveData = sortedDescByDiameter.slice(0, 10);
    let reversedData = slicedTopFiveData.reverse();

    // X axis
    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(reversedData.map(planet => planet.name))
      .padding(0.2);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, Math.max( ...reversedData.map(planet => planet.diameter))])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));
  
  // Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.name); })
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    // no bar at the beginning thus:
    .attr("height", function(d) { return height - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })

// Animation
svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.Value); })
  .attr("height", function(d) { return height - y(d.Value); })
  .delay(function(d,i){console.log(i) ; return(i*100)})

});


    console.log(d3.select("#selSorting").property("value"));
    console.log(d3.select("#selOption").property("value"));

};

//d3.selectAll("#selDataset").on("change", updatePlotly);

init();

