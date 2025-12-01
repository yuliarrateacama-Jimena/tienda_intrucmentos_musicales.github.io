   class Producto {
            constructor(id, nombre, precio, categoria) {
                this.id = id;
                this.nombre = nombre;
                this.precio = precio;
                this.categoria = categoria;
            }
        }

        let productos = [];
        let nextId = 1;

        function insertarProducto(nombre, precio, categoria) {
            productos.push(new Producto(nextId++, nombre, precio, categoria));
            mostrarProductos();
        }

        function buscarProducto(id) {
            return productos.find(p => p.id === id);
        }

        function buscarProductos(termino) {
            termino = termino.toLowerCase();
            return productos.filter(p =>
                p.nombre.toLowerCase().includes(termino) ||
                p.categoria.toLowerCase().includes(termino)
            );
        }

        function editarProducto(id, nombre, precio, categoria) {
            const p = buscarProducto(id);
            if (p) {
                p.nombre = nombre;
                p.precio = precio;
                p.categoria = categoria;
                mostrarProductos();
            }
        }

        function eliminarProducto(id) {
            productos = productos.filter(p => p.id !== id);
            mostrarProductos();
        }

        function mostrarProductos(filtro = []) {
            const tbody = document.querySelector('#productosTabla tbody');
            tbody.innerHTML = '';
            const lista = filtro.length > 0 ? filtro : productos;

            lista.forEach(p => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${p.id}</td>
                    <td>${p.nombre}</td>
                    <td>S/ ${parseFloat(p.precio).toFixed(2)}</td>
                    <td>${p.categoria}</td>
                    <td>
                        <button onclick="cargarEdicion(${p.id})">Editar</button>
                        <button onclick="eliminarProducto(${p.id})">Eliminar</button>
                    </td>`;
                tbody.appendChild(tr);
            });
        }

        function cargarEdicion(id) {
            const p = buscarProducto(id);
            if (p) {
                document.getElementById('id').value = p.id;
                document.getElementById('nombre').value = p.nombre;
                document.getElementById('precio').value = p.precio;
                document.getElementById('categoria').value = p.categoria;
                document.getElementById('cancelarEdicion').classList.remove('hidden');
            }
        }

        document.getElementById('cancelarEdicion').addEventListener('click', () => {
            document.getElementById('productoForm').reset();
            document.getElementById('id').value = '';
            document.getElementById('cancelarEdicion').classList.add('hidden');
        });

        document.getElementById('productoForm').addEventListener('submit', e => {
            e.preventDefault();
            const id = parseInt(document.getElementById('id').value);
            const nombre = document.getElementById('nombre').value.trim();
            const precio = parseFloat(document.getElementById('precio').value);
            const categoria = document.getElementById('categoria').value.trim();

            if (id)
                editarProducto(id, nombre, precio, categoria);
            else
                insertarProducto(nombre, precio, categoria);

            document.getElementById('productoForm').reset();
            document.getElementById('id').value = '';
            document.getElementById('cancelarEdicion').classList.add('hidden');
        });

        document.getElementById('buscador').addEventListener('input', e => {
            mostrarProductos(buscarProductos(e.target.value));
        });

        document.getElementById('ordenar').addEventListener('click', () => {
            const asc = document.getElementById('ordenar').textContent.includes("Ascendente");
            productos.sort((a, b) => asc ? a.precio - b.precio : b.precio - a.precio);

            mostrarProductos();
            document.getElementById('ordenar').textContent =
                asc ? "Ordenar por Precio (Descendente)" : "Ordenar por Precio (Ascendente)";
        });

        ///cerrar sesion
    document.getElementById('logoutAdminBtn').addEventListener('click', () => {
    localStorage.removeItem("session");
    window.location.href = "index.html?logout=1"; 
});

/////politica
  document.addEventListener("DOMContentLoaded", () => {
            const modal = document.getElementById("modalAviso");
            const cerrar = document.getElementById("cerrarModal");

            // Mostrar modal al cargar
            setTimeout(() => {
                modal.classList.add('show');
            }, 500);

            // Cerrar modal
            cerrar.addEventListener("click", () => {
                modal.classList.remove('show');
            });
        });