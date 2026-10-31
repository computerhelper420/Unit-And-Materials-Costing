/* হেল্পার, ITEMS, unitPrice */

const $ = id => document.getElementById(id);
const nf = new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const fmt = n => nf.format(isFinite(n)?n:0);
const esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const ITEMS = RAW.map((r,i)=>({
  id:i,
  code:r[0]||'',
  desc:r[1]||'',
  ppbs2:(r[2]===null||r[2]===undefined)?null:Number(r[2]),
  breb:(r[3]===null||r[3]===undefined)?null:Number(r[3])
}));

const CAT_NAME = {
  B:'হার্ডওয়্যার / ক্ল্যাম্প / বল্টু', C:'ইনসুলেটর', X:'ক্রস আর্ম',
  Z:'অ্যাংকর লগ / প্লাগ', D:'কন্ডাক্টর', E:'লাইন গার্ড / আর্মার রড',
  N:'গাই ওয়্যার', H:'সুইচ / ফিউজ / রিক্লোজার', HS:'সুইচ (HS সিরিজ)',
  I:'কানেক্টর / স্লিভ', R:'পোল', G:'ট্রান্সফরমার', F:'আন্ডারগ্রাউন্ড কেবল',
  DS:'কন্ট্রোল কেবল', DESA:'কন্ডাক্টর (DESA)', RCC:'RCC পোল',
  ZPB:'PDB — হার্ডওয়্যার', ZPC:'PDB — ইনসুলেটর', ZPD:'PDB — কন্ডাক্টর',
  ZPG:'PDB — ট্রান্সফরমার', ZPH:'PDB — সুইচ/ফিউজ', ZPJ:'PDB — মিটার',
  ZPM:'PDB — মিটারিং', ZPN:'PDB — গাই ওয়্যার', ZPR:'PDB — পোল',
  ZPX:'PDB — র‍্যাক', W:'ড্যামেজ পোল', DOG:'ওয়্যার', GS:'পাওয়ার ট্রান্সফরমার',
  TL:'টুলস', CN:'পোল বেন্ড', ISG:'আইটেম'
};

function catOf(code){
  const m = /^[^A-Za-z]*([A-Za-z]+)/.exec(code||'');
  if(m){
    let c = m[1].toUpperCase();
    if(c.startsWith('ZP')) return 'ZP'+c.charAt(2);
    return c;
  }
  const d = (code||'').replace(/[^A-Za-z0-9]/g,'').slice(0,2).toUpperCase();
  return d || 'অন্যান্য';
}

function unitPrice(it){
  if(it.manual!==null && it.manual!==undefined && it.manual!=='') return Number(it.manual)||0;
  const mode = $('priceMode').value;
  const a = it.ppbs2, b = it.breb;
  const vals = [a,b].filter(v=>typeof v==='number' && v>0);
  switch(mode){
    case 'ppbs2': return typeof a==='number'?a:0;
    case 'breb' : return typeof b==='number'?b:0;
    case 'min'  : return vals.length?Math.min(...vals):0;
    case 'max'  : return vals.length?Math.max(...vals):0;
    case 'avg'  : return vals.length?vals.reduce((x,y)=>x+y,0)/vals.length:0;
  }
  return 0;
}/* হেল্পার, ITEMS, unitPrice */

const $ = id => document.getElementById(id);
const nf = new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const fmt = n => nf.format(isFinite(n)?n:0);
const esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const ITEMS = RAW.map((r,i)=>({
  id:i,
  code:r[0]||'',
  desc:r[1]||'',
  ppbs2:(r[2]===null||r[2]===undefined)?null:Number(r[2]),
  breb:(r[3]===null||r[3]===undefined)?null:Number(r[3])
}));

const CAT_NAME = {
  B:'হার্ডওয়্যার / ক্ল্যাম্প / বল্টু', C:'ইনসুলেটর', X:'ক্রস আর্ম',
  Z:'অ্যাংকর লগ / প্লাগ', D:'কন্ডাক্টর', E:'লাইন গার্ড / আর্মার রড',
  N:'গাই ওয়্যার', H:'সুইচ / ফিউজ / রিক্লোজার', HS:'সুইচ (HS সিরিজ)',
  I:'কানেক্টর / স্লিভ', R:'পোল', G:'ট্রান্সফরমার', F:'আন্ডারগ্রাউন্ড কেবল',
  DS:'কন্ট্রোল কেবল', DESA:'কন্ডাক্টর (DESA)', RCC:'RCC পোল',
  ZPB:'PDB — হার্ডওয়্যার', ZPC:'PDB — ইনসুলেটর', ZPD:'PDB — কন্ডাক্টর',
  ZPG:'PDB — ট্রান্সফরমার', ZPH:'PDB — সুইচ/ফিউজ', ZPJ:'PDB — মিটার',
  ZPM:'PDB — মিটারিং', ZPN:'PDB — গাই ওয়্যার', ZPR:'PDB — পোল',
  ZPX:'PDB — র‍্যাক', W:'ড্যামেজ পোল', DOG:'ওয়্যার', GS:'পাওয়ার ট্রান্সফরমার',
  TL:'টুলস', CN:'পোল বেন্ড', ISG:'আইটেম'
};

