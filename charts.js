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
    buildCharts(sampleNames[0]);
    buildMetadata(sampleNames[0]);
})}
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




function buildCharts(sample) {
// 2. Use d3.json to load and retrieve the samples.json file 
d3.json("samples.json").then((data) => {
  // console.log("buildCharts")
  // console.log(data)
  // 3. Create a variable that holds the samples array. 
  var samples = data.samples;
  console.log(samples);
  // // 4. Create a variable that filters the samples for the object with the desired sample number.
  var samplesNumber = samples.filter(sampleObj => sampleObj.id == sample);
  
  //   Deliverable 3//////
   // 1. Create a variable that filters the metadata array for the object with the desired sample number.
   var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample); 
   // Create a variable that holds the first sample in the array.
      // 2. Create a variable that holds the first sample in the metadata array.
    var metadataHolder = metadataArray[0];
  

  /////////////////////////////////////////////////////////
  //console.log(data)
  // //  5. Create a variable that holds the first sample in the array.
  var firstSample = samplesNumber[0];
  console.log(firstSample);
  // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
  var values = firstSample.sample_values;
  var labels = firstSample.otu_labels;
  var ids = firstSample.otu_ids;
  // 7. Create the yticks for the bar chart.
  // Hint: Get the the top 10 otu_ids and map them in descending order  
  //  so the otu_ids with the most bacteria are last. 
  var yticks = ids.slice(0, 10).map(otu_id => `otu_id ${otu_id}`).reverse();
    // console.log(yticks)
  // 8. Create the trace for the bar chart. 
  var barData = [
    {
    x: values.slice(0, 10).reverse(),
    y: yticks,
    text: labels.slice(0, 10).reverse(),
    type:"bar",
    orientation: "h"}
  ];
  // 9. Create the layout for the bar chart. 
  var barLayout = {
    title: "Top 10 Bacteria Cultures Found",
  };
  // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar", barData, barLayout);


  // Deliverable 2------


  // 1. Create the trace for the bubble chart.
var bubbleData = [
  {
  x: ids,
  y: values,
  text: labels,
  mode: 'markers',
  marker: {
    size: values,
    color: ids,
    colorscale: 'Electric'
  }
}];
// 2. Create the layout for the bubble chart.
var bubbleLayout = {
  title: "Bacteria Cultures Per Sample",
  xaxis: {title: "OTU ID"}
};
// 3. Use Plotly to plot the data with the layout.
Plotly.newPlot("bubble", bubbleData, bubbleLayout);



//   Deliverable 3//////


   ///continued....from top under build


    // 3. Create a variable that holds the washing frequency.
    var washingFrequency = parseFloat(metadataHolder.wfreq);

    // Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    // var yticks =  defined above Line #80

    // // Create the trace for the bar chart. 
    // var barData = [
      
    // ];
    // // Create the layout for the bar chart. 
    // var barLayout = {
      
    // };

    // // Use Plotly to plot the data with the layout. 

    // // Create the trace for the bubble chart.
    // var bubbleData = [
   
    // ];

    // // Create the layout for the bubble chart.
    // var bubbleLayout = {
      
    // };

    // D2: 3. Use Plotly to plot the data with the layout.
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{domain:
      {x:[0,1],
      y:[0,1]
    },
    value: washingFrequency,
    type:"indicator",
    mode:"gauge+number",
    title:{text:"Belly Button Washing Frequency"},
    gauge:{axis:{range:[null,10]},
    bar:{color:"black"},
    steps:[{range:[0,2], color:"red"}, {range:[2,4], color:"green"}, {range:[4,6], color:"orange"}, {range:[6,8], color:"blue"},{range:[8,10], color:"yellow"}]
  }
    
     
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     width:500,
     height:450,
     margin:{t:0, b:0}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
};
