(function(){
var st=document.createElement('style');
st.textContent='#splash{position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:#14161b url(splash.jpg) center/cover no-repeat;transition:opacity .9s}#splash.out{opacity:0}#splash .v{position:absolute;top:0;left:0;right:0;bottom:0;background:#000;animation:sf 3s ease-out forwards}@keyframes sf{to{opacity:0}}';
document.documentElement.appendChild(st);
var s=document.createElement('div');s.id='splash';
s.innerHTML='<div class="v"></div>';
document.documentElement.appendChild(s);
var a=new Audio('eagle.wav');
function play(){var p=a.play();if(p&&p.catch)p.catch(function(){document.addEventListener('touchstart',function f(){document.removeEventListener('touchstart',f);if(document.getElementById('splash'))a.play().catch(function(){});},{once:true});});}
play();
function close(){if(s.classList.contains('out'))return;s.classList.add('out');setTimeout(function(){s.remove();st.remove();},900);}
setTimeout(close,5000);
s.addEventListener('click',close);
})();
