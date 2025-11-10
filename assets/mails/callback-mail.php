<?php
session_start();
$win = "true";

// Обработчик для формы записи на курс
if($_POST){
    // Получаем данные из формы
    $address = $_POST['address'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];
    $question = $_POST['question'];
    $agreement = isset($_POST['agreement']) ? 'Да' : 'Нет';
    
    // Формируем текст письма
    $message = "Новая заявка на курс с сайта:\n\n";
    $message .= "Адрес: ".$address."\n";
    $message .= "Телефон: ".$tel."\n";
    $message .= "E-mail: ".$email."\n";
    $message .= "Вопрос: ".$question."\n";
    $message .= "Согласие с пользовательским соглашением: ".$agreement."\n";
    
    // Отправляем письмо
    mail("sidorov-vv3@mail.ru, vasilyev-r@mail.ru", "Запись на курс с сайта", $message);
    
    $_SESSION['win'] = 1;
    $_SESSION['recaptcha'] = '<p class="text-light">Спасибо за обращение. Мы ответим Вам в&#160;ближайшее время.</p>';
    header("Location: ".$_SERVER['HTTP_REFERER']);
}
?>