function catOf(code){
  const m = /^[^A-Za-z]*([A-Za-z]+)/.exec(code||'');
  if(m){
    let c = m[1].toUpperCase();
    if(c.startsWith('ZP')) return 'ZP'+c.charAt(2);
    return c;
  }
  const d = (code||'').replace(/[^A-Za-z0-9]/g,'').slice(0,2).toUpperCase();
  return d || 'অন্যান্য';
}

function unitPrice(it){
  if(it.manual!==null && it.manual!==undefined && it.manual!=='') return Number(it.manual)||0;
  const mode = $('priceMode').value;
  const a = it.ppbs2, b = it.breb;
  const vals = [a,b].filter(v=>typeof v==='number' && v>0);
  switch(mode){
    case 'ppbs2': return typeof a==='number'?a:0;
    case 'breb' : return typeof b==='number'?b:0;
    case 'min'  : return vals.length?Math.min(...vals):0;
    case 'max'  : return vals.length?Math.max(...vals):0;
    case 'avg'  : return vals.length?vals.reduce((x,y)=>x+y,0)/vals.length:0;
  }
  return 0;
}/* হেল্পার, ITEMS, unitPrice */

const $ = id => document.getElementById(id);
const nf = new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const fmt = n => nf.format(isFinite(n)?n:0);
const esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const ITEMS = RAW.map((r,i)=>({
  id:i,
  code:r[0]||'',
  desc:r[1]||'',
  ppbs2:(r[2]===null||r[2]===undefined)?null:Number(r[2]),
  breb:(r[3]===null||r[3]===undefined)?null:Number(r[3])
}));

const CAT_NAME = {
  B:'হার্ডওয়্যার / ক্ল্যাম্প / বল্টু', C:'ইনসুলেটর', X:'ক্রস আর্ম',
  Z:'অ্যাংকর লগ / প্লাগ', D:'কন্ডাক্টর', E:'লাইন গার্ড / আর্মার রড',
  N:'গাই ওয়্যার', H:'সুইচ / ফিউজ / রিক্লোজার', HS:'সুইচ (HS সিরিজ)',
  I:'কানেক্টর / স্লিভ', R:'পোল', G:'ট্রান্সফরমার', F:'আন্ডারগ্রাউন্ড কেবল',
  DS:'কন্ট্রোল কেবল', DESA:'কন্ডাক্টর (DESA)', RCC:'RCC পোল',
  ZPB:'PDB — হার্ডওয়্যার', ZPC:'PDB — ইনসুলেটর', ZPD:'PDB — কন্ডাক্টর',
  ZPG:'PDB — ট্রান্সফরমার', ZPH:'PDB — সুইচ/ফিউজ', ZPJ:'PDB — মিটার',
  ZPM:'PDB — মিটারিং', ZPN:'PDB — গাই ওয়্যার', ZPR:'PDB — পোল',
  ZPX:'PDB — র‍্যাক', W:'ড্যামেজ পোল', DOG:'ওয়্যার', GS:'পাওয়ার ট্রান্সফরমার',
  TL:'টুলস', CN:'পোল বেন্ড', ISG:'আইটেম'
};

function catOf(code){
  const m = /^[^A-Za-z]*([A-Za-z]+)/.exec(code||'');
  if(m){
    let c = m[1].toUpperCase();
    if(c.startsWith('ZP')) return 'ZP'+c.charAt(2);
    return c;
  }
  const d = (code||'').replace(/[^A-Za-z0-9]/g,'').slice(0,2).toUpperCase();
  return d || 'অন্যান্য';
}

function unitPrice(it){
  if(it.manual!==null && it.manual!==undefined && it.manual!=='') return Number(it.manual)||0;
  const mode = $('priceMode').value;
  const a = it.ppbs2, b = it.breb;
  const vals = [a,b].filter(v=>typeof v==='number' && v>0);
  switch(mode){
    case 'ppbs2': return typeof a==='number'?a:0;
    case 'breb' : return typeof b==='number'?b:0;
    case 'min'  : return vals.length?Math.min(...vals):0;
    case 'max'  : return vals.length?Math.max(...vals):0;
    case 'avg'  : return vals.length?vals.reduce((x,y)=>x+y,0)/vals.length:0;
  }
  return 0;
}