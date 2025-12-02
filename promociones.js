// PRECIOS DE PRODUCTOS
const PRECIO_HELADERA = 850000;
const PRECIO_TV = 950000;
const PRECIO_AIRE = 1200000;
const PRECIO_CAFETERA = 180000;

// FUNCIÓN PARA OBTENER VALORES
function obtenerValor(id) {
  const valor = parseFloat(document.getElementById(id).value);
  return isNaN(valor) ? 0 : valor;
}

// DESCUENTO 30% EN EL SEGUNDO (NOMBRE CORREGIDO)
function desc30Segundo(precio, cantidad) {
  // Lógica: 30% del precio por cada par de productos iguales.
  return Math.floor(cantidad / 2) * (precio * 0.3); 
}

// DESCUENTO 3x2 (YA FUNCIONA POR PRODUCTOS IGUALES)
function desc3x2(precio, cantidad) {
  // Lógica: 1 producto gratis por cada 3 comprados del mismo tipo.
  return Math.floor(cantidad / 3) * precio;
}

// CALCULAR TOTAL
document.getElementById("btnCalcular").addEventListener("click", function() {
  // Obtener cantidades
  const cant1 = obtenerValor("cant1");
  const cant2 = obtenerValor("cant2");
  const cant3 = obtenerValor("cant3");
  const cant4 = obtenerValor("cant4");
  
  // Calcular subtotales
  const sub1 = PRECIO_HELADERA * cant1;
  const sub2 = PRECIO_TV * cant2;
  const sub3 = PRECIO_AIRE * cant3;
  const sub4 = PRECIO_CAFETERA * cant4;
  
  const subtotal = sub1 + sub2 + sub3 + sub4;
  
  // Obtener promoción seleccionada
  const promo = document.querySelector('input[name="promo"]:checked').value;
  
  let descuento = 0;
  
  // Condición corregida para usar "30seg"
  if (promo === "30seg") {
    descuento = desc30Segundo(PRECIO_HELADERA, cant1) + 
                desc30Segundo(PRECIO_TV, cant2) + 
                desc30Segundo(PRECIO_AIRE, cant3) + 
                desc30Segundo(PRECIO_CAFETERA, cant4);
  } 
  else if (promo === "3x2") {
    // Ya aplica por artículo (cant1, cant2, etc. son separados)
    descuento = desc3x2(PRECIO_HELADERA, cant1) + 
                desc3x2(PRECIO_TV, cant2) + 
                desc3x2(PRECIO_AIRE, cant3) + 
                desc3x2(PRECIO_CAFETERA, cant4);
  } 
  else if (promo === "10off") {
    if (subtotal >= 900000) {
      descuento = subtotal * 0.10;
    }
  }
  
  const total = Math.max(0, subtotal - descuento);
  
  // Mostrar resultados
  document.getElementById("tSin").textContent = "$" + subtotal.toLocaleString("es-AR");
  document.getElementById("tDesc").textContent = "-$" + descuento.toLocaleString("es-AR");
  document.getElementById("tFinal").textContent = "$" + total.toLocaleString("es-AR");
  
  document.getElementById("resultados").style.display = "block";
});