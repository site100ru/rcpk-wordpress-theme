<?php
session_start();
$win = "true";

// Обработчик для формы записи на курс
if ($_POST) {
    // Получаем данные из формы
    $fio = isset($_POST['fio']) ? $_POST['fio'] : '';
    $tel = isset($_POST['tel']) ? $_POST['tel'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $kolvo_user = isset($_POST['kolvo_user']) ? $_POST['kolvo_user'] : '';
    $course_direction = isset($_POST['course_direction']) ? $_POST['course_direction'] : '';
    $learning_format = isset($_POST['learning_format']) ? $_POST['learning_format'] : '';
    $agreement = isset($_POST['agreement']) ? 'Да' : 'Нет';

    // Формируем текст письма
    $message = "ФИО: " . $fio . "\n";
    $message .= "Телефон: " . $tel . "\n";
    $message .= "E-mail: " . $email . "\n";
    $message .= "Количество людей: " . $kolvo_user . "\n";
    $message .= "Направление курса: " . $course_direction . "\n";
    $message .= "Формат обучения: " . $learning_format . "\n";
    $message .= "Согласие с пользовательским соглашением: " . $agreement . "\n";

    // Отправляем письмо
    // mail("info@rcpk62.ru, vasilyev-r@mail.ru", "Запись на курс с сайта", $message);
    mail("sidorov-vv3@mail.ru, vasilyev-r@mail.ru", "Запись на курс с сайта", $message);

    $_SESSION['win'] = 1;
    $_SESSION['recaptcha'] = '<p class="text-light">Спасибо за обращение. <br />Ваша заявка принята в работу. <br />В ближайшее время, с вами свяжется сотрудник учебного центра, <br />для уточнения деталей обучения.</p>';
    header("Location: ".$_SERVER['HTTP_REFERER']);
}
?>