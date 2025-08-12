<script setup>

import { reactive, ref } from 'vue';

import Sidebar from './components/layout/Sidebar.vue'
import Header from './components/layout/Header.vue'


const user = reactive({
  name: "Giorgi Uznadze",
  profile_picture_url: '/images/giorgis_avatar.jpg'
})

const sidebarItems = ref([
  {id: 1, name: 'Dashboard', path: '/'},
  {id: 2, name: 'About', path: '/about'}
])

</script>

<template>

<div class="app-body">
  <Header :user="user" />
  <div class="body">
    <Sidebar :items="sidebarItems" />
    <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
</div>

  
</template>

<style>

#app, body, html {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
  margin: 0;
}

.text-overflow{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.app-body{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.body{
  display: flex;
  height: 100%;
}

.page-content{
  width: 100%;
  padding: 20px;
}
</style>
