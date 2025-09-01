/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

// Frontend JavaScript for the Simple Promo Slider
document.addEventListener('DOMContentLoaded', function() {
    const sliderBlocks = document.querySelectorAll('.wp-block-simple-block-promo-slider');
    
    sliderBlocks.forEach(block => {
        const speed = parseInt(block.getAttribute('data-speed')) || 5000;
        const slidesCount = parseInt(block.getAttribute('data-slides-count')) || 0;
        
        // Solo inicializar slider si hay más de 1 slide
        if (slidesCount <= 1) return;
        
        const slides = block.querySelectorAll('.slide');
        const prevBtn = block.querySelector('.slider-prev');
        const nextBtn = block.querySelector('.slider-next');
        const sliderTrack = block.querySelector('.slider-track');
        
        let currentSlide = 0;
        let autoSlideInterval;
        
        function showSlide(index) {
            // Remover clase active de todas las slides
            slides.forEach(slide => slide.classList.remove('active'));
            
            // Agregar clase active a la slide actual
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            
            // Mover el track del slider
            const translateX = -index * 100;
            sliderTrack.style.transform = `translateX(${translateX}%)`;
            
            currentSlide = index;
        }
        
        function nextSlide() {
            const next = (currentSlide + 1) % slidesCount;
            showSlide(next);
        }
        
        function prevSlide() {
            const prev = (currentSlide - 1 + slidesCount) % slidesCount;
            showSlide(prev);
        }
        
        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(nextSlide, speed);
        }
        
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        }
        
        // Event listeners para los botones de navegación
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoSlide(); // Reiniciar auto-slide después de interacción manual
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoSlide(); // Reiniciar auto-slide después de interacción manual
            });
        }
        
        // Pausar auto-slide cuando el usuario hace hover
        block.addEventListener('mouseenter', stopAutoSlide);
        block.addEventListener('mouseleave', startAutoSlide);
        
        // Soporte para touch/swipe en móviles
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        block.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        block.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Solo procesar swipe horizontal si es mayor que vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
                startAutoSlide();
            }
        });
        
        // Inicializar el slider
        showSlide(0);
        if (slidesCount > 1) {
            startAutoSlide();
        }
    });
});