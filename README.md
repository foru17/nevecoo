# nevecoo

![cover](https://luoleiorg.b0.upaiyun.com/blog/2015/02/https-ssl.jpg)

Nevecoo 是一款Ghost主题


#使用前必读！！！！！

**使用这个主题的朋友，请务必修改自定义配置**

相信用Ghost的朋友都有一定的基础，请务必注意相关配置。



####需自定义的配置

1. `post.hbs`中的多说配置
2. `default.hbs`顶部百度统计代码
3. `default.hbs`底部GA统计代码
4. `default.hbs` 顶部 谷歌Plus ` <link rel="author" href="https://plus.google.com/105790146178074084423/">`请修改成自己的GP地址（谷歌搜索的时候会显示作者信息）
5. 微信浏览器中增加适配，滑动到底部的时候，自动弹出公众号图片，若不需要，请删除`js/base.js`中相关代码。例`General.isweixin == true `。


####新主题

[《「辞旧迎新」新主题,更安全的罗磊独立博客》](https://luolei.org/theme-nevecoo/)


Github地址:[Nevecoo](https://github.com/foru17/nevecoo).

博客主题一直用的去年原创的[Ghostwill](https://luolei.org/theme-ghostwill/)，感觉十分粗糙，代码也写得糟糕。

这次新的主题名为[Nevecoo](https://github.com/foru17/nevecoo)，名字没啥特别意思，从0到1，自己设计、重构，也算是小练手一番。

![](https://luoleiorg.b0.upaiyun.com/blog/2015/02/nevecoo6.jpg)

主题采用的Sketch制作原型和设计。

![](https://luoleiorg.b0.upaiyun.com/blog/2015/02/nevecoo1.jpg)

简约和大Banner的设计。

![](https://luoleiorg.b0.upaiyun.com/blog/2015/02/nevecoo2.jpg)

优化阅读体验，更加关注于内容，删除了干扰用户阅读的多余元素。

![](https://luoleiorg.b0.upaiyun.com/blog/2015/02/nevecoo3.jpg)

优化了在手机和平板上的阅读体验，现在越来越多的朋友使用移动设备阅读，给他们提供好的体验是前端开发者的责任。

![](https://luoleiorg.b0.upaiyun.com/blog/2015/02/nevecoo4.jpg)

支持primejs，方便在文章中高亮不同的代码。

现在Nevecoo 版本号还是0.0.2，在Github上开源，年后将继续优化交互细节，优化前端性能。




####TO-DO

- [ ] 代码结构重新组织
- [ ] 顶部Nav
- [ ] gulpfile重新配置
- [ ] 视频的适配
- [ ] ReactJS清凉版

####更新

* 2015.4.6 : 增加返回首页按钮,重新组织JS代码，jquery.s使用CDN，增加微信浏览器中的提示。
