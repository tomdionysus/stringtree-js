# stringtree

[![Build Status](https://img.shields.io/travis/tomdionysus/stringtree-js/master.svg)](https://travis-ci.org/tomdionysus/stringtree-js)
[![Coverage Status](https://coveralls.io/repos/github/tomdionysus/stringtree-js/badge.svg?branch=master)](https://coveralls.io/github/tomdionysus/stringtree-js?branch=master)
[![NPM version](https://img.shields.io/npm/v/stringtree.svg)](https://www.npmjs.com/package/stringtree)

stringtree is a package to enable fast, forward only parsing of text, partial matches, typeahead search, and other functionality by building a prefix tree or *trie* from a set of key/value pairs.


## Installation
```bash
npm install stringtree
```

## Examples
```javascript
const { StringTree } = require('stringtree')

var st = new StringTree()

// Loading The Tree
st.set('relief',10)
st.set('sentence',20)
st.set('expect',20)
st.set('fisherman',30)
st.set('avenue',40)
st.set('path',50)
st.set('expected',60)
st.set('expectation',70)

// Simple Search
console.log('fisherman',st.get('fisherman'))

// Prefix Search (typeahead)
console.log('fish >',st.prefix('fish'))
console.log('exp >',st.prefix('exp'))

// Partial Search
console.log('expectations <',st.partial('expectations'))

```