co-yongoose
===========

A mongoose REPL with yield support, based on [Co](https://github.com/visionmedia/co) and [mongoose-q](https://github.com/iolo/mongoose-q).

## Install

```
npm install co-yongoose
```

## Usage

```
$ node --harmony examples/index.js 
> Model loaded:  Post
> post = new Post({title: 'foo'})
> yield post.saveQ()
> yield Post.findQ()
```
