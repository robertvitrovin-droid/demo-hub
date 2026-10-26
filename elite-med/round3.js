/* Elite Med demo interactions (round 3): smooth anchors, menu panel, FAQ accordion, demo callback form */
(function(){
var d=document,LINKS=[['About Us','#about'],['Services','#services'],['Doctors','#team'],['Reviews','#reviews'],['Special Offers','#special-offer'],['FAQ','#faq'],['Book a Call','#final-cta']];
function off(){var b=d.querySelector('.demo-bar');return (b?b.offsetHeight:0)+12;}
function go(id){var t=d.getElementById(id);if(!t)return false;var y=t.getBoundingClientRect().top+window.pageYOffset-off();window.scrollTo({top:y,behavior:'smooth'});if(history.replaceState)history.replaceState(null,'','#'+id);return true;}
d.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;var h=a.getAttribute('href');if(h==='#'){e.preventDefault();return;}if(go(h.slice(1))){e.preventDefault();closeMenu();}});
/* menu */
var hdr=d.querySelector('.site-header .header-inner'),btn=d.getElementById('menu-button'),panel;
if(hdr&&!btn){btn=d.createElement('button');btn.className='menu-btn r3-menu-btn';btn.id='menu-button';btn.setAttribute('aria-label','Menu');btn.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';hdr.appendChild(btn);}
if(btn){btn.type='button';panel=d.createElement('nav');panel.className='r3-menu';panel.id='mobile-nav';panel.hidden=true;panel.setAttribute('aria-label','Main');
panel.innerHTML=LINKS.map(function(l){return '<a href="'+l[1]+'">'+l[0]+'</a>';}).join('')+'<a class="r3-menu-tel" href="tel:+15550100123">+1 (555) 010-0123</a>';
d.querySelector('.site-header').appendChild(panel);btn.setAttribute('aria-controls','mobile-nav');btn.setAttribute('aria-expanded','false');
btn.addEventListener('click',function(){var o=panel.hidden;panel.hidden=!o;btn.setAttribute('aria-expanded',String(o));btn.classList.toggle('is-open',o);});
d.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});}
function closeMenu(){if(panel&&!panel.hidden){panel.hidden=true;btn.setAttribute('aria-expanded','false');btn.classList.remove('is-open');}}
/* FAQ */
var PLUS='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',MINUS='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>';
var items=d.querySelectorAll('.faq-item');
function setF(it,o){it.classList.toggle('is-open',o);var q=it.querySelector('.faq-q'),a=it.querySelector('.faq-a'),t=it.querySelector('.faq-toggle');if(a)a.hidden=!o;if(q)q.setAttribute('aria-expanded',String(o));if(t)t.innerHTML=o?MINUS:PLUS;}
items.forEach(function(it,i){var q=it.querySelector('.faq-q'),a=it.querySelector('.faq-a');if(!q)return;q.setAttribute('role','button');q.tabIndex=0;if(a){a.id=a.id||('faq-a-'+(i+1));q.setAttribute('aria-controls',a.id);}
setF(it,it.classList.contains('is-open'));
function tg(){var o=!it.classList.contains('is-open');items.forEach(function(x){if(x!==it)setF(x,false);});setF(it,o);}
q.addEventListener('click',tg);q.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();tg();}});});
/* form */
var f=d.getElementById('callback-form');if(f){var dt=f.querySelector('#cb-date'),today=new Date();today.setMinutes(today.getMinutes()-today.getTimezoneOffset());var iso=today.toISOString().slice(0,10);if(dt)dt.min=iso;
function chk(el){var v=(el.value||'').trim(),ok=true;if(el.name==='name')ok=v.length>=2;else if(el.name==='phone')ok=v.replace(/\D/g,'').length>=7&&/^[+\d\s().-]+$/.test(v);else if(el.name==='date')ok=!!v&&v>=iso;else ok=!!v;
var w=el.closest('.input');w.classList.toggle('is-error',!ok);w.querySelector('.hint').hidden=ok;el.setAttribute('aria-invalid',String(!ok));return ok;}
var els=f.querySelectorAll('input,select');els.forEach(function(el){el.addEventListener('input',function(){if(el.closest('.input').classList.contains('is-error'))chk(el);});el.addEventListener('change',function(){chk(el);});});
f.addEventListener('submit',function(e){e.preventDefault();var ok=true,first=null;els.forEach(function(el){if(!chk(el)){ok=false;first=first||el;}});if(!ok){first.focus();return;}
f.classList.add('is-sent');var s=d.getElementById('cb-success');s.hidden=false;var dv=new Date(f.querySelector('#cb-date').value+'T12:00');s.querySelector('span').textContent=f.querySelector('#cb-name').value.trim()+', our administrator would call you to confirm '+f.querySelector('#cb-service').value+' on '+dv.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})+'.';});}
})();
