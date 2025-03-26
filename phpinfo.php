<?php
// -----------------------------------------------------------
    # Проверка токена как есть
    // define('VALID_TOKEN', getenv('VALID_TOKEN_PHPINFO'));

    // function unauthorizedResponse() {
    //     header('HTTP/1.1 401 Unauthorized');
    //     // Отдать страницу ошибки в виде файла - укажите переменную в www.conf (по умолчанию), которая содержит путь к файлу
    //     readfile(NGINX_ERROR . '401.html');
    //     // или
    //     // echo('Ошибка 401 - Unauthorized');
    //     exit;
    // }

    // if ($_GET['token'] !== VALID_TOKEN) {
    //     unauthorizedResponse();
    // }

//------------------------------------------------------------
    ## Проверка токена через хэш
    ## Создать:
    # echo -n "your-secret-token" | sha256sum
    ## В Windows через cmd:
    # echo your-secret-token > token.txt
    # CertUtil -hashfile token.txt SHA256

    // define('NGINX_ERROR',       getenv('NGINX_ERROR'));

    // if (empty($_GET['token'])) {
    //     http_response_code(401);
    //     // Отдать страницу ошибки в виде файла - укажите переменную в www.conf (по умолчанию), которая содержит путь к файлу
    //     readfile(NGINX_ERROR . '401.html');
    //     // или
    //     // echo('Ошибка 401 - Unauthorized');
    //     exit;
    // }
    // $token = $_GET['token'];
    // $expectedHash = getenv('VALID_TOKEN_PHPINFO');
    // if (!$expectedHash || hash('sha256', $token) !== $expectedHash) {
    //     http_response_code(401);
    //     readfile(NGINX_ERROR . '401.html');
    //     exit;
    // }

    # Проверка User Agent для отдачи CSS файла с корректировками для смартфонов
    function isMobile() {
        return isset($_SERVER['HTTP_USER_AGENT']) &&
               preg_match('/(iPhone|iPad|iPod|Android.*Mobile|Windows Phone|BlackBerry|IEMobile|Opera Mini)/i', $_SERVER['HTTP_USER_AGENT']);
    }
    $css = isMobile() ? '/res/css/php_smart.css' : '/res/css/php_out.css';
    $jsBtn = isMobile() ? '/res/js/scroll-btn_smart.js' : '/res/js/scroll-btn_pc.js';

    # Перехват вывода для очистки стилей и "шапки" HTML по умолчанию
    ob_start();
    phpinfo();
    $phpinfo = ob_get_clean();

    # Убираем логотип по умолчанию для вставки своего через JS
    $phpinfo = preg_replace('#<a href="http://www.php.net/"><img [^>]*src="[^"]*"[^>]*></a>#is','<a href="http://www.php.net/">',$phpinfo);
    $phpVersion = PHP_VERSION;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Cache-Control" name="ROBOTS" content="NOINDEX,NOFOLLOW,NOARCHIVE,NOIMAGEINDEX,NO-CACHE,NOSNIPPET" />
    <title>phpinfo by BlagoYar | PHP v<?php echo $phpVersion; ?></title>
    <?php if (isMobile()): ?>
        <link rel="stylesheet" href="<?php echo $css; ?>" type="text/css">
        <link rel="stylesheet" href="/res/css/php_out.css" type="text/css">
        <script src="<?php echo $jsBtn; ?>"></script>
    <?php else: ?>
        <link rel="stylesheet" href="<?php echo $css; ?>" type="text/css">
        <script src="<?php echo $jsBtn; ?>"></script>
    <?php endif; ?>
    <link rel="shortcut icon" href="/res/imgs/php_out_favicon.png" type="image/png">
