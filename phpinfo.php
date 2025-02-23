<?php
    define('VALID_TOKEN', getenv('VALID_TOKEN_PHPINFO'));

    function unauthorizedResponse() {
        header('HTTP/1.1 401 Unauthorized');
        readfile("/usr/share/nginx/html/401.html");
        exit;
    }

    if ($_GET['token'] !== VALID_TOKEN) {
        unauthorizedResponse();
    }

    function getUserAgent() {
        return $_SERVER['HTTP_USER_AGENT'];
    }

    function isMobile() {
        $userAgent = $_SERVER['HTTP_USER_AGENT'];

        if (preg_match('/(iPhone|iPad|iPod|Android.*Mobile|Windows Phone|BlackBerry|IEMobile|Opera Mini)/i', $userAgent)) {
            return true;  // Это мобильное устройство
        }

        return false;
    }

    $cssFile = isMobile() ? '/res/css/php_smart.css' : '/res/css/php_out.css';

    ob_start();
    phpinfo();
    $phpinfo = ob_get_clean();

    $phpinfo = preg_replace('#<a href="http://www.php.net/"><img [^>]*src="[^"]*"[^>]*></a>#is','<a href="http://www.php.net/">',$phpinfo);
    $phpVersion = PHP_VERSION;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>phpinfo by BlagoYar | PHP v<?php echo $phpVersion; ?></title>
    <meta name="ROBOTS" content="NOINDEX,NOFOLLOW,NOARCHIVE" />
    <?php if (isMobile()): ?>
        <link rel="stylesheet" href="<?php echo $cssFile; ?>" type="text/css">
    <?php endif; ?>
    <link rel="stylesheet" href="/res/css/php_out.css" type="text/css">
    <link rel="shortcut icon" href="/res/imgs/php_out_favicon.png" type="image/png">
    <script defer src="/res/js/php_out.js"></script>
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

        $replacements = [
            '/<td class="v">available, disabled <\/td>/' => '<td class="v"><span class="v available-text">available</span>, <span class="v disabled-text">disabled</span></td>',
            '/<td class="v">available <\/td>/' => '<td class="v"><span class="v available-text">available</span></td>',
            '/<td class="v">disabled <\/td>/' => '<td class="v"><span class="v disabled-text">disabled</span></td>',
            '/<td class="v">active <\/td>/' => '<td class="v"><span class="v enabled-text">active</span></td>',
            '/<td class="v">1<\/td>/' => '<td class="v"><span class="v enabled-text">1</span></td>',
            '/<td class="v">enabled <\/td>/' => '<td class="v"><span class="v enabled-text">enabled</span></td>',
            '/<td class="v">Enabled <\/td>/' => '<td class="v"><span class="v enabled-text">Enabled</span></td>',
            '/<td class="v">On<\/td>/' => '<td class="v enabled-text">On</td>',
            '/<td class="v">Off<\/td>/' => '<td class="v disabled-text">Off</td>',
            '/<td class="v">0<\/td>/' => '<td class="v"><span class="v disabled-text">0</span></td>',
            '/<td class="v">disabled <\/td>/' => '<td class="v"><span class="v disabled-text">disabled</span></td>',
            '/<td class="v">Disabled <\/td>/' => '<td class="v"><span class="v disabled-text">Disabled</span></td>',
            '/<td class="v">disabled \(install ext\/bz2\) <\/td>/' => '<td class="v"><span class="v disabled-text">disabled</span> (install ext/bz2)</td>',
            '/<td class="v">no <\/td>/' => '<td class="v"><span class="v no-text">no</span></td>',
            '/<td class="v">no-ctrl<\/td>/' => '<td class="v"><span class="v no-text">no-ctrl</span></td>',
            '/<td class="v">nocache<\/td>/' => '<td class="v"><span class="v no-text">nocache</span></td>',
            '/<td class="v">none<\/td>/' => '<td class="v"><span class="v no-text">none</span></td>',
            '/<td class="v"><i>no value<\/i><\/td>/' => '<td class="v"><i class="no-text">no value</i></td>',
            '/<tr class="h"><th>(.*?)<\/th><th>enabled<\/th><\/tr>/' => '<tr class="h"><th>$1</th><th class="enabled-text">enabled</th></tr>',
            '/<td class="v">on<\/td>/' => '<td class="v enabled-text">on</td>',
            '/<td class="v">off<\/td>/' => '<td class="v disabled-text">off</td>',
            '/<tr class="h"><th>(.*?)<\/th><th>disabled<\/th><\/tr>/' => '<tr class="h"><th>$1</th><th class="disabled-text">disabled</th></tr>',
            '/<td class="v">OK <\/td>/' => '<td class="v enabled-text">OK </td>',
            '/<td class="v">no-cache<\/td>/' => '<td class="v"><span class="v no-text">no-cache</span></td>',
            '/<td class="v">0 <\/td>/' => '<td class="v"><span class="v disabled-text">0 </span></td>',
            '/<td class="v"><i>no value<\/i> <\/td>/' => '<td class="v"><i class="no-text">no value</i> </td>',
        ];

        $phpinfo = preg_replace(array_keys($replacements), array_values($replacements), $phpinfo);

        echo $phpinfo;

    ?>
</body>
</html>
