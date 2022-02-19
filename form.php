<?php

$name = $_POST['name'];
$phone = $_POST['phone'];
$street = $_POST['street'];
$home = $_POST['home'];
$part = $_POST['part'];
$appart = $_POST['appart'];
$floor = $_POST['floor'];
$comment = $_POST['comment'];

$mail = "masnoy0alexey@gmail.com";

$headers = "Content-type: text/plain; charset = utf-8";

$subject = "Тема письма";

$message = "Тело письма - Заявка\nИмя: $name\nТелефон: $phone\nУлица: $street\nДом: $home\nКвартира: $appart\nКомментарии: $comment\n";

$send = mail ($mail, $subject, $message, $headers);

echo $send
?>
