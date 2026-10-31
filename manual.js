/* ম্যানুয়াল আইটেম */

$('mAdd').addEventListener('click', ()=>{
  const code = $('mCode').value.trim();
  const desc = $('mDesc').value.trim();
  const price = Number($('mPrice').value)||0;
  if(!code && !desc){ alert('কোড বা বিবরণ দিন।'); return; }
  addItem({code, desc, ppbs2:null, breb:null, manual:price}, $('qty').value);
  $('mCode').value=''; $('mDesc').value=''; $('mPrice').value='0';
});