import { defineStore } from "pinia";

export type CurrentTabsStoreT = {
  tabOptionList: string[];
};

export const useCurrentTabsStore = defineStore("CurrentTabs", {
  state: (): CurrentTabsStoreT => {
    return {
      tabOptionList: [],
    };
  },
  getters: {
    tabOptionKeys: (state) => new Set(state.tabOptionList),
  },
  actions: {
    addTabOptionList(value: string) {
      this.tabOptionList = Array.from(new Set([...this.tabOptionList, value]));
    },
    delTabOptionList(value: string) {
      this.tabOptionList = this.tabOptionList.filter(
        (tabKey) => tabKey !== value
      );
    },
  },
  persist: {
    key: "CurrentTabs",
    pick: ["tabOptionList"],
  },
});
