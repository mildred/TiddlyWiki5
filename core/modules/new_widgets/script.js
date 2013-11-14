/*\
title: $:/core/modules/new_widgets/script.js
type: application/javascript
module-type: new_widget

Script widget

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/new_widgets/widget.js").widget;

var ScriptWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
	this.context = new Context(this);
};

var Context = function(scriptWidget) {
  this.script = scriptWidget;
}

/*
Inherit from the base widget class
*/
ScriptWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
ScriptWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
ScriptWidget.prototype.execute = function() {
  var script = this.getText();
  this.context.currentTiddler = this.getVariable("currentTiddler");
  this.context.tiddler = $tw.wiki.getTiddler(this.context.currentTiddler);
  try {
    var fn = $tw.utils.evalGlobal("exports = (function(){" + script + "});", {}, this.context.currentTiddler);
    fn.call(this.context);
  } catch(e) {
    console.log("Error in <$script/> rendering " + this.context.currentTiddler + ": " + e.toString(), e);
  }
};

/*
Get the text of the children
*/
ScriptWidget.prototype.getText = function(node) {
  node = node || this.parseTreeNode;
  if(node.text) {
    return node.text;
  }
  if(node.children) {
    var text = "";
    for(var i = 0; i < node.children.length; ++i){
      text += this.getText(node.children[i])
    }
    return text;
  }
  return "";
};

Context.prototype = {};

Context.prototype.getVar = function(name) {
  return this.script.parentWidget.getVariable(name);
};

Context.prototype.setVar = function(name, value) {
  this.script.parentWidget.setVariable(name, value);
};

exports.script = ScriptWidget;

})();
