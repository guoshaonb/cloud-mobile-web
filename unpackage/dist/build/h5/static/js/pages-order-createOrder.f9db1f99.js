(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-createOrder"],{"08a2":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{maskState:0,desc:"",payType:1,couponList:[{title:"新用户专享优惠券",price:5},{title:"庆五一发一波优惠券",price:10},{title:"优惠券优惠券优惠券优惠券",price:15}],addressData:{name:"许小星",mobile:"13853989563",addressName:"金九大道",address:"山东省济南市历城区",area:"149号",default:!1}}},onLoad:function(t){},methods:{toggleMask:function(t){var e=this,a="show"===t?10:300,i="show"===t?1:0;this.maskState=2,setTimeout((function(){e.maskState=i}),a)},numberChange:function(t){this.number=t.number},changePayType:function(t){this.payType=t},submit:function(){uni.redirectTo({url:"/pages/money/pay"})},stopPrevent:function(){}}};e.default=i},"1dac":function(t,e,a){"use strict";a.r(e);var i=a("d865"),s=a("e108");for(var n in s)"default"!==n&&function(t){a.d(e,t,(function(){return s[t]}))}(n);a("c83d");var o,c=a("f0c5"),l=Object(c["a"])(s["default"],i["b"],i["c"],!1,null,"7ba7351e",null,!1,i["a"],o);e["default"]=l.exports},2062:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-7ba7351e]{background:#f8f8f8;padding-bottom:%?100?%}.address-section[data-v-7ba7351e]{padding:%?30?% 0;background:#fff;position:relative}.address-section .order-content[data-v-7ba7351e]{display:flex;align-items:center}.address-section .icon-shouhuodizhi[data-v-7ba7351e]{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:%?90?%;color:#888;font-size:%?44?%}.address-section .cen[data-v-7ba7351e]{display:flex;flex-direction:column;flex:1;font-size:%?28?%;color:#303133}.address-section .name[data-v-7ba7351e]{font-size:%?34?%;margin-right:%?24?%}.address-section .address[data-v-7ba7351e]{margin-top:%?16?%;margin-right:%?20?%;color:#909399}.address-section .icon-you[data-v-7ba7351e]{font-size:%?32?%;color:#909399;margin-right:%?30?%}.address-section .a-bg[data-v-7ba7351e]{position:absolute;left:0;bottom:0;display:block;width:100%;height:%?5?%}.goods-section[data-v-7ba7351e]{margin-top:%?16?%;background:#fff;padding-bottom:1px}.goods-section .g-header[data-v-7ba7351e]{display:flex;align-items:center;height:%?84?%;padding:0 %?30?%;position:relative}.goods-section .logo[data-v-7ba7351e]{display:block;width:%?50?%;height:%?50?%;border-radius:100px}.goods-section .name[data-v-7ba7351e]{font-size:%?30?%;color:#606266;margin-left:%?24?%}.goods-section .g-item[data-v-7ba7351e]{display:flex;margin:%?20?% %?30?%}.goods-section .g-item uni-image[data-v-7ba7351e]{flex-shrink:0;display:block;width:%?140?%;height:%?140?%;border-radius:%?4?%}.goods-section .g-item .right[data-v-7ba7351e]{flex:1;padding-left:%?24?%;overflow:hidden}.goods-section .g-item .title[data-v-7ba7351e]{font-size:%?30?%;color:#303133}.goods-section .g-item .spec[data-v-7ba7351e]{font-size:%?26?%;color:#909399}.goods-section .g-item .price-box[data-v-7ba7351e]{display:flex;align-items:center;font-size:%?32?%;color:#303133;padding-top:%?10?%}.goods-section .g-item .price-box .price[data-v-7ba7351e]{margin-bottom:%?4?%}.goods-section .g-item .price-box .number[data-v-7ba7351e]{font-size:%?26?%;color:#606266;margin-left:%?20?%}.goods-section .g-item .step-box[data-v-7ba7351e]{position:relative}.yt-list[data-v-7ba7351e]{margin-top:%?16?%;background:#fff}.yt-list-cell[data-v-7ba7351e]{display:flex;align-items:center;padding:%?10?% %?30?% %?10?% %?40?%;line-height:%?70?%;position:relative}.yt-list-cell.cell-hover[data-v-7ba7351e]{background:#fafafa}.yt-list-cell.b-b[data-v-7ba7351e]:after{left:%?30?%}.yt-list-cell .cell-icon[data-v-7ba7351e]{height:%?32?%;width:%?32?%;font-size:%?22?%;color:#fff;text-align:center;line-height:%?32?%;background:#f85e52;border-radius:%?4?%;margin-right:%?12?%}.yt-list-cell .cell-icon.hb[data-v-7ba7351e]{background:#ffaa0e}.yt-list-cell .cell-icon.lpk[data-v-7ba7351e]{background:#3ab54a}.yt-list-cell .cell-more[data-v-7ba7351e]{align-self:center;font-size:%?24?%;color:#909399;margin-left:%?8?%;margin-right:%?-10?%}.yt-list-cell .cell-tit[data-v-7ba7351e]{flex:1;font-size:%?26?%;color:#909399;margin-right:%?10?%}.yt-list-cell .cell-tip[data-v-7ba7351e]{font-size:%?26?%;color:#303133}.yt-list-cell .cell-tip.disabled[data-v-7ba7351e]{color:#909399}.yt-list-cell .cell-tip.active[data-v-7ba7351e]{color:#fa436a}.yt-list-cell .cell-tip.red[data-v-7ba7351e]{color:#fa436a}.yt-list-cell.desc-cell .cell-tit[data-v-7ba7351e]{max-width:%?90?%}.yt-list-cell .desc[data-v-7ba7351e]{flex:1;font-size:%?28?%;color:#303133}\n/* 支付列表 */.pay-list[data-v-7ba7351e]{padding-left:%?40?%;margin-top:%?16?%;background:#fff}.pay-list .pay-item[data-v-7ba7351e]{display:flex;align-items:center;padding-right:%?20?%;line-height:1;height:%?110?%;position:relative}.pay-list .icon-weixinzhifu[data-v-7ba7351e]{width:%?80?%;font-size:%?40?%;color:#6bcc03}.pay-list .icon-alipay[data-v-7ba7351e]{width:%?80?%;font-size:%?40?%;color:#06b4fd}.pay-list .icon-xuanzhong2[data-v-7ba7351e]{display:flex;align-items:center;justify-content:center;width:%?60?%;height:%?60?%;font-size:%?40?%;color:#fa436a}.pay-list .tit[data-v-7ba7351e]{font-size:%?32?%;color:#303133;flex:1}.footer[data-v-7ba7351e]{position:fixed;left:0;bottom:0;z-index:995;display:flex;align-items:center;width:100%;height:%?90?%;justify-content:space-between;font-size:%?30?%;background-color:#fff;z-index:998;color:#606266;box-shadow:0 -1px 5px rgba(0,0,0,.1)}.footer .price-content[data-v-7ba7351e]{padding-left:%?30?%}.footer .price-tip[data-v-7ba7351e]{color:#fa436a;margin-left:%?8?%}.footer .price[data-v-7ba7351e]{font-size:%?36?%;color:#fa436a}.footer .submit[data-v-7ba7351e]{display:flex;align-items:center;justify-content:center;width:%?280?%;height:100%;color:#fff;font-size:%?32?%;background-color:#fa436a}\n/* 优惠券面板 */.mask[data-v-7ba7351e]{display:flex;align-items:flex-end;position:fixed;left:0;top:var(--window-top);bottom:0;width:100%;background:transparent;z-index:9995;transition:.3s}.mask .mask-content[data-v-7ba7351e]{width:100%;min-height:30vh;max-height:70vh;background:#f3f3f3;-webkit-transform:translateY(100%);transform:translateY(100%);transition:.3s;overflow-y:scroll}.mask.none[data-v-7ba7351e]{display:none}.mask.show[data-v-7ba7351e]{background:rgba(0,0,0,.4)}.mask.show .mask-content[data-v-7ba7351e]{-webkit-transform:translateY(0);transform:translateY(0)}\n/* 优惠券列表 */.coupon-item[data-v-7ba7351e]{display:flex;flex-direction:column;margin:%?20?% %?24?%;background:#fff}.coupon-item .con[data-v-7ba7351e]{display:flex;align-items:center;position:relative;height:%?120?%;padding:0 %?30?%}.coupon-item .con[data-v-7ba7351e]:after{position:absolute;left:0;bottom:0;content:"";width:100%;height:0;border-bottom:1px dashed #f3f3f3;-webkit-transform:scaleY(50%);transform:scaleY(50%)}.coupon-item .left[data-v-7ba7351e]{display:flex;flex-direction:column;justify-content:center;flex:1;overflow:hidden;height:%?100?%}.coupon-item .title[data-v-7ba7351e]{font-size:%?32?%;color:#303133;margin-bottom:%?10?%}.coupon-item .time[data-v-7ba7351e]{font-size:%?24?%;color:#909399}.coupon-item .right[data-v-7ba7351e]{display:flex;flex-direction:column;justify-content:center;align-items:center;font-size:%?26?%;color:#606266;height:%?100?%}.coupon-item .price[data-v-7ba7351e]{font-size:%?44?%;color:#fa436a}.coupon-item .price[data-v-7ba7351e]:before{content:"￥";font-size:%?34?%}.coupon-item .tips[data-v-7ba7351e]{font-size:%?24?%;color:#909399;line-height:%?60?%;padding-left:%?30?%}.coupon-item .circle[data-v-7ba7351e]{position:absolute;left:%?-6?%;bottom:%?-10?%;z-index:10;width:%?20?%;height:%?20?%;background:#f3f3f3;border-radius:100px}.coupon-item .circle.r[data-v-7ba7351e]{left:auto;right:%?-6?%}body.?%PAGE?%[data-v-7ba7351e]{background:#f8f8f8}',""]),t.exports=e},bb48:function(t,e,a){var i=a("2062");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=a("4f06").default;s("37ecafbc",i,!0,{sourceMap:!1,shadowMode:!1})},c83d:function(t,e,a){"use strict";var i=a("bb48"),s=a.n(i);s.a},d865:function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}));var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-navigator",{staticClass:"address-section",attrs:{url:"/pages/address/address?source=1"}},[a("v-uni-view",{staticClass:"order-content"},[a("v-uni-text",{staticClass:"yticon icon-shouhuodizhi"}),a("v-uni-view",{staticClass:"cen"},[a("v-uni-view",{staticClass:"top"},[a("v-uni-text",{staticClass:"name"},[t._v(t._s(t.addressData.name))]),a("v-uni-text",{staticClass:"mobile"},[t._v(t._s(t.addressData.mobile))])],1),a("v-uni-text",{staticClass:"address"},[t._v(t._s(t.addressData.address)+" "+t._s(t.addressData.area))])],1),a("v-uni-text",{staticClass:"yticon icon-you"})],1),a("v-uni-image",{staticClass:"a-bg",attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"}})],1),a("v-uni-view",{staticClass:"goods-section"},[a("v-uni-view",{staticClass:"g-header b-b"},[a("v-uni-image",{staticClass:"logo",attrs:{src:"http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png"}}),a("v-uni-text",{staticClass:"name"},[t._v("西城小店铺")])],1),a("v-uni-view",{staticClass:"g-item"},[a("v-uni-image",{attrs:{src:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=756705744,3505936868&fm=11&gp=0.jpg"}}),a("v-uni-view",{staticClass:"right"},[a("v-uni-text",{staticClass:"title clamp"},[t._v("古黛妃 短袖t恤女夏装2019新款")]),a("v-uni-text",{staticClass:"spec"},[t._v("春装款 L")]),a("v-uni-view",{staticClass:"price-box"},[a("v-uni-text",{staticClass:"price"},[t._v("￥17.8")]),a("v-uni-text",{staticClass:"number"},[t._v("x 1")])],1)],1)],1),a("v-uni-view",{staticClass:"g-item"},[a("v-uni-image",{attrs:{src:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg"}}),a("v-uni-view",{staticClass:"right"},[a("v-uni-text",{staticClass:"title clamp"},[t._v("韩版于是洞洞拖鞋 夏季浴室防滑简约居家【新人专享，限选意见】")]),a("v-uni-text",{staticClass:"spec"},[t._v("春装款 L")]),a("v-uni-view",{staticClass:"price-box"},[a("v-uni-text",{staticClass:"price"},[t._v("￥17.8")]),a("v-uni-text",{staticClass:"number"},[t._v("x 1")])],1)],1)],1)],1),a("v-uni-view",{staticClass:"yt-list"},[a("v-uni-view",{staticClass:"yt-list-cell b-b",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toggleMask("show")}}},[a("v-uni-view",{staticClass:"cell-icon"},[t._v("券")]),a("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("优惠券")]),a("v-uni-text",{staticClass:"cell-tip active"},[t._v("选择优惠券")]),a("v-uni-text",{staticClass:"cell-more wanjia wanjia-gengduo-d"})],1),a("v-uni-view",{staticClass:"yt-list-cell b-b"},[a("v-uni-view",{staticClass:"cell-icon hb"},[t._v("减")]),a("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("商家促销")]),a("v-uni-text",{staticClass:"cell-tip disabled"},[t._v("暂无可用优惠")])],1)],1),a("v-uni-view",{staticClass:"yt-list"},[a("v-uni-view",{staticClass:"yt-list-cell b-b"},[a("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("商品金额")]),a("v-uni-text",{staticClass:"cell-tip"},[t._v("￥179.88")])],1),a("v-uni-view",{staticClass:"yt-list-cell b-b"},[a("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("优惠金额")]),a("v-uni-text",{staticClass:"cell-tip red"},[t._v("-￥35")])],1),a("v-uni-view",{staticClass:"yt-list-cell b-b"},[a("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("运费")]),a("v-uni-text",{staticClass:"cell-tip"},[t._v("免运费")])],1),a("v-uni-view",{staticClass:"yt-list-cell desc-cell"},[a("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("备注")]),a("v-uni-input",{staticClass:"desc",attrs:{type:"text",placeholder:"请填写备注信息","placeholder-class":"placeholder"},model:{value:t.desc,callback:function(e){t.desc=e},expression:"desc"}})],1)],1),a("v-uni-view",{staticClass:"footer"},[a("v-uni-view",{staticClass:"price-content"},[a("v-uni-text",[t._v("实付款")]),a("v-uni-text",{staticClass:"price-tip"},[t._v("￥")]),a("v-uni-text",{staticClass:"price"},[t._v("475")])],1),a("v-uni-text",{staticClass:"submit",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v("提交订单")])],1),a("v-uni-view",{staticClass:"mask",class:0===t.maskState?"none":1===t.maskState?"show":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toggleMask.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"mask-content",on:{click:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.stopPrevent.apply(void 0,arguments)}}},t._l(t.couponList,(function(e,i){return a("v-uni-view",{key:i,staticClass:"coupon-item"},[a("v-uni-view",{staticClass:"con"},[a("v-uni-view",{staticClass:"left"},[a("v-uni-text",{staticClass:"title"},[t._v(t._s(e.title))]),a("v-uni-text",{staticClass:"time"},[t._v("有效期至2019-06-30")])],1),a("v-uni-view",{staticClass:"right"},[a("v-uni-text",{staticClass:"price"},[t._v(t._s(e.price))]),a("v-uni-text",[t._v("满30可用")])],1),a("v-uni-view",{staticClass:"circle l"}),a("v-uni-view",{staticClass:"circle r"})],1),a("v-uni-text",{staticClass:"tips"},[t._v("限新用户使用")])],1)})),1)],1)],1)},n=[]},e108:function(t,e,a){"use strict";a.r(e);var i=a("08a2"),s=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=s.a}}]);