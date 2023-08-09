import {defineStore} from "pinia";

export const useKeyStore = defineStore({
    id: "key",
    state: () => ({
        key: "",
    }),
    getters: {
        getKey(state) {
            return state.key;

        }
    },
    actions: {
        setKey(key: string) {
            this.key = key;
        }
    }
})