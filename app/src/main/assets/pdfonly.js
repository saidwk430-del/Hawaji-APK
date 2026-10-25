(function(){
function $(i){return document.getElementById(i);}
var HIDE=['qh_tabs','qh_reader','qh_list_wrap','qh_player','qh_nav','qh_next','qh_prev'];
function clean(){
  HIDE.forEach(function(id){var e=$(id);if(e)e.style.display='none';});
  var pdf=$('qh_pdf');if(pdf)pdf.style.display='block';
  var m=$('qh_msg'),p=$('qh_pick');
  if(p)p.style.display=(m&&m.textContent)?'inline-block':'none';
  var n=$('qh_num');if(n)n.style.color='#ffe08a';
}
setInterval(clean,400);

/* النقر على جانبي الصفحة للتنقل */
document.addEventListener('click',function(e){
  var img=$('qh_img');
  if(!img||e.target!==img||!img.getAttribute('src'))return;
  var r=img.getBoundingClientRect(),left=e.clientX<r.left+r.width/2;
  var parts=(($('qh_num')||{}).textContent||'').split('/');
  var cur=parseInt(parts[0],10)-1,total=parseInt(parts[1],10);
  if(isNaN(cur)||isNaN(total))return;
  var next=left?cur+1:cur-1;
  if(next<0||next>=total)return;
  img.style.opacity=.4;
  HPdf.page(next);
});

/* عند فتح القرآن الكريم يُعرض المصحف مباشرة */
document.addEventListener('click',function(e){
  var t=e.target,tx='';
  for(var i=0;i<5&&t&&t.nodeType===1;i++){
    tx=(t.textContent||'').trim();
    if(tx==='القرآن الكريم'||tx==='Holy Quran'||tx==='Le Saint Coran')break;
    t=t.parentNode;tx='';
  }
  if(tx){setTimeout(function(){var b=$('qh_tp');if(b)b.click();},150);}
},false);
})();
