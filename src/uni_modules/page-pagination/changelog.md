## 1.2.0（2023-06-21）
1. 更改样式使用scss，未安装的请自行安装；
2. 样式单位rpx更改为px;
3. 新增 不显示页码边框 属性；
4. 新增属性layout，自定义分页排版；
5. 新增每页条数预设值属性(pageSizes)，可选择每页条数，同时新增每页条数切换时触发的事件；
6. 移除showAround、showPageInfo和showGoPage属性，功能合并到layout中；
## 1.1.2（2022-11-09）
解决nvue页面样式错乱问题
## 1.1.0（2021-09-07）
1. 解决 currentPage设置初始值时，页码不准确；
2. 解决打开非第一页后再重新查询 ，当前页和跳转页都变成0；
## 1.0.9（2021-08-26）
1. 解决支付宝小程序在真机中，上页下页图标不显问题；
2. 优化支付宝小程序中自定义分页显示；
3. 优化图标，只取需要的图标，减小icon图标文件；
## 1.0.8（2021-07-29）
解决总页数为1时，仍可以点击下页或尾页的问题
## 1.0.6（2021-06-25）
1. 解决在 nvue 页面下显示不正常问题；
2. 去掉 css 部分使用的scss，方便在没有安装scss编译插件下也能够运行项目；
## 1.0.5（2021-05-25）
解决页数从0开始的问题；
## 1.0.4（2021-05-10）
1. 新增 设置显示页码的个数；
2. 新增 是否显示分页信息(总条数、每页条数等)；
3. 新增 页码input输入框，方便跳转页面；
## 1.0.3（2021-05-09）
修改部分样式
## 1.0.2（2021-05-09）
1. 新增 可设置页码按钮大小 ，设置属性 size；
2. 新增 可自定义页码颜色，设置属性 color;
## 1.0.1（2021-04-27）
修改事件的返回值，去掉上页下页等事件，合并为一个 change 事件，详细信息见下面事件说明。
## 1.0.0（2021-04-22）
第一次提交