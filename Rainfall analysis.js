//Precipitation analysis using global rainfall data sets
//Excercise1: 2020 Rainfall in Nepal using CHIRPS Daily rainfall data

// import image collection 
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
var rain2020 = chirps.filterDate("yyyy-mm-dd","yyyy-mm-dd").sum()

//clip for Nepal
//load your shp file of Nepal

// add map
Map.addLayer(rain2020.clip(nepal),{min:500,max:4500,palette:"lightblue,blue,darkblue"},"2020 prepcipitation");

//Analysis of rainfall during Cyclone Nisarga using 

// import image collection 
var gsmp = ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/operational");

// Define start and end date
var startDate = ee.Date('yyyy-mm-dd'); //2020-06-04
var endDate = ee.Date('yyyy-mm-dd'); //2020-06-07

// Define collection.
var pcp = gsmp.select('hourlyPrecipRateGC').filterDate(startDate, endDate).filterBounds(nepal);
var tp = pcp.sum();
var tpcp_viz = {min: 0,max: 70, palette: ['white','blue','darkblue']};

//Map.addLayer(nepal);
Map.addLayer(tp.clip(nepal),tpcp_viz, "Total precipitation");

//legend

// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
 
// Create legend title
var legendTitle = ui.Label({
value: 'Total precipitation (mm)',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
 
// Add the title to the panel
legend.add(legendTitle);
 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((tpcp_viz.max-tpcp_viz.min)/100.0).add(tpcp_viz.min);
var legendImage = gradient.visualize(tpcp_viz);
 
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(tpcp_viz['max'])
],
});
 
legend.add(panel);
 
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
 
// add the thumbnail to the legend
legend.add(thumbnail);
 
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(tpcp_viz['min'])
],
});
 
legend.add(panel);
 
Map.add(legend);
