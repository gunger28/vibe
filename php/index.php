<?php
// $request = "kek lol request";
// if($_GET['body'] == '1'){
//     echo $request;
// }

$dataT = array(

    'one' => 'gere one',
    'two' => 'gere second'
);

$data = array(
    'prevMonth' => "august",
    'curMonth' => "September",
    'startDayMonth' => 3,
    'nextMonth' => "october",
    'daysAmount' => 30,
    'currentDay' => 16,

    'daysData' => array(
 0 => array(
    'dayName' => "sreda",

    'tasks' => array(

        0 => array(
            'title' => "Sport",
            'text' => "Sit 30 times",
        ),

        1 => array(
            'title' => "Book",
            'text' => "Read 10 pages",
        )

    )
 )
        ),

    'notes' => array(

        0 => array(
            'date' => 20,
            'month' => 'september',
            'text' => "Find something to eat"
        ),
        1 => array(
            'date' => 15,
            'month' => 'september',
            'text' => "Choose school to the childrens"
        )
       
    )
        );



$input = file_get_contents('php://input');
$input = json_decode($input);
$filtered_a = filter_var($input->a, FILTER_SANITIZE_NUMBER_INT);

$data = json_encode($data);

if($filtered_a == 1){
    echo $data;
}else{
    echo "error";
}





?>