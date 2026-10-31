/* টেবিল ইভেন্ট */

$('tbody').addEventListener('input', e=>{
  const t = e.target;
  const i = Number(t.dataset.i);
  if(isNaN(i) || !state.cart[i]) return;
  if(t.classList.contains('qtyIn')){
    state.cart[i].qty = Math.max(0, Number(t.value)||0);
    recompute(); save();
  } else if(t.classList.contains('priceIn')){
    state.cart[i].manual = Number(t.value)||0;
    recompute(); save();
  }
});

$('tbody').addEventListener('click', e=>{
  const b = e.target.closest('.del');
  if(!b) return;
  const i = Number(b.dataset.i);
  state.cart.splice(i,1);
  renderTable(); save();
});