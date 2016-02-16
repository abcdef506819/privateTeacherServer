# privateTeacherServer
express + mongodb服务器构建
React Native项目，服务器端的构建，入门级学习资源 
客户端源代码可以前往 https://github.com/abcdef506819/privateTeacher  
之前想过将客户端和服务器端代码放在一个项目中，后来思来想去觉得还是分开来放较方便管理  
这样既把客户端和服务器端更加直观的感觉上独立了开来，在后期维护管理时也更加方便  
以后此服务器也可以托管其他应用的静态页面，或者变动比较频繁的页面之类
## mongodb使用说明
npm install mongodb -g 全局安装mongodb      
mongodb --dbpath /node/mongodata 运行mongodb并指定数据存储位置     
## 源代码下载
git clone git@github.com:abcdef506819/privateTeacher.git下载到本地  
npm install 安装依赖文件  
node app.js 运行程序     

由于刚搭建的数据库，里面并没有任何数据，相应的，我们页面展示也没有任何数据    
那么我们可以在数据库中插入数条数据，以期达到测试的目的    
由于时间有限，就只写了一部分功能，打开路由文件 ./routes/services/user.js我们可以看到    
app.get('/user/findteacher', this.findTeacher);即是相应的请求，要执行的操作     
顺着流程我们可以找到~/models/teacher.js这个模型      
里面我们可以看到db.collection('teachers', function (err, collection){.....})查找teachers数据集合（相当于关系数据库中的表），那么，我们就可以向teachers这张表中添加数据     
settings.js文件中我们还可以看到数据库名是teacherinfo    
## mongodb插入数据
终端命令行中 mongo 切换到mongo shell        
use teacherinfo 切换／创建数据库teacherinfo    
db.createCollection("teachers", {size: 20, capped: 5, max: 100});创建数据集合(表)    
for (var i = 1; i <= 30; i++) db.teachers.save({"id" : i, "name" : 'aaa',"date" : "2016-01-12", "cuts" : "12"});插入30条测试数据      

这时候我们就可以启动mongodb数据库，后台服务器，打开privateTeacher客户端应用看到展示效果了    
