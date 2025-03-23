document.addEventListener("DOMContentLoaded", function() {
    const scrollButtons = document.getElementById("scroll-buttons");

    // Функция показа кнопок
    function showScrollButtons() {
        scrollButtons.classList.add("visible");

        clearTimeout(scrollButtons.timeout);
        scrollButtons.timeout = setTimeout(forceHideButtons, 2000);
    }

    // Функция полного скрытия кнопок
    function forceHideButtons() {
        scrollButtons.classList.remove("visible");
        document.activeElement.blur(); // Насильно убираем "активность"
    }

    // Отслеживание остановки прокрутки
    let isScrolling;
    function checkScrollStop() {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(forceHideButtons, 1500);
    }

    // Обработчики событий
    window.addEventListener("scroll", showScrollButtons);
    window.addEventListener("scroll", checkScrollStop);
    window.addEventListener("wheel", checkScrollStop);
    window.addEventListener("touchstart", showScrollButtons);
    window.addEventListener("touchmove", showScrollButtons);
    window.addEventListener("touchend", () => {
        checkScrollStop();
        setTimeout(() => document.activeElement.blur(), 100); // Чистим фокус для сброса :hover
    });

    // Дополнительная защита от зависания кнопок
    scrollButtons.addEventListener("mouseenter", () => clearTimeout(scrollButtons.timeout));
    scrollButtons.addEventListener("mouseleave", () => {
        scrollButtons.timeout = setTimeout(forceHideButtons, 2000);
    });

    // Плавный скролл
    function smoothScroll(targetPosition, button, duration = 800) {
        let startPosition = window.scrollY;
        let distance = targetPosition - startPosition;
        let startTime = performance.now();

        button.classList.add("active");

        function animationStep(currentTime) {
            let elapsedTime = currentTime - startTime;
            let progress = Math.min(elapsedTime / duration, 1);
            let easeInOut = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            window.scrollTo(0, startPosition + distance * easeInOut);

            if (elapsedTime < duration) {
                requestAnimationFrame(animationStep);
            } else {
                button.classList.remove("active");
                checkScrollStop(); // Проверяем остановку после скролла
            }
        }

        requestAnimationFrame(animationStep);
    }

    // Кнопки прокрутки
    document.getElementById("scroll-top").addEventListener("click", function () {
        smoothScroll(0, this);
    });
    document.getElementById("scroll-center").addEventListener("click", function () {
        let mainDiv = document.querySelector("div[style*='margin-bottom']") || document.querySelector("div:last-of-type");
        if (mainDiv) {
            let middle = mainDiv.offsetTop + mainDiv.offsetHeight / 2 - window.innerHeight / 2;
            smoothScroll(middle, this);
        }
    });
    document.getElementById("scroll-bottom").addEventListener("click", function () {
        smoothScroll(document.body.scrollHeight, this);
    });

    // Убираем hover во время прокрутки
    let isScrollingHover;
    window.addEventListener("scroll", () => {
        document.body.classList.add("no-hover");

        clearTimeout(isScrollingHover);
        isScrollingHover = setTimeout(() => {
            document.body.classList.remove("no-hover");
        }, 200);
    });
});