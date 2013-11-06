/*\
title: $:/core/modules/dataproviders/tiddlerdictionary.js
type: application/javascript
module-type: dataprovider

The JSON data provider provides data for an application/x-tiddler-dictionary tiddler

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var TiddlerDictionaryDataProvider = function(tiddler,defaultData,options) {
	return $tw.utils.parseFields(tiddler.fields.text);
};

exports["application/x-tiddler-dictionary"] = TiddlerDictionaryDataProvider;

})();

