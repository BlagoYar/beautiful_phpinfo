document.addEventListener("DOMContentLoaded", function() {

    document.querySelectorAll("td.e").forEach(function (cell) {
        cell.innerHTML = cell.innerHTML.replace(/_/g, "_<wbr>");
    });

    // Замена логотипа (остается без изменений)
    const linkElement = document.querySelector('a[href="http://www.php.net/"]');
    const versionHeader = document.querySelector('h1.p');

    if (linkElement && versionHeader) {
        const newLogo = document.createElement('img');
        newLogo.src = '/imgs/phplogo.svg';
        newLogo.alt = 'PHP Logo';
        newLogo.className = 'php-logo';

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

    // Кнопки для перемещения по странице (с исправлением)
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

    function showButtons() {
        if (!hasScrolled) {
            hasScrolled = true;
            return;
        }
        buttonsContainer.classList.add('visible');
        resetHideTimeout();
    }

    function resetHideTimeout() {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => buttonsContainer.classList.remove('visible'), 3000);
    }

    buttonsContainer.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
    buttonsContainer.addEventListener('mouseleave', resetHideTimeout);

    function smoothScrollTo(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 3000;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeOutQuad(t, b, c, d) {
            t /= d;
            return -c * t * (t - 2) + b;
        }

        requestAnimationFrame(animation);
    }

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

    window.addEventListener('scroll', showButtons);

    window.addEventListener('load', () => {
        buttonsContainer.classList.remove('visible');
        updateButtonWidth();
    });

    function updateButtonWidth() {
        const center = document.querySelector('.center');
        if (center) {
            const centerWidth = center.clientWidth;
            buttonsContainer.style.width = `${centerWidth}px`;
        }
    }

    window.addEventListener('resize', updateButtonWidth);
    updateButtonWidth();

    // ***  Исправленный код для позиционирования кнопок ***
    const center = document.querySelector('.center');
    if (center) {
        const buttonsContainer = document.querySelector('.buttons'); // Получаем ссылку на buttonsContainer

        let cachedRect;
        let scheduled = false;

        function updateButtonPosition() {
            cachedRect = center.getBoundingClientRect(); // Кэшируем rect

            const windowHeight = window.innerHeight;
            const newBottom = (cachedRect.bottom + 20 <= windowHeight) ? `${windowHeight - cachedRect.bottom}px` : '20px';

            buttonsContainer.style.bottom = newBottom;
            buttonsContainer.classList.toggle('at-bottom', cachedRect.bottom + 20 <= windowHeight);
        }

        function scheduleUpdate() {
            if (!scheduled) {
                scheduled = true;
                requestAnimationFrame(() => {
                    updateButtonPosition();
                    scheduled = false;
                });
            }
        }

        window.addEventListener('scroll', scheduleUpdate);
        window.addEventListener('resize', scheduleUpdate);
        window.addEventListener('load', scheduleUpdate); // Важно вызвать и при загрузке страницы

        updateButtonPosition(); // Первоначальная установка позиции
    }

});
