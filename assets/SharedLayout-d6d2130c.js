import{g as L,r as u,j as a,c as _,O as Q}from"./index-4f5c4aef.js";import{s as U}from"./sprite-c84c041f.js";var M={exports:{}},W="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",K=W,G=K;function N(){}function V(){}V.resetWarningCache=N;var F=function(){function e(n,s,i,p,m,d){if(d!==G){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}e.isRequired=e;function t(){return e}var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:V,resetWarningCache:N};return r.PropTypes=r,r};M.exports=F();var H=M.exports;const o=L(H),X="_header_k8ndl_1",Y="_dark_k8ndl_19",Z="_light_k8ndl_27",$="_violet_k8ndl_35",y={header:X,dark:Y,light:Z,violet:$};var x={};x.match=ne;x.parse=R;var J=/(?:(only|not)?\s*([^\s\(\)]+)(?:\s*and)?\s*)?(.+)?/i,z=/\(\s*([^\s\:\)]+)\s*(?:\:\s*([^\s\)]+))?\s*\)/,ee=/^(?:(min|max)-)?(.+)/,te=/(em|rem|px|cm|mm|in|pt|pc)?$/,re=/(dpi|dpcm|dppx)?$/;function ne(e,t){return R(e).some(function(r){var n=r.inverse,s=r.type==="all"||t.type===r.type;if(s&&n||!(s||n))return!1;var i=r.expressions.every(function(p){var m=p.feature,d=p.modifier,c=p.value,h=t[m];if(!h)return!1;switch(m){case"orientation":case"scan":return h.toLowerCase()===c.toLowerCase();case"width":case"height":case"device-width":case"device-height":c=A(c),h=A(h);break;case"resolution":c=S(c),h=S(h);break;case"aspect-ratio":case"device-aspect-ratio":case"device-pixel-ratio":c=w(c),h=w(h);break;case"grid":case"color":case"color-index":case"monochrome":c=parseInt(c,10)||1,h=parseInt(h,10)||0;break}switch(d){case"min":return h>=c;case"max":return h<=c;default:return h===c}});return i&&!n||!i&&n})}function R(e){return e.split(",").map(function(t){t=t.trim();var r=t.match(J),n=r[1],s=r[2],i=r[3]||"",p={};return p.inverse=!!n&&n.toLowerCase()==="not",p.type=s?s.toLowerCase():"all",i=i.match(/\([^\)]+\)/g)||[],p.expressions=i.map(function(m){var d=m.match(z),c=d[1].toLowerCase().match(ee);return{modifier:c[1],feature:c[2],value:d[2]}}),p})}function w(e){var t=Number(e),r;return t||(r=e.match(/^(\d+)\s*\/\s*(\d+)$/),t=r[1]/r[2]),t}function S(e){var t=parseFloat(e),r=String(e).match(re)[1];switch(r){case"dpcm":return t/2.54;case"dppx":return t*96;default:return t}}function A(e){var t=parseFloat(e),r=String(e).match(te)[1];switch(r){case"em":return t*16;case"rem":return t*16;case"cm":return t*96/2.54;case"mm":return t*96/2.54/10;case"in":return t*96;case"pt":return t*72;case"pc":return t*72/12;default:return t}}var se=x.match,D=typeof window<"u"?window.matchMedia:null;function oe(e,t,r){var n=this,s;D&&!r&&(s=D.call(window,e)),s?(this.matches=s.matches,this.media=s.media,s.addListener(m)):(this.matches=se(e,t),this.media=e),this.addListener=i,this.removeListener=p,this.dispose=d;function i(c){s&&s.addListener(c)}function p(c){s&&s.removeListener(c)}function m(c){n.matches=c.matches,n.media=c.media}function d(){s&&s.removeListener(m)}}function ae(e,t,r){return new oe(e,t,r)}var ie=ae;const ce=L(ie);var pe=/[A-Z]/g,ue=/^ms-/,k={};function le(e){return"-"+e.toLowerCase()}function O(e){if(k.hasOwnProperty(e))return k[e];var t=e.replace(pe,le);return k[e]=ue.test(t)?"-"+t:t}function he(e,t){if(e===t)return!0;if(!e||!t)return!1;const r=Object.keys(e),n=Object.keys(t),s=r.length;if(n.length!==s)return!1;for(let i=0;i<s;i++){const p=r[i];if(e[p]!==t[p]||!Object.prototype.hasOwnProperty.call(t,p))return!1}return!0}const l=o.oneOfType([o.string,o.number]),I={all:o.bool,grid:o.bool,aural:o.bool,braille:o.bool,handheld:o.bool,print:o.bool,projection:o.bool,screen:o.bool,tty:o.bool,tv:o.bool,embossed:o.bool},P={orientation:o.oneOf(["portrait","landscape"]),scan:o.oneOf(["progressive","interlace"]),aspectRatio:o.string,deviceAspectRatio:o.string,height:l,deviceHeight:l,width:l,deviceWidth:l,color:o.bool,colorIndex:o.bool,monochrome:o.bool,resolution:l,type:Object.keys(I)},{type:ut,...me}=P,B={minAspectRatio:o.string,maxAspectRatio:o.string,minDeviceAspectRatio:o.string,maxDeviceAspectRatio:o.string,minHeight:l,maxHeight:l,minDeviceHeight:l,maxDeviceHeight:l,minWidth:l,maxWidth:l,minDeviceWidth:l,maxDeviceWidth:l,minColor:o.number,maxColor:o.number,minColorIndex:o.number,maxColorIndex:o.number,minMonochrome:o.number,maxMonochrome:o.number,minResolution:l,maxResolution:l,...me},de={...I,...B};var fe={all:de,types:I,matchers:P,features:B};const ge=e=>`not ${e}`,_e=(e,t)=>{const r=O(e);return typeof t=="number"&&(t=`${t}px`),t===!0?r:t===!1?ge(r):`(${r}: ${t})`},ve=e=>e.join(" and "),be=e=>{const t=[];return Object.keys(fe.all).forEach(r=>{const n=e[r];n!=null&&t.push(_e(r,n))}),ve(t)},ye=u.createContext(void 0),ke=e=>e.query||be(e),E=e=>e?Object.keys(e).reduce((r,n)=>(r[O(n)]=e[n],r),{}):void 0,q=()=>{const e=u.useRef(!1);return u.useEffect(()=>{e.current=!0},[]),e.current},xe=e=>{const t=u.useContext(ye),r=()=>E(e)||E(t),[n,s]=u.useState(r);return u.useEffect(()=>{const i=r();he(n,i)||s(i)},[e,t]),n},Ie=e=>{const t=()=>ke(e),[r,n]=u.useState(t);return u.useEffect(()=>{const s=t();r!==s&&n(s)},[e]),r},we=(e,t)=>{const r=()=>ce(e,t||{},!!t),[n,s]=u.useState(r),i=q();return u.useEffect(()=>{if(i){const p=r();return s(p),()=>{p&&p.dispose()}}},[e,t]),n},Se=e=>{const[t,r]=u.useState(e.matches);return u.useEffect(()=>{const n=s=>{r(s.matches)};return e.addListener(n),r(e.matches),()=>{e.removeListener(n)}},[e]),t},T=(e,t,r)=>{const n=xe(t),s=Ie(e);if(!s)throw new Error("Invalid or missing MediaQuery!");const i=we(s,n),p=Se(i),m=q();return u.useEffect(()=>{m&&r&&r(p)},[p]),u.useEffect(()=>()=>{i&&i.dispose()},[]),p},Ae=()=>{const e=T({query:"(min-width: 1440px)"}),t=T({query:"(min-width: 768px)"})&&!e,r=!t&&!e;return u.useMemo(()=>({isMobile:r,isTablet:t,isDesktop:e}),[r,t,e])},De="_openTheme_lq6hl_1",Ee="_openThemeSpan_lq6hl_8",Te="_arrowIcon_lq6hl_21",Ce="_rotate_lq6hl_25",je="_openThemeSpanDark_lq6hl_29",Le="_openThemeSpanLight_lq6hl_37",Ue="_openThemeSpanViolet_lq6hl_45",g={openTheme:De,openThemeSpan:Ee,arrowIcon:Te,rotate:Ce,openThemeSpanDark:je,openThemeSpanLight:Le,openThemeSpanViolet:Ue},Me="_themePopUp_bbqpk_1",Ne="_appear_bbqpk_1",Ve="_disappear_bbqpk_37",Re="_themePopUpDark_bbqpk_55",Oe="_activeDark_bbqpk_62",Pe="_themePopUpLight_bbqpk_69",Be="_activeLight_bbqpk_76",qe="_themePopUpViolet_bbqpk_83",Qe="_activeViolet_bbqpk_90",f={themePopUp:Me,appear:Ne,disappear:Ve,themePopUpDark:Re,activeDark:Oe,themePopUpLight:Pe,activeLight:Be,themePopUpViolet:qe,activeViolet:Qe},We=({isThemeOpen:e})=>{const[t,r]=u.useState("Dark"),n=async s=>{const i=s.target.textContent;console.log(i),r(i)};return a.jsxs("div",{className:_(f.themePopUp,{[f.themePopUpDark]:t==="Dark",[f.themePopUpLight]:t==="Light",[f.themePopUpViolet]:t==="Violet",[f.disappear]:!e}),children:[a.jsx("span",{className:t==="Dark"?f.activeDark:"",onClick:n,children:"Dark"}),a.jsx("span",{className:t==="Light"?f.activeLight:"",onClick:n,children:"Light"}),a.jsx("span",{className:t==="Violet"?f.activeViolet:"",onClick:n,children:"Violet"})]})},Ke=()=>{const[e,t]=u.useState(!1),r="Dark",n=async()=>{t(s=>!s)};return a.jsxs("div",{onClick:n,className:_(g.openTheme),children:[a.jsxs("span",{className:_(g.openThemeSpan,{[g.openThemeSpanDark]:r==="Dark",[g.openThemeSpanLight]:r==="Light",[g.openThemeSpanViolet]:r==="Violet"}),children:["Theme"," ",a.jsx("svg",{className:_(g.arrowIcon,{[g.rotate]:e}),xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",children:a.jsx("use",{xlinkHref:`${U}#icon-chevron-down`})})]}),a.jsx(We,{isThemeOpen:e})]})},Ge="_burgerButton_1b6hd_1",Fe="_burgerIcon_1b6hd_7",He="_burgerButtonDark_1b6hd_19",Xe="_burgerButtonLight_1b6hd_27",Ye="_burgerButtonViolet_1b6hd_35",b={burgerButton:Ge,burgerIcon:Fe,burgerButtonDark:He,burgerButtonLight:Xe,burgerButtonViolet:Ye},Ze=()=>{const e="Dark",t=async()=>{console.log("You are trying to open sidebar")};return a.jsx("button",{className:_(b.burgerButton,{[b.burgerButtonDark]:e==="Dark",[b.burgerButtonLight]:e==="Light",[b.burgerButtonViolet]:e==="Violet"}),onClick:t,type:"button",children:a.jsx("svg",{className:b.burgerIcon,xmlns:"http://www.w3.org/2000/svg",children:a.jsx("use",{xlinkHref:`${U}#icon-menu`})})})},$e="_userInfo_1iwoj_1",Je="_userName_1iwoj_15",ze="_userAvatar_1iwoj_23",et="_userInfoDark_1iwoj_31",tt="_dark_1iwoj_38",rt="_light_1iwoj_50",nt="_userInfoViolet_1iwoj_55",st="_violet_1iwoj_62",v={userInfo:$e,userName:Je,userAvatar:ze,userInfoDark:et,dark:tt,light:rt,userInfoViolet:nt,violet:st},C="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM5SURBVHgB7ZzbdaMwEIYFvj5uCXSwKWG3gqSU7WCdDjadZCvYLYEOQgl58v2S+TmZE0XBgEAjW1jfORybYGP0eSSkkaNEGWRZ9uN4PN4nSfKAXTVM8tPplKdp+lgQ+oGEn5CIbyTiN4n4pW4IEvPnXcwr9kshkEEH/tHTO3Wb5BQIPyElxR4iQ92uDHD37kAlFB0ZRceLiihEScpmImVNeUjJyi1XlU+Qi3u0IVHIB1mqIp+IQgyiEIMoxCAKMYhCDKIQgyjEIAoxiEIMohCDKMRgrC7E4XAoNxpylxug0aaidF75OJlMykffeBey3+/VbrdDLvPLMfwNkvh1o9FITadTr2K8VRkUdrPZqO12WymjCshZrValQF94iRCWwVXDFhaCaiSNlwhBgbrK0M+BaiSNuBCEvauCnGt7XCIuxGX9hwzpKBEVwrdVl0CIZJSIC3ENZAQrxHV0MJLVJkghksSxjIGokEuMRfoSpBAMAKUQFSJ14cEKGY/dD5U4RSCFeIRgCO8S6QGe+F0G+QxXIDokok5HXAgK4UIKzjOfz5U0Xvoh+Fb7hDrL8HEb95ZC5Bwput02PVi0Q7PZzFufxmtOFZGCRhYpAQz86gZpnGiWbjNMvH0aCo/IaDMChgyI4/dI3mZNRIVwFp03m/fxiJYTTIgUiJGOGJGz41tFgZqqhQ26IESP1LyNUyEovHQymKMHG6S47qg5E1I3ASUFy0c/x1WPuHdr1WUCyiX8+a6S2b2E8MVI5E5tgZD1et37S+ksBB+MC7imNCGupa+UTkJYxiWqSBN9r81ayDXLYPpco5UQbjOuWQaDa0RDb4uVEBeT1j7pMq/cWgh3hkLDtjvQSoiPSWZJbKpOKyGhVRUTm6rTKCT06GDa9mQbhfj8fZck+g/66kibTjKE6GDalKVWSMjtRhVt8jMQUpw7OKToYBrKlOP/dv9WHWlb50KjLurJRY4Iea46GEL3vAsN1eYxLYriP5l5qnrjUDnzs/InrCXCjeqCtlx/wdAaVJ2KsmFxlQWelEKwbgZWRqiKlCGiC0Fk8Noh2P+Sx8fyGfSwWC6X3+nFg1wXgOZ2Cpoexc3kGU2GfuwNm5glb1rp5toAAAAASUVORK5CYII=",ot=()=>{const[e,t]=u.useState(!1),r="Dark",n=async()=>{t(s=>!s)};return a.jsxs("div",{onClick:n,className:_(v.userInfo,{[v.userInfoDark]:r==="Dark",[v.userInfoLight]:r==="Light",[v.userInfoViolet]:r==="Violet"}),children:[a.jsx("p",{className:v.userName,children:"Ivetta"}),a.jsx("img",{className:v.userAvatar,src:C,alt:"user avatar"}),e&&a.jsx("img",{style:{position:"absolute",top:54,left:20},src:C,alt:"user avatar"})]})},at=()=>{const e="Dark",{isDesktop:t}=Ae();return a.jsxs("header",{className:_(y.header,{[y.dark]:e==="Dark",[y.light]:e==="Light",[y.violet]:e==="Violet"}),children:[!t&&a.jsx(Ze,{}),a.jsx(Ke,{}),a.jsx(ot,{})]})},it=()=>a.jsx("div",{children:"Sidebar"}),j={},lt=()=>a.jsxs("div",{className:j.layoutContainer,children:[a.jsx(at,{}),a.jsx(it,{}),a.jsx("div",{className:j.contentWrapper,children:a.jsx(Q,{})})]});export{lt as default};
