// PRECIOS DE PRODUCTOS (const: el precio no cambia)
const PRECIO_HELADERA = 850000;
const PRECIO_TV = 950000;
const PRECIO_AIRE = 1200000;
const PRECIO_CAFETERA = 180000;

// FUNCIÓN PARA OBTENER VALORES
function obtenerValor(id) {
  const valor = parseFloat(document.getElementById(id).value);
  // Usa const internamente: el valor solo se asigna aquí
  return isNaN(valor) ? 0 : valor;
}

// CORRECCIÓN: FUNCIÓN PARA EL 30% EN EL SEGUNDO
function desc30Segundo(precio, cantidad) {
  // Descuenta el 30% del precio por cada par de productos iguales.
  return Math.floor(cantidad / 2) * (precio * 0.3);
}

// FUNCIÓN PARA EL 3x2 (Correcta para artículos iguales)
function desc3x2(precio, cantidad) {
  // Descuenta el precio de 1 por cada 3 artículos iguales.
  return Math.floor(cantidad / 3) * precio;
}

// LÓGICA PRINCIPAL: CALCULAR TOTAL
document.getElementById("btnCalcular").addEventListener("click", function() {
  
  // 1. OBTENER CANTIDADES (Usamos const porque se leen una sola vez)
  const cant1 = obtenerValor("cant1");
  const cant2 = obtenerValor("cant2");
  const cant3 = obtenerValor("cant3");
  const cant4 = obtenerValor("cant4");
  
  // 2. CALCULAR SUBTOTALES
  const sub1 = PRECIO_HELADERA * cant1;
  const sub2 = PRECIO_TV * cant2;
  const sub3 = PRECIO_AIRE * cant3;
  const sub4 = PRECIO_CAFETERA * cant4;
  
  const subtotal = sub1 + sub2 + sub3 + sub4;
  
  // 3. OBTENER PROMOCIÓN
  const promo = document.querySelector('input[name="promo"]:checked').value;
  
  // Usamos let: esta variable se inicializa en 0 y luego cambia de valor
  let descuento = 0; 
  
  // 4. APLICAR DESCUENTO (Usando IF / ELSE IF)
  if (promo === "30seg") {
    descuento = desc30Segundo(PRECIO_HELADERA, cant1) + 
                desc30Segundo(PRECIO_TV, cant2) + 
                desc30Segundo(PRECIO_AIRE, cant3) + 
                desc30Segundo(PRECIO_CAFETERA, cant4);
  } 
  else if (promo === "3x2") {
    // La lógica de 3x2 funciona para artículos iguales porque se calcula por separado.
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
  
  // 5. CALCULAR TOTAL FINAL
  // Usamos let: esta variable se calcula después de los descuentos
  let total = Math.max(0, subtotal - descuento);
  
  // 6. MOSTRAR RESULTADOS
  document.getElementById("tSin").textContent = "$" + subtotal.toLocaleString("es-AR");
  document.getElementById("tDesc").textContent = "-$" + descuento.toLocaleString("es-AR");
  document.getElementById("tFinal").textContent = "$" + total.toLocaleString("es-AR");
  
  document.getElementById("resultados").style.display = "block";
});