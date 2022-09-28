function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function. Horizontal chart
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObject => sampleObject.id == sample); 
    console.log(data)
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var ids = result.otu_ids;
    var labels = result.otu_labels.slice(0, 10).reverse();
    var values = result.sample_values.slice(0, 10).reverse();

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    console.log(ids)
    var yticks = ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
    
    // console.log(yticks)

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: values,
      y: yticks,
      type: "bar",
      orientation: "h",
      text: labels
      // backgroundColor: "rbg(192, 189, 189)"
  }];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "<b>Top 10 Bacteria Cultures Found</b>" 
     
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);


//----------------------------------------------------------------------------
    var bubbleData = [{
      x: ids,
      y: values,
      hover_text: labels,
      type: "bubble",
      mode: "markers",
      marker: {
        size: values,
        color: ids,
        colorscale: labels
      }
    }]; 

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "<b>Bacteria Cultures Per Sample</b>",
      xaxis: {title: "OTU ID"},
      automargin: true,
      hovermode: "closest"
    };
    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)

//-------------------------------------------------------------

    // // Create a variable that holds the samples array. 
    var samples = data.samples;
    // // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObject => sampleObject.id == sample);
    // // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    
    // // Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    
    // // 2. Create a variable that holds the first sample in the metadata array.
    var meta_result = metadata[0];
    
    // // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var ids = result.otuids;
    var labels = result.otu_labels;
    var values = result.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var wFreqs = meta_result.wFreq;
    console.log(wFreqs)

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", barData, barLayout);

    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);


    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      type: "indicator",
      value: wFreqs,
      mode: "gauge=number",
      gauge: {
        xaxis: {range: [0,10], dtick: 2}, 
        bar: {color: "black"},
        steps: [
          {range: [0,2], color: "red"}, 
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "yellowgreen"}, 
          {range: [8,10], color: "green"}

        ],

      }
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {       
    title: {text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week</b>"},
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
});

}
