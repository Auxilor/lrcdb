"use strict";(self.webpackChunkauxilor_docs=self.webpackChunkauxilor_docs||[]).push([[2995],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return d}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),f=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=f(e.components);return n.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,l=e.originalType,i=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),s=f(r),d=o,m=s["".concat(i,".").concat(d)]||s[d]||p[d]||l;return r?n.createElement(m,c(c({ref:t},u),{},{components:r})):n.createElement(m,c({ref:t},u))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=r.length,c=new Array(l);c[0]=s;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a.mdxType="string"==typeof e?e:o,c[1]=a;for(var f=2;f<l;f++)c[f]=r[f];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},7528:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return i},default:function(){return d},frontMatter:function(){return a},metadata:function(){return f},toc:function(){return p}});var n=r(7462),o=r(3366),l=(r(7294),r(3905)),c=["components"],a={},i="pull_to_location",f={unversionedId:"effects/all-effects/pull_to_location",id:"effects/all-effects/pull_to_location",title:"pull_to_location",description:"Triggered Effect",source:"@site/docs/effects/all-effects/pull_to_location.md",sourceDirName:"effects/all-effects",slug:"/effects/all-effects/pull_to_location",permalink:"/effects/all-effects/pull_to_location",editUrl:"https://github.com/Auxilor/docs/tree/main/packages/create-docusaurus/templates/shared/docs/effects/all-effects/pull_to_location.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"pull_in",permalink:"/effects/all-effects/pull_in"},next:{title:"regen_multiplier",permalink:"/effects/all-effects/regen_multiplier"}},u={},p=[{value:"Triggered Effect",id:"triggered-effect",level:4}],s={toc:p};function d(e){var t=e.components,r=(0,o.Z)(e,c);return(0,l.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"pull_to_location"},(0,l.kt)("inlineCode",{parentName:"h1"},"pull_to_location")),(0,l.kt)("h4",{id:"triggered-effect"},"Triggered Effect"),(0,l.kt)("p",null,"Get pulled to a location"),(0,l.kt)("h1",{id:"example-config"},"Example Config"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"- id: pull_to_location\n  args:\n    velocity: 1.5 # The speed at which to be pulled (magnitude of the velocity vector)\n  ...other config (eg triggers, filters, mutators, etc)\n")))}d.isMDXComponent=!0}}]);