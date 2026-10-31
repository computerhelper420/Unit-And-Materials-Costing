/* localStorage save / load */

const LS_KEY = 'material_calc_v1';

function save(){
  try{
    localStorage.setItem(LS_KEY, JSON.stringify({
      cart: state.cart,
      mode: $('priceMode').value,
      disc: $('disc').value,
      vat: $('vat').value,
      transport: $('transport').value,
      labour: $('labour').value
    }));
  }catch(err){}
}

function load(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(!raw) return false;
    const d = JSON.parse(raw);
    if(d.cart) state.cart = d.cart;
    if(d.mode) $('priceMode').value = d.mode;
    if(d.disc!=null) $('disc').value = d.disc;
    if(d.vat!=null) $('vat').value = d.vat;
    if(d.transport!=null) $('transport').value = d.transport;
    if(d.labour!=null) $('labour').value = d.labour;
    return true;
  }catch(err){ return false; }
}