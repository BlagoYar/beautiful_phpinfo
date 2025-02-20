<?php
    define('VALID_TOKEN', getenv('VALID_TOKEN_PHPINFO'));

    function unauthorizedResponse() {
        header('HTTP/1.1 401 Unauthorized');

        // If you want to give a message rather than a page as a response.
        echo("Error 401 - Unauthorized");
        
        // If you want to give a page rather than a message as a response.
        //readfile("/usr/share/nginx/html/401.html");
        
        exit;
    }

    if ($_GET['token'] !== VALID_TOKEN) {
        unauthorizedResponse();
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Custom PHP Info</title>
    <link rel="stylesheet" href="/css/php_out.css" type="text/css">
    <link rel="shortcut icon" href="/img/php_out_favicon.png" type="image/png">
    <script defer src="/js/php_out.js"></script>
</head>
<body>
    <?php

        ob_start();
        phpinfo();
        $phpinfo = ob_get_clean();

        $phpinfo = preg_replace('#<style.*?>.*?</style>#is', '', $phpinfo);

        echo $phpinfo;

    ?>
</body>
</html>
