import{_ as C,D}from"./index.2323aac0.js";import{d as B,K as F,r as w,o as x,R as I,e as i,f as v,j as y,w as a,h as e,k as t,t as _,i as r,g as S,p as E,n as k}from"./vendor.9dd18d83.js";const p=s=>(E("data-v-18874200"),s=s(),k(),s),N={class:"data"},O=p(()=>e("div",null,[e("span",null,"\u8BA2\u5355\u72B6\u6001")],-1)),j=p(()=>e("div",null,[e("span",null,"\u521B\u5EFA\u65F6\u95F4")],-1)),A=p(()=>e("div",null,[e("span",null,"\u8BA2\u5355\u53F7")],-1)),R=["src"],V=B({setup(s){const g=F(),{id:h}=g.query,d=w({orderData:{},tableData:[]});x(async()=>{const c=await D(h),{data:l}=c;d.orderData=l,d.tableData=l.newBeeMallOrderItemVOS,console.log(l)});const{orderData:u,tableData:f}=I(d);return(c,l)=>{const n=i("el-card"),o=i("el-table-column"),b=i("el-table");return v(),y(n,{class:"order-container"},{default:a(()=>[e("div",N,[t(n,{class:"data-item",shadow:"never"},{header:a(()=>[O]),default:a(()=>[e("div",null,_(r(u).orderStatusString),1)]),_:1}),t(n,{class:"data-item",shadow:"never"},{header:a(()=>[j]),default:a(()=>[e("div",null,_(r(u).createTime),1)]),_:1}),t(n,{class:"data-item",shadow:"never"},{header:a(()=>[A]),default:a(()=>[e("div",null,_(r(u).orderNo),1)]),_:1})]),t(b,{data:r(f),border:!0},{default:a(()=>[t(o,{label:"\u5546\u54C1\u56FE\u7247",align:"center"},{default:a(({row:m})=>[(v(),S("img",{key:m.goodsId,src:c.$filters.prefix(m.goodsCoverImg),alt:"\u5546\u54C1\u4E3B\u56FE",style:{width:"100px",height:"100px"}},null,8,R))]),_:1}),t(o,{label:"\u5546\u54C1\u7F16\u53F7",prop:"goodsId",align:"center"}),t(o,{label:"\u5546\u54C1\u540D",prop:"goodsName",align:"center"}),t(o,{label:"\u5546\u54C1\u6570\u91CF",prop:"goodsCount",align:"center"}),t(o,{label:"\u4EF7\u683C",prop:"sellingPrice",align:"center"})]),_:1},8,["data"])]),_:1})}}});var K=C(V,[["__scopeId","data-v-18874200"]]);export{K as default};