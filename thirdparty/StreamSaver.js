/* global chrome location ReadableStream define MessageChannel TransformStream */
// https://github.com/jimmywarting/StreamSaver.js
// MIT License
((e,t)=>{"undefined"!=typeof module?module.exports=t():"function"==typeof define&&"object"==typeof define.amd?define(t):this.streamSaver=t()})(0,()=>{"use strict";const e="object"==typeof window?window:this;e.HTMLElement||console.warn("streamsaver is meant to run on browsers main thread");let t=null,a=!1;const r=e.WebStreamsPolyfill||{},n=e.isSecureContext;let o=/constructor/i.test(e.HTMLElement)||!!e.safari||!!e.WebKitPoint;const s=n||"MozAppearance"in document.documentElement.style?"iframe":"navigate",i={createWriteStream:function(r,m,d){let c={size:null,pathname:null,writableStrategy:void 0,readableStrategy:void 0},p=0,f=null,u=null,w=null;Number.isFinite(m)?([d,m]=[m,d],console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"),c.size=d,c.writableStrategy=m):m&&m.highWaterMark?(console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"),c.size=d,c.writableStrategy=m):c=m||{};if(!o){t||(t=n?l(i.mitm):function(t){const a=document.createDocumentFragment(),r={frame:e.open(t,"popup","width=200,height=100"),loaded:!1,isIframe:!1,isPopup:!0,remove(){r.frame.close()},addEventListener(...e){a.addEventListener(...e)},dispatchEvent(...e){a.dispatchEvent(...e)},removeEventListener(...e){a.removeEventListener(...e)},postMessage(...e){r.frame.postMessage(...e)}},n=t=>{t.source===r.frame&&(r.loaded=!0,e.removeEventListener("message",n),r.dispatchEvent(new Event("load")))};return e.addEventListener("message",n),r}(i.mitm)),u=new MessageChannel,r=encodeURIComponent(r.replace(/\//g,":")).replace(/['()]/g,escape).replace(/\*/g,"%2A");const o={transferringReadable:a,pathname:c.pathname||Math.random().toString().slice(-6)+"/"+r,headers:{"Content-Type":"application/octet-stream; charset=utf-8","Content-Disposition":"attachment; filename*=UTF-8''"+r}};c.size&&(o.headers["Content-Length"]=c.size);const m=[o,"*",[u.port2]];if(a){const e="iframe"===s?void 0:{transform(e,t){if(!(e instanceof Uint8Array))throw new TypeError("Can only wirte Uint8Arrays");p+=e.length,t.enqueue(e),f&&(location.href=f,f=null)},flush(){f&&(location.href=f)}},t=(w=new i.TransformStream(e,c.writableStrategy,c.readableStrategy)).readable;u.port1.postMessage({readableStream:t},[t])}u.port1.onmessage=(e=>{e.data.download&&("navigate"===s?(t.remove(),t=null,p?location.href=e.data.download:f=e.data.download):(t.isPopup&&(t.remove(),t=null,"iframe"===s&&l(i.mitm)),l(e.data.download)))}),t.loaded?t.postMessage(...m):t.addEventListener("load",()=>{t.postMessage(...m)},{once:!0})}let g=[];return!o&&w&&w.writable||new i.WritableStream({write(e){if(!(e instanceof Uint8Array))throw new TypeError("Can only wirte Uint8Arrays");o?g.push(e):(u.port1.postMessage(e),p+=e.length,f&&(location.href=f,f=null))},close(){if(o){const e=new Blob(g,{type:"application/octet-stream; charset=utf-8"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=r,t.click()}else u.port1.postMessage("end")},abort(){g=[],u.port1.postMessage("abort"),u.port1.onmessage=null,u.port1.close(),u.port2.close(),u=null}},c.writableStrategy)},WritableStream:e.WritableStream||r.WritableStream,supported:!0,version:{full:"2.0.5",major:2,minor:0,dot:5},mitm:"./thirdparty/mitm.html?version=2.0.0"};function l(e){if(!e)throw new Error("meh");const t=document.createElement("iframe");return t.hidden=!0,t.src=e,t.loaded=!1,t.name="iframe",t.isIframe=!0,t.postMessage=((...e)=>t.contentWindow.postMessage(...e)),t.addEventListener("load",()=>{t.loaded=!0},{once:!0}),document.body.appendChild(t),t}try{new Response(new ReadableStream),!n||"serviceWorker"in navigator||(o=!0)}catch(e){o=!0}return(e=>{try{e()}catch(e){}})(()=>{const{readable:e}=new TransformStream,t=new MessageChannel;t.port1.postMessage(e,[e]),t.port1.close(),t.port2.close(),a=!0,Object.defineProperty(i,"TransformStream",{configurable:!1,writable:!1,value:TransformStream})}),i});