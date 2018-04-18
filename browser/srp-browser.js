!function(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.srplib=r():t.srplib=r()}(window,function(){return function(t){var r={};function o(i){if(r[i])return r[i].exports;var e=r[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,o),e.l=!0,e.exports}return o.m=t,o.c=r,o.d=function(t,r,i){o.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:i})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(r,"a",r),r},o.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},o.p="",o(o.s="./client.js")}({"./browser/sha256.js":
/*!***************************!*\
  !*** ./browser/sha256.js ***!
  \***************************/
/*! no static exports found */function(t,r,o){"use strict";const i=o(/*! array-buffer-to-hex */"./node_modules/_array-buffer-to-hex@1.0.0@array-buffer-to-hex/index.js"),e=o(/*! encode-utf8 */"./node_modules/_encode-utf8@1.0.1@encode-utf8/index.js"),s=o(/*! hex-to-array-buffer */"./node_modules/_hex-to-array-buffer@1.1.0@hex-to-array-buffer/index.js"),n=o(/*! crypto-digest-sync/sha256 */"./node_modules/_crypto-digest-sync@1.0.0@crypto-digest-sync/sha256.js"),h=o(/*! ../lib/srp-integer */"./lib/srp-integer.js");t.exports=function(...t){const r=function(t){const r=t.reduce((t,r)=>t+r.byteLength,0),o=new Uint8Array(r);return t.reduce((t,r)=>(o.set(new Uint8Array(r),t),t+r.byteLength),0),o.buffer}(t.map(t=>{if(t instanceof h)return s(t.toHex());if("string"==typeof t)return e(t);throw new TypeError("Expected string or SRPInteger")}));return h.fromHex(i(n(r)))}},"./client.js":
/*!*******************!*\
  !*** ./client.js ***!
  \*******************/
/*! no static exports found */function(t,r,o){"use strict";const i=o(/*! ./lib/params */"./lib/params.js"),e=o(/*! ./lib/srp-integer */"./lib/srp-integer.js");r.generateSalt=function(){return e.randomInteger(i.hashOutputBytes).toHex()},r.derivePrivateKey=function(t,r,o){const{H:s}=i;return s(e.fromHex(t),s(`${String(r)}:${String(o)}`)).toHex()},r.deriveVerifier=function(t){const{N:r,g:o}=i,s=e.fromHex(t);return o.modPow(s,r).toHex()},r.generateEphemeral=function(){const{N:t,g:r}=i,o=e.randomInteger(i.hashOutputBytes),s=r.modPow(o,t);return{secret:o.toHex(),ephemeral:s.toHex()}},r.deriveSession=function(t,r,o,s,n,h){const{N:u,g:f,k:a,H:p}=i,c=e.fromHex(t),l=e.fromHex(r),m=e.fromHex(o),d=String(s),y=e.fromHex(n),v=f.modPow(c,u);if(l.mod(u).equals(e.ZERO))return void h(new Error("The server sent an invalid public ephemeral"));const T=p(v,l),g=p(l.subtract(a.multiply(f.modPow(y,u))).modPow(c.add(T.multiply(y)),u)),b=p(p(u).xor(p(f)),p(d),m,v,l,g);h(null,{key:g.toHex(),proof:b.toHex()})},r.verifySession=function(t,r,o,s){const{H:n}=i,h=n(e.fromHex(t),e.fromHex(r.proof),e.fromHex(r.key));e.fromHex(o).equals(h)?s(null):s(new Error("Server provided session proof is invalid"))}},"./lib/params.js":
/*!***********************!*\
  !*** ./lib/params.js ***!
  \***********************/
/*! no static exports found */function(t,r,o){"use strict";const i=o(/*! ./sha256 */"./browser/sha256.js"),e=o(/*! ./srp-integer */"./lib/srp-integer.js"),s={largeSafePrime:"\n    AC6BDB41 324A9A9B F166DE5E 1389582F AF72B665 1987EE07 FC319294\n    3DB56050 A37329CB B4A099ED 8193E075 7767A13D D52312AB 4B03310D\n    CD7F48A9 DA04FD50 E8083969 EDB767B0 CF609517 9A163AB3 661A05FB\n    D5FAAAE8 2918A996 2F0B93B8 55F97993 EC975EEA A80D740A DBF4FF74\n    7359D041 D5C33EA7 1D281E44 6B14773B CA97B43A 23FB8016 76BD207A\n    436C6481 F1D2B907 8717461A 5B9D32E6 88F87748 544523B5 24B0D57D\n    5EA77A27 75D2ECFA 032CFBDB F52FB378 61602790 04E57AE6 AF874E73\n    03CE5329 9CCC041C 7BC308D8 2A5698F3 A8D0C382 71AE35F8 E9DBFBB6\n    94B5C803 D89F7AE4 35DE236D 525F5475 9B65E372 FCD68EF2 0FA7111F\n    9E4AFF73\n  ",generatorModulo:"02",hashFunction:"sha256",hashOutputBytes:32};r.N=e.fromHex(s.largeSafePrime.replace(/\s+/g,"")),r.g=e.fromHex(s.generatorModulo.replace(/\s+/g,"")),r.k=i(r.N,r.g),r.H=i,r.hashOutputBytes=s.hashOutputBytes},"./lib/srp-integer.js":
/*!****************************!*\
  !*** ./lib/srp-integer.js ***!
  \****************************/
/*! no static exports found */function(t,r,o){"use strict";const i=o(/*! pad-start */"./node_modules/_pad-start@1.0.2@pad-start/index.js"),e=o(/*! crypto-random-hex */"./node_modules/_crypto-random-hex@1.0.0@crypto-random-hex/browser.js"),{BigInteger:s}=o(/*! jsbn */"./node_modules/_jsbn@1.1.0@jsbn/index.js"),n=Symbol("big-integer"),h=Symbol("hex-length");class u{constructor(t,r){this[n]=t,this[h]=r}add(t){return new u(this[n].add(t[n]),null)}equals(t){return this[n].equals(t[n])}multiply(t){return new u(this[n].multiply(t[n]),null)}modPow(t,r){return new u(this[n].modPow(t[n],r[n]),r[h])}mod(t){return new u(this[n].mod(t[n]),t[h])}subtract(t){return new u(this[n].subtract(t[n]),this[h])}xor(t){return new u(this[n].xor(t[n]),this[h])}inspect(){const t=this[n].toString(16);return`<SRPInteger ${t.slice(0,16)}${t.length>16?"...":""}>`}toHex(){if(null===this[h])throw new Error("This SRPInteger has no specified length");return i(this[n].toString(16),this[h],"0")}}u.fromHex=function(t){return new u(new s(t,16),t.length)},u.randomInteger=function(t){return u.fromHex(e(t))},u.ZERO=new u(new s("0"),null),t.exports=u},"./node_modules/_array-buffer-to-hex@1.0.0@array-buffer-to-hex/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/_array-buffer-to-hex@1.0.0@array-buffer-to-hex/index.js ***!
  \******************************************************************************/
/*! no static exports found */function(t,r){t.exports=function(t){if("object"!=typeof t||null===t||"number"!=typeof t.byteLength)throw new TypeError("Expected input to be an ArrayBuffer");for(var r,o=new Uint8Array(t),i="",e=0;e<o.length;e++)i+=1===(r=o[e].toString(16)).length?"0"+r:r;return i}},"./node_modules/_crypto-digest-sync@1.0.0@crypto-digest-sync/sha256.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/_crypto-digest-sync@1.0.0@crypto-digest-sync/sha256.js ***!
  \*****************************************************************************/
/*! no static exports found */function(t,r,o){"use strict";const i=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function e(t,r,o){let e,s,n,h,u,f,a,p,c,l,m,d,y,v=0,T=o.length;for(;T>=64;){for(e=r[0],s=r[1],n=r[2],h=r[3],u=r[4],f=r[5],a=r[6],p=r[7],l=0;l<16;l++)m=v+4*l,t[l]=(255&o[m])<<24|(255&o[m+1])<<16|(255&o[m+2])<<8|255&o[m+3];for(l=16;l<64;l++)d=((c=t[l-2])>>>17|c<<15)^(c>>>19|c<<13)^c>>>10,y=((c=t[l-15])>>>7|c<<25)^(c>>>18|c<<14)^c>>>3,t[l]=(d+t[l-7]|0)+(y+t[l-16]|0);for(l=0;l<64;l++)d=(((u>>>6|u<<26)^(u>>>11|u<<21)^(u>>>25|u<<7))+(u&f^~u&a)|0)+(p+(i[l]+t[l]|0)|0)|0,y=((e>>>2|e<<30)^(e>>>13|e<<19)^(e>>>22|e<<10))+(e&s^e&n^s&n)|0,p=a,a=f,f=u,u=h+d|0,h=n,n=s,s=e,e=d+y|0;r[0]+=e,r[1]+=s,r[2]+=n,r[3]+=h,r[4]+=u,r[5]+=f,r[6]+=a,r[7]+=p,v+=64,T-=64}}t.exports=function(t){const r=new Int32Array(8),o=new Int32Array(64);r[0]=1779033703,r[1]=3144134277,r[2]=1013904242,r[3]=2773480762,r[4]=1359893119,r[5]=2600822924,r[6]=528734635,r[7]=1541459225;const i=new Uint8Array(t),s=function(t){const r=t.length,o=r%64,i=r%64<56?64:128,e=new Uint8Array(i),s=r/536870912|0,n=r<<3;return e.set(t.subarray(r-o)),e[o]=128,e[i-8]=s>>>24&255,e[i-7]=s>>>16&255,e[i-6]=s>>>8&255,e[i-5]=s>>>0&255,e[i-4]=n>>>24&255,e[i-3]=n>>>16&255,e[i-2]=n>>>8&255,e[i-1]=n>>>0&255,e}(i);e(o,r,i),e(o,r,s);const n=new Uint8Array(32);for(let e=0;e<8;e++)n[4*e+0]=r[e]>>>24&255,n[4*e+1]=r[e]>>>16&255,n[4*e+2]=r[e]>>>8&255,n[4*e+3]=r[e]>>>0&255;return n.buffer}},"./node_modules/_crypto-random-hex@1.0.0@crypto-random-hex/browser.js":
/*!****************************************************************************!*\
  !*** ./node_modules/_crypto-random-hex@1.0.0@crypto-random-hex/browser.js ***!
  \****************************************************************************/
/*! no static exports found */function(t,r,o){"use strict";const i=o(/*! array-buffer-to-hex */"./node_modules/_array-buffer-to-hex@1.0.0@array-buffer-to-hex/index.js");t.exports=function(t){const r=new Uint8Array(t);if("object"==typeof crypto&&"function"==typeof crypto.getRandomValues)crypto.getRandomValues(r);else{if("object"!=typeof msCrypto||"function"!=typeof msCrypto.getRandomValues)throw new Error("No secure random number generator available");msCrypto.getRandomValues(r)}return i(r.buffer)}},"./node_modules/_encode-utf8@1.0.1@encode-utf8/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/_encode-utf8@1.0.1@encode-utf8/index.js ***!
  \**************************************************************/
/*! no static exports found */function(t,r,o){"use strict";t.exports=function(t){const r=[],o=t.length;for(let i=0;i<o;i++){let e=t.charCodeAt(i);if(e>=55296&&e<=56319&&o>i+1){const r=t.charCodeAt(i+1);r>=56320&&r<=57343&&(e=1024*(e-55296)+r-56320+65536,i+=1)}e<128?r.push(e):e<2048?(r.push(e>>6|192),r.push(63&e|128)):e<55296||e>=57344&&e<65536?(r.push(e>>12|224),r.push(e>>6&63|128),r.push(63&e|128)):e>=65536&&e<=1114111?(r.push(e>>18|240),r.push(e>>12&63|128),r.push(e>>6&63|128),r.push(63&e|128)):r.push(239,191,189)}return Uint8Array.from(r).buffer}},"./node_modules/_hex-to-array-buffer@1.1.0@hex-to-array-buffer/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/_hex-to-array-buffer@1.1.0@hex-to-array-buffer/index.js ***!
  \******************************************************************************/
/*! no static exports found */function(t,r){t.exports=function(t){if("string"!=typeof t)throw new TypeError("Expected input to be a string");if(t.length%2!=0)throw new RangeError("Expected string to be an even number of characters");for(var r=new Uint8Array(t.length/2),o=0;o<t.length;o+=2)r[o/2]=parseInt(t.substring(o,o+2),16);return r.buffer}},"./node_modules/_jsbn@1.1.0@jsbn/index.js":
/*!************************************************!*\
  !*** ./node_modules/_jsbn@1.1.0@jsbn/index.js ***!
  \************************************************/
/*! no static exports found */function(t,r,o){(function(){var r;function o(t,r,o){null!=t&&("number"==typeof t?this.fromNumber(t,r,o):null==r&&"string"!=typeof t?this.fromString(t,256):this.fromString(t,r))}function i(){return new o(null)}var e="undefined"!=typeof navigator;e&&"Microsoft Internet Explorer"==navigator.appName?(o.prototype.am=function(t,r,o,i,e,s){for(var n=32767&r,h=r>>15;--s>=0;){var u=32767&this[t],f=this[t++]>>15,a=h*u+f*n;e=((u=n*u+((32767&a)<<15)+o[i]+(1073741823&e))>>>30)+(a>>>15)+h*f+(e>>>30),o[i++]=1073741823&u}return e},r=30):e&&"Netscape"!=navigator.appName?(o.prototype.am=function(t,r,o,i,e,s){for(;--s>=0;){var n=r*this[t++]+o[i]+e;e=Math.floor(n/67108864),o[i++]=67108863&n}return e},r=26):(o.prototype.am=function(t,r,o,i,e,s){for(var n=16383&r,h=r>>14;--s>=0;){var u=16383&this[t],f=this[t++]>>14,a=h*u+f*n;e=((u=n*u+((16383&a)<<14)+o[i]+e)>>28)+(a>>14)+h*f,o[i++]=268435455&u}return e},r=28),o.prototype.DB=r,o.prototype.DM=(1<<r)-1,o.prototype.DV=1<<r;o.prototype.FV=Math.pow(2,52),o.prototype.F1=52-r,o.prototype.F2=2*r-52;var s,n,h="0123456789abcdefghijklmnopqrstuvwxyz",u=new Array;for(s="0".charCodeAt(0),n=0;n<=9;++n)u[s++]=n;for(s="a".charCodeAt(0),n=10;n<36;++n)u[s++]=n;for(s="A".charCodeAt(0),n=10;n<36;++n)u[s++]=n;function f(t){return h.charAt(t)}function a(t,r){var o=u[t.charCodeAt(r)];return null==o?-1:o}function p(t){var r=i();return r.fromInt(t),r}function c(t){var r,o=1;return 0!=(r=t>>>16)&&(t=r,o+=16),0!=(r=t>>8)&&(t=r,o+=8),0!=(r=t>>4)&&(t=r,o+=4),0!=(r=t>>2)&&(t=r,o+=2),0!=(r=t>>1)&&(t=r,o+=1),o}function l(t){this.m=t}function m(t){this.m=t,this.mp=t.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<t.DB-15)-1,this.mt2=2*t.t}function d(t,r){return t&r}function y(t,r){return t|r}function v(t,r){return t^r}function T(t,r){return t&~r}function g(t){if(0==t)return-1;var r=0;return 0==(65535&t)&&(t>>=16,r+=16),0==(255&t)&&(t>>=8,r+=8),0==(15&t)&&(t>>=4,r+=4),0==(3&t)&&(t>>=2,r+=2),0==(1&t)&&++r,r}function b(t){for(var r=0;0!=t;)t&=t-1,++r;return r}function D(){}function B(t){return t}function w(t){this.r2=i(),this.q3=i(),o.ONE.dlShiftTo(2*t.t,this.r2),this.mu=this.r2.divide(t),this.m=t}l.prototype.convert=function(t){return t.s<0||t.compareTo(this.m)>=0?t.mod(this.m):t},l.prototype.revert=function(t){return t},l.prototype.reduce=function(t){t.divRemTo(this.m,null,t)},l.prototype.mulTo=function(t,r,o){t.multiplyTo(r,o),this.reduce(o)},l.prototype.sqrTo=function(t,r){t.squareTo(r),this.reduce(r)},m.prototype.convert=function(t){var r=i();return t.abs().dlShiftTo(this.m.t,r),r.divRemTo(this.m,null,r),t.s<0&&r.compareTo(o.ZERO)>0&&this.m.subTo(r,r),r},m.prototype.revert=function(t){var r=i();return t.copyTo(r),this.reduce(r),r},m.prototype.reduce=function(t){for(;t.t<=this.mt2;)t[t.t++]=0;for(var r=0;r<this.m.t;++r){var o=32767&t[r],i=o*this.mpl+((o*this.mph+(t[r]>>15)*this.mpl&this.um)<<15)&t.DM;for(t[o=r+this.m.t]+=this.m.am(0,i,t,r,0,this.m.t);t[o]>=t.DV;)t[o]-=t.DV,t[++o]++}t.clamp(),t.drShiftTo(this.m.t,t),t.compareTo(this.m)>=0&&t.subTo(this.m,t)},m.prototype.mulTo=function(t,r,o){t.multiplyTo(r,o),this.reduce(o)},m.prototype.sqrTo=function(t,r){t.squareTo(r),this.reduce(r)},o.prototype.copyTo=function(t){for(var r=this.t-1;r>=0;--r)t[r]=this[r];t.t=this.t,t.s=this.s},o.prototype.fromInt=function(t){this.t=1,this.s=t<0?-1:0,t>0?this[0]=t:t<-1?this[0]=t+this.DV:this.t=0},o.prototype.fromString=function(t,r){var i;if(16==r)i=4;else if(8==r)i=3;else if(256==r)i=8;else if(2==r)i=1;else if(32==r)i=5;else{if(4!=r)return void this.fromRadix(t,r);i=2}this.t=0,this.s=0;for(var e=t.length,s=!1,n=0;--e>=0;){var h=8==i?255&t[e]:a(t,e);h<0?"-"==t.charAt(e)&&(s=!0):(s=!1,0==n?this[this.t++]=h:n+i>this.DB?(this[this.t-1]|=(h&(1<<this.DB-n)-1)<<n,this[this.t++]=h>>this.DB-n):this[this.t-1]|=h<<n,(n+=i)>=this.DB&&(n-=this.DB))}8==i&&0!=(128&t[0])&&(this.s=-1,n>0&&(this[this.t-1]|=(1<<this.DB-n)-1<<n)),this.clamp(),s&&o.ZERO.subTo(this,this)},o.prototype.clamp=function(){for(var t=this.s&this.DM;this.t>0&&this[this.t-1]==t;)--this.t},o.prototype.dlShiftTo=function(t,r){var o;for(o=this.t-1;o>=0;--o)r[o+t]=this[o];for(o=t-1;o>=0;--o)r[o]=0;r.t=this.t+t,r.s=this.s},o.prototype.drShiftTo=function(t,r){for(var o=t;o<this.t;++o)r[o-t]=this[o];r.t=Math.max(this.t-t,0),r.s=this.s},o.prototype.lShiftTo=function(t,r){var o,i=t%this.DB,e=this.DB-i,s=(1<<e)-1,n=Math.floor(t/this.DB),h=this.s<<i&this.DM;for(o=this.t-1;o>=0;--o)r[o+n+1]=this[o]>>e|h,h=(this[o]&s)<<i;for(o=n-1;o>=0;--o)r[o]=0;r[n]=h,r.t=this.t+n+1,r.s=this.s,r.clamp()},o.prototype.rShiftTo=function(t,r){r.s=this.s;var o=Math.floor(t/this.DB);if(o>=this.t)r.t=0;else{var i=t%this.DB,e=this.DB-i,s=(1<<i)-1;r[0]=this[o]>>i;for(var n=o+1;n<this.t;++n)r[n-o-1]|=(this[n]&s)<<e,r[n-o]=this[n]>>i;i>0&&(r[this.t-o-1]|=(this.s&s)<<e),r.t=this.t-o,r.clamp()}},o.prototype.subTo=function(t,r){for(var o=0,i=0,e=Math.min(t.t,this.t);o<e;)i+=this[o]-t[o],r[o++]=i&this.DM,i>>=this.DB;if(t.t<this.t){for(i-=t.s;o<this.t;)i+=this[o],r[o++]=i&this.DM,i>>=this.DB;i+=this.s}else{for(i+=this.s;o<t.t;)i-=t[o],r[o++]=i&this.DM,i>>=this.DB;i-=t.s}r.s=i<0?-1:0,i<-1?r[o++]=this.DV+i:i>0&&(r[o++]=i),r.t=o,r.clamp()},o.prototype.multiplyTo=function(t,r){var i=this.abs(),e=t.abs(),s=i.t;for(r.t=s+e.t;--s>=0;)r[s]=0;for(s=0;s<e.t;++s)r[s+i.t]=i.am(0,e[s],r,s,0,i.t);r.s=0,r.clamp(),this.s!=t.s&&o.ZERO.subTo(r,r)},o.prototype.squareTo=function(t){for(var r=this.abs(),o=t.t=2*r.t;--o>=0;)t[o]=0;for(o=0;o<r.t-1;++o){var i=r.am(o,r[o],t,2*o,0,1);(t[o+r.t]+=r.am(o+1,2*r[o],t,2*o+1,i,r.t-o-1))>=r.DV&&(t[o+r.t]-=r.DV,t[o+r.t+1]=1)}t.t>0&&(t[t.t-1]+=r.am(o,r[o],t,2*o,0,1)),t.s=0,t.clamp()},o.prototype.divRemTo=function(t,r,e){var s=t.abs();if(!(s.t<=0)){var n=this.abs();if(n.t<s.t)return null!=r&&r.fromInt(0),void(null!=e&&this.copyTo(e));null==e&&(e=i());var h=i(),u=this.s,f=t.s,a=this.DB-c(s[s.t-1]);a>0?(s.lShiftTo(a,h),n.lShiftTo(a,e)):(s.copyTo(h),n.copyTo(e));var p=h.t,l=h[p-1];if(0!=l){var m=l*(1<<this.F1)+(p>1?h[p-2]>>this.F2:0),d=this.FV/m,y=(1<<this.F1)/m,v=1<<this.F2,T=e.t,g=T-p,b=null==r?i():r;for(h.dlShiftTo(g,b),e.compareTo(b)>=0&&(e[e.t++]=1,e.subTo(b,e)),o.ONE.dlShiftTo(p,b),b.subTo(h,h);h.t<p;)h[h.t++]=0;for(;--g>=0;){var D=e[--T]==l?this.DM:Math.floor(e[T]*d+(e[T-1]+v)*y);if((e[T]+=h.am(0,D,e,g,0,p))<D)for(h.dlShiftTo(g,b),e.subTo(b,e);e[T]<--D;)e.subTo(b,e)}null!=r&&(e.drShiftTo(p,r),u!=f&&o.ZERO.subTo(r,r)),e.t=p,e.clamp(),a>0&&e.rShiftTo(a,e),u<0&&o.ZERO.subTo(e,e)}}},o.prototype.invDigit=function(){if(this.t<1)return 0;var t=this[0];if(0==(1&t))return 0;var r=3&t;return(r=(r=(r=(r=r*(2-(15&t)*r)&15)*(2-(255&t)*r)&255)*(2-((65535&t)*r&65535))&65535)*(2-t*r%this.DV)%this.DV)>0?this.DV-r:-r},o.prototype.isEven=function(){return 0==(this.t>0?1&this[0]:this.s)},o.prototype.exp=function(t,r){if(t>4294967295||t<1)return o.ONE;var e=i(),s=i(),n=r.convert(this),h=c(t)-1;for(n.copyTo(e);--h>=0;)if(r.sqrTo(e,s),(t&1<<h)>0)r.mulTo(s,n,e);else{var u=e;e=s,s=u}return r.revert(e)},o.prototype.toString=function(t){if(this.s<0)return"-"+this.negate().toString(t);var r;if(16==t)r=4;else if(8==t)r=3;else if(2==t)r=1;else if(32==t)r=5;else{if(4!=t)return this.toRadix(t);r=2}var o,i=(1<<r)-1,e=!1,s="",n=this.t,h=this.DB-n*this.DB%r;if(n-- >0)for(h<this.DB&&(o=this[n]>>h)>0&&(e=!0,s=f(o));n>=0;)h<r?(o=(this[n]&(1<<h)-1)<<r-h,o|=this[--n]>>(h+=this.DB-r)):(o=this[n]>>(h-=r)&i,h<=0&&(h+=this.DB,--n)),o>0&&(e=!0),e&&(s+=f(o));return e?s:"0"},o.prototype.negate=function(){var t=i();return o.ZERO.subTo(this,t),t},o.prototype.abs=function(){return this.s<0?this.negate():this},o.prototype.compareTo=function(t){var r=this.s-t.s;if(0!=r)return r;var o=this.t;if(0!=(r=o-t.t))return this.s<0?-r:r;for(;--o>=0;)if(0!=(r=this[o]-t[o]))return r;return 0},o.prototype.bitLength=function(){return this.t<=0?0:this.DB*(this.t-1)+c(this[this.t-1]^this.s&this.DM)},o.prototype.mod=function(t){var r=i();return this.abs().divRemTo(t,null,r),this.s<0&&r.compareTo(o.ZERO)>0&&t.subTo(r,r),r},o.prototype.modPowInt=function(t,r){var o;return o=t<256||r.isEven()?new l(r):new m(r),this.exp(t,o)},o.ZERO=p(0),o.ONE=p(1),D.prototype.convert=B,D.prototype.revert=B,D.prototype.mulTo=function(t,r,o){t.multiplyTo(r,o)},D.prototype.sqrTo=function(t,r){t.squareTo(r)},w.prototype.convert=function(t){if(t.s<0||t.t>2*this.m.t)return t.mod(this.m);if(t.compareTo(this.m)<0)return t;var r=i();return t.copyTo(r),this.reduce(r),r},w.prototype.revert=function(t){return t},w.prototype.reduce=function(t){for(t.drShiftTo(this.m.t-1,this.r2),t.t>this.m.t+1&&(t.t=this.m.t+1,t.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);t.compareTo(this.r2)<0;)t.dAddOffset(1,this.m.t+1);for(t.subTo(this.r2,t);t.compareTo(this.m)>=0;)t.subTo(this.m,t)},w.prototype.mulTo=function(t,r,o){t.multiplyTo(r,o),this.reduce(o)},w.prototype.sqrTo=function(t,r){t.squareTo(r),this.reduce(r)};var x,S,E,A=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],M=(1<<26)/A[A.length-1];function j(){var t;t=(new Date).getTime(),S[E++]^=255&t,S[E++]^=t>>8&255,S[E++]^=t>>16&255,S[E++]^=t>>24&255,E>=N&&(E-=N)}if(o.prototype.chunkSize=function(t){return Math.floor(Math.LN2*this.DB/Math.log(t))},o.prototype.toRadix=function(t){if(null==t&&(t=10),0==this.signum()||t<2||t>36)return"0";var r=this.chunkSize(t),o=Math.pow(t,r),e=p(o),s=i(),n=i(),h="";for(this.divRemTo(e,s,n);s.signum()>0;)h=(o+n.intValue()).toString(t).substr(1)+h,s.divRemTo(e,s,n);return n.intValue().toString(t)+h},o.prototype.fromRadix=function(t,r){this.fromInt(0),null==r&&(r=10);for(var i=this.chunkSize(r),e=Math.pow(r,i),s=!1,n=0,h=0,u=0;u<t.length;++u){var f=a(t,u);f<0?"-"==t.charAt(u)&&0==this.signum()&&(s=!0):(h=r*h+f,++n>=i&&(this.dMultiply(e),this.dAddOffset(h,0),n=0,h=0))}n>0&&(this.dMultiply(Math.pow(r,n)),this.dAddOffset(h,0)),s&&o.ZERO.subTo(this,this)},o.prototype.fromNumber=function(t,r,i){if("number"==typeof r)if(t<2)this.fromInt(1);else for(this.fromNumber(t,i),this.testBit(t-1)||this.bitwiseTo(o.ONE.shiftLeft(t-1),y,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(r);)this.dAddOffset(2,0),this.bitLength()>t&&this.subTo(o.ONE.shiftLeft(t-1),this);else{var e=new Array,s=7&t;e.length=1+(t>>3),r.nextBytes(e),s>0?e[0]&=(1<<s)-1:e[0]=0,this.fromString(e,256)}},o.prototype.bitwiseTo=function(t,r,o){var i,e,s=Math.min(t.t,this.t);for(i=0;i<s;++i)o[i]=r(this[i],t[i]);if(t.t<this.t){for(e=t.s&this.DM,i=s;i<this.t;++i)o[i]=r(this[i],e);o.t=this.t}else{for(e=this.s&this.DM,i=s;i<t.t;++i)o[i]=r(e,t[i]);o.t=t.t}o.s=r(this.s,t.s),o.clamp()},o.prototype.changeBit=function(t,r){var i=o.ONE.shiftLeft(t);return this.bitwiseTo(i,r,i),i},o.prototype.addTo=function(t,r){for(var o=0,i=0,e=Math.min(t.t,this.t);o<e;)i+=this[o]+t[o],r[o++]=i&this.DM,i>>=this.DB;if(t.t<this.t){for(i+=t.s;o<this.t;)i+=this[o],r[o++]=i&this.DM,i>>=this.DB;i+=this.s}else{for(i+=this.s;o<t.t;)i+=t[o],r[o++]=i&this.DM,i>>=this.DB;i+=t.s}r.s=i<0?-1:0,i>0?r[o++]=i:i<-1&&(r[o++]=this.DV+i),r.t=o,r.clamp()},o.prototype.dMultiply=function(t){this[this.t]=this.am(0,t-1,this,0,0,this.t),++this.t,this.clamp()},o.prototype.dAddOffset=function(t,r){if(0!=t){for(;this.t<=r;)this[this.t++]=0;for(this[r]+=t;this[r]>=this.DV;)this[r]-=this.DV,++r>=this.t&&(this[this.t++]=0),++this[r]}},o.prototype.multiplyLowerTo=function(t,r,o){var i,e=Math.min(this.t+t.t,r);for(o.s=0,o.t=e;e>0;)o[--e]=0;for(i=o.t-this.t;e<i;++e)o[e+this.t]=this.am(0,t[e],o,e,0,this.t);for(i=Math.min(t.t,r);e<i;++e)this.am(0,t[e],o,e,0,r-e);o.clamp()},o.prototype.multiplyUpperTo=function(t,r,o){--r;var i=o.t=this.t+t.t-r;for(o.s=0;--i>=0;)o[i]=0;for(i=Math.max(r-this.t,0);i<t.t;++i)o[this.t+i-r]=this.am(r-i,t[i],o,0,0,this.t+i-r);o.clamp(),o.drShiftTo(1,o)},o.prototype.modInt=function(t){if(t<=0)return 0;var r=this.DV%t,o=this.s<0?t-1:0;if(this.t>0)if(0==r)o=this[0]%t;else for(var i=this.t-1;i>=0;--i)o=(r*o+this[i])%t;return o},o.prototype.millerRabin=function(t){var r=this.subtract(o.ONE),e=r.getLowestSetBit();if(e<=0)return!1;var s=r.shiftRight(e);(t=t+1>>1)>A.length&&(t=A.length);for(var n=i(),h=0;h<t;++h){n.fromInt(A[Math.floor(Math.random()*A.length)]);var u=n.modPow(s,this);if(0!=u.compareTo(o.ONE)&&0!=u.compareTo(r)){for(var f=1;f++<e&&0!=u.compareTo(r);)if(0==(u=u.modPowInt(2,this)).compareTo(o.ONE))return!1;if(0!=u.compareTo(r))return!1}}return!0},o.prototype.clone=function(){var t=i();return this.copyTo(t),t},o.prototype.intValue=function(){if(this.s<0){if(1==this.t)return this[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]},o.prototype.byteValue=function(){return 0==this.t?this.s:this[0]<<24>>24},o.prototype.shortValue=function(){return 0==this.t?this.s:this[0]<<16>>16},o.prototype.signum=function(){return this.s<0?-1:this.t<=0||1==this.t&&this[0]<=0?0:1},o.prototype.toByteArray=function(){var t=this.t,r=new Array;r[0]=this.s;var o,i=this.DB-t*this.DB%8,e=0;if(t-- >0)for(i<this.DB&&(o=this[t]>>i)!=(this.s&this.DM)>>i&&(r[e++]=o|this.s<<this.DB-i);t>=0;)i<8?(o=(this[t]&(1<<i)-1)<<8-i,o|=this[--t]>>(i+=this.DB-8)):(o=this[t]>>(i-=8)&255,i<=0&&(i+=this.DB,--t)),0!=(128&o)&&(o|=-256),0==e&&(128&this.s)!=(128&o)&&++e,(e>0||o!=this.s)&&(r[e++]=o);return r},o.prototype.equals=function(t){return 0==this.compareTo(t)},o.prototype.min=function(t){return this.compareTo(t)<0?this:t},o.prototype.max=function(t){return this.compareTo(t)>0?this:t},o.prototype.and=function(t){var r=i();return this.bitwiseTo(t,d,r),r},o.prototype.or=function(t){var r=i();return this.bitwiseTo(t,y,r),r},o.prototype.xor=function(t){var r=i();return this.bitwiseTo(t,v,r),r},o.prototype.andNot=function(t){var r=i();return this.bitwiseTo(t,T,r),r},o.prototype.not=function(){for(var t=i(),r=0;r<this.t;++r)t[r]=this.DM&~this[r];return t.t=this.t,t.s=~this.s,t},o.prototype.shiftLeft=function(t){var r=i();return t<0?this.rShiftTo(-t,r):this.lShiftTo(t,r),r},o.prototype.shiftRight=function(t){var r=i();return t<0?this.lShiftTo(-t,r):this.rShiftTo(t,r),r},o.prototype.getLowestSetBit=function(){for(var t=0;t<this.t;++t)if(0!=this[t])return t*this.DB+g(this[t]);return this.s<0?this.t*this.DB:-1},o.prototype.bitCount=function(){for(var t=0,r=this.s&this.DM,o=0;o<this.t;++o)t+=b(this[o]^r);return t},o.prototype.testBit=function(t){var r=Math.floor(t/this.DB);return r>=this.t?0!=this.s:0!=(this[r]&1<<t%this.DB)},o.prototype.setBit=function(t){return this.changeBit(t,y)},o.prototype.clearBit=function(t){return this.changeBit(t,T)},o.prototype.flipBit=function(t){return this.changeBit(t,v)},o.prototype.add=function(t){var r=i();return this.addTo(t,r),r},o.prototype.subtract=function(t){var r=i();return this.subTo(t,r),r},o.prototype.multiply=function(t){var r=i();return this.multiplyTo(t,r),r},o.prototype.divide=function(t){var r=i();return this.divRemTo(t,r,null),r},o.prototype.remainder=function(t){var r=i();return this.divRemTo(t,null,r),r},o.prototype.divideAndRemainder=function(t){var r=i(),o=i();return this.divRemTo(t,r,o),new Array(r,o)},o.prototype.modPow=function(t,r){var o,e,s=t.bitLength(),n=p(1);if(s<=0)return n;o=s<18?1:s<48?3:s<144?4:s<768?5:6,e=s<8?new l(r):r.isEven()?new w(r):new m(r);var h=new Array,u=3,f=o-1,a=(1<<o)-1;if(h[1]=e.convert(this),o>1){var d=i();for(e.sqrTo(h[1],d);u<=a;)h[u]=i(),e.mulTo(d,h[u-2],h[u]),u+=2}var y,v,T=t.t-1,g=!0,b=i();for(s=c(t[T])-1;T>=0;){for(s>=f?y=t[T]>>s-f&a:(y=(t[T]&(1<<s+1)-1)<<f-s,T>0&&(y|=t[T-1]>>this.DB+s-f)),u=o;0==(1&y);)y>>=1,--u;if((s-=u)<0&&(s+=this.DB,--T),g)h[y].copyTo(n),g=!1;else{for(;u>1;)e.sqrTo(n,b),e.sqrTo(b,n),u-=2;u>0?e.sqrTo(n,b):(v=n,n=b,b=v),e.mulTo(b,h[y],n)}for(;T>=0&&0==(t[T]&1<<s);)e.sqrTo(n,b),v=n,n=b,b=v,--s<0&&(s=this.DB-1,--T)}return e.revert(n)},o.prototype.modInverse=function(t){var r=t.isEven();if(this.isEven()&&r||0==t.signum())return o.ZERO;for(var i=t.clone(),e=this.clone(),s=p(1),n=p(0),h=p(0),u=p(1);0!=i.signum();){for(;i.isEven();)i.rShiftTo(1,i),r?(s.isEven()&&n.isEven()||(s.addTo(this,s),n.subTo(t,n)),s.rShiftTo(1,s)):n.isEven()||n.subTo(t,n),n.rShiftTo(1,n);for(;e.isEven();)e.rShiftTo(1,e),r?(h.isEven()&&u.isEven()||(h.addTo(this,h),u.subTo(t,u)),h.rShiftTo(1,h)):u.isEven()||u.subTo(t,u),u.rShiftTo(1,u);i.compareTo(e)>=0?(i.subTo(e,i),r&&s.subTo(h,s),n.subTo(u,n)):(e.subTo(i,e),r&&h.subTo(s,h),u.subTo(n,u))}return 0!=e.compareTo(o.ONE)?o.ZERO:u.compareTo(t)>=0?u.subtract(t):u.signum()<0?(u.addTo(t,u),u.signum()<0?u.add(t):u):u},o.prototype.pow=function(t){return this.exp(t,new D)},o.prototype.gcd=function(t){var r=this.s<0?this.negate():this.clone(),o=t.s<0?t.negate():t.clone();if(r.compareTo(o)<0){var i=r;r=o,o=i}var e=r.getLowestSetBit(),s=o.getLowestSetBit();if(s<0)return r;for(e<s&&(s=e),s>0&&(r.rShiftTo(s,r),o.rShiftTo(s,o));r.signum()>0;)(e=r.getLowestSetBit())>0&&r.rShiftTo(e,r),(e=o.getLowestSetBit())>0&&o.rShiftTo(e,o),r.compareTo(o)>=0?(r.subTo(o,r),r.rShiftTo(1,r)):(o.subTo(r,o),o.rShiftTo(1,o));return s>0&&o.lShiftTo(s,o),o},o.prototype.isProbablePrime=function(t){var r,o=this.abs();if(1==o.t&&o[0]<=A[A.length-1]){for(r=0;r<A.length;++r)if(o[0]==A[r])return!0;return!1}if(o.isEven())return!1;for(r=1;r<A.length;){for(var i=A[r],e=r+1;e<A.length&&i<M;)i*=A[e++];for(i=o.modInt(i);r<e;)if(i%A[r++]==0)return!1}return o.millerRabin(t)},o.prototype.square=function(){var t=i();return this.squareTo(t),t},o.prototype.Barrett=w,null==S){var F;if(S=new Array,E=0,"undefined"!=typeof window&&window.crypto)if(window.crypto.getRandomValues){var R=new Uint8Array(32);for(window.crypto.getRandomValues(R),F=0;F<32;++F)S[E++]=R[F]}else if("Netscape"==navigator.appName&&navigator.appVersion<"5"){var O=window.crypto.random(32);for(F=0;F<O.length;++F)S[E++]=255&O.charCodeAt(F)}for(;E<N;)F=Math.floor(65536*Math.random()),S[E++]=F>>>8,S[E++]=255&F;E=0,j()}function _(){if(null==x){for(j(),(x=new V).init(S),E=0;E<S.length;++E)S[E]=0;E=0}return x.next()}function C(){}function V(){this.i=0,this.j=0,this.S=new Array}C.prototype.nextBytes=function(t){var r;for(r=0;r<t.length;++r)t[r]=_()},V.prototype.init=function(t){var r,o,i;for(r=0;r<256;++r)this.S[r]=r;for(o=0,r=0;r<256;++r)o=o+this.S[r]+t[r%t.length]&255,i=this.S[r],this.S[r]=this.S[o],this.S[o]=i;this.i=0,this.j=0},V.prototype.next=function(){var t;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,t=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=t,this.S[t+this.S[this.i]&255]};var N=256;t.exports={default:o,BigInteger:o,SecureRandom:C}}).call(this)},"./node_modules/_pad-start@1.0.2@pad-start/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/_pad-start@1.0.2@pad-start/index.js ***!
  \**********************************************************/
/*! no static exports found */function(t,r,o){"use strict";t.exports=function(t,r,o){if(null==t||null==r)return t;var i=String(t),e="number"==typeof r?r:parseInt(r,10);if(isNaN(e)||!isFinite(e))return i;var s=i.length;if(s>=e)return i;var n=null==o?"":String(o);""===n&&(n=" ");for(var h=e-s;n.length<h;)n+=n;return(n.length>h?n.substr(0,h):n)+i}}})});