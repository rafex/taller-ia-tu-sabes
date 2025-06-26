const messagesDiv = document.getElementById('messages');
const form = document.getElementById('msgForm');
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

messagesDiv.addEventListener('scroll', () => {
    if (messagesDiv.scrollTop + messagesDiv.clientHeight >= messagesDiv.scrollHeight) {
        fetchMessages();
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const content = document.getElementById('content').value;
    fetch('/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, content })
    }).then(() => {
        messagesDiv.innerHTML = '';
        offset = 0;
        fetchMessages();
    });
});

// Cargar primeros mensajes
document.addEventListener('DOMContentLoaded', fetchMessages);