### 1、install dependencies
run npm i to install node dependencies
then see https://jekyllrb.com/docs/installation/ to choose your corresponding version, just to download homebrew chruby ruby jekyll

### 2、developing
after install all the dependencies,run`jekyll serve --livereload`to force the browser to refresh with every change, in other words, hot refresh.

or run `jekyll serve --watch`, but this one can not hot refresh. So the previous one is better.

when in developing, save ming-blog.less and it can automatically trans into ming-blog.css which can be use in preview.
when in production, copy the final .css into the css file. no more less file in production.

### Variable
| Variable     | file name | Description |
| ----------- | ----------- | -------- |
| site      | _config.yml     | 全局变量以及网站配置数据 |
|    | _drafts       | 草稿是未发布的文章。这些文件的命名格式是没有日期的：title.MARKUP。了解如何使用草稿。| 
| 可复用的模板 | _includes | 可复用的模板，例如head.html, footer.html |
||_layouts|这些是包装文章的模板。在YAML Front Matter中逐层选择布局，这将在下一节中介绍。 The liquid tag {{ content }}用于将内容注入网页。|
||_posts|这里是你的动态内容。这些文件的命名约定很重要，并且必须遵循以下格式：YEAR-MONTH-DAY-title.MARKUP。可以为每篇文章指定固定链接，但日期和MARKUP语言完全由文件名决定。|
|site.data|_data|使用.yml，.yaml，.json或.csv格式和扩展名，并且可以通过site.data访问它们。主要是全局信息|
||_sass|可以导入到main.scss中的sass部分，然后将它们处理成一个样式表main.css，该样式表定义了你的网站使用的样式。
|
||_site|这是Jekyll build生成的网站将被存放的（默认）位置。建议将它添加到.gitignore文件中。|
||.jekyll-metadata|临时文件，这些将帮助Jekyll追踪自上次构建站点后哪些文件未被修改，以及哪些文件需要在下一个版本中重新生成。该文件不会包含在生成的网站中。建议将它添加到.gitignore文件中。|
||index.html或index.md|网站的首页文件|
|site.post|_post|任意地方使用site.post可以获取_post中的文章|

