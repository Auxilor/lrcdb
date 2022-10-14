"use strict";(self.webpackChunkauxilor_docs=self.webpackChunkauxilor_docs||[]).push([[4636],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return d}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var f=n.createContext({}),i=function(e){var t=n.useContext(f),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=i(e.components);return n.createElement(f.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,c=e.originalType,f=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),p=i(r),d=o,m=p["".concat(f,".").concat(d)]||p[d]||u[d]||c;return r?n.createElement(m,l(l({ref:t},s),{},{components:r})):n.createElement(m,l({ref:t},s))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=r.length,l=new Array(c);l[0]=p;var a={};for(var f in t)hasOwnProperty.call(t,f)&&(a[f]=t[f]);a.originalType=e,a.mdxType="string"==typeof e?e:o,l[1]=a;for(var i=2;i<c;i++)l[i]=r[i];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},4765:function(e,t,r){r.r(t),r.d(t,{assets:function(){return s},contentTitle:function(){return f},default:function(){return d},frontMatter:function(){return a},metadata:function(){return i},toc:function(){return u}});var n=r(7462),o=r(3366),c=(r(7294),r(3905)),l=["components"],a={},f="set_block",i={unversionedId:"effects/all-effects/set_block",id:"effects/all-effects/set_block",title:"set_block",description:"Triggered Effect",source:"@site/docs/effects/all-effects/set_block.md",sourceDirName:"effects/all-effects",slug:"/effects/all-effects/set_block",permalink:"/effects/all-effects/set_block",editUrl:"https://github.com/Auxilor/docs/tree/main/packages/create-docusaurus/templates/shared/docs/effects/all-effects/set_block.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"send_title",permalink:"/effects/all-effects/send_title"},next:{title:"set_freeze_ticks",permalink:"/effects/all-effects/set_freeze_ticks"}},s={},u=[{value:"Triggered Effect",id:"triggered-effect",level:4}],p={toc:u};function d(e){var t=e.components,r=(0,o.Z)(e,l);return(0,c.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"set_block"},(0,c.kt)("inlineCode",{parentName:"h1"},"set_block")),(0,c.kt)("h4",{id:"triggered-effect"},"Triggered Effect"),(0,c.kt)("p",null,"Set a block"),(0,c.kt)("h1",{id:"example-config"},"Example Config"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-yaml"},"- id: set_block\n  args:\n    block: diamond_ore # The block to set to\n  ...other config (eg triggers, filters, mutators, etc)\n")))}d.isMDXComponent=!0}}]);