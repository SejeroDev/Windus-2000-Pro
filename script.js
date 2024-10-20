// Element references
const desktop = document.getElementById('desktop');
const startButton = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');
const taskbarIcons = document.getElementById('taskbar-icons');
const jumpscareAudio = document.getElementById('jumpscare-audio');

// Function to show windows
function showWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = 'block';
    addTaskbarIcon(windowId); // Add icon to taskbar when window is opened
    moveToFront(windowElement);
}

// Bring window to front
function moveToFront(windowElement) {
    const windows = document.querySelectorAll('.window');
    windows.forEach(win => {
        win.style.zIndex = '1'; // Move all windows to the back
    });
    windowElement.style.zIndex = '10'; // Bring selected window to the front
}

// Show start menu
startButton.addEventListener('click', () => {
    startMenu.classList.toggle('hidden');
});

// Close start menu when clicking outside
document.addEventListener('click', (event) => {
    if (!startMenu.contains(event.target) && event.target !== startButton) {
        startMenu.classList.add('hidden');
    }
});

// Event to open windows
document.getElementById('myComputer').addEventListener('click', () => {
    showWindow('myComputerWindow');
});
document.getElementById('recycleBin').addEventListener('click', () => {
    showWindow('recycleBinWindow');
});
document.getElementById('myDocuments').addEventListener('click', () => {
    showWindow('myDocumentsWindow');
});
document.getElementById('internetExplorer').addEventListener('click', () => {
    showWindow('internetExplorerWindow');
});
document.getElementById('isoInfo').addEventListener('click', () => {
    showWindow('isoInfoWindow');
});

// Event to close windows
document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', (e) => {
        const windowElement = e.target.closest('.window');
        windowElement.style.display = 'none';
        removeTaskbarIcon(windowElement.id); // Remove icon from taskbar when window is closed
    });
});

// Add icon to taskbar
function addTaskbarIcon(windowId) {
    let taskIcon = document.getElementById(`${windowId}Icon`);
    if (!taskIcon) {
        taskIcon = document.createElement('div');
        taskIcon.id = `${windowId}Icon`;
        taskIcon.className = 'taskbar-icon';
        taskIcon.innerText = windowId.replace('Window', '');
        taskIcon.addEventListener('click', () => {
            const windowElement = document.getElementById(windowId);
            windowElement.style.display = 'block';
            moveToFront(windowElement);
        });
        taskbarIcons.appendChild(taskIcon);
    }
}

// Remove icon from taskbar
function removeTaskbarIcon(windowId) {
    const taskIcon = document.getElementById(`${windowId}Icon`);
    if (taskIcon) {
        taskIcon.remove();
    }
}

// Event to show error and update windows
function showErrorAndUpdate() {
    // Show error after 1 minute
    setTimeout(() => {
        document.getElementById('errorWindow').style.display = 'block';
        document.querySelector('#errorWindow .close').addEventListener('click', () => {
            document.getElementById('errorWindow').style.display = 'none';
            startUpdate(); // Start update after closing error
        });
    }, 60000); // Wait 1 minute before showing the error window
}

function startUpdate() {
    const updateWindow = document.getElementById('updateWindow');
    updateWindow.style.display = 'block';
    updateWindow.style.width = '100%'; // Set full width
    updateWindow.style.height = '100%'; // Set full height
    updateWindow.style.position = 'fixed'; // Fix position
    updateWindow.style.top = '0'; // Align to top
    updateWindow.style.left = '0'; // Align to left

    let progress = 0;

    const updateInterval = setInterval(() => {
        progress += Math.random() * 10; // Increment progress randomly
        if (progress >= 99.66) {
            progress = 99.66; // Cap progress at 99.66%
            clearInterval(updateInterval);
            setTimeout(() => {
                showJumpscare(); // Show jumpscare after update
            }, 1000);
        }

        document.getElementById('progress').style.width = `${progress}%`;
        document.getElementById('update-progress').innerText = `${progress.toFixed(2)}%`;
    }, 500); // Update interval
}

