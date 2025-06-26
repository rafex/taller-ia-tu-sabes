const feed = document.getElementById('feed');
const form = document.getElementById('form');
let allMsgs = [], loaded = 0, batch = 5;

async function loadAll() {
  const res = await fetch('/messages');
  allMsgs = await res.json();
  showNext();
}

function showNext() {
  const slice = allMsgs.slice(loaded, loaded + batch);
  slice.forEach(m => {
    const d = document.createElement('div');
    d.className = 'msg';
    d.textContent = m.content;
    feed.appendChild(d);
  });
  loaded += slice.length;
}

window.onscroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    showNext();
  }
};

form.onsubmit = async e => {
  e.preventDefault();
  const content = document.getElementById('msg').value;
     await fetch('/messages', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ content })
  });
  document.getElementById('msg').value = '';
  feed.innerHTML = '';
  loaded = 0;
  await loadAll();
};

loadAll();