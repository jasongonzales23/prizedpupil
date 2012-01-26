<?php
    $courses = array(
        'cid-mba707' => 'MBA 707',
        'cid-mba711' => 'MBA 711',
        'cid-mba713' => 'MBA 713'
    );


    $courseID = $_REQUEST['courseID'];
    
    foreach ($courses as $section => $updates) {
        if(strpos($section, $courseID) !== FALSE)
        $html = $section;
    }
    
    //normally there would be a DB query here but I am just going to use this as a
    //fake controller that accesses data from itself in the form of a flat file
    
    //$cidMba707 = '<h3>Test MBA707</h3>';
    
    
    echo($html);
?>