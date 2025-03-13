// Configuración del lienzo
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ajustar el tamaño del lienzo al tamaño de la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Paleta de colores para cada estado de ánimo
const moodColors = {
    happy: ['#FFD700', '#FF6B6B', '#4ECDC4'], // Colores para "Feliz"
    sad: ['#2C3E50', '#3498DB', '#8E44AD'],   // Colores para "Triste"
    calm: ['#87CEEB', '#98FB98', '#DDA0DD'],  // Colores para "Calma"
    excited: ['#FF0000', '#FF8C00', '#FFD700'] // Colores para "Emocionado"
};

// Almacenar las formas que se dibujan
let shapes = [];

// Escuchar clics en los botones de emociones
document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const mood = e.target.dataset.mood; // Obtener la emoción seleccionada
        createShape(mood); // Crear una nueva forma
        saveToHistory(mood); // Guardar en el historial
    });
});

// Función para crear una nueva forma
function createShape(mood) {
    const shape = {
        x: Math.random() * canvas.width, // Posición horizontal aleatoria
        y: canvas.height + 100,         // Comienza debajo de la pantalla
        size: 30 + Math.random() * 70,   // Tamaño entre 30 y 100
        color: moodColors[mood][Math.floor(Math.random() * 3)], // Color aleatorio
        speed: Math.random() * 3 + 2,    // Velocidad de movimiento
        rotation: 0,                     // Rotación inicial
        type: Math.random() > 0.5 ? 'circle' : 'triangle' // Tipo de forma
    };
    shapes.push(shape); // Agregar la forma al arreglo
}

// Función para animar las formas
function animate() {
    // Limpiar el lienzo con un fondo semitransparente (efecto de desvanecimiento)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar cada forma
    shapes.forEach((shape, index) => {
        shape.y -= shape.speed; // Mover la forma hacia arriba
        shape.rotation += 0.02; // Rotar la forma

        // Dibujar la forma
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.fillStyle = shape.color;

        if (shape.type === 'circle') {
            // Dibujar un círculo
            ctx.beginPath();
            ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Dibujar un triángulo
            ctx.beginPath();
            ctx.moveTo(-shape.size / 2, shape.size / 2);
            ctx.lineTo(shape.size / 2, shape.size / 2);
            ctx.lineTo(0, -shape.size / 2);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();

        // Eliminar formas que salen de la pantalla
        if (shape.y < -100) shapes.splice(index, 1);
    });

    // Repetir la animación
    requestAnimationFrame(animate);
}

// Función para guardar el estado de ánimo en el historial
function saveToHistory(mood) {
    const history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    history.push({
        mood,
        date: new Date().toISOString()
    });
    localStorage.setItem('moodHistory', JSON.stringify(history));
}

// Iniciar la animación
animate();