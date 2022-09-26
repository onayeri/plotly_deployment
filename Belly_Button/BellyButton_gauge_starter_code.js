// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObject => sampleObject.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    // Create a variable that holds the first sample in the array.
    var samples = data.samples;

    // 2. Create a variable that holds the first sample in the metadata array.
    var result = resultArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var ids = result.otuids;
    var labels = result.otu_labels;
    var values = result.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var wFreq = parseFloat(result.wFreq_value);

    // Create the yticks for the bar chart.
    var yticks = ids.map(sampleObject => "OTU" + sampleObject)

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", barData, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      type: "indicator",
      value: wFreq,
      mode: "gauge=number",
      gauge: {
        axis: {range: [0,10], dtick: 2},
        bar: {color: "black"},
        steps: [
          {range: [0,2], color: "red"}, 
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "yellowgreen"}, 
          {range: [8,10], color: "green"}
  
        ],
      }
    }
     
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {       
    title: {text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week"},
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot(gauge, gaugeData, gaugeLayout);
  });
}
