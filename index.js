#!/usr/bin/env node

//optimist stuff adapted from https://docs.nodejitsu.com/articles/command-line/how-to-parse-command-line-arguments

var fs = require('fs'),
	path = require('path'),
	zpad = require('zpad'),
	glob = require("glob"),
	PNG = require('pngjs').PNG,
	PNGCrop = require('png-crop'),
	myArgs = require('optimist').argv,
	help = 'This would be a great place for real help information.';

if ((myArgs.h) || (myArgs.help))
{
	console.log(help);
	process.exit(0);
}

// console.log(myArgs);
// ./index.js --in ~/Desktop/crystal_Zone1_Background.png --width 512 --height 768 --overlap 1 --out ~/Desktop/ --outBase crystal_Zone1_BG
// ./index.js --in ~/Sites/Porting/measurement-skillpack-frontend/assets/zone/crystal_Zone3_Midground.png --out ~/Sites/Porting/measurement-skillpack-frontend/deploy/assets/images/zones/ --overlapRow 0 --exportJSON --jsonSrcPrefix assets/images/zones/
//TODO error checking for existence of params
//TODO take a glob
var inFile = myArgs.in;

var tileWidth = myArgs.width || 1024;
var tileHeight = myArgs.height || 1024;
var overlap = myArgs.overlap || 1;
var outFolder = myArgs.out;
var extension = path.extname(inFile);
var outBasename = myArgs.outBase || path.basename(inFile, extension);
var shouldPrintJSON = myArgs.hasOwnProperty("exportJSON");
var jsonSrcPrefix = myArgs.jsonSrcPrefix || "assets/images/zones/";

var overlapCol = myArgs.hasOwnProperty("overlapCol") ? myArgs.overlapCol : overlap; //we can overlap x and y separately
var overlapRow = myArgs.hasOwnProperty("overlapRow") ? myArgs.overlapRow : overlap;

fs.createReadStream(inFile)
	.pipe(new PNG(
	{
		filterType: -1
	}))
	.on('metadata', function()
	{
		// console.log(this);
		var libName = path.basename(inFile, extension);
		var outObj = {
			name: libName,
			libName: libName,
			position:
			{
				x: 0,
				y: 0
			},
			depth: -1,
			sliceSize:
			{
				width: tileWidth,
				height: tileHeight,
				overlap: overlap,
				overlapCol: overlapCol,
				overlapRow: overlapRow
			},
			images: []
		};
		var numRows = Math.ceil(this.height / (tileHeight - overlapRow));
		var numCols = Math.ceil(this.width / (tileWidth - overlapCol));
		// console.log("rows:", numRows, "cols:", numCols, file.height, tileHeight);
		var iter = 0;
		var imageArr = [];

		var tileCallback = function(err) {
			if (err) throw err;
		};
		for (var row = 0; row < numRows; row++)
		{
			var rowImages = [];
			for (var col = 0; col < numCols; col++)
			{
				var dst;


				var destinationFilename = outBasename + "_" + zpad(iter) + extension;
				dst = path.join(outFolder, destinationFilename);
				var x = (col * tileWidth) - (col * overlapCol);
				var y = (row * tileHeight) - (row * overlapRow);
				rowImages.push(
				{
					id: path.basename(destinationFilename, extension),
					src: jsonSrcPrefix + destinationFilename
				});

				var config = {width: tileWidth, height: tileHeight, left: x, top: y};
				PNGCrop.crop(inFile, dst, config, tileCallback);
				
				iter++;
			}
			imageArr.push(rowImages);
		}
		outObj.images = imageArr;
		if (shouldPrintJSON)
		{
			var jsonStr = JSON.stringify(outObj, null, 4);
			// console.log(jsonStr);
			var jsonFilePath = path.join(outFolder, libName + ".json");
			fs.writeFile(jsonFilePath, jsonStr, function(err, written, string)
			{
				if (err) throw err;
				console.log("done with", libName);
			});
		}

	});