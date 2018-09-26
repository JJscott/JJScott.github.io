---
layout: post
title:  "Post Example"
date:   2000-12-31 14:10:50 +1200
categories: [Template]
tags: [Jekyll, Kramdown, Testing]
description: A Post example written in kramdom for testing elements.
mathjax: true
---

Main description of the post goes here.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet ipsum purus, ac egestas lorem pretium eget. Maecenas auctor rhoncus nulla tincidunt scelerisque. Vivamus luctus libero laoreet condimentum imperdiet. Praesent sed porta enim, ut fermentum nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut vitae arcu euismod, luctus neque nec, mollis dui. Quisque iaculis quam lorem, convallis aliquam dolor cursus ut. Vivamus nisl dui, mattis ac tristique vitae, dictum in nisi. Nullam nec dui ac magna commodo pulvinar.

Vivamus non sem at nunc faucibus luctus vitae vitae lorem. Aliquam tempus bibendum ullamcorper. Praesent posuere tellus ut tempor vulputate. Nullam vel dictum sem, eu rutrum nibh. In finibus condimentum sapien, vel placerat arcu pellentesque eu. Duis non pretium nibh. Integer eleifend faucibus massa sed condimentum. In molestie neque et enim aliquet, non varius tellus tincidunt. Aliquam ullamcorper ipsum dui, a maximus erat vehicula ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Curabitur vel leo nisi. Nam dictum nisl urna, eu vestibulum nisl vehicula tincidunt. Vivamus vitae ligula dignissim, semper erat a, faucibus nibh. Quisque id quam nec mauris ultricies luctus. Mauris tincidunt magna augue, vitae lacinia justo tincidunt vitae. Nam lacinia pretium laoreet. Donec iaculis eros at pulvinar gravida. In aliquet eleifend vestibulum. Quisque id nibh efficitur, commodo mi sed, egestas ipsum. Pellentesque sed ex in nulla viverra consequat quis id elit. Sed elementum et justo ac sollicitudin. Donec tempus semper arcu non dictum. Vestibulum vehicula orci sit amet venenatis blandit. In congue aliquet eleifend.

<!-- Table of contents goes first -->
1. TOC
{:toc}



# h1 Headings should all be \{:.no_toc\}
{:.no_toc}
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

Requires 3 or more `-`, `*`, or `_`.

___

---

***


## Emphasis

Italics are a single surrounding `_` or `*` whereas bold is a double surounding `__` or `**`.

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Indentation matter, the marker doesn't:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

Using just  `1.`:

1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`


## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

```
Sample text here...
```

Syntax highlighting

``` ruby
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
```
Better highlighting?

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Center and Right aligned columns with footer

| Header |
| Option | Description |
|:------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
|========|=============|
| Footer |

## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")


## Footnotes / References

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].


## Mafs

Inline math equation: $$\omega = d\phi / dt$$. Display
math should get its own line like so:

$$I = \int \rho R^{2} dV$$

And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.

---

[^first]: Footnote **can have markup** and multiple paragraphs.

[^second]: Footnote text.

