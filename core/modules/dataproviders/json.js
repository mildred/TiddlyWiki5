/*\
title: $:/core/modules/dataproviders/json.js
type: application/javascript
module-type: dataprovider

The JSON data provider provides data for an application/json tiddler

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var JSONDataProvider = function(tiddler,defaultData,options) {
  var data;
  try {
		data = JSON.parse(tiddler.fields.text);
	} catch(ex) {
		return defaultData;
	}
	return data;
};

exports["application/json"] = JSONDataProvider;

})();

