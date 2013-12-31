co-yongoose
===========

A mongoose REPL with yield support, based on [Co](https://github.com/visionmedia/co) and [mongoose-q](https://github.com/iolo/mongoose-q).

## Install

```
npm install -g co-yongoose
```

## Usage

```
$ co-yongoose -i example/models/post.js mongodb://localhost/test
> Model loaded:  Post
> post = new Post({title: 'foo'})
> yield post.saveQ()
> yield Post.findQ()
```

For more args, type `co-yongoose -h`
