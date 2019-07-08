# Scss

## 基本语法

#### 1. 变量声明

```scss
$write=23;
```

#### 2. 嵌套规则

例子：

```css
#content article h1 {
  color: #333;
}
#content article p {
  margin-bottom: 1.4em;
}
#content aside {
  background-color: #eee;
}
```

嵌套写

```scss
#content {
  article {
    h1 {
      color: #333;
    }
    p {
      margin-bottom: 1.4em;
    }
  }
  aside {
    background-color: #eee;
  }
}
```

编译后

```css
#content article h1 {
  color: #333;
}
#content article p {
  margin-bottom: 1.4em;
}
#content aside {
  background-color: #eee;
}
```

#### 3. 父选择器 &

&=父选择器

```scss
article a {
  &:hover {
    color: red;
  }
}
```

也就是

```css
article a:hover {
  color: red;
}
```

#### 4. 混合

如果有大量重用的样式，用混合器处理是个好方法
使用 @mixin 标识符定义，@include 来使用这个混合器

```scss
@mixin border-radius {
  -webkit-border-radius: 3px;
  border-radius: 3px;
} //声明混合宏border-radius
button {
  @include border-radius;
} //调用混合宏border-radius
```
