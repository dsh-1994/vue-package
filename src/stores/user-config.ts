import { defineStore } from "pinia";

export const useUserConfigStore = defineStore("UserConfig", {
  state: () => {
    return {
      skinList: [
        { title: "", value: "auto" },
        { title: "", value: "light" },
        { title: "", value: "dark" },
      ],
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
      skinDefault: "auto",
      skin: "auto",
      local: "zh-cn",
    };
  },
  persist: {
    key: "UserConfig",
    pick: ["skin", "local"],
  },
});
