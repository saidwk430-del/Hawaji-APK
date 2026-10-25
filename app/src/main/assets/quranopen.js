window.mqOpen=function(){
  var o=document.getElementById('ov');
  if(o&&o.parentNode)o.parentNode.removeChild(o);
  setTimeout(function(){
    if(typeof show==='function')show('t_mq');
    if(window.hMqScan)hMqScan();
  },50);
};
