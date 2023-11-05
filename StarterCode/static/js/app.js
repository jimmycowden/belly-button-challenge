

const url= 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'


// dashboard load and refresh
function load_dashboard () {    
    let v_select = d3.select('#selDataset');

    d3.json(url).then(data => {   
        let names = data.names;        

        // Populates dropdown
        for (let i = 0; i < names.length; i++) {
            let my_value = names[i];
            v_select.append('option').text(my_value).property('value', my_value);
        };
        
        let s_id = v_select.property('value');
        my_charts(s_id);        
        

    });
}




//update charts when dropdown value changes
function optionChanged(my_value) {    
    my_charts(my_value);    
        }





//This function Creates a horizontal bar chart, Bubble chart, and information chart
function my_charts(my_value) {    
    d3.json(url).then(data => {        

        let samples = data.samples;
        let resultArray = samples.filter(x => x.id == my_value);
        let result = resultArray[0];
        let otu_id = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;        
        let y_ticks = otu_id.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();
        let data_1 = data.metadata;        
        let result_1 = data_1.filter(y => y.id == my_value)[0];
        let chart = d3.select('#sample-metadata');
       


//trace barchart
            let trace = {
            x: sample_values.slice(0,10).reverse(),
            y: y_ticks,
            type: 'bar',            
            orientation: 'h',
            text: otu_labels.slice(0,10).reverse()
            
        };

         // Create a layout for barchart
        let bar_Layout = {title: "Top 10 OTUs", margin: {t: 75, l: 100}};

        //call plotly function for barchart
        Plotly.newPlot('bar', [trace], bar_Layout);



        ////trace bubblechart
        let trace_data = {
            x: otu_id,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {size: sample_values, color: otu_id, colorscale:'Jet'},
            //color options 'Jet', 'Greens', 'Earth', 'Blackbody', 'Picnic'
            
        }
            
        

        // Create a layout bubble chart
        let bubble_Layout = {title: 'Bacteria Culture Per Sample', margin: {t: 25}, hovermode: 'closest', xaxis: {title: "OTU-ID"}};

        // Call Plotly funtion for bubble chart
        Plotly.newPlot('bubble', [trace_data], bubble_Layout);


        //clear information chart
        chart.html('');

        //gather data for information chart
        Object.entries(result_1).forEach(([key, value]) => {
            chart.append('h6').text(`${key}: ${value}`);
        });



    })

}




load_dashboard();









