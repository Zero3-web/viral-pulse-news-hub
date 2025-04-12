// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tema
    initTheme();
    
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

    // Scroll Progress Bar
    const progressBar = document.getElementById('scrollProgressBar');
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
            
            // Añadir efecto de brillar cuando se llega a ciertos puntos
            if (scrolled > 25 && scrolled < 30 || 
                scrolled > 50 && scrolled < 55 || 
                scrolled > 75 && scrolled < 80) {
                progressBar.style.boxShadow = '0 0 10px var(--accent-purple)';
                setTimeout(() => {
                    progressBar.style.boxShadow = 'none';
                }, 500);
            }
        }
    });

    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.classList.remove('dark-mode');
                document.documentElement.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.remove('light-mode');
                document.documentElement.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Inicializar el tema según la preferencia guardada
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const themeSwitch = document.getElementById('theme-switch');
        
        if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
            if (themeSwitch) themeSwitch.checked = true;
        } else {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
            if (themeSwitch) themeSwitch.checked = false;
        }
    }

    // Enhanced Card Interactions
    const articles = document.querySelectorAll('.featured-article, .highlight-card, .main-highlight');
    
    articles.forEach(article => {
        article.addEventListener('mouseenter', () => {
            // Aplicar efecto de elevación y escala suavemente
            article.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, background-color 0.4s ease';
            
            // Aplicar efecto de brillo a los botones dentro de la tarjeta
            const buttons = article.querySelectorAll('.read-more');
            buttons.forEach(btn => {
                btn.style.fontWeight = '700';
            });
            
            // Hacer que la imagen se agrande ligeramente
            const img = article.querySelector('.article-image img');
            if (img) {
                img.style.transition = 'transform 0.7s ease';
                img.style.transform = 'scale(1.1)';
            }
        });
        
        article.addEventListener('mouseleave', () => {
            // Restaurar el efecto con una transición más suave
            article.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out, background-color 0.3s ease-out';
            
            // Restaurar los botones
            const buttons = article.querySelectorAll('.read-more');
            buttons.forEach(btn => {
                btn.style.fontWeight = '600';
            });
            
            // Restaurar la imagen
            const img = article.querySelector('.article-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Función para animar elementos al entrar en el viewport
    function animateOnScroll() {
        const animateSections = document.querySelectorAll('.featured, .categories, .newsletter, .trending-highlight');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Añadir animación a los elementos hijos con retraso
                    const children = entry.target.querySelectorAll('.featured-article, .category-btn, .highlight-card, .main-highlight');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, 100 * index);
                    });
                    
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
    }

    // Llamar a la función para animar los elementos
    animateOnScroll();
    
    // Barra de búsqueda y resultados
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResultsModal = document.getElementById('searchResultsModal');
    const searchResultsList = document.getElementById('searchResultsList');
    const closeSearchResults = document.getElementById('closeSearchResults');
    
    // Datos simulados para la búsqueda
    const searchData = [
        {
            title: 'La IA que está revolucionando la forma en que trabajamos',
            category: 'Tecnología',
            description: 'Un nuevo sistema de inteligencia artificial promete automatizar tareas repetitivas y aumentar la productividad.',
            image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
        },
        {
            title: 'El reto viral que está causando furor en TikTok',
            category: 'Social',
            description: 'Millones de usuarios están participando en este desafío que combina baile y solidaridad.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
        },
        {
            title: 'Alerta: Nueva forma de hackeo afecta a millones de usuarios',
            category: 'Seguridad',
            description: 'Expertos advierten sobre una sofisticada técnica de phishing que ha comprometido datos de usuarios.',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
        },
        {
            title: 'Famoso banco eliminará cuentas desde HOY por no cumplir con este requisito',
            category: 'Actualidad',
            description: 'Importantes cambios en las políticas bancarias afectarán a miles de usuarios.',
            image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1'
        },
        {
            title: 'Jefferson Farfán hace ACUSACIÓN contra Darinka Ramírez sobre su hija',
            category: 'Espectáculos',
            description: 'El exfutbolista hizo graves declaraciones en sus redes sociales generando controversia.',
            image: 'https://images.unsplash.com/photo-1537365587684-f490dff69c56'
        },
        {
            title: 'Sicarios matan sin piedad a joven madre cerca de comisaría del Callao',
            category: 'Actualidad',
            description: 'Testigos afirman que la policía tardó más de 20 minutos en responder al llamado de emergencia.',
            image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167'
        }
    ];
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const query = searchInput.value.toLowerCase().trim();
            
            if (query.length > 2) {
                // Filtrar los resultados basados en la consulta
                const results = searchData.filter(item => 
                    item.title.toLowerCase().includes(query) || 
                    item.description.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query)
                );
                
                // Mostrar los resultados
                displaySearchResults(results, query);
            }
        });
    }
    
    function displaySearchResults(results, query) {
        if (searchResultsList && searchResultsModal) {
            // Limpiar resultados anteriores
            searchResultsList.innerHTML = '';
            
            if (results.length > 0) {
                results.forEach(result => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    
                    // Resaltar la consulta en el título
                    const titleWithHighlight = result.title.replace(
                        new RegExp(query, 'gi'),
                        match => `<span class="highlight" style="background-color: var(--accent-purple); color: white; padding: 0 3px;">${match}</span>`
                    );
                    
                    resultItem.innerHTML = `
                        <div class="search-result-image">
                            <img src="${result.image}" alt="${result.title}">
                        </div>
                        <div class="search-result-content">
                            <h4>${titleWithHighlight}</h4>
                            <p>${result.description}</p>
                            <span class="search-result-category">${result.category}</span>
                        </div>
                    `;
                    
                    // Hacer los resultados clickeables
                    resultItem.style.cursor = 'pointer';
                    resultItem.addEventListener('click', function() {
                        searchResultsModal.classList.remove('active');
                        
                        // Simulamos la navegación a la página del artículo
                        alert(`Navegando al artículo: ${result.title}`);
                    });
                    
                    searchResultsList.appendChild(resultItem);
                });
            } else {
                searchResultsList.innerHTML = `
                    <div class="no-results" style="text-align: center; padding: 30px;">
                        <i class="fas fa-search-minus" style="font-size: 3rem; color: var(--text-dimmed); margin-bottom: 15px;"></i>
                        <p style="color: var(--text);">No se encontraron resultados para "${query}".</p>
                        <p style="color: var(--text-muted); margin-top: 10px;">Intenta con otra búsqueda.</p>
                    </div>
                `;
            }
            
            // Mostrar el modal
            searchResultsModal.classList.add('active');
        }
    }
    
    // Cerrar el modal de resultados
    if (closeSearchResults) {
        closeSearchResults.addEventListener('click', function() {
            searchResultsModal.classList.remove('active');
        });
    }
    
    // Cerrar el modal al hacer clic fuera del contenido
    if (searchResultsModal) {
        searchResultsModal.addEventListener('click', function(e) {
            if (e.target === searchResultsModal) {
                searchResultsModal.classList.remove('active');
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchResultsModal && searchResultsModal.classList.contains('active')) {
            searchResultsModal.classList.remove('active');
        }
    });

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

    // Trending page category filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const articlesForFilter = document.querySelectorAll('.article-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter articles
                articlesForFilter.forEach(article => {
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
                        const dateA = a.querySelector('.date-tag')?.textContent;
                        const dateB = b.querySelector('.date-tag')?.textContent;
                        return dateA < dateB ? 1 : -1;
                    });
                } else if (sort === 'popular') {
                    // Sort by views (most views first)
                    cardsArray.sort((a, b) => {
                        const viewsA = a.querySelector('.views')?.textContent.match(/\d+\.?\d*K?/)?.[0];
                        const viewsB = b.querySelector('.views')?.textContent.match(/\d+\.?\d*K?/)?.[0];
                        
                        if (viewsA && viewsB) {
                            const numA = parseFloat(viewsA.replace('K', '')) * (viewsA.includes('K') ? 1000 : 1);
                            const numB = parseFloat(viewsB.replace('K', '')) * (viewsB.includes('K') ? 1000 : 1);
                            return numB - numA;
                        }
                        return 0;
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
                const contentElement = document.getElementById(`${tabId}-content`);
                if (contentElement) {
                    contentElement.classList.add('active');
                }
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
                    const pageHeader = document.querySelector('.page-header');
                    if (pageHeader) {
                        window.scrollTo({
                            top: pageHeader.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Mejoras a las notificaciones toast
    function showToast(type, message) {
        const toastContainer = document.getElementById('toastContainer');
        
        if (!toastContainer) {
            // Crear el contenedor de toast si no existe
            const container = document.createElement('div');
            container.className = 'toast-container';
            container.id = 'toastContainer';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Icono según tipo
        let icon = '';
        switch (type) {
            case 'success':
                icon = '<i class="fas fa-check-circle toast-icon"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-times-circle toast-icon"></i>';
                break;
            case 'info':
                icon = '<i class="fas fa-info-circle toast-icon"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle toast-icon"></i>';
                break;
        }
        
        toast.innerHTML = `
            ${icon}
            <div class="toast-message">${message}</div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
            <div class="toast-progress"></div>
        `;
        
        document.getElementById('toastContainer').appendChild(toast);
        
        // Animación de entrada
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);
        
        // Cerrar toast al hacer clic en el botón
        const closeButton = toast.querySelector('.toast-close');
        closeButton.addEventListener('click', () => {
            removeToast(toast);
        });
        
        // Auto-cerrar después de 3 segundos
        setTimeout(() => {
            removeToast(toast);
        }, 3000);
    }

    function removeToast(toast) {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        
        setTimeout(() => {
            toast.remove();
        }, 300);
    }

    // Menú lateral para móviles
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeSidebar = document.getElementById('closeSidebar');
    
    // Crear el menú lateral si no existe
    if (!mobileSidebar) {
        const sidebar = document.createElement('div');
        sidebar.className = 'mobile-sidebar';
        sidebar.id = 'mobileSidebar';
        
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <div class="sidebar-logo">Viral<span>Pulse</span></div>
                <button id="closeSidebar"><i class="fas fa-times"></i></button>
            </div>
            <nav class="sidebar-nav">
                <ul>
                    <li><a href="index.html"><i class="fas fa-home"></i> Inicio</a></li>
                    <li><a href="tendencias.html"><i class="fas fa-chart-line"></i> Tendencias</a></li>
                    <li><a href="noticias.html"><i class="fas fa-newspaper"></i> Noticias</a></li>
                    <li><a href="humor.html"><i class="fas fa-laugh-beam"></i> Comedia</a></li>
                    <li class="divider"></li>
                    <li><a href="#" class="sidebar-category"><i class="fas fa-laptop-code"></i> Tecnología</a></li>
                    <li><a href="#" class="sidebar-category"><i class="fas fa-users"></i> Social</a></li>
                    <li><a href="#" class="sidebar-category"><i class="fas fa-shield-alt"></i> Seguridad</a></li>
                    <li><a href="#" class="sidebar-category"><i class="fas fa-globe"></i> Actualidad</a></li>
                    <li><a href="#" class="sidebar-category"><i class="fas fa-film"></i> Espectáculos</a></li>
                </ul>
            </nav>
            <div class="sidebar-footer">
                <div class="theme-toggle">
                    <span>Tema:</span>
                    <input type="checkbox" id="sidebar-theme-switch" class="theme-switch">
                    <label for="sidebar-theme-switch" class="theme-label">
                        <i class="fas fa-sun"></i>
                        <i class="fas fa-moon"></i>
                        <div class="ball"></div>
                    </label>
                </div>
            </div>
        `;
        
        document.body.appendChild(sidebar);
    }
    
    // Reinicializar variables después de crear el sidebar dinámicamente
    const updatedMobileSidebar = document.getElementById('mobileSidebar');
    const updatedCloseSidebar = document.getElementById('closeSidebar');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (updatedMobileSidebar) {
                updatedMobileSidebar.classList.add('active');
                
                // Añadir overlay para cerrar el sidebar
                const overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.background = 'rgba(0, 0, 0, 0.5)';
                overlay.style.zIndex = '1999';
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.3s ease';
                document.body.appendChild(overlay);
                
                // Mostrar el overlay con transición
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
                
                // Cerrar sidebar al hacer clic en el overlay
                overlay.addEventListener('click', function() {
                    updatedMobileSidebar.classList.remove('active');
                    this.style.opacity = '0';
                    setTimeout(() => {
                        this.remove();
                    }, 300);
                });
                
                // Cerrar el menú móvil si estaba abierto
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
                const spans = menuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    if (updatedCloseSidebar) {
        updatedCloseSidebar.addEventListener('click', function() {
            updatedMobileSidebar.classList.remove('active');
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                }, 300);
            }
        });
    }
    
    // Sincronizar el tema del sidebar con el principal
    const sidebarThemeSwitch = document.getElementById('sidebar-theme-switch');
    const mainThemeSwitch = document.getElementById('theme-switch');
    
    if (sidebarThemeSwitch && mainThemeSwitch) {
        // Establecer estado inicial
        sidebarThemeSwitch.checked = mainThemeSwitch.checked;
        
        // Sincronizar cambios
        sidebarThemeSwitch.addEventListener('change', function() {
            mainThemeSwitch.checked = this.checked;
            
            if (this.checked) {
                document.documentElement.classList.remove('dark-mode');
                document.documentElement.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.remove('light-mode');
                document.documentElement.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // Hacer que los artículos sean clickeables
    const makeArticlesClickable = () => {
        const articleImages = document.querySelectorAll('.article-image');
        const readMoreLinks = document.querySelectorAll('.read-more');
        
        articleImages.forEach(image => {
            if (!image.closest('a')) { // Verificar que no esté ya dentro de un enlace
                image.style.cursor = 'pointer';
                image.addEventListener('click', function() {
                    const article = this.closest('article');
                    if (article) {
                        const readMore = article.querySelector('.read-more');
                        if (readMore && readMore.getAttribute('href')) {
                            location.href = readMore.getAttribute('href');
                        } else {
                            // Si no hay enlace, llevar a la página de artículo de ejemplo
                            location.href = 'articulo.html';
                        }
                    }
                });
            }
        });
        
        readMoreLinks.forEach(link => {
            if (link.getAttribute('href') === '#' || !link.getAttribute('href')) {
                link.setAttribute('href', 'articulo.html');
            }
        });
    };
    
    // Llamar a la función para hacer clickeables los artículos
    makeArticlesClickable();
    
    // Mostrar un toast de bienvenida
    setTimeout(() => {
        showToast('info', '¡Bienvenido a ViralPulse! Descubre las últimas noticias virales.');
    }, 1500);
    
    // Mejorar filtros de categoría con estilos
    filterBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (!btn.classList.contains('active')) {
                btn.style.transform = 'translateY(-5px)';
                btn.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (!btn.classList.contains('active')) {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    });
    
    // Optimizar carga de imágenes
    const optimizeImages = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // No aplicar a imágenes pequeñas como avatares
            if (img.closest('.comment-avatar') || img.closest('.admin-avatar') || img.closest('.article-author')) {
                return;
            }
            
            const parent = img.parentElement;
            parent.classList.add('image-loading');
            
            img.addEventListener('load', function() {
                parent.classList.remove('image-loading');
                this.style.animation = 'fadeIn 0.5s ease forwards';
            });
            
            img.addEventListener('error', function() {
                parent.classList.remove('image-loading');
                this.src = 'https://via.placeholder.com/800x450?text=Imagen+no+disponible';
            });
            
            // Añadir efecto de zoom en hover
            img.addEventListener('mouseenter', function() {
                if (!this.closest('.comment-avatar') && !this.closest('.admin-avatar') && !this.closest('.article-author')) {
                    this.style.transform = 'scale(1.05)';
                    this.style.transition = 'transform 0.5s ease';
                }
            });
            
            img.addEventListener('mouseleave', function() {
                if (!this.closest('.comment-avatar') && !this.closest('.admin-avatar') && !this.closest('.article-author')) {
                    this.style.transform = 'scale(1)';
                }
            });
        });
    };
    
    // Llamar a la función para optimizar imágenes
    optimizeImages();
    
    // Añadir transición de página
    document.body.classList.add('page-transition');
    
    // Formulario de comentarios
    const commentForm = document.querySelector('.comment-form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const textarea = this.querySelector('textarea');
            const commentText = textarea.value.trim();
            
            if (commentText) {
                // Crear un nuevo comentario
                const commentsContainer = document.querySelector('.comments-container');
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <div class="comment-avatar">
                        <img src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f" alt="Usuario actual">
                    </div>
                    <div class="comment-content">
                        <div class="comment-header">
                            <span class="comment-author">Tú</span>
                            <span class="comment-date">Justo ahora</span>
                        </div>
                        <p>${commentText}</p>
                        <div class="comment-actions">
                            <button class="comment-reply-btn">Responder</button>
                            <button class="comment-like-btn"><i class="far fa-heart"></i> <span>0</span></button>
                        </div>
                    </div>
                `;
                
                // Aplicar animación al nuevo comentario
                newComment.style.opacity = '0';
                newComment.style.transform = 'translateY(20px)';
                
                // Agregar al principio de los comentarios
                commentsContainer.insertBefore(newComment, commentsContainer.firstChild);
                
                // Mostrar con animación
                setTimeout(() => {
                    newComment.style.opacity = '1';
                    newComment.style.transform = 'translateY(0)';
                    newComment.style.transition = 'all 0.3s ease';
                }, 10);
                
                // Limpiar el textarea
                textarea.value = '';
                
                // Mostrar toast de éxito
                showToast('success', '¡Comentario publicado con éxito!');
            }
        });
    }
    
    // Añadir funcionalidad a los botones de me gusta de comentarios
    const commentLikeButtons = document.querySelectorAll('.comment-like-btn');
    
    commentLikeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const count = this.querySelector('span');
            const currentCount = parseInt(count.textContent);
            
            if (icon.classList.contains('far')) { // No le ha dado like
                icon.classList.remove('far');
                icon.classList.add('fas');
                count.textContent = currentCount + 1;
                
                // Efecto de animación al corazón
                icon.style.transform = 'scale(1.5)';
                icon.style.color = '#EF4444';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 300);
                
                showToast('success', '¡Te gusta este comentario!');
            } else { // Ya le dio like
                icon.classList.remove('fas');
                icon.classList.add('far');
                count.textContent = currentCount - 1;
                icon.style.color = '';
            }
        });
    });
    
    // Implementar barra de progreso en todas las páginas
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
            
            // Efecto de brillo al alcanzar ciertos puntos
            if (scrolled > 25 && scrolled < 30 || 
                scrolled > 50 && scrolled < 55 || 
                scrolled > 75 && scrolled < 80 || 
                scrolled > 95) {
                progressBar.style.boxShadow = '0 0 10px var(--accent-purple), 0 0 20px var(--accent-orange)';
                progressBar.style.transition = 'width 0.2s ease, box-shadow 0.3s ease';
                
                setTimeout(() => {
                    progressBar.style.boxShadow = 'none';
                }, 500);
            }
        }
    });
});
