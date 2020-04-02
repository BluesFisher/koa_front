### 工程目的

> koa_front: 配合 koa_sys 使用

### 工程主要结构

1、vue.config.js：应用配置入口，已经做了基本配置，不能随意变更

2、tslint.json：tslint 检查配置入口，根据前端代码检查规范进行了配置，不能随意变更

3、tsconfig.json：tslint 检查配置入口，根据前端代码检查规范进行了配置，不能随意变更

4、src/assetes：静态资源目录，包括 css 静态样式（全局样式生命，reset 样式）、images 静态图片、js 第三方库文件

5、src/components：公共组件库

6、src/mixins：全局 minxins，目前做了基本的 mixin 配置

7、src/pages：主页面文件，目录根据路由划分，不对应路由的，不能单独建立文件或文件夹

8、src/router：路由配置文件夹，路由通过懒加载的方式配置在 routes.js 中

9、src/store：vuex 状态管理入口，包括 vuex 基础配置，modules 配置

10、src/utils：公共函数模块，目前包括 crtpy 加解密模块、api-group 接口声明模块

11、src/plugins：全局变量注入，包括$axios、 $mtaH5、 \$timeReport

12、main.ts：主入口文件，vue 全局设置，router 守卫

13、shims-vue.d.ts、shims-tsx.d.ts：全局包、全局变量声明文件

#### 构建流程

```
# 安装依赖
$ tnpm install

# 本地开发环境
$ npm run dev
默认访问地址：http://localhost:8080

# 打包
$ npm run build
生成dist，检查无误后进行代码上传
```
