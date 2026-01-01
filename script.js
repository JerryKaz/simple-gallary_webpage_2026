document.addEventListener('DOMContentLoaded', () => {
    
    // --- CAROUSEL LOGIC ---
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (track && prevBtn && nextBtn) {
        // Calculate scroll amount (width of one slide + gap)
        const getScrollAmount = () => {
            const slide = track.querySelector('.slide');
            return slide ? slide.offsetWidth + 16 : 0;
        };

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
        
        // Optional: Hide buttons if at start/end (Performance optimization)
        track.addEventListener('scroll', () => {
            const maxScrollLeft = track.scrollWidth - track.clientWidth;
            prevBtn.style.opacity = track.scrollLeft <= 10 ? '0.3' : '1';
            prevBtn.style.pointerEvents = track.scrollLeft <= 10 ? 'none' : 'auto';
            
            nextBtn.style.opacity = track.scrollLeft >= maxScrollLeft - 10 ? '0.3' : '1';
            nextBtn.style.pointerEvents = track.scrollLeft >= maxScrollLeft - 10 ? 'none' : 'auto';
        }, { passive: true });
    }

    // --- EXPANDABLE CARDS LOGIC ---
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // Handle Click
        card.addEventListener('click', (e) => {
            // Prevent triggering if clicking a button/link inside the card
            if (e.target.closest('button') || e.target.closest('a')) return;
            toggleCard(card);
        });

        // Handle Keyboard (Enter or Space)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent page scroll on space
                toggleCard(card);
            }
        });
    });

    function toggleCard(activeCard) {
        const isExpanded = activeCard.classList.contains('expanded');

        // Optional: Close other cards when one opens (Accordion style)
        // Remove this block if you want multiple cards open at once
        cards.forEach(c => {
            if (c !== activeCard && c.classList.contains('expanded')) {
                c.classList.remove('expanded');
                c.setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle current card
        if (isExpanded) {
            activeCard.classList.remove('expanded');
            activeCard.setAttribute('aria-expanded', 'false');
        } else {
            activeCard.classList.add('expanded');
            activeCard.setAttribute('aria-expanded', 'true');
        }
    }
});