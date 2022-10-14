function lifeInDots() {

        // ------------------------------ USER INFORMATION ------------------------------
        var birthDate = document.getElementById('birth-date').value,
            age = (new Date().getTime() - new Date(birthDate).getTime()) / 1000 / 60 / 60 / 24 / 365,
            ageInWeeks = age * 52,
            lifeExpectancy = 90,
            lifeExpectancyInWeeks = lifeExpectancy * 52;

        // ------------------------------ PLOTTING CONFIG -------------------------------
        var martixColumns = 52,
            martixRows = lifeExpectancyInWeeks / martixColumns,
            circleRadius = 4,
            gridSpacing = 12,
            xLabelSpacing = 60,
            yLabelSpacing = 50,
            plotMargin = 20,
            plotHeight = martixRows * gridSpacing + yLabelSpacing  + plotMargin * 2,
            plotWidth =  martixColumns * gridSpacing + xLabelSpacing + plotMargin * 2;

        // --------------------------------- DOT COLORS ---------------------------------
        var circleColorLived = "#EE4B2B",
            circleColorNotLived = "#000000",
            circleColorBirth = "#005b96",
            circleColorDeath = "#A020F0";

        // ------------------------------------ MAIN -------------------------------------
        var svg = d3.select("#dots")
            .append("svg")
            .attr("height", plotHeight)
            .attr("width", plotWidth);

        var circles = svg.selectAll("circle")
            .data(d3.range(lifeExpectancyInWeeks))
            .enter()
            .append("circle")
            .attr("cx", function (d) {return (d % martixColumns) * gridSpacing + xLabelSpacing + plotMargin;})
            .attr("cy", function (d) {return Math.floor(d / martixColumns) * gridSpacing + yLabelSpacing + plotMargin;})
            .attr("id", function (d) {return d;})
            .attr("r", circleRadius)
            // COLOR
            .attr("fill", function (d) {
                if (d === 0) {return circleColorBirth;} 
                else if (d === lifeExpectancyInWeeks - 1) {return circleColorDeath;} 
                else if (d > 0 && d < ageInWeeks) {return circleColorLived;}
                else {return circleColorNotLived;}}
            )
            // MOUSE ACTIONS 
            .on("mouseover", function (d) {
                d3.select(this).attr("r", circleRadius * 1.5);
                d3.select(this).attr("stroke", "#FFD700");
                d3.select(this).attr("stroke-width", 1);
            })
            .on("mouseout", function (d) {
                d3.select(this).attr("r", circleRadius);
                d3.select(this).attr("stroke", "none");
            })
            // ANIMATION
            .attr("opacity", 0)
            .transition()
            .duration(500)
            .delay(function (d, i) {return i / 5;})
            .attr("opacity", 1)
            
        // correct positions of circles so that they are centered
        circles.attr("cx", function (d) {return parseFloat(d3.select(this).attr("cx")) + circleRadius * 1.5;})
               .attr("cy", function (d) {return parseFloat(d3.select(this).attr("cy")) + circleRadius * 1.5;});

        // -------------------------------- PLOT LABELS ----------------------------------
        var xLabel = svg.append("text")
            .attr("x", plotWidth / 2)
            .attr("y", (yLabelSpacing / 2))
            .attr("text-anchor", "middle")
            .attr("font-size", "1.5em")
            .text("Weeks");

        var yLabel = svg.append("text")
            .attr("x", 400)
            .attr("y", plotHeight / 2.25)
            .attr("text-anchor", "middle")
            .attr("font-size", "1.5em")
            .attr("transform", "rotate(-90, 100, " + plotHeight / 2 + ")")
            .text("Years");

        var weekLabels = svg.selectAll("text.week")
            .data(d3.range(0, martixColumns, 5))
            .enter()
            .append("text")
            .attr("class", "week")
            .attr("x", function (d) {return d * gridSpacing;})
            .attr("y", 0)
            .attr("dx", circleRadius * 1.5 + xLabelSpacing)
            .attr("dy", circleRadius * 1.5 + yLabelSpacing)
            .text(function (d) {return d;});

        var ageLabels = svg.selectAll("text.age")
            .data(d3.range(5, lifeExpectancy, 5))
            .enter()
            .append("text")
            .attr("class", "age")
            .attr("x", 0)
            .attr("y", function (d) {return d * gridSpacing;})
            .attr("dx", circleRadius * 1.5 + xLabelSpacing / 1.5)
            .attr("dy", circleRadius * 1.5 + yLabelSpacing)
            .text(function (d) {return d;});

        // ----------------------------- DOCUMENT CONTEXT --------------------------------
        document.getElementById("age").innerHTML = Math.floor(age);
        // birth-date minimum is set to 1900-01-01 and maximum to today
        document.getElementById("birth-date").setAttribute("max", new Date().toISOString().split("T")[0]);
        document.getElementById("birth-date").setAttribute("min", "1900-01-01");
}


// ------------------------------ EVENT LISTENERS --------------------------------
// exexcute function at page load
lifeInDots();

// add event listener to birth date input
document.getElementById('birth-date').addEventListener('change', function () {
    d3.select("#dots").selectAll("svg").remove();
    lifeInDots();
});