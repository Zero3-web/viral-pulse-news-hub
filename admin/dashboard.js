
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tema
    initTheme();
    
    // Sidebar Toggle para móviles
    const sidebarToggle = document.getElementById('sidebarToggle');
    const adminSidebar = document.getElementById('adminSidebar');
    
    if (sidebarToggle && adminSidebar) {
        sidebarToggle.addEventListener('click', function() {
            adminSidebar.classList.toggle('active');
            
            // Añadir efecto de animación al botón
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 300);
        });
    }
    
    // Modal de Nuevo Artículo
    const newArticleBtn = document.getElementById('newArticleBtn');
    const newArticleModal = document.getElementById('newArticleModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    if (newArticleBtn && newArticleModal) {
        newArticleBtn.addEventListener('click', function() {
            newArticleModal.classList.add('active');
        });
        
        // Cerrar modal con botones
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                newArticleModal.classList.remove('active');
            });
        });
        
        // Cerrar modal haciendo clic fuera
        newArticleModal.addEventListener('click', function(e) {
            if (e.target === newArticleModal) {
                newArticleModal.classList.remove('active');
            }
        });
        
        // Cerrar modal con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && newArticleModal.classList.contains('active')) {
                newArticleModal.classList.remove('active');
            }
        });
    }
    
    // Vista previa de imagen
    const articleImage = document.getElementById('articleImage');
    const imagePreview = document.getElementById('imagePreview');
    const uploadPlaceholder = document.querySelector('.upload-placeholder');
    
    if (articleImage && imagePreview && uploadPlaceholder) {
        articleImage.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Vista previa">`;
                    imagePreview.style.display = 'block';
                    uploadPlaceholder.style.display = 'none';
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Envío del formulario
    const newArticleForm = document.getElementById('newArticleForm');
    
    if (newArticleForm) {
        newArticleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulamos guardar el artículo
            setTimeout(() => {
                // Mostrar notificación toast
                showToast('success', 'Artículo guardado exitosamente');
                
                // Cerrar el modal
                newArticleModal.classList.remove('active');
                
                // Resetear formulario
                newArticleForm.reset();
                if (imagePreview && uploadPlaceholder) {
                    imagePreview.style.display = 'none';
                    imagePreview.innerHTML = '';
                    uploadPlaceholder.style.display = 'block';
                }
            }, 1000);
        });
    }
    
    // Inicializar gráfico de categorías
    initCategoryChart();
    
    // Botones de acción en la tabla
    const editButtons = document.querySelectorAll('.action-btn.edit');
    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const title = this.closest('.article-row').querySelector('.title').textContent;
            showToast('info', `Editando: ${title}`);
            
            // En una implementación real, abriríamos el modal de edición aquí
            if (newArticleModal) {
                newArticleModal.classList.add('active');
                if (document.getElementById('articleTitle')) {
                    document.getElementById('articleTitle').value = title;
                }
            }
        });
    });
    
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const title = this.closest('.article-row').querySelector('.title').textContent;
            
            // Confirmar eliminación
            if (confirm(`¿Estás seguro de que deseas eliminar el artículo "${title}"?`)) {
                // Simulamos eliminar la fila con animación
                const row = this.closest('.article-row');
                row.style.opacity = '0';
                row.style.height = '0';
                row.style.marginBottom = '0';
                row.style.padding = '0';
                row.style.overflow = 'hidden';
                row.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    row.remove();
                    showToast('error', `Artículo "${title}" eliminado`);
                }, 300);
            }
        });
    });
});

// Función para mostrar notificaciones toast
function showToast(type, message) {
    const toastContainer = document.getElementById('toastContainer');
    
    if (!toastContainer) return;
    
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
    
    toastContainer.appendChild(toast);
    
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

// Inicializar gráfico de categorías
function initCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    
    if (!ctx) return;
    
    // Datos de ejemplo
    const data = {
        labels: ['Tecnología', 'Social', 'Seguridad', 'Actualidad', 'Espectáculos'],
        datasets: [{
            label: 'Vistas por categoría',
            data: [5200, 3700, 2900, 4500, 3200],
            backgroundColor: [
                '#8B5CF6',
                '#6366F1',
                '#F97316',
                '#10B981',
                '#F59E0B'
            ],
            borderWidth: 0,
            borderRadius: 5
        }]
    };
    
    // Configuración
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(200, 200, 200, 0.1)'
                    },
                    ticks: {
                        font: {
                            family: "'Montserrat', sans-serif"
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Montserrat', sans-serif"
                        }
                    }
                }
            }
        }
    };
    
    // Crear el gráfico
    new Chart(ctx, config);
}
