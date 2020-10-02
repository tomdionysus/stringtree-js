export class StringTree<V = unknown> {
  constructor(options?: { ignoreCase: boolean = false } = {});

  /**
   * Set the value of the specified key.
   */
  set(key: string, value: V): void;

  /**
   * Get the value of the specified key if the value has been set,
   * otherwise null.
   */
  get(key: string): V | null;

  /**
   * Search for the specified string. The search results will
   * contain the node for this string in `n`, if there is one (else
   * `null`), and the last found node with a value in `l`.
   */
  getNode(key: string): StringTree.NodeSearchResult<V>;

  /**
   * Remove the value with the specified key, if there is one.
   */
  clear(key: string): void;

  /**
   * Find the value with the longest prefix of the given key, or null
   * if there are no values set for any prefixes of the given key.
   */
  partial(key: string): V;

  /**
   * Find all values whose keys have the specified key as a prefix
   * (including any value defined for the key).
   */
  prefix(key: string): Record<string, V>;

  /**
   * Find the value whose key has the longest prefix of the given string,
   * where the key starts at `offset` index into `str` and stops before
   * index `limit`.
   * @param str A string containing the key to look for.
   * @param offset The starting offset into `str` of the key to look for
   * @param limit The limiting offset into `str` of the key to look for.
   *
   * @returns An object with the value that has the longest prefix
   * of the specified substring, and the offset into the given string
   * where the key of the value ends.
   */
  parse(
    str: string,
    offset: number = 0,
    limit: number = str.length
  ): { offset: number; value: V | null };
}

declare namespace StringTree {
  export type Character = string & { length: 0 | 1 };

  export interface Node<V> {
    c: Character;

    /**
     * Child nodes.
     */
    k: Record<Character, Node>;

    /**
     * The value at this node, or `null` if no value is defined for
     * the key.
     */
    v: V | null;

    /**
     * The parent node.
     */
    p: Node;
  }

  /**
   * Represents the results of searching the tree for a specific key.
   */
  export interface NodeSearchResult<V> {
    /**
     * The node with the requested key, or null if the node doesn't
     * exist. The node will exist if there is a value defined for the
     * requested key, or if the requested key is a prefix of any
     * defined keys.
     */
    n: Node<V> | null;

    /**
     * The node with the longest prefix of the requested key that actually
     * has a value defined.
     */
    l: Node<V> | null;
  }
}
