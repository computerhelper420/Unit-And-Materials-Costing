/* সার্চ / সাজেশন */

const sBox = $('search'), sug = $('suggest');

function searchItems(q){
  q = q.trim().toLowerCase();
  if(!q) return [];
  const terms = q.split(/\s+/);
  const out = [];
  for(const it of ITEMS){
    const hay = (it.code+' '+it.desc).toLowerCase();
    let ok = true;
    for(const t of terms){ if(hay.indexOf(t)===-1){ ok=false; break; } }
    if(ok) out.push(it);
    if(out.length>=80) break;
  }
  return out;
}

function showSuggest(list){
  state.results = list; state.hi = list.length?0:-1;
  if(!list.length){ sug.classList.add('open'); sug.innerHTML = '<div class="sug-empty">কোনো আইটেম পাওয়া যায়নি</div>'; return; }
  sug.innerHTML = list.map((it,i)=>{
    const p = unitPrice(it);
    return '<div class="sug-item'+(i===0?' hi':'')+'" data-i="'+i+'">'+
      '<span class="sug-code">'+ esc(it.code||'—') +'</span>'+
      '<span class="sug-desc">'+ (esc(it.desc)||'(বিবরণ নেই)') +'</span>'+
      '<span class="sug-price">'+ fmt(p) +'</span>'+
    '</div>';
  }).join('');
  sug.classList.add('open');
}

function hideSuggest(){ sug.classList.remove('open'); state.hi=-1; }

function moveHi(d){
  if(!state.results.length) return;
  state.hi = (state.hi + d + state.results.length) % state.results.length;
  [...sug.children].forEach((c,i)=>c.classList.toggle('hi', i===state.hi));
  const el = sug.children[state.hi];
  if(el && el.scrollIntoView) el.scrollIntoView({block:'nearest'});
}

sBox.addEventListener('input', ()=> showSuggest(searchItems(sBox.value)));
sBox.addEventListener('keydown', e=>{
  if(e.key==='ArrowDown'){ e.preventDefault(); moveHi(1); }
  else if(e.key==='ArrowUp'){ e.preventDefault(); moveHi(-1); }
  else if(e.key==='Enter'){
    e.preventDefault();
    if(state.hi>=0 && state.results[state.hi]){
      addItem(state.results[state.hi], $('qty').value);
      sBox.value=''; hideSuggest(); sBox.focus();
    }
  } else if(e.key==='Escape'){ hideSuggest(); }
});

sug.addEventListener('click', e=>{
  const t = e.target.closest('.sug-item');
  if(!t) return;
  const it = state.results[Number(t.dataset.i)];
  if(it){ addItem(it, $('qty').value); sBox.value=''; hideSuggest(); sBox.focus(); }
});

document.addEventListener('click', e=>{
  if(!e.target.closest('.field')) hideSuggest();
});

$('addBtn').addEventListener('click', ()=>{
  if(!sBox.value.trim()){ sBox.focus(); return; }
  const list = searchItems(sBox.value);
  if(!list.length){ alert('এই নামে কোনো আইটেম পাওয়া যায়নি।'); return; }
  addItem(list[0], $('qty').value);
  sBox.value=''; hideSuggest(); sBox.focus();
});