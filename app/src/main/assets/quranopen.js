window.mqOpen=function(){
  try{
    document.querySelectorAll('#ov,.ov,[id^="ov"]').forEach(function(e){
      if(e.parentNode)e.parentNode.removeChild(e);
    });
    if(!document.getElementById('t_mq')&&window.ensureMq)window.ensureMq();
    if(!document.getElementById('t_mq')){alert('شاشة القرآن غير موجودة، أعد تثبيت التطبيق');return;}
    if(typeof show==='function')show('t_mq');
    if(window.hMqScan)hMqScan();
    window.scrollTo(0,0);
  }catch(e){alert('خطأ في فتح القرآن: '+e.message);}
};
