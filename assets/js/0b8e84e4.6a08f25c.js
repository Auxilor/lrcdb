"use strict";(self.webpackChunkauxilor_docs=self.webpackChunkauxilor_docs||[]).push([[9160],{3905:function(e,t,r){r.d(t,{Zo:function(){return f},kt:function(){return p}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),d=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},f=function(e){var t=d(e.components);return n.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,f=l(e,["components","mdxType","originalType","parentName"]),u=d(r),p=a,m=u["".concat(c,".").concat(p)]||u[p]||s[p]||o;return r?n.createElement(m,i(i({ref:t},f),{},{components:r})):n.createElement(m,i({ref:t},f))}));function p(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var d=2;d<o;d++)i[d]=r[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},7966:function(e,t,r){r.r(t),r.d(t,{assets:function(){return f},contentTitle:function(){return c},default:function(){return p},frontMatter:function(){return l},metadata:function(){return d},toc:function(){return s}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=["components"],l={},c="add_holder_in_radius",d={unversionedId:"effects/all-effects/add_holder_in_radius",id:"effects/all-effects/add_holder_in_radius",title:"add_holder_in_radius",description:"Triggered Effect",source:"@site/docs/effects/all-effects/add_holder_in_radius.md",sourceDirName:"effects/all-effects",slug:"/effects/all-effects/add_holder_in_radius",permalink:"/effects/all-effects/add_holder_in_radius",editUrl:"https://github.com/Auxilor/docs/tree/main/packages/create-docusaurus/templates/shared/docs/effects/all-effects/add_holder_in_radius.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"add_holder",permalink:"/effects/all-effects/add_holder"},next:{title:"add_permanent_holder_in_radius",permalink:"/effects/all-effects/add_permanent_holder_in_radius"}},f={},s=[{value:"Triggered Effect",id:"triggered-effect",level:4}],u={toc:s};function p(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"add_holder_in_radius"},(0,o.kt)("inlineCode",{parentName:"h1"},"add_holder_in_radius")),(0,o.kt)("h4",{id:"triggered-effect"},"Triggered Effect"),(0,o.kt)("p",null,"Gives a custom holder temporarily for a given period of time"),(0,o.kt)("p",null,"A holder is anything with effects and conditions, in plugins typically a Talisman, Armor Set, etc."),(0,o.kt)("p",null,"You can create custom holders temporarily and give them on a trigger, for example to give permanent effects for a period of time to people around you."),(0,o.kt)("h1",{id:"example-config"},"Example Config"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"- id: add_holder_in_radius\n  args:\n    effects: \n      - id: movement_speed_multiplier\n        args:\n          multiplier: 1.25\n    conditions: []\n    duration: 300 # The duration, in ticks\n    radius: 5.3 # The radius, in blocks\n    apply-to-self: false # If the player should also get the holder (Defaults to false)\n  ...other config (eg triggers, filters, mutators, etc)\n")))}p.isMDXComponent=!0}}]);