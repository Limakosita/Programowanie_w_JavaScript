document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let autoSlideInterval;

    const updateSliderPosition = () => {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators();
    };

    const updateIndicators = () => {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderPosition();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSliderPosition();
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateSliderPosition();
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 3000);
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();
});
