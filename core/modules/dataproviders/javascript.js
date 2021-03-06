/*\
title: $:/core/modules/dataproviders/javascript.js
type: application/javascript
module-type: dataprovider

The JSON data provider provides data for an application/javascript tiddler

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var JavaScriptDataProvider = function(tiddler,defaultData,options) {
	// Parse javascript, expect a function
  // Call the function with this bound to the tiddler
  try {
    var fn = $tw.utils.evalGlobal("exports = (function(){" + tiddler.fields.text + "});", {}, tiddler.fields.title);
    var data = fn.call(tiddler);
  } catch(e) {
    console.log("Error in JavaScript DataProvider in " + tiddler.fields.title + ": " + e.toString(), e);
  }
  return data;
};

exports["application/javascript"] = JavaScriptDataProvider;

})();

