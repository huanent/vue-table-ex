



# vue-table-ex 用vue实现的高级表格
![](https://raw.githubusercontent.com/huanent/vue-table-ex/master/docs/demo.gif)

## 表格主要特性有如下
- 键盘上下左右回车控制表格，摆脱鼠标
- 单元格可设置为下拉选择，文本输入和只读
- 下拉单元格支持搜索筛选
- 表格全局锁定编辑，行锁定编辑
- 行数据验证

## 安装
#### 安装方式一、使用下面命令安装npm包
```
npm i @huanent/table-ex
```
main.js文件

```
import tableEx from '@huanent/table-ex'
import '@huanent/table-ex/teble-ex.css'

Vue.use(tableEx)
```
#### 安装方式二、拷贝src/components/tableEx文件夹到项目（方便进行功能增减满足实际项目需求）
main.js文件

```
import tableEx from '实际目录/table-ex'

Vue.use(tableEx)
```
## 使用
```
 <table-ex>

      <thead-ex>
        <th-ex>列名</th-ex>
      </thead-ex>

      <tbody-ex>
        <tr-ex>
          <td-ex></td-ex>
        </tr-ex>
      </tbody-ex>

      <tfoot-ex>
        <td>合计</td>
      </tfoot-ex>

 </table-ex>
```

## API （待添加）
#### table-ex
###### 属性
|属性|类型|默认值|是否必须|说明|
|----|---|------|-------|----|
|auto-focus|bool|false|否|是否自动焦点第一个单元格|
|enable|bool|false|否|表格是否可编辑|
|show-index|bool|true|否|是否显示行号|
###### 事件
无
#### thead-ex
###### 属性
无
###### 事件
无
#### tbody-ex
###### 属性
无
###### 事件
无
#### tr-ex
###### 属性
|属性|类型|默认值|是否必须|说明|
|----|---|------|-------|-----|
|valid|bool|true|否|行数是否验证成功|
|validTip|bool|false|否|是否显示验证成功提示|
###### 事件
无
#### td-ex
|属性|类型|默认值|是否必须|说明|
|----|---|------|-------|-----|
|v-model|any|空字符串|否|单元格绑定数据|
|list|array|null|否|单元格下拉列表。如果有值，单元格变为下拉样式|
|display|string|null|否|下拉要显示的字段名|
|take|string|null|否|v-model要绑定的字段名|

###### 事件
无
#### tfoot-ex
###### 属性
无
###### 事件
无
