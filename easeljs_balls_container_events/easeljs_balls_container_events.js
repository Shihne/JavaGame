var mylib=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);r.d(t,"init",function(){return n}),console.log(10+10);new class{constructor(e,t){this.x=e,this.y=t}}(10,20);function n(){console.info("page loaded!!!!!");var e=new createjs.Stage("game"),t=new createjs.SpriteSheet({images:["earth_and_explosion.png"],frames:{width:100,height:100,regX:50,regY:50},animations:{rotate:[0,47,"rotate"],explode:[48,83,null]},framerate:20}),r=400,n=280,o=50,a=new createjs.Container,i=new createjs.Shape;function d(e){var t=e.target;t.x+=t.dx,t.y+=t.dy,(t.x>r-o||t.x<o)&&(t.dx*=-1),(t.y>n-o||t.y<o)&&(t.dy*=-1)}function c(e){var t=e.target;t.expolded||(t.gotoAndPlay("explode"),t.dx=0,t.dy=0,t.expolded=!0,t.addEventListener("animationend",function(){a.removeChild(t)}))}i.graphics.beginStroke("blue").beginFill("#EEE").drawRect(0,0,r,n),e.addChild(a),a.addChild(i),a.addEventListener("click",function(e){if(e.target===i){var l=2*Math.random()*Math.PI;!function(e,i,l,u){if(!(e>r-o||e<o||i>n-o||i<o)){var s=new createjs.Sprite(t);s.gotoAndPlay("rotate"),a.addChild(s),s.x=e,s.y=i,s.dx=l,s.dy=u,s.exploded=!1,s.addEventListener("tick",d),s.addEventListener("click",c)}}(e.localX,e.localY,Math.cos(l),Math.sin(l))}}),a.x=100,a.y=100,createjs.Ticker.addEventListener("tick",e),createjs.Ticker.framerate=60,createjs.Ticker.timerMode=createjs.Ticker.RAF_SYNCHED}}]);