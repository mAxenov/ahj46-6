!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);const r={x:0,y:0,set:e=>{const t=e.getBoundingClientRect();r.x=t.x+window.scrollX,r.y=t.y+window.scrollY}},o={shiftX:0,shiftY:0,set:(e,t,n)=>{o.shiftX=e-n.getBoundingClientRect().left,o.shiftY=t-n.getBoundingClientRect().top}};function i(){let e,t,n=null,i=!1;const s=()=>{document.querySelectorAll(".cards").forEach(e=>{if(null===e.querySelector(".cards__item.emptySectionHiddenLesson")){const t=document.createElement("div");t.classList.add("cards__item","emptySectionHiddenLesson"),e.append(t)}else{const t=e.querySelector(".emptySectionHiddenLesson");t&&e.removeChild(t)}})},d=s=>{var d,l,c;i||(i=!0,e=document.createElement("div"),e.classList.add("placeholder"),e.style.height=t.clientHeight+"px",t.parentNode.insertBefore(e,t),Object.assign(t.style,{position:"absolute",zIndex:1e3,left:r.x+"px",top:r.y+"px"})),d=t,l=s.pageX,c=s.pageY,d.style.transform=`translate(${l-r.x-o.shiftX}px, ${c-r.y-o.shiftY}px) rotate(1deg)`;const a=((e,t)=>{const n=((e,t)=>{const n=e.getBoundingClientRect();return{top:"by-center"===t?n.top+n.height/2:n.top+10,left:n.left+n.width/2}})(e,t);e.hidden=!0;const r=document.elementFromPoint(n.left,n.top);return e.hidden=!1,r})(t,"by-center");if(!a)return;const u=a.closest(".cards__item");n!==u&&(n=u,n&&(!((e,t)=>{const n=e.getBoundingClientRect(),r=t.getBoundingClientRect();return n.top+n.height/2<r.top+r.height/2})(t,n)||n.classList.contains("emptySectionHiddenLesson")?n.parentNode.insertBefore(e,n):n.parentNode.insertBefore(e,n.nextElementSibling)))},l=()=>{if(!i)return document.removeEventListener("mousemove",d),void(t.onmouseup=null);e.parentNode.insertBefore(t,e),Object.assign(t.style,{position:"relative",left:"auto",top:"auto",zIndex:"auto",transform:"none"}),document.removeEventListener("mousemove",d),i=!1,e&&e.parentNode.removeChild(e),t.onmouseup=null,t=null,s()},c=e=>{e.target.classList.contains("close")||e.target.classList.contains("cards__item-delete")||((e=>{t=e.target})(e),s(),o.set(e.clientX,e.clientY,t),r.set(t),document.addEventListener("mousemove",d),t.onmouseup=l)};(()=>{for(const e of document.querySelectorAll(".cards__item"))e.onmousedown=c,e.ondragstart=()=>!1})()}new class{constructor(){this.cardsAdd=document.querySelectorAll(".cards__add"),this.boards=document.querySelector(".boards"),this.textAreaValue="",this.onListItemClick=this.onListItemClick.bind(this),this.onCloseFormClick=this.onCloseFormClick.bind(this),this.onAddCardClick=this.onAddCardClick.bind(this),this.cardsAddClick=this.cardsAddClick.bind(this),this.onShowFormClick=this.onShowFormClick.bind(this),this.onTextAreaInput=this.onTextAreaInput.bind(this),this.cardsAddClick(),this.boards.addEventListener("mouseover",this.onListItemClick)}cardsAddClick(){this.cardsAdd.forEach(e=>e.addEventListener("click",this.onShowFormClick)),this.textAreaValue=""}onShowFormClick(e){e.target.classList.add("active"),this.getParentItem(e).querySelector(".form").hidden=!1,this.showBtnAdd(this.getParentItem(e).querySelector(".add__item-btn"),this.textAreaValue),this.getParentItem(e).querySelector(".form__textarea").value="",this.getParentItem(e).querySelector(".cancel__item-btn").addEventListener("click",this.onCloseFormClick),this.getParentItem(e).querySelector(".add__item-btn").addEventListener("click",this.onAddCardClick),this.getParentItem(e).querySelector(".form__textarea").addEventListener("input",this.onTextAreaInput)}onAddCardClick(e){const t=document.createElement("div"),n=document.createElement("p");t.classList.add("cards__item"),t.draggable=!0,n.textContent=this.textAreaValue;const r=document.createElement("div"),o=document.createElement("div");r.classList.add("cards__item-delete"),o.classList.add("close"),r.appendChild(o),t.appendChild(r),t.appendChild(n),this.getParentItem(e).querySelector(".cards").appendChild(t),i(),this.onCloseFormClick(e)}onCloseFormClick(e){this.textAreaValue="",this.getParentItem(e).querySelector(".cards__add").classList.remove("active"),this.getParentItem(e).querySelector(".form").hidden=!0,this.getParentItem(e).querySelector(".cancel__item-btn").removeEventListener("click",this.onCloseFormClick),this.getParentItem(e).querySelector(".add__item-btn").removeEventListener("click",this.onAddCardClick),this.getParentItem(e).querySelector(".form__textarea").removeEventListener("input",this.onTextAreaInput)}onTextAreaInput(e){this.textAreaValue=e.target.value,this.showBtnAdd(this.getParentItem(e).querySelector(".add__item-btn"),this.textAreaValue)}showBtnAdd(e,t){t?(e.disabled=!1,e.style.opacity=1):(e.disabled=!0,e.style.opacity=.5)}getParentItem(e){return e.target.closest(".boards__item")}onListItemClick(e){const t=e.target.closest(".cards__item");if(null===t)return;const n=t.querySelector(".cards__item-delete");null!==n&&"none"===getComputedStyle(n).display&&(n.style.display="block",n.addEventListener("click",e=>{e.stopPropagation();e.target.closest(".cards__item").remove()}),t.addEventListener("mouseleave",e=>{const t=e.target.closest(".cards__item");if(null===t)return;null!==t.querySelector(".cards__item-delete")&&(n.style.display="none")}))}};i()}]);
//# sourceMappingURL=main.js.map