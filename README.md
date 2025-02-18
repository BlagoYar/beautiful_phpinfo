# Beautiful phpinfo()
Красивое оформление для буферизированного вывода phpinfo()

> [!TIP]
> Если добавить в     `/etc/php/[version]/fpm/pool.d/www.conf` переменную окружения
>
>    env[VALID_TOKEN_PHPINFO] = 'Здесь ваш токен, он же набор из n-го количества символов'
>
> то вы защитите страницу. При попытке доступа к ней будет ошибка 401. Чтобы попасть в неё, нужно набрать
>
>    htpps://your-domain.com/phpinfo.php?token=ВашТокен
>    
> Если защита не нужна, удалите php блок кода.


> _ПС. Полупрофессиональный любитель. Есть предложения/пожелания, пишите._

![ScrShot_1](https://github.com/user-attachments/assets/35b6f09c-8cc0-4a66-903f-72e325723cb7)


![ScrShot_2](https://github.com/user-attachments/assets/3ab8d34f-5c47-478c-8dfc-335496956e5b)


![ScrShot_3](https://github.com/user-attachments/assets/d71a592d-8459-49c1-9e4a-aa6e1ef33dc2)
