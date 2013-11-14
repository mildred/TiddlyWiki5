/*\
title: $:/core/modules/new_widgets/for.js
type: application/javascript
module-type: new_widget

For widget

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/new_widgets/widget.js").widget;

var ForWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
ForWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
ForWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	this.renderChildren(parent,nextSibling);
};

/*
Compute the internal state of the widget
*/
ForWidget.prototype.execute = function() {
	// Get our attributes
	this.value = this.evalExpr(this.getAttribute("in"));
	this.varIndex = this.getAttribute("index");
	this.varKey   = this.getAttribute("key");
	this.varValue = this.getAttribute("value");
	// Compose the list of elements
	var members = [];
	if(this.value instanceof Array) {
	  for(var i = 0; i < this.value.length; ++i) {
	    members.push(this.makeItemTemplate(this.varIndex, i, this.value[i]));
	  }
	} else if(typeof this.value == "object") {
	  for(var k in this.value) {
	    members.push(this.makeItemTemplate(this.varKey, k, this.value[k]));
	  }
	}
	// Construct the child widgets
	this.makeChildWidgets(members);
};

/*
Compose the template for a list item
*/
ForWidget.prototype.makeItemTemplate = function(varName, varValue, value) {
  var vars = {};
  vars[varName]       = varValue;
  vars[this.varValue] = value;
	return {type: "foritem", vars: vars, children: this.parseTreeNode.children};
};

exports['for'] = ForWidget;

var ForItemWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
ForItemWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
ForItemWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.execute();
	this.renderChildren(parent,nextSibling);
};

/*
Compute the internal state of the widget
*/
ForItemWidget.prototype.execute = function() {
	// Set the current list item title
	for(var v in this.parseTreeNode.vars) {
	  this.setVariable(v, this.parseTreeNode.vars[v]);
	}
	// Construct the child widgets
	this.makeChildWidgets();
};

exports.foritem = ForItemWidget;

})();
