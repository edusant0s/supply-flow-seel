const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AlertasPage-DppFXIml.js","assets/supabase-BTP2KvF4.js","assets/DataTable-CRNyrPzJ.js","assets/KpiCard-A1V6anUm.js","assets/orcamentos-BOSfkVVL.js","assets/circle-check-BasiH6s0.js","assets/clock-3-CnTisZNP.js","assets/search-BSErrEZP.js","assets/RequisicoesPage-Dl--twYp.js","assets/RoleGate-C0pPU4kX.js","assets/spreadsheet-C3v9nPn0.js","assets/admin-BPa3XNmV.js","assets/download-B_8Bnq5O.js","assets/plus-DRpUx4PL.js","assets/OrcamentosPage-B0iz2HNn.js","assets/target-C2OfzCi-.js","assets/trash-2-CCoXArRP.js","assets/ContratosPage-Q7ygJ3vX.js","assets/FretesPage-DCN6s7ta.js","assets/NotaFiscalPage-DmIvZo8_.js","assets/EstoqueObrasPage-DADk72_A.js","assets/CadastroMateriaisPage-XDc3jW4x.js","assets/FrotaPage-Pjc7xlF6.js","assets/FornecedoresPage-HJv0MS8O.js","assets/CadastroFornecedoresPage-BQvDaIOm.js","assets/AvaliacaoFornecedoresPage-FlQCUA86.js","assets/ImportacoesPage-DSkcCSQW.js","assets/UsuariosPage-JssWUxrQ.js","assets/SettingsPage-DTNQSFqB.js","assets/ChangePasswordPage-BUtgboHN.js","assets/DashboardPage-J7EI9Qu7.js"])))=>i.map(i=>d[i]);
import{c as e,d as t,i as n,l as r,n as i,o as a,s as o,t as s,u as c}from"./supabase-BTP2KvF4.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=c((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=typeof setTimeout==`function`?setTimeout:null,_=typeof clearTimeout==`function`?clearTimeout:null,v=typeof setImmediate<`u`?setImmediate:null;typeof navigator<`u`&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function b(e){if(h=!1,y(e),!m)if(n(c)!==null)m=!0,ae(x);else{var t=n(l);t!==null&&oe(b,t.startTime-e)}}function x(t,i){m=!1,h&&(h=!1,_(w),w=-1),p=!0;var a=f;try{for(y(i),d=n(c);d!==null&&(!(d.expirationTime>i)||t&&!ee());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=i);i=e.unstable_now(),typeof s==`function`?d.callback=s:d===n(c)&&r(c),y(i)}else r(c);d=n(c)}if(d!==null)var u=!0;else{var g=n(l);g!==null&&oe(b,g.startTime-i),u=!1}return u}finally{d=null,f=a,p=!1}}var S=!1,C=null,w=-1,T=5,E=-1;function ee(){return!(e.unstable_now()-E<T)}function te(){if(C!==null){var t=e.unstable_now();E=t;var n=!0;try{n=C(!0,t)}finally{n?ne():(S=!1,C=null)}}else S=!1}var ne;if(typeof v==`function`)ne=function(){v(te)};else if(typeof MessageChannel<`u`){var re=new MessageChannel,ie=re.port2;re.port1.onmessage=te,ne=function(){ie.postMessage(null)}}else ne=function(){g(te,0)};function ae(e){C=e,S||(S=!0,ne())}function oe(t,n){w=g(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_continueExecution=function(){m||p||(m=!0,ae(x))},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):T=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(_(w),w=-1):h=!0,oe(b,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,ae(x))),r},e.unstable_shouldYield=ee,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),u=c(((e,t)=>{t.exports=l()})),d=c((e=>{var t=r(),n=u();function i(e){for(var t=`https://reactjs.org/docs/error-decoder.html?invariant=`+e,n=1;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n]);return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}var a=new Set,o={};function s(e,t){c(e,t),c(e+`Capture`,t)}function c(e,t){for(o[e]=t,e=0;e<t.length;e++)a.add(t[e])}var l=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),d=Object.prototype.hasOwnProperty,f=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,p={},m={};function h(e){return d.call(m,e)?!0:d.call(p,e)?!1:f.test(e)?m[e]=!0:(p[e]=!0,!1)}function g(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case`function`:case`symbol`:return!0;case`boolean`:return r?!1:n===null?(e=e.toLowerCase().slice(0,5),e!==`data-`&&e!==`aria-`):!n.acceptsBooleans;default:return!1}}function _(e,t,n,r){if(t==null||g(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function v(e,t,n,r,i,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var y={};`children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style`.split(` `).forEach(function(e){y[e]=new v(e,0,!1,e,null,!1,!1)}),[[`acceptCharset`,`accept-charset`],[`className`,`class`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`]].forEach(function(e){var t=e[0];y[t]=new v(t,1,!1,e[1],null,!1,!1)}),[`contentEditable`,`draggable`,`spellCheck`,`value`].forEach(function(e){y[e]=new v(e,2,!1,e.toLowerCase(),null,!1,!1)}),[`autoReverse`,`externalResourcesRequired`,`focusable`,`preserveAlpha`].forEach(function(e){y[e]=new v(e,2,!1,e,null,!1,!1)}),`allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope`.split(` `).forEach(function(e){y[e]=new v(e,3,!1,e.toLowerCase(),null,!1,!1)}),[`checked`,`multiple`,`muted`,`selected`].forEach(function(e){y[e]=new v(e,3,!0,e,null,!1,!1)}),[`capture`,`download`].forEach(function(e){y[e]=new v(e,4,!1,e,null,!1,!1)}),[`cols`,`rows`,`size`,`span`].forEach(function(e){y[e]=new v(e,6,!1,e,null,!1,!1)}),[`rowSpan`,`start`].forEach(function(e){y[e]=new v(e,5,!1,e.toLowerCase(),null,!1,!1)});var b=/[\-:]([a-z])/g;function x(e){return e[1].toUpperCase()}`accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height`.split(` `).forEach(function(e){var t=e.replace(b,x);y[t]=new v(t,1,!1,e,null,!1,!1)}),`xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type`.split(` `).forEach(function(e){var t=e.replace(b,x);y[t]=new v(t,1,!1,e,`http://www.w3.org/1999/xlink`,!1,!1)}),[`xml:base`,`xml:lang`,`xml:space`].forEach(function(e){var t=e.replace(b,x);y[t]=new v(t,1,!1,e,`http://www.w3.org/XML/1998/namespace`,!1,!1)}),[`tabIndex`,`crossOrigin`].forEach(function(e){y[e]=new v(e,1,!1,e.toLowerCase(),null,!1,!1)}),y.xlinkHref=new v(`xlinkHref`,1,!1,`xlink:href`,`http://www.w3.org/1999/xlink`,!0,!1),[`src`,`href`,`action`,`formAction`].forEach(function(e){y[e]=new v(e,1,!1,e.toLowerCase(),null,!0,!0)});function S(e,t,n,r){var i=y.hasOwnProperty(t)?y[t]:null;(i===null?r||!(2<t.length)||t[0]!==`o`&&t[0]!==`O`||t[1]!==`n`&&t[1]!==`N`:i.type!==0)&&(_(t,n,i,r)&&(n=null),r||i===null?h(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,``+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:``:n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&!0===n?``:``+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var C=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,w=Symbol.for(`react.element`),T=Symbol.for(`react.portal`),E=Symbol.for(`react.fragment`),ee=Symbol.for(`react.strict_mode`),te=Symbol.for(`react.profiler`),ne=Symbol.for(`react.provider`),re=Symbol.for(`react.context`),ie=Symbol.for(`react.forward_ref`),ae=Symbol.for(`react.suspense`),oe=Symbol.for(`react.suspense_list`),se=Symbol.for(`react.memo`),ce=Symbol.for(`react.lazy`),le=Symbol.for(`react.offscreen`),ue=Symbol.iterator;function de(e){return typeof e!=`object`||!e?null:(e=ue&&e[ue]||e[`@@iterator`],typeof e==`function`?e:null)}var D=Object.assign,fe;function pe(e){if(fe===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);fe=t&&t[1]||``}return`
`+fe+e}var me=!1;function he(e,t){if(!e||me)return``;me=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(t,[])}catch(e){var r=e}Reflect.construct(e,[],t)}else{try{t.call()}catch(e){r=e}e.call(t.prototype)}else{try{throw Error()}catch(e){r=e}e()}}catch(t){if(t&&r&&typeof t.stack==`string`){for(var i=t.stack.split(`
`),a=r.stack.split(`
`),o=i.length-1,s=a.length-1;1<=o&&0<=s&&i[o]!==a[s];)s--;for(;1<=o&&0<=s;o--,s--)if(i[o]!==a[s]){if(o!==1||s!==1)do if(o--,s--,0>s||i[o]!==a[s]){var c=`
`+i[o].replace(` at new `,` at `);return e.displayName&&c.includes(`<anonymous>`)&&(c=c.replace(`<anonymous>`,e.displayName)),c}while(1<=o&&0<=s);break}}}finally{me=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:``)?pe(e):``}function ge(e){switch(e.tag){case 5:return pe(e.type);case 16:return pe(`Lazy`);case 13:return pe(`Suspense`);case 19:return pe(`SuspenseList`);case 0:case 2:case 15:return e=he(e.type,!1),e;case 11:return e=he(e.type.render,!1),e;case 1:return e=he(e.type,!0),e;default:return``}}function _e(e){if(e==null)return null;if(typeof e==`function`)return e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case E:return`Fragment`;case T:return`Portal`;case te:return`Profiler`;case ee:return`StrictMode`;case ae:return`Suspense`;case oe:return`SuspenseList`}if(typeof e==`object`)switch(e.$$typeof){case re:return(e.displayName||`Context`)+`.Consumer`;case ne:return(e._context.displayName||`Context`)+`.Provider`;case ie:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case se:return t=e.displayName||null,t===null?_e(e.type)||`Memo`:t;case ce:t=e._payload,e=e._init;try{return _e(e(t))}catch{}}return null}function ve(e){var t=e.type;switch(e.tag){case 24:return`Cache`;case 9:return(t.displayName||`Context`)+`.Consumer`;case 10:return(t._context.displayName||`Context`)+`.Provider`;case 18:return`DehydratedFragment`;case 11:return e=t.render,e=e.displayName||e.name||``,t.displayName||(e===``?`ForwardRef`:`ForwardRef(`+e+`)`);case 7:return`Fragment`;case 5:return t;case 4:return`Portal`;case 3:return`Root`;case 6:return`Text`;case 16:return _e(t);case 8:return t===ee?`StrictMode`:`Mode`;case 22:return`Offscreen`;case 12:return`Profiler`;case 21:return`Scope`;case 13:return`Suspense`;case 19:return`SuspenseList`;case 25:return`TracingMarker`;case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t==`function`)return t.displayName||t.name||null;if(typeof t==`string`)return t}return null}function ye(e){switch(typeof e){case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function be(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function xe(e){var t=be(e)?`checked`:`value`,n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=``+e[t];if(!e.hasOwnProperty(t)&&n!==void 0&&typeof n.get==`function`&&typeof n.set==`function`){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Se(e){e._valueTracker||=xe(e)}function Ce(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=be(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function we(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Te(e,t){var n=t.checked;return D({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Ee(e,t){var n=t.defaultValue==null?``:t.defaultValue,r=t.checked==null?t.defaultChecked:t.checked;n=ye(t.value==null?n:t.value),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type===`checkbox`||t.type===`radio`?t.checked!=null:t.value!=null}}function De(e,t){t=t.checked,t!=null&&S(e,`checked`,t,!1)}function Oe(e,t){De(e,t);var n=ye(t.value),r=t.type;if(n!=null)r===`number`?(n===0&&e.value===``||e.value!=n)&&(e.value=``+n):e.value!==``+n&&(e.value=``+n);else if(r===`submit`||r===`reset`){e.removeAttribute(`value`);return}t.hasOwnProperty(`value`)?Ae(e,t.type,n):t.hasOwnProperty(`defaultValue`)&&Ae(e,t.type,ye(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ke(e,t,n){if(t.hasOwnProperty(`value`)||t.hasOwnProperty(`defaultValue`)){var r=t.type;if(!(r!==`submit`&&r!==`reset`||t.value!==void 0&&t.value!==null))return;t=``+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==``&&(e.name=``),e.defaultChecked=!!e._wrapperState.initialChecked,n!==``&&(e.name=n)}function Ae(e,t,n){(t!==`number`||we(e.ownerDocument)!==e)&&(n==null?e.defaultValue=``+e._wrapperState.initialValue:e.defaultValue!==``+n&&(e.defaultValue=``+n))}var je=Array.isArray;function Me(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+ye(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Ne(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(i(91));return D({},t,{value:void 0,defaultValue:void 0,children:``+e._wrapperState.initialValue})}function Pe(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(i(92));if(je(n)){if(1<n.length)throw Error(i(93));n=n[0]}t=n}t??=``,n=t}e._wrapperState={initialValue:ye(n)}}function Fe(e,t){var n=ye(t.value),r=ye(t.defaultValue);n!=null&&(n=``+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=``+r)}function Ie(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==``&&t!==null&&(e.value=t)}function Le(e){switch(e){case`svg`:return`http://www.w3.org/2000/svg`;case`math`:return`http://www.w3.org/1998/Math/MathML`;default:return`http://www.w3.org/1999/xhtml`}}function Re(e,t){return e==null||e===`http://www.w3.org/1999/xhtml`?Le(t):e===`http://www.w3.org/2000/svg`&&t===`foreignObject`?`http://www.w3.org/1999/xhtml`:e}var ze,Be=function(e){return typeof MSApp<`u`&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!==`http://www.w3.org/2000/svg`||`innerHTML`in e)e.innerHTML=t;else{for(ze||=document.createElement(`div`),ze.innerHTML=`<svg>`+t.valueOf().toString()+`</svg>`,t=ze.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Ve(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var He={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ue=[`Webkit`,`ms`,`Moz`,`O`];Object.keys(He).forEach(function(e){Ue.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),He[t]=He[e]})});function We(e,t,n){return t==null||typeof t==`boolean`||t===``?``:n||typeof t!=`number`||t===0||He.hasOwnProperty(e)&&He[e]?(``+t).trim():t+`px`}function Ge(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=n.indexOf(`--`)===0,i=We(n,t[n],r);n===`float`&&(n=`cssFloat`),r?e.setProperty(n,i):e[n]=i}}var Ke=D({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function qe(e,t){if(t){if(Ke[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(i(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(i(60));if(typeof t.dangerouslySetInnerHTML!=`object`||!(`__html`in t.dangerouslySetInnerHTML))throw Error(i(61))}if(t.style!=null&&typeof t.style!=`object`)throw Error(i(62))}}function Je(e,t){if(e.indexOf(`-`)===-1)return typeof t.is==`string`;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Ye=null;function Xe(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ze=null,Qe=null,$e=null;function et(e){if(e=Yi(e)){if(typeof Ze!=`function`)throw Error(i(280));var t=e.stateNode;t&&(t=Xi(t),Ze(e.stateNode,e.type,t))}}function tt(e){Qe?$e?$e.push(e):$e=[e]:Qe=e}function nt(){if(Qe){var e=Qe,t=$e;if($e=Qe=null,et(e),t)for(e=0;e<t.length;e++)et(t[e])}}function rt(e,t){return e(t)}function it(){}var at=!1;function ot(e,t,n){if(at)return e(t,n);at=!0;try{return rt(e,t,n)}finally{at=!1,(Qe!==null||$e!==null)&&(it(),nt())}}function st(e,t){var n=e.stateNode;if(n===null)return null;var r=Xi(n);if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var ct=!1;if(l)try{var lt={};Object.defineProperty(lt,"passive",{get:function(){ct=!0}}),window.addEventListener(`test`,lt,lt),window.removeEventListener(`test`,lt,lt)}catch{ct=!1}function ut(e,t,n,r,i,a,o,s,c){var l=Array.prototype.slice.call(arguments,3);try{t.apply(n,l)}catch(e){this.onError(e)}}var dt=!1,ft=null,pt=!1,mt=null,ht={onError:function(e){dt=!0,ft=e}};function gt(e,t,n,r,i,a,o,s,c){dt=!1,ft=null,ut.apply(ht,arguments)}function _t(e,t,n,r,a,o,s,c,l){if(gt.apply(this,arguments),dt){if(dt){var u=ft;dt=!1,ft=null}else throw Error(i(198));pt||(pt=!0,mt=u)}}function vt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function O(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function yt(e){if(vt(e)!==e)throw Error(i(188))}function bt(e){var t=e.alternate;if(!t){if(t=vt(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var o=a.alternate;if(o===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return yt(a),e;if(o===r)return yt(a),t;o=o.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=o;else{for(var s=!1,c=a.child;c;){if(c===n){s=!0,n=a,r=o;break}if(c===r){s=!0,r=a,n=o;break}c=c.sibling}if(!s){for(c=o.child;c;){if(c===n){s=!0,n=o,r=a;break}if(c===r){s=!0,r=o,n=a;break}c=c.sibling}if(!s)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function xt(e){return e=bt(e),e===null?null:St(e)}function St(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=St(e);if(t!==null)return t;e=e.sibling}return null}var Ct=n.unstable_scheduleCallback,wt=n.unstable_cancelCallback,Tt=n.unstable_shouldYield,Et=n.unstable_requestPaint,k=n.unstable_now,Dt=n.unstable_getCurrentPriorityLevel,Ot=n.unstable_ImmediatePriority,kt=n.unstable_UserBlockingPriority,At=n.unstable_NormalPriority,jt=n.unstable_LowPriority,Mt=n.unstable_IdlePriority,Nt=null,Pt=null;function Ft(e){if(Pt&&typeof Pt.onCommitFiberRoot==`function`)try{Pt.onCommitFiberRoot(Nt,e,void 0,(e.current.flags&128)==128)}catch{}}var It=Math.clz32?Math.clz32:zt,Lt=Math.log,Rt=Math.LN2;function zt(e){return e>>>=0,e===0?32:31-(Lt(e)/Rt|0)|0}var Bt=64,Vt=4194304;function Ht(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ut(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var s=o&~i;s===0?(a&=o,a!==0&&(r=Ht(a))):r=Ht(s)}else o=n&~i,o===0?a!==0&&(r=Ht(a)):r=Ht(o);if(r===0)return 0;if(t!==0&&t!==r&&(t&i)===0&&(i=r&-r,a=t&-t,i>=a||i===16&&a&4194240))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-It(t),i=1<<n,r|=e[n],t&=~i;return r}function Wt(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Gt(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-It(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Wt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}}function Kt(e){return e=e.pendingLanes&-1073741825,e===0?e&1073741824?1073741824:0:e}function qt(){var e=Bt;return Bt<<=1,!(Bt&4194240)&&(Bt=64),e}function Jt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Yt(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-It(t),e[t]=n}function Xt(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-It(n),a=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~a}}function Zt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-It(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var A=0;function Qt(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var $t,en,tn,nn,rn,an=!1,on=[],sn=null,cn=null,ln=null,un=new Map,dn=new Map,fn=[],pn=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit`.split(` `);function mn(e,t){switch(e){case`focusin`:case`focusout`:sn=null;break;case`dragenter`:case`dragleave`:cn=null;break;case`mouseover`:case`mouseout`:ln=null;break;case`pointerover`:case`pointerout`:un.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:dn.delete(t.pointerId)}}function j(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Yi(t),t!==null&&en(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function hn(e,t,n,r,i){switch(t){case`focusin`:return sn=j(sn,e,t,n,r,i),!0;case`dragenter`:return cn=j(cn,e,t,n,r,i),!0;case`mouseover`:return ln=j(ln,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return un.set(a,j(un.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,dn.set(a,j(dn.get(a)||null,e,t,n,r,i)),!0}return!1}function gn(e){var t=Ji(e.target);if(t!==null){var n=vt(t);if(n!==null){if(t=n.tag,t===13){if(t=O(n),t!==null){e.blockedOn=t,rn(e.priority,function(){tn(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function _n(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=On(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Ye=r,n.target.dispatchEvent(r),Ye=null}else return t=Yi(n),t!==null&&en(t),e.blockedOn=n,!1;t.shift()}return!0}function vn(e,t,n){_n(e)&&n.delete(t)}function yn(){an=!1,sn!==null&&_n(sn)&&(sn=null),cn!==null&&_n(cn)&&(cn=null),ln!==null&&_n(ln)&&(ln=null),un.forEach(vn),dn.forEach(vn)}function bn(e,t){e.blockedOn===t&&(e.blockedOn=null,an||(an=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,yn)))}function xn(e){function t(t){return bn(t,e)}if(0<on.length){bn(on[0],e);for(var n=1;n<on.length;n++){var r=on[n];r.blockedOn===e&&(r.blockedOn=null)}}for(sn!==null&&bn(sn,e),cn!==null&&bn(cn,e),ln!==null&&bn(ln,e),un.forEach(t),dn.forEach(t),n=0;n<fn.length;n++)r=fn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<fn.length&&(n=fn[0],n.blockedOn===null);)gn(n),n.blockedOn===null&&fn.shift()}var Sn=C.ReactCurrentBatchConfig,Cn=!0;function wn(e,t,n,r){var i=A,a=Sn.transition;Sn.transition=null;try{A=1,En(e,t,n,r)}finally{A=i,Sn.transition=a}}function Tn(e,t,n,r){var i=A,a=Sn.transition;Sn.transition=null;try{A=4,En(e,t,n,r)}finally{A=i,Sn.transition=a}}function En(e,t,n,r){if(Cn){var i=On(e,t,n,r);if(i===null)bi(e,t,r,Dn,n),mn(e,r);else if(hn(i,e,t,n,r))r.stopPropagation();else if(mn(e,r),t&4&&-1<pn.indexOf(e)){for(;i!==null;){var a=Yi(i);if(a!==null&&$t(a),a=On(e,t,n,r),a===null&&bi(e,t,r,Dn,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else bi(e,t,r,null,n)}}var Dn=null;function On(e,t,n,r){if(Dn=null,e=Xe(r),e=Ji(e),e!==null)if(t=vt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=O(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Dn=e,null}function kn(e){switch(e){case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 1;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`toggle`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 4;case`message`:switch(Dt()){case Ot:return 1;case kt:return 4;case At:case jt:return 16;case Mt:return 536870912;default:return 16}default:return 16}}var An=null,jn=null,Mn=null;function Nn(){if(Mn)return Mn;var e,t=jn,n=t.length,r,i=`value`in An?An.value:An.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Mn=i.slice(e,1<r?1-r:void 0)}function Pn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Fn(){return!0}function In(){return!1}function Ln(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Fn:In,this.isPropagationStopped=In,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Fn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Fn)},persist:function(){},isPersistent:Fn}),t}var Rn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},zn=Ln(Rn),Bn=D({},Rn,{view:0,detail:0}),Vn=Ln(Bn),Hn,Un,Wn,Gn=D({},Bn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Wn&&(Wn&&e.type===`mousemove`?(Hn=e.screenX-Wn.screenX,Un=e.screenY-Wn.screenY):Un=Hn=0,Wn=e),Hn)},movementY:function(e){return`movementY`in e?e.movementY:Un}}),Kn=Ln(Gn),qn=Ln(D({},Gn,{dataTransfer:0})),Jn=Ln(D({},Bn,{relatedTarget:0})),Yn=Ln(D({},Rn,{animationName:0,elapsedTime:0,pseudoElement:0})),Xn=Ln(D({},Rn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Zn=Ln(D({},Rn,{data:0})),Qn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},$n={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},er={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function tr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=er[e])?!!t[e]:!1}function nr(){return tr}var rr=Ln(D({},Bn,{key:function(e){if(e.key){var t=Qn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Pn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?$n[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nr,charCode:function(e){return e.type===`keypress`?Pn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Pn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),ir=Ln(D({},Gn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),ar=Ln(D({},Bn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nr})),or=Ln(D({},Rn,{propertyName:0,elapsedTime:0,pseudoElement:0})),sr=Ln(D({},Gn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),cr=[9,13,27,32],lr=l&&`CompositionEvent`in window,ur=null;l&&`documentMode`in document&&(ur=document.documentMode);var dr=l&&`TextEvent`in window&&!ur,fr=l&&(!lr||ur&&8<ur&&11>=ur),pr=` `,mr=!1;function hr(e,t){switch(e){case`keyup`:return cr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function gr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var _r=!1;function vr(e,t){switch(e){case`compositionend`:return gr(t);case`keypress`:return t.which===32?(mr=!0,pr):null;case`textInput`:return e=t.data,e===pr&&mr?null:e;default:return null}}function yr(e,t){if(_r)return e===`compositionend`||!lr&&hr(e,t)?(e=Nn(),Mn=jn=An=null,_r=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return fr&&t.locale!==`ko`?null:t.data;default:return null}}var br={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!br[e.type]:t===`textarea`}function Sr(e,t,n,r){tt(r),t=Si(t,`onChange`),0<t.length&&(n=new zn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Cr=null,wr=null;function Tr(e){hi(e,0)}function Er(e){if(Ce(P(e)))return e}function Dr(e,t){if(e===`change`)return t}var Or=!1;if(l){var kr;if(l){var Ar=`oninput`in document;if(!Ar){var jr=document.createElement(`div`);jr.setAttribute(`oninput`,`return;`),Ar=typeof jr.oninput==`function`}kr=Ar}else kr=!1;Or=kr&&(!document.documentMode||9<document.documentMode)}function Mr(){Cr&&(Cr.detachEvent(`onpropertychange`,Nr),wr=Cr=null)}function Nr(e){if(e.propertyName===`value`&&Er(wr)){var t=[];Sr(t,wr,e,Xe(e)),ot(Tr,t)}}function Pr(e,t,n){e===`focusin`?(Mr(),Cr=t,wr=n,Cr.attachEvent(`onpropertychange`,Nr)):e===`focusout`&&Mr()}function Fr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Er(wr)}function M(e,t){if(e===`click`)return Er(t)}function Ir(e,t){if(e===`input`||e===`change`)return Er(t)}function Lr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Rr=typeof Object.is==`function`?Object.is:Lr;function zr(e,t){if(Rr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!d.call(t,i)||!Rr(e[i],t[i]))return!1}return!0}function Br(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Vr(e,t){var n=Br(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Br(n)}}function Hr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Hr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ur(){for(var e=window,t=we();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=we(e.document)}return t}function Wr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}function Gr(e){var t=Ur(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Hr(n.ownerDocument.documentElement,n)){if(r!==null&&Wr(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),`selectionStart`in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,a=Math.min(r.start,i);r=r.end===void 0?a:Math.min(r.end,i),!e.extend&&a>r&&(i=r,r=a,a=i),i=Vr(n,a);var o=Vr(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus==`function`&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Kr=l&&`documentMode`in document&&11>=document.documentMode,qr=null,Jr=null,Yr=null,Xr=!1;function Zr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Xr||qr==null||qr!==we(r)||(r=qr,`selectionStart`in r&&Wr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Yr&&zr(Yr,r)||(Yr=r,r=Si(Jr,`onSelect`),0<r.length&&(t=new zn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=qr)))}function Qr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var $r={animationend:Qr(`Animation`,`AnimationEnd`),animationiteration:Qr(`Animation`,`AnimationIteration`),animationstart:Qr(`Animation`,`AnimationStart`),transitionend:Qr(`Transition`,`TransitionEnd`)},ei={},ti={};l&&(ti=document.createElement(`div`).style,`AnimationEvent`in window||(delete $r.animationend.animation,delete $r.animationiteration.animation,delete $r.animationstart.animation),`TransitionEvent`in window||delete $r.transitionend.transition);function ni(e){if(ei[e])return ei[e];if(!$r[e])return e;var t=$r[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ti)return ei[e]=t[n];return e}var ri=ni(`animationend`),ii=ni(`animationiteration`),ai=ni(`animationstart`),oi=ni(`transitionend`),si=new Map,ci=`abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);function li(e,t){si.set(e,t),s(t,[e])}for(var ui=0;ui<ci.length;ui++){var di=ci[ui];li(di.toLowerCase(),`on`+(di[0].toUpperCase()+di.slice(1)))}li(ri,`onAnimationEnd`),li(ii,`onAnimationIteration`),li(ai,`onAnimationStart`),li(`dblclick`,`onDoubleClick`),li(`focusin`,`onFocus`),li(`focusout`,`onBlur`),li(oi,`onTransitionEnd`),c(`onMouseEnter`,[`mouseout`,`mouseover`]),c(`onMouseLeave`,[`mouseout`,`mouseover`]),c(`onPointerEnter`,[`pointerout`,`pointerover`]),c(`onPointerLeave`,[`pointerout`,`pointerover`]),s(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),s(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),s(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),s(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),s(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),s(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var fi=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),pi=new Set(`cancel close invalid load scroll toggle`.split(` `).concat(fi));function mi(e,t,n){var r=e.type||`unknown-event`;e.currentTarget=n,_t(r,t,void 0,e),e.currentTarget=null}function hi(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;mi(i,s,l),a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;mi(i,s,l),a=c}}}if(pt)throw e=mt,pt=!1,mt=null,e}function N(e,t){var n=t[Gi];n===void 0&&(n=t[Gi]=new Set);var r=e+`__bubble`;n.has(r)||(yi(t,e,2,!1),n.add(r))}function gi(e,t,n){var r=0;t&&(r|=4),yi(n,e,r,t)}var _i=`_reactListening`+Math.random().toString(36).slice(2);function vi(e){if(!e[_i]){e[_i]=!0,a.forEach(function(t){t!==`selectionchange`&&(pi.has(t)||gi(t,!1,e),gi(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[_i]||(t[_i]=!0,gi(`selectionchange`,!1,t))}}function yi(e,t,n,r){switch(kn(t)){case 1:var i=wn;break;case 4:i=Tn;break;default:i=En}n=i.bind(null,t,n,e),i=void 0,!ct||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function bi(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i||s.nodeType===8&&s.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;o=o.return}for(;s!==null;){if(o=Ji(s),o===null)return;if(c=o.tag,c===5||c===6){r=a=o;continue a}s=s.parentNode}}r=r.return}ot(function(){var r=a,i=Xe(n),o=[];a:{var s=si.get(e);if(s!==void 0){var c=zn,l=e;switch(e){case`keypress`:if(Pn(n)===0)break a;case`keydown`:case`keyup`:c=rr;break;case`focusin`:l=`focus`,c=Jn;break;case`focusout`:l=`blur`,c=Jn;break;case`beforeblur`:case`afterblur`:c=Jn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:c=Kn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:c=qn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:c=ar;break;case ri:case ii:case ai:c=Yn;break;case oi:c=or;break;case`scroll`:c=Vn;break;case`wheel`:c=sr;break;case`copy`:case`cut`:case`paste`:c=Xn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:c=ir}var u=(t&4)!=0,d=!u&&e===`scroll`,f=u?s===null?null:s+`Capture`:s;u=[];for(var p=r,m;p!==null;){m=p;var h=m.stateNode;if(m.tag===5&&h!==null&&(m=h,f!==null&&(h=st(p,f),h!=null&&u.push(xi(p,h,m)))),d)break;p=p.return}0<u.length&&(s=new c(s,l,null,n,i),o.push({event:s,listeners:u}))}}if(!(t&7)){a:{if(s=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,s&&n!==Ye&&(l=n.relatedTarget||n.fromElement)&&(Ji(l)||l[Wi]))break a;if((c||s)&&(s=i.window===i?i:(s=i.ownerDocument)?s.defaultView||s.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Ji(l):null,l!==null&&(d=vt(l),l!==d||l.tag!==5&&l.tag!==6)&&(l=null)):(c=null,l=r),c!==l)){if(u=Kn,h=`onMouseLeave`,f=`onMouseEnter`,p=`mouse`,(e===`pointerout`||e===`pointerover`)&&(u=ir,h=`onPointerLeave`,f=`onPointerEnter`,p=`pointer`),d=c==null?s:P(c),m=l==null?s:P(l),s=new u(h,p+`leave`,c,n,i),s.target=d,s.relatedTarget=m,h=null,Ji(i)===r&&(u=new u(f,p+`enter`,l,n,i),u.target=m,u.relatedTarget=d,h=u),d=h,c&&l)b:{for(u=c,f=l,p=0,m=u;m;m=Ci(m))p++;for(m=0,h=f;h;h=Ci(h))m++;for(;0<p-m;)u=Ci(u),p--;for(;0<m-p;)f=Ci(f),m--;for(;p--;){if(u===f||f!==null&&u===f.alternate)break b;u=Ci(u),f=Ci(f)}u=null}else u=null;c!==null&&wi(o,s,c,u,!1),l!==null&&d!==null&&wi(o,d,l,u,!0)}}a:{if(s=r?P(r):window,c=s.nodeName&&s.nodeName.toLowerCase(),c===`select`||c===`input`&&s.type===`file`)var g=Dr;else if(xr(s))if(Or)g=Ir;else{g=Fr;var _=Pr}else (c=s.nodeName)&&c.toLowerCase()===`input`&&(s.type===`checkbox`||s.type===`radio`)&&(g=M);if(g&&=g(e,r)){Sr(o,g,n,i);break a}_&&_(e,s,r),e===`focusout`&&(_=s._wrapperState)&&_.controlled&&s.type===`number`&&Ae(s,`number`,s.value)}switch(_=r?P(r):window,e){case`focusin`:(xr(_)||_.contentEditable===`true`)&&(qr=_,Jr=r,Yr=null);break;case`focusout`:Yr=Jr=qr=null;break;case`mousedown`:Xr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Xr=!1,Zr(o,n,i);break;case`selectionchange`:if(Kr)break;case`keydown`:case`keyup`:Zr(o,n,i)}var v;if(lr)b:{switch(e){case`compositionstart`:var y=`onCompositionStart`;break b;case`compositionend`:y=`onCompositionEnd`;break b;case`compositionupdate`:y=`onCompositionUpdate`;break b}y=void 0}else _r?hr(e,n)&&(y=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(y=`onCompositionStart`);y&&(fr&&n.locale!==`ko`&&(_r||y!==`onCompositionStart`?y===`onCompositionEnd`&&_r&&(v=Nn()):(An=i,jn=`value`in An?An.value:An.textContent,_r=!0)),_=Si(r,y),0<_.length&&(y=new Zn(y,e,null,n,i),o.push({event:y,listeners:_}),v?y.data=v:(v=gr(n),v!==null&&(y.data=v)))),(v=dr?vr(e,n):yr(e,n))&&(r=Si(r,`onBeforeInput`),0<r.length&&(i=new Zn(`onBeforeInput`,`beforeinput`,null,n,i),o.push({event:i,listeners:r}),i.data=v))}hi(o,t)})}function xi(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Si(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;i.tag===5&&a!==null&&(i=a,a=st(e,n),a!=null&&r.unshift(xi(e,a,i)),a=st(e,t),a!=null&&r.push(xi(e,a,i))),e=e.return}return r}function Ci(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function wi(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(c!==null&&c===r)break;s.tag===5&&l!==null&&(s=l,i?(c=st(n,a),c!=null&&o.unshift(xi(n,c,s))):i||(c=st(n,a),c!=null&&o.push(xi(n,c,s)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Ti=/\r\n?/g,Ei=/\u0000|\uFFFD/g;function Di(e){return(typeof e==`string`?e:``+e).replace(Ti,`
`).replace(Ei,``)}function Oi(e,t,n){if(t=Di(t),Di(e)!==t&&n)throw Error(i(425))}function ki(){}var Ai=null,ji=null;function Mi(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ni=typeof setTimeout==`function`?setTimeout:void 0,Pi=typeof clearTimeout==`function`?clearTimeout:void 0,Fi=typeof Promise==`function`?Promise:void 0,Ii=typeof queueMicrotask==`function`?queueMicrotask:Fi===void 0?Ni:function(e){return Fi.resolve(null).then(e).catch(Li)};function Li(e){setTimeout(function(){throw e})}function Ri(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`){if(r===0){e.removeChild(i),xn(t);return}r--}else n!==`$`&&n!==`$?`&&n!==`$!`||r++;n=i}while(n);xn(t)}function zi(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`)break;if(t===`/$`)return null}}return e}function Bi(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`){if(t===0)return e;t--}else n===`/$`&&t++}e=e.previousSibling}return null}var Vi=Math.random().toString(36).slice(2),Hi=`__reactFiber$`+Vi,Ui=`__reactProps$`+Vi,Wi=`__reactContainer$`+Vi,Gi=`__reactEvents$`+Vi,Ki=`__reactListeners$`+Vi,qi=`__reactHandles$`+Vi;function Ji(e){var t=e[Hi];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Wi]||n[Hi]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Bi(e);e!==null;){if(n=e[Hi])return n;e=Bi(e)}return t}e=n,n=e.parentNode}return null}function Yi(e){return e=e[Hi]||e[Wi],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function P(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(i(33))}function Xi(e){return e[Ui]||null}var Zi=[],Qi=-1;function $i(e){return{current:e}}function F(e){0>Qi||(e.current=Zi[Qi],Zi[Qi]=null,Qi--)}function I(e,t){Qi++,Zi[Qi]=e.current,e.current=t}var ea={},L=$i(ea),ta=$i(!1),na=ea;function R(e,t){var n=e.type.contextTypes;if(!n)return ea;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},a;for(a in n)i[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function z(e){return e=e.childContextTypes,e!=null}function ra(){F(ta),F(L)}function ia(e,t,n){if(L.current!==ea)throw Error(i(168));I(L,t),I(ta,n)}function aa(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!=`function`)return n;for(var a in r=r.getChildContext(),r)if(!(a in t))throw Error(i(108,ve(e)||`Unknown`,a));return D({},n,r)}function oa(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||ea,na=L.current,I(L,e),I(ta,ta.current),!0}function sa(e,t,n){var r=e.stateNode;if(!r)throw Error(i(169));n?(e=aa(e,t,na),r.__reactInternalMemoizedMergedChildContext=e,F(ta),F(L),I(L,e)):F(ta),I(ta,n)}var ca=null,la=!1,ua=!1;function da(e){ca===null?ca=[e]:ca.push(e)}function fa(e){la=!0,da(e)}function pa(){if(!ua&&ca!==null){ua=!0;var e=0,t=A;try{var n=ca;for(A=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ca=null,la=!1}catch(t){throw ca!==null&&(ca=ca.slice(e+1)),Ct(Ot,pa),t}finally{A=t,ua=!1}}return null}var ma=[],ha=0,ga=null,_a=0,va=[],ya=0,ba=null,xa=1,Sa=``;function Ca(e,t){ma[ha++]=_a,ma[ha++]=ga,ga=e,_a=t}function wa(e,t,n){va[ya++]=xa,va[ya++]=Sa,va[ya++]=ba,ba=e;var r=xa;e=Sa;var i=32-It(r)-1;r&=~(1<<i),n+=1;var a=32-It(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,xa=1<<32-It(t)+i|n<<i|r,Sa=a+e}else xa=1<<a|n<<i|r,Sa=e}function Ta(e){e.return!==null&&(Ca(e,1),wa(e,1,0))}function Ea(e){for(;e===ga;)ga=ma[--ha],ma[ha]=null,_a=ma[--ha],ma[ha]=null;for(;e===ba;)ba=va[--ya],va[ya]=null,Sa=va[--ya],va[ya]=null,xa=va[--ya],va[ya]=null}var Da=null,B=null,V=!1,Oa=null;function ka(e,t){var n=Kl(5,null,null,0);n.elementType=`DELETED`,n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Aa(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t===null?!1:(e.stateNode=t,Da=e,B=zi(t.firstChild),!0);case 6:return t=e.pendingProps===``||t.nodeType!==3?null:t,t===null?!1:(e.stateNode=t,Da=e,B=null,!0);case 13:return t=t.nodeType===8?t:null,t===null?!1:(n=ba===null?null:{id:xa,overflow:Sa},e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Kl(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Da=e,B=null,!0);default:return!1}}function ja(e){return(e.mode&1)!=0&&(e.flags&128)==0}function Ma(e){if(V){var t=B;if(t){var n=t;if(!Aa(e,t)){if(ja(e))throw Error(i(418));t=zi(n.nextSibling);var r=Da;t&&Aa(e,t)?ka(r,n):(e.flags=e.flags&-4097|2,V=!1,Da=e)}}else{if(ja(e))throw Error(i(418));e.flags=e.flags&-4097|2,V=!1,Da=e}}}function Na(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Da=e}function Pa(e){if(e!==Da)return!1;if(!V)return Na(e),V=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!==`head`&&t!==`body`&&!Mi(e.type,e.memoizedProps)),t&&=B){if(ja(e))throw Fa(),Error(i(418));for(;t;)ka(e,t),t=zi(t.nextSibling)}if(Na(e),e.tag===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));a:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`){if(t===0){B=zi(e.nextSibling);break a}t--}else n!==`$`&&n!==`$!`&&n!==`$?`||t++}e=e.nextSibling}B=null}}else B=Da?zi(e.stateNode.nextSibling):null;return!0}function Fa(){for(var e=B;e;)e=zi(e.nextSibling)}function Ia(){B=Da=null,V=!1}function La(e){Oa===null?Oa=[e]:Oa.push(e)}var Ra=C.ReactCurrentBatchConfig;function za(e,t,n){if(e=n.ref,e!==null&&typeof e!=`function`&&typeof e!=`object`){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(i(309));var r=n.stateNode}if(!r)throw Error(i(147,e));var a=r,o=``+e;return t!==null&&t.ref!==null&&typeof t.ref==`function`&&t.ref._stringRef===o?t.ref:(t=function(e){var t=a.refs;e===null?delete t[o]:t[o]=e},t._stringRef=o,t)}if(typeof e!=`string`)throw Error(i(284));if(!n._owner)throw Error(i(290,e))}return e}function Ba(e,t){throw e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e))}function Va(e){var t=e._init;return t(e._payload)}function Ha(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;t!==null;)t.key===null?e.set(t.index,t):e.set(t.key,t),t=t.sibling;return e}function a(e,t){return e=Yl(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=2,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=2),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=$l(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===E?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ce&&Va(i)===t.type)?(r=a(t,n.props),r.ref=za(e,t,n),r.return=e,r):(r=Xl(n.type,n.key,n.props,null,e.mode,r),r.ref=za(e,t,n),r.return=e,r)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=eu(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Zl(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`)return t=$l(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case w:return n=Xl(t.type,t.key,t.props,null,e.mode,n),n.ref=za(e,null,t),n.return=e,n;case T:return t=eu(t,e.mode,n),t.return=e,t;case ce:var r=t._init;return f(e,r(t._payload),n)}if(je(t)||de(t))return t=Zl(t,e.mode,n,null),t.return=e,t;Ba(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case w:return n.key===i?l(e,t,n,r):null;case T:return n.key===i?u(e,t,n,r):null;case ce:return i=n._init,p(e,t,i(n._payload),r)}if(je(n)||de(n))return i===null?d(e,t,n,r,null):null;Ba(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case w:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case T:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ce:var a=r._init;return m(e,t,n,a(r._payload),i)}if(je(r)||de(r))return e=e.get(n)||null,d(t,e,r,i,null);Ba(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),V&&Ca(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return V&&Ca(i,h),l}for(d=r(i,d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),V&&Ca(i,h),l}function g(a,s,c,l){var u=de(c);if(typeof u!=`function`)throw Error(i(150));if(c=u.call(c),c==null)throw Error(i(151));for(var d=u=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),V&&Ca(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return V&&Ca(a,g),u}for(h=r(a,h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),V&&Ca(a,g),u}function _(e,r,i,o){if(typeof i==`object`&&i&&i.type===E&&i.key===null&&(i=i.props.children),typeof i==`object`&&i){switch(i.$$typeof){case w:a:{for(var c=i.key,l=r;l!==null;){if(l.key===c){if(c=i.type,c===E){if(l.tag===7){n(e,l.sibling),r=a(l,i.props.children),r.return=e,e=r;break a}}else if(l.elementType===c||typeof c==`object`&&c&&c.$$typeof===ce&&Va(c)===l.type){n(e,l.sibling),r=a(l,i.props),r.ref=za(e,l,i),r.return=e,e=r;break a}n(e,l);break}else t(e,l);l=l.sibling}i.type===E?(r=Zl(i.props.children,e.mode,o,i.key),r.return=e,e=r):(o=Xl(i.type,i.key,i.props,null,e.mode,o),o.ref=za(e,r,i),o.return=e,e=o)}return s(e);case T:a:{for(l=i.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===i.containerInfo&&r.stateNode.implementation===i.implementation){n(e,r.sibling),r=a(r,i.children||[]),r.return=e,e=r;break a}else{n(e,r);break}else t(e,r);r=r.sibling}r=eu(i,e.mode,o),r.return=e,e=r}return s(e);case ce:return l=i._init,_(e,r,l(i._payload),o)}if(je(i))return h(e,r,i,o);if(de(i))return g(e,r,i,o);Ba(e,i)}return typeof i==`string`&&i!==``||typeof i==`number`?(i=``+i,r!==null&&r.tag===6?(n(e,r.sibling),r=a(r,i),r.return=e,e=r):(n(e,r),r=$l(i,e.mode,o),r.return=e,e=r),s(e)):n(e,r)}return _}var Ua=Ha(!0),Wa=Ha(!1),Ga=$i(null),Ka=null,qa=null,Ja=null;function Ya(){Ja=qa=Ka=null}function Xa(e){var t=Ga.current;F(Ga),e._currentValue=t}function Za(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Qa(e,t){Ka=e,Ja=qa=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Rs=!0),e.firstContext=null)}function $a(e){var t=e._currentValue;if(Ja!==e)if(e={context:e,memoizedValue:t,next:null},qa===null){if(Ka===null)throw Error(i(308));qa=e,Ka.dependencies={lanes:0,firstContext:e}}else qa=qa.next=e;return t}var eo=null;function to(e){eo===null?eo=[e]:eo.push(e)}function no(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,to(t)):(n.next=i.next,i.next=n),t.interleaved=n,ro(e,r)}function ro(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var io=!1;function ao(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function oo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function so(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function co(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,J&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,ro(e,n)}return i=r.interleaved,i===null?(t.next=t,to(r)):(t.next=i.next,i.next=t),r.interleaved=t,ro(e,n)}function lo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194240)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Zt(e,n)}}function uo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function fo(e,t,n,r){var i=e.updateQueue;io=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane,p=s.eventTime;if((r&f)===f){u!==null&&(u=u.next={eventTime:p,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});a:{var m=e,h=s;switch(f=t,p=n,h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(p,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(p,d,f):m,f==null)break a;d=D({},d,f);break a;case 2:io=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,f=i.effects,f===null?i.effects=[s]:f.push(s))}else p={eventTime:p,lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;f=s,s=f.next,f.next=null,i.lastBaseUpdate=f,i.shared.pending=null}}while(1);if(u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else a===null&&(i.shared.lanes=0);Yc|=o,e.lanes=o,e.memoizedState=d}}function po(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=n,typeof a!=`function`)throw Error(i(191,a));a.call(r)}}}var mo={},ho=$i(mo),go=$i(mo),_o=$i(mo);function vo(e){if(e===mo)throw Error(i(174));return e}function yo(e,t){switch(I(_o,t),I(go,e),I(ho,mo),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Re(null,``);break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Re(t,e)}F(ho),I(ho,t)}function bo(){F(ho),F(go),F(_o)}function xo(e){vo(_o.current);var t=vo(ho.current),n=Re(t,e.type);t!==n&&(I(go,e),I(ho,n))}function So(e){go.current===e&&(F(ho),F(go))}var H=$i(0);function Co(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data===`$?`||n.data===`$!`))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var wo=[];function To(){for(var e=0;e<wo.length;e++)wo[e]._workInProgressVersionPrimary=null;wo.length=0}var Eo=C.ReactCurrentDispatcher,Do=C.ReactCurrentBatchConfig,Oo=0,U=null,W=null,G=null,ko=!1,Ao=!1,jo=0,Mo=0;function No(){throw Error(i(321))}function Po(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Rr(e[n],t[n]))return!1;return!0}function Fo(e,t,n,r,a,o){if(Oo=o,U=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Eo.current=e===null||e.memoizedState===null?vs:ys,e=n(r,a),Ao){o=0;do{if(Ao=!1,jo=0,25<=o)throw Error(i(301));o+=1,G=W=null,t.updateQueue=null,Eo.current=bs,e=n(r,a)}while(Ao)}if(Eo.current=_s,t=W!==null&&W.next!==null,Oo=0,G=W=U=null,ko=!1,t)throw Error(i(300));return e}function Io(){var e=jo!==0;return jo=0,e}function Lo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return G===null?U.memoizedState=G=e:G=G.next=e,G}function Ro(){if(W===null){var e=U.alternate;e=e===null?null:e.memoizedState}else e=W.next;var t=G===null?U.memoizedState:G.next;if(t!==null)G=t,W=e;else{if(e===null)throw Error(i(310));W=e,e={memoizedState:W.memoizedState,baseState:W.baseState,baseQueue:W.baseQueue,queue:W.queue,next:null},G===null?U.memoizedState=G=e:G=G.next=e}return G}function zo(e,t){return typeof t==`function`?t(e):t}function Bo(e){var t=Ro(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=W,a=r.baseQueue,o=n.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}r.baseQueue=a=o,n.pending=null}if(a!==null){o=a.next,r=r.baseState;var c=s=null,l=null,u=o;do{var d=u.lane;if((Oo&d)===d)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var f={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(c=l=f,s=r):l=l.next=f,U.lanes|=d,Yc|=d}u=u.next}while(u!==null&&u!==o);l===null?s=r:l.next=c,Rr(r,t.memoizedState)||(Rs=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){a=e;do o=a.lane,U.lanes|=o,Yc|=o,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Vo(e){var t=Ro(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Rr(o,t.memoizedState)||(Rs=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Ho(){}function Uo(e,t){var n=U,r=Ro(),a=t(),o=!Rr(r.memoizedState,a);if(o&&(r.memoizedState=a,Rs=!0),r=r.queue,ts(Ko.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||G!==null&&G.memoizedState.tag&1){if(n.flags|=2048,Xo(9,Go.bind(null,n,r,a,t),void 0,null),Y===null)throw Error(i(349));Oo&30||Wo(n,t,a)}return a}function Wo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=U.updateQueue,t===null?(t={lastEffect:null,stores:null},U.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Go(e,t,n,r){t.value=n,t.getSnapshot=r,qo(t)&&Jo(e)}function Ko(e,t,n){return n(function(){qo(t)&&Jo(e)})}function qo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Rr(e,n)}catch{return!0}}function Jo(e){var t=ro(e,1);t!==null&&hl(t,e,1,-1)}function Yo(e){var t=Lo();return typeof e==`function`&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:zo,lastRenderedState:e},t.queue=e,e=e.dispatch=ps.bind(null,U,e),[t.memoizedState,e]}function Xo(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=U.updateQueue,t===null?(t={lastEffect:null,stores:null},U.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Zo(){return Ro().memoizedState}function Qo(e,t,n,r){var i=Lo();U.flags|=e,i.memoizedState=Xo(1|t,n,void 0,r===void 0?null:r)}function $o(e,t,n,r){var i=Ro();r=r===void 0?null:r;var a=void 0;if(W!==null){var o=W.memoizedState;if(a=o.destroy,r!==null&&Po(r,o.deps)){i.memoizedState=Xo(t,n,a,r);return}}U.flags|=e,i.memoizedState=Xo(1|t,n,a,r)}function es(e,t){return Qo(8390656,8,e,t)}function ts(e,t){return $o(2048,8,e,t)}function ns(e,t){return $o(4,2,e,t)}function rs(e,t){return $o(4,4,e,t)}function is(e,t){if(typeof t==`function`)return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function as(e,t,n){return n=n==null?null:n.concat([e]),$o(4,4,is.bind(null,t,e),n)}function os(){}function ss(e,t){var n=Ro();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Po(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function cs(e,t){var n=Ro();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Po(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function ls(e,t,n){return Oo&21?(Rr(n,t)||(n=qt(),U.lanes|=n,Yc|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Rs=!0),e.memoizedState=n)}function us(e,t){var n=A;A=n!==0&&4>n?n:4,e(!0);var r=Do.transition;Do.transition={};try{e(!1),t()}finally{A=n,Do.transition=r}}function ds(){return Ro().memoizedState}function fs(e,t,n){var r=ml(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},ms(e))hs(t,n);else if(n=no(e,t,n,r),n!==null){var i=pl();hl(n,e,r,i),gs(n,t,r)}}function ps(e,t,n){var r=ml(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(ms(e))hs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Rr(s,o)){var c=t.interleaved;c===null?(i.next=i,to(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}n=no(e,t,i,r),n!==null&&(i=pl(),hl(n,e,r,i),gs(n,t,r))}}function ms(e){var t=e.alternate;return e===U||t!==null&&t===U}function hs(e,t){Ao=ko=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function gs(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Zt(e,n)}}var _s={readContext:$a,useCallback:No,useContext:No,useEffect:No,useImperativeHandle:No,useInsertionEffect:No,useLayoutEffect:No,useMemo:No,useReducer:No,useRef:No,useState:No,useDebugValue:No,useDeferredValue:No,useTransition:No,useMutableSource:No,useSyncExternalStore:No,useId:No,unstable_isNewReconciler:!1},vs={readContext:$a,useCallback:function(e,t){return Lo().memoizedState=[e,t===void 0?null:t],e},useContext:$a,useEffect:es,useImperativeHandle:function(e,t,n){return n=n==null?null:n.concat([e]),Qo(4194308,4,is.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Qo(4194308,4,e,t)},useInsertionEffect:function(e,t){return Qo(4,2,e,t)},useMemo:function(e,t){var n=Lo();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Lo();return t=n===void 0?t:n(t),r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=fs.bind(null,U,e),[r.memoizedState,e]},useRef:function(e){var t=Lo();return e={current:e},t.memoizedState=e},useState:Yo,useDebugValue:os,useDeferredValue:function(e){return Lo().memoizedState=e},useTransition:function(){var e=Yo(!1),t=e[0];return e=us.bind(null,e[1]),Lo().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=U,a=Lo();if(V){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Y===null)throw Error(i(349));Oo&30||Wo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,es(Ko.bind(null,r,o,e),[e]),r.flags|=2048,Xo(9,Go.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=Lo(),t=Y.identifierPrefix;if(V){var n=Sa,r=xa;n=(r&~(1<<32-It(r)-1)).toString(32)+n,t=`:`+t+`R`+n,n=jo++,0<n&&(t+=`H`+n.toString(32)),t+=`:`}else n=Mo++,t=`:`+t+`r`+n.toString(32)+`:`;return e.memoizedState=t},unstable_isNewReconciler:!1},ys={readContext:$a,useCallback:ss,useContext:$a,useEffect:ts,useImperativeHandle:as,useInsertionEffect:ns,useLayoutEffect:rs,useMemo:cs,useReducer:Bo,useRef:Zo,useState:function(){return Bo(zo)},useDebugValue:os,useDeferredValue:function(e){return ls(Ro(),W.memoizedState,e)},useTransition:function(){return[Bo(zo)[0],Ro().memoizedState]},useMutableSource:Ho,useSyncExternalStore:Uo,useId:ds,unstable_isNewReconciler:!1},bs={readContext:$a,useCallback:ss,useContext:$a,useEffect:ts,useImperativeHandle:as,useInsertionEffect:ns,useLayoutEffect:rs,useMemo:cs,useReducer:Vo,useRef:Zo,useState:function(){return Vo(zo)},useDebugValue:os,useDeferredValue:function(e){var t=Ro();return W===null?t.memoizedState=e:ls(t,W.memoizedState,e)},useTransition:function(){return[Vo(zo)[0],Ro().memoizedState]},useMutableSource:Ho,useSyncExternalStore:Uo,useId:ds,unstable_isNewReconciler:!1};function xs(e,t){if(e&&e.defaultProps){for(var n in t=D({},t),e=e.defaultProps,e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ss(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Cs={isMounted:function(e){return(e=e._reactInternals)?vt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pl(),i=ml(e),a=so(r,i);a.payload=t,n!=null&&(a.callback=n),t=co(e,a,i),t!==null&&(hl(t,e,i,r),lo(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pl(),i=ml(e),a=so(r,i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=co(e,a,i),t!==null&&(hl(t,e,i,r),lo(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pl(),r=ml(e),i=so(n,r);i.tag=2,t!=null&&(i.callback=t),t=co(e,i,r),t!==null&&(hl(t,e,r,n),lo(t,e,r))}};function ws(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!zr(n,r)||!zr(i,a):!0}function Ts(e,t,n){var r=!1,i=ea,a=t.contextType;return typeof a==`object`&&a?a=$a(a):(i=z(t)?na:L.current,r=t.contextTypes,a=(r=r!=null)?R(e,i):ea),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Cs,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=a),t}function Es(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Cs.enqueueReplaceState(t,t.state,null)}function Ds(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},ao(e);var a=t.contextType;typeof a==`object`&&a?i.context=$a(a):(a=z(t)?na:L.current,i.context=R(e,a)),i.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a==`function`&&(Ss(e,t,a,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps==`function`||typeof i.getSnapshotBeforeUpdate==`function`||typeof i.UNSAFE_componentWillMount!=`function`&&typeof i.componentWillMount!=`function`||(t=i.state,typeof i.componentWillMount==`function`&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount==`function`&&i.UNSAFE_componentWillMount(),t!==i.state&&Cs.enqueueReplaceState(i,i.state,null),fo(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount==`function`&&(e.flags|=4194308)}function Os(e,t){try{var n=``,r=t;do n+=ge(r),r=r.return;while(r);var i=n}catch(e){i=`
Error generating stack: `+e.message+`
`+e.stack}return{value:e,source:t,stack:i,digest:null}}function ks(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function As(e,t){try{console.error(t.value)}catch(e){setTimeout(function(){throw e})}}var js=typeof WeakMap==`function`?WeakMap:Map;function Ms(e,t,n){n=so(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){rl||(rl=!0,il=r),As(e,t)},n}function Ns(e,t,n){n=so(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r==`function`){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){As(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch==`function`&&(n.callback=function(){As(e,t),typeof r!=`function`&&(al===null?al=new Set([this]):al.add(this));var n=t.stack;this.componentDidCatch(t.value,{componentStack:n===null?``:n})}),n}function Ps(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new js;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=zl.bind(null,e,t,n),t.then(e,e))}function Fs(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t===null?!0:t.dehydrated!==null),t)return e;e=e.return}while(e!==null);return null}function Is(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=so(-1,1),t.tag=2,co(n,t,1))),n.lanes|=1),e)}var Ls=C.ReactCurrentOwner,Rs=!1;function zs(e,t,n,r){t.child=e===null?Wa(t,null,n,r):Ua(t,e.child,n,r)}function Bs(e,t,n,r,i){n=n.render;var a=t.ref;return Qa(t,i),r=Fo(e,t,n,r,a,i),n=Io(),e!==null&&!Rs?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,oc(e,t,i)):(V&&n&&Ta(t),t.flags|=1,zs(e,t,r,i),t.child)}function Vs(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ql(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,Hs(e,t,a,r,i)):(e=Xl(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,(e.lanes&i)===0){var o=a.memoizedProps;if(n=n.compare,n=n===null?zr:n,n(o,r)&&e.ref===t.ref)return oc(e,t,i)}return t.flags|=1,e=Yl(a,r),e.ref=t.ref,e.return=t,t.child=e}function Hs(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(zr(a,r)&&e.ref===t.ref)if(Rs=!1,t.pendingProps=r=a,(e.lanes&i)!==0)e.flags&131072&&(Rs=!0);else return t.lanes=e.lanes,oc(e,t,i)}return Gs(e,t,n,r,i)}function Us(e,t,n){var r=t.pendingProps,i=r.children,a=e===null?null:e.memoizedState;if(r.mode===`hidden`)if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},I(qc,Kc),Kc|=n;else{if(!(n&1073741824))return e=a===null?n:a.baseLanes|n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,I(qc,Kc),Kc|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a===null?n:a.baseLanes,I(qc,Kc),Kc|=r}else a===null?r=n:(r=a.baseLanes|n,t.memoizedState=null),I(qc,Kc),Kc|=r;return zs(e,t,i,n),t.child}function Ws(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Gs(e,t,n,r,i){var a=z(n)?na:L.current;return a=R(t,a),Qa(t,i),n=Fo(e,t,n,r,a,i),r=Io(),e!==null&&!Rs?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,oc(e,t,i)):(V&&r&&Ta(t),t.flags|=1,zs(e,t,n,i),t.child)}function Ks(e,t,n,r,i){if(z(n)){var a=!0;oa(t)}else a=!1;if(Qa(t,i),t.stateNode===null)ac(e,t),Ts(t,n,r),Ds(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,s=t.memoizedProps;o.props=s;var c=o.context,l=n.contextType;typeof l==`object`&&l?l=$a(l):(l=z(n)?na:L.current,l=R(t,l));var u=n.getDerivedStateFromProps,d=typeof u==`function`||typeof o.getSnapshotBeforeUpdate==`function`;d||typeof o.UNSAFE_componentWillReceiveProps!=`function`&&typeof o.componentWillReceiveProps!=`function`||(s!==r||c!==l)&&Es(t,o,r,l),io=!1;var f=t.memoizedState;o.state=f,fo(t,r,o,i),c=t.memoizedState,s!==r||f!==c||ta.current||io?(typeof u==`function`&&(Ss(t,n,u,r),c=t.memoizedState),(s=io||ws(t,n,s,r,f,c,l))?(d||typeof o.UNSAFE_componentWillMount!=`function`&&typeof o.componentWillMount!=`function`||(typeof o.componentWillMount==`function`&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount==`function`&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount==`function`&&(t.flags|=4194308)):(typeof o.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=l,r=s):(typeof o.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,oo(e,t),s=t.memoizedProps,l=t.type===t.elementType?s:xs(t.type,s),o.props=l,d=t.pendingProps,f=o.context,c=n.contextType,typeof c==`object`&&c?c=$a(c):(c=z(n)?na:L.current,c=R(t,c));var p=n.getDerivedStateFromProps;(u=typeof p==`function`||typeof o.getSnapshotBeforeUpdate==`function`)||typeof o.UNSAFE_componentWillReceiveProps!=`function`&&typeof o.componentWillReceiveProps!=`function`||(s!==d||f!==c)&&Es(t,o,r,c),io=!1,f=t.memoizedState,o.state=f,fo(t,r,o,i);var m=t.memoizedState;s!==d||f!==m||ta.current||io?(typeof p==`function`&&(Ss(t,n,p,r),m=t.memoizedState),(l=io||ws(t,n,l,r,f,m,c)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!=`function`&&typeof o.componentWillUpdate!=`function`||(typeof o.componentWillUpdate==`function`&&o.componentWillUpdate(r,m,c),typeof o.UNSAFE_componentWillUpdate==`function`&&o.UNSAFE_componentWillUpdate(r,m,c)),typeof o.componentDidUpdate==`function`&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof o.componentDidUpdate!=`function`||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!=`function`||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=m),o.props=r,o.state=m,o.context=c,r=l):(typeof o.componentDidUpdate!=`function`||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!=`function`||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return qs(e,t,n,r,a,i)}function qs(e,t,n,r,i,a){Ws(e,t);var o=(t.flags&128)!=0;if(!r&&!o)return i&&sa(t,n,!1),oc(e,t,a);r=t.stateNode,Ls.current=t;var s=o&&typeof n.getDerivedStateFromError!=`function`?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Ua(t,e.child,null,a),t.child=Ua(t,null,s,a)):zs(e,t,s,a),t.memoizedState=r.state,i&&sa(t,n,!0),t.child}function Js(e){var t=e.stateNode;t.pendingContext?ia(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ia(e,t.context,!1),yo(e,t.containerInfo)}function Ys(e,t,n,r,i){return Ia(),La(i),t.flags|=256,zs(e,t,n,r),t.child}var Xs={dehydrated:null,treeContext:null,retryLane:0};function Zs(e){return{baseLanes:e,cachePool:null,transitions:null}}function Qs(e,t,n){var r=t.pendingProps,i=H.current,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(i&2)!=0),s?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),I(H,i&1),e===null)return Ma(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data===`$!`?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,a?(r=t.mode,a=t.child,o={mode:`hidden`,children:o},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=Ql(o,r,0,null),e=Zl(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=Zs(n),t.memoizedState=Xs,e):$s(t,o));if(i=e.memoizedState,i!==null&&(s=i.dehydrated,s!==null))return tc(e,t,o,r,s,i,n);if(a){a=r.fallback,o=t.mode,i=e.child,s=i.sibling;var c={mode:`hidden`,children:r.children};return!(o&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Yl(i,c),r.subtreeFlags=i.subtreeFlags&14680064),s===null?(a=Zl(a,o,n,null),a.flags|=2):a=Yl(s,a),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,o=e.child.memoizedState,o=o===null?Zs(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=Xs,r}return a=e.child,e=a.sibling,r=Yl(a,{mode:`visible`,children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function $s(e,t){return t=Ql({mode:`visible`,children:t},e.mode,0,null),t.return=e,e.child=t}function ec(e,t,n,r){return r!==null&&La(r),Ua(t,e.child,null,n),e=$s(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function tc(e,t,n,r,a,o,s){if(n)return t.flags&256?(t.flags&=-257,r=ks(Error(i(422))),ec(e,t,s,r)):t.memoizedState===null?(o=r.fallback,a=t.mode,r=Ql({mode:`visible`,children:r.children},a,0,null),o=Zl(o,a,s,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&Ua(t,e.child,null,s),t.child.memoizedState=Zs(s),t.memoizedState=Xs,o):(t.child=e.child,t.flags|=128,null);if(!(t.mode&1))return ec(e,t,s,null);if(a.data===`$!`){if(r=a.nextSibling&&a.nextSibling.dataset,r)var c=r.dgst;return r=c,o=Error(i(419)),r=ks(o,r,void 0),ec(e,t,s,r)}if(c=(s&e.childLanes)!==0,Rs||c){if(r=Y,r!==null){switch(s&-s){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(r.suspendedLanes|s))===0?a:0,a!==0&&a!==o.retryLane&&(o.retryLane=a,ro(e,a),hl(r,e,a,-1))}return kl(),r=ks(Error(i(421))),ec(e,t,s,r)}return a.data===`$?`?(t.flags|=128,t.child=e.child,t=Vl.bind(null,e),a._reactRetry=t,null):(e=o.treeContext,B=zi(a.nextSibling),Da=t,V=!0,Oa=null,e!==null&&(va[ya++]=xa,va[ya++]=Sa,va[ya++]=ba,xa=e.id,Sa=e.overflow,ba=t),t=$s(t,r.children),t.flags|=4096,t)}function nc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Za(e.return,t,n)}function rc(e,t,n,r,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=i)}function ic(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;if(zs(e,t,r.children,n),r=H.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&nc(e,n,t);else if(e.tag===19)nc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(I(H,r),!(t.mode&1))t.memoizedState=null;else switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Co(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),rc(t,!1,i,n,a);break;case`backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Co(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}rc(t,!0,n,null,a);break;case`together`:rc(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ac(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function oc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Yc|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Yl(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Yl(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function sc(e,t,n){switch(t.tag){case 3:Js(t),Ia();break;case 5:xo(t);break;case 1:z(t.type)&&oa(t);break;case 4:yo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;I(Ga,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(I(H,H.current&1),e=oc(e,t,n),e===null?null:e.sibling):Qs(e,t,n):(I(H,H.current&1),t.flags|=128,null);I(H,H.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return ic(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),I(H,H.current),r)break;return null;case 22:case 23:return t.lanes=0,Us(e,t,n)}return oc(e,t,n)}var cc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},lc=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,vo(ho.current);var a=null;switch(n){case`input`:i=Te(e,i),r=Te(e,r),a=[];break;case`select`:i=D({},i,{value:void 0}),r=D({},r,{value:void 0}),a=[];break;case`textarea`:i=Ne(e,i),r=Ne(e,r),a=[];break;default:typeof i.onClick!=`function`&&typeof r.onClick==`function`&&(e.onclick=ki)}qe(n,r);var s;for(u in n=null,i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u===`style`){var c=i[u];for(s in c)c.hasOwnProperty(s)&&(n||={},n[s]=``)}else u!==`dangerouslySetInnerHTML`&&u!==`children`&&u!==`suppressContentEditableWarning`&&u!==`suppressHydrationWarning`&&u!==`autoFocus`&&(o.hasOwnProperty(u)?a||=[]:(a||=[]).push(u,null));for(u in r){var l=r[u];if(c=i?.[u],r.hasOwnProperty(u)&&l!==c&&(l!=null||c!=null))if(u===`style`)if(c){for(s in c)!c.hasOwnProperty(s)||l&&l.hasOwnProperty(s)||(n||={},n[s]=``);for(s in l)l.hasOwnProperty(s)&&c[s]!==l[s]&&(n||={},n[s]=l[s])}else n||(a||=[],a.push(u,n)),n=l;else u===`dangerouslySetInnerHTML`?(l=l?l.__html:void 0,c=c?c.__html:void 0,l!=null&&c!==l&&(a||=[]).push(u,l)):u===`children`?typeof l!=`string`&&typeof l!=`number`||(a||=[]).push(u,``+l):u!==`suppressContentEditableWarning`&&u!==`suppressHydrationWarning`&&(o.hasOwnProperty(u)?(l!=null&&u===`onScroll`&&N(`scroll`,e),a||c===l||(a=[])):(a||=[]).push(u,l))}n&&(a||=[]).push(`style`,n);var u=a;(t.updateQueue=u)&&(t.flags|=4)}},uc=function(e,t,n,r){n!==r&&(t.flags|=4)};function dc(e,t){if(!V)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function fc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function pc(e,t,n){var r=t.pendingProps;switch(Ea(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return fc(t),null;case 1:return z(t.type)&&ra(),fc(t),null;case 3:return r=t.stateNode,bo(),F(ta),F(L),To(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Pa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Oa!==null&&(yl(Oa),Oa=null))),fc(t),null;case 5:So(t);var a=vo(_o.current);if(n=t.type,e!==null&&t.stateNode!=null)lc(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(i(166));return fc(t),null}if(e=vo(ho.current),Pa(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[Hi]=t,r[Ui]=s,e=(t.mode&1)!=0,n){case`dialog`:N(`cancel`,r),N(`close`,r);break;case`iframe`:case`object`:case`embed`:N(`load`,r);break;case`video`:case`audio`:for(a=0;a<fi.length;a++)N(fi[a],r);break;case`source`:N(`error`,r);break;case`img`:case`image`:case`link`:N(`error`,r),N(`load`,r);break;case`details`:N(`toggle`,r);break;case`input`:Ee(r,s),N(`invalid`,r);break;case`select`:r._wrapperState={wasMultiple:!!s.multiple},N(`invalid`,r);break;case`textarea`:Pe(r,s),N(`invalid`,r)}for(var c in qe(n,s),a=null,s)if(s.hasOwnProperty(c)){var l=s[c];c===`children`?typeof l==`string`?r.textContent!==l&&(!0!==s.suppressHydrationWarning&&Oi(r.textContent,l,e),a=[`children`,l]):typeof l==`number`&&r.textContent!==``+l&&(!0!==s.suppressHydrationWarning&&Oi(r.textContent,l,e),a=[`children`,``+l]):o.hasOwnProperty(c)&&l!=null&&c===`onScroll`&&N(`scroll`,r)}switch(n){case`input`:Se(r),ke(r,s,!0);break;case`textarea`:Se(r),Ie(r);break;case`select`:case`option`:break;default:typeof s.onClick==`function`&&(r.onclick=ki)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{c=a.nodeType===9?a:a.ownerDocument,e===`http://www.w3.org/1999/xhtml`&&(e=Le(n)),e===`http://www.w3.org/1999/xhtml`?n===`script`?(e=c.createElement(`div`),e.innerHTML=`<script><\/script>`,e=e.removeChild(e.firstChild)):typeof r.is==`string`?e=c.createElement(n,{is:r.is}):(e=c.createElement(n),n===`select`&&(c=e,r.multiple?c.multiple=!0:r.size&&(c.size=r.size))):e=c.createElementNS(e,n),e[Hi]=t,e[Ui]=r,cc(e,t,!1,!1),t.stateNode=e;a:{switch(c=Je(n,r),n){case`dialog`:N(`cancel`,e),N(`close`,e),a=r;break;case`iframe`:case`object`:case`embed`:N(`load`,e),a=r;break;case`video`:case`audio`:for(a=0;a<fi.length;a++)N(fi[a],e);a=r;break;case`source`:N(`error`,e),a=r;break;case`img`:case`image`:case`link`:N(`error`,e),N(`load`,e),a=r;break;case`details`:N(`toggle`,e),a=r;break;case`input`:Ee(e,r),a=Te(e,r),N(`invalid`,e);break;case`option`:a=r;break;case`select`:e._wrapperState={wasMultiple:!!r.multiple},a=D({},r,{value:void 0}),N(`invalid`,e);break;case`textarea`:Pe(e,r),a=Ne(e,r),N(`invalid`,e);break;default:a=r}for(s in qe(n,a),l=a,l)if(l.hasOwnProperty(s)){var u=l[s];s===`style`?Ge(e,u):s===`dangerouslySetInnerHTML`?(u=u?u.__html:void 0,u!=null&&Be(e,u)):s===`children`?typeof u==`string`?(n!==`textarea`||u!==``)&&Ve(e,u):typeof u==`number`&&Ve(e,``+u):s!==`suppressContentEditableWarning`&&s!==`suppressHydrationWarning`&&s!==`autoFocus`&&(o.hasOwnProperty(s)?u!=null&&s===`onScroll`&&N(`scroll`,e):u!=null&&S(e,s,u,c))}switch(n){case`input`:Se(e),ke(e,r,!1);break;case`textarea`:Se(e),Ie(e);break;case`option`:r.value!=null&&e.setAttribute(`value`,``+ye(r.value));break;case`select`:e.multiple=!!r.multiple,s=r.value,s==null?r.defaultValue!=null&&Me(e,!!r.multiple,r.defaultValue,!0):Me(e,!!r.multiple,s,!1);break;default:typeof a.onClick==`function`&&(e.onclick=ki)}switch(n){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return fc(t),null;case 6:if(e&&t.stateNode!=null)uc(e,t,e.memoizedProps,r);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(n=vo(_o.current),vo(ho.current),Pa(t)){if(r=t.stateNode,n=t.memoizedProps,r[Hi]=t,(s=r.nodeValue!==n)&&(e=Da,e!==null))switch(e.tag){case 3:Oi(r.nodeValue,n,(e.mode&1)!=0);break;case 5:!0!==e.memoizedProps.suppressHydrationWarning&&Oi(r.nodeValue,n,(e.mode&1)!=0)}s&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Hi]=t,t.stateNode=r}return fc(t),null;case 13:if(F(H),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(V&&B!==null&&t.mode&1&&!(t.flags&128))Fa(),Ia(),t.flags|=98560,s=!1;else if(s=Pa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(i(318));if(s=t.memoizedState,s=s===null?null:s.dehydrated,!s)throw Error(i(317));s[Hi]=t}else Ia(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;fc(t),s=!1}else Oa!==null&&(yl(Oa),Oa=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||H.current&1?Q===0&&(Q=3):kl())),t.updateQueue!==null&&(t.flags|=4),fc(t),null);case 4:return bo(),e===null&&vi(t.stateNode.containerInfo),fc(t),null;case 10:return Xa(t.type._context),fc(t),null;case 17:return z(t.type)&&ra(),fc(t),null;case 19:if(F(H),s=t.memoizedState,s===null)return fc(t),null;if(r=(t.flags&128)!=0,c=s.rendering,c===null)if(r)dc(s,!1);else{if(Q!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(c=Co(e),c!==null){for(t.flags|=128,dc(s,!1),r=c.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)s=n,e=r,s.flags&=14680066,c=s.alternate,c===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=c.childLanes,s.lanes=c.lanes,s.child=c.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=c.memoizedProps,s.memoizedState=c.memoizedState,s.updateQueue=c.updateQueue,s.type=c.type,e=c.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return I(H,H.current&1|2),t.child}e=e.sibling}s.tail!==null&&k()>tl&&(t.flags|=128,r=!0,dc(s,!1),t.lanes=4194304)}else{if(!r)if(e=Co(c),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),dc(s,!0),s.tail===null&&s.tailMode===`hidden`&&!c.alternate&&!V)return fc(t),null}else 2*k()-s.renderingStartTime>tl&&n!==1073741824&&(t.flags|=128,r=!0,dc(s,!1),t.lanes=4194304);s.isBackwards?(c.sibling=t.child,t.child=c):(n=s.last,n===null?t.child=c:n.sibling=c,s.last=c)}return s.tail===null?(fc(t),null):(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=k(),t.sibling=null,n=H.current,I(H,r?n&1|2:n&1),t);case 22:case 23:return Tl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Kc&1073741824&&(fc(t),t.subtreeFlags&6&&(t.flags|=8192)):fc(t),null;case 24:return null;case 25:return null}throw Error(i(156,t.tag))}function mc(e,t){switch(Ea(t),t.tag){case 1:return z(t.type)&&ra(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return bo(),F(ta),F(L),To(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return So(t),null;case 13:if(F(H),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Ia()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return F(H),null;case 4:return bo(),null;case 10:return Xa(t.type._context),null;case 22:case 23:return Tl(),null;case 24:return null;default:return null}}var hc=!1,gc=!1,_c=typeof WeakSet==`function`?WeakSet:Set,K=null;function vc(e,t){var n=e.ref;if(n!==null)if(typeof n==`function`)try{n(null)}catch(n){$(e,t,n)}else n.current=null}function yc(e,t,n){try{n()}catch(n){$(e,t,n)}}var bc=!1;function xc(e,t){if(Ai=Cn,e=Ur(),Wr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(ji={focusedElem:e,selectionRange:n},Cn=!1,K=t;K!==null;)if(t=K,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,K=e;else for(;K!==null;){t=K;try{var h=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(h!==null){var g=h.memoizedProps,_=h.memoizedState,v=t.stateNode;v.__reactInternalSnapshotBeforeUpdate=v.getSnapshotBeforeUpdate(t.elementType===t.type?g:xs(t.type,g),_)}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent=``:y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(i(163))}}catch(e){$(t,t.return,e)}if(e=t.sibling,e!==null){e.return=t.return,K=e;break}K=t.return}return h=bc,bc=!1,h}function Sc(e,t,n){var r=t.updateQueue;if(r=r===null?null:r.lastEffect,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var a=i.destroy;i.destroy=void 0,a!==void 0&&yc(t,n,a)}i=i.next}while(i!==r)}}function Cc(e,t){if(t=t.updateQueue,t=t===null?null:t.lastEffect,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function wc(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t==`function`?t(e):t.current=e}}function Tc(e){var t=e.alternate;t!==null&&(e.alternate=null,Tc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Hi],delete t[Ui],delete t[Gi],delete t[Ki],delete t[qi])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Ec(e){return e.tag===5||e.tag===3||e.tag===4}function Dc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Ec(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Oc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ki));else if(r!==4&&(e=e.child,e!==null))for(Oc(e,t,n),e=e.sibling;e!==null;)Oc(e,t,n),e=e.sibling}function kc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(kc(e,t,n),e=e.sibling;e!==null;)kc(e,t,n),e=e.sibling}var q=null,Ac=!1;function jc(e,t,n){for(n=n.child;n!==null;)Mc(e,t,n),n=n.sibling}function Mc(e,t,n){if(Pt&&typeof Pt.onCommitFiberUnmount==`function`)try{Pt.onCommitFiberUnmount(Nt,n)}catch{}switch(n.tag){case 5:gc||vc(n,t);case 6:var r=q,i=Ac;q=null,jc(e,t,n),q=r,Ac=i,q!==null&&(Ac?(e=q,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):q.removeChild(n.stateNode));break;case 18:q!==null&&(Ac?(e=q,n=n.stateNode,e.nodeType===8?Ri(e.parentNode,n):e.nodeType===1&&Ri(e,n),xn(e)):Ri(q,n.stateNode));break;case 4:r=q,i=Ac,q=n.stateNode.containerInfo,Ac=!0,jc(e,t,n),q=r,Ac=i;break;case 0:case 11:case 14:case 15:if(!gc&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var a=i,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&yc(n,t,o),i=i.next}while(i!==r)}jc(e,t,n);break;case 1:if(!gc&&(vc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(e){$(n,t,e)}jc(e,t,n);break;case 21:jc(e,t,n);break;case 22:n.mode&1?(gc=(r=gc)||n.memoizedState!==null,jc(e,t,n),gc=r):jc(e,t,n);break;default:jc(e,t,n)}}function Nc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new _c),t.forEach(function(t){var r=Hl.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))})}}function Pc(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r];try{var o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 5:q=c.stateNode,Ac=!1;break a;case 3:q=c.stateNode.containerInfo,Ac=!0;break a;case 4:q=c.stateNode.containerInfo,Ac=!0;break a}c=c.return}if(q===null)throw Error(i(160));Mc(o,s,a),q=null,Ac=!1;var l=a.alternate;l!==null&&(l.return=null),a.return=null}catch(e){$(a,t,e)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Fc(t,e),t=t.sibling}function Fc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Pc(t,e),Ic(e),r&4){try{Sc(3,e,e.return),Cc(3,e)}catch(t){$(e,e.return,t)}try{Sc(5,e,e.return)}catch(t){$(e,e.return,t)}}break;case 1:Pc(t,e),Ic(e),r&512&&n!==null&&vc(n,n.return);break;case 5:if(Pc(t,e),Ic(e),r&512&&n!==null&&vc(n,n.return),e.flags&32){var a=e.stateNode;try{Ve(a,``)}catch(t){$(e,e.return,t)}}if(r&4&&(a=e.stateNode,a!=null)){var o=e.memoizedProps,s=n===null?o:n.memoizedProps,c=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{c===`input`&&o.type===`radio`&&o.name!=null&&De(a,o),Je(c,s);var u=Je(c,o);for(s=0;s<l.length;s+=2){var d=l[s],f=l[s+1];d===`style`?Ge(a,f):d===`dangerouslySetInnerHTML`?Be(a,f):d===`children`?Ve(a,f):S(a,d,f,u)}switch(c){case`input`:Oe(a,o);break;case`textarea`:Fe(a,o);break;case`select`:var p=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var m=o.value;m==null?p!==!!o.multiple&&(o.defaultValue==null?Me(a,!!o.multiple,o.multiple?[]:``,!1):Me(a,!!o.multiple,o.defaultValue,!0)):Me(a,!!o.multiple,m,!1)}a[Ui]=o}catch(t){$(e,e.return,t)}}break;case 6:if(Pc(t,e),Ic(e),r&4){if(e.stateNode===null)throw Error(i(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(t){$(e,e.return,t)}}break;case 3:if(Pc(t,e),Ic(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{xn(t.containerInfo)}catch(t){$(e,e.return,t)}break;case 4:Pc(t,e),Ic(e);break;case 13:Pc(t,e),Ic(e),a=e.child,a.flags&8192&&(o=a.memoizedState!==null,a.stateNode.isHidden=o,!o||a.alternate!==null&&a.alternate.memoizedState!==null||(el=k())),r&4&&Nc(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(gc=(u=gc)||d,Pc(t,e),gc=u):Pc(t,e),Ic(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(K=e,d=e.child;d!==null;){for(f=K=d;K!==null;){switch(p=K,m=p.child,p.tag){case 0:case 11:case 14:case 15:Sc(4,p,p.return);break;case 1:vc(p,p.return);var h=p.stateNode;if(typeof h.componentWillUnmount==`function`){r=p,n=p.return;try{t=r,h.props=t.memoizedProps,h.state=t.memoizedState,h.componentWillUnmount()}catch(e){$(r,n,e)}}break;case 5:vc(p,p.return);break;case 22:if(p.memoizedState!==null){Bc(f);continue}}m===null?Bc(f):(m.return=p,K=m)}d=d.sibling}a:for(d=null,f=e;;){if(f.tag===5){if(d===null){d=f;try{a=f.stateNode,u?(o=a.style,typeof o.setProperty==`function`?o.setProperty(`display`,`none`,`important`):o.display=`none`):(c=f.stateNode,l=f.memoizedProps.style,s=l!=null&&l.hasOwnProperty(`display`)?l.display:null,c.style.display=We(`display`,s))}catch(t){$(e,e.return,t)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=u?``:f.memoizedProps}catch(t){$(e,e.return,t)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break a;for(;f.sibling===null;){if(f.return===null||f.return===e)break a;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Pc(t,e),Ic(e),r&4&&Nc(e);break;case 21:break;default:Pc(t,e),Ic(e)}}function Ic(e){var t=e.flags;if(t&2){try{a:{for(var n=e.return;n!==null;){if(Ec(n)){var r=n;break a}n=n.return}throw Error(i(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(Ve(a,``),r.flags&=-33),kc(e,Dc(e),a);break;case 3:case 4:var o=r.stateNode.containerInfo;Oc(e,Dc(e),o);break;default:throw Error(i(161))}}catch(t){$(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Lc(e,t,n){K=e,Rc(e,t,n)}function Rc(e,t,n){for(var r=(e.mode&1)!=0;K!==null;){var i=K,a=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||hc;if(!o){var s=i.alternate,c=s!==null&&s.memoizedState!==null||gc;s=hc;var l=gc;if(hc=o,(gc=c)&&!l)for(K=i;K!==null;)o=K,c=o.child,o.tag===22&&o.memoizedState!==null||c===null?Vc(i):(c.return=o,K=c);for(;a!==null;)K=a,Rc(a,t,n),a=a.sibling;K=i,hc=s,gc=l}zc(e,t,n)}else i.subtreeFlags&8772&&a!==null?(a.return=i,K=a):zc(e,t,n)}}function zc(e){for(;K!==null;){var t=K;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:gc||Cc(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!gc)if(n===null)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:xs(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&po(t,o,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}po(t,s,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var l=t.memoizedProps;switch(t.type){case`button`:case`input`:case`select`:case`textarea`:l.autoFocus&&n.focus();break;case`img`:l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&xn(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(i(163))}gc||t.flags&512&&wc(t)}catch(e){$(t,t.return,e)}}if(t===e){K=null;break}if(n=t.sibling,n!==null){n.return=t.return,K=n;break}K=t.return}}function Bc(e){for(;K!==null;){var t=K;if(t===e){K=null;break}var n=t.sibling;if(n!==null){n.return=t.return,K=n;break}K=t.return}}function Vc(e){for(;K!==null;){var t=K;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Cc(4,t)}catch(e){$(t,n,e)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount==`function`){var i=t.return;try{r.componentDidMount()}catch(e){$(t,i,e)}}var a=t.return;try{wc(t)}catch(e){$(t,a,e)}break;case 5:var o=t.return;try{wc(t)}catch(e){$(t,o,e)}}}catch(e){$(t,t.return,e)}if(t===e){K=null;break}var s=t.sibling;if(s!==null){s.return=t.return,K=s;break}K=t.return}}var Hc=Math.ceil,Uc=C.ReactCurrentDispatcher,Wc=C.ReactCurrentOwner,Gc=C.ReactCurrentBatchConfig,J=0,Y=null,X=null,Z=0,Kc=0,qc=$i(0),Q=0,Jc=null,Yc=0,Xc=0,Zc=0,Qc=null,$c=null,el=0,tl=1/0,nl=null,rl=!1,il=null,al=null,ol=!1,sl=null,cl=0,ll=0,ul=null,dl=-1,fl=0;function pl(){return J&6?k():dl===-1?dl=k():dl}function ml(e){return e.mode&1?J&2&&Z!==0?Z&-Z:Ra.transition===null?(e=A,e===0?(e=window.event,e=e===void 0?16:kn(e.type),e):e):(fl===0&&(fl=qt()),fl):1}function hl(e,t,n,r){if(50<ll)throw ll=0,ul=null,Error(i(185));Yt(e,n,r),(!(J&2)||e!==Y)&&(e===Y&&(!(J&2)&&(Xc|=n),Q===4&&xl(e,Z)),gl(e,r),n===1&&J===0&&!(t.mode&1)&&(tl=k()+500,la&&pa()))}function gl(e,t){var n=e.callbackNode;Gt(e,t);var r=Ut(e,e===Y?Z:0);if(r===0)n!==null&&wt(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&wt(n),t===1)e.tag===0?fa(Sl.bind(null,e)):da(Sl.bind(null,e)),Ii(function(){!(J&6)&&pa()}),n=null;else{switch(Qt(r)){case 1:n=Ot;break;case 4:n=kt;break;case 16:n=At;break;case 536870912:n=Mt;break;default:n=At}n=Wl(n,_l.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function _l(e,t){if(dl=-1,fl=0,J&6)throw Error(i(327));var n=e.callbackNode;if(Ll()&&e.callbackNode!==n)return null;var r=Ut(e,e===Y?Z:0);if(r===0)return null;if(r&30||(r&e.expiredLanes)!==0||t)t=Al(e,r);else{t=r;var a=J;J|=2;var o=Ol();(Y!==e||Z!==t)&&(nl=null,tl=k()+500,El(e,t));do try{Ml();break}catch(t){Dl(e,t)}while(1);Ya(),Uc.current=o,J=a,X===null?(Y=null,Z=0,t=Q):t=0}if(t!==0){if(t===2&&(a=Kt(e),a!==0&&(r=a,t=vl(e,a))),t===1)throw n=Jc,El(e,0),xl(e,r),gl(e,k()),n;if(t===6)xl(e,r);else{if(a=e.current.alternate,!(r&30)&&!bl(a)&&(t=Al(e,r),t===2&&(o=Kt(e),o!==0&&(r=o,t=vl(e,o))),t===1))throw n=Jc,El(e,0),xl(e,r),gl(e,k()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(i(345));case 2:Fl(e,$c,nl);break;case 3:if(xl(e,r),(r&130023424)===r&&(t=el+500-k(),10<t)){if(Ut(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){pl(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Ni(Fl.bind(null,e,$c,nl),t);break}Fl(e,$c,nl);break;case 4:if(xl(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var s=31-It(r);o=1<<s,s=t[s],s>a&&(a=s),r&=~o}if(r=a,r=k()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Hc(r/1960))-r,10<r){e.timeoutHandle=Ni(Fl.bind(null,e,$c,nl),r);break}Fl(e,$c,nl);break;case 5:Fl(e,$c,nl);break;default:throw Error(i(329))}}}return gl(e,k()),e.callbackNode===n?_l.bind(null,e):null}function vl(e,t){var n=Qc;return e.current.memoizedState.isDehydrated&&(El(e,t).flags|=256),e=Al(e,t),e!==2&&(t=$c,$c=n,t!==null&&yl(t)),e}function yl(e){$c===null?$c=e:$c.push.apply($c,e)}function bl(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Rr(a(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function xl(e,t){for(t&=~Zc,t&=~Xc,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-It(t),r=1<<n;e[n]=-1,t&=~r}}function Sl(e){if(J&6)throw Error(i(327));Ll();var t=Ut(e,0);if(!(t&1))return gl(e,k()),null;var n=Al(e,t);if(e.tag!==0&&n===2){var r=Kt(e);r!==0&&(t=r,n=vl(e,r))}if(n===1)throw n=Jc,El(e,0),xl(e,t),gl(e,k()),n;if(n===6)throw Error(i(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Fl(e,$c,nl),gl(e,k()),null}function Cl(e,t){var n=J;J|=1;try{return e(t)}finally{J=n,J===0&&(tl=k()+500,la&&pa())}}function wl(e){sl!==null&&sl.tag===0&&!(J&6)&&Ll();var t=J;J|=1;var n=Gc.transition,r=A;try{if(Gc.transition=null,A=1,e)return e()}finally{A=r,Gc.transition=n,J=t,!(J&6)&&pa()}}function Tl(){Kc=qc.current,F(qc)}function El(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Pi(n)),X!==null)for(n=X.return;n!==null;){var r=n;switch(Ea(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ra();break;case 3:bo(),F(ta),F(L),To();break;case 5:So(r);break;case 4:bo();break;case 13:F(H);break;case 19:F(H);break;case 10:Xa(r.type._context);break;case 22:case 23:Tl()}n=n.return}if(Y=e,X=e=Yl(e.current,null),Z=Kc=t,Q=0,Jc=null,Zc=Xc=Yc=0,$c=Qc=null,eo!==null){for(t=0;t<eo.length;t++)if(n=eo[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,a=n.pending;if(a!==null){var o=a.next;a.next=i,r.next=o}n.pending=r}eo=null}return e}function Dl(e,t){do{var n=X;try{if(Ya(),Eo.current=_s,ko){for(var r=U.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}ko=!1}if(Oo=0,G=W=U=null,Ao=!1,jo=0,Wc.current=null,n===null||n.return===null){Q=1,Jc=t,X=null;break}a:{var o=e,s=n.return,c=n,l=t;if(t=Z,c.flags|=32768,typeof l==`object`&&l&&typeof l.then==`function`){var u=l,d=c,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var p=d.alternate;p?(d.updateQueue=p.updateQueue,d.memoizedState=p.memoizedState,d.lanes=p.lanes):(d.updateQueue=null,d.memoizedState=null)}var m=Fs(s);if(m!==null){m.flags&=-257,Is(m,s,c,o,t),m.mode&1&&Ps(o,u,t),t=m,l=u;var h=t.updateQueue;if(h===null){var g=new Set;g.add(l),t.updateQueue=g}else h.add(l);break a}else{if(!(t&1)){Ps(o,u,t),kl();break a}l=Error(i(426))}}else if(V&&c.mode&1){var _=Fs(s);if(_!==null){!(_.flags&65536)&&(_.flags|=256),Is(_,s,c,o,t),La(Os(l,c));break a}}o=l=Os(l,c),Q!==4&&(Q=2),Qc===null?Qc=[o]:Qc.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var v=Ms(o,l,t);uo(o,v);break a;case 1:c=l;var y=o.type,b=o.stateNode;if(!(o.flags&128)&&(typeof y.getDerivedStateFromError==`function`||b!==null&&typeof b.componentDidCatch==`function`&&(al===null||!al.has(b)))){o.flags|=65536,t&=-t,o.lanes|=t;var x=Ns(o,c,t);uo(o,x);break a}}o=o.return}while(o!==null)}Pl(n)}catch(e){t=e,X===n&&n!==null&&(X=n=n.return);continue}break}while(1)}function Ol(){var e=Uc.current;return Uc.current=_s,e===null?_s:e}function kl(){(Q===0||Q===3||Q===2)&&(Q=4),Y===null||!(Yc&268435455)&&!(Xc&268435455)||xl(Y,Z)}function Al(e,t){var n=J;J|=2;var r=Ol();(Y!==e||Z!==t)&&(nl=null,El(e,t));do try{jl();break}catch(t){Dl(e,t)}while(1);if(Ya(),J=n,Uc.current=r,X!==null)throw Error(i(261));return Y=null,Z=0,Q}function jl(){for(;X!==null;)Nl(X)}function Ml(){for(;X!==null&&!Tt();)Nl(X)}function Nl(e){var t=Ul(e.alternate,e,Kc);e.memoizedProps=e.pendingProps,t===null?Pl(e):X=t,Wc.current=null}function Pl(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=mc(n,t),n!==null){n.flags&=32767,X=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Q=6,X=null;return}}else if(n=pc(n,t,Kc),n!==null){X=n;return}if(t=t.sibling,t!==null){X=t;return}X=t=e}while(t!==null);Q===0&&(Q=5)}function Fl(e,t,n){var r=A,i=Gc.transition;try{Gc.transition=null,A=1,Il(e,t,n,r)}finally{Gc.transition=i,A=r}return null}function Il(e,t,n,r){do Ll();while(sl!==null);if(J&6)throw Error(i(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(i(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(Xt(e,o),e===Y&&(X=Y=null,Z=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ol||(ol=!0,Wl(At,function(){return Ll(),null})),o=(n.flags&15990)!=0,n.subtreeFlags&15990||o){o=Gc.transition,Gc.transition=null;var s=A;A=1;var c=J;J|=4,Wc.current=null,xc(e,n),Fc(n,e),Gr(ji),Cn=!!Ai,ji=Ai=null,e.current=n,Lc(n,e,a),Et(),J=c,A=s,Gc.transition=o}else e.current=n;if(ol&&(ol=!1,sl=e,cl=a),o=e.pendingLanes,o===0&&(al=null),Ft(n.stateNode,r),gl(e,k()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(rl)throw rl=!1,e=il,il=null,e;return cl&1&&e.tag!==0&&Ll(),o=e.pendingLanes,o&1?e===ul?ll++:(ll=0,ul=e):ll=0,pa(),null}function Ll(){if(sl!==null){var e=Qt(cl),t=Gc.transition,n=A;try{if(Gc.transition=null,A=16>e?16:e,sl===null)var r=!1;else{if(e=sl,sl=null,cl=0,J&6)throw Error(i(331));var a=J;for(J|=4,K=e.current;K!==null;){var o=K,s=o.child;if(K.flags&16){var c=o.deletions;if(c!==null){for(var l=0;l<c.length;l++){var u=c[l];for(K=u;K!==null;){var d=K;switch(d.tag){case 0:case 11:case 15:Sc(8,d,o)}var f=d.child;if(f!==null)f.return=d,K=f;else for(;K!==null;){d=K;var p=d.sibling,m=d.return;if(Tc(d),d===u){K=null;break}if(p!==null){p.return=m,K=p;break}K=m}}}var h=o.alternate;if(h!==null){var g=h.child;if(g!==null){h.child=null;do{var _=g.sibling;g.sibling=null,g=_}while(g!==null)}}K=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,K=s;else b:for(;K!==null;){if(o=K,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Sc(9,o,o.return)}var v=o.sibling;if(v!==null){v.return=o.return,K=v;break b}K=o.return}}var y=e.current;for(K=y;K!==null;){s=K;var b=s.child;if(s.subtreeFlags&2064&&b!==null)b.return=s,K=b;else b:for(s=y;K!==null;){if(c=K,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:Cc(9,c)}}catch(e){$(c,c.return,e)}if(c===s){K=null;break b}var x=c.sibling;if(x!==null){x.return=c.return,K=x;break b}K=c.return}}if(J=a,pa(),Pt&&typeof Pt.onPostCommitFiberRoot==`function`)try{Pt.onPostCommitFiberRoot(Nt,e)}catch{}r=!0}return r}finally{A=n,Gc.transition=t}}return!1}function Rl(e,t,n){t=Os(n,t),t=Ms(e,t,1),e=co(e,t,1),t=pl(),e!==null&&(Yt(e,1,t),gl(e,t))}function $(e,t,n){if(e.tag===3)Rl(e,e,n);else for(;t!==null;){if(t.tag===3){Rl(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(al===null||!al.has(r))){e=Os(n,e),e=Ns(t,e,1),t=co(t,e,1),e=pl(),t!==null&&(Yt(t,1,e),gl(t,e));break}}t=t.return}}function zl(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=pl(),e.pingedLanes|=e.suspendedLanes&n,Y===e&&(Z&n)===n&&(Q===4||Q===3&&(Z&130023424)===Z&&500>k()-el?El(e,0):Zc|=n),gl(e,t)}function Bl(e,t){t===0&&(e.mode&1?(t=Vt,Vt<<=1,!(Vt&130023424)&&(Vt=4194304)):t=1);var n=pl();e=ro(e,t),e!==null&&(Yt(e,t,n),gl(e,n))}function Vl(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Bl(e,n)}function Hl(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(i(314))}r!==null&&r.delete(t),Bl(e,n)}var Ul=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ta.current)Rs=!0;else{if((e.lanes&n)===0&&!(t.flags&128))return Rs=!1,sc(e,t,n);Rs=!!(e.flags&131072)}else Rs=!1,V&&t.flags&1048576&&wa(t,_a,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;ac(e,t),e=t.pendingProps;var a=R(t,L.current);Qa(t,n),a=Fo(null,t,r,e,a,n);var o=Io();return t.flags|=1,typeof a==`object`&&a&&typeof a.render==`function`&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,z(r)?(o=!0,oa(t)):o=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,ao(t),a.updater=Cs,t.stateNode=a,a._reactInternals=t,Ds(t,r,e,n),t=qs(null,t,r,!0,o,n)):(t.tag=0,V&&o&&Ta(t),zs(null,t,a,n),t=t.child),t;case 16:r=t.elementType;a:{switch(ac(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=Jl(r),e=xs(r,e),a){case 0:t=Gs(null,t,r,e,n);break a;case 1:t=Ks(null,t,r,e,n);break a;case 11:t=Bs(null,t,r,e,n);break a;case 14:t=Vs(null,t,r,xs(r.type,e),n);break a}throw Error(i(306,r,``))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:xs(r,a),Gs(e,t,r,a,n);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:xs(r,a),Ks(e,t,r,a,n);case 3:a:{if(Js(t),e===null)throw Error(i(387));r=t.pendingProps,o=t.memoizedState,a=o.element,oo(e,t),fo(t,r,null,n);var s=t.memoizedState;if(r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){a=Os(Error(i(423)),t),t=Ys(e,t,r,n,a);break a}else if(r!==a){a=Os(Error(i(424)),t),t=Ys(e,t,r,n,a);break a}else for(B=zi(t.stateNode.containerInfo.firstChild),Da=t,V=!0,Oa=null,n=Wa(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ia(),r===a){t=oc(e,t,n);break a}zs(e,t,r,n)}t=t.child}return t;case 5:return xo(t),e===null&&Ma(t),r=t.type,a=t.pendingProps,o=e===null?null:e.memoizedProps,s=a.children,Mi(r,a)?s=null:o!==null&&Mi(r,o)&&(t.flags|=32),Ws(e,t),zs(e,t,s,n),t.child;case 6:return e===null&&Ma(t),null;case 13:return Qs(e,t,n);case 4:return yo(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ua(t,null,r,n):zs(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:xs(r,a),Bs(e,t,r,a,n);case 7:return zs(e,t,t.pendingProps,n),t.child;case 8:return zs(e,t,t.pendingProps.children,n),t.child;case 12:return zs(e,t,t.pendingProps.children,n),t.child;case 10:a:{if(r=t.type._context,a=t.pendingProps,o=t.memoizedProps,s=a.value,I(Ga,r._currentValue),r._currentValue=s,o!==null)if(Rr(o.value,s)){if(o.children===a.children&&!ta.current){t=oc(e,t,n);break a}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){s=o.child;for(var l=c.firstContext;l!==null;){if(l.context===r){if(o.tag===1){l=so(-1,n&-n),l.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?l.next=l:(l.next=d.next,d.next=l),u.pending=l}}o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Za(o.return,n,t),c.lanes|=n;break}l=l.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(i(341));s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),Za(s,n,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}zs(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,Qa(t,n),a=$a(a),r=r(a),t.flags|=1,zs(e,t,r,n),t.child;case 14:return r=t.type,a=xs(r,t.pendingProps),a=xs(r.type,a),Vs(e,t,r,a,n);case 15:return Hs(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:xs(r,a),ac(e,t),t.tag=1,z(r)?(e=!0,oa(t)):e=!1,Qa(t,n),Ts(t,r,a),Ds(t,r,a,n),qs(null,t,r,!0,e,n);case 19:return ic(e,t,n);case 22:return Us(e,t,n)}throw Error(i(156,t.tag))};function Wl(e,t){return Ct(e,t)}function Gl(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Kl(e,t,n,r){return new Gl(e,t,n,r)}function ql(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Jl(e){if(typeof e==`function`)return+!!ql(e);if(e!=null){if(e=e.$$typeof,e===ie)return 11;if(e===se)return 14}return 2}function Yl(e,t){var n=e.alternate;return n===null?(n=Kl(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Xl(e,t,n,r,a,o){var s=2;if(r=e,typeof e==`function`)ql(e)&&(s=1);else if(typeof e==`string`)s=5;else a:switch(e){case E:return Zl(n.children,a,o,t);case ee:s=8,a|=8;break;case te:return e=Kl(12,n,t,a|2),e.elementType=te,e.lanes=o,e;case ae:return e=Kl(13,n,t,a),e.elementType=ae,e.lanes=o,e;case oe:return e=Kl(19,n,t,a),e.elementType=oe,e.lanes=o,e;case le:return Ql(n,a,o,t);default:if(typeof e==`object`&&e)switch(e.$$typeof){case ne:s=10;break a;case re:s=9;break a;case ie:s=11;break a;case se:s=14;break a;case ce:s=16,r=null;break a}throw Error(i(130,e==null?e:typeof e,``))}return t=Kl(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Zl(e,t,n,r){return e=Kl(7,e,r,t),e.lanes=n,e}function Ql(e,t,n,r){return e=Kl(22,e,r,t),e.elementType=le,e.lanes=n,e.stateNode={isHidden:!1},e}function $l(e,t,n){return e=Kl(6,e,null,t),e.lanes=n,e}function eu(e,t,n){return t=Kl(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function tu(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Jt(0),this.expirationTimes=Jt(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Jt(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function nu(e,t,n,r,i,a,o,s,c){return e=new tu(e,t,n,s,c),t===1?(t=1,!0===a&&(t|=8)):t=0,a=Kl(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ao(a),e}function ru(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:T,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}function iu(e){if(!e)return ea;e=e._reactInternals;a:{if(vt(e)!==e||e.tag!==1)throw Error(i(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break a;case 1:if(z(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break a}}t=t.return}while(t!==null);throw Error(i(171))}if(e.tag===1){var n=e.type;if(z(n))return aa(e,n,t)}return t}function au(e,t,n,r,i,a,o,s,c){return e=nu(n,r,!0,e,i,a,o,s,c),e.context=iu(null),n=e.current,r=pl(),i=ml(n),a=so(r,i),a.callback=t??null,co(n,a,i),e.current.lanes=i,Yt(e,i,r),gl(e,r),e}function ou(e,t,n,r){var i=t.current,a=pl(),o=ml(i);return n=iu(n),t.context===null?t.context=n:t.pendingContext=n,t=so(a,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=co(i,t,o),e!==null&&(hl(e,i,o,a),lo(e,i,o)),o}function su(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function cu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function lu(e,t){cu(e,t),(e=e.alternate)&&cu(e,t)}function uu(){return null}var du=typeof reportError==`function`?reportError:function(e){console.error(e)};function fu(e){this._internalRoot=e}pu.prototype.render=fu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));ou(e,t,null,null)},pu.prototype.unmount=fu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;wl(function(){ou(null,e,null,null)}),t[Wi]=null}};function pu(e){this._internalRoot=e}pu.prototype.unstable_scheduleHydration=function(e){if(e){var t=nn();e={blockedOn:null,target:e,priority:t};for(var n=0;n<fn.length&&t!==0&&t<fn[n].priority;n++);fn.splice(n,0,e),n===0&&gn(e)}};function mu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function hu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==` react-mount-point-unstable `))}function gu(){}function _u(e,t,n,r,i){if(i){if(typeof r==`function`){var a=r;r=function(){var e=su(o);a.call(e)}}var o=au(t,r,e,0,null,!1,!1,``,gu);return e._reactRootContainer=o,e[Wi]=o.current,vi(e.nodeType===8?e.parentNode:e),wl(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r==`function`){var s=r;r=function(){var e=su(c);s.call(e)}}var c=nu(e,0,!1,null,null,!1,!1,``,gu);return e._reactRootContainer=c,e[Wi]=c.current,vi(e.nodeType===8?e.parentNode:e),wl(function(){ou(t,c,n,r)}),c}function vu(e,t,n,r,i){var a=n._reactRootContainer;if(a){var o=a;if(typeof i==`function`){var s=i;i=function(){var e=su(o);s.call(e)}}ou(t,o,e,i)}else o=_u(n,t,e,i,r);return su(o)}$t=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Ht(t.pendingLanes);n!==0&&(Zt(t,n|1),gl(t,k()),!(J&6)&&(tl=k()+500,pa()))}break;case 13:wl(function(){var t=ro(e,1);t!==null&&hl(t,e,1,pl())}),lu(e,1)}},en=function(e){if(e.tag===13){var t=ro(e,134217728);t!==null&&hl(t,e,134217728,pl()),lu(e,134217728)}},tn=function(e){if(e.tag===13){var t=ml(e),n=ro(e,t);n!==null&&hl(n,e,t,pl()),lu(e,t)}},nn=function(){return A},rn=function(e,t){var n=A;try{return A=e,t()}finally{A=n}},Ze=function(e,t,n){switch(t){case`input`:if(Oe(e,n),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name=`+JSON.stringify(``+t)+`][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=Xi(r);if(!a)throw Error(i(90));Ce(r),Oe(r,a)}}}break;case`textarea`:Fe(e,n);break;case`select`:t=n.value,t!=null&&Me(e,!!n.multiple,t,!1)}},rt=Cl,it=wl;var yu={usingClientEntryPoint:!1,Events:[Yi,P,Xi,tt,nt,Cl]},bu={findFiberByHostInstance:Ji,bundleType:0,version:`18.3.1`,rendererPackageName:`react-dom`},xu={bundleType:bu.bundleType,version:bu.version,rendererPackageName:bu.rendererPackageName,rendererConfig:bu.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:C.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=xt(e),e===null?null:e.stateNode},findFiberByHostInstance:bu.findFiberByHostInstance||uu,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:`18.3.1-next-f1338f8080-20240426`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Su=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Su.isDisabled&&Su.supportsFiber)try{Nt=Su.inject(xu),Pt=Su}catch{}}e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yu,e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!mu(t))throw Error(i(200));return ru(e,t,null,n)},e.createRoot=function(e,t){if(!mu(e))throw Error(i(299));var n=!1,r=``,a=du;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=nu(e,1,!1,null,null,n,!1,r,a),e[Wi]=t.current,vi(e.nodeType===8?e.parentNode:e),new fu(t)},e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=xt(t),e=e===null?null:e.stateNode,e},e.flushSync=function(e){return wl(e)},e.hydrate=function(e,t,n){if(!hu(t))throw Error(i(200));return vu(null,e,t,!0,n)},e.hydrateRoot=function(e,t,n){if(!mu(e))throw Error(i(405));var r=n!=null&&n.hydratedSources||null,a=!1,o=``,s=du;if(n!=null&&(!0===n.unstable_strictMode&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=au(t,null,e,1,n??null,a,!1,o,s),e[Wi]=t.current,vi(e),r)for(e=0;e<r.length;e++)n=r[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new pu(t)},e.render=function(e,t,n){if(!hu(t))throw Error(i(200));return vu(null,e,t,!1,n)},e.unmountComponentAtNode=function(e){if(!hu(e))throw Error(i(40));return e._reactRootContainer?(wl(function(){vu(null,null,e,!1,function(){e._reactRootContainer=null,e[Wi]=null})}),!0):!1},e.unstable_batchedUpdates=Cl,e.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!hu(n))throw Error(i(200));if(e==null||e._reactInternals===void 0)throw Error(i(38));return vu(e,t,n,!1,r)},e.version=`18.3.1-next-f1338f8080-20240426`})),f=c(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=d()})),p=c((e=>{var t=f();e.createRoot=t.createRoot,e.hydrateRoot=t.hydrateRoot})),m=t(r());f();var h=t(p(),1);function g(){return g=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},g.apply(null,arguments)}var _;(function(e){e.Pop=`POP`,e.Push=`PUSH`,e.Replace=`REPLACE`})(_||={});var v=`popstate`;function y(e){e===void 0&&(e={});function t(e,t){let{pathname:n,search:r,hash:i}=e.location;return w(``,{pathname:n,search:r,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||`default`)}function n(e,t){return typeof t==`string`?t:T(t)}return ee(t,n,null,e)}function b(e,t){if(e===!1||e==null)throw Error(t)}function x(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function S(){return Math.random().toString(36).substr(2,8)}function C(e,t){return{usr:e.state,key:e.key,idx:t}}function w(e,t,n,r){return n===void 0&&(n=null),g({pathname:typeof e==`string`?e:e.pathname,search:``,hash:``},typeof t==`string`?E(t):t,{state:n,key:t&&t.key||r||S()})}function T(e){let{pathname:t=`/`,search:n=``,hash:r=``}=e;return n&&n!==`?`&&(t+=n.charAt(0)===`?`?n:`?`+n),r&&r!==`#`&&(t+=r.charAt(0)===`#`?r:`#`+r),t}function E(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function ee(e,t,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=_.Pop,c=null,l=u();l??(l=0,o.replaceState(g({},o.state,{idx:l}),``));function u(){return(o.state||{idx:null}).idx}function d(){s=_.Pop;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=_.Push;let r=w(h.location,e,t);n&&n(r,e),l=u()+1;let d=C(r,l),f=h.createHref(r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=_.Replace;let r=w(h.location,e,t);n&&n(r,e),l=u();let i=C(r,l),d=h.createHref(r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){let t=i.location.origin===`null`?i.location.href:i.location.origin,n=typeof e==`string`?e:T(e);return n=n.replace(/ $/,`%20`),b(t,`No window.location.(origin|href) available to create URL for href: `+n),new URL(n,t)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(v,d),c=e,()=>{i.removeEventListener(v,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}var te;(function(e){e.data=`data`,e.deferred=`deferred`,e.redirect=`redirect`,e.error=`error`})(te||={});function ne(e,t,n){return n===void 0&&(n=`/`),re(e,t,n,!1)}function re(e,t,n,r){let i=ye((typeof t==`string`?E(t):t).pathname||`/`,n);if(i==null)return null;let a=ie(e);oe(a);let o=null,s=ve(i);for(let e=0;o==null&&e<a.length;++e)o=he(a[e],s,r);return o}function ie(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r=``);let i=(e,i,a)=>{let o={relativePath:a===void 0?e.path||``:a,caseSensitive:e.caseSensitive===!0,childrenIndex:i,route:e};o.relativePath.startsWith(`/`)&&(b(o.relativePath.startsWith(r),`Absolute route path "`+o.relativePath+`" nested under path `+(`"`+r+`" is not valid. An absolute child route path `)+`must start with the combined path of all its parent routes.`),o.relativePath=o.relativePath.slice(r.length));let s=ke([r,o.relativePath]),c=n.concat(o);e.children&&e.children.length>0&&(b(e.index!==!0,`Index routes must not have child routes. Please remove `+(`all child routes from route path "`+s+`".`)),ie(e.children,t,c,s)),!(e.path==null&&!e.index)&&t.push({path:s,score:pe(s,e.index),routesMeta:c})};return e.forEach((e,t)=>{var n;if(e.path===``||!((n=e.path)!=null&&n.includes(`?`)))i(e,t);else for(let n of ae(e.path))i(e,t,n)}),t}function ae(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=ae(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function oe(e){e.sort((e,t)=>e.score===t.score?me(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var se=/^:[\w-]+$/,ce=3,le=2,ue=1,de=10,D=-2,fe=e=>e===`*`;function pe(e,t){let n=e.split(`/`),r=n.length;return n.some(fe)&&(r+=D),t&&(r+=le),n.filter(e=>!fe(e)).reduce((e,t)=>e+(se.test(t)?ce:t===``?ue:de),r)}function me(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function he(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=ge({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=ge({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:ke([a,u.pathname]),pathnameBase:Ae(ke([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=ke([a,u.pathnameBase]))}return o}function ge(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=_e(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,t,n)=>{let{paramName:r,isOptional:i}=t;if(r===`*`){let e=s[n]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let c=s[n];return i&&!c?e[r]=void 0:e[r]=(c||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function _e(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),x(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "`+e+`" will be treated as if it were `+(`"`+e.replace(/\*$/,`/*`)+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+(`please change the route path to "`+e.replace(/\*$/,`/*`)+`".`));let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n)=>(r.push({paramName:t,isOptional:n!=null}),n?`/?([^\\/]+)?`:`/([^\\/]+)`));return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function ve(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return x(!1,`The URL path "`+e+`" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent `+(`encoding (`+t+`).`)),e}}function ye(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var be=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,xe=e=>be.test(e);function Se(e,t){t===void 0&&(t=`/`);let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?E(e):e,a;if(n)if(xe(n))a=n;else{if(n.includes(`//`)){let e=n;n=Oe(n),x(!1,`Pathnames cannot have embedded double slashes - normalizing `+(e+` -> `+n))}a=n.startsWith(`/`)?Ce(n.substring(1),`/`):Ce(n,t)}else a=t;return{pathname:a,search:je(r),hash:Me(i)}}function Ce(e,t){let n=t.replace(/\/+$/,``).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function we(e,t,n,r){return`Cannot include a '`+e+`' character in a manually specified `+("`to."+t+"` field ["+JSON.stringify(r)+`].  Please separate it out to the `)+("`to."+n+"` field. Alternatively you may provide the full path as ")+`a string in <Link to="..."> and the router will parse it for you.`}function Te(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Ee(e,t){let n=Te(e);return t?n.map((e,t)=>t===n.length-1?e.pathname:e.pathnameBase):n.map(e=>e.pathnameBase)}function De(e,t,n,r){r===void 0&&(r=!1);let i;typeof e==`string`?i=E(e):(i=g({},e),b(!i.pathname||!i.pathname.includes(`?`),we(`?`,`pathname`,`search`,i)),b(!i.pathname||!i.pathname.includes(`#`),we(`#`,`pathname`,`hash`,i)),b(!i.search||!i.search.includes(`#`),we(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Se(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Oe=e=>e.replace(/\/\/+/g,`/`),ke=e=>Oe(e.join(`/`)),Ae=e=>e.replace(/\/+$/,``).replace(/^\/*/,`/`),je=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Me=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e;function Ne(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}var Pe=[`post`,`put`,`patch`,`delete`];new Set(Pe);var Fe=[`get`,...Pe];new Set(Fe);function Ie(){return Ie=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ie.apply(null,arguments)}var Le=m.createContext(null),Re=m.createContext(null),ze=m.createContext(null),Be=m.createContext(null),Ve=m.createContext({outlet:null,matches:[],isDataRoute:!1}),He=m.createContext(null);function Ue(e,t){let{relative:n}=t===void 0?{}:t;!We()&&b(!1);let{basename:r,navigator:i}=m.useContext(ze),{hash:a,pathname:o,search:s}=Ze(e,{relative:n}),c=o;return r!==`/`&&(c=o===`/`?r:ke([r,o])),i.createHref({pathname:c,search:s,hash:a})}function We(){return m.useContext(Be)!=null}function Ge(){return!We()&&b(!1),m.useContext(Be).location}function Ke(e){m.useContext(ze).static||m.useLayoutEffect(e)}function qe(){let{isDataRoute:e}=m.useContext(Ve);return e?ft():Je()}function Je(){!We()&&b(!1);let e=m.useContext(Le),{basename:t,future:n,navigator:r}=m.useContext(ze),{matches:i}=m.useContext(Ve),{pathname:a}=Ge(),o=JSON.stringify(Ee(i,n.v7_relativeSplatPath)),s=m.useRef(!1);return Ke(()=>{s.current=!0}),m.useCallback(function(n,i){if(i===void 0&&(i={}),!s.current)return;if(typeof n==`number`){r.go(n);return}let c=De(n,JSON.parse(o),a,i.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:ke([t,c.pathname])),(i.replace?r.replace:r.push)(c,i.state,i)},[t,r,o,a,e])}var Ye=m.createContext(null);function Xe(e){let t=m.useContext(Ve).outlet;return t&&m.createElement(Ye.Provider,{value:e},t)}function Ze(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=m.useContext(ze),{matches:i}=m.useContext(Ve),{pathname:a}=Ge(),o=JSON.stringify(Ee(i,r.v7_relativeSplatPath));return m.useMemo(()=>De(e,JSON.parse(o),a,n===`path`),[e,o,a,n])}function Qe(e,t){return $e(e,t)}function $e(e,t,n,r){!We()&&b(!1);let{navigator:i}=m.useContext(ze),{matches:a}=m.useContext(Ve),o=a[a.length-1],s=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:`/`;o&&o.route;let l=Ge(),u;if(t){let e=typeof t==`string`?E(t):t;!(c===`/`||e.pathname?.startsWith(c))&&b(!1),u=e}else u=l;let d=u.pathname||`/`,f=d;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);f=`/`+d.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let p=ne(e,{pathname:f}),h=it(p&&p.map(e=>Object.assign({},e,{params:Object.assign({},s,e.params),pathname:ke([c,i.encodeLocation?i.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:ke([c,i.encodeLocation?i.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])})),a,n,r);return t&&h?m.createElement(Be.Provider,{value:{location:Ie({pathname:`/`,search:``,hash:``,state:null,key:`default`},u),navigationType:_.Pop}},h):h}function et(){let e=dt(),t=Ne(e)?e.status+` `+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null;return m.createElement(m.Fragment,null,m.createElement(`h2`,null,`Unexpected Application Error!`),m.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?m.createElement(`pre`,{style:{padding:`0.5rem`,backgroundColor:`rgba(200,200,200, 0.5)`}},n):null,null)}var tt=m.createElement(et,null),nt=class extends m.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error(`React Router caught the following error during render`,e,t)}render(){return this.state.error===void 0?this.props.children:m.createElement(Ve.Provider,{value:this.props.routeContext},m.createElement(He.Provider,{value:this.state.error,children:this.props.component}))}};function rt(e){let{routeContext:t,match:n,children:r}=e,i=m.useContext(Le);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),m.createElement(Ve.Provider,{value:t},r)}function it(e,t,n,r){if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let a=e,o=n?.errors;if(o!=null){let e=a.findIndex(e=>e.route.id&&o?.[e.route.id]!==void 0);!(e>=0)&&b(!1),a=a.slice(0,Math.min(a.length,e+1))}let s=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let e=0;e<a.length;e++){let t=a[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(c=e),t.route.id){let{loaderData:e,errors:r}=n,i=t.route.loader&&e[t.route.id]===void 0&&(!r||r[t.route.id]===void 0);if(t.route.lazy||i){s=!0,a=c>=0?a.slice(0,c+1):[a[0]];break}}}return a.reduceRight((e,r,i)=>{let l,u=!1,d=null,f=null;n&&(l=o&&r.route.id?o[r.route.id]:void 0,d=r.route.errorElement||tt,s&&(c<0&&i===0?(mt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),u=!0,f=null):c===i&&(u=!0,f=r.route.hydrateFallbackElement||null)));let p=t.concat(a.slice(0,i+1)),h=()=>{let t;return t=l?d:u?f:r.route.Component?m.createElement(r.route.Component,null):r.route.element?r.route.element:e,m.createElement(rt,{match:r,routeContext:{outlet:e,matches:p,isDataRoute:n!=null},children:t})};return n&&(r.route.ErrorBoundary||r.route.errorElement||i===0)?m.createElement(nt,{location:n.location,revalidation:n.revalidation,component:d,error:l,children:h(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):h()},null)}var at=function(e){return e.UseBlocker=`useBlocker`,e.UseRevalidator=`useRevalidator`,e.UseNavigateStable=`useNavigate`,e}(at||{}),ot=function(e){return e.UseBlocker=`useBlocker`,e.UseLoaderData=`useLoaderData`,e.UseActionData=`useActionData`,e.UseRouteError=`useRouteError`,e.UseNavigation=`useNavigation`,e.UseRouteLoaderData=`useRouteLoaderData`,e.UseMatches=`useMatches`,e.UseRevalidator=`useRevalidator`,e.UseNavigateStable=`useNavigate`,e.UseRouteId=`useRouteId`,e}(ot||{});function st(e){let t=m.useContext(Le);return!t&&b(!1),t}function ct(e){let t=m.useContext(Re);return!t&&b(!1),t}function lt(e){let t=m.useContext(Ve);return!t&&b(!1),t}function ut(e){let t=lt(e),n=t.matches[t.matches.length-1];return!n.route.id&&b(!1),n.route.id}function dt(){let e=m.useContext(He),t=ct(ot.UseRouteError),n=ut(ot.UseRouteError);return e===void 0?t.errors?.[n]:e}function ft(){let{router:e}=st(at.UseNavigateStable),t=ut(ot.UseNavigateStable),n=m.useRef(!1);return Ke(()=>{n.current=!0}),m.useCallback(function(r,i){i===void 0&&(i={}),n.current&&(typeof r==`number`?e.navigate(r):e.navigate(r,Ie({fromRouteId:t},i)))},[e,t])}var pt={};function mt(e,t,n){!t&&!pt[e]&&(pt[e]=!0)}var ht=(e,t,n)=>(``+t+("You can use the `"+e+"` future flag to opt-in early. ")+(`For more information, see `+n+`.`),void 0);function gt(e,t){e?.v7_startTransition===void 0&&ht(`v7_startTransition`,"React Router will begin wrapping state updates in `React.startTransition` in v7",`https://reactrouter.com/v6/upgrading/future#v7_starttransition`),e?.v7_relativeSplatPath===void 0&&(!t||t.v7_relativeSplatPath===void 0)&&ht(`v7_relativeSplatPath`,`Relative route resolution within Splat routes is changing in v7`,`https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath`),t&&(t.v7_fetcherPersist===void 0&&ht(`v7_fetcherPersist`,`The persistence behavior of fetchers is changing in v7`,`https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist`),t.v7_normalizeFormMethod===void 0&&ht(`v7_normalizeFormMethod`,"Casing of `formMethod` fields is being normalized to uppercase in v7",`https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod`),t.v7_partialHydration===void 0&&ht(`v7_partialHydration`,"`RouterProvider` hydration behavior is changing in v7",`https://reactrouter.com/v6/upgrading/future#v7_partialhydration`),t.v7_skipActionErrorRevalidation===void 0&&ht(`v7_skipActionErrorRevalidation`,"The revalidation behavior after 4xx/5xx `action` responses is changing in v7",`https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation`))}function _t(e){let{to:t,replace:n,state:r,relative:i}=e;!We()&&b(!1);let{future:a,static:o}=m.useContext(ze),{matches:s}=m.useContext(Ve),{pathname:c}=Ge(),l=qe(),u=De(t,Ee(s,a.v7_relativeSplatPath),c,i===`path`),d=JSON.stringify(u);return m.useEffect(()=>l(JSON.parse(d),{replace:n,state:r,relative:i}),[l,d,i,n,r]),null}function vt(e){return Xe(e.context)}function O(e){b(!1)}function yt(e){let{basename:t=`/`,children:n=null,location:r,navigationType:i=_.Pop,navigator:a,static:o=!1,future:s}=e;We()&&b(!1);let c=t.replace(/^\/*/,`/`),l=m.useMemo(()=>({basename:c,navigator:a,static:o,future:Ie({v7_relativeSplatPath:!1},s)}),[c,s,a,o]);typeof r==`string`&&(r=E(r));let{pathname:u=`/`,search:d=``,hash:f=``,state:p=null,key:h=`default`}=r,g=m.useMemo(()=>{let e=ye(u,c);return e==null?null:{location:{pathname:e,search:d,hash:f,state:p,key:h},navigationType:i}},[c,u,d,f,p,h,i]);return g==null?null:m.createElement(ze.Provider,{value:l},m.createElement(Be.Provider,{children:n,value:g}))}function bt(e){let{children:t,location:n}=e;return Qe(St(t),n)}var xt=function(e){return e[e.pending=0]=`pending`,e[e.success=1]=`success`,e[e.error=2]=`error`,e}(xt||{});new Promise(()=>{}),m.Component;function St(e,t){t===void 0&&(t=[]);let n=[];return m.Children.forEach(e,(e,r)=>{if(!m.isValidElement(e))return;let i=[...t,r];if(e.type===m.Fragment){n.push.apply(n,St(e.props.children,i));return}e.type!==O&&b(!1),!(!e.props.index||!e.props.children)&&b(!1);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=St(e.props.children,i)),n.push(a)}),n}function Ct(){return Ct=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ct.apply(null,arguments)}function wt(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function Tt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Et(e,t){return e.button===0&&(!t||t===`_self`)&&!Tt(e)}var k=[`onClick`,`relative`,`reloadDocument`,`replace`,`state`,`target`,`to`,`preventScrollReset`,`viewTransition`],Dt=[`aria-current`,`caseSensitive`,`className`,`end`,`style`,`to`,`viewTransition`,`children`],Ot=`6`;try{window.__reactRouterVersion=Ot}catch{}var kt=m.createContext({isTransitioning:!1}),At=m.startTransition;function jt(e){let{basename:t,children:n,future:r,window:i}=e,a=m.useRef();a.current??=y({window:i,v5Compat:!0});let o=a.current,[s,c]=m.useState({action:o.action,location:o.location}),{v7_startTransition:l}=r||{},u=m.useCallback(e=>{l&&At?At(()=>c(e)):c(e)},[c,l]);return m.useLayoutEffect(()=>o.listen(u),[o,u]),m.useEffect(()=>gt(r),[r]),m.createElement(yt,{basename:t,children:n,location:s.location,navigationType:s.action,navigator:o,future:r})}var Mt=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Nt=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Pt=m.forwardRef(function(e,t){let{onClick:n,relative:r,reloadDocument:i,replace:a,state:o,target:s,to:c,preventScrollReset:l,viewTransition:u}=e,d=wt(e,k),{basename:f}=m.useContext(ze),p,h=!1;if(typeof c==`string`&&Nt.test(c)&&(p=c,Mt))try{let e=new URL(window.location.href),t=c.startsWith(`//`)?new URL(e.protocol+c):new URL(c),n=ye(t.pathname,f);t.origin===e.origin&&n!=null?c=n+t.search+t.hash:h=!0}catch{}let g=Ue(c,{relative:r}),_=zt(c,{replace:a,state:o,target:s,preventScrollReset:l,relative:r,viewTransition:u});function v(e){n&&n(e),e.defaultPrevented||_(e)}return m.createElement(`a`,Ct({},d,{href:p||g,onClick:h||i?n:v,ref:t,target:s}))}),Ft=m.forwardRef(function(e,t){let{"aria-current":n=`page`,caseSensitive:r=!1,className:i=``,end:a=!1,style:o,to:s,viewTransition:c,children:l}=e,u=wt(e,Dt),d=Ze(s,{relative:u.relative}),f=Ge(),p=m.useContext(Re),{navigator:h,basename:g}=m.useContext(ze),_=p!=null&&Bt(d)&&c===!0,v=h.encodeLocation?h.encodeLocation(d).pathname:d.pathname,y=f.pathname,b=p&&p.navigation&&p.navigation.location?p.navigation.location.pathname:null;r||(y=y.toLowerCase(),b=b?b.toLowerCase():null,v=v.toLowerCase()),b&&g&&(b=ye(b,g)||b);let x=v!==`/`&&v.endsWith(`/`)?v.length-1:v.length,S=y===v||!a&&y.startsWith(v)&&y.charAt(x)===`/`,C=b!=null&&(b===v||!a&&b.startsWith(v)&&b.charAt(v.length)===`/`),w={isActive:S,isPending:C,isTransitioning:_},T=S?n:void 0,E;E=typeof i==`function`?i(w):[i,S?`active`:null,C?`pending`:null,_?`transitioning`:null].filter(Boolean).join(` `);let ee=typeof o==`function`?o(w):o;return m.createElement(Pt,Ct({},u,{"aria-current":T,className:E,ref:t,style:ee,to:s,viewTransition:c}),typeof l==`function`?l(w):l)}),It;(function(e){e.UseScrollRestoration=`useScrollRestoration`,e.UseSubmit=`useSubmit`,e.UseSubmitFetcher=`useSubmitFetcher`,e.UseFetcher=`useFetcher`,e.useViewTransitionState=`useViewTransitionState`})(It||={});var Lt;(function(e){e.UseFetcher=`useFetcher`,e.UseFetchers=`useFetchers`,e.UseScrollRestoration=`useScrollRestoration`})(Lt||={});function Rt(e){let t=m.useContext(Le);return!t&&b(!1),t}function zt(e,t){let{target:n,replace:r,state:i,preventScrollReset:a,relative:o,viewTransition:s}=t===void 0?{}:t,c=qe(),l=Ge(),u=Ze(e,{relative:o});return m.useCallback(t=>{Et(t,n)&&(t.preventDefault(),c(e,{replace:r===void 0?T(l)===T(u):r,state:i,preventScrollReset:a,relative:o,viewTransition:s}))},[l,c,u,r,i,n,e,a,o,s])}function Bt(e,t){t===void 0&&(t={});let n=m.useContext(kt);n??b(!1);let{basename:r}=Rt(It.useViewTransitionState),i=Ze(e,{relative:t.relative});if(!n.isTransitioning)return!1;let a=ye(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=ye(n.nextLocation.pathname,r)||n.nextLocation.pathname;return ge(i.pathname,o)!=null||ge(i.pathname,a)!=null}var Vt=e(`BellRing`,[[`path`,{d:`M10.268 21a2 2 0 0 0 3.464 0`,key:`vwvbt9`}],[`path`,{d:`M22 8c0-2.3-.8-4.3-2-6`,key:`5bb3ad`}],[`path`,{d:`M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326`,key:`11g9vi`}],[`path`,{d:`M4 2C2.8 3.7 2 5.7 2 8`,key:`tap9e0`}]]),Ht=e(`Building2`,[[`path`,{d:`M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z`,key:`1b4qmf`}],[`path`,{d:`M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2`,key:`i71pzd`}],[`path`,{d:`M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2`,key:`10jefs`}],[`path`,{d:`M10 6h4`,key:`1itunk`}],[`path`,{d:`M10 10h4`,key:`tcdvrf`}],[`path`,{d:`M10 14h4`,key:`kelpxr`}],[`path`,{d:`M10 18h4`,key:`1ulq68`}]]),Ut=e(`Car`,[[`path`,{d:`M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2`,key:`5owen`}],[`circle`,{cx:`7`,cy:`17`,r:`2`,key:`u2ysq9`}],[`path`,{d:`M9 17h6`,key:`r8uit2`}],[`circle`,{cx:`17`,cy:`17`,r:`2`,key:`axvx0g`}]]),Wt=e(`ChartColumn`,[[`path`,{d:`M3 3v16a2 2 0 0 0 2 2h16`,key:`c24i48`}],[`path`,{d:`M18 17V9`,key:`2bz60n`}],[`path`,{d:`M13 17V5`,key:`1frdt8`}],[`path`,{d:`M8 17v-3`,key:`17ska0`}]]),Gt=e(`ClipboardList`,[[`rect`,{width:`8`,height:`4`,x:`8`,y:`2`,rx:`1`,ry:`1`,key:`tgr4d6`}],[`path`,{d:`M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2`,key:`116196`}],[`path`,{d:`M12 11h4`,key:`1jrz19`}],[`path`,{d:`M12 16h4`,key:`n85exb`}],[`path`,{d:`M8 11h.01`,key:`1dfujw`}],[`path`,{d:`M8 16h.01`,key:`18s6g9`}]]),Kt=e(`CloudUpload`,[[`path`,{d:`M12 13v8`,key:`1l5pq0`}],[`path`,{d:`M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242`,key:`1pljnt`}],[`path`,{d:`m8 17 4-4 4 4`,key:`1quai1`}]]),qt=e(`FileSpreadsheet`,[[`path`,{d:`M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z`,key:`1rqfz7`}],[`path`,{d:`M14 2v4a2 2 0 0 0 2 2h4`,key:`tnqrlb`}],[`path`,{d:`M8 13h2`,key:`yr2amv`}],[`path`,{d:`M14 13h2`,key:`un5t4a`}],[`path`,{d:`M8 17h2`,key:`2yhykz`}],[`path`,{d:`M14 17h2`,key:`10kma7`}]]),Jt=e(`FileText`,[[`path`,{d:`M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z`,key:`1rqfz7`}],[`path`,{d:`M14 2v4a2 2 0 0 0 2 2h4`,key:`tnqrlb`}],[`path`,{d:`M10 9H8`,key:`b1mrlr`}],[`path`,{d:`M16 13H8`,key:`t4e002`}],[`path`,{d:`M16 17H8`,key:`z1uh3a`}]]),Yt=e(`KeyRound`,[[`path`,{d:`M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z`,key:`1s6t7t`}],[`circle`,{cx:`16.5`,cy:`7.5`,r:`.5`,fill:`currentColor`,key:`w0ekpg`}]]),Xt=e(`LoaderCircle`,[[`path`,{d:`M21 12a9 9 0 1 1-6.219-8.56`,key:`13zald`}]]),Zt=e(`LogIn`,[[`path`,{d:`M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4`,key:`u53s6r`}],[`polyline`,{points:`10 17 15 12 10 7`,key:`1ail0h`}],[`line`,{x1:`15`,x2:`3`,y1:`12`,y2:`12`,key:`v6grx8`}]]),A=e(`LogOut`,[[`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`,key:`1uf3rs`}],[`polyline`,{points:`16 17 21 12 16 7`,key:`1gabdz`}],[`line`,{x1:`21`,x2:`9`,y1:`12`,y2:`12`,key:`1uyos4`}]]),Qt=e(`Mail`,[[`rect`,{width:`20`,height:`16`,x:`2`,y:`4`,rx:`2`,key:`18n3k1`}],[`path`,{d:`m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7`,key:`1ocrg3`}]]),$t=e(`MapPinned`,[[`path`,{d:`M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0`,key:`11u0oz`}],[`circle`,{cx:`12`,cy:`8`,r:`2`,key:`1822b1`}],[`path`,{d:`M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712`,key:`q8zwxj`}]]),en=e(`Menu`,[[`line`,{x1:`4`,x2:`20`,y1:`12`,y2:`12`,key:`1e0a9i`}],[`line`,{x1:`4`,x2:`20`,y1:`6`,y2:`6`,key:`1owob3`}],[`line`,{x1:`4`,x2:`20`,y1:`18`,y2:`18`,key:`yk5zj1`}]]),tn=e(`Moon`,[[`path`,{d:`M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z`,key:`a7tn18`}]]),nn=e(`Package`,[[`path`,{d:`M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z`,key:`1a0edw`}],[`path`,{d:`M12 22V12`,key:`d0xqtd`}],[`path`,{d:`m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7`,key:`yx3hmr`}],[`path`,{d:`m7.5 4.27 9 5.15`,key:`1c824w`}]]),rn=e(`ReceiptText`,[[`path`,{d:`M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z`,key:`q3az6g`}],[`path`,{d:`M14 8H8`,key:`1l3xfs`}],[`path`,{d:`M16 12H8`,key:`1fr5h0`}],[`path`,{d:`M13 16H8`,key:`wsln4y`}]]),an=e(`RefreshCw`,[[`path`,{d:`M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`,key:`v9h5vc`}],[`path`,{d:`M21 3v5h-5`,key:`1q7to0`}],[`path`,{d:`M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`,key:`3uifl3`}],[`path`,{d:`M8 16H3v5`,key:`1cv678`}]]),on=e(`Settings`,[[`path`,{d:`M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z`,key:`1qme2f`}],[`circle`,{cx:`12`,cy:`12`,r:`3`,key:`1v7zrd`}]]),sn=e(`ShieldCheck`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),cn=e(`Star`,[[`path`,{d:`M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z`,key:`r04s7s`}]]),ln=e(`Sun`,[[`circle`,{cx:`12`,cy:`12`,r:`4`,key:`4exip2`}],[`path`,{d:`M12 2v2`,key:`tus03m`}],[`path`,{d:`M12 20v2`,key:`1lh1kg`}],[`path`,{d:`m4.93 4.93 1.41 1.41`,key:`149t6j`}],[`path`,{d:`m17.66 17.66 1.41 1.41`,key:`ptbguv`}],[`path`,{d:`M2 12h2`,key:`1t8f8n`}],[`path`,{d:`M20 12h2`,key:`1q8mjw`}],[`path`,{d:`m6.34 17.66-1.41 1.41`,key:`1m8zz5`}],[`path`,{d:`m19.07 4.93-1.41 1.41`,key:`1shlcs`}]]),un=e(`TriangleAlert`,[[`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,key:`wmoenq`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),dn=e(`Truck`,[[`path`,{d:`M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2`,key:`wrbu53`}],[`path`,{d:`M15 18H9`,key:`1lyqi6`}],[`path`,{d:`M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14`,key:`lysw3i`}],[`circle`,{cx:`17`,cy:`18`,r:`2`,key:`332jqn`}],[`circle`,{cx:`7`,cy:`18`,r:`2`,key:`19iecd`}]]),fn=e(`UserRoundPlus`,[[`path`,{d:`M2 21a8 8 0 0 1 13.292-6`,key:`bjp14o`}],[`circle`,{cx:`10`,cy:`8`,r:`5`,key:`o932ke`}],[`path`,{d:`M19 16v6`,key:`tddt3s`}],[`path`,{d:`M22 19h-6`,key:`vcuq98`}]]),pn=e(`Users`,[[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}],[`path`,{d:`M22 21v-2a4 4 0 0 0-3-3.87`,key:`kshegd`}],[`path`,{d:`M16 3.13a4 4 0 0 1 0 7.75`,key:`1da9ce`}]]),mn=e(`X`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]),j=o(),hn=class extends m.Component{state={error:null};static getDerivedStateFromError(e){return{error:e}}componentDidCatch(e,t){console.error(`Supply Flow render error`,e,t)}componentDidUpdate(e){e.resetKey!==this.props.resetKey&&this.state.error&&this.setState({error:null})}retry=()=>{this.setState({error:null})};render(){return this.state.error?(0,j.jsx)(`main`,{className:`app-error-boundary`,children:(0,j.jsxs)(`section`,{children:[(0,j.jsx)(un,{size:30}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`span`,{className:`eyebrow`,children:`Recuperacao do sistema`}),(0,j.jsx)(`h1`,{children:`Este modulo encontrou uma falha temporaria`}),(0,j.jsx)(`p`,{children:`O Supply Flow isolou o erro para evitar tela branca. Tente recarregar o modulo; se continuar, acesse outra aba pelo menu.`}),(0,j.jsx)(`small`,{children:this.state.error.message||`Erro inesperado ao renderizar a tela.`})]}),(0,j.jsxs)(`button`,{className:`primary-button`,type:`button`,onClick:this.retry,children:[(0,j.jsx)(an,{size:18}),`Tentar novamente`]})]})}):this.props.children}},gn=(0,m.createContext)(null),_n=2e4,vn=35e3;function yn(e){return e instanceof Error?e.message:`Nao foi possivel validar usuario e permissoes.`}async function bn(e,t,n){let r;try{return await Promise.race([e,new Promise((e,i)=>{r=setTimeout(()=>i(Error(n)),t)})])}finally{r&&clearTimeout(r)}}function xn({children:e}){let[t,r]=(0,m.useState)(null),[a,o]=(0,m.useState)(null),[s,c]=(0,m.useState)([]),[l,u]=(0,m.useState)(!0),[d,f]=(0,m.useState)(null),[p,h]=(0,m.useState)(!1),g=(0,m.useRef)(null),_=(0,m.useRef)(null),v=(0,m.useRef)(0),y=(0,m.useRef)(!0),b=(0,m.useRef)(0),x=(0,m.useCallback)(async e=>{if(!i||!e?.user)return{profile:null,obras:[]};let t=e.user.id,{data:n,error:r}=await i.from(`profiles`).select(`*`).eq(`id`,t).maybeSingle();if(r)throw r;let{data:a,error:o}=await i.from(`user_obras`).select(`obra:obras(*)`).eq(`user_id`,t);if(o)throw o;return{profile:n??null,obras:(a||[]).map(e=>e.obra).filter(Boolean)}},[]),S=(0,m.useCallback)(async(e,t={})=>{let n=t.attempt??0,i=t.runId??++v.current,a=e?.user.id??null;g.current=a,y.current&&(r(e),n===0&&f(null),t.showLoading!==!1&&u(!0));let s=!1;try{let t=await bn(x(e),_n,`Tempo excedido ao validar usuario e permissoes. Verifique sua conexao e tente novamente.`);if(!y.current||v.current!==i)return;_.current=a,b.current=0,o(t.profile),c(t.obras),f(null)}catch(r){if(!y.current||v.current!==i)return;console.warn(`Falha ao validar usuario e permissoes.`,r),n<1?(s=!0,setTimeout(()=>{y.current&&S(e,{showLoading:t.showLoading,attempt:n+1,runId:i})},800)):(_.current=null,o(null),c([]),f(yn(r)))}finally{!s&&y.current&&v.current===i&&u(!1)}},[x]),C=(0,m.useCallback)(async()=>{await S(t,{showLoading:!1})},[S,t]);(0,m.useEffect)(()=>{let e=!0;y.current=!0;async function t(){if(!i){u(!1);return}try{let{data:t,error:n}=await bn(i.auth.getSession(),_n,`Tempo excedido ao restaurar a sessao. Verifique sua conexao e tente novamente.`);if(n)throw n;e&&await S(t.session,{showLoading:!0})}catch(t){if(!e)return;console.warn(`Falha ao restaurar sessao.`,t),f(yn(t)),r(null),o(null),c([]),u(!1)}}t();let n=i?.auth.onAuthStateChange((t,n)=>{setTimeout(()=>{if(!e)return;let i=n?.user.id??null,a=g.current===i,o=_.current===i;if(t===`PASSWORD_RECOVERY`&&h(!0),i&&(t===`INITIAL_SESSION`||t===`TOKEN_REFRESHED`)&&a&&o){r(n);return}S(n,{showLoading:t!==`TOKEN_REFRESHED`})},0)});return()=>{e=!1,y.current=!1,n?.data.subscription.unsubscribe()}},[S]),(0,m.useEffect)(()=>{if(!l)return;let e=setTimeout(()=>{if(!y.current)return;console.warn(`Validacao de sessao demorou demais e foi destravada pelo watchdog.`);let e=b.current<2;b.current+=1,f(e?`Tempo excedido ao validar a sessao. Tentando recuperar automaticamente.`:`Tempo excedido ao validar a sessao. Saia e entre novamente se o problema persistir.`),u(!1),e&&setTimeout(()=>{y.current&&S(t,{showLoading:!0})},300)},vn);return()=>clearTimeout(e)},[S,l,t]);let w=(0,m.useMemo)(()=>({session:t,profile:a,obras:s,loading:l,error:d,configured:n,recoveryMode:p,signIn:async(e,t)=>{if(!i)throw Error(`Supabase não configurado.`);let{error:n}=await i.auth.signInWithPassword({email:e,password:t});if(n)throw n},signOut:async()=>{i&&(_.current=null,h(!1),await i.auth.signOut())},changePassword:async e=>{if(!i)throw Error(`Supabase nao configurado.`);let{error:t}=await i.auth.updateUser({password:e});if(t)throw t;try{let{error:e}=await i.rpc(`mark_own_password_changed`);if(e)throw e}catch(e){console.warn(`Senha alterada, mas falha ao limpar o sinalizador de troca obrigatoria.`,e)}h(!1),await C()},requestPasswordReset:async e=>{if(!i)throw Error(`Supabase nao configurado.`);let t=`${window.location.origin}/supply-flow-seel/alterar-senha`,{error:n}=await i.auth.resetPasswordForEmail(e,{redirectTo:t});if(n)throw n},refreshProfile:C}),[d,l,s,a,p,C,t]);return(0,j.jsx)(gn.Provider,{value:w,children:e})}function Sn(){let e=(0,m.useContext)(gn);if(!e)throw Error(`useAuth deve ser usado dentro de AuthProvider.`);return e}var Cn=new Map,wn=`supply-flow:async-data-invalidated`;function Tn(e,t={}){let n=Array.isArray(e)?e:e?[e]:[];t.clearCache&&(n.length?n.forEach(e=>Cn.delete(e)):Cn.clear()),typeof window<`u`&&window.dispatchEvent(new CustomEvent(wn,{detail:{keys:n}}))}function En(e,t=[],n={}){let r=n.cacheKey||e.toString(),i=Cn.get(r),[a,o]=(0,m.useState)(i?.data??null),[s,c]=(0,m.useState)(!i),[l,u]=(0,m.useState)(i?.error||``),d=(0,m.useRef)(i?.data??null),f=(0,m.useCallback)(async t=>{let n=On(t)?t:{},i=n.preserveScroll?Dn():null,a=d.current!==null;c(!n.silent&&!Cn.has(r)&&!a),u(``);try{let t=await e();Cn.set(r,{data:t,error:``}),d.current=t,o(t)}catch(e){let t=e instanceof Error?e.message:`Falha ao carregar dados.`;Cn.set(r,{data:Cn.get(r)?.data??null,error:t}),u(t)}finally{c(!1),kn(i)}},[r,...t]);return(0,m.useEffect)(()=>{Cn.has(r)||f()},[f]),(0,m.useEffect)(()=>{if(typeof window>`u`)return;function e(e){let t=e.detail?.keys||[];(!t.length||t.includes(r))&&f({preserveScroll:!0,silent:!0})}return window.addEventListener(wn,e),()=>window.removeEventListener(wn,e)},[r,f]),{data:a,loading:s,error:l,refresh:f}}function Dn(){return typeof window>`u`?null:{x:window.scrollX,y:window.scrollY}}function On(e){return!!(e&&typeof e==`object`&&(`preserveScroll`in e||`silent`in e))}function kn(e){!e||typeof window>`u`||window.requestAnimationFrame(()=>{window.scrollTo({left:e.x,top:e.y,behavior:`auto`}),window.requestAnimationFrame(()=>window.scrollTo({left:e.x,top:e.y,behavior:`auto`}))})}function An(e,t){let[n,r]=(0,m.useState)(()=>{if(typeof window>`u`)return t;try{let n=window.sessionStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}});return(0,m.useEffect)(()=>{if(!(typeof window>`u`))try{window.sessionStorage.setItem(e,JSON.stringify(n))}catch{}},[e,n]),[n,r]}var jn={dashboard:[`super_admin`,`admin_suprimentos`,`admin_orcamentos`,`admin_contratos`],alertas:[`super_admin`,`admin_orcamentos`],requisicoes:[`super_admin`,`admin_suprimentos`],orcamentos:[`super_admin`,`admin_orcamentos`],contratos:[`super_admin`,`admin_contratos`],fretes:[`super_admin`],nota_fiscal:[`super_admin`,`admin_suprimentos`],estoque_obras:[`super_admin`,`admin_suprimentos`],cadastro_materiais:[`super_admin`,`admin_suprimentos`],frota:[`super_admin`],fornecedores:[`super_admin`,`admin_suprimentos`],avaliacao_fornecedores:[`super_admin`],importacoes:[`super_admin`,`admin_suprimentos`,`admin_orcamentos`,`admin_contratos`],usuarios:[`super_admin`],settings:[`super_admin`]},Mn={dashboard:[`super_admin`,`admin_suprimentos`,`admin_orcamentos`,`admin_contratos`,`viewer_global`,`viewer`],alertas:[`super_admin`,`admin_suprimentos`,`admin_orcamentos`,`admin_contratos`,`viewer_global`,`viewer`],requisicoes:[`super_admin`,`admin_suprimentos`,`viewer_global`,`viewer`],orcamentos:[`super_admin`,`admin_orcamentos`,`viewer_global`,`viewer`],contratos:[`super_admin`,`admin_contratos`,`viewer_global`,`viewer`],fretes:[`super_admin`,`admin_suprimentos`,`admin_orcamentos`,`admin_contratos`,`viewer_global`,`viewer`],nota_fiscal:[`super_admin`,`admin_suprimentos`,`admin_orcamentos`,`admin_contratos`,`viewer_global`,`viewer`],estoque_obras:[`super_admin`,`admin_suprimentos`,`admin_orcamentos`,`admin_contratos`,`viewer_global`,`viewer`],cadastro_materiais:[`super_admin`,`admin_suprimentos`,`admin_orcamentos`,`admin_contratos`,`viewer_global`,`viewer`],frota:[`super_admin`,`admin_suprimentos`,`admin_orcamentos`,`admin_contratos`,`viewer_global`,`viewer`],fornecedores:[`super_admin`,`admin_suprimentos`,`viewer_global`,`viewer`],avaliacao_fornecedores:[`super_admin`,`admin_suprimentos`,`admin_orcamentos`,`admin_contratos`,`viewer_global`,`viewer`],importacoes:[`super_admin`,`admin_suprimentos`,`admin_orcamentos`,`admin_contratos`],usuarios:[`super_admin`],settings:[`super_admin`]},Nn=[{key:`dashboard`,label:`Dashboard`,description:`Indicadores consolidados e visao executiva.`},{key:`alertas`,label:`Alertas`,description:`Central de comentarios, respostas e pendencias.`},{key:`requisicoes`,label:`Requisicoes`,description:`RMs, fases de compra, compradores e OC.`},{key:`orcamentos`,label:`Orcamentos`,description:`Solicitacoes, kanban, comentarios, anexos e SLA.`},{key:`contratos`,label:`Contratos`,description:`Solicitacoes e processo detalhado de contratos.`},{key:`fretes`,label:`Fretes`,description:`Solicitacoes, kanban, cotacoes e mapa operacional.`},{key:`nota_fiscal`,label:`Nota fiscal`,description:`Solicitacoes de NF de simples remessa.`},{key:`estoque_obras`,label:`Estoque obras`,description:`Loja de materiais e solicitacoes de obra.`},{key:`cadastro_materiais`,label:`Cadastro materiais`,description:`Solicitacoes e cadastro de itens/materiais.`},{key:`frota`,label:`Frota`,description:`Veiculos, contratos, condutores e indicadores.`},{key:`fornecedores`,label:`Fornecedores`,description:`Mapa, cadastro e base de fornecedores.`},{key:`avaliacao_fornecedores`,label:`Avaliacao fornecedores`,description:`Avaliacoes, filtros por obra e relatorios.`},{key:`importacoes`,label:`Importacoes`,description:`Central unica de alimentacao das bases.`}];function Pn(e,t){return!!(e&&Mn[t].includes(e))}function Fn(e,t){return!!(e&&jn[t].includes(e))}function In(e,t){let n=Bn(e);if(n===`super_admin`)return!0;let r=Hn(e,t,`view`);return r===void 0?Pn(n,t):r}function Ln(e,t){let n=Bn(e);if(n===`super_admin`)return!0;let r=Hn(e,t,`manage`);return r===void 0?Fn(n,t):r}function Rn(e){return{super_admin:`Super admin`,admin_suprimentos:`Admin suprimentos`,admin_orcamentos:`Admin orçamentos`,admin_contratos:`Admin contratos`,viewer_global:`Visualizador global`,viewer:`Visualizador`}[e||`viewer`]}var zn=[`super_admin`,`admin_suprimentos`,`admin_orcamentos`,`admin_contratos`,`viewer_global`,`viewer`];function Bn(e){if(e)return typeof e==`string`?e:e.role}function Vn(e){if(!(!e||typeof e==`string`))return e.module_permissions}function Hn(e,t,n){let r=Vn(e)?.[t];if(r){if(n===`manage`)return typeof r.manage==`boolean`?r.manage:void 0;if(typeof r.view==`boolean`)return r.view;if(r.manage===!0)return!0}}var Un=`gestao_fretes_solicitacoes_v1`,Wn=`gestao_fretes_formulario_config_v1`,Gn=`gestao_fretes_cargo_items_labels_v1`,Kn=`seel_nf_simples_remessa_v1`,qn=`seel_nf_formulario_editor_v1`,Jn=`frota_veiculos_v4_importacao_inicial`,Yn=`frota_multas_v4_importacao_inicial`,Xn=`frota_medicoes_v4_integracoes`,Zn=`frota_responsavel_v4`,Qn=`frota_importacoes_operacionais_v1`,$n=`frota_medicoes_faturamento_importacoes_v2`,er=`obrastock_clean_state_v1`,tr=`seel_cadastro_itens_v1`,nr=`seel_cadastro_itens_formulario_editor_v1`,rr=`seel_supplier_evaluation_db_v10`,ir=`seel_form_google_forms_v8_sem_mapa_sem_un`,ar=`seel_requests_google_forms_exato_v1`,or=`orcamentos_form_spec_v1`,sr=`seel_fornecedores_items_v1`,cr=`seel_fornecedores_schema_v2`,lr=`seel_fornecedores_phase_averages_v1`,ur=`seel_fornecedores_quadrant_averages_v1`,dr=`supply_flow_fornecedores_map_v1`,fr={contratos:[ir],fretes:[Wn,Gn],nota_fiscal:[qn],frota:[Jn,Yn,Xn,Zn,Qn,$n],estoque_obras:[er],cadastro_materiais:[nr],avaliacao_fornecedores:[rr],fornecedores:[cr,lr,ur]};function pr(e){let t=fr[e]||[];return e===`contratos`?[ar,...t]:e===`fretes`?[Un,...t]:e===`nota_fiscal`?[Kn,...t]:e===`fornecedores`?[sr,...t]:e===`cadastro_materiais`?[tr,...t]:t}async function mr(e){let t={},n=fr[e]||[];if(n.length&&(Object.assign(t,await Tr(n)),Dr(t,n)),e===`fretes`){let e=await hr(),n=kr(Un);e?.length?t[Un]=e:n.length&&(t[Un]=n)}if(e===`nota_fiscal`){let e=await gr(),n=kr(Kn);e?.length?t[Kn]=e:(e||n.length)&&(t[Kn]=n)}if(e===`contratos`){let e=await _r();if(e)if(e.length)t[ar]=e;else{let e=await Cr(ar);t[ar]=Array.isArray(e)?e:[]}else{let e=await Cr(ar),n=kr(ar);t[ar]=Array.isArray(e)?e:n}}if(e===`estoque_obras`){let e=await vr();e&&(t[er]={...Ar(t.obrastock_clean_state_v1)||{},orders:e})}if(e===`avaliacao_fornecedores`){let e=await yr();e&&(t[rr]={...Ar(t.seel_supplier_evaluation_db_v10)||{cycles:[],suppliers:[]},evaluations:e})}if(e===`fornecedores`){let e=await br(),n=kr(sr);e?.length?t[sr]=e:(e||n.length)&&(t[sr]=n)}if(e===`cadastro_materiais`){let e=await xr(),n=kr(tr);e?.length?t[tr]=e:(e||n.length)&&(t[tr]=n)}return t}async function hr(){return Er(`fretes_solicitacoes`,`updated_at`,`desc`)}async function gr(){return Er(`nf_simples_remessa_solicitacoes`,`updated_at`,`desc`)}async function _r(){try{let e=s(),t=1e3,n=[];for(let r=0;;r+=t){let{data:i,error:a}=await e.from(`contratos`).select(`id,codigo_embutido,obra_id,solicitante,email_solicitante,centro_custo,tipo_documento,urgencia,prazo_urgencia,status,fase_compor,payload,created_at,updated_at`).order(`updated_at`,{ascending:!1}).range(r,r+t-1);if(a)throw a;if(n.push(...i||[]),!i||i.length<t)break}return n.map(Fr)}catch(e){return console.warn(`Nao foi possivel carregar contratos compartilhados. Usando cache local quando existir.`,e),null}}async function vr(){return Er(`estoque_obras_pedidos`,`updated_at`,`desc`)}async function yr(){return Er(`avaliacao_fornecedores_avaliacoes`,`updated_at`,`desc`)}async function br(){return Er(`fornecedores_cadastros`,`updated_at`,`desc`)}async function xr(){return Er(`cadastro_materiais_solicitacoes`,`updated_at`,`desc`)}async function Sr(){try{let e=s(),t=1e3,n=[];for(let r=0;;r+=t){let{data:i,error:a}=await e.from(`fornecedores`).select(`id,codigo,nome,categoria,produto_servico,cidade,uf,regiao,telefone,email,site,cadastro_ativo,latitude,longitude,payload,created_at,updated_at`).order(`nome`,{ascending:!0}).range(r,r+t-1);if(a)throw a;if(n.push(...i||[]),!i||i.length<t)break}return n.map(jr)}catch(e){return console.warn(`Nao foi possivel carregar o mapa de fornecedores compartilhado.`,e),null}}async function Cr(e){try{let{data:t,error:n}=await s().from(`embedded_app_state`).select(`payload`).eq(`storage_key`,e).maybeSingle();if(n)throw n;return t?.payload??null}catch(e){return console.warn(`Nao foi possivel carregar estado compartilhado.`,e),null}}async function wr(e,t,n){let r=s(),{data:{user:i}}=await r.auth.getUser(),{error:a}=await r.from(`embedded_app_state`).upsert({storage_key:t,module_key:e,payload:n,updated_by:i?.id||null},{onConflict:`storage_key`});if(a)throw a}async function Tr(e){if(!e.length)return{};try{let{data:t,error:n}=await s().from(`embedded_app_state`).select(`storage_key,payload`).in(`storage_key`,e);if(n)throw n;return Object.fromEntries((t||[]).map(e=>{let t=e;return[t.storage_key,t.payload]}))}catch(e){return console.warn(`Nao foi possivel carregar estado compartilhado dos modulos.`,e),{}}}async function Er(e,t,n){try{let{data:r,error:i}=await s().from(e).select(`payload`).order(t,{ascending:n===`asc`});if(i)throw i;return(r||[]).map(e=>e.payload).filter(e=>!!e&&typeof e==`object`&&!Array.isArray(e))}catch(t){return console.warn(`Nao foi possivel carregar dados compartilhados de ${e}. Usando cache local quando existir.`,t),null}}function Dr(e,t){t.forEach(t=>{if(e[t]!==void 0)return;let n=Or(t);n!==null&&(e[t]=n)})}function Or(e){if(typeof window>`u`)return null;try{let t=window.localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function kr(e){let t=Or(e);return Array.isArray(t)?t.filter(e=>!!e&&typeof e==`object`&&!Array.isArray(e)):[]}function Ar(e){return e&&typeof e==`object`&&!Array.isArray(e)?e:null}function jr(e){let t=Ar(e.payload)||{},n=Nr([...Mr(e.categoria),...Mr(e.produto_servico),...Mr(t.categoria),...Mr(t.Categoria)]),r=t.sourceSheets;return{id:e.id,__supplyFornecedorDbId:e.id,code:M(e.codigo),name:M(e.nome,`Fornecedor sem nome`),city:M(e.cidade),uf:M(e.uf).toUpperCase(),region:M(e.regiao),categories:n.length?n:[`Diversos`],contact:M(t.contato,t.Contato,t.nome_contato,t[`Nome Contato`],t[`Nome do Contato`]),phone:M(e.telefone,t.telefone,t.Telefone),email:M(e.email,t.email,t.Email,t[`E-mail`],t[`E-Mail`]),site:M(e.site,t.site,t.Site),notes:M(t.observacoes,t.Observacoes,t.Observacao,t.Observação,e.produto_servico),registration:e.cadastro_ativo?`Sim`:`Não`,sourceSheets:Array.isArray(r)?r:Nr([t.origem,t.Origem,`Supabase`]),latitude:Pr(e.latitude),longitude:Pr(e.longitude),locationPrecision:M(t.locationPrecision,t.precisao_localizacao,t[`Precisão da localização`],e.latitude!==null&&e.longitude!==null?`Centro do município`:`Não localizada`),createdAt:M(e.created_at),updatedAt:M(e.updated_at)}}function Mr(e){return String(e??``).split(/[|,;/]+/).map(e=>e.trim()).filter(Boolean)}function Nr(e){return Array.from(new Set(e.map(e=>String(e??``).trim()).filter(Boolean)))}function Pr(e){if(e==null||e===``)return null;let t=Number(String(e).replace(`,`,`.`));return Number.isFinite(t)?t:null}function Fr(e){let t=Ar(e.payload)||{},n=Ar(t.__embedded_contract_request)||t,r=Ar(n.data)||Ar(t.data)||{},i=M(n.createdAt,e.created_at,e.updated_at,new Date().toISOString()),a=M(n.updatedAt,e.updated_at,i),o=Ir(n.dataSolicitacao,r.data_solicitacao,e.created_at),s=Ir(n.dataLimite,r.data_limite_atendimento,e.prazo_urgencia),c=M(e.tipo_documento,n.tipo,r.tipo_documento_obra,r.tipo_documento_departamento,`Solicitacao`),l=M(e.centro_custo,n.centro,r.centro_obra,r.centro_departamento),u=M(e.urgencia,n.urgencia,r.prazo_urgencia,`NORMAL - 5 DIAS UTEIS`),d=M(e.solicitante,n.solicitante,r.solicitante),f=M(e.email_solicitante,n.email,r.email),p=Lr(M(e.status,e.fase_compor,n.status));return{...n,id:M(e.codigo_embutido,n.id,`SC-${e.id.slice(0,8).toUpperCase()}`),__supplyContratoDbId:e.id,__supplyObraId:e.obra_id||``,codigo_embutido:M(e.codigo_embutido,n.codigo_embutido),createdAt:i,updatedAt:a,dataSolicitacao:o,status:p,tipo:c,solicitante:d,email:f,centro:l,urgencia:u,dataLimite:s,phaseStartedAt:M(n.phaseStartedAt,e.updated_at,i),phaseHistory:Array.isArray(n.phaseHistory)?n.phaseHistory:[],data:{...r,solicitante:d,email:f,centro_obra:M(r.centro_obra,l),centro_departamento:M(r.centro_departamento),tipo_documento_obra:M(r.tipo_documento_obra,c),tipo_documento_departamento:M(r.tipo_documento_departamento),prazo_urgencia:M(r.prazo_urgencia,u),data_limite_atendimento:s,data_solicitacao:o,fornecedor_parte_envolvida:M(r.fornecedor_parte_envolvida,t.fornecedor),objeto_resumo_demanda:M(r.objeto_resumo_demanda,t.objeto),observacoes:M(r.observacoes,t.observacoes)}}}function M(...e){for(let t of e){let e=String(t??``).trim();if(e)return e}return``}function Ir(...e){let t=M(...e);if(!t)return``;let n=t.match(/^\d{4}-\d{2}-\d{2}/);return n?n[0]:t}function Lr(e){let t=Rr(e);return t?t.includes(`aprovado`)||t.includes(`finalizado`)?`Aprovado no Compor`:t.includes(`compor`)||t.includes(`cadastro`)?`Em Cadastro no Compor`:t.includes(`assinado`)?`Contrato Assinado`:t.includes(`assinatura`)?`Enviado para Assinatura`:t.includes(`validacao`)||t.includes(`analise`)||t.includes(`aguardando`)?`Aguardando Validação`:t.includes(`elaboracao`)||t.includes(`compor`)?`Em Elaboração`:t.includes(`solicitado`)||t.includes(`iniciado`)?`Não Iniciado`:e:`Não Iniciado`}function Rr(e){return String(e??``).normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().trim()}var zr={requisicoes:`updated_at`,orcamentos:`updated_at`,contratos:`updated_at`,fornecedores:`updated_at`,importacoes:`created_at`};async function Br(e){let t=s(),n=1e3,r=[];for(let i=0;;i+=n){let{data:a,error:o}=await t.from(e).select(`*`).order(zr[e],{ascending:!1}).range(i,i+n-1);if(o)throw o;if(r.push(...a||[]),!a||a.length<n)break}return r}async function Vr(e,t,n){let{error:r}=await s().from(e).update(n).eq(`id`,t);if(r)throw r}async function Hr(e,t){let{error:n}=await s().from(e).delete().eq(`id`,t);if(n)throw n}async function Ur(e){let{error:t}=await s().from(e).delete().not(`id`,`is`,null);if(t)throw t}async function Wr(e,t){let{error:n}=await s().from(e).insert(t);if(n)throw n}async function Gr(){let{data:e,error:t}=await s().from(`importacoes`).select(`*`).order(`created_at`,{ascending:!1});if(t)throw t;return e||[]}async function Kr(e,t,n,r){let i=s();if(!t.length)throw Error(`Nenhum registro valido para importar.`);let a=qr(e,t),{data:{user:o}}=await i.auth.getUser();if(e===`frota`){let{error:s}=await i.from(`embedded_app_state`).upsert({storage_key:Jn,module_key:`frota`,payload:a,updated_by:o?.id||null},{onConflict:`storage_key`});if(s)throw s;await $r(e,n,o?.id||null,t.length,r);return}if(e===`contratos`){let{error:t}=await i.from(e).insert(a);if(t)throw t}else{let t=e,{error:n}=await i.from(t).upsert(a,{onConflict:{requisicoes:`numero_rm`,orcamentos:`numero_proposta`,fornecedores:`codigo`}[t]});if(n)throw n}await $r(e,n,o?.id||null,t.length,r)}function qr(e,t){if(e===`contratos`)return t;if(e===`frota`)return Jr(t);let n=e,r={requisicoes:`numero_rm`,orcamentos:`numero_proposta`,fornecedores:`codigo`}[n],i=new Map,a=[];for(let e of t){let t=String(e[r]??``).trim();if(!t){a.push(e);continue}let o=i.get(t);i.set(t,o?Xr(n,o,e):e)}return[...i.values(),...a]}function Jr(e){let t=new Map;return e.forEach(e=>{let n=String(e.placaVeiculo||e.codigoVeiculo||e.id||``).trim();if(!n)return;let r=t.get(n);t.set(n,r?Yr(r,e):e)}),[...t.values()]}function Yr(e,t){let n=Zr(e.payload),r=Zr(t.payload),i=Array.isArray(n._linhas_importadas)?n._linhas_importadas:[n];return{...e,...Object.fromEntries(Object.entries(t).filter(([,e])=>e!==``&&e!=null)),payload:{...n,_linhas_importadas:[...i,r]}}}function Xr(e,t,n){let r=Zr(t.payload),i=Zr(n.payload),a=[...Array.isArray(r._linhas_importadas)?r._linhas_importadas:[r],i];return e===`requisicoes`?{...t,status:t.status===`PENDENTE_ASSINATURA`||n.status===`PENDENTE_ASSINATURA`?`PENDENTE_ASSINATURA`:t.status,comprador:t.comprador||n.comprador,categoria:Qr([t.categoria,n.categoria]).join(`, `),payload:{...r,_linhas_importadas:a,_total_itens_agrupados:a.length}}:{...t,...Object.fromEntries(Object.entries(n).filter(([,e])=>e!==``&&e!=null)),payload:{...r,_linhas_importadas:a,_total_itens_agrupados:a.length}}}function Zr(e){return e&&typeof e==`object`&&!Array.isArray(e)?e:{}}function Qr(e){return Array.from(new Set(e.map(e=>String(e??``).trim()).filter(Boolean)))}async function $r(e,t,n,r,i){let{error:a}=await s().from(`importacoes`).insert({tipo:e,arquivo_nome:t,usuario_id:n,total_linhas:r,sucesso:i.length===0,erros:i});if(a)throw a}function ei(e){return String(e??``).normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().trim()}function ti(e){return ei(e).replace(/[^a-z0-9]/g,``)}function ni(e){if(!e)return`Sem data`;let t=String(e).match(/^(\d{4})-(\d{2})-(\d{2})/);return t?`${t[3]}/${t[2]}/${t[1]}`:String(e)}function ri(e){return Number(e||0).toLocaleString(`pt-BR`,{style:`currency`,currency:`BRL`})}function ii(e){if(typeof e==`number`)return Number.isFinite(e)?e:0;let t=String(e??``).replace(/R\$/gi,``).replace(/\s/g,``);if(!t)return 0;let n=t.includes(`,`)?t.replace(/[.]/g,``).replace(`,`,`.`):t.replace(/,/g,``),r=Number(n);return Number.isFinite(r)?r:0}function ai(e){if(!e)return null;if(e instanceof Date&&!Number.isNaN(e.getTime()))return e.toISOString().slice(0,10);if(typeof e==`number`&&e>2e4)return new Date(Math.floor(e-25569)*864e5).toISOString().slice(0,10);let t=String(e).trim(),n=t.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);if(n)return`${n[1]}-${n[2].padStart(2,`0`)}-${n[3].padStart(2,`0`)}`;let r=t.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/);return r?`${r[3].length===2?`20${r[3]}`:r[3]}-${r[2].padStart(2,`0`)}-${r[1].padStart(2,`0`)}`:t||null}function oi(e){if(!e)return null;let t=new Date(`${e.slice(0,10)}T00:00:00`);if(Number.isNaN(t.getTime()))return null;let n=new Date;return n.setHours(0,0,0,0),Math.ceil((t.getTime()-n.getTime())/864e5)}function si(e){let t=oi(e);return t===null?`neutral`:t<0?`danger`:t<=3?`warning`:`success`}var ci=[[`nao_iniciado`,`Não iniciado`],[`em_cotacao`,`Em cotação`],[`finalizado`,`Finalizado`],[`pausado`,`Pausado`]],li=[`nao_iniciado`,`em_cotacao`];function ui(e,t){return{currentPhase:e,phaseStartedAt:t?fi(t):new Date().toISOString(),phaseDurations:{},history:[]}}function di(e,t){let n=t||null,r={...e.payload,data_solicitacao:n},i=hi(e),a=Array.isArray(i.history)&&i.history.length>0,o=Object.values(i.phaseDurations||{}).some(e=>Number(e)>0);return(e.status||`nao_iniciado`)===`nao_iniciado`&&n&&!a&&!o&&(r.sla={...i,currentPhase:`nao_iniciado`,phaseStartedAt:fi(n),phaseDurations:i.phaseDurations||{},history:i.history||[]}),{data_solicitacao:n,payload:r}}function fi(e){return`${e.slice(0,10)}T07:00:00`}function pi(e,t){let n=e.status||`nao_iniciado`;if(n===t)return{status:t};let r=new Date().toISOString(),i=hi(e),a={...i.phaseDurations||{}},o=i.phaseStartedAt||N(e),s=0;gi(n)&&o&&(s=_i(o,r),a[n]=(a[n]||0)+s);let c=gi(t),l=(a.nao_iniciado||0)+(a.em_cotacao||0),u=Array.isArray(i.history)?i.history:[];return{status:t,data_finalizacao:t===`finalizado`?r:null,payload:{...e.payload,sla:{...i,currentPhase:t,phaseStartedAt:c?r:null,phaseDurations:a,finalizedAt:t===`finalizado`?r:null,totalBusinessMs:t===`finalizado`?l:void 0,history:[...u,{from:n,to:t,at:r,businessMs:s}]}}}}function mi(e,t){let n=hi(e),r=e.status||`nao_iniciado`,i={...n.phaseDurations||{}};if(gi(r)){let a=n.phaseStartedAt||N(e);i[r]=(i[r]||0)+_i(a,t)}let a=n.finalizedAt||e.data_finalizacao||null,o=Number(n.totalBusinessMs),s=r===`finalizado`&&a?_i(n.phaseStartedAt||N(e),a):0,c=r===`finalizado`&&Number.isFinite(o)&&o>0?o:r===`finalizado`&&s?s:(i.nao_iniciado||0)+(i.em_cotacao||0);return{currentMs:gi(r)&&i[r]||0,phaseMs:i,totalMs:c}}function hi(e){let t=e.payload?.sla;return t&&typeof t==`object`&&!Array.isArray(t)?t:{}}function N(e){return e.created_at?e.created_at:e.data_solicitacao?`${e.data_solicitacao.slice(0,10)}T07:00:00`:new Date().toISOString()}function gi(e){return li.includes(e)}function _i(e,t){let n=new Date(e),r=new Date(t);if(Number.isNaN(n.getTime())||Number.isNaN(r.getTime())||n>=r)return 0;let i=0,a=new Date(n);for(a.setHours(0,0,0,0);a.getTime()<=r.getTime();){let e=a.getDay();if(e>=1&&e<=5){let e=new Date(a);e.setHours(7,0,0,0);let t=new Date(a);t.setHours(17,0,0,0);let o=Math.max(n.getTime(),e.getTime()),s=Math.min(r.getTime(),t.getTime());s>o&&(i+=s-o)}a.setDate(a.getDate()+1)}return i}function vi(e){let t=Math.max(0,Math.floor(e/1e3));if(t<60)return`${t}s`;let n=Math.floor(t/60),r=Math.floor(n/600),i=Math.floor(n%600/60),a=n%60;return[r?`${r}d`:``,i?`${i}h`:``,a||!r&&!i?`${a}min`:``].filter(Boolean).join(` `)}function yi(e,t){return e.length?e.reduce((e,n)=>e+mi(n,t).totalMs,0)/e.length:0}function bi(e){return{nao_iniciado:`Nao iniciado`,em_cotacao:`Em cotacao`,finalizado:`Finalizado`,pausado:`Pausado`}[e]||e}function xi(e){let t=e.payload?.anexos;return Array.isArray(t)?t:[]}function Si(){let e=String(new Date().getFullYear()).slice(-2);return`Pp-${String(Date.now()).slice(-5)}-${e}`}var Ci=[`nao_iniciado`,`em_cotacao`],wi=[{value:`aguardando`,label:`Aguardando resultado`},{value:`ganha`,label:`Ganhamos a obra`},{value:`perdida`,label:`Perdemos a obra`}];function Ti(e){let t=e.payload||{},n=t.quantidade_linhas??t.quantidade_req??t.linhas??e.quantidade_req??0,r=Number(n);return Number.isFinite(r)?r:0}function Ei(e){return Di(e).join(` • `)}function Di(e){return Zi([...Xi(e.atribuido_a),...Xi(e.payload?.atribuido_a),...Xi(e.payload?.orcamentista)])}function Oi(e){return ki(e).join(` • `)}function ki(e){return Zi([...Xi(e.payload?.orcamentista),...Xi(e.atribuido_a),...Xi(e.payload?.atribuido_a)])}function Ai(e){let t=Qi(e.payload?.resultado_obra||e.payload?.resultado_comercial||e.payload?.resultado||``);return t.includes(`ganh`)?`ganha`:t.includes(`perd`)?`perdida`:`aguardando`}function ji(e){let t=Qi(e),n=t.includes(`ganh`)?`ganha`:t.includes(`perd`)?`perdida`:`aguardando`;return wi.find(e=>e.value===n)?.label||`Aguardando resultado`}function Mi(e){return String(e.link_pasta||e.payload?.link_pasta||e.payload?.pasta_link||e.payload?.folderLink||``).trim()}function Ni(e){return e.data_finalizacao||hi(e).finalizedAt||null}function Pi(e){return String(e.data_solicitacao||e.created_at||``).slice(0,10)}function Fi(e){let t=e.payload?.comentarios||e.payload?.comments;return Array.isArray(t)?t:[]}function Ii(e){let t=e.payload?.logs||e.payload?.log;return Array.isArray(t)?t:[]}function Li(e,t,n){return{id:`log-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,at:new Date().toISOString(),action:e,detail:n,userName:t?.nome||`Supply Flow`,userEmail:t?.email||``}}function Ri(e,t){let n=Array.isArray(e.logs)?e.logs:[];return{...e,logs:[...n,t]}}function zi(e,t){return!t||String(e.email_solicitante||``).toLowerCase()!==t.toLowerCase()?!1:Fi(e).length>0}function Bi(e){if(!e)return``;let t=new Date(e);if(Number.isNaN(t.getTime()))return``;let n=e=>String(e).padStart(2,`0`);return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}function Vi(e){if(!e)return null;let t=new Date(e);return Number.isNaN(t.getTime())?null:t.toISOString()}function Hi(e){if(!e)return`-`;let t=new Date(e);return Number.isNaN(t.getTime())?ni(e):t.toLocaleString(`pt-BR`,{dateStyle:`short`,timeStyle:`short`})}function Ui(e,t){let n=window.open(`about:blank`,`_blank`,`width=1180,height=840`);if(!n){window.alert(`Nao foi possivel abrir o relatorio. Verifique o bloqueador de pop-ups do navegador.`);return}n.document.open(),n.document.write(Wi(e,t)),n.document.close()}function Wi(e,t){let n=e.length,r=e.filter(e=>Ci.includes(e.status||`nao_iniciado`)).length,i=e.filter(e=>e.status===`finalizado`).length,a=e.reduce((e,t)=>e+Ti(t),0),o=e.reduce((e,t)=>e+Number(t.saving||0),0),s=n?e.reduce((e,n)=>e+mi(n,t).totalMs,0)/n:0,c=Ki(e,e=>bi(e.status||`nao_iniciado`)),l=qi(e,e=>Di(e)),u=Math.max(1,...Array.from(c.values())),d=Math.max(1,...Array.from(l.values())),f=`${window.location.origin}/logo-seel.png`;return`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Relatorio de orcamentos</title>
  <style>
    :root { color: #091827; font-family: Arial, sans-serif; }
    body { margin: 0; background: #f4f7fa; }
    main { padding: 28px; }
    header { display:flex; justify-content:space-between; gap:16px; border-bottom:3px solid #ffd200; padding-bottom:18px; margin-bottom:18px; }
    h1 { margin:0; color:#001b35; font-size:26px; }
    h2 { margin:0 0 10px; color:#001b35; font-size:16px; }
    p { margin:4px 0 0; color:#506070; }
    .logo { height:52px; object-fit:contain; }
    .kpis { display:grid; grid-template-columns:repeat(5,1fr); gap:10px; margin:18px 0; }
    .kpi, .card, .chart { border:1px solid #dbe4ee; border-radius:10px; background:white; padding:14px; }
    .kpi span { display:block; color:#65758a; font-size:11px; font-weight:700; text-transform:uppercase; }
    .kpi strong { display:block; margin-top:7px; color:#001b35; font-size:21px; }
    .grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px; }
    .bar { display:grid; grid-template-columns:150px 1fr 42px; gap:8px; align-items:center; margin:8px 0; font-size:12px; }
    .track { height:10px; background:#edf2f7; border-radius:99px; overflow:hidden; }
    .fill { height:100%; background:linear-gradient(90deg,#003b67,#ffd200); border-radius:inherit; }
    .empty { border:1px dashed #cbd5e1; border-radius:10px; background:white; padding:22px; color:#53657a; text-align:center; }
    table { width:100%; border-collapse:collapse; background:white; border:1px solid #dbe4ee; border-radius:10px; overflow:hidden; }
    th, td { padding:9px; border-bottom:1px solid #e7edf4; text-align:left; font-size:11px; vertical-align:top; }
    th { color:#53657a; background:#f8fafc; text-transform:uppercase; }
    @page { size: A4 landscape; margin: 10mm; }
    @media print { body { background:white; } main { padding:0; } button { display:none; } }
  </style>
</head>
<body>
  <main>
    <header>
      <div>
        <h1>Relatorio de orcamentos</h1>
        <p>Supply Flow SEEL - gerado em ${P(Hi(new Date().toISOString()))}</p>
      </div>
      <img class="logo" src="${P(f)}" alt="SEEL" />
    </header>
    <section class="kpis">
      ${Ji(`Solicitacoes`,n)}
      ${Ji(`Em aberto`,r)}
      ${Ji(`Finalizados`,i)}
      ${Ji(`Linhas`,a)}
      ${Ji(`SLA medio`,vi(s))}
    </section>
    <section class="grid">
      <div class="chart">
        <h2>Distribuicao por fase</h2>
        ${Yi(c,u)}
      </div>
      <div class="chart">
        <h2>Distribuicao por orcamentista</h2>
        ${Yi(l,d)}
      </div>
    </section>
    <section class="card">
      <h2>Resumo financeiro</h2>
      <p>Saving acumulado: <strong>${P(ri(o))}</strong></p>
    </section>
    <table>
      <thead>
        <tr><th>Proposta</th><th>Status</th><th>Resultado</th><th>Solicitante</th><th>Atribuido a</th><th>Cliente/obra</th><th>Linhas</th><th>Solicitado</th><th>Finalizado</th><th>SLA</th></tr>
      </thead>
      <tbody>
        ${e.length?Gi(e,t):`<tr><td colspan="10"><div class="empty">Nenhum orcamento encontrado para os filtros atuais.</div></td></tr>`}
      </tbody>
    </table>
  </main>
  <script>
    window.addEventListener("load", function() {
      setTimeout(function(){ window.focus(); window.print(); }, 650);
    });
  <\/script>
</body>
</html>`}function Gi(e,t){return e.slice(0,250).map(e=>`<tr><td>${P(e.numero_proposta||`-`)}</td><td>${P(bi(e.status||`-`))}</td><td>${P(e.status===`finalizado`?ji(Ai(e)):`-`)}</td><td>${P(e.nome_solicitante||`-`)}</td><td>${P(Ei(e)||`-`)}</td><td>${P(e.cliente||e.local_obra||`-`)}</td><td>${Ti(e)}</td><td>${P(ni(e.data_solicitacao))}</td><td>${P(Hi(Ni(e)))}</td><td>${P(vi(mi(e,t).totalMs))}</td></tr>`).join(``)}function Ki(e,t){let n=new Map;return e.forEach(e=>{let r=t(e)||`Nao informado`;n.set(r,(n.get(r)||0)+1)}),n}function qi(e,t){let n=new Map;return e.forEach(e=>{let r=t(e);(r.length?r:[`Sem atribuido`]).forEach(e=>n.set(e,(n.get(e)||0)+1))}),n}function Ji(e,t){return`<div class="kpi"><span>${P(e)}</span><strong>${P(String(t))}</strong></div>`}function Yi(e,t){return Array.from(e.entries()).sort((e,t)=>t[1]-e[1]).slice(0,10).map(([e,n])=>{let r=Math.max(4,Math.round(n/t*100));return`<div class="bar"><span>${P(e)}</span><div class="track"><div class="fill" style="width:${r}%"></div></div><strong>${n}</strong></div>`}).join(``)}function P(e){return e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]||e)}function Xi(e){return Array.isArray(e)?e.flatMap(Xi):String(e??``).split(/[,;|\n]+/).map(e=>e.trim()).filter(Boolean)}function Zi(e){return Array.from(new Set(e.map(e=>e.trim()).filter(Boolean)))}function Qi(e){return String(e??``).normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().trim()}function $i(){let{profile:e}=Sn(),t=Ge(),[n,r]=(0,m.useState)(0),[a,o]=(0,m.useState)([]),[s,c]=(0,m.useState)(!1),l=(0,m.useRef)(!1),u=(0,m.useRef)(``),d=(0,m.useRef)(``),f=(0,m.useRef)(),p=e?.id?`supply-flow:alerts:last-seen:${e.id}`:``;return(0,m.useEffect)(()=>{t.pathname===`/alertas`&&(r(0),c(!1))},[t.pathname]),(0,m.useEffect)(()=>{l.current=!1,u.current=``,d.current=``,r(0),c(!1),o([])},[p]),(0,m.useEffect)(()=>{if(!e||!In(e,`alertas`))return;let n=e,a=!1;async function s(){try{let e=await Br(`orcamentos`);if(a)return;let i=F(e,n).sort((e,t)=>new Date(e.at).getTime()-new Date(t.at).getTime()),s=i[i.length-1]?.at||``,m=L(e);if(!l.current){l.current=!0,d.current=m;let e=p&&window.localStorage.getItem(p)||``;u.current=e||s,!e&&p&&s&&window.localStorage.setItem(p,s);return}let h=u.current,g=ta(h),_=i.filter(e=>ta(e.at)>g),v=m!==d.current;if(v&&(d.current=m),_.length){let e=_[_.length-1].at;u.current=e,p&&window.localStorage.setItem(p,e),r(e=>t.pathname===`/alertas`?0:e+_.length),o(e=>[..._.slice(-3),...e].slice(0,3)),na(),c(!0),f.current&&window.clearTimeout(f.current),f.current=window.setTimeout(()=>c(!1),6500)}(_.length||v)&&t.pathname===`/alertas`&&Tn([`alertas:orcamentos`])}catch(e){console.warn(`Nao foi possivel verificar notificacoes de orcamento.`,e)}}s();let m=window.setInterval(s,2e4),h=i?.channel(`supply-flow-orcamento-alerts-${n.id}`).on(`postgres_changes`,{event:`*`,schema:`public`,table:`orcamentos`},()=>{s()}).subscribe();return()=>{a=!0,window.clearInterval(m),f.current&&window.clearTimeout(f.current),h&&i?.removeChannel(h)}},[t.pathname,e,p]),(0,m.useEffect)(()=>{if(!a.length)return;let e=window.setTimeout(()=>o(e=>e.slice(0,-1)),8e3);return()=>window.clearTimeout(e)},[a]),!e||!In(e,`alertas`)?null:(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(Ft,{className:`icon-button alert-bell ${n||s?`alert-bell--active`:``}`,to:`/alertas`,"aria-label":`Alertas`,title:`Alertas`,onClick:()=>{r(0),c(!1)},children:[(0,j.jsx)(Vt,{size:18}),n?(0,j.jsx)(`span`,{children:n>9?`9+`:n}):null]}),a.length?(0,j.jsx)(`div`,{className:`alert-toast-stack`,role:`status`,"aria-live":`polite`,children:a.map(e=>(0,j.jsxs)(`article`,{className:`alert-toast`,children:[(0,j.jsx)(`button`,{type:`button`,onClick:()=>o(t=>t.filter(t=>t.id!==e.id)),"aria-label":`Fechar notificacao`,children:(0,j.jsx)(mn,{size:14})}),(0,j.jsx)(`span`,{children:Hi(e.at)}),(0,j.jsx)(`strong`,{children:e.title}),(0,j.jsx)(`p`,{children:e.message}),(0,j.jsx)(`small`,{children:e.author})]},e.id))}):null]})}function F(e,t){return e.filter(e=>I(e,t)).flatMap(e=>Fi(e).filter(e=>ea(e,t)).map(t=>({id:t.id||`${e.id}-${t.at}-${t.authorEmail||``}`,at:t.at,title:`Comentario em ${e.numero_proposta||`orcamento`}`,message:t.text,author:t.authorName||t.authorEmail||`Supply Flow`}))).filter(e=>e.at&&e.message)}function I(e,t){return Ln(t,`orcamentos`)||e.criado_por&&e.criado_por===t.id?!0:!!(e.email_solicitante&&t.email&&e.email_solicitante.toLowerCase()===t.email.toLowerCase())}function ea(e,t){let n=String(e.authorEmail||``).toLowerCase();return!(n&&n===t.email.toLowerCase())}function L(e){return e.map(e=>`${e.id}:${e.updated_at||e.created_at||``}:${Fi(e).length}`).sort().join(`|`)}function ta(e){let t=new Date(e).getTime();return Number.isNaN(t)?0:t}function na(){if(!(typeof window>`u`))try{window.navigator.vibrate?.([120,40,120]);let e=window.AudioContext||window.webkitAudioContext;if(!e)return;let t=new e,n=t.createOscillator(),r=t.createGain(),i=t.currentTime;n.type=`sine`,n.frequency.setValueAtTime(880,i),n.frequency.setValueAtTime(660,i+.12),r.gain.setValueAtTime(1e-4,i),r.gain.exponentialRampToValueAtTime(.06,i+.02),r.gain.exponentialRampToValueAtTime(1e-4,i+.24),n.connect(r),r.connect(t.destination),n.start(i),n.stop(i+.26),n.onended=()=>void t.close(),window.setTimeout(()=>{t.state!==`closed`&&t.close().catch(()=>void 0)},900),t.state===`suspended`&&t.resume().catch(()=>void 0)}catch{}}function R({title:e,description:t,action:n,secondaryAction:r}){return(0,j.jsxs)(`div`,{className:`state-panel`,children:[(0,j.jsx)(un,{size:26}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`h2`,{children:e}),t?(0,j.jsx)(`p`,{children:t}):null,n||r?(0,j.jsxs)(`div`,{style:{display:`flex`,gap:10,marginTop:12},children:[n?(0,j.jsx)(`button`,{type:`button`,className:`secondary-button`,onClick:n.onClick,children:n.label}):null,r?(0,j.jsx)(`button`,{type:`button`,className:`secondary-button`,onClick:r.onClick,children:r.label}):null]}):null]})]})}function z({label:e=`Carregando`}){return(0,j.jsxs)(`div`,{className:`state-panel state-panel--inline`,children:[(0,j.jsx)(Xt,{className:`spin`,size:20}),(0,j.jsx)(`span`,{children:e})]})}var ra=`
  html, body {
    min-height: 100%;
    background: #f1f5f9 !important;
  }

  body {
    margin: 0 !important;
    color: #0f172a;
  }

  body::before {
    opacity: .32 !important;
  }

  .container,
  .topbar-content,
  .topbar-inner,
  main,
  .main,
  .admin-main,
  .content {
    max-width: none !important;
  }

  body > header,
  header.topbar,
  .topbar {
    top: 0 !important;
    box-shadow: 0 8px 24px rgba(15, 23, 42, .08) !important;
  }

  .card,
  .panel,
  .section,
  .stat,
  .kpi,
  .modal,
  .supplier,
  .order-card,
  .freight-card,
  .vehicle-card,
  .chart-card,
  .table-wrap {
    border-radius: 8px !important;
  }

  button,
  input,
  select,
  textarea,
  .tab,
  .chip,
  .badge,
  .pill,
  .status {
    border-radius: 8px !important;
  }

  body.supply-embedded {
    font-size: 14px !important;
    overflow-x: hidden !important;
    padding: 0 !important;
    background: #f0f7fa !important;
    color: #081b23 !important;
    font-family: Roboto, "Segoe UI", Arial, sans-serif !important;
  }

  body.supply-embedded h1,
  body.supply-embedded h2,
  body.supply-embedded h3,
  body.supply-embedded h4 {
    color: #081b23 !important;
    letter-spacing: 0 !important;
  }

  body.supply-embedded .card,
  body.supply-embedded .panel,
  body.supply-embedded .section,
  body.supply-embedded .stat,
  body.supply-embedded .kpi,
  body.supply-embedded .analytics-card,
  body.supply-embedded .chart-card,
  body.supply-embedded .table-wrap,
  body.supply-embedded .table-panel,
  body.supply-embedded .toolbar,
  body.supply-embedded .toolbar-panel,
  body.supply-embedded .filters,
  body.supply-embedded .kanban-column,
  body.supply-embedded .col,
  body.supply-embedded .supplier,
  body.supply-embedded .order-card,
  body.supply-embedded .freight-card,
  body.supply-embedded .vehicle-card,
  body.supply-embedded .analysis-card,
  body.supply-embedded .summary-card,
  body.supply-embedded .insight-card {
    border: 1px solid #d1e1e8 !important;
    border-radius: 8px !important;
    background: #ffffff !important;
    box-shadow: 0 8px 24px rgba(10, 46, 61, .1) !important;
  }

  body.supply-embedded .kpi,
  body.supply-embedded .stat,
  body.supply-embedded .kpi-card,
  body.supply-embedded .stat-card {
    border-left: 3px solid #fcc800 !important;
  }

  body.supply-embedded .col,
  body.supply-embedded .kanban-column {
    background: #f7fbfd !important;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.8) !important;
  }

  body.supply-embedded button,
  body.supply-embedded .btn,
  body.supply-embedded .primary,
  body.supply-embedded input,
  body.supply-embedded select,
  body.supply-embedded textarea {
    border-radius: 8px !important;
    font-size: 13px !important;
  }

  body.supply-embedded input,
  body.supply-embedded select,
  body.supply-embedded textarea {
    border: 1px solid #d1e1e8 !important;
    background: #ffffff !important;
    color: #081b23 !important;
  }

  body.supply-embedded button,
  body.supply-embedded .btn,
  body.supply-embedded .primary {
    min-height: 38px !important;
    border: 1px solid #1b6d8e !important;
    background: #1b6d8e !important;
    color: #ffffff !important;
    box-shadow: none !important;
    font-weight: 850 !important;
  }

  body.supply-embedded .secondary,
  body.supply-embedded .btn.secondary,
  body.supply-embedded button.secondary {
    background: #ffffff !important;
    color: #0a2e3d !important;
    border-color: #d1e1e8 !important;
  }

  html[data-theme="dark"],
  html[data-theme="dark"] body {
    background: #07111f !important;
    color: #e5edf7 !important;
  }

  html[data-theme="dark"] .card,
  html[data-theme="dark"] .panel,
  html[data-theme="dark"] .section,
  html[data-theme="dark"] .stat,
  html[data-theme="dark"] .kpi,
  html[data-theme="dark"] .modal,
  html[data-theme="dark"] .modal-content,
  html[data-theme="dark"] .modal-body,
  html[data-theme="dark"] .drawer,
  html[data-theme="dark"] .supplier,
  html[data-theme="dark"] .order-card,
  html[data-theme="dark"] .freight-card,
  html[data-theme="dark"] .vehicle-card,
  html[data-theme="dark"] .chart-card,
  html[data-theme="dark"] .table-wrap,
  html[data-theme="dark"] .table-panel,
  html[data-theme="dark"] .toolbar,
  html[data-theme="dark"] .toolbar-panel,
  html[data-theme="dark"] .filters,
  html[data-theme="dark"] .kanban-column,
  html[data-theme="dark"] .col,
  html[data-theme="dark"] .detail-box,
  html[data-theme="dark"] .detail-section,
  html[data-theme="dark"] .detail-answer,
  html[data-theme="dark"] .detail-kv,
  html[data-theme="dark"] .empty,
  html[data-theme="dark"] .empty-col,
  html[data-theme="dark"] .notice {
    background: #0d1b2e !important;
    border-color: #1f3350 !important;
    color: #e5edf7 !important;
  }

  /* The 5 embedded tools (Frota, Contratos, Fretes, Estoque, Avaliacao) each use their
     own bespoke class names for dashboard/report panels (powerbi-kpi, analytics-card,
     bi-card, dashboard-filter-panel, etc). The text-color rules below already recolor
     any h1-h4/strong/b/p/span/small/label/td to a light tone, but that only reads
     correctly if the panel behind it is also dark - otherwise the text goes light on
     an unconverted white background and becomes unreadable. Catch all of them by
     naming convention instead of hand-listing every module's classes. */
  html[data-theme="dark"] [class*="card"],
  html[data-theme="dark"] [class*="panel"],
  html[data-theme="dark"] [class*="kpi"],
  html[data-theme="dark"] [class*="analytics"],
  html[data-theme="dark"] [class*="insight"],
  html[data-theme="dark"] [class*="summary"],
  html[data-theme="dark"] .powerbi-dashboard,
  html[data-theme="dark"] .powerbi-visual,
  html[data-theme="dark"] .dashboard-chart-stage {
    background: #0d1b2e !important;
    border-color: #1f3350 !important;
  }

  html[data-theme="dark"] input,
  html[data-theme="dark"] select,
  html[data-theme="dark"] textarea,
  html[data-theme="dark"] .tab,
  html[data-theme="dark"] .chip,
  html[data-theme="dark"] .badge,
  html[data-theme="dark"] .pill,
  html[data-theme="dark"] .tag,
  html[data-theme="dark"] .status,
  html[data-theme="dark"] .control,
  html[data-theme="dark"] .btn,
  html[data-theme="dark"] .secondary,
  html[data-theme="dark"] .search,
  html[data-theme="dark"] .file,
  html[data-theme="dark"] .file-chip,
  html[data-theme="dark"] .timer,
  html[data-theme="dark"] .sla-box,
  html[data-theme="dark"] .info-box {
    background: #10233f !important;
    border-color: #1f3350 !important;
    color: #e5edf7 !important;
  }

  html[data-theme="dark"] h1,
  html[data-theme="dark"] h2,
  html[data-theme="dark"] h3,
  html[data-theme="dark"] h4,
  html[data-theme="dark"] strong,
  html[data-theme="dark"] b,
  html[data-theme="dark"] .card-title,
  html[data-theme="dark"] .col-title,
  html[data-theme="dark"] .panel-title,
  html[data-theme="dark"] .supplier-name,
  html[data-theme="dark"] .kpi-value,
  html[data-theme="dark"] .stat strong,
  html[data-theme="dark"] .kpi strong {
    color: #f6f9fd !important;
  }

  html[data-theme="dark"] p,
  html[data-theme="dark"] span,
  html[data-theme="dark"] small,
  html[data-theme="dark"] label,
  html[data-theme="dark"] td,
  html[data-theme="dark"] .muted,
  html[data-theme="dark"] .hint,
  html[data-theme="dark"] .sub,
  html[data-theme="dark"] .card-line,
  html[data-theme="dark"] .card-desc,
  html[data-theme="dark"] .panel-sub,
  html[data-theme="dark"] .col-subtitle,
  html[data-theme="dark"] .detail-answer div,
  html[data-theme="dark"] .detail-answer small {
    color: #b7c6d9 !important;
  }

  html[data-theme="dark"] th {
    background: #132845 !important;
    color: #b7c6d9 !important;
    border-color: #1f3350 !important;
  }

  html[data-theme="dark"] button.primary,
  html[data-theme="dark"] .btn.primary,
  html[data-theme="dark"] .primary {
    background: #ffe61c !important;
    color: #07111f !important;
    border-color: #ffe61c !important;
  }

  html[data-theme="dark"] input::placeholder,
  html[data-theme="dark"] textarea::placeholder {
    color: #8fa3ba !important;
  }

  body.supply-embedded-frota > header.topbar,
  body.supply-embedded-fretes > header,
  body.supply-embedded-fornecedores .sf-topbar,
  body.supply-embedded-estoque_obras #loginPage {
    display: none !important;
  }

  body.supply-embedded-frota .hero {
    display: none !important;
  }

  body.supply-embedded-fornecedores .sf-app,
  body.supply-embedded-fornecedores .sf-workspace {
    background: transparent !important;
  }

  body.supply-embedded-fornecedores .sf-page-head {
    width: 100% !important;
    margin: 0 0 12px !important;
    padding: 15px !important;
    border: 1px solid #d1e1e8 !important;
    border-left: 4px solid #fcc800 !important;
    border-radius: 8px !important;
    background: #ffffff !important;
    box-shadow: 0 8px 24px rgba(10, 46, 61, .1) !important;
  }

  body.supply-embedded-fornecedores .sf-page-head h1 {
    color: #081b23 !important;
    font-size: 1.15rem !important;
    line-height: 1.1 !important;
  }

  body.supply-embedded-fornecedores .sf-page-head p {
    max-width: 760px !important;
    color: #526771 !important;
    font-size: .86rem !important;
  }

  body.supply-embedded-fornecedores .sf-eyebrow {
    color: #1b6d8e !important;
    font-size: .68rem !important;
    font-weight: 900 !important;
  }

  body.supply-embedded-fornecedores .sf-primary-action {
    min-height: 40px !important;
    border: 1px solid #1b6d8e !important;
    border-radius: 8px !important;
    background: #1b6d8e !important;
    color: #ffffff !important;
    box-shadow: none !important;
  }

  html[data-theme="dark"] body.supply-embedded-fornecedores .sf-page-head {
    background: #0d1b2e !important;
    border-color: #1f3350 !important;
    border-left-color: #fcc800 !important;
    box-shadow: 0 12px 28px rgba(0, 0, 0, .26) !important;
  }

  html[data-theme="dark"] body.supply-embedded-fornecedores .sf-page-head h1 {
    color: #f6f9fd !important;
  }

  html[data-theme="dark"] body.supply-embedded-fornecedores .sf-page-head p {
    color: #b7c6d9 !important;
  }

  body.supply-embedded .container,
  body.supply-embedded .topbar-content,
  body.supply-embedded .topbar-inner,
  body.supply-embedded main,
  body.supply-embedded .main,
  body.supply-embedded .admin-main,
  body.supply-embedded .content,
  body.supply-embedded-fretes .container,
  body.supply-embedded-fretes main,
  body.supply-embedded-fretes .section {
    width: 100% !important;
    max-width: none !important;
  }

  body.supply-embedded main,
  body.supply-embedded .main,
  body.supply-embedded .admin-main {
    padding: 12px !important;
  }

  body.supply-embedded .tabs,
  body.supply-embedded .sf-module-tabs,
  body.supply-embedded .nav-tabs,
  body.supply-embedded .tabbar,
  body.supply-embedded [role="tablist"] {
    position: sticky !important;
    top: 0 !important;
    z-index: 40 !important;
    display: flex !important;
    align-items: center !important;
    overflow-x: auto !important;
    gap: 8px !important;
    padding: 8px !important;
    background: rgba(255, 255, 255, .96) !important;
    border-bottom: 1px solid #e2e8f0 !important;
    box-shadow: 0 8px 20px rgba(15, 23, 42, .08) !important;
    scrollbar-width: thin !important;
    -webkit-overflow-scrolling: touch !important;
  }

  body.supply-embedded .tabs > *,
  body.supply-embedded .sf-module-tabs > *,
  body.supply-embedded .nav-tabs > *,
  body.supply-embedded .tabbar > *,
  body.supply-embedded [role="tablist"] > * {
    flex: 0 0 auto !important;
  }

  body.supply-embedded .tab,
  body.supply-embedded .tabs button,
  body.supply-embedded .sf-module-tabs button,
  body.supply-embedded .nav-tabs button,
  body.supply-embedded [role="tab"],
  body.supply-embedded [data-tab],
  body.supply-embedded [data-page] {
    min-height: 36px !important;
    padding: 8px 12px !important;
    border-radius: 8px !important;
    border: 1px solid #dbe5ee !important;
    background: #ffffff !important;
    color: #17324a !important;
    font-size: 12px !important;
    font-weight: 800 !important;
    line-height: 1.15 !important;
    white-space: nowrap !important;
  }

  body.supply-embedded .tab.active,
  body.supply-embedded .tabs button.active,
  body.supply-embedded .sf-module-tabs button.active,
  body.supply-embedded .nav-tabs button.active,
  body.supply-embedded [aria-selected="true"] {
    background: #ffe119 !important;
    border-color: #ffe119 !important;
    color: #07111f !important;
  }

  html[data-theme="dark"] body.supply-embedded .tabs,
  html[data-theme="dark"] body.supply-embedded .sf-module-tabs,
  html[data-theme="dark"] body.supply-embedded .nav-tabs,
  html[data-theme="dark"] body.supply-embedded .tabbar,
  html[data-theme="dark"] body.supply-embedded [role="tablist"] {
    background: rgba(7, 17, 31, .96) !important;
    border-color: #1f3350 !important;
    box-shadow: 0 10px 24px rgba(0, 0, 0, .36) !important;
  }

  html[data-theme="dark"] body.supply-embedded .tab,
  html[data-theme="dark"] body.supply-embedded .tabs button,
  html[data-theme="dark"] body.supply-embedded .sf-module-tabs button,
  html[data-theme="dark"] body.supply-embedded .nav-tabs button,
  html[data-theme="dark"] body.supply-embedded [role="tab"],
  html[data-theme="dark"] body.supply-embedded [data-tab],
  html[data-theme="dark"] body.supply-embedded [data-page] {
    background: #10233f !important;
    border-color: #1f3350 !important;
    color: #dbe7f4 !important;
  }

  html[data-theme="dark"] body.supply-embedded .tab.active,
  html[data-theme="dark"] body.supply-embedded .tabs button.active,
  html[data-theme="dark"] body.supply-embedded .sf-module-tabs button.active,
  html[data-theme="dark"] body.supply-embedded .nav-tabs button.active,
  html[data-theme="dark"] body.supply-embedded [aria-selected="true"] {
    background: #ffe119 !important;
    border-color: #ffe119 !important;
    color: #07111f !important;
  }

  body.supply-embedded-fretes .section {
    scroll-margin-top: 64px !important;
  }

  body.supply-embedded [data-supply-hidden="true"] {
    display: none !important;
  }

  body.supply-embedded .supply-disabled-action {
    opacity: .48 !important;
    cursor: not-allowed !important;
    pointer-events: none !important;
  }

  body.supply-embedded-estoque_obras #appPage.hidden {
    display: block !important;
  }

  @media (max-width: 760px) {
    body > header,
    header.topbar,
    .topbar {
      position: relative !important;
    }

    body.supply-embedded main,
    body.supply-embedded .main,
    body.supply-embedded .admin-main {
      padding: 8px !important;
    }

    body.supply-embedded .tabs,
    body.supply-embedded .sf-module-tabs,
    body.supply-embedded .nav-tabs,
    body.supply-embedded .tabbar,
    body.supply-embedded [role="tablist"] {
      top: 0 !important;
      padding: 7px !important;
      gap: 6px !important;
    }
  }
`,ia=`
  body.supply-embedded .sf-professional-icon svg,
  body.supply-embedded .sf-professional-inline-icon svg,
  body.supply-embedded .sf-tab-icon svg,
  body.supply-embedded .tab-icon svg,
  body.supply-embedded .icon-badge svg,
  body.supply-embedded .column-icon svg,
  body.supply-embedded .col-icon svg,
  body.supply-embedded .process-icon svg,
  body.supply-embedded .central-import-hero-icon svg,
  body.supply-embedded .kanban-premium-ic svg {
    width: 1em !important;
    height: 1em !important;
    display: block !important;
    fill: none !important;
    stroke: currentColor !important;
    stroke-width: 2 !important;
    stroke-linecap: round !important;
    stroke-linejoin: round !important;
  }

  body.supply-embedded .sf-tab-icon,
  body.supply-embedded .tab-icon,
  body.supply-embedded .icon-badge,
  body.supply-embedded .column-icon,
  body.supply-embedded .col-icon,
  body.supply-embedded .process-icon,
  body.supply-embedded .central-import-hero-icon,
  body.supply-embedded .kanban-premium-ic {
    line-height: 1 !important;
  }

  body.supply-embedded .sf-professional-inline-icon {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 1.1em !important;
    height: 1.1em !important;
    margin-right: 6px !important;
    flex: 0 0 auto !important;
    vertical-align: -0.15em !important;
  }

  body.supply-embedded .sf-tab-icon svg,
  body.supply-embedded .tab-icon svg {
    width: 17px !important;
    height: 17px !important;
  }

  body.supply-embedded .kanban-premium-ic svg,
  body.supply-embedded .card-icon-badge svg,
  body.supply-embedded .mk-product-icon svg {
    width: 20px !important;
    height: 20px !important;
  }
`,aa=new Map,oa=`supply-flow:embedded-tool-cache-invalidated`;function sa(e,t={}){Array.from(aa.entries()).forEach(([t,n])=>{(!e||t.startsWith(`${e}:`))&&aa.set(t,{...n,stale:!0})}),t.notifyActive&&typeof window<`u`&&window.dispatchEvent(new CustomEvent(oa,{detail:{moduleKey:e}}))}function ca(e,t){if(typeof window>`u`)return t;let n={...t};return pr(e).forEach(e=>{try{let t=window.localStorage.getItem(e);t&&n[e]===void 0&&(n[e]=JSON.parse(t))}catch{}}),n}function la(e,t,n){let r=`<base href="${t}"><style>${ra}${ia}</style>${da(n)}${ua()}`;return/<head[^>]*>/i.test(e)?e.replace(/<head([^>]*)>/i,`<head$1>${r}`):`<!doctype html><html lang="pt-BR"><head>${r}</head><body>${e}</body></html>`}function ua(){return`<script>
(function(){
  var paths = {
    edit:'<path d="M4 20h16"></path><path d="M6 16l10-10 3 3L9 19H6v-3Z"></path>',
    kanban:'<path d="M4 5h5v14H4z"></path><path d="M10 5h5v10h-5z"></path><path d="M16 5h4v7h-4z"></path>',
    map:'<path d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2V6Z"></path><path d="M9 4v14M15 6v14"></path>',
    quote:'<circle cx="12" cy="12" r="8"></circle><path d="M12 7v10M9 10c0-1.4 1.3-2 3-2s3 .6 3 2-1.3 2-3 2-3 .6-3 2 1.3 2 3 2 3-.6 3-2"></path>',
    chart:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 16v-5M12 16V8M16 16v-8"></path>',
    clipboard:'<path d="M8 4h8l1 3H7l1-3Z"></path><path d="M6 6h12v14H6z"></path><path d="M9 11h6M9 15h6"></path>',
    document:'<path d="M7 3h7l4 4v14H7z"></path><path d="M14 3v5h5"></path><path d="M9 13h6M9 17h6"></path>',
    database:'<ellipse cx="12" cy="5" rx="7" ry="3"></ellipse><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"></path><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"></path>',
    upload:'<path d="M12 16V4"></path><path d="m7 9 5-5 5 5"></path><path d="M5 20h14"></path>',
    settings:'<path d="M4 7h10"></path><circle cx="17" cy="7" r="2"></circle><path d="M20 17H10"></path><circle cx="7" cy="17" r="2"></circle>',
    check:'<circle cx="12" cy="12" r="8"></circle><path d="m8.5 12.5 2.5 2.5 4.5-5"></path>',
    inbox:'<path d="M4 4h16v12H4z"></path><path d="M4 12h4l2 3h4l2-3h4"></path>',
    calendar:'<rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path>',
    truck:'<path d="M3 7h11v9H3z"></path><path d="M14 10h4l3 3v3h-7"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle>',
    warehouse:'<path d="M3 10 12 4l9 6v10H3z"></path><path d="M9 20v-5h6v5M7 12h2M15 12h2"></path>',
    package:'<path d="m4 7 8-4 8 4v10l-8 4-8-4V7Z"></path><path d="m4 7 8 4 8-4M12 11v10"></path>',
    route:'<path d="M6 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M8 16c3-5 6 1 8-6"></path>',
    blocked:'<circle cx="12" cy="12" r="8"></circle><path d="m8 8 8 8"></path>',
    user:'<circle cx="12" cy="8" r="3.3"></circle><path d="M5 20a7 7 0 0 1 14 0"></path>',
    phone:'<path d="M6.5 4h3l1.5 4-2 1.5a15 15 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"></path>',
    location:'<path d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z"></path><circle cx="12" cy="10" r="2.2"></circle>',
    tag:'<path d="M20 10 11 19 4 12V4h8l8 6Z"></path><circle cx="8.5" cy="8.5" r="1"></circle>',
    cart:'<circle cx="9" cy="19" r="1.5"></circle><circle cx="17" cy="19" r="1.5"></circle><path d="M3 5h2l2.2 9.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H7"></path>',
    safety:'<path d="M5 12a7 7 0 0 1 14 0v4H5v-4Z"></path><path d="M8 11V9a4 4 0 1 1 8 0v2"></path><path d="M4 16h16"></path>',
    tools:'<path d="m14 7 3-3 3 3-3 3"></path><path d="M3 21 14 10"></path><path d="m10 14-4-4 2-2 4 4"></path>',
    electric:'<path d="M13 2 6 13h5l-1 9 8-12h-5l0-8Z"></path>',
    history:'<path d="M7 3h7l4 4v14H7z"></path><path d="M14 3v5h5"></path><path d="M9 13h6M9 17h6"></path>',
    process:'<path d="M4 7h6v6H4z"></path><path d="M14 4h6v6h-6z"></path><path d="M14 14h6v6h-6z"></path><path d="M10 10h4"></path><path d="M17 10v4"></path>'
  };
  var aliases = {
    "\\uD83D\\uDCDD":"edit","\\u270F":"edit","\\u270D":"edit",
    "\\uD83D\\uDDC2":"kanban","\\u25A5":"chart","\\u25A4":"history","\\u25A6":"process","\\u25A3":"process",
    "\\uD83D\\uDCCA":"chart","\\uD83D\\uDCCB":"clipboard","\\uD83D\\uDCC4":"document",
    "\\uD83D\\uDDC4":"database","\\uD83D\\uDDC3":"database","\\uD83D\\uDCE5":"inbox",
    "\\u2699":"settings","\\u2713":"check","\\u2705":"check",
    "\\uD83D\\uDCC6":"calendar","\\uD83D\\uDCC5":"calendar",
    "\\uD83D\\uDE9A":"truck","\\uD83C\\uDFE2":"warehouse","\\uD83D\\uDCE6":"package","\\u26D4":"blocked",
    "\\uD83D\\uDEE3":"route","\\uD83D\\uDED2":"cart","\\uD83D\\uDC64":"user","\\uD83D\\uDCDE":"phone",
    "\\uD83D\\uDCCD":"location","\\uD83C\\uDFF7":"tag","\\uD83E\\uDDBA":"safety","\\uD83D\\uDEE0":"tools",
    "\\uD83D\\uDCA1":"electric"
  };
  function svg(name, className) {
    return '<svg class="' + (className || '') + '" aria-hidden="true" viewBox="0 0 24 24" focusable="false">' + (paths[name] || paths.document) + '</svg>';
  }
  function normalized(value) {
    return String(value || '').trim().replace(/\\uFE0F/g, '');
  }
  function aliasFor(value) {
    var text = normalized(value);
    var keys = Object.keys(aliases).sort(function(a, b) { return b.length - a.length; });
    for (var i = 0; i < keys.length; i += 1) {
      if (text === keys[i] || text.indexOf(keys[i] + ' ') === 0) return aliases[keys[i]];
    }
    return '';
  }
  function iconNameFor(element, value) {
    var name = aliasFor(value);
    var text = normalized(value);
    var context = normalized((element && element.parentElement && element.parentElement.textContent) || (element && element.textContent) || '').toLowerCase();
    if (text.indexOf("\\uD83D\\uDCE5") === 0 && /(import|upload|planilha|base antiga|central de dados)/.test(context)) return 'upload';
    return name;
  }
  function firstUsefulTextNode(element) {
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    var node = walker.nextNode();
    while (node && !normalized(node.nodeValue)) node = walker.nextNode();
    return node;
  }
  function upgradeExactIcon(element) {
    if (element.querySelector('svg')) return true;
    var name = iconNameFor(element, element.textContent);
    if (!name) return false;
    var text = normalized(element.textContent);
    var exactKey = Object.keys(aliases).some(function(key) { return text === key; });
    if (!exactKey) return false;
    element.innerHTML = svg(name, 'sf-professional-svg');
    element.classList.add('sf-professional-icon');
    return true;
  }
  function upgradeLeadingIcon(element) {
    if (element.querySelector('.sf-professional-inline-icon')) return;
    var node = firstUsefulTextNode(element);
    if (!node) return;
    var value = String(node.nodeValue || '');
    var prefix = value.match(/^\\s*/)[0] || '';
    var text = value.slice(prefix.length);
    var normalizedText = normalized(text);
    var keys = Object.keys(aliases).sort(function(a, b) { return b.length - a.length; });
    for (var i = 0; i < keys.length; i += 1) {
      var key = keys[i];
      if (normalizedText === key || normalizedText.indexOf(key + ' ') === 0) {
        var rawLength = text.indexOf(key) === 0 ? key.length : 0;
        if (!rawLength && text.replace(/\\uFE0F/g, '').indexOf(key) === 0) rawLength = key.length + 1;
        node.nodeValue = prefix + text.slice(rawLength).replace(/^\\uFE0F?\\s*/, '');
        var holder = document.createElement('span');
        holder.className = 'sf-professional-inline-icon';
        holder.innerHTML = svg(iconNameFor(element, key), 'sf-professional-svg');
        element.insertBefore(holder, node);
        break;
      }
    }
  }
  function upgradeProfessionalIcons(root) {
    var scope = root && root.querySelectorAll ? root : document;
    var exactSelector = '.tab-icon,.sf-tab-icon,.icon-badge,.column-icon,.col-icon,.process-icon,.central-import-hero-icon,.kanban-premium-ic,.card-icon-badge,.mk-product-icon';
    var leadingSelector = '.fulfillment-title,.admin-kanban-type-pill,.kanban-premium-switch button,.cart-head b,.kanban-meta-item,.tag,.kanban-chip,.muted';
    var exactNodes = Array.prototype.slice.call(scope.querySelectorAll(exactSelector));
    if (scope.matches && scope.matches(exactSelector)) exactNodes.unshift(scope);
    exactNodes.forEach(function(element) { if (!upgradeExactIcon(element)) upgradeLeadingIcon(element); });
    var leadingNodes = Array.prototype.slice.call(scope.querySelectorAll(leadingSelector));
    if (scope.matches && scope.matches(leadingSelector)) leadingNodes.unshift(scope);
    leadingNodes.forEach(upgradeLeadingIcon);
  }
  window.SFUpgradeProfessionalIcons = upgradeProfessionalIcons;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function() { upgradeProfessionalIcons(document); });
  else upgradeProfessionalIcons(document);
  if (!window.__sfProfessionalIconObserver) {
    window.__sfProfessionalIconObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, function(node) {
          if (node.nodeType === 1) upgradeProfessionalIcons(node);
        });
      });
    });
    window.__sfProfessionalIconObserver.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
<\/script>`}function da(e){return`<script>
window.SUPPLY_FLOW_CONTEXT=${JSON.stringify(e).replace(/</g,`\\u003c`)};
(function(){
  var ctx = window.SUPPLY_FLOW_CONTEXT || {};
  var moduleKey = ctx.module || "";
  var canManage = !!ctx.canManage;
  var isSuperAdmin = ctx.role === "super_admin";
  var sharedStorage = ctx.sharedStorage || {};
  var integrations = ctx.integrations || {};
  var syncConfig = ctx.sync || {};
  var applying = false;
  var stockLogged = false;
  var hostUser = ctx.user || {};
  window.SEEL_CURRENT_USER = {
    name: hostUser.nome || "",
    nome: hostUser.nome || "",
    email: hostUser.email || "",
    userEmail: hostUser.email || ""
  };
  window.SEEL_USER = window.SEEL_CURRENT_USER;
  window.PLATFORM_USER = window.SEEL_CURRENT_USER;
  window.SUPPLY_FLOW_USER = window.SEEL_CURRENT_USER;
  window.currentUser = window.SEEL_CURRENT_USER;
  window.supplyFlowUser = window.SEEL_CURRENT_USER;
  window.SUPPLY_FLOW_GOOGLE_MAPS_API_KEY = String(integrations.googleMapsApiKey || "").trim();
  window.SUPPLY_FLOW_SUPABASE_CONNECTED = Boolean(syncConfig.supabaseUrl && syncConfig.supabaseAnonKey && syncConfig.accessToken);
  window.SUPPLY_FLOW_SUPPLIER_MAP_BASE = Array.isArray(ctx.supplierMapBase) ? ctx.supplierMapBase : [];

  function writeSharedStorageSnapshot(source, dispatchEvents) {
    if (!source || typeof source !== "object") return;
    Object.keys(source).forEach(function(key) {
      try {
        var serialized = JSON.stringify(source[key]);
        if (nativeStorageSetItem) nativeStorageSetItem.call(window.localStorage, key, serialized);
        else window.localStorage.setItem(key, serialized);
        if (dispatchEvents) {
          try {
            window.dispatchEvent(new StorageEvent("storage", {
              key: key,
              newValue: serialized,
              storageArea: window.localStorage
            }));
          } catch (eventError) {
            window.dispatchEvent(new CustomEvent("supply-flow:shared-storage-updated", { detail: { key: key } }));
          }
        }
      } catch (err) {}
    });
  }

  function updateHostContext(nextContext) {
    if (!nextContext || typeof nextContext !== "object") return;
    ctx = Object.assign({}, ctx, nextContext);
    syncConfig = Object.assign({}, syncConfig, nextContext.sync || {});
    integrations = Object.assign({}, integrations, nextContext.integrations || {});
    sharedStorage = nextContext.sharedStorage && typeof nextContext.sharedStorage === "object" ? nextContext.sharedStorage : sharedStorage;
    canManage = !!ctx.canManage;
    isSuperAdmin = ctx.role === "super_admin";
    hostUser = ctx.user || hostUser || {};
    window.SEEL_CURRENT_USER = {
      name: hostUser.nome || "",
      nome: hostUser.nome || "",
      email: hostUser.email || "",
      userEmail: hostUser.email || ""
    };
    window.SEEL_USER = window.SEEL_CURRENT_USER;
    window.PLATFORM_USER = window.SEEL_CURRENT_USER;
    window.SUPPLY_FLOW_USER = window.SEEL_CURRENT_USER;
    window.currentUser = window.SEEL_CURRENT_USER;
    window.supplyFlowUser = window.SEEL_CURRENT_USER;
    window.SUPPLY_FLOW_GOOGLE_MAPS_API_KEY = String(integrations.googleMapsApiKey || "").trim();
    window.SUPPLY_FLOW_SUPABASE_CONNECTED = Boolean(syncConfig.supabaseUrl && syncConfig.supabaseAnonKey && syncConfig.accessToken);
    writeSharedStorageSnapshot(sharedStorage, true);
    applyRules();
  }

  window.addEventListener("message", function(event) {
    var message = event && event.data;
    if (!message || message.type !== "supply-flow:context-update") return;
    updateHostContext(message.context || {});
  });

  writeSharedStorageSnapshot(sharedStorage, false);

  var nativeStorageSetItem = Storage.prototype.setItem;
  var nativeStorageRemoveItem = Storage.prototype.removeItem;
  var syncTimers = {};
  var knownFreightIds = {};
  var initialFreights = Array.isArray(sharedStorage[syncConfig.freightStorageKey]) ? sharedStorage[syncConfig.freightStorageKey] : [];
  initialFreights.forEach(function(item) {
    if (item && item.id) knownFreightIds[String(item.id)] = true;
  });
  var knownNotaFiscalIds = {};
  var initialNotaFiscalRows = Array.isArray(sharedStorage[syncConfig.notaFiscalStorageKey]) ? sharedStorage[syncConfig.notaFiscalStorageKey] : [];
  initialNotaFiscalRows.forEach(function(item, index) {
    var id = notaFiscalRecordId(item, index);
    if (id) knownNotaFiscalIds[id] = true;
  });
  var knownStockOrderIds = {};
  var initialStockState = sharedStorage[syncConfig.stockStateKey] && typeof sharedStorage[syncConfig.stockStateKey] === "object"
    ? sharedStorage[syncConfig.stockStateKey]
    : {};
  var initialStockOrders = Array.isArray(initialStockState.orders) ? initialStockState.orders : [];
  initialStockOrders.forEach(function(item) {
    if (item && item.id) knownStockOrderIds[String(item.id)] = true;
  });
  var knownEvaluationIds = {};
  var initialEvaluationDb = sharedStorage[syncConfig.evaluationDbKey] && typeof sharedStorage[syncConfig.evaluationDbKey] === "object"
    ? sharedStorage[syncConfig.evaluationDbKey]
    : {};
  var initialEvaluations = Array.isArray(initialEvaluationDb.evaluations) ? initialEvaluationDb.evaluations : [];
  initialEvaluations.forEach(function(item) {
    if (item && item.id) knownEvaluationIds[String(item.id)] = true;
  });
  var knownSupplierRegistrationIds = {};
  var initialSupplierRegistrations = Array.isArray(sharedStorage[syncConfig.supplierRegistrationStorageKey])
    ? sharedStorage[syncConfig.supplierRegistrationStorageKey]
    : [];
  initialSupplierRegistrations.forEach(function(item, index) {
    var id = supplierRegistrationRecordId(item, index);
    if (id) knownSupplierRegistrationIds[id] = true;
  });
  var knownMaterialRegistrationIds = {};
  var initialMaterialRegistrations = Array.isArray(sharedStorage[syncConfig.materialRegistrationStorageKey])
    ? sharedStorage[syncConfig.materialRegistrationStorageKey]
    : [];
  initialMaterialRegistrations.forEach(function(item, index) {
    var id = materialRegistrationRecordId(item, index);
    if (id) knownMaterialRegistrationIds[id] = true;
  });
  var knownContractDbIds = {};
  var knownContractCodes = {};
  var syncingContractStorage = false;
  var initialContracts = Array.isArray(sharedStorage[syncConfig.contractRequestsStorageKey]) ? sharedStorage[syncConfig.contractRequestsStorageKey] : [];
  initialContracts.forEach(function(item) {
    var dbId = item && (item.__supplyContratoDbId || item.dbId || item.supabaseId);
    if (dbId) knownContractDbIds[String(dbId)] = true;
    var code = item && (item.codigo_embutido || item.id);
    if (code) knownContractCodes[String(code)] = true;
  });

  function parseStoragePayload(value) {
    try {
      return JSON.parse(value);
    } catch (err) {
      return null;
    }
  }

  function syncHeaders(extra) {
    if (!syncConfig.supabaseUrl || !syncConfig.supabaseAnonKey || !syncConfig.accessToken) return null;
    return Object.assign({
      apikey: syncConfig.supabaseAnonKey,
      Authorization: "Bearer " + syncConfig.accessToken,
      "Content-Type": "application/json"
    }, extra || {});
  }

  function syncUrl(path) {
    return String(syncConfig.supabaseUrl || "").replace(/\\/$/, "") + path;
  }

  function postgrestRequest(path, options) {
    var headers = syncHeaders(options && options.headers);
    if (!headers) return Promise.resolve(false);
    return fetch(syncUrl(path), Object.assign({}, options, { headers: headers })).then(function(response) {
      if (!response.ok) throw new Error("Falha ao sincronizar dados: " + response.status);
      return true;
    }).catch(function(error) {
      console.warn(error.message || error);
      return false;
    });
  }

  function postgrestJson(path, options) {
    var headers = syncHeaders(options && options.headers);
    if (!headers) return Promise.resolve(null);
    return fetch(syncUrl(path), Object.assign({}, options, { headers: headers })).then(function(response) {
      if (!response.ok) throw new Error("Falha ao sincronizar dados: " + response.status);
      return response.text().then(function(text) {
        if (!text) return null;
        try {
          return JSON.parse(text);
        } catch (err) {
          return null;
        }
      });
    }).catch(function(error) {
      console.warn(error.message || error);
      return null;
    });
  }

  function supplierMapCategories(item) {
    if (Array.isArray(item && item.categories)) return item.categories.map(firstFilled).filter(Boolean);
    return String(firstFilled(item && item.categories, item && item.categoria, item && item.produto_servico))
      .split(/[|,;/]+/)
      .map(function(value) { return value.trim(); })
      .filter(Boolean);
  }

  function supplierMapRegistrationActive(value) {
    var status = normalizeEmbeddedText(value);
    return status === "sim" || status === "ativo" || status === "cadastro ativo";
  }

  function supplierMapNumber(value) {
    if (value === null || value === undefined || value === "") return null;
    var parsed = Number(String(value).replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }

  function supplierMapPayload(item, categories) {
    var previous = item && item.payload && typeof item.payload === "object" && !Array.isArray(item.payload) ? item.payload : {};
    return Object.assign({}, previous, {
      contato: firstFilled(item && item.contact, previous.contato, previous.Contato),
      observacoes: firstFilled(item && item.notes, previous.observacoes, previous.Observacoes),
      categorias: categories,
      registration: firstFilled(item && item.registration),
      locationPrecision: firstFilled(item && item.locationPrecision),
      sourceSheets: Array.isArray(item && item.sourceSheets) ? item.sourceSheets : [],
      __embedded_supplier_map: item
    });
  }

  function supplierMapRecord(item) {
    if (!item || typeof item !== "object") return null;
    var categories = supplierMapCategories(item);
    var id = firstFilled(item.__supplyFornecedorDbId, isUuid(item.id) ? item.id : "");
    var record = {
      codigo: firstFilled(item.code, item.codigo) || null,
      nome: firstFilled(item.name, item.nome, "Fornecedor sem nome"),
      categoria: categories.join(", ") || null,
      produto_servico: firstFilled(item.productService, item.produto_servico, item.notes) || null,
      cidade: firstFilled(item.city, item.cidade) || null,
      uf: firstFilled(item.uf).toUpperCase() || null,
      regiao: firstFilled(item.region, item.regiao) || null,
      telefone: firstFilled(item.phone, item.telefone) || null,
      email: firstFilled(item.email) || null,
      site: firstFilled(item.site) || null,
      cadastro_ativo: supplierMapRegistrationActive(item.registration),
      latitude: supplierMapNumber(item.latitude),
      longitude: supplierMapNumber(item.longitude),
      payload: supplierMapPayload(item, categories)
    };
    if (id) record.id = id;
    return record;
  }

  function supplierMapIdentityKey(value) {
    return normalizeEmbeddedText([
      value && (value.nome || value.name),
      value && (value.cidade || value.city),
      value && value.uf
    ].join("|"));
  }

  function mergeSupplierMapIds(items, returnedRows) {
    if (!Array.isArray(items) || !Array.isArray(returnedRows) || !returnedRows.length) return;
    var byId = {};
    var byCode = {};
    var byIdentity = {};
    returnedRows.forEach(function(row) {
      if (!row || !row.id) return;
      byId[String(row.id)] = row;
      if (row.codigo) byCode[String(row.codigo)] = row;
      byIdentity[supplierMapIdentityKey(row)] = row;
    });

    items.forEach(function(item) {
      if (!item || typeof item !== "object") return;
      var match =
        byId[String(item.__supplyFornecedorDbId || item.id || "")] ||
        byCode[String(item.code || item.codigo || "")] ||
        byIdentity[supplierMapIdentityKey(item)];
      if (!match || !match.id) return;
      item.id = match.id;
      item.__supplyFornecedorDbId = match.id;
      if (match.codigo && !item.code) item.code = match.codigo;
    });
  }

  function syncSupplierMapRows(items) {
    if (!canManage) {
      alert("Apenas administradores de suprimentos podem alterar a base de fornecedores.");
      return Promise.resolve(false);
    }
    var rows = Array.isArray(items) ? items : [];
    var records = rows.map(supplierMapRecord).filter(Boolean);
    var withId = records.filter(function(record) { return record.id; });
    var withCode = records.filter(function(record) { return !record.id && record.codigo; });
    var inserts = records.filter(function(record) { return !record.id && !record.codigo; });
    var tasks = [];

    if (withId.length) {
      tasks.push(postgrestJson("/rest/v1/fornecedores?on_conflict=id", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify(withId)
      }));
    }
    if (withCode.length) {
      tasks.push(postgrestJson("/rest/v1/fornecedores?on_conflict=codigo", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify(withCode)
      }));
    }
    if (inserts.length) {
      tasks.push(postgrestJson("/rest/v1/fornecedores", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(inserts)
      }));
    }

    return Promise.all(tasks).then(function(results) {
      var returned = [];
      results.forEach(function(result) {
        if (Array.isArray(result)) returned = returned.concat(result);
      });
      mergeSupplierMapIds(rows, returned);
      return true;
    });
  }

  function deleteSupplierMapRecord(id) {
    if (!canManage) {
      alert("Apenas administradores de suprimentos podem excluir fornecedores.");
      return Promise.resolve(false);
    }
    var target = firstFilled(id);
    var path = isUuid(target)
      ? "/rest/v1/fornecedores?id=eq." + encodeURIComponent(target)
      : "/rest/v1/fornecedores?codigo=eq." + encodeURIComponent(target);
    return postgrestRequest(path, {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function deleteAllSupplierMapRecords() {
    if (!canManage) {
      alert("Apenas administradores de suprimentos podem excluir a base de fornecedores.");
      return Promise.resolve(false);
    }
    return postgrestRequest("/rest/v1/fornecedores?id=not.is.null", {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  window.SUPPLY_FLOW_SUPPLIER_MAP_BRIDGE = {
    getAll: function() { return Promise.resolve([]); },
    putMany: syncSupplierMapRows,
    put: function(item) { return syncSupplierMapRows([item]); },
    delete: deleteSupplierMapRecord,
    deleteAll: deleteAllSupplierMapRecords
  };

  function freightRecord(item) {
    if (!item || typeof item !== "object" || !item.id) return null;
    return {
      id: String(item.id),
      payload: item,
      email_solicitante: String(item.emailSolicitante || item.email_solicitante || ""),
      status: String(item.status || "")
    };
  }

  function notaFiscalRecordId(item, index) {
    if (!item || typeof item !== "object") return "";
    if (item.id !== undefined && item.id !== null && String(item.id).trim()) return String(item.id);
    if (item.code !== undefined && item.code !== null && String(item.code).trim()) return "nf_" + compactHash(String(item.code));
    return stableRecordId("nf_simples", item, index);
  }

  function notaFiscalRecord(item, index) {
    if (!item || typeof item !== "object") return null;
    var payload = Object.assign({}, item);
    var hostEmail = String(hostUser.email || "").trim();
    var hostName = String(hostUser.nome || "").trim();

    if (!canManage) {
      if (hostEmail) payload.requesterEmail = hostEmail;
      if (hostName) payload.requesterName = hostName;
    }

    var requesterEmail = firstFilled(payload.requesterEmail, payload.email_solicitante, hostEmail);
    if (!canManage && hostEmail && requesterEmail.toLowerCase() !== hostEmail.toLowerCase()) return null;

    var id = notaFiscalRecordId(payload, index);
    payload.id = id;

    return {
      id: id,
      payload: payload,
      codigo: firstFilled(payload.code, payload.codigo, id),
      solicitante: firstFilled(payload.requesterName, payload.solicitante, hostName),
      email_solicitante: requesterEmail,
      centro_custo: firstFilled(payload.issuerDepartment, payload.recipientDepartment, payload.centro_custo),
      status: firstFilled(payload.status, "N\\u00e3o Iniciado"),
      prioridade: firstFilled(payload.priority, "Normal")
    };
  }

  function stableRecordId(prefix, item, index) {
    if (item && item.id !== undefined && item.id !== null && String(item.id).trim()) return String(item.id);
    var source = "";
    try {
      source = JSON.stringify(item || {});
    } catch (err) {
      source = String(Date.now()) + "_" + String(index || 0);
    }
    var hash = 0;
    for (var i = 0; i < source.length; i++) {
      hash = ((hash << 5) - hash + source.charCodeAt(i)) | 0;
    }
    return prefix + "_" + Math.abs(hash) + "_" + String(index || 0);
  }

  function stockOrderRecord(item, index) {
    if (!item || typeof item !== "object") return null;
    var payload = Object.assign({}, item);
    var hostEmail = String(hostUser.email || "").trim();
    if (!canManage && hostEmail) {
      payload.requesterEmail = hostEmail;
      payload.requester = hostEmail;
      if (hostUser.nome) payload.requesterName = hostUser.nome;
    }
    var requesterEmail = String(payload.requesterEmail || payload.requester || "").trim();
    if (!canManage && hostEmail && requesterEmail.toLowerCase() !== hostEmail.toLowerCase()) return null;
    return {
      id: stableRecordId("estoque_pedido", payload, index),
      payload: payload,
      requester_email: requesterEmail,
      obra: String(payload.worksite || payload.obra || ""),
      status: String(payload.status || "")
    };
  }

  function supplierEvaluationRecord(item, index) {
    if (!item || typeof item !== "object") return null;
    var payload = Object.assign({}, item);
    var hostEmail = String(hostUser.email || "").trim();
    var evaluatorEmail = String(payload.avaliadorEmail || payload.evaluatorEmail || payload.emailAvaliador || hostEmail || "").trim();
    if (!canManage && hostEmail && evaluatorEmail.toLowerCase() !== hostEmail.toLowerCase()) return null;
    payload.avaliadorEmail = evaluatorEmail;
    return {
      id: stableRecordId("avaliacao", payload, index),
      payload: payload,
      cycle_id: String(payload.cycleId || payload.cycle_id || ""),
      supplier_id: String(payload.supplierId || payload.supplier_id || ""),
      obra: String(payload.obra || ""),
      fornecedor: String(payload.fornecedor || ""),
      avaliador_email: evaluatorEmail
    };
  }

  function compactHash(value) {
    var source = String(value || "");
    var hash = 0;
    for (var i = 0; i < source.length; i++) {
      hash = ((hash << 5) - hash + source.charCodeAt(i)) | 0;
    }
    return Math.abs(hash).toString(36);
  }

  function supplierRegistrationRecordId(item, index) {
    if (!item || typeof item !== "object") return "";
    var values = item.values && typeof item.values === "object" ? item.values : {};
    return firstFilled(
      item.__supplyFornecedorCadastroDbId,
      "forcad_" + compactHash([
        item.id,
        values.requestId,
        item.createdAt,
        values.requesterEmail,
        hostUser.email,
        index
      ].join("|"))
    );
  }

  function supplierRegistrationRecord(item, index) {
    if (!item || typeof item !== "object") return null;
    var values = item.values && typeof item.values === "object" ? Object.assign({}, item.values) : {};
    var payload = Object.assign({}, item, { values: values });
    var hostEmail = String(hostUser.email || "").trim();
    var hostName = String(hostUser.nome || "").trim();

    if (!canManage) {
      if (hostEmail) {
        payload.requesterEmail = hostEmail;
        values.requesterEmail = hostEmail;
      }
      if (hostName) {
        payload.requesterName = hostName;
        values.requesterName = hostName;
      }
    }

    var id = supplierRegistrationRecordId(payload, index);
    payload.__supplyFornecedorCadastroDbId = id;
    payload.values = values;

    return {
      id: id,
      payload: payload,
      email_solicitante: firstFilled(payload.requesterEmail, values.requesterEmail, hostEmail),
      obra: firstFilled(payload.costCenter, values.costCenter),
      fornecedor: firstFilled(payload.supplierName, values.supplierName, "Fornecedor sem nome"),
      status: firstFilled(payload.stage, "Solicitacao Recebida")
    };
  }

  function materialRegistrationRecordId(item, index) {
    if (!item || typeof item !== "object") return "";
    return firstFilled(
      item.__supplyCadastroMateriaisDbId,
      item.id,
      item.code ? "mat_" + compactHash(String(item.code)) : "",
      stableRecordId("cadastro_materiais", item, index)
    );
  }

  function materialRegistrationRecord(item, index) {
    if (!item || typeof item !== "object") return null;
    var payload = Object.assign({}, item);
    var hostEmail = String(hostUser.email || "").trim();
    var hostName = String(hostUser.nome || "").trim();

    if (!canManage) {
      if (hostEmail) payload.requesterEmail = hostEmail;
      if (hostName) payload.requesterName = hostName;
    }

    var requesterEmail = firstFilled(payload.requesterEmail, payload.email_solicitante, hostEmail);
    if (!canManage && hostEmail && requesterEmail.toLowerCase() !== hostEmail.toLowerCase()) return null;

    var id = materialRegistrationRecordId(payload, index);
    payload.id = firstFilled(payload.id, id);
    payload.__supplyCadastroMateriaisDbId = id;

    return {
      id: id,
      payload: payload,
      codigo: firstFilled(payload.code, payload.codigo, id),
      solicitante: firstFilled(payload.requesterName, payload.solicitante, hostName),
      email_solicitante: requesterEmail,
      centro_custo: firstFilled(payload.issuerDepartment, payload.recipientDepartment, payload.centro_custo),
      status: firstFilled(payload.status, "Nao Iniciado"),
      prioridade: firstFilled(payload.priority, "Normal")
    };
  }

  function normalizeEmbeddedText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function firstFilled() {
    for (var i = 0; i < arguments.length; i++) {
      var text = String(arguments[i] == null ? "" : arguments[i]).trim();
      if (text) return text;
    }
    return "";
  }

  function dateOnly(value) {
    var text = firstFilled(value);
    var match = text.match(/^\\d{4}-\\d{2}-\\d{2}/);
    return match ? match[0] : "";
  }

  function isUuid(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
  }

  function detailedContractStatus(value) {
    var status = normalizeEmbeddedText(value);
    if (!status) return "N\\u00e3o Iniciado";
    if (status.indexOf("aprovado") >= 0 || status.indexOf("finalizado") >= 0) return "Aprovado no Compor";
    if (status.indexOf("compor") >= 0 || status.indexOf("cadastro") >= 0) return "Em Cadastro no Compor";
    if (status.indexOf("assinado") >= 0) return "Contrato Assinado";
    if (status.indexOf("assinatura") >= 0) return "Enviado para Assinatura";
    if (status.indexOf("validacao") >= 0 || status.indexOf("analise") >= 0 || status.indexOf("aguardando") >= 0) return "Aguardando Valida\\u00e7\\u00e3o";
    if (status.indexOf("elaboracao") >= 0) return "Em Elabora\\u00e7\\u00e3o";
    if (status.indexOf("solicitado") >= 0 || status.indexOf("iniciado") >= 0) return "N\\u00e3o Iniciado";
    return firstFilled(value, "N\\u00e3o Iniciado");
  }

  function contractCode(item, index) {
    return firstFilled(item && item.codigo_embutido, item && item.id, stableRecordId("contrato", item, index));
  }

  function resolveContratoObraId(item) {
    if (item && item.__supplyObraId && isUuid(item.__supplyObraId)) return String(item.__supplyObraId);
    var data = item && item.data && typeof item.data === "object" ? item.data : {};
    var target = normalizeEmbeddedText(firstFilled(
      data.obra,
      data.nome_obra,
      data.centro_obra,
      data.centro_departamento,
      item && item.obra,
      item && item.centro
    ));
    var obras = Array.isArray(ctx.obras) ? ctx.obras : [];
    var match = obras.find(function(obra) {
      var values = [obra.id, obra.nome, obra.codigo, obra.centro_custo].map(normalizeEmbeddedText).filter(Boolean);
      return values.some(function(value) {
        return target === value || (target && value && (target.indexOf(value) >= 0 || value.indexOf(target) >= 0));
      });
    });
    if (match && match.id) return String(match.id);
    if (!canManage && obras.length === 1 && obras[0].id) return String(obras[0].id);
    return null;
  }

  function contractRecord(item, index) {
    if (!item || typeof item !== "object") return null;
    var data = item.data && typeof item.data === "object" ? Object.assign({}, item.data) : {};
    var code = contractCode(item, index);
    var hostEmail = String(hostUser.email || "").trim();
    var hostName = String(hostUser.nome || "").trim();
    if (!canManage) {
      if (hostEmail) {
        item.email = hostEmail;
        data.email = hostEmail;
      }
      if (hostName) {
        item.solicitante = hostName;
        data.solicitante = hostName;
      }
    }
    var centro = firstFilled(item.centro, data.centro_obra, data.centro_departamento);
    var tipo = firstFilled(item.tipo, data.tipo_documento_obra, data.tipo_documento_departamento, data.tipo_contrato, "Solicitacao");
    var urgencia = firstFilled(item.urgencia, data.prazo_urgencia, "NORMAL - 5 DIAS UTEIS");
    var deadline = dateOnly(firstFilled(item.dataLimite, data.data_limite_atendimento));
    var status = detailedContractStatus(item.status);
    var dbId = firstFilled(item.__supplyContratoDbId, item.dbId, item.supabaseId);
    var payloadRequest = Object.assign({}, item, {
      id: firstFilled(item.id, code),
      codigo_embutido: code,
      __supplyContratoDbId: dbId || undefined,
      __supplyObraId: resolveContratoObraId(item) || undefined,
      data: data
    });
    var payload = Object.assign({}, data, {
      canal: "embedded_contracts",
      codigo_embutido: code,
      embedded_request_id: code,
      __embedded_contract_request: payloadRequest,
      observacoesResponsavel: firstFilled(item.observacoesResponsavel, data.observacoesResponsavel),
      solicitacaoComErro: Boolean(item.solicitacaoComErro || data.solicitacaoComErro)
    });
    var record = {
      codigo_embutido: code,
      obra_id: resolveContratoObraId(item),
      solicitante: firstFilled(item.solicitante, data.solicitante, hostName),
      email_solicitante: firstFilled(item.email, data.email, hostEmail),
      centro_custo: centro,
      tipo_documento: tipo,
      urgencia: urgencia,
      prazo_urgencia: deadline || null,
      status: status,
      fase_compor: status,
      payload: payload
    };
    if (isUuid(dbId)) record.id = dbId;
    return record;
  }

  function deleteContractRecord(id) {
    return postgrestRequest("/rest/v1/contratos?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function mergeContractIdsIntoStorage(rows, returnedRows) {
    if (!Array.isArray(rows) || !Array.isArray(returnedRows) || !returnedRows.length || !syncConfig.contractRequestsStorageKey) return;
    var byCode = {};
    returnedRows.forEach(function(row) {
      if (row && row.codigo_embutido && row.id) byCode[String(row.codigo_embutido)] = row;
    });
    var changed = false;
    var nextRows = rows.map(function(item, index) {
      if (!item || typeof item !== "object") return item;
      var code = contractCode(item, index);
      var match = byCode[code];
      if (!match || item.__supplyContratoDbId === match.id) return item;
      changed = true;
      return Object.assign({}, item, {
        codigo_embutido: code,
        __supplyContratoDbId: match.id,
        __supplyObraId: match.obra_id || item.__supplyObraId || ""
      });
    });
    if (!changed) return;
    syncingContractStorage = true;
    try {
      nativeStorageSetItem.call(window.localStorage, syncConfig.contractRequestsStorageKey, JSON.stringify(nextRows));
    } catch (err) {
    } finally {
      syncingContractStorage = false;
    }
  }

  function syncContractRows(rows) {
    if (!Array.isArray(rows) || !syncConfig.contractRequestsStorageKey || syncingContractStorage) return;
    var records = rows.map(contractRecord).filter(Boolean);
    var nextDbIds = {};
    var nextCodes = {};
    records.forEach(function(record) {
      if (record.id) nextDbIds[String(record.id)] = true;
      if (record.codigo_embutido) nextCodes[String(record.codigo_embutido)] = true;
    });

    if (canManage) {
      var tasks = [];
      var recordsWithId = records.filter(function(record) { return record.id; });
      var recordsWithoutId = records.filter(function(record) { return !record.id; });
      if (recordsWithId.length) {
        tasks.push(postgrestJson("/rest/v1/contratos?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=representation" },
          body: JSON.stringify(recordsWithId)
        }));
      }
      if (recordsWithoutId.length) {
        tasks.push(postgrestJson("/rest/v1/contratos?on_conflict=codigo_embutido", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=representation" },
          body: JSON.stringify(recordsWithoutId)
        }));
      }
      Object.keys(knownContractDbIds).forEach(function(id) {
        if (!nextDbIds[id]) tasks.push(deleteContractRecord(id));
      });
      Promise.all(tasks).then(function(results) {
        var returned = [];
        results.forEach(function(result) {
          if (Array.isArray(result)) returned = returned.concat(result);
        });
        mergeContractIdsIntoStorage(rows, returned);
        knownContractDbIds = {};
        knownContractCodes = {};
        records.forEach(function(record) {
          if (record.id) knownContractDbIds[String(record.id)] = true;
          if (record.codigo_embutido) knownContractCodes[String(record.codigo_embutido)] = true;
        });
        returned.forEach(function(record) {
          if (record && record.id) knownContractDbIds[String(record.id)] = true;
          if (record && record.codigo_embutido) knownContractCodes[String(record.codigo_embutido)] = true;
        });
      });
      return;
    }

    var newRecords = records.filter(function(record) {
      var dbId = record.id && knownContractDbIds[String(record.id)];
      var code = record.codigo_embutido && knownContractCodes[String(record.codigo_embutido)];
      return !dbId && !code;
    }).map(function(record) {
      var next = Object.assign({}, record);
      delete next.id;
      return next;
    });
    if (!newRecords.length) return;
    postgrestJson("/rest/v1/contratos", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(newRecords)
    }).then(function(returned) {
      if (!Array.isArray(returned)) return;
      mergeContractIdsIntoStorage(rows, returned);
      returned.forEach(function(record) {
        if (record && record.id) knownContractDbIds[String(record.id)] = true;
        if (record && record.codigo_embutido) knownContractCodes[String(record.codigo_embutido)] = true;
      });
    });
  }

  function deleteFreightRecord(id) {
    return postgrestRequest("/rest/v1/fretes_solicitacoes?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function syncFreightRows(rows) {
    if (!Array.isArray(rows) || !syncConfig.freightStorageKey) return;
    var records = rows.map(freightRecord).filter(Boolean);
    var nextIds = {};
    records.forEach(function(record) { nextIds[record.id] = true; });

    if (canManage) {
      var tasks = [];
      if (records.length) {
        tasks.push(postgrestRequest("/rest/v1/fretes_solicitacoes?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(records)
        }));
      }
      Object.keys(knownFreightIds).forEach(function(id) {
        if (!nextIds[id]) tasks.push(deleteFreightRecord(id));
      });
      Promise.all(tasks).then(function() { knownFreightIds = nextIds; });
      return;
    }

    var newRecords = records.filter(function(record) { return !knownFreightIds[record.id]; });
    if (!newRecords.length) return;
    postgrestRequest("/rest/v1/fretes_solicitacoes", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(newRecords)
    }).then(function(ok) {
      if (!ok) return;
      newRecords.forEach(function(record) { knownFreightIds[record.id] = true; });
    });
  }

  function deleteNotaFiscalRecord(id) {
    return postgrestRequest("/rest/v1/nf_simples_remessa_solicitacoes?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function syncNotaFiscalRows(rows) {
    if (!Array.isArray(rows) || !syncConfig.notaFiscalStorageKey) return;
    var records = rows.map(notaFiscalRecord).filter(Boolean);
    var nextIds = {};
    records.forEach(function(record) { nextIds[record.id] = true; });

    if (canManage) {
      var tasks = [];
      if (records.length) {
        tasks.push(postgrestRequest("/rest/v1/nf_simples_remessa_solicitacoes?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(records)
        }));
      }
      Object.keys(knownNotaFiscalIds).forEach(function(id) {
        if (!nextIds[id]) tasks.push(deleteNotaFiscalRecord(id));
      });
      Promise.all(tasks).then(function() { knownNotaFiscalIds = nextIds; });
      return;
    }

    var newRecords = records.filter(function(record) { return !knownNotaFiscalIds[record.id]; });
    if (!newRecords.length) return;
    postgrestRequest("/rest/v1/nf_simples_remessa_solicitacoes", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(newRecords)
    }).then(function(ok) {
      if (!ok) return;
      newRecords.forEach(function(record) { knownNotaFiscalIds[record.id] = true; });
    });
  }

  function deleteStockOrderRecord(id) {
    return postgrestRequest("/rest/v1/estoque_obras_pedidos?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function syncStockState(state) {
    if (!state || typeof state !== "object") {
      if (canManage) syncSharedState(syncConfig.stockStateKey, null);
      return;
    }

    var orders = Array.isArray(state.orders) ? state.orders : [];
    var stateWithoutOrders = Object.assign({}, state, { orders: [] });
    if (canManage) syncSharedState(syncConfig.stockStateKey, stateWithoutOrders);

    var records = orders.map(stockOrderRecord).filter(Boolean);
    var nextIds = {};
    records.forEach(function(record) { nextIds[record.id] = true; });

    if (canManage) {
      var tasks = [];
      if (records.length) {
        tasks.push(postgrestRequest("/rest/v1/estoque_obras_pedidos?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(records)
        }));
      }
      Object.keys(knownStockOrderIds).forEach(function(id) {
        if (!nextIds[id]) tasks.push(deleteStockOrderRecord(id));
      });
      Promise.all(tasks).then(function() { knownStockOrderIds = nextIds; });
      return;
    }

    var newRecords = records.filter(function(record) { return !knownStockOrderIds[record.id]; });
    if (!newRecords.length) return;
    postgrestRequest("/rest/v1/estoque_obras_pedidos", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(newRecords)
    }).then(function(ok) {
      if (!ok) return;
      newRecords.forEach(function(record) { knownStockOrderIds[record.id] = true; });
    });
  }

  function deleteSupplierEvaluationRecord(id) {
    return postgrestRequest("/rest/v1/avaliacao_fornecedores_avaliacoes?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function syncSupplierEvaluationDb(db) {
    if (!db || typeof db !== "object") {
      if (canManage) {
        syncSharedState(syncConfig.evaluationDbKey, null);
        Object.keys(knownEvaluationIds).forEach(deleteSupplierEvaluationRecord);
        knownEvaluationIds = {};
      }
      return;
    }

    var evaluations = Array.isArray(db.evaluations) ? db.evaluations : [];
    var dbWithoutEvaluations = Object.assign({}, db, { evaluations: [] });
    if (canManage) syncSharedState(syncConfig.evaluationDbKey, dbWithoutEvaluations);

    var records = evaluations.map(supplierEvaluationRecord).filter(Boolean);
    var nextIds = {};
    records.forEach(function(record) { nextIds[record.id] = true; });

    if (canManage) {
      var tasks = [];
      if (records.length) {
        tasks.push(postgrestRequest("/rest/v1/avaliacao_fornecedores_avaliacoes?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(records)
        }));
      }
      Object.keys(knownEvaluationIds).forEach(function(id) {
        if (!nextIds[id]) tasks.push(deleteSupplierEvaluationRecord(id));
      });
      Promise.all(tasks).then(function() { knownEvaluationIds = nextIds; });
      return;
    }

    if (!records.length) return;
    postgrestRequest("/rest/v1/avaliacao_fornecedores_avaliacoes?on_conflict=cycle_id,supplier_id,avaliador_email", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(records)
    }).then(function(ok) {
      if (!ok) return;
      records.forEach(function(record) { knownEvaluationIds[record.id] = true; });
    });
  }

  function deleteSupplierRegistrationRecord(id) {
    return postgrestRequest("/rest/v1/fornecedores_cadastros?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function syncSupplierRegistrationRows(rows) {
    if (!Array.isArray(rows) || !syncConfig.supplierRegistrationStorageKey) return;
    var records = rows.map(supplierRegistrationRecord).filter(Boolean);
    var nextIds = {};
    records.forEach(function(record) { nextIds[record.id] = true; });

    if (canManage) {
      var tasks = [];
      if (records.length) {
        tasks.push(postgrestRequest("/rest/v1/fornecedores_cadastros?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(records)
        }));
      }
      Object.keys(knownSupplierRegistrationIds).forEach(function(id) {
        if (!nextIds[id]) tasks.push(deleteSupplierRegistrationRecord(id));
      });
      Promise.all(tasks).then(function() { knownSupplierRegistrationIds = nextIds; });
      return;
    }

    var newRecords = records.filter(function(record) { return !knownSupplierRegistrationIds[record.id]; });
    if (!newRecords.length) return;
    postgrestRequest("/rest/v1/fornecedores_cadastros", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(newRecords)
    }).then(function(ok) {
      if (!ok) return;
      newRecords.forEach(function(record) { knownSupplierRegistrationIds[record.id] = true; });
    });
  }

  function deleteMaterialRegistrationRecord(id) {
    return postgrestRequest("/rest/v1/cadastro_materiais_solicitacoes?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function syncMaterialRegistrationRows(rows) {
    if (!Array.isArray(rows) || !syncConfig.materialRegistrationStorageKey) return;
    var records = rows.map(materialRegistrationRecord).filter(Boolean);
    var nextIds = {};
    records.forEach(function(record) { nextIds[record.id] = true; });

    if (canManage) {
      var tasks = [];
      if (records.length) {
        tasks.push(postgrestRequest("/rest/v1/cadastro_materiais_solicitacoes?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(records)
        }));
      }
      Object.keys(knownMaterialRegistrationIds).forEach(function(id) {
        if (!nextIds[id]) tasks.push(deleteMaterialRegistrationRecord(id));
      });
      Promise.all(tasks).then(function() { knownMaterialRegistrationIds = nextIds; });
      return;
    }

    var newRecords = records.filter(function(record) { return !knownMaterialRegistrationIds[record.id]; });
    if (!newRecords.length) return;
    postgrestRequest("/rest/v1/cadastro_materiais_solicitacoes", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(newRecords)
    }).then(function(ok) {
      if (!ok) return;
      newRecords.forEach(function(record) { knownMaterialRegistrationIds[record.id] = true; });
    });
  }

  function canSyncSharedState(key) {
    if (!canManage || !Array.isArray(syncConfig.sharedStateKeys) || syncConfig.sharedStateKeys.indexOf(key) < 0) return false;
    if (moduleKey === "contratos" && key === syncConfig.contractFormStorageKey && !isSuperAdmin) return false;
    if (moduleKey === "nota_fiscal" && key === syncConfig.notaFiscalFormStorageKey && !isSuperAdmin) return false;
    if (moduleKey === "cadastro_materiais" && key === syncConfig.materialRegistrationFormStorageKey && !isSuperAdmin) return false;
    return true;
  }

  function syncSharedState(key, payload) {
    if (!canSyncSharedState(key)) return;
    postgrestRequest("/rest/v1/embedded_app_state?on_conflict=storage_key", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        storage_key: key,
        module_key: moduleKey,
        payload: payload
      })
    });
  }

  window.SUPPLY_FLOW_SYNC_SHARED_STATE = function(key, payload) {
    syncSharedState(String(key || ""), payload);
  };

  function syncStorageWrite(key, value) {
    var isSharedStateKey = Array.isArray(syncConfig.sharedStateKeys) && syncConfig.sharedStateKeys.indexOf(key) >= 0;
    var isDedicatedRowKey =
      key === syncConfig.freightStorageKey ||
      key === syncConfig.notaFiscalStorageKey ||
      key === syncConfig.supplierRegistrationStorageKey ||
      key === syncConfig.materialRegistrationStorageKey ||
      key === syncConfig.stockStateKey ||
      key === syncConfig.evaluationDbKey ||
      key === syncConfig.contractRequestsStorageKey;
    if (!isSharedStateKey && !isDedicatedRowKey) return;
    window.clearTimeout(syncTimers[key]);
    syncTimers[key] = window.setTimeout(function() {
      var payload = parseStoragePayload(value);
      if (key === syncConfig.contractRequestsStorageKey) syncContractRows(payload);
      else if (key === syncConfig.freightStorageKey) syncFreightRows(payload);
      else if (key === syncConfig.notaFiscalStorageKey) syncNotaFiscalRows(payload);
      else if (key === syncConfig.supplierRegistrationStorageKey) syncSupplierRegistrationRows(payload);
      else if (key === syncConfig.materialRegistrationStorageKey) syncMaterialRegistrationRows(payload);
      else if (key === syncConfig.stockStateKey) syncStockState(payload);
      else if (key === syncConfig.evaluationDbKey) syncSupplierEvaluationDb(payload);
      else syncSharedState(key, payload);
    }, 350);
  }

  Storage.prototype.setItem = function(key, value) {
    nativeStorageSetItem.call(this, key, value);
    if (this === window.localStorage) syncStorageWrite(String(key), String(value));
  };

  Storage.prototype.removeItem = function(key) {
    nativeStorageRemoveItem.call(this, key);
    if (this === window.localStorage) syncStorageWrite(String(key), "null");
  };

  function syncInitialSharedStorage() {
    if (!canManage || !sharedStorage || typeof sharedStorage !== "object") return;
    Object.keys(sharedStorage).forEach(function(key) {
      try {
        syncStorageWrite(key, JSON.stringify(sharedStorage[key]));
      } catch (err) {}
    });
  }

  function syncTheme() {
    var theme = "dark";
    try {
      theme = window.parent.document.documentElement.dataset.theme || "dark";
    } catch (err) {
      try {
        theme = window.localStorage.getItem("supply-flow:theme") || "dark";
      } catch (storageErr) {
        theme = "dark";
      }
    }
    document.documentElement.dataset.theme = theme === "dark" ? "dark" : "light";
  }

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function hide(selector) {
    document.querySelectorAll(selector).forEach(function(el) {
      if (el.getAttribute("data-supply-hidden") === "true") return;
      el.setAttribute("data-supply-hidden", "true");
      el.style.setProperty("display", "none", "important");
    });
  }

  function disable(selector) {
    document.querySelectorAll(selector).forEach(function(el) {
      el.disabled = true;
      el.setAttribute("aria-disabled", "true");
      el.classList.add("supply-disabled-action");
    });
  }

  function guard(name, message) {
    var current = window[name];
    if (typeof current !== "function" || current.__supplyGuarded) return;
    var blocked = function() {
      alert(message);
      return false;
    };
    blocked.__supplyGuarded = true;
    window[name] = blocked;
  }

  function labelButtons() {
    document.querySelectorAll(".booking-button, .reserve-btn").forEach(function(button) {
      var text = (button.textContent || "").toUpperCase();
      if (text.indexOf("RESERVAR") >= 0 || text.indexOf("LOCAR") >= 0) {
        button.textContent = "CONSULTAR";
      }
    });
    document.querySelectorAll(".booking-button").forEach(function(button) {
      button.setAttribute("onclick", "openTabById('frotaTab')");
    });
  }

  function consultFleetCard(id) {
    var buttons = Array.prototype.slice.call(document.querySelectorAll(".vehicle-card .reserve-btn"));
    var button = buttons.find(function(item) {
      return (item.getAttribute("onclick") || "").indexOf(id) >= 0;
    });
    var card = button ? button.closest(".vehicle-card") : null;
    if (!card) {
      alert("Consulta disponivel apenas nos cards visiveis da frota.");
      return false;
    }
    card.classList.add("compact-open");
    var details = card.querySelector("button[onclick*='toggleCardDetails']");
    if (details) details.textContent = "Ocultar detalhes";
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }

  function applyFrotaRules() {
    labelButtons();
    if (canManage) return;

    hide("button[onclick*='cadastroTab'], button[onclick*='importacaoTab'], button[onclick*='medicoesTab'], button[onclick*='multasTab']");
    hide("button[onclick*='editVehicle'], button[onclick*='makeAvailable'], button[onclick*='deleteVehicle'], button[onclick*='deleteFine'], #deleteSelectedVehicleButton, #cancelEdit, #saveVehicleButton, #saveApiSettingsButton");
    hide("#importGrid, #fineForm, .api-actions, .quick-actions button[onclick*='cadastroTab']");
    disable("#vehicleForm input, #vehicleForm select, #vehicleForm textarea, #fineForm input, #fineForm select, #fineForm textarea");

    if (typeof window.quickReserve === "function" && !window.quickReserve.__supplyConsultOnly) {
      window.quickReserve = function(id) { return consultFleetCard(id); };
      window.quickReserve.__supplyConsultOnly = true;
    }

    guard("editVehicle", "Apenas super_admin pode editar a frota.");
    guard("makeAvailable", "Apenas super_admin pode movimentar a frota.");
    guard("deleteCurrentVehicle", "Apenas super_admin pode excluir veiculos.");
    guard("deleteSelectedVehicle", "Apenas super_admin pode excluir veiculos.");
    guard("deleteVehicle", "Apenas super_admin pode excluir veiculos.");
    guard("deleteFine", "Apenas super_admin pode excluir multas.");
    guard("importInitialSpreadsheet", "Apenas super_admin pode importar a planilha da frota.");
    guard("syncMeasurements", "Apenas super_admin pode sincronizar medicoes.");
    guard("syncArvalFines", "Apenas super_admin pode sincronizar multas.");
    guard("saveApiSettings", "Apenas super_admin pode alterar integracoes.");
  }

  function applyFretesRules() {
    if (canManage) return;

    hide("button[onclick*='dashboard'], button[onclick*='history'], button[onclick*='editor']");
    hide(".header-actions, button[onclick*='editBasic'], button[onclick*='deleteFreight'], button[onclick*='addQuote'], button[onclick*='selectBestQuote'], button[onclick*='deleteQuote']");
    hide("#dashboard, #history, #editor, #googlePlacesConfig, .quotation-actions, .quotation-form-card, .form-editor-tools, .form-editor-actions, .freight-form-error-check, [data-action='edit'], [data-action='email-quote'], [data-action='email-correction'], #detailResponsibleNoteSave, .responsible-note-save-button");
    disable(".phase-select, .form-error-checkbox, .freight-oc-input, .responsible-note-detail-input, .freight-responsible-note-input, select[onchange*='changePhase']");

    guard("changePhase", "Apenas super_admin pode mudar fases de frete.");
    guard("editBasic", "Apenas super_admin pode editar fretes.");
    guard("startFreightEdit", "Apenas super_admin pode editar fretes.");
    guard("deleteFreight", "Apenas super_admin pode excluir fretes.");
    guard("toggleFreightFormError", "Apenas super_admin pode marcar formulario com erro.");
    guard("addQuoteToSelectedFreight", "Apenas super_admin pode gerenciar cotacoes.");
    guard("selectBestQuote", "Apenas super_admin pode aprovar cotacoes.");
    guard("deleteQuote", "Apenas super_admin pode excluir cotacoes.");
    guard("addFreightFormSection", "Apenas super_admin pode editar o formulario.");
    guard("addFreightFormField", "Apenas super_admin pode editar o formulario.");
    guard("moveFreightFormItem", "Apenas super_admin pode editar o formulario.");
    guard("deleteFreightFormItem", "Apenas super_admin pode editar o formulario.");
    guard("restoreDefaultFreightForm", "Apenas super_admin pode editar o formulario.");
    guard("clearAllData", "Apenas super_admin pode limpar dados.");
    guard("loadDemoData", "Apenas super_admin pode carregar exemplos.");
  }

  function applyNotaFiscalRules() {
    if (!isSuperAdmin) {
      hide("button[data-view='editor'], #view-editor");
      guard("saveCurrentEditorField", "Apenas super_admin pode editar o formulario de NF.");
      guard("resetCurrentEditorField", "Apenas super_admin pode editar o formulario de NF.");
      guard("resetAllEditorFields", "Apenas super_admin pode editar o formulario de NF.");
      guard("syncIntegratedWorkLists", "Apenas super_admin pode editar o formulario de NF.");
    }

    if (canManage) return;

    hide("button[data-view='dashboard'], button[data-view='base'], button[data-view='editor'], #view-dashboard, #view-base, #view-editor");
    hide("#baseNew, #quickExport, #exportCsv, #detailEdit, #detailDelete, #detailDeadline, #saveDetailNote");
    disable(".phase-select, #detailNote");
    document.querySelectorAll(".nf-card").forEach(function(card) {
      card.setAttribute("draggable", "false");
    });

    var activeBlocked = ["view-dashboard", "view-base", "view-editor"].some(function(id) {
      var view = document.getElementById(id);
      return view && view.classList.contains("active");
    });
    if (activeBlocked) {
      if (typeof window.showView === "function") window.showView("kanban");
      else {
        ["view-dashboard", "view-base", "view-editor"].forEach(function(id) {
          var view = document.getElementById(id);
          if (view) view.classList.remove("active");
        });
      }
    }

    guard("changePhase", "Apenas administradores de suprimentos podem alterar fases de NF.");
    guard("moveRelative", "Apenas administradores de suprimentos podem alterar fases de NF.");
    guard("editRequest", "Apenas administradores de suprimentos podem editar solicita\\u00e7\\u00f5es de NF.");
    guard("deleteRequest", "Apenas administradores de suprimentos podem excluir solicita\\u00e7\\u00f5es de NF.");
    guard("exportCsv", "Apenas administradores de suprimentos podem exportar a base de NF.");
  }

  function applyContratosRules() {
    if (!isSuperAdmin) {
      hide("button[data-tab='editor'], #editorView");
      if (document.getElementById("editorView") && !document.getElementById("editorView").classList.contains("hidden")) {
        if (typeof window.switchTab === "function") window.switchTab("kanban");
        else document.getElementById("editorView").classList.add("hidden");
      }
      guard("saveFormSpec", "Apenas super_admin pode alterar a estrutura do formulario.");
      guard("renderEditor", "Apenas super_admin pode acessar o editor do formulario.");
      guard("setEditorSection", "Apenas super_admin pode editar secoes do formulario.");

      hide(".contract-delete-btn");
      guard("deleteContractRequest", "Apenas super_admin pode excluir solicitacoes de contrato.");
    }

    if (canManage) return;

    hide("button[data-tab='dashboard'], button[data-tab='report'], button[data-tab='import'], #dashboardView, #reportView, #importView");
    hide(".contract-card-observation, .contract-error-toggle, .contract-phase-selector-wrap, .contract-edit-btn, .detail-edit-actions, #clearData");
    disable(".contract-phase-select, .contract-card-observation textarea, .contract-error-toggle input");

    var blockedView = ["dashboardView", "reportView", "importView", "editorView"].some(function(id) {
      var view = document.getElementById(id);
      return view && !view.classList.contains("hidden");
    });
    if (blockedView) {
      if (typeof window.switchTab === "function") window.switchTab("kanban");
      else {
        ["dashboardView", "reportView", "importView", "editorView"].forEach(function(id) {
          var view = document.getElementById(id);
          if (view) view.classList.add("hidden");
        });
      }
    }

    guard("setReqStage", "Apenas administradores de contratos podem mudar fases.");
    guard("moveReq", "Apenas administradores de contratos podem mudar fases.");
    guard("startRequestEdit", "Apenas administradores de contratos podem editar solicitacoes.");
    guard("toggleContractRequestError", "Apenas administradores de contratos podem marcar erro na solicitacao.");
    guard("persistContractResponsibleObservation", "Apenas administradores de contratos podem registrar observacoes.");
    guard("queueContractObservationSave", "Apenas administradores de contratos podem registrar observacoes.");
    guard("bindLegacyImport", "Apenas administradores de contratos podem importar historico.");
  }

  function stockLogin() {
    if (moduleKey !== "estoque_obras" || stockLogged || typeof window.login !== "function") return;
    stockLogged = true;
    window.login(canManage ? "admin" : "requester");
  }

  function applyEstoqueRules() {
    stockLogin();
    hide("#loginPage, button[onclick='logout()']");
    if (canManage) return;
    hide("button[onclick*='config'], button[onclick*='estoque'], button[onclick*='kanban'], button[onclick*='agenda']");
    guard("quickQty", "Apenas super_admin ou almoxarife pode movimentar estoque.");
    guard("openItem", "Apenas super_admin ou almoxarife pode editar itens.");
    guard("changeStatus", "Apenas super_admin ou almoxarife pode alterar pedidos.");
    guard("deliverOrder", "Apenas super_admin ou almoxarife pode baixar pedidos.");
    guard("saveOrder", "Apenas super_admin ou almoxarife pode salvar pedidos.");
  }

  function applyAvaliacaoRules() {
    if (canManage) return;
    hide("button[data-page='admin'], button[data-page='dashboard'], button[data-page='historico'], #page-admin, #page-dashboard, #page-historico");
    var active = document.querySelector(".page.active");
    if (active && active.id !== "page-avaliacao") {
      if (typeof window.showPage === "function") window.showPage("avaliacao");
      else {
        document.querySelectorAll(".page").forEach(function(page) { page.classList.remove("active"); });
        var evaluation = document.getElementById("page-avaliacao");
        if (evaluation) evaluation.classList.add("active");
      }
    }
    guard("createCycle", "Apenas super_admin pode administrar ciclos.");
    guard("setSelectedCycleStatus", "Apenas super_admin pode administrar ciclos.");
    guard("deleteSelectedCycle", "Apenas super_admin pode excluir ciclos.");
    guard("importSheet", "Apenas super_admin pode importar fornecedores.");
    guard("importBothTables", "Apenas super_admin pode importar fornecedores.");
    guard("importBackup", "Apenas super_admin pode restaurar backups.");
    guard("clearAll", "Apenas super_admin pode apagar a base.");
  }

  function setSupplierMapReadOnlyModal() {
    hide("#deleteBtn, .modal-foot button[onclick='saveSupplier()']");
    disable("#supplierForm input, #supplierForm select, #supplierForm textarea");
    var title = document.getElementById("modalTitle");
    if (title && normalizeEmbeddedText(title.textContent).indexOf("editar") >= 0) {
      title.textContent = "Detalhes do fornecedor";
    }
  }

  function wrapSupplierMapModal() {
    if (typeof window.openSupplierModal !== "function" || window.openSupplierModal.__supplyReadonlyWrapped) return;
    var nativeOpenSupplierModal = window.openSupplierModal;
    window.openSupplierModal = function() {
      var result = nativeOpenSupplierModal.apply(this, arguments);
      window.setTimeout(setSupplierMapReadOnlyModal, 0);
      return result;
    };
    window.openSupplierModal.__supplyReadonlyWrapped = true;
  }

  function applyFornecedorMapRules() {
    hide(".sf-topbar, .sf-page-head");

    if (canManage) return;

    hide("button[data-view='import'], #view-import, .sf-header-action.primary, .sf-primary-action, button[onclick='openSupplierModal()']");
    document.querySelectorAll("button[onclick^=\\"openSupplierModal('\\"]").forEach(function(button) {
      button.textContent = "\\u2139";
      button.setAttribute("title", "Detalhes");
      button.setAttribute("aria-label", "Detalhes do fornecedor");
    });

    var importView = document.getElementById("view-import");
    if (importView && importView.classList.contains("active")) {
      if (typeof window.switchView === "function") window.switchView("suppliers");
      else importView.classList.remove("active");
    }

    wrapSupplierMapModal();
    setSupplierMapReadOnlyModal();
    guard("saveSupplier", "Apenas administradores de suprimentos podem salvar fornecedores.");
    guard("deleteCurrentSupplier", "Apenas administradores de suprimentos podem excluir fornecedores.");
    guard("handleImport", "Apenas administradores de suprimentos podem importar fornecedores.");
  }

  function applyFornecedorCadastroRules() {
    hide(".sf-topbar");

    if (!canManage) {
      hide("button[data-tab='dashboard'], button[data-tab='import'], button[data-tab='editor'], #view-dashboard, #view-import, #view-editor");
      hide("#btnDemo, #btnClearAll, #btnImportJson, #btnExportJson, .stage-actions, .supplier-phase-selector-wrap, .supplier-detail-phase-selector");
      hide(".modal-actions button[onclick*='moveStage'], .modal-actions button[onclick*='resetTimer'], .modal-actions button[onclick*='editDeadline'], .modal-actions button[onclick*='deleteItem']");
      hide(".responsible-actions, .attachment-item button");
      disable(".phase-select, .supplier-detail-phase-selector select, #responsibleNote, #responsibleFiles");
      document.querySelectorAll(".supplier-flow-card").forEach(function(card) {
        card.setAttribute("draggable", "false");
      });

      var activeBlocked = ["view-dashboard", "view-import", "view-editor"].some(function(id) {
        var view = document.getElementById(id);
        return view && !view.classList.contains("hidden");
      });
      if (activeBlocked) {
        if (typeof window.switchTab === "function") window.switchTab("kanban");
        else {
          ["view-dashboard", "view-import", "view-editor"].forEach(function(id) {
            var view = document.getElementById(id);
            if (view) view.classList.add("hidden");
          });
        }
      }

      guard("moveStage", "Apenas administradores de suprimentos podem mudar fases.");
      guard("changeSupplierPhase", "Apenas administradores de suprimentos podem mudar fases.");
      guard("resetTimer", "Apenas administradores de suprimentos podem alterar cronometros.");
      guard("editDeadline", "Apenas administradores de suprimentos podem alterar prazos.");
      guard("deleteItem", "Apenas administradores de suprimentos podem excluir cadastros.");
      guard("saveResponsibleNote", "Apenas administradores de suprimentos podem registrar observacoes internas.");
      guard("handleResponsibleFiles", "Apenas administradores de suprimentos podem anexar documentacao interna.");
      guard("removeResponsibleFile", "Apenas administradores de suprimentos podem remover anexos internos.");
      guard("supplierRunLegacyImport", "Apenas administradores de suprimentos podem importar base antiga.");
      guard("clearAll", "Apenas administradores de suprimentos podem limpar dados.");
    }

    if (!isSuperAdmin) {
      hide("button[data-tab='editor'], #view-editor");
      guard("saveSchema", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("addSection", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("addQuestion", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("applySection", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("deleteSection", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("removeQuestion", "Apenas super_admin pode editar a estrutura do formulario.");
    }
  }

  function applyCadastroMateriaisRules() {
    if (!isSuperAdmin) {
      hide("button[data-view='editor'], #view-editor");
      guard("saveCurrentEditorField", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("resetCurrentEditorField", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("deleteCurrentEditorField", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("resetAllEditorFields", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("saveProductsEditorV5", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("addProductFieldV7", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("deleteProductFieldV7", "Apenas super_admin pode editar a estrutura do formulario.");
    }

    if (canManage) return;

    hide("button[data-view='dashboard'], button[data-view='base'], button[data-view='editor'], #view-dashboard, #view-base, #view-editor");
    hide("button[onclick*='deleteRequest'], button[onclick*='editRequest'], .table-actions button:not([data-action='detail'])");
    disable(".phase-select");
    document.querySelectorAll(".nf-card").forEach(function(card) {
      card.setAttribute("draggable", "false");
    });

    var activeBlocked = ["view-dashboard", "view-base", "view-editor"].some(function(id) {
      var view = document.getElementById(id);
      return view && view.classList.contains("active");
    });
    if (activeBlocked) {
      if (typeof window.showView === "function") window.showView("kanban");
      else {
        ["view-dashboard", "view-base", "view-editor"].forEach(function(id) {
          var view = document.getElementById(id);
          if (view) view.classList.remove("active");
        });
      }
    }

    guard("changePhase", "Apenas administradores de suprimentos podem mudar fases.");
    guard("moveRelative", "Apenas administradores de suprimentos podem mudar fases.");
    guard("editRequest", "Apenas administradores de suprimentos podem editar solicitacoes.");
    guard("deleteRequest", "Apenas administradores de suprimentos podem excluir solicitacoes.");
    guard("exportCsv", "Apenas administradores de suprimentos podem exportar a base.");
  }

  function applyRules() {
    if (applying || !document.body) return;
    applying = true;
    try {
      document.body.classList.add("supply-embedded", "supply-embedded-" + moduleKey);
      document.body.dataset.supplyRole = ctx.role || "viewer";
      document.body.dataset.supplyCanManage = canManage ? "true" : "false";
      document.body.dataset.supplySupabase = window.SUPPLY_FLOW_SUPABASE_CONNECTED ? "connected" : "offline";

      if (moduleKey === "frota") applyFrotaRules();
      if (moduleKey === "contratos") applyContratosRules();
      if (moduleKey === "fretes") applyFretesRules();
      if (moduleKey === "nota_fiscal") applyNotaFiscalRules();
      if (moduleKey === "fornecedores") {
        if (document.getElementById("sfAppMap")) applyFornecedorMapRules();
        else applyFornecedorCadastroRules();
      }
      if (moduleKey === "estoque_obras") applyEstoqueRules();
      if (moduleKey === "cadastro_materiais") applyCadastroMateriaisRules();
      if (moduleKey === "avaliacao_fornecedores") applyAvaliacaoRules();
    } finally {
      applying = false;
    }
  }

  ready(function() {
    syncTheme();
    applyRules();
    var observer = new MutationObserver(function() { applyRules(); });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(syncInitialSharedStorage, 900);
    window.setInterval(syncTheme, 1000);
    window.setTimeout(applyRules, 250);
    window.setTimeout(applyRules, 900);
    window.setTimeout(applyRules, 1800);
  });
})();
<\/script>`}function fa({title:e,moduleKey:t,loadHtml:n,loadSupplierMapBase:r=!1}){let i=qe(),{session:a,profile:o,obras:s}=Sn(),c=`${t}:${a?.user.id||`anon`}:${r?`suppliers`:`base`}`,l=aa.get(c),u=(0,m.useRef)(null),d=(0,m.useRef)(null),[f,p]=(0,m.useState)(()=>l?.html??null),[h,g]=(0,m.useState)(()=>l?.sharedStorage??null),[_,v]=(0,m.useState)(()=>l?.supplierMapBase??null),[y,b]=(0,m.useState)(null),[x,S]=(0,m.useState)(0),[C,w]=(0,m.useState)(0),[T,E]=(0,m.useState)(void 0),ee=(0,m.useMemo)(()=>new URL(`/supply-flow-seel/`,window.location.origin).toString(),[]),te=(0,m.useMemo)(()=>({module:t,role:o?.role||`viewer`,canManage:Ln(o,t),user:{nome:o?.nome||``,email:o?.email||``},obras:s.map(e=>({id:e.id,nome:e.nome,codigo:e.codigo,centro_custo:e.centro_custo})),sharedStorage:h||{},supplierMapBase:_||[],integrations:{googleMapsApiKey:``},sync:{supabaseUrl:`https://cujospvzkulzdgzxyfyp.supabase.co`,supabaseAnonKey:`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1am9zcHZ6a3VsemRnenh5ZnlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MjUyODMsImV4cCI6MjA5NjIwMTI4M30.uKytO-xbHVDWbHOaGmELVjPiEQIRi5q6q8CdHU7k4nU`,accessToken:a?.access_token||``,contractFormStorageKey:ir,contractRequestsStorageKey:ar,freightStorageKey:Un,notaFiscalStorageKey:Kn,notaFiscalFormStorageKey:qn,supplierRegistrationStorageKey:sr,supplierMapStorageKey:dr,stockStateKey:er,evaluationDbKey:rr,materialRegistrationStorageKey:tr,materialRegistrationFormStorageKey:nr,sharedStateKeys:pr(t).filter(e=>e!==`gestao_fretes_solicitacoes_v1`&&e!==`seel_nf_simples_remessa_v1`&&e!==`seel_requests_google_forms_exato_v1`&&e!==`seel_fornecedores_items_v1`&&e!==`seel_cadastro_itens_v1`)}}),[t,s,o,a?.access_token,h,_]);(0,m.useEffect)(()=>{let e=!0,i=x>0,a=i?void 0:aa.get(c);if(a){let n=ca(t,a.sharedStorage);if(aa.set(c,{...a,sharedStorage:n}),p(a.html),g(n),v(a.supplierMapBase),b(null),!a.stale&&C===0)return()=>{e=!1}}return a||(p(null),g(null),v(null)),b(null),Promise.all([a?.html&&!i?Promise.resolve(a.html):n(),mr(t),r?Sr():Promise.resolve(null)]).then(([t,n,r])=>{if(!e)return;let i=Array.isArray(r)?r:a?.supplierMapBase||[];aa.set(c,{html:t,sharedStorage:n,supplierMapBase:i,stale:!1}),p(t),g(n),v(i)}).catch(()=>{e&&b(`Nao foi possivel carregar este modulo.`)}),()=>{e=!1}},[c,C,n,r,t,x]),(0,m.useEffect)(()=>{function e(e){let n=e.detail?.moduleKey;n&&n!==t||w(e=>e+1)}return window.addEventListener(oa,e),()=>window.removeEventListener(oa,e)},[t]),(0,m.useEffect)(()=>{function e(e){if(e.source!==u.current?.contentWindow)return;let t=e.data;if(!(!t||t.type!==`SEEL_OPEN_MODULE`||typeof t.module!=`string`)){try{sessionStorage.setItem(`supply-flow:${t.module}-draft`,JSON.stringify(t.payload??{}))}catch{}i(`/${t.module}`)}}return window.addEventListener(`message`,e),()=>window.removeEventListener(`message`,e)},[i]),(0,m.useEffect)(()=>{if(!f||!h||_===null){E(void 0),d.current=null;return}let e=`${c}:${x}`;d.current!==e&&(d.current=e,E(la(f,ee,te)))},[ee,c,te,f,x,h,_]),(0,m.useEffect)(()=>{T&&u.current?.contentWindow?.postMessage({type:`supply-flow:context-update`,context:te},window.location.origin)},[te,T]);let ne=(0,m.useMemo)(()=>{if(T)return T;if(!(!f||!h||_===null))return la(f,ee,te)},[ee,te,f,h,T,_]);return y?(0,j.jsxs)(`section`,{className:`state-panel`,children:[(0,j.jsx)(`h2`,{children:y}),(0,j.jsx)(`p`,{children:`O modulo nao foi derrubado; apenas a carga do asset falhou. Tente novamente sem precisar sair da tela.`}),(0,j.jsx)(`button`,{className:`secondary-button`,type:`button`,onClick:()=>{aa.delete(c),S(e=>e+1)},children:`Tentar novamente`})]}):ne?(0,j.jsx)(`div`,{className:`embedded-tool-page`,children:(0,j.jsx)(`iframe`,{ref:u,className:`embedded-tool-frame`,title:e,srcDoc:ne,onLoad:()=>u.current?.contentWindow?.postMessage({type:`supply-flow:context-update`,context:te},window.location.origin),sandbox:`allow-same-origin allow-scripts allow-forms allow-modals allow-downloads allow-popups allow-popups-to-escape-sandbox`})}):(0,j.jsx)(z,{label:`Carregando ${e}...`})}var pa=[`profiles`,`user_obras`,`obras`,`requisicoes`,`orcamentos`,`contratos`,`fornecedores`,`importacoes`,`embedded_app_state`,`fretes_solicitacoes`,`nf_simples_remessa_solicitacoes`,`estoque_obras_pedidos`,`cadastro_materiais_solicitacoes`,`avaliacao_fornecedores_avaliacoes`,`fornecedores_cadastros`],ma={profiles:{cacheKeys:[`profiles`]},user_obras:{cacheKeys:[`user_obras`,`obras`,`requisicoes`,`dashboard:summary`]},obras:{cacheKeys:[`obras`,`dashboard:summary`]},requisicoes:{cacheKeys:[`requisicoes`,`dashboard:summary`]},orcamentos:{cacheKeys:[`orcamentos`,`alertas:orcamentos`,`dashboard:summary`]},contratos:{cacheKeys:[`dashboard:summary`],modules:[`contratos`]},fornecedores:{cacheKeys:[`fornecedores`,`dashboard:summary`],modules:[`fornecedores`]},importacoes:{cacheKeys:[`importacoes`,`dashboard:summary`]},embedded_app_state:{cacheKeys:[`dashboard:summary`]},fretes_solicitacoes:{cacheKeys:[`dashboard:summary`],modules:[`fretes`]},nf_simples_remessa_solicitacoes:{cacheKeys:[`dashboard:summary`],modules:[`nota_fiscal`,`fretes`]},estoque_obras_pedidos:{cacheKeys:[`dashboard:summary`],modules:[`estoque_obras`,`fretes`]},cadastro_materiais_solicitacoes:{cacheKeys:[`dashboard:summary`],modules:[`cadastro_materiais`]},avaliacao_fornecedores_avaliacoes:{cacheKeys:[`dashboard:summary`],modules:[`avaliacao_fornecedores`]},fornecedores_cadastros:{cacheKeys:[`dashboard:summary`],modules:[`fornecedores`]}},ha=[`dashboard`,`alertas`,`requisicoes`,`orcamentos`,`contratos`,`fretes`,`nota_fiscal`,`estoque_obras`,`cadastro_materiais`,`frota`,`fornecedores`,`avaliacao_fornecedores`,`importacoes`,`usuarios`,`settings`];function ga({enabled:e,currentUserId:t,refreshProfile:n}){(0,m.useEffect)(()=>{let r=i;if(!e||!r)return;let a=!1,o,s=new Set,c=new Set;function l(){o&&window.clearTimeout(o),o=window.setTimeout(()=>{let e=Array.from(s),t=Array.from(c);s.clear(),c.clear(),e.length&&Tn(e,{clearCache:!0}),t.forEach(e=>sa(e,{notifyActive:!0}))},650)}function u(e,r){let i=_a(e,r);i.cacheKeys?.forEach(e=>s.add(e)),i.modules?.forEach(e=>c.add(e));let a=ya(r);(e===`profiles`||e===`user_obras`)&&t&&a===t&&n?.(),l()}let d=r.channel(`supply-flow-global-realtime`);return pa.forEach(e=>{d=d.on(`postgres_changes`,{event:`*`,schema:`public`,table:e},t=>{a||u(e,t)})}),d.subscribe(e=>{e===`CHANNEL_ERROR`&&console.warn(`Realtime do Supply Flow indisponivel. A aplicacao continua funcionando com atualizacao manual.`)}),()=>{a=!0,o&&window.clearTimeout(o),r.removeChannel(d)}},[t,e,n])}function _a(e,t){if(e!==`embedded_app_state`)return ma[e];let n=va(t);return{cacheKeys:n===`orcamentos`?[`dashboard:summary`,`orcamentos:form-spec`]:ma.embedded_app_state.cacheKeys,modules:n?[n]:void 0}}function va(e){let t=String(e.new?.module_key||e.old?.module_key||``);return ha.includes(t)?t:null}function ya(e){return String(e.new?.id||e.old?.id||e.new?.user_id||e.old?.user_id||``)}var ba=[{to:`/`,label:`Dashboard`,module:`dashboard`,icon:Wt},{to:`/alertas`,label:`Alertas`,module:`alertas`,icon:Vt},{to:`/requisicoes`,label:`Requisições`,module:`requisicoes`,icon:Gt},{to:`/orcamentos`,label:`Orçamentos`,module:`orcamentos`,icon:qt},{to:`/contratos`,label:`Contratos`,module:`contratos`,icon:Jt},{to:`/fretes`,label:`Fretes`,module:`fretes`,icon:dn},{to:`/nota-fiscal`,label:`NF Simples Remessa`,module:`nota_fiscal`,icon:rn},{to:`/estoque-obras`,label:`Estoque Obras`,module:`estoque_obras`,icon:nn},{to:`/cadastro-materiais`,label:`Cadastro Materiais`,module:`cadastro_materiais`,icon:nn},{to:`/frota`,label:`Frota`,module:`frota`,icon:Ut},{to:`/fornecedores`,label:`Fornecedores`,module:`fornecedores`,icon:$t},{to:`/cadastro-fornecedores`,label:`Cadastro Fornecedores`,module:`fornecedores`,icon:fn},{to:`/avaliacao-fornecedores`,label:`Avaliacao Fornecedores`,module:`avaliacao_fornecedores`,icon:cn},{to:`/importacoes`,label:`Importações`,module:`importacoes`,icon:Kt},{to:`/usuarios`,label:`Usuários`,module:`usuarios`,icon:pn},{to:`/settings`,label:`Configurações`,module:`settings`,icon:on}],xa={"/":`Dashboard`,"/alertas":`Central de Alertas`,"/requisicoes":`Requisições de Suprimentos`,"/orcamentos":`Solicitações de Orçamento`,"/contratos":`Contratos`,"/fretes":`Gestao de Fretes`,"/nota-fiscal":`NF de Simples Remessa`,"/estoque-obras":`Estoque de Obras`,"/cadastro-materiais":`Cadastro de Materiais`,"/frota":`Gestao de Frota`,"/fornecedores":`Mapa de Fornecedores`,"/cadastro-fornecedores":`Cadastro de Fornecedores`,"/avaliacao-fornecedores":`Avaliacao de Fornecedores`,"/importacoes":`Importações`,"/usuarios":`Gestão de Usuários`,"/settings":`Configurações`,"/alterar-senha":`Alterar Senha`},Sa={"/alertas":()=>a(()=>import(`./AlertasPage-DppFXIml.js`),__vite__mapDeps([0,1,2,3,4,5,6,7])),"/requisicoes":()=>a(()=>import(`./RequisicoesPage-Dl--twYp.js`),__vite__mapDeps([8,1,2,9,3,10,11,12,13,7])),"/orcamentos":()=>a(()=>import(`./OrcamentosPage-B0iz2HNn.js`),__vite__mapDeps([14,1,2,9,3,4,5,6,15,7,16])),"/contratos":()=>a(()=>import(`./ContratosPage-Q7ygJ3vX.js`),__vite__mapDeps([17,1])),"/fretes":()=>a(()=>import(`./FretesPage-DCN6s7ta.js`),__vite__mapDeps([18,1])),"/nota-fiscal":()=>a(()=>import(`./NotaFiscalPage-DmIvZo8_.js`),__vite__mapDeps([19,1])),"/estoque-obras":()=>a(()=>import(`./EstoqueObrasPage-DADk72_A.js`),__vite__mapDeps([20,1])),"/cadastro-materiais":()=>a(()=>import(`./CadastroMateriaisPage-XDc3jW4x.js`),__vite__mapDeps([21,1])),"/frota":()=>a(()=>import(`./FrotaPage-Pjc7xlF6.js`),__vite__mapDeps([22,1])),"/fornecedores":()=>a(()=>import(`./FornecedoresPage-HJv0MS8O.js`),__vite__mapDeps([23,1])),"/cadastro-fornecedores":()=>a(()=>import(`./CadastroFornecedoresPage-BQvDaIOm.js`),__vite__mapDeps([24,1])),"/avaliacao-fornecedores":()=>a(()=>import(`./AvaliacaoFornecedoresPage-FlQCUA86.js`),__vite__mapDeps([25,1])),"/importacoes":()=>a(()=>import(`./ImportacoesPage-DSkcCSQW.js`),__vite__mapDeps([26,1,2,10,5,16])),"/usuarios":()=>a(()=>import(`./UsuariosPage-JssWUxrQ.js`),__vite__mapDeps([27,1,2,10,11,12,7,16])),"/settings":()=>a(()=>import(`./SettingsPage-DTNQSFqB.js`),__vite__mapDeps([28,1,2,11,13,16]))},Ca=new Set;function wa(e){if(Ca.has(e))return;let t=Sa[e];t&&(Ca.add(e),t().catch(()=>Ca.delete(e)))}var Ta=new Map;function Ea(){let[e,t]=(0,m.useState)(!1),[n,r]=(0,m.useState)(()=>typeof window>`u`?`dark`:window.localStorage.getItem(`supply-flow:theme`)===`light`?`light`:`dark`),i=Ge(),{profile:a,obras:o,signOut:s,refreshProfile:c}=Sn(),l=(0,m.useMemo)(()=>ba.filter(e=>In(a,e.module)),[a]);return ga({enabled:!!a?.ativo,currentUserId:a?.id,refreshProfile:c}),(0,m.useEffect)(()=>{document.documentElement.dataset.theme=n,window.localStorage.setItem(`supply-flow:theme`,n)},[n]),(0,m.useLayoutEffect)(()=>{let e=i.pathname,t=Ta.get(e);return t&&window.requestAnimationFrame(()=>{window.scrollTo({left:t.x,top:t.y,behavior:`auto`}),window.requestAnimationFrame(()=>window.scrollTo({left:t.x,top:t.y,behavior:`auto`}))}),()=>{Ta.set(e,{x:window.scrollX,y:window.scrollY})}},[i.pathname]),(0,j.jsxs)(`div`,{className:`app-shell`,children:[(0,j.jsxs)(`aside`,{className:`sidebar ${e?`sidebar--open`:``}`,children:[(0,j.jsxs)(`div`,{className:`brand`,children:[(0,j.jsx)(`img`,{src:`/logo-seel.png`,alt:`Seel`}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`strong`,{children:`Supply Flow`}),(0,j.jsx)(`span`,{children:`Seel`})]}),(0,j.jsx)(`button`,{className:`icon-button sidebar-close`,type:`button`,onClick:()=>t(!1),"aria-label":`Fechar menu`,children:(0,j.jsx)(mn,{size:18})})]}),(0,j.jsx)(`nav`,{className:`sidebar-nav`,"aria-label":`Menu principal`,children:l.map(e=>{let n=e.icon;return(0,j.jsxs)(Ft,{to:e.to,end:e.to===`/`,onClick:()=>t(!1),onFocus:()=>wa(e.to),onMouseEnter:()=>wa(e.to),onPointerDown:()=>wa(e.to),className:({isActive:e})=>e?`active`:``,children:[(0,j.jsx)(n,{size:18}),(0,j.jsx)(`span`,{children:e.label})]},e.to)})}),(0,j.jsx)(`div`,{className:`sidebar-footer`,children:(0,j.jsxs)(`div`,{className:`obra-chip`,children:[(0,j.jsx)(Ht,{size:16}),(0,j.jsx)(`span`,{children:Da(a?.role,o.length)})]})})]}),e?(0,j.jsx)(`button`,{className:`sidebar-backdrop`,"aria-label":`Fechar menu`,onClick:()=>t(!1)}):null,(0,j.jsxs)(`div`,{className:`main-shell`,children:[(0,j.jsxs)(`header`,{className:`topbar`,children:[(0,j.jsx)(`button`,{className:`icon-button mobile-menu`,type:`button`,onClick:()=>t(!0),"aria-label":`Abrir menu`,children:(0,j.jsx)(en,{size:20})}),(0,j.jsxs)(`div`,{children:[(0,j.jsxs)(`div`,{className:`breadcrumb`,children:[`Supply Flow / `,xa[i.pathname]||`Área`]}),(0,j.jsx)(`h1`,{children:xa[i.pathname]||`Supply Flow`})]}),(0,j.jsxs)(`div`,{className:`profile-area`,children:[(0,j.jsx)($i,{}),(0,j.jsx)(`button`,{className:`icon-button`,type:`button`,onClick:()=>r(e=>e===`dark`?`light`:`dark`),"aria-label":n===`dark`?`Usar tema claro`:`Usar tema escuro`,title:n===`dark`?`Tema claro`:`Tema escuro`,children:n===`dark`?(0,j.jsx)(ln,{size:18}):(0,j.jsx)(tn,{size:18})}),(0,j.jsxs)(`div`,{className:`role-pill`,children:[(0,j.jsx)(sn,{size:16}),Rn(a?.role)]}),(0,j.jsxs)(`div`,{className:`profile-name`,children:[(0,j.jsx)(`strong`,{children:a?.nome||`Usuário`}),(0,j.jsx)(`span`,{children:a?.email})]}),(0,j.jsx)(Ft,{className:`icon-button`,to:`/alterar-senha`,"aria-label":`Alterar senha`,title:`Alterar senha`,children:(0,j.jsx)(Yt,{size:18})}),(0,j.jsx)(`button`,{className:`icon-button`,type:`button`,onClick:s,"aria-label":`Sair`,children:(0,j.jsx)(A,{size:18})})]})]}),(0,j.jsx)(`main`,{className:`content`,children:(0,j.jsx)(vt,{})})]})]})}function Da(e,t){return e===`viewer`?`${t} obra(s)`:e===`viewer_global`?`Todas as obras`:`Escopo administrativo`}function B({module:e,children:t}){let{configured:n,error:r,loading:i,session:a,profile:o,obras:s,recoveryMode:c,refreshProfile:l,signOut:u}=Sn(),d=Ge();return n?i?(0,j.jsx)(R,{title:`Carregando sessao`,description:`Validando usuario e permissoes.`}):r?(0,j.jsx)(R,{title:`Falha ao validar acesso`,description:r,action:{label:`Tentar novamente`,onClick:()=>void l()},secondaryAction:{label:`Sair`,onClick:()=>void u()}}):a?o?o.ativo?(o.must_change_password||c)&&d.pathname!==`/alterar-senha`?(0,j.jsx)(_t,{to:`/alterar-senha`,replace:!0,state:{from:d}}):e&&!In(o,e)?(0,j.jsx)(R,{title:`Sem permissao`,description:`Seu perfil nao tem acesso a esta area.`}):o.role===`viewer`&&!s.length&&(e===`requisicoes`||e===`contratos`)?(0,j.jsx)(R,{title:`Nenhuma obra vinculada`,description:`Seu usuario comum precisa estar vinculado a pelo menos uma obra para visualizar dados.`}):(0,j.jsx)(j.Fragment,{children:t}):(0,j.jsx)(R,{title:`Usuario inativo`,description:`Seu acesso foi desativado. Procure um administrador.`,action:{label:`Sair`,onClick:()=>void u()}}):(0,j.jsx)(R,{title:`Perfil nao encontrado`,description:`O usuario esta autenticado, mas ainda nao possui registro em profiles. Tente novamente ou saia e procure um administrador.`,action:{label:`Tentar novamente`,onClick:()=>void l()},secondaryAction:{label:`Sair`,onClick:()=>void u()}}):(0,j.jsx)(_t,{to:`/login`,replace:!0,state:{from:d}}):(0,j.jsx)(R,{title:`Supabase nao configurado`,description:`Preencha as variaveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para ativar login, banco e RLS.`})}function V(){let{configured:e,session:t,signIn:n,requestPasswordReset:r}=Sn(),i=Ge(),[a,o]=(0,m.useState)(`login`),[s,c]=(0,m.useState)(``),[l,u]=(0,m.useState)(``),[d,f]=(0,m.useState)(``),[p,h]=(0,m.useState)(!1),[g,_]=(0,m.useState)(!1);if(t)return(0,j.jsx)(_t,{to:i.state?.from?.pathname||`/`,replace:!0});if(!e)return(0,j.jsx)(`div`,{className:`login-page`,children:(0,j.jsx)(R,{title:`Configuração pendente`,description:`Crie um arquivo .env a partir de .env.example e informe as chaves públicas do Supabase.`})});async function v(e){e.preventDefault(),h(!0),f(``);try{await n(s,l)}catch(e){f(e instanceof Error?e.message:`Não foi possível entrar.`)}finally{h(!1)}}async function y(e){e.preventDefault(),h(!0),f(``);try{await r(s)}catch(e){console.warn(`Falha ao solicitar recuperacao de senha.`,e)}finally{_(!0),h(!1)}}function b(){o(`login`),f(``),_(!1)}return(0,j.jsx)(`div`,{className:`login-page`,children:(0,j.jsxs)(`section`,{className:`login-card`,children:[(0,j.jsxs)(`div`,{className:`login-brand`,children:[(0,j.jsx)(`img`,{src:`/logo-seel.png`,alt:`Seel`}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`span`,{children:`Supply Flow Seel`}),(0,j.jsx)(`h1`,{children:`Acesso corporativo`})]})]}),a===`login`?(0,j.jsxs)(`form`,{onSubmit:v,children:[(0,j.jsxs)(`label`,{children:[`E-mail`,(0,j.jsx)(`input`,{value:s,onChange:e=>c(e.target.value),type:`email`,autoComplete:`email`,required:!0})]}),(0,j.jsxs)(`label`,{children:[`Senha`,(0,j.jsx)(`input`,{value:l,onChange:e=>u(e.target.value),type:`password`,autoComplete:`current-password`,required:!0})]}),d?(0,j.jsx)(`div`,{className:`form-error`,children:d}):null,(0,j.jsxs)(`button`,{className:`primary-button`,type:`submit`,disabled:p,children:[(0,j.jsx)(Zt,{size:18}),p?`Entrando...`:`Entrar`]}),(0,j.jsx)(`button`,{type:`button`,className:`login-forgot-link`,onClick:()=>o(`forgot`),children:`Esqueceu sua senha?`})]}):g?(0,j.jsxs)(`div`,{className:`login-forgot-confirm`,children:[(0,j.jsxs)(`p`,{children:[`Se o e-mail `,(0,j.jsx)(`strong`,{children:s}),` estiver cadastrado, enviamos um link para redefinir a senha. Verifique tambem a caixa de spam.`]}),(0,j.jsx)(`button`,{type:`button`,className:`secondary-button`,onClick:b,children:`Voltar ao login`})]}):(0,j.jsxs)(`form`,{onSubmit:y,children:[(0,j.jsxs)(`label`,{children:[`E-mail cadastrado`,(0,j.jsx)(`input`,{value:s,onChange:e=>c(e.target.value),type:`email`,autoComplete:`email`,required:!0})]}),(0,j.jsxs)(`button`,{className:`primary-button`,type:`submit`,disabled:p,children:[(0,j.jsx)(Qt,{size:18}),p?`Enviando...`:`Enviar link de recuperacao`]}),(0,j.jsx)(`button`,{type:`button`,className:`login-forgot-link`,onClick:b,children:`Voltar ao login`})]})]})})}var Oa=(0,m.lazy)(()=>a(()=>import(`./ChangePasswordPage-BUtgboHN.js`).then(e=>({default:e.ChangePasswordPage})),__vite__mapDeps([29,1]))),ka=(0,m.lazy)(()=>a(()=>import(`./AlertasPage-DppFXIml.js`).then(e=>({default:e.AlertasPage})),__vite__mapDeps([0,1,2,3,4,5,6,7]))),Aa=(0,m.lazy)(()=>a(()=>import(`./DashboardPage-J7EI9Qu7.js`).then(e=>({default:e.DashboardPage})),__vite__mapDeps([30,1,3,5,6,15]))),ja=(0,m.lazy)(()=>a(()=>import(`./RequisicoesPage-Dl--twYp.js`).then(e=>({default:e.RequisicoesPage})),__vite__mapDeps([8,1,2,9,3,10,11,12,13,7]))),Ma=(0,m.lazy)(()=>a(()=>import(`./OrcamentosPage-B0iz2HNn.js`).then(e=>({default:e.OrcamentosPage})),__vite__mapDeps([14,1,2,9,3,4,5,6,15,7,16]))),Na=(0,m.lazy)(()=>a(()=>import(`./ContratosPage-Q7ygJ3vX.js`).then(e=>({default:e.ContratosPage})),__vite__mapDeps([17,1]))),Pa=(0,m.lazy)(()=>a(()=>import(`./FretesPage-DCN6s7ta.js`).then(e=>({default:e.FretesPage})),__vite__mapDeps([18,1]))),Fa=(0,m.lazy)(()=>a(()=>import(`./NotaFiscalPage-DmIvZo8_.js`).then(e=>({default:e.NotaFiscalPage})),__vite__mapDeps([19,1]))),Ia=(0,m.lazy)(()=>a(()=>import(`./EstoqueObrasPage-DADk72_A.js`).then(e=>({default:e.EstoqueObrasPage})),__vite__mapDeps([20,1]))),La=(0,m.lazy)(()=>a(()=>import(`./CadastroMateriaisPage-XDc3jW4x.js`).then(e=>({default:e.CadastroMateriaisPage})),__vite__mapDeps([21,1]))),Ra=(0,m.lazy)(()=>a(()=>import(`./FrotaPage-Pjc7xlF6.js`).then(e=>({default:e.FrotaPage})),__vite__mapDeps([22,1]))),za=(0,m.lazy)(()=>a(()=>import(`./FornecedoresPage-HJv0MS8O.js`).then(e=>({default:e.FornecedoresPage})),__vite__mapDeps([23,1]))),Ba=(0,m.lazy)(()=>a(()=>import(`./CadastroFornecedoresPage-BQvDaIOm.js`).then(e=>({default:e.CadastroFornecedoresPage})),__vite__mapDeps([24,1]))),Va=(0,m.lazy)(()=>a(()=>import(`./AvaliacaoFornecedoresPage-FlQCUA86.js`).then(e=>({default:e.AvaliacaoFornecedoresPage})),__vite__mapDeps([25,1]))),Ha=(0,m.lazy)(()=>a(()=>import(`./ImportacoesPage-DSkcCSQW.js`).then(e=>({default:e.ImportacoesPage})),__vite__mapDeps([26,1,2,10,5,16]))),Ua=(0,m.lazy)(()=>a(()=>import(`./UsuariosPage-JssWUxrQ.js`).then(e=>({default:e.UsuariosPage})),__vite__mapDeps([27,1,2,10,11,12,7,16]))),Wa=(0,m.lazy)(()=>a(()=>import(`./SettingsPage-DTNQSFqB.js`).then(e=>({default:e.SettingsPage})),__vite__mapDeps([28,1,2,11,13,16])));function Ga(){return(0,j.jsx)(hn,{resetKey:Ge().pathname,children:(0,j.jsx)(m.Suspense,{fallback:(0,j.jsx)(z,{label:`Carregando modulo`}),children:(0,j.jsxs)(bt,{children:[(0,j.jsx)(O,{path:`/login`,element:(0,j.jsx)(V,{})}),(0,j.jsxs)(O,{element:(0,j.jsx)(B,{children:(0,j.jsx)(Ea,{})}),children:[(0,j.jsx)(O,{path:`alterar-senha`,element:(0,j.jsx)(B,{children:(0,j.jsx)(Oa,{})})}),(0,j.jsx)(O,{index:!0,element:(0,j.jsx)(B,{module:`dashboard`,children:(0,j.jsx)(Aa,{})})}),(0,j.jsx)(O,{path:`alertas`,element:(0,j.jsx)(B,{module:`alertas`,children:(0,j.jsx)(ka,{})})}),(0,j.jsx)(O,{path:`requisicoes`,element:(0,j.jsx)(B,{module:`requisicoes`,children:(0,j.jsx)(ja,{})})}),(0,j.jsx)(O,{path:`orcamentos`,element:(0,j.jsx)(B,{module:`orcamentos`,children:(0,j.jsx)(Ma,{})})}),(0,j.jsx)(O,{path:`contratos`,element:(0,j.jsx)(B,{module:`contratos`,children:(0,j.jsx)(Na,{})})}),(0,j.jsx)(O,{path:`fretes`,element:(0,j.jsx)(B,{module:`fretes`,children:(0,j.jsx)(Pa,{})})}),(0,j.jsx)(O,{path:`nota-fiscal`,element:(0,j.jsx)(B,{module:`nota_fiscal`,children:(0,j.jsx)(Fa,{})})}),(0,j.jsx)(O,{path:`estoque-obras`,element:(0,j.jsx)(B,{module:`estoque_obras`,children:(0,j.jsx)(Ia,{})})}),(0,j.jsx)(O,{path:`cadastro-materiais`,element:(0,j.jsx)(B,{module:`cadastro_materiais`,children:(0,j.jsx)(La,{})})}),(0,j.jsx)(O,{path:`frota`,element:(0,j.jsx)(B,{module:`frota`,children:(0,j.jsx)(Ra,{})})}),(0,j.jsx)(O,{path:`fornecedores`,element:(0,j.jsx)(B,{module:`fornecedores`,children:(0,j.jsx)(za,{})})}),(0,j.jsx)(O,{path:`cadastro-fornecedores`,element:(0,j.jsx)(B,{module:`fornecedores`,children:(0,j.jsx)(Ba,{})})}),(0,j.jsx)(O,{path:`avaliacao-fornecedores`,element:(0,j.jsx)(B,{module:`avaliacao_fornecedores`,children:(0,j.jsx)(Va,{})})}),(0,j.jsx)(O,{path:`importacoes`,element:(0,j.jsx)(B,{module:`importacoes`,children:(0,j.jsx)(Ha,{})})}),(0,j.jsx)(O,{path:`usuarios`,element:(0,j.jsx)(B,{module:`usuarios`,children:(0,j.jsx)(Ua,{})})}),(0,j.jsx)(O,{path:`settings`,element:(0,j.jsx)(B,{module:`settings`,children:(0,j.jsx)(Wa,{})})})]}),(0,j.jsx)(O,{path:`*`,element:(0,j.jsx)(R,{title:`Pagina nao encontrada`})})]})})})}var Ka=`/supply-flow-seel/`,qa=Ka.replace(/\/$/,``);h.createRoot(document.getElementById(`root`)).render((0,j.jsx)(m.StrictMode,{children:(0,j.jsx)(jt,{basename:qa,children:(0,j.jsx)(xn,{children:(0,j.jsx)(Ga,{})})})})),`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`${Ka}sw.js`,{scope:Ka}).catch(()=>void 0)});export{Un as $,ui as A,Gt as At,ei as B,ji as C,an as Ct,Si as D,Jt as Dt,yi as E,Yt as Et,bi as F,qe as Ft,Hr as G,si as H,ci as I,Gr as J,Wr as K,ri as L,xi as M,Ut as Mt,mi as N,Vt as Nt,di as O,qt as Ot,hi as P,Pt,er as Q,ni as R,wi as S,sn as St,Bi as T,Qt as Tt,ai as U,ii as V,Ur as W,Kr as X,Vr as Y,rr as Z,Fi as _,mn as _t,Ri as a,wr as at,zi as b,un as bt,Vi as c,Fn as ct,Pi as d,Rn as dt,Yn as et,Ni as f,zn as ft,ki as g,Sn as gt,Oi as h,An as ht,z as i,mr as it,vi as j,Wt as jt,pi as k,Kt as kt,Ei as l,Pn as lt,Ti as m,En as mt,sa as n,or as nt,Li as o,Ln as ot,Mi as p,Tn as pt,Br as q,R as r,Cr as rt,Hi as s,In as st,fa as t,Jn as tt,Di as u,Nn as ut,Ii as v,pn as vt,Ui as w,$t as wt,Ci as x,cn as xt,Ai as y,dn as yt,ti as z};