d3.json(`/api/planets-v2`).then(function(data) {

    var maxDiameter = Math.max(...data.map(planet => planet.diameter));
    var minDiameter = Math.min(...data.map(planet => planet.diameter));
    var maxPopulation = Math.max(...data.map(planet => planet.population));
    var minPopulation = Math.min(...data.map(planet => planet.population));    
    const sumDiameter = data.map(planet => planet.diameter).reduce((a, b) => a + b, 0);
    const avgDia = (sumDiameter/ data.map(planet => planet.diameter).length) || 0;
    const sumPopulation = data.map(planet => planet.population).reduce((a, b) => a + b, 0);
    const avgPop= (sumPopulation  / data.map(planet => planet.diameter).length) || 0;
    
   
    var trace2 = {
        x: data.map(planet => planet.population),   
        y: data.map(planet => planet.diameter),
        mode: 'markers',
        type: 'scatter',
        text: data.map(planet => planet.name),
        marker: { size: 20 }
    };

    var traceDataScatter = [trace2];

    var layout = {
        title: "Diameter .vs. Population for all planets features in Star Wars",
        xaxis: {
            //range: [ minPopulation-avgPop, maxPopulation+avgDia]
            range: [0-avgPop, maxPopulation*1.05]
          },
          yaxis: {
            range: [0-avgDia, maxDiameter*1.15]
          },
        height: 600,
        margin: {
          l: 100,
          r: 100,
          t: 75,
          b: 75
        }
    };

    Plotly.newPlot('scatter-plot', traceDataScatter, layout);


});