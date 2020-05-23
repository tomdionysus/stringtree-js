/* eslint-env jasmine */

const StringTree = require('../lib/StringTree')

describe('StringTree', () => {
  var x1

  beforeEach(() => {
    x1 = new StringTree()
  })

  it('should allow New', () => {
    var x2 = new StringTree()

    expect(x1).not.toBe(x2)
  })

  describe('getNode', () => {
    beforeEach(() => {
      x1.set('library', 10)
      x1.set('concentrate', 20)
      x1.set('libation', 30)
      x1.set('reward', 40)
      x1.set('spotted', 50)
      x1.set('spear', 60)
      x1.set('Struck', 70)
      x1.set('SPEAR', 80)
    })

    it('should return correct nodes', () => {
      var { n, l } = x1.getNode('a')
      expect(n).toBeNull()
      expect(l).toBeNull()
    })

    it('should return correct nodes', () => {
      var { n, l } = x1.getNode('library')
      expect(n).not.toBeNull()
      expect(l).toBeNull()
    })

    it('should return correct nodes', () => {
      var { n, l } = x1.getNode('libation')
      expect(n).not.toBeNull()
      expect(l).toBeNull()
      expect(n.v).toEqual(30)
    })

    it('should respect case', () => {
      var { n, l } = x1.getNode('SPEAR')
      expect(n.v).toEqual(80)
    })

    it('should respect uppercase', () => {
      var { n, l } = x1.getNode('spear')
      expect(n.v).toEqual(60)
    })
  })

  describe('getNode (ignoreCase)', () => {
    beforeEach(() => {
      x1.ignoreCase = true

      x1.set('library', 10)
      x1.set('concentrate', 20)
      x1.set('libation', 30)
      x1.set('reward', 40)
      x1.set('spotted', 50)
      x1.set('spear', 60)
      x1.set('Struck', 70)
      x1.set('SPEAR', 80)
    })

    it('should respect case', () => {
      var { n, l } = x1.getNode('SPEAR')
      expect(n.v).toEqual(80)
    })

    it('should respect uppercase', () => {
      var { n, l } = x1.getNode('spear')
      expect(n.v).toEqual(80)
    })
  })

  describe('set & get', () => {
    it('should return correct values, or undefined', () => {
      x1.set('library', 10)
      x1.set('concentrate', 20)
      x1.set('libation', 30)
      x1.set('reward', 40)
      x1.set('spotted', 50)
      x1.set('spear', 60)

      expect(x1.get('reward')).toEqual(40)
      expect(x1.get('spotted')).toEqual(50)
      expect(x1.get('rooster')).toBeNull()
      expect(x1.get('sp')).toBeNull()
      expect(x1.get('libtar')).toBeNull()
    })
  })

  describe('clear', () => {
    it('should clear value for key', () => {
      x1.set('library', 10)
      x1.set('concentrate', 20)
      x1.set('libation', 30)
      x1.set('reward', 40)
      x1.set('spotted', 50)
      x1.set('spear', 60)

      x1.clear('libation')

      expect(x1.get('library')).toEqual(10)
      expect(x1.get('concentrate')).toEqual(20)
      expect(x1.get('libation')).toBeNull()
      expect(x1.get('reward')).toEqual(40)
      expect(x1.get('spotted')).toEqual(50)
      expect(x1.get('spear')).toEqual(60)
    })

    it('should not clear non-existent key', () => {
      x1.set('library', 10)
      x1.set('concentrate', 20)
      x1.set('libation', 30)
      x1.set('reward', 40)
      x1.set('spotted', 50)
      x1.set('spear', 60)

      x1.clear('speared')

      expect(x1.get('library')).toEqual(10)
      expect(x1.get('concentrate')).toEqual(20)
      expect(x1.get('libation')).toEqual(30)
      expect(x1.get('reward')).toEqual(40)
      expect(x1.get('spotted')).toEqual(50)
      expect(x1.get('spear')).toEqual(60)
    })

    it('should prune tree', () => {
      x1.set('beat', 20)
      x1.set('be', 10)

      x1.clear('beat')

      var { n, l } = x1.getNode('beat')
      expect(n).toBeNull()
      expect(l).not.toBeNull()
      expect(l.v).toEqual(10)
      expect(l.k).toEqual({})
    })
  })

  describe('partial', () => {
    it('should return value of nearest partial', () => {
      x1.set('library', 10)
      x1.set('concentrate', 20)
      x1.set('libation', 30)
      x1.set('reward', 40)
      x1.set('spotted', 50)
      x1.set('spear', 60)

      expect(x1.partial('a')).toBeNull()
      expect(x1.partial('li')).toBeNull()
      expect(x1.partial('concentration')).toBeNull()
      expect(x1.partial('rewarded')).toEqual(40)
    })
  })

  describe('prefix', () => {
    it('should return all possible values with prefix', () => {
      x1.set('library', 10)
      x1.set('concentrate', 20)
      x1.set('libation', 30)
      x1.set('reward', 40)
      x1.set('spotted', 50)
      x1.set('spear', 60)

      expect(x1.prefix('x')).toEqual({})
      expect(x1.prefix('l')).toEqual({ library: 10, libation: 30 })
      expect(x1.prefix('spo')).toEqual({ spotted: 50 })
      expect(x1.prefix('sp')).toEqual({ spotted: 50, spear: 60 })
    })
  })

  describe('prefix (ignoreCase)', () => {
    it('should return all possible values with prefix', () => {
      x1.ignoreCase = true

      x1.set('library', 10)
      x1.set('concentrate', 20)
      x1.set('libation', 30)
      x1.set('reward', 40)
      x1.set('spotted', 50)
      x1.set('spear', 60)

      expect(x1.prefix('x')).toEqual({})
      expect(x1.prefix('l')).toEqual({ library: 10, libation: 30 })
      expect(x1.prefix('SPO')).toEqual({ spotted: 50 })
      expect(x1.prefix('SP')).toEqual({ spotted: 50, spear: 60 })
    })
  })

  describe('tokenise', () => {
    it('should tokenise input text', () => {
      x1.set('library', 10)
      x1.set('concentrate', 20)
      x1.set('libation', 30)
      x1.set('reward', 40)
      x1.set('spotted', 50)
      x1.set('spear', 60)

      expect(x1.prefix('x')).toEqual({})
      expect(x1.prefix('l')).toEqual({ library: 10, libation: 30 })
      expect(x1.prefix('spo')).toEqual({ spotted: 50 })
      expect(x1.prefix('sp')).toEqual({ spotted: 50, spear: 60 })
    })
  })
})
