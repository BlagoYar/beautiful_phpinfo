document.addEventListener("DOMContentLoaded", function() {

    document.querySelectorAll("td.e").forEach(function (cell) {
        cell.innerHTML = cell.innerHTML.replace(/_/g, "_<wbr>");
    });

    // ---------------------------------
    // Замена логотипа
    const linkElement = document.querySelector('a[href="http://www.php.net/"]');
    const versionHeader = document.querySelector('h1.p');

    // Если ссылка и заголовок <h1> найден
    if (linkElement && versionHeader) {
        // Создаем новый элемент <img>
        const newLogo = document.createElement('img');
        newLogo.src = '/res/imgs/phplogo.svg';
        newLogo.alt = 'PHP Logo';
        newLogo.className = 'php-logo';

        // Вставляем новый элемент <img> внутрь ссылки <a>
        linkElement.appendChild(newLogo);

        const clonedHeader = versionHeader.cloneNode(true);
        linkElement.insertAdjacentElement('afterend', clonedHeader);

        versionHeader.remove();

        if (!linkElement.nextElementSibling || !linkElement.nextElementSibling.classList.contains('logo-text')) {
            const textLink = document.createElement('a');
            textLink.href = 'https://github.com/BlagoYar/beautiful_phpinfo';
            textLink.textContent = 'Designed by BlagoYar';
            textLink.className = 'logo-text';
            textLink.target = '_blank';
            textLink.rel = 'noopener noreferrer';

            clonedHeader.insertAdjacentElement('afterend', textLink);
        }
    }
    // ---------------------------------
    // Кнопки для перемещения по странице
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons';

    buttonsContainer.innerHTML = `
        <button id="btnTop">Вверх</button>
        <button id="btnCenter">Центр</button>
        <button id="btnBottom">Вниз</button>
    `;

    document.body.appendChild(buttonsContainer);

    let hideTimeout;
    let hasScrolled = false;

    // Функция показа кнопок (только после первого скролла)
    function showButtons() {
        if (!hasScrolled) {
            hasScrolled = true;
            return;
        }
        buttonsContainer.classList.add('visible');
        resetHideTimeout();
    }

    // Функция скрытия кнопок через 3 секунды
    function resetHideTimeout() {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => buttonsContainer.classList.remove('visible'), 3000);
    }

    // Останавливаем исчезновение при наведении
    buttonsContainer.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
    buttonsContainer.addEventListener('mouseleave', resetHideTimeout);

    // Функция плавной прокрутки
    function smoothScrollTo(targetY, duration = 1000) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        let startTime = null;

        function animationStep(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easing = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            window.scrollTo(0, startY + distance * easing);

            if (elapsedTime < duration) {
                requestAnimationFrame(animationStep);
            }
        }

        requestAnimationFrame(animationStep);
    }

    // Обработчики кнопок
    document.getElementById('btnTop').addEventListener('click', () => {
        showButtons();
        smoothScrollTo(0);
    });

    document.getElementById('btnCenter').addEventListener('click', () => {
        const center = document.querySelector('.center');
        if (center) {
            showButtons();
            const offset = center.offsetTop + center.clientHeight / 2 - window.innerHeight / 2;
            smoothScrollTo(offset);
        }
    });

    document.getElementById('btnBottom').addEventListener('click', () => {
        showButtons();
        smoothScrollTo(document.body.scrollHeight);
    });

    // Показываем кнопки при прокрутке
    window.addEventListener('scroll', showButtons);

    // Скрываем кнопки при загрузке
    window.addEventListener('load', () => {
        buttonsContainer.classList.remove('visible');
        updateButtonWidth(); // Устанавливаем ширину сразу
    });

    // Функция установки ширины кнопок по `.center`
    function updateButtonWidth() {
        const center = document.querySelector('.center');
        if (center) {
            const centerWidth = center.clientWidth;
            buttonsContainer.style.width = `${centerWidth}px`;
        }
    }

    // Обновляем ширину при изменении окна
    window.addEventListener('resize', updateButtonWidth);
    updateButtonWidth();

    // Фиксированное положение кнопок при прокрутке
    const center = document.querySelector('.center');

    if (center) {
        function updateButtonPosition() {
            const rect = center.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.bottom + 20 <= windowHeight) {
                buttonsContainer.style.bottom = `${windowHeight - rect.bottom}px`;
            } else {
                buttonsContainer.style.bottom = '20px';
            }
        }

        window.addEventListener('scroll', updateButtonPosition);
        updateButtonPosition();
        function updateButtonPosition() {
        const rect = center.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.bottom + 20 <= windowHeight) {
            buttonsContainer.style.bottom = `${windowHeight - rect.bottom}px`;
            buttonsContainer.classList.add('at-bottom');
            } else {
                buttonsContainer.style.bottom = '20px';
                buttonsContainer.classList.remove('at-bottom');
            }
        }

    }
});
