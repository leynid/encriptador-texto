// Inicializar las variables globales para controlar las alertas
window.normalizeAlertShown = false;
window.clipboardAlertShown = false;

// Función para normalizar el texto (cambiar mayúsculas a minúsculas y eliminar acentos)
function normalizeText(text) {
    const originalText = text;
    let normalizedText = text
        .toLowerCase() // Convierte a minúsculas
        .normalize('NFD') // Descompone caracteres compuestos como á en a + ́
        .replace(/[\u0300-\u036f]/g, ''); // Elimina marcas diacríticas

    if (originalText !== normalizedText && !window.normalizeAlertShown) {
        alert("Las mayúsculas fueron reemplazadas por minúsculas y se eliminaron los acentos para poder cumplir con la correcta funcionalidad del programa.");
        window.normalizeAlertShown = true; // Asegúrate de que la alerta se muestra solo una vez
    }

    return normalizedText;
}

// Función para encriptar el texto
function encryptText() {
    let textInput = document.getElementById('textInput').value;
    if (textInput === '') {
        showResult('¡Ningún mensaje fue encontrado! Ingresa el texto que deseas encriptar o desencriptar.');
        return;
    }

    textInput = normalizeText(textInput); // Normaliza el texto y muestra la alerta si es necesario

    const encryptedText = textInput
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');

    showResult(encryptedText);
}

// Función para desencriptar el texto
function decryptText() {
    let textInput = document.getElementById('textInput').value;
    if (textInput === '') {
        showResult('¡Ningún mensaje fue encontrado! Ingresa el texto que deseas encriptar o desencriptar.');
        return;
    }

    textInput = normalizeText(textInput); // Normaliza el texto y muestra la alerta si es necesario

    const decryptedText = textInput
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');

    showResult(decryptedText);
}

// Función para mostrar el resultado y controlar la visibilidad
function showResult(text) {
    const resultText = document.getElementById('resultText');
    const lockImage = document.getElementById('lockImage');
    const resultParagraph = document.getElementById('resultParagraph');
    const copyButton = document.querySelector('.result-section button:nth-of-type(1)');
    const resetButton = document.getElementById('resetButton');

    if (text.trim() === '') {
        resultText.textContent = '¡Ningún mensaje fue encontrado! Ingresa el texto que deseas encriptar o desencriptar.';
        resultText.classList.add('hidden');
        lockImage.classList.remove('hidden');
        resultParagraph.classList.remove('hidden');
        copyButton.classList.add('hidden');
        resetButton.classList.add('hidden');
    } else {
        resultText.textContent = text;
        resultText.classList.remove('hidden');
        lockImage.classList.add('hidden');
        resultParagraph.classList.add('hidden');
        copyButton.classList.remove('hidden');
        resetButton.classList.remove('hidden');
    }
}

// Función para copiar el texto al portapapeles
function copyToClipboard() {
    const resultText = document.getElementById('resultText').textContent;

    if (resultText === '' || resultText === '¡Ningún mensaje fue encontrado! Ingresa el texto que deseas encriptar o desencriptar.') {
        alert('No hay texto para copiar.');
        return;
    }

    navigator.clipboard.writeText(resultText)
        .then(() => {
            if (!window.clipboardAlertShown) {
                alert('Texto copiado al portapapeles.');
                window.clipboardAlertShown = true; // Asegúrate de que la alerta se muestra solo una vez
            }
        })
        .catch(err => {
            console.error('Error al copiar al portapapeles:', err);
        });
}

// Función para reiniciar la aplicación
function resetApp() {
    // Limpiar el área de texto
    document.getElementById('textInput').value = '';

    // Limpiar el área de resultados
    document.getElementById('resultText').textContent = '¡Ningún mensaje fue encontrado! Ingresa el texto que deseas encriptar o desencriptar.';
    document.getElementById('resultText').classList.add('hidden');
    document.getElementById('lockImage').classList.remove('hidden');
    document.getElementById('resultParagraph').classList.remove('hidden');

    // Ocultar el botón de copiar y reiniciar
    document.querySelector('.result-section button:nth-of-type(1)').classList.add('hidden');
    document.getElementById('resetButton').classList.add('hidden');
    
    // Resetear las alertas
    window.normalizeAlertShown = false;
    window.clipboardAlertShown = false;
}

// Asignar eventos a los botones
document.querySelector('.input-section button:nth-of-type(1)').addEventListener('click', encryptText);
document.querySelector('.input-section button:nth-of-type(2)').addEventListener('click', decryptText);
document.querySelector('.result-section button:nth-of-type(1)').addEventListener('click', copyToClipboard);
document.getElementById('resetButton').addEventListener('click', resetApp);
