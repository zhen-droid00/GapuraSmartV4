'use strict';
try {
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const inputStatus = document.getElementById('input-status');
const allTopics = [...checklistDatabase, ...sopDatabase];
const storage = {
  read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { inputStatus.textContent = 'Penyimpanan tidak tersedia. Progres hanya bertahan selama halaman ini terbuka.'; return false; } }
};
const savedSessions = storage.read('gapura-checklists-v1', {});
const sessions = savedSessions && typeof savedSessions === 'object' && !Array.isArray(savedSessions) ? savedSessions : {};
const checklistCards = new Map();
let activeSession = storage.read('gapura-active-session', '');
if (typeof activeSession !== 'string') activeSession = '';
function node(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}
function announce(text) { document.getElementById('announcement').textContent = text; }
function scrollToLatest() { chatBox.scrollTop = chatBox.scrollHeight; }
function addMessage(content, sender = 'ai') {
  const wrapper = node('div', `message-wrapper wrapper-${sender}`);
  const bubble = node('div', `message ${sender === 'user' ? 'user-msg' : 'ai-msg'}`);
  // User input is always text. Rich content is created separately from bundled data.
  if (typeof content === 'string') bubble.textContent = content;
  else bubble.append(content);
  wrapper.append(bubble);
  chatBox.append(wrapper);
  scrollToLatest();
  if (sender === 'ai') announce(bubble.textContent);
  return wrapper;
}
function topicButtons(topics) {
  const grid = node('div', 'topic-grid');
  topics.forEach(topic => {
    const button = node('button', 'topic-button', topic.title);
    button.type = 'button';
    button.addEventListener('click', () => quickReply(topic.trigger, topic.title));
    grid.append(button);
  });
  return grid;
}
function normalize(text) {
  return text.toLocaleLowerCase('id-ID').normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, ' ').trim().replace(/\s+/g, ' ');
}
function findTopics(text) {
  const query = normalize(text);
  if (!query) return [];
  const exact = allTopics.filter(topic => [topic.trigger, ...(topic.keywords || [])].some(word => normalize(word) === query));
  if (exact.length) return exact;
  return allTopics.filter(topic => [topic.trigger, ...(topic.keywords || [])].some(word => (` ${query} `).includes(` ${normalize(word)} `)));
}
function sourceNote(topic) {
  const box = node('div', 'source-note');
  box.append(node('strong', '', 'Status sumber: belum diverifikasi'));
  box.append(node('p', '', 'Revisi, tanggal berlaku, dan cakupan maskapai/stasiun belum dicantumkan. Cocokkan dengan dokumen resmi sebelum digunakan.'));
  if (topic.trigger === 'delay') box.append(node('p', '', 'Referensi tertulis pada ringkasan: PM 89/2015. Dokumen sumber belum dilampirkan.'));
  return box;
}
function localDate() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
function renderChecklist(topic) {
  if (checklistCards.has(topic.trigger)) {
    const card = checklistCards.get(topic.trigger);
    chatBox.append(card);
    scrollToLatest();
    announce(`${topic.title} ditampilkan kembali. Progres sebelumnya tetap tersimpan.`);
    return;
  }
  const content = node('div');
  content.append(node('h3', '', topic.title), sourceNote(topic));
  const controls = node('div', 'session-controls');
  const sessionLabel = node('label', '', 'Sesi tersimpan');
  const select = node('select');
  select.setAttribute('aria-label', 'Pilih sesi checklist');
  sessionLabel.append(select);
  const newLabel = node('label', '', 'Sesi baru — tanggal, penerbangan, atau shift');
  const sessionInput = node('input');
  sessionInput.maxLength = 100;
  sessionInput.placeholder = `${localDate()} · GA123 / Shift pagi`;
  newLabel.append(sessionInput);
  const create = node('button', 'small-button', 'Buat / buka sesi');
  controls.append(sessionLabel, newLabel, create);
  const progress = node('p', 'progress');
  const list = node('div');
  const template = document.createElement('template');
  template.innerHTML = topic.answer; // Only bundled, reviewed application content.
  const items = [...template.content.querySelectorAll('label')].map(label => label.textContent.trim());
  let current = activeSession || `${localDate()} · Sesi umum`;
  const keyFor = name => `session:${name}`;
  function state() {
    const key = keyFor(current);
    if (!sessions[key] || typeof sessions[key] !== 'object' || Array.isArray(sessions[key])) sessions[key] = {};
    if (!Array.isArray(sessions[key][topic.trigger])) sessions[key][topic.trigger] = [];
    return sessions[key][topic.trigger];
  }
  function save() {
    storage.write('gapura-checklists-v1', sessions);
    storage.write('gapura-active-session', current);
    activeSession = current;
  }
  function updateProgress() {
    progress.textContent = `${items.filter((_, i) => state()[i] === true).length} dari ${items.length} selesai · ${current}`;
  }
  function populateSessions() {
    const names = [...new Set([current, ...Object.keys(sessions).filter(k => k.startsWith('session:')).map(k => k.slice(8))])];
    select.replaceChildren(...names.map(name => { const option = node('option', '', name); option.value = name; return option; }));
    select.value = current;
  }
  function draw() {
    const checks = state();
    list.replaceChildren(...items.map((text, i) => {
      const label = node('label', 'checklist-item');
      const input = node('input');
      input.type = 'checkbox';
      input.checked = checks[i] === true;
      input.addEventListener('change', () => { state()[i] = input.checked; save(); updateProgress(); announce(progress.textContent); });
      label.append(input, node('span', '', text));
      return label;
    }));
    populateSessions();
    updateProgress();
  }
  select.addEventListener('focus', populateSessions);
  select.addEventListener('change', () => { current = select.value; save(); draw(); });
  create.addEventListener('click', () => {
    const name = sessionInput.value.trim().replace(/\s+/g, ' ');
    if (!name) { sessionInput.setCustomValidity('Isi nama penerbangan atau shift terlebih dahulu.'); sessionInput.reportValidity(); return; }
    current = name;
    state(); save(); draw(); sessionInput.value = '';
    announce(`Sesi ${name} dibuka.`);
  });
  sessionInput.addEventListener('input', () => sessionInput.setCustomValidity(''));
  const reset = node('button', 'small-button', 'Reset checklist sesi ini');
  reset.addEventListener('click', () => {
    if (!window.confirm(`Hapus centang ${topic.title} untuk sesi “${current}”?`)) return;
    sessions[keyFor(current)][topic.trigger] = []; save(); draw(); announce('Checklist sesi ini direset.');
  });
  draw();
  content.append(controls, progress, list, node('p', 'progress', 'Progres disimpan di perangkat ini. Sesi yang dipilih berlaku untuk checklist ini.'), reset);
  checklistCards.set(topic.trigger, addMessage(content));
}
function renderTopic(topic) {
  if (checklistDatabase.includes(topic)) return renderChecklist(topic);
  const content = node('div');
  content.append(node('h3', '', topic.title), sourceNote(topic));
  const answer = node('div');
  answer.innerHTML = topic.answer; // Static SOP HTML, never query text or storage data.
  content.append(answer);
  addMessage(content);
}
function processBotResponse(text) {
  const normalized = normalize(text);
  if (['menu', 'semua topik', 'checklist', 'ceklist'].includes(normalized)) {
    const content = node('div');
    const isChecklist = ['checklist', 'ceklist'].includes(normalized);
    content.append(node('h3', '', isChecklist ? 'Pilih area checklist' : 'Semua topik'), topicButtons(isChecklist ? checklistDatabase : allTopics));
    addMessage(content); return;
  }
  if (['circular', 'surat edaran', 'edaran'].some(word => ` ${normalized} `.includes(` ${word} `))) {
    const content = node('div');
    content.append(node('h3', '', 'Surat edaran'), node('p', '', 'Periksa tanggal berlaku dan revisi di dokumen sumber. Status aktif belum diverifikasi.'));
    circularDatabase.forEach(circular => {
      const card = node('article', 'circular-card');
      card.append(node('strong', '', circular.title), node('p', '', circular.date), node('p', '', circular.desc));
      try {
        const url = new URL(circular.link);
        if (url.protocol === 'https:') {
          const link = node('a', '', 'Buka dokumen sumber ↗');
          link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer'; card.append(link);
        }
      } catch { card.append(node('p', '', 'Tautan dokumen belum tersedia.')); }
      content.append(card);
    });
    if (!circularDatabase.length) content.append(node('p', '', 'Belum ada surat edaran tersedia.'));
    if (!navigator.onLine) content.append(node('p', 'source-note', 'Dokumen eksternal membutuhkan koneksi internet.'));
    addMessage(content); return;
  }
  const found = findTopics(text);
  if (found.length === 1) return renderTopic(found[0]);
  const content = node('div');
  content.append(node('h3', '', found.length ? 'Ada beberapa topik yang sesuai' : 'Topik belum ditemukan'), node('p', '', found.length ? 'Pilih panduan yang ingin dibuka.' : 'Coba “aturan powerbank”, “bagaimana jika delay”, atau pilih topik berikut.'), topicButtons(found.length ? found : allTopics));
  addMessage(content);
}
function quickReply(trigger, title) { addMessage(title, 'user'); processBotResponse(trigger); }
document.getElementById('welcome-topics').replaceWith(topicButtons(allTopics));
document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => quickReply(button.dataset.action, button.textContent)));
document.getElementById('search-form').addEventListener('submit', event => {
  event.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;
  userInput.value = '';
  addMessage(text, 'user'); processBotResponse(text);
});
const themeBtn = document.getElementById('theme-btn');
function setTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  themeBtn.textContent = dark ? '☀' : '☾';
  themeBtn.setAttribute('aria-pressed', String(dark));
  themeBtn.setAttribute('aria-label', dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
}
const savedTheme = storage.read('gapura-theme', null);
setTheme(savedTheme === 'dark' || (savedTheme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches));
themeBtn.addEventListener('click', () => { const dark = !document.body.classList.contains('dark-mode'); setTheme(dark); storage.write('gapura-theme', dark ? 'dark' : 'light'); });
const isNativeApp = window.Capacitor?.isNativePlatform?.() === true;
// Native app assets ship in the binary; service-worker caching is only needed on the web.
let offlineReady = isNativeApp;
function updateConnection() {
  document.getElementById('connection-status').textContent = navigator.onLine ? (offlineReady ? 'Siap offline' : 'Online') : (offlineReady ? 'Offline · data tersimpan' : 'Offline');
}
window.addEventListener('online', updateConnection);
window.addEventListener('offline', updateConnection);
updateConnection();
if (!isNativeApp && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).then(registration => {
    const showUpdate = () => {
      document.getElementById('app-update').hidden = !registration.waiting;
    };
    showUpdate();
    registration.addEventListener('updatefound', () => {
      registration.installing?.addEventListener('statechange', showUpdate);
    });
    return navigator.serviceWorker.ready;
  }).then(() => { offlineReady = true; updateConnection(); }).catch(() => { inputStatus.textContent = 'Mode offline belum siap. Gunakan HTTPS atau localhost dan muat ulang.'; });
}
const micBtn = document.getElementById('mic-btn');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Web speech support does not imply native WebView permission/plugin support.
// Native users can use dictation on their system keyboard until a speech plugin is added.
if (SpeechRecognition && !isNativeApp) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'id-ID'; 
  recognition.interimResults = false;
  let recording = false;
  
  micBtn.hidden = false;
  
  micBtn.addEventListener('click', () => {
    if (recording) { recognition.stop(); return; }
    try { 
      recognition.start(); 
      recording = true; 
      micBtn.setAttribute('aria-label', 'Hentikan pencarian suara'); 
      micBtn.setAttribute('aria-pressed', 'true'); 
      inputStatus.textContent = 'Mendengarkan... Silakan bicara.'; 
    }
    catch { inputStatus.textContent = 'Mikrofon belum siap. Coba lagi atau ketik pertanyaan.'; }
  });
  
  // Fitur responsif: Begitu suara dikenali, langsung kirim pertanyaan (auto-submit)
  recognition.addEventListener('result', event => { 
    const transcript = event.results[0][0].transcript;
    inputStatus.textContent = 'Memproses ucapan...'; 
    userInput.value = ''; // Kosongkan input agar bersih
    addMessage(transcript, 'user'); // Tampilkan pesan pengguna di layar
    processBotResponse(transcript); // Bot langsung merespons
  });
  
  recognition.addEventListener('error', event => { 
    inputStatus.textContent = event.error === 'not-allowed' ? 'Izin mikrofon ditolak browser. Ketik manual.' : 'Suara tidak jelas. Coba lagi.'; 
  });
  
  recognition.addEventListener('end', () => { 
    recording = false; 
    micBtn.setAttribute('aria-label', 'Mulai pencarian suara'); 
    micBtn.setAttribute('aria-pressed', 'false'); 
    if (inputStatus.textContent === 'Mendengarkan... Silakan bicara.') {
      inputStatus.textContent = 'Tidak ada suara terbaca. Coba lagi.';
    }
  });
}
} catch (error) {
  console.error('Gapura Smart gagal dimulai:', error);
  const message = 'Aplikasi belum dapat dimuat. File aturan atau aplikasi mungkin tidak lengkap atau mengandung kesalahan. Hubungi pengelola untuk memperbarui aplikasi.';
  const alert = document.createElement('p');
  alert.className = 'source-note';
  alert.setAttribute('role', 'alert');
  alert.textContent = message;
  document.getElementById('chat-box')?.prepend(alert);
  const status = document.getElementById('input-status');
  if (status) status.textContent = 'Pengelola: periksa sop-data.js, lalu jalankan npm run build sebelum mengunggah ulang isi www.';
  document.querySelectorAll('#search-form input, #search-form button, [data-action]').forEach(control => { control.disabled = true; });
  const update = document.getElementById('app-update');
  if (update) update.hidden = false;
  const connection = document.getElementById('connection-status');
  if (connection) connection.textContent = 'Aplikasi belum siap';
}
