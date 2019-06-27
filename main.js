
class MyChart extends HTMLElement {

    static get observedAttributes() {
        return ['h', 'w'];
    }

    constructor() {
        super();
        // to set properties for attachShadow
        const ShadowRootInit = {
            mode: 'open', // if "open" ShadowRoot returns object, if "closed" ShadowRoot is null
        }
        // Create a shadow root
        this.attachShadow(ShadowRootInit);
        // //using only the d3 modules needed
    }

    connectedCallback() {
        console.log('Custom chart element added to page.');
        updateStyle(this);
    }

    disconnectedCallback() {
        console.log('Custom chart element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom chart element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom chart element attributes changed.');
        updateStyle(this);
    }

}

customElements.define('my-chart', MyChart);

function updateStyle(elem) {
    const shadow = elem.shadowRoot;

    

    var d3 = require("./exportd3");
    
    var margin = { top: 50, right: 50, bottom: 50, left: 50 }
        , width = elem.getAttribute("w") - margin.left - margin.right // Use the window's width 
        , height = elem.getAttribute("h") - margin.top - margin.bottom; // Use the window's height

    // The number of datapoints
    var n = 21;

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain([0, n - 1]) // input
        .range([0, width]); // output

    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
        .domain([0, 1]) // input 
        .range([height, 0]); // output 

    // 7. d3's line generator
    var line = d3.line()
        .x(function (d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function (d) { return yScale(d.y); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    var dataset = d3.range(n).map(function (d) { return { "y": d3.randomUniform(1)() } })

    
    // 1. Add the SVG to the page and employ #2
    var svg = d3.select(elem.shadowRoot).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

    // 12. Appends a circle for each datapoint 
    svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function (d, i) { return xScale(i) })
        .attr("cy", function (d) { return yScale(d.y) })
        .attr("r", 5)
        .on("mouseover", function (a, b, c) {
            console.log(a)
            svg.attr('class', 'focus')
        })
        .on("mouseout", function () { })


    const style = document.createElement('style');

    style.textContent = `
    /* Style the lines by removing the fill and applying a stroke */
        .line {
            fill: none;
            stroke: #ffab00;
            stroke-width: 3;
        }
        
        .overlay {
        fill: none;
        pointer-events: all;
        }

        /* Style the dots by assigning a fill and stroke */
        .dot {
            fill: #ffab00;
            stroke: #fff;
        }
        
        .focus circle {
        fill: none;
        stroke: steelblue;
        }
    `
    // shadow.appendChild(svg);

    shadow.appendChild(style);
    
    console.log("here")
}





function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let chart;
export function add() {
    // Create a custom chart element
    chart = document.createElement('my-chart');
    chart.setAttribute('l', '100');
    chart.setAttribute('c', 'red');
    document.body.appendChild(chart);
};

export function update(id) {
    // Randomly update chart's attributes
    document.getElementById(id).setAttribute('h',"1000").setAttribute('w',"1000");


    // chart.setAttribute('l', random(50, 200));
    // chart.setAttribute('c', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
};

export function remove() {
    // Remove the chart
    document.body.removeChild(chart);
};



