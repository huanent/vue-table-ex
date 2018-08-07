# vue-table-ex 用vue实现的高级表格
![](https://raw.githubusercontent.com/huanent/vue-table-ex/master/docs/demo.gif)

## 表格主要特性有如下
- 键盘上下左右回车控制表格，摆脱鼠标
- 单元格可设置为下拉选择，文本输入和只读
- 下拉单元格支持搜索筛选
- 表格全局锁定编辑，行锁定编辑
- 行数据验证

## 基本使用
使用下面命令安装npm包
```
npm i @huanent/table-ex
```
main.js文件

```
import tableEx from '@huanent/table-ex'
import '@huanent/table-ex/teble-ex.css'

Vue.use(tableEx)
```
vue文件中
```
 <table-ex>

      <thead-ex>
        <th-ex></th-ex>
      </thead-ex>

      <tbody-ex>
        <tr-ex>
          <td-ex></td-ex>
        </tr-ex>
      </tbody-ex>

      <tfoot-ex>
        <td></td>
      </tfoot-ex>

 </table-ex>
```

## API （待添加）
