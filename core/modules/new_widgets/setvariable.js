/*\
title: $:/core/modules/new_widgets/setvariable.js
type: application/javascript
module-type: new_widget

Setvariable widget

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/new_widgets/widget.js").widget;

var SetVariableWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
SetVariableWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
SetVariableWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	this.renderChildren(parent,nextSibling);
};

/*
Compute the internal state of the widget
*/
SetVariableWidget.prototype.execute = function() {
	// Get our parameters
	this.setName = this.getAttribute("name","currentTiddler");
	this.setValue = this.findValue();
	// Set context variable
	this.setVariable(this.setName,this.setValue,this.parseTreeNode.params);
	// Construct the child widgets
	this.makeChildWidgets();
};

SetVariableWidget.prototype.findValue = function() {
	// Find value and use value-if-empty if the value is empty
	var value = this.getAttribute("value");
	if(value == "")
		value = this.getAttribute("value-if-empty", this.setValue);

	// If the value is empty, find an expression value
	if(value == undefined) {
	  var expr = this.getAttribute("expr");
	  if(expr) value = this.evalExpr(expr);
	}

	// If the value is empty, find a data value
	if(value == undefined) {
		var dataTiddler = this.getAttribute("data-tiddler");
		if(dataTiddler == undefined && this.getAttribute("data") == "true")
			dataTiddler = this.getVariable("currentTiddler");
		if(dataTiddler != undefined)
			value = $tw.wiki.getTiddlerData(dataTiddler);
	}

	return value;
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
SetVariableWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes.name || changedAttributes.value) {
		this.refreshSelf();
		return true;
	} else {
		return this.refreshChildren(changedTiddlers);		
	}
};

exports.setvariable = SetVariableWidget;

})();
