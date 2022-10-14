"use strict";(self.webpackChunkauxilor_docs=self.webpackChunkauxilor_docs||[]).push([[1802],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return g}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var f=n.createContext({}),l=function(e){var t=n.useContext(f),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(f.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,f=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),s=l(r),g=o,m=s["".concat(f,".").concat(g)]||s[g]||u[g]||i;return r?n.createElement(m,c(c({ref:t},p),{},{components:r})):n.createElement(m,c({ref:t},p))}));function g(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,c=new Array(i);c[0]=s;var a={};for(var f in t)hasOwnProperty.call(t,f)&&(a[f]=t[f]);a.originalType=e,a.mdxType="string"==typeof e?e:o,c[1]=a;for(var l=2;l<i;l++)c[l]=r[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},5864:function(e,t,r){r.r(t),r.d(t,{assets:function(){return p},contentTitle:function(){return f},default:function(){return g},frontMatter:function(){return a},metadata:function(){return l},toc:function(){return u}});var n=r(7462),o=r(3366),i=(r(7294),r(3905)),c=["components"],a={},f="give_job_xp",l={unversionedId:"effects/all-effects/give_job_xp",id:"effects/all-effects/give_job_xp",title:"give_job_xp",description:"Triggered Effect",source:"@site/docs/effects/all-effects/give_job_xp.md",sourceDirName:"effects/all-effects",slug:"/effects/all-effects/give_job_xp",permalink:"/effects/all-effects/give_job_xp",editUrl:"https://github.com/Auxilor/docs/tree/main/packages/create-docusaurus/templates/shared/docs/effects/all-effects/give_job_xp.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"give_item",permalink:"/effects/all-effects/give_item"},next:{title:"give_mcmmo_xp",permalink:"/effects/all-effects/give_mcmmo_xp"}},p={},u=[{value:"Triggered Effect",id:"triggered-effect",level:4}],s={toc:u};function g(e){var t=e.components,r=(0,o.Z)(e,c);return(0,i.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"give_job_xp"},(0,i.kt)("inlineCode",{parentName:"h1"},"give_job_xp")),(0,i.kt)("h4",{id:"triggered-effect"},"Triggered Effect"),(0,i.kt)("p",null,"Gives experience points for a certain job"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Requires EcoJobs")),(0,i.kt)("h1",{id:"example-config"},"Example Config"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"- id: give_job_xp\n  args:\n    amount: 100 # The amount of xp to give\n    job: miner # The job to give the xp for\n  ...other config (eg triggers, filters, mutators, etc)\n")))}g.isMDXComponent=!0}}]);