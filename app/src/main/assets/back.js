window.hBack=function(){
var s=document.getElementById('splash');if(s){s.click();return true}
var b=document.getElementById('ovb')||document.getElementById('spb');
if(b){b.click();return true}
var bs=document.querySelectorAll('.back');
for(var i=0;i<bs.length;i++){if(bs[i].offsetParent!==null){bs[i].click();return true}}
return false;
};
