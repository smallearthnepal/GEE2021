//compare snow and ice area in Langtang River Basin during winter 2020 and 2021
//load landsat 8 image collection as l8
//load Langtang river basin shp file //landtangrb

//for winter 2020

var ic2020 = l8.filterBounds(landtangrb)
    .filterDate('yyyy-mm-dd','yyyy-mm-dd') //'2019-12-01','2020-02-28'
    .filterMetadata('CLOUD_COVER', 'less_than', xx); //15
    
print (ic2020);
var image2020 = ic2020.median();

print(image2020);

//snow ice detection
Map.addLayer(image2020.clip(landtangrb), {bands: ["B6","B5","B4"]}, 'Landsat');

//for winter 2021
var ic2021 = l8.filterBounds(landtangrb)
    .filterDate('yyyy-mm-dd','yyyy-mm-dd') //'2020-12-01','2021-02-28'
    .filterMetadata('CLOUD_COVER', 'less_than', xx); //15
    
print (ic2021);
var image2021 = ic2021.median();

print(image2021);

//snow ice detection
Map.addLayer(image2021.clip(landtangrb), {bands: ["B6","B5","B4"]}, 'Landsat');


var exportBands = ee.List(["B4","B5","B6"]);

//Export.image.toDrive(image:img,description:, folder:, region:, scale:)
Export.image.toDrive({
  image: image2020.select(exportBands).clip(landtangrb),
  description: 'SNOWICE',
  scale: 60,
  region: landtangrb
});
