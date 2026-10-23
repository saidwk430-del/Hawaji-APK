(function(){
var st=document.createElement('style');
st.textContent='#splash{position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:radial-gradient(circle at 50% 38%,#2f333c 0%,#14161b 60%,#07080a 100%);display:flex;align-items:center;justify-content:center;transition:opacity .9s}#splash.out{opacity:0}#splash img{width:68vw;max-width:320px;opacity:0;transform:scale(.9);animation:sIn 2.2s ease-out .2s forwards;-webkit-mask-image:radial-gradient(circle,#000 62%,transparent 71%);mask-image:radial-gradient(circle,#000 62%,transparent 71%)}#splash .sn{position:absolute;bottom:9vh;font:italic 800 42px Georgia,serif;background:linear-gradient(#fff3b0,#d4a437 55%,#8a6420);-webkit-background-clip:text;background-clip:text;color:transparent;opacity:0;animation:sIn 1.8s ease-out 1.2s forwards}@keyframes sIn{to{opacity:1;transform:none}}';
document.documentElement.appendChild(st);
var s=document.createElement('div');s.id='splash';
s.innerHTML='<img src="logo.jpg"><div class="sn">Hawaji</div>';
document.documentElement.appendChild(s);
var a=new Audio('eagle.wav');
function play(){var p=a.play();if(p&&p.catch)p.catch(function(){document.addEventListener('touchstart',function f(){document.removeEventListener('touchstart',f);if(document.getElementById('splash'))a.play().catch(function(){});},{once:true});});}
play();
function close(){if(s.classList.contains('out'))return;s.classList.add('out');setTimeout(function(){s.remove();st.remove();},900);}
setTimeout(close,3800);
s.addEventListener('click',close);
})();
