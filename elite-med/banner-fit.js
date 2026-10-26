(function(){var b=document.querySelector('.banner');var w=document.createElement('div');w.className='bfit';b.parentNode.insertBefore(w,b);w.appendChild(b);
function f(){var W=b.offsetWidth,H=b.offsetHeight,s=Math.min((w.clientWidth-32)/W,(w.clientHeight-32)/H,1);b.style.transform='scale('+s+')';b.style.margin=(-(H-H*s)/2)+'px '+(-(W-W*s)/2)+'px';}
f();addEventListener('resize',f);})();
