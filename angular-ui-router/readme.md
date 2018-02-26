## ui-router

### 三要素：
* <router-outlet> 占位符
* <a routerLink></a> => router.navigate() 路有链接
* Routes 路由配置


### 传参方式：
* 查询参数中传递数据

    `?id=1&name=2 -> ActivatedRoute.queryParams['id'];`
* 在URL中传递参数
 
    `{path:'/content/:id'} /content/1 -> ActivatedRoute.params['id]`
* 在路由配置中传递数据

    `{path:/content, component: ContentCompoment, data:[{isContent:true}]} 
        -> ActivatedRoute.data[0][isContent]`
        
        
### 重定向、子路由
    `重定向：{path:'', redirectTo:'/home',pathMatch:'full'}`
    `辅助路由：{path:'chat', component: ChatComponent, outlet:'aux'}`
    `子路由：children`
### 路由守卫
    `进入：CanActivate
    `离开：CanDeactivate
    `激活之前获取路由数据：Resolve，预加载数据
    
### 路由实现方式   
hash http://localhost:3000/#/list?id=1;

path http://localhost:3000/list?id=1;(服务端渲染)