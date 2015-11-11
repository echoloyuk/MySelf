# MySelf
-------------

## 关于MySelf

MySelf是一个极其简单的博客系统，它基于Node.js的Express框架建立的Web应用，使用MySQL作为数据库。

在未来，将计划使用MySelf作为自己的个人博客系统。这是一个练手的过程，也是一次项目实践。

## 数据库字段设计

### myself_article 

保存文章

* id
* title
* content
* category_id
* create_date
* update_date
* user_id

### myself_category

保存分类

* id
* name
* info
* create_date
* update_date

### myself_user

保存可编辑用户，该数据只有1条

* id
* username
* password
* sex
* info
* img_url

### myself_img

保存图片的对应关系

* id
* url
* refer_to_article_id
* size
* create_date