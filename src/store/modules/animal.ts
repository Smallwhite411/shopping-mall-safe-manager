import { defineStore } from "pinia";
import { reactive } from "vue";

interface AniamlType {
    msg: string,
    name: string,
    age: number
}

export const useAnimalStore = defineStore("animal", () => {

    const animalMessage = reactive({
        msg: "这是pinia的数据",
        name: "我是小兔子",
        age: 18
    })

    const setAges = () => {
        animalMessage.age ++;
    }

    return {
        animalMessage,
        setAges
    }

})