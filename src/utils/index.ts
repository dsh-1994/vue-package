/** 在树结构内查找某一项 */
export function findTree<T extends Record<string, any>>(
  tree: T[],
  value: string,
  option: { keyField: string; childField: string } = {
    keyField: "value",
    childField: "children",
  }
): T | undefined {
  let item: T | undefined = undefined;

  function deep(list: T[]) {
    for (let i = 0; i < list.length; i++) {
      const treeItem = list[i];
      if (treeItem[option.keyField] === value) {
        item = treeItem;
      }
      if (item) {
        break;
      }
      if (
        treeItem[option.childField] &&
        treeItem[option.childField].length > 0
      ) {
        deep(treeItem[option.childField]);
      }
    }
  }
  deep(tree);

  return item;
}

/** 把树结构转为一维数组 */
export function treeToArray<T extends Record<string, any>>(tree: T[]): T[] {
  const list: T[] = [];

  function deep(treeChildren: T[]) {
    for (let i = 0; i < treeChildren.length; i++) {
      const treeItem = treeChildren[i];
      list.push(treeItem);
      if (treeItem.children && treeItem.children.length > 0) {
        deep(treeItem.children);
      }
    }
  }
  deep(tree);

  return list;
}

/** 找到某一项的所有上级节点 */
export function findManagerByTree<T extends Record<string, any>>(
  tree: T[],
  value: string
): T[] {
  let endManagerList: T[] = [];

  let fined = false; // 找到了，后续循环都终止
  function deep(list: T[], option: { managerList?: T[]; level: number }) {
    for (let i = 0; i < list.length; i++) {
      const managerList: T[] = option.managerList ?? [];
      const treeItem = list[i];
      if (treeItem.value === value) {
        fined = true;
        endManagerList = managerList;
      }
      if (fined) {
        break;
      }
      if (treeItem.children && treeItem.children.length > 0) {
        managerList.push(treeItem);
        deep(treeItem.children, { managerList, level: option.level + 1 });
      }
    }
  }
  deep(tree, { level: 1 });

  return endManagerList;
}
