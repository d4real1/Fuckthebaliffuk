// ---- Chat Widget ----
const widget = document.getElementById('chatWidget');
const win    = document.getElementById('chatWindow');
const log    = document.getElementById('chatLog');
const input  = document.getElementById('chatInput');
const close  = document.getElementById('closeBtn');

function toggle(open){
  win.style.display = open ? 'flex' : 'none';
  if(open) input.focus();
}
widget.addEventListener('click', () => toggle(true));
widget.addEventListener('keydown', (e) => {if (e.key === 'Enter') toggle(true);});
close.addEventListener('click',  () => toggle(false));

input.addEventListener('keydown', async (e) => {
  if (e.key !== 'Enter') return;
  const q = input.value.trim();
  if (!q) return;
  appendLog('user', q);
  input.value = '';
  try {
    const res = await fetch('/api/chat', {
      method : 'POST',
      headers: {'Content-Type':'application/json'},
      body   : JSON.stringify({message: q})
    });
    const data = await res.json();
    appendLog('bot', data.reply || 'Sorry, please try again.');
  } catch (err) {
    appendLog('bot', 'Network error – please refresh.');
  }
});

function appendLog(sender, txt){
  const p = document.createElement('p');
  p.innerHTML = `<strong>${sender}:</strong> ${txt}`;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}
