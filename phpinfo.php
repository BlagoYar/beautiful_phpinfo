/*<?php
    define('VALID_TOKEN', getenv('VALID_TOKEN_PHPINFO'));

    function unauthorizedResponse() {
        header('HTTP/1.1 401 Unauthorized');
        echo("ERROR 401");
        exit;
    }

    if ($_GET['token'] !== VALID_TOKEN) {
        unauthorizedResponse();
}

    // Начало буферизации вывода
    ob_start();

    // Вызов phpinfo() для захвата его вывода в буфер
    phpinfo();

    // Получение содержимого буфера
    $phpinfo = ob_get_contents();

    // Завершение буферизации вывода
    ob_end_clean();
?>*/
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.1">
    <title>Beautiful PHP Info</title>
    <link rel="shortcut icon" href="img/favicon.png" type="image/png">
    <link rel="stylesheet" href="css/style.css">
    <script defer src="js/js.js"></script>
</head>
<body>
    <?php echo $phpinfo; ?>

    <script>
    function replaceActiveText() {
      const elements = document.querySelectorAll('td.v');
    
      elements.forEach(element => {
        if (element.textContent === 'active') {
          const parent = element.parentNode;
          const span = document.createElement('span');
          span.classList.add('enabled-text');
          span.textContent = 'active';
          parent.replaceChild(span, element);
        }
      });
    }
    
    window.addEventListener('DOMContentLoaded', replaceActiveText);
    </script>
</body>
</html>
