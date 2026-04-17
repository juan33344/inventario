// app.js - JavaScript del lado del cliente para el CRUD de inventario

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();

    // Event listeners
    document.getElementById('addProductBtn').addEventListener('click', () => openModal());
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('productForm').addEventListener('submit', handleFormSubmit);

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('productModal');
        if (event.target === modal) {
            closeModal();
        }
    });
});

// Cargar productos desde la API
async function loadProducts() {
    try {
        const response = await fetch('/api/productos');
        const products = await response.json();

        const tbody = document.getElementById('productsTableBody');
        tbody.innerHTML = '';

        if (products.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty">No hay productos registrados.</td></tr>';
            return;
        }

        products.forEach(product => {
            const row = createProductRow(product);
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error cargando productos:', error);
        showAlert('Error al cargar productos', 'error');
    }
}

// Crear fila de producto
function createProductRow(product) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${product.id}</td>
        <td>${escapeHtml(product.nombre)}</td>
        <td>${escapeHtml(product.descripcion || '')}</td>
        <td>${parseFloat(product.precio).toFixed(2).replace('.', ',')}</td>
        <td>${product.cantidad}</td>
        <td>
            <button class="small-button" onclick="editProduct(${product.id})">Editar</button>
            <button class="small-button danger" onclick="deleteProduct(${product.id}, '${escapeHtml(product.nombre)}')">Eliminar</button>
        </td>
    `;

    return row;
}

// Abrir modal para crear producto
function openModal(product = null) {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');

    if (product) {
        modalTitle.textContent = 'Editar producto';
        submitBtn.textContent = 'Actualizar';
        populateForm(product);
    } else {
        modalTitle.textContent = 'Agregar producto';
        submitBtn.textContent = 'Guardar';
        form.reset();
        document.getElementById('productId').value = '';
    }

    modal.style.display = 'block';
    document.getElementById('modalAlert').innerHTML = '';
}

// Cerrar modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.getElementById('productForm').reset();
}

// Llenar formulario con datos del producto
function populateForm(product) {
    document.getElementById('productId').value = product.id;
    document.getElementById('nombre').value = product.nombre;
    document.getElementById('descripcion').value = product.descripcion || '';
    document.getElementById('precio').value = product.precio;
    document.getElementById('cantidad').value = product.cantidad;
}

// Manejar envío del formulario
async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = {
        nombre: formData.get('nombre').trim(),
        descripcion: formData.get('descripcion').trim(),
        precio: parseFloat(formData.get('precio')),
        cantidad: parseInt(formData.get('cantidad'))
    };

    const productId = formData.get('id');
    const isEdit = productId !== '';

    try {
        const url = isEdit ? `/api/productos/${productId}` : '/api/productos';
        const method = isEdit ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });

        const result = await response.json();

        if (response.ok) {
            showModalAlert(result.message || 'Producto guardado exitosamente', 'success');
            setTimeout(() => {
                closeModal();
                loadProducts();
            }, 1500);
        } else {
            showModalAlert(result.errors ? result.errors.join('<br>') : result.error, 'error');
        }
    } catch (error) {
        console.error('Error guardando producto:', error);
        showModalAlert('Error al guardar producto', 'error');
    }
}

// Editar producto
async function editProduct(id) {
    try {
        const response = await fetch(`/api/productos/${id}`);
        const product = await response.json();

        if (response.ok) {
            openModal(product);
        } else {
            showAlert(product.error, 'error');
        }
    } catch (error) {
        console.error('Error obteniendo producto:', error);
        showAlert('Error al obtener producto', 'error');
    }
}

// Eliminar producto
async function deleteProduct(id, nombre) {
    if (!confirm(`¿Eliminar el producto "${nombre}"?`)) {
        return;
    }

    try {
        const response = await fetch(`/api/productos/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (response.ok) {
            showAlert(result.message, 'success');
            loadProducts();
        } else {
            showAlert(result.error, 'error');
        }
    } catch (error) {
        console.error('Error eliminando producto:', error);
        showAlert('Error al eliminar producto', 'error');
    }
}

// Mostrar alerta en el modal
function showModalAlert(message, type) {
    const alertDiv = document.getElementById('modalAlert');
    alertDiv.innerHTML = `<div class="alert ${type}">${message}</div>`;
}

// Mostrar alerta general
function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = `<div class="alert ${type}">${message}</div>`;

    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 3000);
}

// Función para escapar HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}