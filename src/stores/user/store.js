import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    dataList: [],
    dataObject: {},
  }),
  actions: {
    submitData(data) {
      this.dataObject = data;
    },

    deleteData() {
      this.dataObject = {};
    },
  },
});
