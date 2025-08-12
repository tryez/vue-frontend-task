<script setup>
import { ref, provide } from "vue";
import Table from '@/components/Table.vue'

const items = ref([
  {id: 1, name: 'dummy data 1', created_at: '08-09-2025', author: "გიორგი უზნაძე", type: "critical", statusId: 4},
  {id: 2, name: 'dummy data 2', created_at: '08-09-2025', author: "Bellamy Blake", type: "normal", statusId: 1},
  {id: 3, name: 'dummy data 3', created_at: '08-09-2025', author: "Anne Hathaway", type: "normal", statusId: 2},
  {id: 4, name: 'dummy data 4', created_at: '08-09-2025', author: "Jake Sully", type: "critical", statusId: 3},
  {id: 5, name: 'dummy data 5', created_at: '08-09-2025', author: "Eddie Murphy", type: "critical", statusId: 4},
  {id: 6, name: 'dummy data 6', created_at: '08-09-2025', author: "Eddie Murphy", type: "normal", statusId: 4},
  {id: 7, name: 'dummy data 7', created_at: '08-12-2025', author: "Eddie Murphy", type: "normal", statusId: 2},
  {id: 8, name: 'dummy data 8', created_at: '08-12-2025', author: "Big Lebowski", type: "normal", statusId: 2},
  {id: 9, name: 'dummy data 9', created_at: '08-12-2025', author: "Eddie Murphy", type: "normal", statusId: 3},
  {id: 10, name: 'dummy data 10', created_at: '08-12-2025', author: "Big Lebowski", type: "normal", statusId: 4},
]);

const statuses = {
  1: {name: 'open', color: 'grey'},
  2: {name: 'pending', color: 'orange'},
  3: {name: 'rejected', color: 'crimson'},
  4: {name: 'accepted', color: 'limegreen'},
}

// just so i can use it for Select dropdown later on
const users = ref([
  {id: 1, name: "გიორგი უზნაძე"},
  {id: 2, name: "Bellamy Blake"},
  {id: 3, name: "Anne Hathaway"},
  {id: 4, name: "Jake Sully"},
  {id: 5, name: "Eddie Murphy"},
  {id: 6, name: "Big Lebowski"},
])


provide('statuses', statuses);

function deleteItem(id){
  console.log(id);
  let index = items.value.findIndex((item) => item.id === id);
  if(index !== -1){
    items.value.splice(index, 1);
  }
}


function updateItem(id, fieldName, value){
  console.log('update item')
  console.log(id, fieldName, value)
  const index = items.value.findIndex((item) => item.id === id);
  if(index !== -1){

    if(fieldName === 'author'){
      const userIndex = users.value.findIndex((user) => user.id === parseInt(value));
      if(userIndex !== -1){
        items.value[index][fieldName] = users.value[userIndex]['name'];
        return;
      }
    }

    items.value[index][fieldName] = value;
  }
}

function viewDetails(){
  alert("Table და EditableTable გაერთიანებულია, ასე რომ View Details აღარ გვჭირდება. იმედია პრობლემა არ არის :D")
}


</script>


<template>
    <div class="table-wrapper">
        <Table :items="items" :users="users" @delete:item="deleteItem" @update:item="updateItem" @view:details="viewDetails" />
    </div>
</template>



<style scoped>
.table-wrapper{
  display: flex;
  justify-content: center;
}
</style>