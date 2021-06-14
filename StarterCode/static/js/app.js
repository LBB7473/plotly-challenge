// initializating 

function init() {
  var selector = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {

// Display first sample graphs when page is opened
    data.names.forEach((sample) => {
      selector.append("option").text(sample)
    });

    var inputvalue = data.names[0];
    Description(inputvalue);
    Barchart(inputvalue);
    Bubblechart(inputvalue)
  });
}
// Refresh data when a new sample is selected
function optionChanged(newSample) {
  Description(newSample);
  Barchart(newSample);
  Bubblechart(newSample)
}

init();

// Function for Bar Chart
function Barchart(sample) {
  d3.json("./samples.json").then((data) => {
 
    var samples = data.samples
    var inputlist = samples.filter(selection => selection.id == sample);
    var user_input = inputlist[0];

    var y_ticks = user_input.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var x_values = user_input.sample_values.slice(0, 10).reverse()
    var bar_hover = user_input.otu_labels.slice(0, 10).reverse()

    var bardata = [
      {
        y: y_ticks,
        x: x_values,
        text: bar_hover,
        type: "bar",
        orientation: "h",      
      }
    ];

    var barlayout = {
      title: "Top 10 Bacteria Cultures Found"     
    }
    
    Plotly.newPlot("bar", bardata, barlayout);
  });
}

// Function for Bubble Chart
function Bubblechart(sample) {
  d3.json("./samples.json").then((data) => {

    var samples = data.samples
    var inputlist = samples.filter(selection => selection.id == sample);
    var user_input = inputlist[0];

    var x_values = user_input.otu_ids
    var y_values = user_input.sample_values
    var bubble_hover = user_input.otu_labels

    var bubbledata = [{
      x: x_values,
      y: y_values,
      text: bubble_hover,
      mode: "markers",
      marker: {
        color: x_values,
        size: y_values,
        colorscale: "Electric"
      }
    }
  ];

    var bubblelayout = {
      title: "Bacteria Cultures Found",
      hovermode: "closest"
    }

    Plotly.newPlot("bubble", bubbledata, bubblelayout);
  });
}

//Function for Sample Description
function Description(sample) {
  d3.json("./samples.json").then((data) => {
    
    var metadata = data.metadata;
    var inputlist = metadata.filter(selection => selection.id == sample);
    var user_input = inputlist[0];
    
    var dropdown = d3.select('#sample-metadata');
    dropdown.html("");

    Object.entries(user_input).forEach(([key, value]) => {
      dropdown.append("p").text(`${key}: ${value}`)
    });
  });
}
  


