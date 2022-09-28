function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      var firstSample = sampleNames[0];
      buildMetadata(firstSample);
      buildCharts(firstSample);
})}
  
init();

  <><select id="dropdownMenu">
  <option value="dataset1">DataSet1</option>
  <option value="dataset2">DataSet2</option>
</select><select id="selDataset" onchange="optionChanged(this.value)"></select></>

function optionChanged(newSample) {
    console.log(newSample);
}

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
      console.log(result)
      PANEL.html("");
      // PANEL.append("h6").text(result);
      Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key}: ${value}`)
      });
    });
}

// create a "for each" statement to print the results in line 42 