</head>
<body>
    <?php

        $phpinfo = preg_replace('#<style.*?>.*?</style>#is', '', $phpinfo);

        $phpinfo = preg_replace_callback(
            '/<font style="color: (#?[A-Fa-f0-9]{6})">(.*?)<\/font>/',
            function ($matches) {
                $color = ltrim($matches[1], '#');
                return '<span class="color-' . $color . '">' . $matches[2] . '</span>';
            },
            $phpinfo
        );

        # Добавляем/заменяем теги с ключевыми словами для раскраски включеных модулей и т.д.
        $replacements = [
            '/<td class="v">available, disabled <\/td>/' => '<td class="v"><span class="v available-text">available</span> , <span class="v disabled-text">disabled</span></td>',
            '/<td class="v">available <\/td>/' => '<td class="v"><span class="v available-text">available</span></td>',
            '/<td class="v">disabled <\/td>/' => '<td class="v"><span class="v disabled-text">disabled</span></td>',
            '/<td class="v">active <\/td>/' => '<td class="v"><span class="v enabled-text">active</span></td>',
            '/<td class="v">1<\/td>/' => '<td class="v"><span class="v enabled-int">1</span></td>',
            '/<td class="v">enabled <\/td>/' => '<td class="v"><span class="v enabled-text">enabled</span></td>',
            '/<td class="v">Enabled <\/td>/' => '<td class="v"><span class="v enabled-text">Enabled</span></td>',
            '/<td class="v">On<\/td>/' => '<td class="v"><span class="v enabled-on">On</span></td>',
            '/<td class="v">Off<\/td>/' => '<td class="v"><span class="v disabled-off">Off</span></td>',
            '/<td class="v">0<\/td>/' => '<td class="v"><span class="v disabled-int">0</span></td>',
            '/<td class="v">disabled <\/td>/' => '<td class="v"><span class="v disabled-text">disabled</span></td>',
            '/<td class="v">Disabled <\/td>/' => '<td class="v"><span class="v disabled-text">Disabled</span></td>',
            '/<td class="v">disabled \(install ext\/bz2\) <\/td>/' => '<td class="v"><span class="v disabled-text">disabled</span> (install ext/bz2)</td>',
            '/<td class="v">no <\/td>/' => '<td class="v"><span class="v no-text">no</span></td>',
            '/<td class="v">no-ctrl<\/td>/' => '<td class="v"><span class="v no-text">no-ctrl</span></td>',
            '/<td class="v">nocache<\/td>/' => '<td class="v"><span class="v no-text">nocache</span></td>',
            '/<td class="v">none<\/td>/' => '<td class="v"><span class="v no-text">none</span></td>',
            '/<td class="v"><i>no value<\/i><\/td>/' => '<td class="v"><i class="no-text">no value</i></td>',
            '/<tr class="h"><th>(.*?)<\/th><th>enabled<\/th><\/tr>/' => '<tr class="h"><th class="enabled-mod-bg1">$1</th><th class="enabled-mod-bg2"><span class="enabled-mod">enabled</span></th></tr>',
            '/<td class="v">on<\/td>/' => '<td class="v"><span class="v enabled-text">on</span></td>',
            '/<td class="v">off<\/td>/' => '<td class="v"><span class="v enabled-text">off</span></td>',
            '/<tr class="h"><th>(.*?)<\/th><th>disabled<\/th><\/tr>/' => '<tr class="h"><th>$1</th><th class="disabled-mod">disabled</th></tr>',
            '/<td class="v">OK <\/td>/' => '<td class="v"><span class="v enabled-ok">OK </span></td>',
            '/<td class="v">no-cache<\/td>/' => '<td class="v"><span class="v no-text">no-cache</span></td>',
            '/<td class="v">0 <\/td>/' => '<td class="v"><span class="v disabled-int">0 </span></td>',
            '/<td class="v"><i>no value<\/i> <\/td>/' => '<td class="v"><i class="no-text">no value</i> </td>',
        ];

        $phpinfo = preg_replace(array_keys($replacements), array_values($replacements), $phpinfo);

        $phpinfo = preg_replace(
                '/(<table>.*?<\/table>)/s','$1<h1 class="logo-text-h1">reDesign by BlagoYar</h2>
                <table><tbody><tr><td class="e">Project on GitHub</td><td class="v"><span id="logo-text"><a href="https://github.com/BlagoYar/beautiful_phpinfo" class="logo-text" target="_blank" rel="noopener noreferrer">Beautiful phpinfo()</a></span></td></tr></tbody></table><hr class="logo-text">', $phpinfo, 1);

        $scrollButtons = '<div id="scroll-buttons"><button id="scroll-top" class="scroll-btn">▲</button><button id="scroll-center" class="scroll-btn">●</button><button id="scroll-bottom" class="scroll-btn">▼</button></div>';
        $phpinfo = preg_replace('/<\/div>(?!.*<\/div>)/s', $scrollButtons . '</div>', $phpinfo, 1);

        echo $phpinfo;

    ?>

    <script src="/res/js/php_out.js"></script>
</body>
</html>