// Show jumpscare
function showJumpscare() {
    // Hide update window before showing jumpscare
    const updateWindow = document.getElementById('updateWindow');
    updateWindow.style.display = 'none';

    // Enable creepy mode
    document.body.style.backgroundColor = '#000'; // Change the background to black
    const jumpscareImage = document.createElement('img');
    jumpscareImage.src = 'image.jpg'; // Cambia esto por la ruta de tu imagen
    jumpscareImage.style.position = 'fixed';
    jumpscareImage.style.top = '0';
    jumpscareImage.style.left = '0';
    jumpscareImage.style.width = '100%';
    jumpscareImage.style.height = '100%';
    jumpscareImage.style.zIndex = '100';
    document.body.appendChild(jumpscareImage);
    
    jumpscareAudio.play();
    
    setTimeout(() => {
        document.body.style.backgroundColor = '#1a1a1a'; // Revert background color
        jumpscareImage.remove(); // Remove jumpscare image
        showPayMeFile(); // Show PAY ME.exe file
    }, 2000); // Show jumpscare for 2 seconds
}

function showPayMeFile() {
    const payMeFile = document.createElement('div');
    payMeFile.className = 'icon';
    payMeFile.id = 'payMeFile';
    payMeFile.innerHTML = '<span>💰 PAY ME.exe</span>';
    payMeFile.style.position = 'absolute';
    payMeFile.style.top = '450px';
    payMeFile.style.left = '50px';
    desktop.appendChild(payMeFile);
    payMeFile.addEventListener('click', () => {
        startPuzzles(); // Call puzzle logic here
    });
}

// Function to display the puzzle window
function startPuzzles() {
    // Array de preguntas sobre Windows XP
const preguntas = [
    "What is the name of the famous mascot of Windows XP?",
    "Which feature allows users to restore their system to a previous state?",
    "What year was Windows XP released?",
    "What color scheme was used for the default Windows XP theme?",
    "What was the main browser included with Windows XP?"
];

// Función para mostrar un mensaje en la página
function mostrarMensaje(texto) {
    const mensajeDiv = document.createElement('div'); // Crea un nuevo elemento div
    mensajeDiv.textContent = texto; // Establece el texto del mensaje
    mensajeDiv.style.position = 'fixed'; // Posiciona el mensaje
    mensajeDiv.style.top = '50%'; // Centra verticalmente
    mensajeDiv.style.left = '50%'; // Centra horizontalmente
    mensajeDiv.style.transform = 'translate(-50%, -50%)'; // Ajusta el centro
    mensajeDiv.style.backgroundColor = '#fff'; // Fondo blanco
    mensajeDiv.style.border = '1px solid #ccc'; // Borde gris
    mensajeDiv.style.padding = '20px'; // Relleno
    mensajeDiv.style.borderRadius = '5px'; // Bordes redondeados
    mensajeDiv.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'; // Sombra
    document.body.appendChild(mensajeDiv); // Agrega el div al body

    // Cierra la página después de 2 segundos
    setTimeout(() => {
        window.close(); // Intenta cerrar la página
    }, 2000);
}

// Función para mostrar una pregunta aleatoria
function mostrarPregunta() {
    const preguntaAleatoria = preguntas[Math.floor(Math.random() * preguntas.length)]; // Selecciona una pregunta aleatoria
    const respuesta = prompt(preguntaAleatoria, "Type your answer here"); // Muestra un cuadro de diálogo para la respuesta

    // Muestra el mensaje basado en la respuesta
    if (respuesta !== null) {
        mostrarMensaje("I congratulate you, however, as you read, you will pay the consequences."); // Mensaje para cualquier respuesta
    } else {
        mostrarMensaje("You didn't answer. The page will close."); // Mensaje si no se responde
    }
}

// Llama a la función al cargar el script
mostrarPregunta();

}

// Show PAY ME file on F4 key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'F4') {
        showPayMeFile();
    }
});


// Start the process
setInterval(updateClock, 1000); // Actualiza el reloj cada segundo
updateClock(); // Llamada inicial para mostrar el reloj de inmediato
showErrorAndUpdate(); // Iniciar el proceso

function updateClock() {
    const date = new Date();
    const timeString = date.toLocaleTimeString();
    document.getElementById('clock').innerText = timeString; // Muestra la hora
}
