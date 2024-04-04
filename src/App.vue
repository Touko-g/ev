<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import {ref, onMounted, markRaw} from "vue";

let {electronAPI} = window

let data = ref(null)
const getData = async () =>{
  // electronAPI.setData(true)
  const val  = await electronAPI.getFileData()
  console.log('双向通信',val)
}



onMounted(()=>{
  electronAPI.onGetData(value=>{
    data.value = value
  })
})



</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>

    <div class="wrapper">
      <HelloWorld msg="You did it!"/>
      <button @click="getData">获取文件数据</button>
      {{data}}
    </div>
  </header>

  <main>
    <TheWelcome/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
