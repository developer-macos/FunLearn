
function buildDoc(html, css, js) {
  return `<!doctype html>
<html><head><style>${css}</style></head>
<body>
${html}
<script>
try { ${js} } catch (e) { document.body.insertAdjacentHTML('beforeend', '<pre style="color:red">'+e.toString()+'</pre>'); }
</script>
</body></html>`;
}

const htmlEl = document.getElementById('htmlCode');
const cssEl = document.getElementById('cssCode');
const jsEl = document.getElementById('jsCode');
const frame = document.getElementById('preview');
const runBtn = document.getElementById('runBtn');
const resetBtn = document.getElementById('resetBtn');
const shareBtn = document.getElementById('shareBtn');
const shareOut = document.getElementById('shareOut');

function run() {
  const doc = buildDoc(htmlEl.value, cssEl.value, jsEl.value);
  const blob = new Blob([doc], {type: 'text/html'});
  const url = URL.createObjectURL(blob);
  frame.src = url;
}

run(); // initial

runBtn.addEventListener('click', run);

resetBtn.addEventListener('click', () => {
  htmlEl.value = '<h1>Hello FunLearner 👋</h1>\n<p>Change me and hit Run!</p>';
  cssEl.value = 'body { font-family: system-ui, sans-serif; }\nh1 { text-align:center; }';
  jsEl.value = "document.querySelector('h1').onclick = () => alert('You clicked the title!')";
  run();
});

// Share via URL (base64)
function encodeState() {
  const state = {h: htmlEl.value, c: cssEl.value, j: jsEl.value};
  return btoa(unescape(encodeURIComponent(JSON.stringify(state))));
}
function decodeState(s) {
  try {
    const obj = JSON.parse(decodeURIComponent(escape(atob(s))));
    htmlEl.value = obj.h || '';
    cssEl.value = obj.c || '';
    jsEl.value = obj.j || '';
    run();
  } catch (e) {}
}

shareBtn.addEventListener('click', async () => {
  const u = new URL(location.href);
  u.searchParams.set('code', encodeState());
  shareOut.value = u.toString();
  shareOut.select();
  try { await navigator.clipboard.writeText(shareOut.value); } catch (e) {}
});

// Load state from query
const params = new URLSearchParams(location.search);
if (params.has('code')) {
  decodeState(params.get('code'));
}
