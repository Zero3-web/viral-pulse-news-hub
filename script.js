
// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Transform the hamburger into an X
            this.classList.toggle('active');
            
            // Toggle the menu button appearance
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'translateY(9px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && nav.classList.contains('active') && !e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
            nav.classList.remove('active');
            if (menuBtn) {
                menuBtn.classList.remove('active');
                const spans = menuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // Add fade-in animation to sections as they come into view
    const animateSections = document.querySelectorAll('.featured, .categories, .newsletter');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
    
    // Trending page category filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter articles
                articles.forEach(article => {
                    const category = article.getAttribute('data-category');
                    
                    article.style.animation = 'none';
                    article.offsetHeight; // Trigger reflow
                    
                    if (filter === 'all' || filter === category) {
                        article.style.display = 'block';
                        article.style.animation = 'fadeIn 0.5s forwards';
                    } else {
                        article.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // News page sort buttons
    const sortBtns = document.querySelectorAll('.sort-btn');
    const newsCards = document.querySelectorAll('.news-card');
    const newsGrid = document.querySelector('.news-grid');
    
    if (sortBtns.length > 0 && newsGrid) {
        sortBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                sortBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const sort = btn.getAttribute('data-sort');
                const cardsArray = Array.from(newsCards);
                
                // Sort news cards
                if (sort === 'latest') {
                    // Sort by date (most recent first)
                    cardsArray.sort((a, b) => {
                        const dateA = a.querySelector('.date-tag').textContent;
                        const dateB = b.querySelector('.date-tag').textContent;
                        return dateA < dateB ? 1 : -1;
                    });
                } else if (sort === 'popular') {
                    // Sort by views (most views first)
                    cardsArray.sort((a, b) => {
                        const viewsA = parseInt(a.querySelector('.views').textContent.match(/\d+\.?\d*K/)[0].replace('K', ''));
                        const viewsB = parseInt(b.querySelector('.views').textContent.match(/\d+\.?\d*K/)[0].replace('K', ''));
                        return viewsB - viewsA;
                    });
                }
                
                // Clear and append sorted cards
                newsGrid.innerHTML = '';
                cardsArray.forEach(card => {
                    card.style.opacity = '0';
                    newsGrid.appendChild(card);
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                });
            });
        });
    }
    
    // Humor page tabs
    const humorTabs = document.querySelectorAll('.humor-tab');
    const humorContents = document.querySelectorAll('.humor-content');
    
    if (humorTabs.length > 0) {
        humorTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                humorTabs.forEach(t => t.classList.remove('active'));
                humorContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding content
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(`${tabId}-content`).classList.add('active');
            });
        });
    }
    
    // Load more button simulation
    const loadMoreBtn = document.getElementById('load-more-btn');
    const humorLoadMoreBtn = document.getElementById('humor-load-more');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
            
            // Simulate loading
            setTimeout(() => {
                loadMoreBtn.innerHTML = 'Cargar más <i class="fas fa-redo"></i>';
                alert('¡Más artículos cargados!');
            }, 1500);
        });
    }
    
    if (humorLoadMoreBtn) {
        humorLoadMoreBtn.addEventListener('click', () => {
            humorLoadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
            
            // Simulate loading
            setTimeout(() => {
                humorLoadMoreBtn.innerHTML = 'Cargar más <i class="fas fa-redo"></i>';
                alert('¡Más contenido cómico cargado!');
            }, 1500);
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                this.innerHTML = '<p class="success-message">¡Gracias por suscribirte! Pronto recibirás nuestras novedades.</p>';
            }
        });
    }
    
    // Pagination buttons
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    if (paginationBtns.length > 0) {
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!btn.classList.contains('active')) {
                    // Remove active class from all buttons
                    paginationBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    if (!btn.classList.contains('next')) {
                        btn.classList.add('active');
                    }
                    
                    // Simulate page change
                    window.scrollTo({
                        top: document.querySelector('.page-header').offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Add hover effect to article images
    const articleImages = document.querySelectorAll('.article-image');
    
    articleImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
    
    // Play button hover effect
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translate(-50%, -50%) scale(1.1)';
            btn.style.backgroundColor = '#8B5CF6';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(-50%, -50%)';
            btn.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        });
        
        btn.addEventListener('click', () => {
            alert('Reproduciendo video...');
        });
    });
});
