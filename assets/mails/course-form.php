<?php
session_start();
$win = "true";

// Обработчик для формы записи на курс
if ($_POST) {
    // Получаем данные из формы
    $fio = $_POST['fio'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];
    $course_direction = $_POST['course_direction'];
    $learning_format = $_POST['learning_format'];
    $agreement = isset($_POST['agreement']) ? 'Да' : 'Нет';

    // Формируем текст письма
    $message = "Новая заявка на курс с сайта:\n\n";
    $message .= "ФИО: " . $fio . "\n";
    $message .= "Телефон: " . $tel . "\n";
    $message .= "E-mail: " . $email . "\n";
    $message .= "Направление курса: " . $course_direction . "\n";
    $message .= "Формат обучения: " . $learning_format . "\n";
    $message .= "Согласие с пользовательским соглашением: " . $agreement . "\n";

    // Отправляем письмо
    mail("sidorov-vv3@mail.ru, vasilyev-r@mail.ru", "Запись на курс с сайта", $message);

    $_SESSION['win'] = 1;
    $_SESSION['recaptcha'] = '<p class="text-light">Спасибо за обращение. Мы ответим Вам в&#160;ближайшее время.</p>';
    header("Location: " . $_SERVER['HTTP_REFERER']);
}
