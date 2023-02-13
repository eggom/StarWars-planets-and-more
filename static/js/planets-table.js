console.log("planets-table.js");

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
//console.log(numberWithCommas(1000))

function init() {

    d3.select("#planetProfileTitle").text("PLANET PROFILE - Aldeeran:");
    d3.select("#diamTable").text("12,500 mi");
    d3.select("#popTable").text("2,000,000,000");
    d3.select("#filmsNoTable").text("2");
    d3.select("#residentsNoTable").text("3");


    d3.json(`/api/planets-v2`).then(function(data) {
    
        var planetNames = data.map(planet => planet.name);
        var planetNames = planetNames.sort();
        
        //populate selection box with planet features to plot
        for (i in planetNames) {
            d3.select("#selPlanet").append("option").attr("value", planetNames[i]).text(planetNames[i]);
        };

    });
};

function changePlanet(){

    var selPlanet = d3.select("#selPlanet").property("value");

    d3.json(`/api/planets-v2`).then(function(data) {

        var planetData = data.map(planet => planet);

        for (i in planetData) {
            
            if (planetData[i].name === selPlanet) {

                d3.select("#planetProfileTitle").text(`PLANET PROFILE - ${planetData[i].name}`);
                d3.select("#diamTable").text(`${numberWithCommas(planetData[i].diameter)} mi`);
                d3.select("#popTable").text(`${numberWithCommas(planetData[i].population)}`);
                d3.select("#filmsNoTable").text(`${planetData[i].no_of_films}`);
                d3.select("#residentsNoTable").text(`${planetData[i].no_of_residents}`);
            }

        }

    });
};


init();