/*******************************************************************************
 * jquery drag and drop helpers
 *
 * author: Jason M. Gonzales
 *
 * ****************************************************************************/

var DragDropHelper = {
    draggableNodes:null,
    dragEffectNode:null,
    currentObj:null,
    cachedShowVisualCues: null,
    fixVisualCues: true,
    showMouseoverCue: true,
    
    init: function() {
        draggableNodes = $('[draggable=true]'); //added jQuery factory and removed CSS Query above
        if (draggableNodes.length > 0) {
            for (var i = 0; i < draggableNodes.length; i++) {
                var draggableNode = draggableNodes[i];
                /*
                 * This block allows IE to drag any arbitrary object, 
                 * not just links and images.
                 * might not even need this
                 * 
                if (draggableNode.dragDrop) {
                    addEvent(draggableNode, 'mousemove', 
                    draggableNodeMousemoveEvent);
                }
                */
                /*
                 * When the mouse pointer hovers over the draggable objects,
                 * it changes to the move icon. 
                 */
                if (DragDropHelper.showMouseoverCue) {
                    draggableNode.style.cursor = 'move';
                }
                /*
                 * This sets up events that will give visual cues in IE and 
                 * Chrome.  On dragstart, it will clone the draggable object 
                 * and make it transpararent.  On dragend, it will destroy 
                 * it.      
                 */
                if (DragDropHelper.fixVisualCues) {
                    addEvent(draggableNode, 'dragstart', DragDropHelper.dragStartEvent);
                    addEvent(draggableNode, 'dragend', DragDropHelper.dragEndEvent)
                }
            }
        }
        //why is this one not in the loop?
        if (DragDropHelper.fixVisualCues) {
        addEvent(document.body, 'drag', DragDropHelper.dragEvent);
	}
    },
    
    dragStartEvent: function(e) {
        if (!DragDropHelper.doesShowVisualCues(e)) {
            dragEffectNode = this.cloneNode(true);
            document.body.appendChild(dragEffectNode);
            $(dragEffectNode).css({
                'position':'absolute',
                'visibility':'hidden',
                'opacity':.5
            });
            DragDropHelper.currentObj = this;
        }
        else{
            //console.log('shows visual cues');
        }
    },

    dragEvent: function(e) {
        if (!DragDropHelper.doesShowVisualCues(e)) {
            //console.log('dragEvent');
            //$(document).mousemove(function(e){
                //$('#status').html(e.clientX + ', ' + e.clientY);
            //});
            //var position = $(currentObj).offset();
            //var nodeLeft = CSSHelpers.getAbsoluteLeft(currentObj);
            //var nodeTop = CSSHelpers.getAbsoluteTop(currentObj)
            //TODO use mousePos method to get crossbrowser mouse position
            $(dragEffectNode).css({
                'visibility':'visible',
                'top': e.clientY + 'px',
                'left': e.clientX + 'px'
            });
            //dragEffectNode.style.left = (e.clientX /*+ position.left*/ /*+ nodeLeft*/) + 'px';
            //dragEffectNode.style.top = (e.clientY /*+ position.top*//*+ nodeTop + 5*/) + 'px';
        }
    },

    dragEndEvent: function(e) {
        if (!DragDropHelper.doesShowVisualCues(e)) {
            document.body.removeChild(dragEffectNode);
        }
    },
    
    /*
    * figures out if a visual cue needs to be inserted.   
    */
    doesShowVisualCues: function(e) {
        if (DragDropHelper.cachedShowVisualCues == null) {
            if (e.dataTransfer.setDragImage) {
                //console.log('drag Image is available');
                var chromeString = navigator.userAgent.match(/Chrome\/[0-9]\.[0-9]/);
                if (chromeString) {
                    //console.log(chromeString);
                    var info = chromeString[0].split('/');
                    
                    if (parseFloat(info[1]) < 5) {
                        DragDropHelper.cachedShowVisualCues =  false;
                    }
                    else {
                        DragDropHelper.cachedShowVisualCues = true;
                    }
                }
                else {
                    DragDropHelper.cachedShowVisualCues = true;
                }
            }
            else {
                //console.log('drag Image is not available');
                DragDropHelper.cachedShowVisualCues = false;
            }
        }
        return DragDropHelper.cachedShowVisualCues;
    }
    
} //end DragDrop namespace

/*
var CSSHelpers = {
    setOpacity: function(obj, percentage){
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
	},
    
    getAbsoluteLeft: function(obj) {
		var curleft = obj.offsetLeft;
		if (obj.offsetParent) {

			while (obj == obj.offsetParent ) {
				curleft += obj.offsetLeft - obj.scrollLeft;
			}
		}
		return curleft;
	},
	
	getAbsoluteTop: function(node) {
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
    
} //end CSSHelpers namespace
*/