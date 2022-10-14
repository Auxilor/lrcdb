"use strict";(self.webpackChunkauxilor_docs=self.webpackChunkauxilor_docs||[]).push([[2438],{3905:function(e,t,r){r.d(t,{Zo:function(){return f},kt:function(){return m}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},f=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,f=a(e,["components","mdxType","originalType","parentName"]),s=p(r),m=o,b=s["".concat(c,".").concat(m)]||s[m]||u[m]||i;return r?n.createElement(b,l(l({ref:t},f),{},{components:r})):n.createElement(b,l({ref:t},f))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,l=new Array(i);l[0]=s;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:o,l[1]=a;for(var p=2;p<i;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},4906:function(e,t,r){r.r(t),r.d(t,{assets:function(){return f},contentTitle:function(){return c},default:function(){return m},frontMatter:function(){return a},metadata:function(){return p},toc:function(){return u}});var n=r(7462),o=r(3366),i=(r(7294),r(3905)),l=["components"],a={},c="jobs_xp_multiplier",p={unversionedId:"effects/all-effects/jobs_xp_multiplier",id:"effects/all-effects/jobs_xp_multiplier",title:"jobs_xp_multiplier",description:"Permanent Effect",source:"@site/docs/effects/all-effects/jobs_xp_multiplier.md",sourceDirName:"effects/all-effects",slug:"/effects/all-effects/jobs_xp_multiplier",permalink:"/effects/all-effects/jobs_xp_multiplier",editUrl:"https://github.com/Auxilor/docs/tree/main/packages/create-docusaurus/templates/shared/docs/effects/all-effects/jobs_xp_multiplier.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"jobs_money_multiplier",permalink:"/effects/all-effects/jobs_money_multiplier"},next:{title:"keep_inventory",permalink:"/effects/all-effects/keep_inventory"}},f={},u=[{value:"Permanent Effect",id:"permanent-effect",level:4}],s={toc:u};function m(e){var t=e.components,r=(0,o.Z)(e,l);return(0,i.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"jobs_xp_multiplier"},(0,i.kt)("inlineCode",{parentName:"h1"},"jobs_xp_multiplier")),(0,i.kt)("h4",{id:"permanent-effect"},"Permanent Effect"),(0,i.kt)("p",null,"Multiplies xp gain from jobs"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Requires Jobs Reborn")),(0,i.kt)("h1",{id:"example-config"},"Example Config"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"- id: jobs_xp_multiplier\n  args:\n    multiplier: 1.5 # The experience multiplier\n    jobs: # The list of jobs to multiply xp for. If removed, it will multiply all jobs.\n      - miner\n      - fisherman\n")))}m.isMDXComponent=!0}}]);