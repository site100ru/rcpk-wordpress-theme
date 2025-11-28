<?php
session_start();
$win = "true";

// Обработчик для формы записи на курс
if($_POST){
    // Получаем данные из формы
    $username = $_POST['username'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];
    $question = $_POST['question'];
    $agreement = isset($_POST['agreement']) ? 'Да' : 'Нет';
    
    // Формируем текст письма
    $message = "Имя: ".$username."\n";
    $message .= "Телефон: ".$tel."\n";
    $message .= "E-mail: ".$email."\n";
    $message .= "Вопрос: ".$question."\n";
    $message .= "Согласие с пользовательским соглашением: ".$agreement."\n";
    
    // Отправляем письмо
    // mail("info@rcpk62.ru, vasilyev-r@mail.ru", "Запись на курс с сайта", $message);
    mail("sidorov-vv3@mail.ru, vasilyev-r@mail.ru", "Сообщение с сайта", $message);
    
    $_SESSION['win'] = 1;
    $_SESSION['recaptcha'] = '<p class="text-light">Спасибо за обращение. <br />Ваша заявка принята в работу. <br />В ближайшее время, с вами свяжется сотрудник учебного центра, <br />для уточнения деталей обучения.</p>';
    header("Location: ".$_SERVER['HTTP_REFERER']);
}
?>