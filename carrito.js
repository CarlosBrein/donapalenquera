function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Verificar si el producto ya está en el carrito
    let productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad += 1; // Aumentar la cantidad
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Mostrar mensaje de confirmación
    let boton = document.querySelector(`[data-producto='${nombre}']`);
    let mensaje = document.createElement("span");
    mensaje.textContent = " ✔ Agregado al carrito";
    mensaje.style.color = "green";
    mensaje.style.fontWeight = "bold";
    mensaje.style.marginLeft = "10px";

    // Eliminar cualquier mensaje previo antes de agregar uno nuevo
    let mensajePrevio = boton.parentElement.querySelector(".confirmacion");
    if (mensajePrevio) {
        mensajePrevio.remove();
    }

    mensaje.classList.add("confirmacion");
    boton.parentElement.appendChild(mensaje);

    // Eliminar el mensaje después de 2 segundos
    setTimeout(() => {
        mensaje.remove();
    }, 2000);
	
}



function generarFactura() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let facturaHTML = `
        <div id="factura-container">
            <div id="factura">
                <h2>Factura</h2>
                <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio Unitario</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    let totalFinal = 0;

    carrito.forEach(producto => {
        let cantidad = producto.cantidad ? producto.cantidad : 1; // Evitar valores undefined
        let totalProducto = producto.precio * cantidad;
        totalFinal += totalProducto;

        facturaHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>${cantidad}</td>
                <td>$${totalProducto.toFixed(2)}</td>
            </tr>
        `;
    });

    facturaHTML += `
                    </tbody>
                </table>
                <h3>Total a pagar: $${totalFinal.toFixed(2)}</h3>
                <p id="mensaje-advertencia">
                    SOLO CON EL QR DE CONFIRMACION DE NEQUI Y ESTA FACTURA SE PUEDE RECLAMAR EL PEDIDO
                </p>
                <img src="qr-pago.jpg" alt="Código QR para pago" id="qr-pago">
                <button onclick="imprimirFactura()" id="btn-imprimir">Imprimir Factura</button>
            </div>
        </div>
    `;

    document.body.innerHTML = facturaHTML;
}

function imprimirFactura() {
    window.print();
}