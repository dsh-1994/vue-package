import { defineStore } from "pinia";

export const useUserConfigStore = defineStore("UserConfig", {
  state: () => {
    return {
      languageList: [
        { title: "简体中文", value: "zh-cn" },
        { title: "English", value: "en" },
      ],
      menuList: [
        { title: "", value: "hello" },
        { title: "", value: "personalCenter" },
        { title: "", value: "logOut" },
      ],
      useInfo: { zhCnName: "黄昱", enName: "Cathy" },
      local: "zh-cn",
    };
  },
  persist: {
    key: "UserConfig",
    pick: ["local"],
  },
});
