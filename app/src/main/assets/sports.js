(function(){
var T,$=function(i){return document.getElementById(i)},g=function(i){return parseFloat($(i).value)};
function beep(f){try{var c=new (window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator();o.frequency.value=f;o.connect(c.destination);o.start();setTimeout(function(){o.stop();c.close()},250)}catch(e){}}
var st=document.createElement('style');
st.textContent='#sp{position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;overflow:auto;background:#0b0b0b;color:#f2d27a;padding:14px;font-family:system-ui,sans-serif;direction:rtl}#sp h2{margin:8px 0 12px;color:#ffe08a;font-size:20px}#sp .c{border:1px solid #8a6a2a;border-radius:14px;padding:12px;margin-bottom:12px;background:#121212}#sp input,#sp select{width:100%;box-sizing:border-box;padding:10px;margin:4px 0 8px;background:#131313;color:#f5e6b0;border:1px solid #8a6a2a;border-radius:12px;font-size:16px}#sp button{padding:10px 14px;border-radius:12px;border:1px solid #ffe9a0;background:linear-gradient(#ffe27a,#c9921a);color:#111;font-weight:700;font-size:15px}#sp .bk{background:#1a1a1a;color:#e0b84f;border-color:#8a6a2a}#sp .r{margin-top:8px;color:#ffe27a;line-height:1.9}';
document.head.appendChild(st);
function open(){
if($('sp'))return;
var d=document.createElement('div');d.id='sp';
d.innerHTML='<button class="bk" id="spb">رجوع ←</button><h2>الرياضة</h2>'+
'<div class="c"><b>مؤشر كتلة الجسم</b><input id="bw" type="number" placeholder="الوزن (كغ)"><input id="bh" type="number" placeholder="الطول (سم)"><button id="bb">احسب</button><div class="r" id="bo"></div></div>'+
'<div class="c"><b>نبضات القلب</b><input id="ha" type="number" placeholder="العمر"><button id="hb">احسب</button><div class="r" id="ho"></div></div>'+
'<div class="c"><b>السرعة والوتيرة</b><input id="pd" type="number" placeholder="المسافة (كم)"><input id="pt" type="number" placeholder="الزمن (دقيقة)"><button id="pb">احسب</button><div class="r" id="po"></div></div>'+
'<div class="c"><b>السعرات المحروقة</b><select id="ca"><option value="3.5">مشي</option><option value="9.8">جري</option><option value="7.5">دراجة</option><option value="8">سباحة</option><option value="7">كرة القدم</option></select><input id="cw" type="number" placeholder="الوزن (كغ)"><input id="cm" type="number" placeholder="المدة (دقيقة)"><button id="cb">احسب</button><div class="r" id="co"></div></div>'+
'<div class="c"><b>مؤقت التمارين</b><input id="tw" type="number" placeholder="زمن العمل (ثانية)" value="30"><input id="tr" type="number" placeholder="زمن الراحة (ثانية)" value="10"><input id="tn" type="number" placeholder="عدد الجولات" value="8"><button id="tb">ابدأ</button> <button class="bk" id="ts">إيقاف</button><div class="r" id="tt" style="font-size:22px"></div></div>';
document.body.appendChild(d);
$('spb').onclick=function(){clearInterval(T);d.remove();};
$('bb').onclick=function(){var w=g('bw'),h=g('bh');if(!w||!h)return;var m=h/100,b=w/(m*m),c=b<18.5?'نحافة':b<25?'وزن طبيعي':b<30?'زيادة وزن':'سمنة';$('bo').innerHTML='المؤشر: '+b.toFixed(1)+' ('+c+')<br>الوزن المثالي: '+(18.5*m*m).toFixed(0)+' – '+(24.9*m*m).toFixed(0)+' كغ';};
$('hb').onclick=function(){var a=g('ha');if(!a)return;var mx=220-a,z=[['إحماء',50,60],['حرق الدهون',60,70],['تحمّل',70,80],['قوة',80,90],['أقصى',90,100]];$('ho').innerHTML='النبض الأقصى: '+mx+'<br>'+z.map(function(x){return x[0]+': '+Math.round(mx*x[1]/100)+' – '+Math.round(mx*x[2]/100)}).join('<br>');};
$('pb').onclick=function(){var k=g('pd'),m=g('pt');if(!k||!m)return;var p=m/k,mm=Math.floor(p),ss=Math.round((p-mm)*60);if(ss==60){mm++;ss=0}$('po').innerHTML='الوتيرة: '+mm+':'+(ss<10?'0':'')+ss+' دقيقة/كم<br>السرعة: '+(k/(m/60)).toFixed(1)+' كم/س';};
$('cb').onclick=function(){var met=g('ca'),w=g('cw'),m=g('cm');if(!w||!m)return;$('co').innerHTML='تقريباً '+Math.round(met*w*m/60)+' سعرة';};
$('tb').onclick=function(){var w=g('tw')||30,r=g('tr')||0,n=g('tn')||1,ph='عمل',i=1,t=w,el=$('tt');clearInterval(T);
function show(){el.textContent=ph+' '+i+'/'+n+' — '+t+' ث';}
show();beep(880);
T=setInterval(function(){t--;if(t<=0){if(ph==='عمل'&&r>0){ph='راحة';t=r;}else{ph='عمل';i++;t=w;}
if(i>n){clearInterval(T);el.textContent='انتهى 🎉';beep(1200);return;}beep(ph==='عمل'?880:520);}show();},1000);};
$('ts').onclick=function(){clearInterval(T);$('tt').textContent='';};
}
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('.tile');if(t&&/الرياضة|Sport/i.test(t.textContent)){e.stopImmediatePropagation();e.preventDefault();open();}},true);
})();
