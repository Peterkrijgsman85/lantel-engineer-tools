export function parseCSV(text){text=text.replace(/^﻿/,'');const rows=[];let row=[],field='',q=false;for(let i=0;i<text.length;i++){const c=text[i];if(q){if(c==='"'&&text[i+1]==='"'){field+='"';i++}else if(c==='"')q=false;else field+=c}else if(c==='"')q=true;else if(c===','){row.push(field);field=''}else if(c==='
'){row.push(field.replace(/$/,''));rows.push(row);row=[];field=''}else field+=c}if(field||row.length){row.push(field.replace(/$/,''));rows.push(row)}return rows.filter(r=>r.some(v=>v.trim()!==''))}
export function toCSV(rows){const esc=v=>{v=String(v??'');return /[",
]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};return rows.map(r=>r.map(esc).join(',')).join('
')}
export function download(name,text,type='text/csv;charset=utf-8'){const blob=new Blob(['﻿',text],{type}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
