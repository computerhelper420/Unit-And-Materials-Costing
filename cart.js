/* কার্ট + টেবিল রেন্ডার + সারাংশ */

function addItem(item, qty){
  qty = Number(qty)||0;
  if(qty<=0){ alert('সঠিক পরিমাণ লিখুন (০ এর বেশি)।'); return; }
  const key = (item.code+'|'+item.desc).toLowerCase();
  const manual = (item.manual===undefined)?null:item.manual;
  const ex = state.cart.find(c=>c.key===key && c.manual===null);
  if(ex && manual===null){ ex.qty += qty; }
  else {
    state.cart.push({
      key, code:item.code, desc:item.desc,
      ppbs2:(item.ppbs2===undefined?null:item.ppbs2),
      breb:(item.breb===undefined?null:item.breb),
      manual, qty
    });
  }
  renderTable();
  save();
}

function renderTable(){
  const tb = $('tbody');
  tb.innerHTML='';
  state.cart.forEach((it,idx)=>{
    const p = unitPrice(it);
    const amt = p*it.qty;
    const tr = document.createElement('tr');
    tr.innerHTML =
      '<td>'+ (idx+1) +'</td>'+
      '<td class="code">'+ esc(it.code || '—') +'</td>'+
      '<td class="desc">'+ (esc(it.desc) || '<span class="muted">(বিবরণ নেই)</span>') +'</td>'+
      '<td class="num"><input class="priceIn" type="number" step="0.01" value="'+p.toFixed(2)+'" data-i="'+idx+'"></td>'+
      '<td class="num"><input class="qtyIn" type="number" step="1" min="0" value="'+it.qty+'" data-i="'+idx+'"></td>'+
      '<td class="num amt">'+ fmt(amt) +'</td>'+
      '<td class="no-print num"><button class="del" data-i="'+idx+'" title="মুছুন">✕</button></td>';
    tb.appendChild(tr);
  });
  $('emptyMsg').style.display = state.cart.length ? 'none' : 'block';
  $('itemCount').textContent = state.cart.length + ' আইটেম';
  recompute();
}

function recompute(){
  let sub=0, qtySum=0;
  const cats = {};
  const rows = $('tbody').rows;
  state.cart.forEach((it,i)=>{
    const p = unitPrice(it);
    const amt = p*it.qty;
    sub += amt; qtySum += it.qty;
    const c = catOf(it.code);
    cats[c] = (cats[c]||0) + amt;
    if(rows[i]) rows[i].cells[5].textContent = fmt(amt);
  });

  $('ftQty').textContent = qtySum;
  $('ftAmt').textContent = fmt(sub);
  $('tSub').textContent = fmt(sub);

  const disc = Number($('disc').value)||0;
  const vat  = Number($('vat').value)||0;
  const tr   = Number($('transport').value)||0;
  const lab  = Number($('labour').value)||0;

  const discAmt = sub * disc / 100;
  const taxable = sub - discAmt + tr + lab;
  const vatAmt  = taxable * vat / 100;
  const grand   = taxable + vatAmt;

  $('tDisc').textContent  = fmt(discAmt);
  $('tVat').textContent   = fmt(vatAmt);
  $('tGrand').textContent = fmt(grand);

  renderSummary(cats, sub);
}

function renderSummary(cats, sub){
  const entries = Object.entries(cats).sort((a,b)=>b[1]-a[1]);
  const tbody = $('sumTable').tBodies[0];
  if(!entries.length){
    tbody.innerHTML = '<tr><td class="muted">—</td><td>—</td></tr>';
    return;
  }
  tbody.innerHTML = entries.map(([c,v])=>{
    const pct = sub? (v/sub*100) : 0;
    const name = CAT_NAME[c] ? (CAT_NAME[c]) : 'অন্যান্য';
    return '<tr><td>'+ esc(c) +' · <span class="muted">'+ esc(name) +'</span></td>'+
           '<td>'+ fmt(v) +' <span class="muted" style="font-weight:400;font-size:12px">('+pct.toFixed(1)+'%)</span></td></tr>';
  }).join('');
}