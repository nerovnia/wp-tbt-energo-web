<?php
header("Content-type: text/html; charset=utf-8");

$to2 = 'tbt.energo@gmail.com';

$name = $_POST['name'];
$phone = $_POST['phone'];
$info = $_POST['info'];
$subject = "Сайт";

    $message = '
    <html>
    <head>
    <title>'.$subject.'</title>
    </head>
    <body>
		<p>'.$name.'</p>
		<p>'.$phone.'</p>
		<p>'.$info.'</p>
    </body>
    </html>';

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf8\r\n";

mail($to1, $subject, $message, $headers);
mail($to2, $subject, $message, $headers);

header("Location: /thank");

?>