//Water cover area before and after Koshi flood on 18 August 2008
//load landsat 5 image collection as l5
//create a point over Koshi river using geometry tools

var ic = l5.filterBounds(point);
var icmd = ic.filterDate('2008-07-01','2008-10-30')
              .sort('CLOUD_COVER'); //'2008-07-01','2008-10-30'
 
print(icmd);

// import images
var imgBefore = ee.Image("LANDSAT/LT05/C01/T1_SR/LT05_140042_20080708");
var imgAfter = ee.Image("LANDSAT/LT05/C01/T1_SR/LT05_140042_20081012");

// set threshold
var threshold = 0

// calculate ndwi before dam construction
var ndwiBefore = imgBefore.normalizedDifference(["B2","B4"])
var ndwiBefore = ndwiBefore.mask(ndwiBefore.gt(threshold))

// calculate ndwi after dam construction
var ndwiAfter = imgAfter.normalizedDifference(["B2","B4"])
var ndwiAfter = ndwiAfter.mask(ndwiAfter.gt(threshold))

// add images as true color
Map.addLayer(ee.Image(imgBefore),{bands:"B3,B2,B1",min:0,max:3000},"Before breach")
Map.addLayer(ee.Image(imgAfter),{bands:"B3,B2,B1",min:0,max:3000},"After breach")

// add water maps
Map.addLayer(ndwiBefore,{palette:"blue"},"Before breach")
Map.addLayer(ndwiAfter,{palette:"blue"},"After breach")

Map.setCenter(87.03,26.61, 8);