var plot_options = [{"By Diameter":"diameter"},
                    {"By Population":"population"},
                    {"By Number of Films featured":"no_of_films"},
                    {"By Number of key characters being residents":"no_of_residents"}];

//populate selection box with planet features to plot
for (i in plot_options) {
  d3.select("#selOption").append("option").attr("value", Object.values(plot_options[i])).text(Object.keys(plot_options[i]));
 };

var plot_sorting = [{"The Top 5 Planets":5},
                    {"The Top 10 Planets":10},
                    {"The Bottom 5 Planets":-5},
                    {"The Bottom 10 Planets":-10}]

//populate selection box with what to show
for (i in plot_sorting) {
  d3.select("#selSorting").append("option").attr("value", Object.values(plot_sorting[i])).text(Object.keys(plot_sorting[i]));
 };

function init() {

  d3.json(`/api/planets-v2`).then(function(data) {
  
    var total_planets = (Object.keys(data).length);
    var sortedDescByDiameter = data.sort((a, b) => b.diameter - a.diameter);
    var slicedTopFiveData = sortedDescByDiameter.slice(0, 5);
    var reversedTopFiveData = slicedTopFiveData.reverse();
    
    var trace1 = {
      x: reversedTopFiveData.map(planet => planet.diameter),
      y: reversedTopFiveData.map(planet => planet.name),
      text: reversedTopFiveData.map(planet => planet.name),
      type: "bar",
      orientation: "h"
    };

    var traceData = [trace1];

    var layout = {
      title: "Top 5 Planets in Star Wars By Diameter",
      height: 600,
      margin: {
        l: 100,
        r: 100,
        t: 75,
        b: 75
      }
    };

    Plotly.newPlot("hbar-plot", traceData, layout);

  });

};


d3.selectAll("#selSorting").on("change", updatePlotly);
d3.selectAll("#selOption").on("change", updatePlotly);

function updatePlotly() {

  var selSortingVal = d3.select("#selSorting").property("value");
  var selOptionVal = d3.select("#selOption").property("value");
  
  if (selSortingVal > 0) {
    var sliceBy = d3.select("#selSorting").property("value")*1;
    var descending = true;
    }
    else {
      var sliceBy = d3.select("#selSorting").property("value")*-1;
      var descending = false;
    };
  
  d3.json(`/api/planets-v2`).then(function(data) {

    if (descending === true) {
      if (selOptionVal === 'diameter') {
        var sortedPlanets = data.sort((a, b) => b.diameter - a.diameter);
        var slicedData = sortedPlanets.slice(0, sliceBy);
        var reversedData = slicedData.reverse();
        var x = reversedData.map(planet => planet.diameter);
        var y = reversedData.map(planet => planet.name);
        var text = reversedData.map(planet => planet.name);
        var text_title = `Top ${sliceBy} Planets in Star Wars By Diameter`;
      }
      else if (selOptionVal === 'population') {
        var sortedPlanets = data.sort((a, b) => b.population - a.population);
        var slicedData = sortedPlanets.slice(0, sliceBy);
        var reversedData = slicedData.reverse();
        var x = reversedData.map(planet => planet.population);
        var y = reversedData.map(planet => planet.name);
        var text = reversedData.map(planet => planet.name);
        var text_title = `Top ${sliceBy} Planets in Star Wars By Population`;
      }
      else if (selOptionVal === 'no_of_films') {
        var sortedPlanets = data.sort((a, b) => b.no_of_films - a.no_of_films);
        var slicedData = sortedPlanets.slice(0, sliceBy);
        var reversedData = slicedData.reverse();
        var x = reversedData.map(planet => planet.no_of_films);
        var y = reversedData.map(planet => planet.name);
        var text = reversedData.map(planet => planet.name);
        var text_title = `Top ${sliceBy} Planets in Star Wars By Number of Films featuring them`;
      }
      else if (selOptionVal === 'no_of_residents') {
        var sortedPlanets = data.sort((a, b) => b.no_of_residents - a.no_of_residents);
        var slicedData = sortedPlanets.slice(0, sliceBy);
        var reversedData = slicedData.reverse();
        var x = reversedData.map(planet => planet.no_of_residents);
        var y = reversedData.map(planet => planet.name);
        var text = reversedData.map(planet => planet.name);
        var text_title = `Top ${sliceBy} Planets in Star Wars By Number of Films featuring them`;
      }
    }
    else {
      if (selOptionVal === 'diameter') {
        var sortedPlanets = data.sort((a, b) => a.diameter - b.diameter);
        var slicedData = sortedPlanets.slice(0, sliceBy);
        var reversedData = slicedData;
        var x = reversedData.map(planet => planet.diameter);
        var y = reversedData.map(planet => planet.name);
        var text = reversedData.map(planet => planet.name);
        var text_title = `Bottom ${sliceBy} Planets in Star Wars By Diameter`;
      }
      else if (selOptionVal === 'population') {
        var sortedPlanets = data.sort((a, b) => a.population - b.population);
        var slicedData = sortedPlanets.slice(0, sliceBy);
        var reversedData = slicedData;
        var x = reversedData.map(planet => planet.population);
        var y = reversedData.map(planet => planet.name);
        var text = reversedData.map(planet => planet.name);
        var text_title = `Bottom ${sliceBy} Planets in Star Wars By Population`;
      }
      else if (selOptionVal === 'no_of_films') {
        var sortedPlanets = data.sort((a, b) => a.no_of_films - b.no_of_films);
        var slicedData = sortedPlanets.slice(0, sliceBy);
        var reversedData = slicedData;
        var x = reversedData.map(planet => planet.no_of_films);
        var y = reversedData.map(planet => planet.name);
        var text = reversedData.map(planet => planet.name);
        var text_title = `Bottom ${sliceBy} Planets in Star Wars By Number of Films featuring them`;
      }
      else if (selOptionVal === 'no_of_residents') {
        var sortedPlanets = data.sort((a, b) => a.no_of_residents - b.no_of_residents);
        var slicedData = sortedPlanets.slice(0, sliceBy);
        var reversedData = slicedData;
        var x = reversedData.map(planet => planet.no_of_residents);
        var y = reversedData.map(planet => planet.name);
        var text = reversedData.map(planet => planet.name);
        var text_title = `Bottom ${sliceBy} Planets in Star Wars By Number of Films featuring them`;
      }
    }

    Plotly.restyle("hbar-plot", "x", [x]);
    Plotly.restyle("hbar-plot", "y", [y]);
    Plotly.restyle("hbar-plot", "text", [text]);
    Plotly.relayout("hbar-plot", "title", text_title);
  });

};



function changeSorting(){
  console.log("changeSorting()");
};

function changeOption(){
  console.log("changeOption()");
};






init();

