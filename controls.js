/* হেডার কন্ট্রোল: প্রাইস মোড, ক্লিয়ার, প্রিন্ট, CSV */

$('priceMode').addEventListener('change', ()=>{ renderTable(); save(); });
['disc','vat','transport','labour'].forEach(id=>{
  $(id).addEventListener('input', ()=>{ recompute(); save(); });
});

$('clearBtn').addEventListener('click', ()=>{
  if(!state.cart.length) return;
  if(confirm('সব আইটেম মুছে ফেলবেন?')){
    state.cart = [];
    renderTable(); save();
  }
});

$('printBtn').addEventListener('click', ()=>{
  const modeTxt = $('priceMode').selectedOptions[0].textContent;
  $('printHead').innerHTML =
    '<b>মেটেরিয়াল চার্জ হিসাব</b> · রেট: '+ esc(modeTxt) +
    ' · তারিখ: '+ new Date().toLocaleDateString('en-GB');
  window.print();
});

$('csvBtn').addEventListener('click', ()=>{
  if(!state.cart.length){ alert('কোনো আইটেম নেই।'); return; }
  const lines = [['ক্রম','কোড','বিবরণ','একক দর','পরিমাণ','মোট']];
  let sub=0;
  state.cart.forEach((it,i)=>{
    const p = unitPrice(it), a = p*it.qty; sub += a;
    lines.push([i+1, it.code, it.desc, p.toFixed(2), it.qty, a.toFixed(2)]);
  });
  lines.push([]);
  lines.push(['','','','','সাব-টোটাল', sub.toFixed(2)]);
  lines.push(['','','','','ডিসকাউন্ট', $('tDisc').textContent]);
  lines.push(['','','','','পরিবহন', Number($('transport').value||0).toFixed(2)]);
  lines.push(['','','','','লেবার', Number($('labour').value||0).toFixed(2)]);
  lines.push(['','','','','ভ্যাট', $('tVat').textContent]);
  lines.push(['','','','','সর্বমোট', $('tGrand').textContent]);

  const csv = '\uFEFF' + lines.map(r=>r.map(c=>'"'+String(c??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'material-charge-'+ new Date().toISOString().slice(0,10) +'.csv';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 1500);
});