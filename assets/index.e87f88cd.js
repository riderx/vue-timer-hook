var B=Object.defineProperty,z=Object.defineProperties;var H=Object.getOwnPropertyDescriptors;var R=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var M=(n,t,e)=>t in n?B(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,T=(n,t)=>{for(var e in t||(t={}))j.call(t,e)&&M(n,e,t[e]);if(R)for(var e of R(t))G.call(t,e)&&M(n,e,t[e]);return n},F=(n,t)=>z(n,H(t));import{c as f,t as N,r as Y,a as $,o as v,b as g,d as i,e as E,u,f as K,g as J,h as P,i as c,p as A,j as O,k as Q,w as p,l as d,m as W}from"./vendor.ed0e8889.js";const X=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}};X();class l{static getTimeFromSeconds(t){const e=f(()=>Math.ceil(t.value)),s=f(()=>Math.floor(e.value/(60*60*24))),r=f(()=>Math.floor(e.value%(60*60*24)/(60*60))),o=f(()=>Math.floor(e.value%(60*60)/60));return{seconds:f(()=>Math.floor(e.value%60)),minutes:o,hours:r,days:s}}static getSecondsFromExpiry(t,e){const s=new Date().getTime(),r=t-s;if(r>0){const o=r/1e3;return e?Math.round(o):o}return 0}static getSecondsFromPrevTime(t,e){const r=new Date().getTime()-t;if(r>0){const o=r/1e3;return e?Math.round(o):o}return 0}static getSecondsFromTimeNow(){const t=new Date,e=t.getTime(),s=t.getTimezoneOffset()*60;return e/1e3-s}static getFormattedTimeFromSeconds(t,e){const{seconds:s,minutes:r,hours:o}=l.getTimeFromSeconds(t),a=f(()=>e==="12-hour"?o.value>=12?"pm":"am":""),h=f(()=>e==="12-hour"?o.value%12:o.value);return{seconds:s,minutes:r,hours:h,ampm:a}}}class Z{static expiryTimestamp(t){const e=new Date(t).getTime()>0;return e||console.warn("vue-timer-hook: { useTimer } Invalid expiryTimestamp settings",t),e}}const ee=n=>typeof n=="number";function I(n,t){let e;const s=()=>{!e||(clearInterval(e),e=void 0)},r=o=>(s(),!o&&!t?void 0:e=setInterval(n,o||t));return ee(t)&&r(),{remove:s,start:r}}const C=1e3;function V(n){if(!Z.expiryTimestamp(n))return null;const t=l.getSecondsFromExpiry(n),e=Math.floor((t-Math.floor(t))*1e3);return e>0?e:C}const L=(n=60,t=!0)=>{let e;const s=Y({expiryTimestamp:n,seconds:l.getSecondsFromExpiry(n),isRunning:t,isExpired:!1,didStart:t,delay:V(n)});function r(){s.isExpired=!0,s.isRunning=!1,s.delay=null,e&&e.remove()}function o(){s.isRunning=!1,e&&e.remove()}function a(m=n,S=!0){o(),s.delay=V(m),s.didStart=S,s.isExpired=!1,s.expiryTimestamp=m,s.seconds=l.getSecondsFromExpiry(m),s.didStart&&y()}function h(){const m=new Date,S=m.setMilliseconds(m.getMilliseconds()+s.seconds*1e3);a(S)}function y(){s.didStart?(s.seconds=l.getSecondsFromExpiry(s.expiryTimestamp),s.isRunning=!0,e=I(()=>{s.delay!==C&&(s.delay=C);const m=l.getSecondsFromExpiry(s.expiryTimestamp);s.seconds=m,m<=0&&r()},s.isRunning?s.delay:null)):h()}return a(n,t),F(T({},l.getTimeFromSeconds(N(s,"seconds"))),{start:y,pause:o,resume:h,restart:a,isRunning:N(s,"isRunning"),isExpired:N(s,"isExpired")})},q=()=>new Date().getTime(),te=(n=60,t=!0)=>{let e;const s=$(n),r=$(q()),o=$(s.value+l.getSecondsFromPrevTime(r.value||0,!0)),a=$(t);function h(){r.value=q(),a.value=!0,o.value=s.value+l.getSecondsFromPrevTime(r.value,!0),e=I(()=>{o.value=s.value+l.getSecondsFromPrevTime(r.value,!0)},a.value?1e3:!1)}function y(){s.value=o.value,a.value=!1,e&&e.remove()}function m(S=0,U=!0){y(),a.value=U,s.value=S,o.value=+s.value,l.getSecondsFromPrevTime(r.value,!0),a.value&&h()}return a.value&&h(),F(T({},l.getTimeFromSeconds(o)),{start:h,pause:y,reset:m,isRunning:a})},se=(n="24-hour")=>{const t=$(l.getSecondsFromTimeNow());return I(()=>{t.value=l.getSecondsFromTimeNow()},1e3),T({},l.getFormattedTimeFromSeconds(t,n))};var x=(n,t)=>{const e=n.__vccOpts||n;for(const[s,r]of t)e[s]=r;return e};const ne={class:"container"},oe={class:"title"},re={class:"digital-container"},ie={class:"single-digit"},ae={class:"single-digit"},ue={props:{digit:{type:Number,require:!0},title:{type:String,require:!1}},setup(n){const t=n,e=f(()=>t.digit.value>=10?t.digit.value.toString()[0]:"0"),s=f(()=>t.digit.value>=10?t.digit.value.toString()[1]:t.digit.value.toString());return(r,o)=>(v(),g("div",ne,[i("span",oe,E(n.title),1),i("div",re,[i("span",ie,E(u(e)),1),i("span",ae,E(u(s)),1)])]))}};var b=x(ue,[["__scopeId","data-v-819ee750"]]);const w=n=>(A("data-v-12fd98b4"),n=n(),O(),n),ce={class:"timer-container"},le={key:1,class:"separator-container"},de=w(()=>i("span",{class:"separator"},null,-1)),me=w(()=>i("span",null,null,-1)),pe=[de,me],_e=w(()=>i("span",{class:"separator-container"},[i("span",{class:"separator"}),i("span")],-1)),ve=w(()=>i("span",{class:"separator-container"},[i("span",{class:"separator"}),i("span")],-1)),fe=K({props:{days:{type:Number,required:!1},hours:{type:Number,required:!0},minutes:{type:Number,required:!0},seconds:{type:Number,required:!0}},setup(n){return(t,e)=>(v(),g("div",ce,[n.days?(v(),J(b,{key:0,digit:n.days,title:"DAYS"},null,8,["digit"])):P("",!0),n.days?(v(),g("span",le,pe)):P("",!0),c(b,{digit:n.hours,title:"HOURS"},null,8,["digit"]),_e,c(b,{digit:n.minutes,title:"MINUTES"},null,8,["digit"]),ve,c(b,{digit:n.seconds,title:"SECONDS"},null,8,["digit"])]))}});var k=x(fe,[["__scopeId","data-v-12fd98b4"]]);const ge=i("h2",null,"UseTime Demo",-1),he={setup(n){const t=se();return(e,s)=>(v(),g("div",null,[ge,i("div",null,[c(k,{seconds:u(t).seconds,minutes:u(t).minutes,hours:u(t).hours},null,8,["seconds","minutes","hours"])])]))}};const ye={},Se={class:"button"};function $e(n,t){return v(),g("button",Se,[Q(n.$slots,"default",{},void 0,!0)])}var _=x(ye,[["render",$e],["__scopeId","data-v-924d0444"]]);const Te=i("h2",null,"UseTimer Demo",-1),be=d("Start"),xe=d("Pause"),we=d("Resume"),ke=d(" Restart "),De={props:{expiryTimestamp:{type:Number,required:!0}},setup(n){const e=L(n.expiryTimestamp),s=()=>{const r=new Date;r.setSeconds(r.getSeconds()+600),e.restart(r)};return(r,o)=>(v(),g("div",null,[Te,c(k,{seconds:u(e).seconds,minutes:u(e).minutes,hours:u(e).hours,days:u(e).days},null,8,["seconds","minutes","hours","days"]),c(_,{type:"button",onClick:o[0]||(o[0]=a=>u(e).start())},{default:p(()=>[be]),_:1}),c(_,{type:"button",onClick:o[1]||(o[1]=a=>u(e).pause())},{default:p(()=>[xe]),_:1}),c(_,{type:"button",onClick:o[2]||(o[2]=a=>u(e).resume())},{default:p(()=>[we]),_:1}),c(_,{type:"button",onClick:o[3]||(o[3]=a=>s())},{default:p(()=>[ke]),_:1})]))}},Fe=i("h2",null,"UseTimer Demo ( autostart=false )",-1),Ne=d("Start"),Ee=d("Pause"),Ce=d("Resume"),Ie=d(" Restart "),Re={props:{expiryTimestamp:{type:Number,required:!0}},setup(n){const e=L(n.expiryTimestamp,!1),s=()=>{const r=new Date;r.setSeconds(r.getSeconds()+600),e.restart(r)};return(r,o)=>(v(),g("div",null,[Fe,c(k,{seconds:u(e).seconds,minutes:u(e).minutes,hours:u(e).hours,days:u(e).days},null,8,["seconds","minutes","hours","days"]),c(_,{type:"button",onClick:o[0]||(o[0]=a=>u(e).start())},{default:p(()=>[Ne]),_:1}),c(_,{type:"button",onClick:o[1]||(o[1]=a=>u(e).pause())},{default:p(()=>[Ee]),_:1}),c(_,{type:"button",onClick:o[2]||(o[2]=a=>u(e).resume())},{default:p(()=>[Ce]),_:1}),c(_,{type:"button",onClick:o[3]||(o[3]=a=>s())},{default:p(()=>[Ie]),_:1})]))}},Me=i("h2",null,"UseStopwatch Demo",-1),Pe=d("Start"),Ve=d("Pause"),qe=d("Reset"),Ae={setup(n){const t=te();return(e,s)=>(v(),g("div",null,[Me,c(k,{seconds:u(t).seconds,minutes:u(t).minutes,hours:u(t).hours},null,8,["seconds","minutes","hours"]),c(_,{onClick:s[0]||(s[0]=r=>u(t).start())},{default:p(()=>[Pe]),_:1}),c(_,{onClick:s[1]||(s[1]=r=>u(t).pause())},{default:p(()=>[Ve]),_:1}),c(_,{onClick:s[2]||(s[2]=r=>u(t).reset())},{default:p(()=>[qe]),_:1})]))}};const D=n=>(A("data-v-6384fb42"),n=n(),O(),n),Oe=D(()=>i("div",{class:"header-bg"},[i("div",{class:"container"},[i("div",{class:"header"},[i("h1",{class:"h1"},"vue-timer-hook"),i("div",null,[i("iframe",{src:"https://ghbtns.com/github-btn.html?user=riderx&repo=vue-timer-hook&type=star&count=true&size=large",frameborder:"0",scrolling:"0",width:"160",height:"30",title:"GitHub"}),i("iframe",{src:"https://ghbtns.com/github-btn.html?user=riderx&repo=vue-timer-hook&type=fork&count=true&size=large",frameborder:"0",scrolling:"0",width:"126",height:"30",title:"GitHub"})])])])],-1)),Le={class:"container"},Ue=D(()=>i("p",null,[d(" Vue timer hook is a custom "),i("a",{href:"https://v3.vuejs.org/guide/composition-api-introduction.html",target:"_blank"},"composition api"),d(" module built to handle timer, stopwatch, and time logic/state in your vue component. ")],-1)),Be=D(()=>i("div",{class:"separator"},null,-1)),ze=D(()=>i("div",{class:"separator"},null,-1)),He={setup(n){const t=new Date().setSeconds(new Date().getSeconds()+600);return(e,s)=>(v(),g("div",null,[Oe,i("div",Le,[Ue,c(De,{expiryTimestamp:u(t)},null,8,["expiryTimestamp"]),c(Re,{expiryTimestamp:u(t)},null,8,["expiryTimestamp"]),Be,c(Ae),ze,c(he)])]))}};var je=x(He,[["__scopeId","data-v-6384fb42"]]);const Ge=W(je);window.vm=Ge.mount("#app");
