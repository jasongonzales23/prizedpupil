/*******************************************************************************
 * This notice must be untouched at all times.
 * 
 * This javascript library contains helper routines to assist HTML5 Drag and 
 * Drop behave consinstantly among browsers
 * 
 * DragDropHelpers.js v.1.0 available at http://www.useragentman.com/
 * 
 * released under the LGPL 2.1 (http://creativecommons.org/licenses/LGPL/2.1/)
*******************************************************************************/
var DragDropHelpers = new function () {
	var me = this;
	var draggableNodes; 
	var dragEffectNode;
	var currentlyDragged;
	var cachedShowVisualCues = null;

	/*
	 * If set to true, this will show a draggable visual cue in IE and Chrome.
	 */
	me.fixVisualCues = false;	
	
	/*
	 * If set to true, this will show the "move" cursor when the mouse pointer
	 * hovers over a draggable node.
	 */
	me.showMouseoverCue = true;
	
	/*
	 * Run when the page is loaded.  
	*/
	var init = function () {
		//if (EventHelpers.hasPageLoadHappened(arguments)) {
		//	return;
		//}
		console.log('hello');
		//setEvents();	
	}
	 
	
	function setEvents() {
		draggableNodes = $('[draggable=true]'); //added jQuery factory and removed CSS Query above
		console.log(draggableNodes);
		if (draggableNodes.length > 0) {
			for (var i = 0; i < draggableNodes.length; i++) {
				var draggableNode = draggableNodes[i];
				/*
				 * This block allows IE to drag any arbitrary object, 
				 * not just links and images.
				 * also, I might not even need this since it appears it is not recognized by IE 7 or 8
				 */
				if (draggableNode.dragDrop) {
					addEvent(draggableNode, 'mousemove', 
					   draggableNodeMousemoveEvent);
				}
				/*
				 * When the mouse pointer hovers over the draggable objects,
				 * it changes to the move icon. 
				 */
				if (DragDropHelpers.showMouseoverCue) {
					draggableNode.style.cursor = 'move';
				}
				/*
				 * This sets up events that will give visual cues in IE and 
				 * Chrome.  On dragstart, it will clone the draggable object 
				 * and make it transpararent.  On dragend, it will destroy 
				 * it.      
				 */
				if (me.fixVisualCues) {
					EventHelpers.addEvent(draggableNode, 'dragstart', dragStartEvent);
					EventHelpers.addEvent(draggableNode, 'dragend', dragEndEvent)
				}
			}
		}
		/*
		 * This sets up an event that will move the cloned draggable object
		 * when the object is being dragged.
		 */
		if (me.fixVisualCues) {
			EventHelpers.addEvent(document.body, 'drag', dragEvent);
		}
		
	}
	
	function dragStartEvent(e) {
		if (!doesShowVisualCues(e)) {
			dragEffectNode = this.cloneNode(true);
			document.body.appendChild(dragEffectNode);
			dragEffectNode.style.position = 'absolute';
			dragEffectNode.style.visibility = 'hidden';
			CSSHelpers.setOpacity(dragEffectNode, 50);
			
			currentlyDragged = this;
		}
	}
	
	function dragEvent(e) {
		if (!doesShowVisualCues(e)) {
			var nodeLeft = CSSHelpers.getAbsoluteLeft(currentlyDragged);
			var nodeTop = CSSHelpers.getAbsoluteTop(currentlyDragged)
			dragEffectNode.style.visibility = 'visible';
			dragEffectNode.style.left = (e.offsetX + nodeLeft) + 'px';
			dragEffectNode.style.top = (e.offsetY + nodeTop + 5) + 'px';
		}
	}
	
	function dragEndEvent(e) {
		if (!doesShowVisualCues(e)) {
			document.body.removeChild(dragEffectNode);
		}
	}
	
	/*
	 * figures out if a visual cue needs to be inserted.   
	 */
	function doesShowVisualCues(e) {
		if (cachedShowVisualCues == null) {
			if (e.dataTransfer.setDragImage) {
				var chromeString = navigator.userAgent.match(/Chrome\/[0-9]\.[0-9]/);
				if (chromeString) {
					var info = chromeString[0].split('/');
					
					if (parseFloat(info[1]) < 5) {
						cachedShowVisualCues =  false;
					}
					else {
						cachedShowVisualCues = true;
					}
				}
				else {
					cachedShowVisualCues = true;
				}
			}
			else {
				cachedShowVisualCues = false;
			}
		}
		return cachedShowVisualCues;
	}


	
	/* may not be needed, this is for older IE I think*/
	function draggableNodeMousemoveEvent(e) {
		var node = EventHelpers.getEventTarget(e);
		if (window.event.button == 1) {
		    node.dragDrop();
		}
	}
	
	
	
	me.getEventCoords = function (e) {
		var r;
		if (e.offsetX) {
			r = {
				x: e.offsetX,
				y: e.offsetY
			}
		} else if (e.layerX) {
			r =  {
				x: e.layerX,
				y: e.layerY
			}
		} else {
			r = null;
		}
		return r;
	}

	/* 
	 * Idea for randomString() from 
	 * http://www.mediacollege.com/internet/javascript/number/random.html
	 */
	me.randomString = function () {
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = 8;
		var randomstring = '';
		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}
		return randomstring;
	}
}

var CSSHelpers = new function(e){
	var me = this;
	/**
	 * Sets the opacity percentage of an HTML object.  It is not advised to set 
	 * the opacity of an object whose parent's opacity has also been set.
	 *
	 */
	me.setOpacity = function(obj, percentage){
		if (obj.style.filter != null) {
			// IE must have layout, see 
			// http://jszen.blogspot.com/2005/04/ie6-opacity-filter-caveat.html
			// for details.
			obj.style.zoom = "100%";
			
			// if percentage is 100, set this property to nothing.  THis
			// is to prevent selects within this container from disappearing
			// as described in 
			// http://www.esqsoft.com/documents/problem-select-input-disappears-in-IE.htm
			if (percentage == 100) {
				obj.style.filter = "";
			}
			else {
				obj.style.filter = 'alpha(opacity=' + percentage.toString() + ')';
			}
		}
		// W3C 
		else 
			if (obj.style.opacity != null) {
				obj.style.opacity = (percentage / 100).toString();
			// Mozilla
			}
			else 
				if (obj.style.MozOpacity != null) {
					obj.style.MozOpacity = (percentage / 100).toString();
				}
	}
	
	me.getAbsoluteLeft = function(obj) {
		var curleft = obj.offsetLeft;
		if (obj.offsetParent) {

			while (obj == obj.offsetParent ) {
				curleft += obj.offsetLeft - obj.scrollLeft;
			}
		}
		return curleft;
	}
	
	me.getAbsoluteTop = function(node) {
		var obj = node;
		var positionArray = new Array();
		var curtop = obj.offsetTop;
		if (obj.offsetParent) {
			while (obj == obj.offsetParent) {
				curtop += obj.offsetTop - obj.scrollTop;				
			}
		}
		return curtop;
	}
}


$(document).ready(function(){
	DragDropHelpers.init;
	});

//EventHelpers.addPageLoadEvent('DragDropHelpers.init');/* don't need this with jQuery*/