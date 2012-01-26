/* Authors: 
Jason Gonzales, Lewis Mann
*/

/*____________BEGIN BOOTSTRAP LIBRARY_______________________*/
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
    this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
    return this;
}

/*____________END BOOTSTRAP LIBRARY_______________________*/

//GLOBAL VARS
i=0;
var modalCloseButton = '<a class="close">x</a>';

$(document).ready(function(){

// fixes visual cues in IE and Chrome.
DragDropHelpers.fixVisualCues=true;

    //this make the widgets in the footer toggle on click    
    $('footer').find('li').click(function(e){
        var links = $('footer > ul > li');
        links.each(function () {
            if (e.target != this) { // if not the clicked item
                $(this).hasClass("open") ? $(this).removeClass("open").find('.footerWidget').toggle() : "";
            } else {
                $(this).hasClass("open") ? $(this).removeClass("open") : $(this).addClass("open");
                $(this).find('.footerWidget').toggle();
            }
        });
    });
    
    $('footer').find('li').children().click(function(e){
	e.stopPropagation();
    });
    
    $('.footerWidget').find('h3').click(function(e){ 
        $('.open').removeClass();
        $(this).closest('.footerWidget').toggle();
    });
    
    $('#role-switcher').click(function(){
        var $containers = $('#course-design-tools').add('#course');
       $containers.toggleClass('editing reading');
    });
    
    //TODO get scrolltop to reposition toolbox on scroll
    //$(window).scroll(function(){
    //    var thing = $('#main').offset();
    //    console.log(thing);
    //})
    
    /*________________#BEGIN MODAL CONTENT TYPES_______________________*/
    function modalError(){
	console.log('modal error');
    }
 
    function courseReader(){
	$("#modal-left-pane").append('<h2>Assignment 1-1: Lorem ipsum dolor sit amet</h2>');
        $("#modal-left-pane").append('Start Date: 11-11-11 / End Date: 11/11/11');
        $("#modal-left-pane").append('<h3>Lorem ipsum dolor sit amet</h3>');
        $("#modal-left-pane").append('<h3>Lorem ipsum dolor sit amet</h3>');
	$("#modal-left-pane").append('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur dolor eu lorem mollis ut mollis metus commodo. Sed eleifend, orci ut rutrum interdum, justo ipsum cursus diam, sed fringilla lorem nisi id ante. Etiam convallis euismod ipsum, ut interdum metus consequat et. Duis ornare, ante a malesuada sollicitudin, eros quam aliquet urna, non convallis elit odio id erat. Sed aliquam sapien sit amet nisl feugiat porttitor vulputate dolor euismod. Maecenas convallis pretium arcu, vitae vehicula lorem iaculis eu. Nunc convallis laoreet viverra. Proin volutpat, leo condimentum malesuada tempus, est mi gravida arcu, at semper ipsum felis bibendum quam. Suspendisse potenti. Etiam id tortor tortor, ut iaculis nulla. Maecenas egestas venenatis tortor, sit amet venenatis tortor elementum vel. Maecenas sodales tellus non nisi pharetra rutrum. Proin tincidunt sem ut massa imperdiet at luctus massa laoreet.</p>');
	$("#modal-left-pane").append('<p>Ut a tortor arcu. Donec purus magna, cursus nec auctor a, lobortis euismod elit. Nulla sit amet eros orci, ut eleifend nunc. In porttitor massa vitae nunc laoreet ut sodales velit vestibulum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam posuere nisi non nulla eleifend ut lobortis ligula tristique. Donec blandit convallis magna a luctus. Vestibulum eu diam at lorem suscipit volutpat suscipit nec dolor. Pellentesque porttitor lacus eget neque commodo porttitor. Praesent a quam elit. Donec ac dapibus velit. Donec suscipit dapibus justo in scelerisque. Vestibulum euismod bibendum felis, vitae placerat justo venenatis vitae. Sed tellus magna, egestas pretium vehicula sed, viverra quis neque. Cras pellentesque vulputate leo, vel facilisis purus bibendum quis. Integer in risus est. Suspendisse potenti.</p>');
        $("#modal-left-pane").append('Tags: Suggested, Assignment, Object');
        $("#modal-right-pane").html('<h3>Student Tools</h3>');
        $("#modal-right-pane").show().append('<ul class=""><li>Submit</li><li>Discuss</li><li>Franklin Live!</li><li>Library Databases</li><li>Turnitin</li><li>Share</li><li>Test Proctor</li><li>Student Union</li></ul>');
    }
    
    function addWidget(){
	$("#modal-left-pane").addClass("widget-picker");
	$.ajax({
	url:"AJAX/widget-picker.html",
	//data: {'courseID':$thisID},
	success:function(data) {
	   $("#modal-left-pane").prepend(data);
	    //appendEl.append(data);
	}
	});
    }
    
    /*________________#END MODAL CONTENT TYPES_______________________*/
    
    //fake openModal function for "reading mode"
    function openModal(modalType){
	if (modalType == null){
	    modalError(); //need to write a full function
	}
	else {
	    console.log('the modal opened');
	    $("#blanket").addClass("live-blanket");
	    $("#modal").show().addClass("live-modal");
	    $("#modal-content").addClass("live-modal-content");
	    $("#modal-left-pane").html(modalCloseButton);
	    modalType();
	}
    }
        
    function closeModal(){
        //console.log('the modal closed');
        $("#modal-content").removeClass("live-modal-content");
        $("#modal").removeClass("live-modal");
        $("#blanket").removeClass("live-blanket");
        $("#modal-right-pane").hide().empty();
        $("#modal-left-pane").empty();
    }
    
    //double-click objects to open a modal
    $('.object').live('dblclick', function(){
        openModal(courseReader);   
    });
    
    // x out of modal
    $('.close').live("click", function(){
        closeModal();   
    });
    
    /*______________#BEGIN Drag and Drop Scripts______________________*/
    
    /*______________#BEGIN OBJECTS Drag and Drop functions____________*/
    function ObjDragStart(e){
        currentlyDragged = this;
        objType = $(this).attr('class');
        objName = $(this).text();
        //console.log('starting! cuurentlyDragged= ' + currentlyDragged);
    }
    
    function ObjDrag(e){
        //console.log('dragging'); 
    }
    
    function ObjDragEnd(e){
        console.log('dragEnd');
    }
    
    function ObjDragenter(e){
        if (currentlyDragged.id !== this.id) {
            $(this).addClass('droparea');
            }
        e.preventDefault();
    }
    
    function ObjDragover(e){
	e.preventDefault();
    }
    
    function ObjDragleave(e){
	$(this).removeClass('droparea');
    }
    
    function ObjDrop(e){
        $(this).removeClass('droparea');
	$(currentlyDragged).insertBefore(this);
    }
    
    /*_______________#BEGIN CONTAINERS Drag and Dropfunctions__________________*/
    
    function getObj(objType){
        //this is fake, we need to make this JSON or something
        if ($(currentlyDragged).hasClass('object')){
            var obj = '<a class="object" href="#" draggable="true" id="'+ objType + i +'">'+ objName +'</a>';
        }
        if ($(currentlyDragged).hasClass('container')){
            var obj = '<div class="container dropped" id="container'+ i +'"><div class="draghandle"><h2 contenteditable>+ Container</h2></div></div> <!--#END CONTAINER-->';
        }
        return obj;
    }
    
    function ContainerDragOver(e){
        //console.log('dragOver');
        e.preventDefault();
    }
    
    function ContainerDropEvent(e){
        if ($(e.target).hasClass('container')){
            if($(currentlyDragged).hasClass('toolbox')){
            var obj = getObj(objType);
            $(this).append(obj);
            i++;
            }
            else{
                //var obj = getObj(objType);
                //$(this).append(obj);
                $(currentlyDragged).appendTo(this);
            }
            //$(currentlyDragged).removeClass('droparea');
            e.preventDefault();
            return false;
            }
    }
    
    /*_______________#BEGIN COURSE DROP AREA Drag and Drop functions____________________*/
    function CourseDragOver(e){
        //console.log('courseDragOver');
        e.preventDefault();
    }
    
    function CourseDropEvent(e){
        if (e.target.id =="course" ){
            if($(currentlyDragged).hasClass('toolbox')){
                var obj = getObj(objType);
                $(this).append(obj);
                i++;
            }
            else{
                $(currentlyDragged).appendTo(this);
                //var obj = getObj(objType);
                //$(this).append(obj);
                //i++;
            }
            e.preventDefault();
            return false;
        }
    }
    
    //bind the objects
    function bindObjs(){
        $("#main").delegate('.object','dragstart',ObjDragStart);
        $("#main").delegate('.object','drag',ObjDrag)
        $("#main").delegate('.object','dragend',ObjDragEnd);
	$("#main").delegate('.object', 'dragenter', ObjDragenter);
	$("#main").delegate('.object', 'dragover', ObjDragover);
	$("#main").delegate('.object', 'dragleave', ObjDragleave);
	$("#main").delegate('.object', 'drop', ObjDrop);
    }
    
    bindObjs();
    
    function bindContainers(){
        $("#course").delegate('.container','dragover',ContainerDragOver)
        $("#course").delegate('.container','drop',ContainerDropEvent);
    }
    
    bindContainers();

    //bind things in the toolbox
    $('.container.toolbox').bind
    ('dragstart',ObjDragStart).bind('drag', ObjDrag).bind
    ('dragend', ObjDragEnd);
    
    //bind the course area
    $('#course').bind('dragover',CourseDragOver).bind('drop', CourseDropEvent);
    
    /*_____________#BEGIN WEEKLY READING AND PREP LOADER_____________________*/
    $('.course').each(function(i, el){
	var $thisID = this.id;
	console.log($thisID);
	var appendEl = $(this).find('.upcoming-items');
	console.log(appendEl);
	//appendEl.append('Hi!');
	
	$.ajax({
	url:'AJAX/'+ $thisID +'.html',
	//async: true,
	//cache:false,
	data: {'courseID':$thisID},
	success:function(data) {
	    //console.log(data);
	    appendEl.append(data);
	}
	});
	
    });
    
    /*_____________#END WEEKLY READING AND PREP LOADER_____________________*/
    
    /*_____________#BEGIN MODAL WITH AJAX CONTENT CODE (EXAMPLE IS FOR ADDING APPS TO HOME PAGE)____________*/
    $("#btn-add-widget").click(function(){
	
	openModal(addWidget);
	
    })    
    /*_____________#END MODAL WITH AJAX CONTENT CODE (EXAMPLE IS FOR ADDING APPS TO HOME PAGE)____________*/
    
});