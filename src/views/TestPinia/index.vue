<template>
    <div>
            我是TestPinia组件
            <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=yd&skin=pitaya" frameborder="0" width="100%" height="30" allowtransparency="true"></iframe>
    </div>
    <div>
        {{ useAnimalStores.animalMessage.age }}
    </div>
    <button @click="useAnimalStores.setAges">修改age</button>
</template>

<script setup lang="ts">
import {useAnimalStore} from '@/store/modules/animal'

const useAnimalStores = useAnimalStore()

</script>

<style scoped>
</style>