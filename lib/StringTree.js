class StringTree {
  constructor (options = {}) {
    this.ignoreCase = !!options.ignoreCase
    this._root = { c: '', k: {}, v: null, p: null }
  }

  set (key, value) {
    if(this.ignoreCase) key = key.toLowerCase()
    var n = this._root
    for (var i in key) {
      var c = key[i]
      if (!(c in n.k)) {
        n.k[c] = { c: c, k: {}, v: null, p: n }
      }
      n = n.k[c]
    }
    n.v = value
  }

  get (key) {
    var { n } = this.getNode(key)
    if (n === null) return null
    return n.v
  }

  getNode (key) {
    if(this.ignoreCase) key = key.toLowerCase()
    var n = this._root; var l = null
    for (var i in key) {
      var c = key[i]
      if (n.v !== null) { l = n }
      if (!(c in n.k)) return { n: null, l: l }
      n = n.k[c]
    }
    return { n: n, l: l }
  }

  clear (key) {
    var { n } = this.getNode(key)
    if (n === null) return
    n.v = null

    while (n !== null) {
      // Node has value
      if (n.v !== null) return
      // Node has subkeys
      if (Object.keys(n.k).length > 0) return
      // Delete node
      var p = n.p
      delete p.k[n.c]
      n = p
    }
  }

  partial (key) {
    var { n, l } = this.getNode(key)
    if (n !== null) return n.v
    if (l !== null) return l.v
    return null
  }

  prefix (key) {
    if(this.ignoreCase) key = key.toLowerCase()
    var out = {}

    var fw = (n, sf) => {
      if (n.v != null) { out[sf] = n.v }
      for (var i in n.k) { fw(n.k[i], sf + i) }
    }

    var { n } = this.getNode(key)
    if (n === null) return out
    fw(n, key)
    return out
  }
}

module.exports = StringTree
