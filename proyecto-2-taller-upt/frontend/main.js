const messagesDiv = document.getElementById('messages');
const form = document.getElementById('msgForm');
const loadBtn = document.getElementById('loadBtn');
let offset = 0;
const limit = 5;
let loading = false;

function fetchMessages() {
    if (loading) return;
    loading = true;
    fetch(`/messages?offset=${offset}&limit=${limit}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(msg => {
                const div = document.createElement('div');
                div.className = 'message';
                div.innerHTML = `<strong>${msg.user}</strong>: ${msg.content}`;
                messagesDiv.appendChild(div);
            });
            if (data.length === limit) {
                offset += limit;
                loading = false;
            }
        });
}

// Scroll infinito
messagesDiv.addEventListener('scroll', () => {
    if (messagesDiv.scrollTop + messagesDiv.clientHeight >= messagesDiv.scrollHeight) {
        fetchMessages();
    }
});

// Envío de mensaje: solo POST, sin obtener mensajes automáticamente
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const content = document.getElementById('content').value;
    fetch('/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, content })
    })
    .then(res => {
        if (res.ok) {
            alert('Mensaje enviado. Haz clic en "Cargar mensajes" para ver los últimos.');
            form.reset();
        } else {
            alert('Error al enviar mensaje');
        }
    });
});

// Botón para cargar últimos mensajes manualmente
loadBtn.addEventListener('click', () => {
    messagesDiv.innerHTML = '';
    offset = 0;
    loading = false;
    fetchMessages();
});

// Cargar primeros mensajes al inicio
window.addEventListener('DOMContentLoaded', () => {
    // Initial fetch or wait user to click?
    // Para obligar a GET manual, comentamos inicial
    // fetchMessages();
});