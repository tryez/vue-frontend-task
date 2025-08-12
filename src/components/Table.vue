<script setup>
// import { ref } from 'vue'

import Select from '@/components/Select.vue'
import { computed, inject, nextTick, ref, watch } from 'vue'

import useOutsideClick from '@/composables/useOutsideClick'

import ViewDetailsIcon from './icons/ViewDetailsIcon.vue'
import SendIcon from './icons/SendIcon.vue'
import EditIcon from './icons/EditIcon.vue'
import DeleteIcon from './icons/DeleteIcon.vue'
import StatusBadge from '@/components/StatusBadge.vue'



const props = defineProps({
  items: Array,
  users: Array,
})

const emit = defineEmits([
  'view:details',
  'delete:item',
  'update:item'
]);


const editingCell = ref(null) 
const tableBodyRef = ref(null)

function startEdit(rowId, field) {
  editingCell.value = { id: rowId, field }
}

// I re-implemented my old useOutsideClick from my other React project, I know @blur exists but I'm more used to this in some cases and it gives more control
useOutsideClick(tableBodyRef, editingCell, () => {
  editingCell.value = null;
})



function handleShow(){
  emit('view:details');
}


function removeItem(id){
  emit('delete:item', id);
}

function sendItem(){
  alert("to be fair 'SEND' wasn't explained in a task :D")
}

function handleChange(id, fieldName, value) {
  emit('update:item', id, fieldName, value)
  // editingCell.value = null; // this causes terrible bug on <Select /> label text, DON'T DO IT, but I might have to come up with something later.
}

function handleInputChange(id, fieldName, value) {
  emit('update:item', id, fieldName, value)
  editingCell.value = null;
}

const typeOptions = [
  { value: 'normal', text: 'normal' },
  { value: 'critical', text: 'critical' },
]


const userOptions = computed(() =>
  props.users.map(user => ({
    value: user.id,
    text: user.name
  }))
)

const statuses = inject("statuses")

const statusOptions = computed(() =>
  Object.entries(statuses).map(([id, status]) => ({
    value: Number(id),
    text: status.name,
  }))
)



watch(editingCell, async (cell) => {
  console.log('cell', cell)
  if (cell) {
    await nextTick();
    const dataAlias = `input-${cell.id}-${cell.field}`;
    let el = document.querySelector(`[data-alias="${dataAlias}"]`);
    if(el){
      el.focus()
    }
    
  }
});




</script>

<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Created At</th>
          <th>Author</th>
          <th>Type</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody ref="tableBodyRef">
        <tr v-for="item in items" :key="item.id" class="table-row">

          <!-- i should probably just move these into a seperate component and give a specific type of input i want as a prop, for now it's not the end of the world -->
          <td @click="startEdit(item.id, 'name')">
            
              <template v-if="editingCell?.id === item.id && editingCell?.field === 'name'">
                <input
                  :data-alias="`input-${item.id}-name`"
                  type="text"
                  :value="item.name"
                  @blur="handleInputChange(item.id, 'name', $event.target.value)"
                  @keydown.enter="handleInputChange(item.id, 'name', $event.target.value)"
                  class="cell-input"
                />
              </template>
              <template v-else>
                <div class="table-cell">
                  {{ item.name }}
                </div>
              </template>

          </td>

          <td @click="startEdit(item.id, 'created_at')">
              <template v-if="editingCell?.id === item.id && editingCell?.field === 'created_at'">
                <input
                  :data-alias="`input-${item.id}-created_at`"
                  type="text"
                  :value="item.created_at"
                  @blur="handleInputChange(item.id, 'created_at', $event.target.value)"
                  @keydown.enter="handleInputChange(item.id, 'created_at', $event.target.value)"
                  class="cell-input"
                />
              </template>
              <template v-else>
                <div class="table-cell">
                  {{ item.created_at }}
                </div>
              </template>
          </td>


          <td @click="startEdit(item.id, 'author')">
              <template v-if="editingCell?.id === item.id && editingCell?.field === 'author'">
                <Select
                  :label="item.author"
                  :options="userOptions"
                  :searchable="true"
                  @select:updated="val => handleChange(item.id, 'author', val)"
                />
              </template>
              <template v-else>
                <div class="table-cell">
                  {{ item.author }}
                </div>
              </template>
          </td>

          <td @click="startEdit(item.id, 'type')">
              <template v-if="editingCell?.id === item.id && editingCell?.field === 'type'">
                <Select
                  :label="item.type"
                  :options="typeOptions"
                  :searchable="false"
                  @select:updated="val => handleChange(item.id, 'type', val)"
                />
              </template>
              <template v-else>
                <div class="table-cell">
                {{ item.type }}
                </div>
              </template>
          </td>

          <td @click="startEdit(item.id, 'statusId')">
            
              <template v-if="editingCell?.id === item.id && editingCell?.field === 'statusId'">
                <Select
                  :label="statuses[item.statusId].name"
                  :options="statusOptions"
                  :searchable="true"
                  @select:updated="val => handleChange(item.id, 'statusId', val)"
                />
              </template>
              <template v-else>
                <div class="table-cell">
                  <StatusBadge :status-id="item.statusId" />
                </div>
              </template>
          </td>


          
          <td>
            <div class="actions-wrapper">
              <div class="table-icon" title="View Details" @click="handleShow">
                <ViewDetailsIcon/>
              </div>
              <div class="table-icon" title="Send" @click="sendItem">
                <SendIcon />
              </div>
              <!-- <div class="table-icon" title="Edit">
                <EditIcon />
              </div> -->
              <div class="table-icon table-icon-delete" title="Delete" @click="removeItem(item.id)">
                <DeleteIcon />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<style scoped lang="scss">

$table-bg-dark: #1b2733;
$table-bg-darker: #0f1923;
$table-hover-bg: #2c3f52;
$table-hover-delete-bg:#522c38;


table {
  border-collapse: collapse;
  --icon-color: cornflowerblue;
  --delete-icon-color: crimson;
}

.actions-wrapper {
  display: flex;
}
.table-icon {
  width: 24px;
  height: 24px;
  fill: var(--icon-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  svg {
    pointer-events: none;
  }

  &:hover {
    background-color: $table-hover-bg;
  }
  &.table-icon-delete:hover{
    background-color: $table-hover-delete-bg !important;
  }
}

.table {
  .table-cell, th {
    border-color: transparent;
    padding: 8px;
    text-align: center;
  }

  > thead > tr > th:first-child,
  > tbody > tr > td:first-child {
    text-align: left;
  }

  .table-row {
    background-color: $table-bg-dark;

    &:nth-child(2n + 1) {
      background-color: $table-bg-darker;
    }
  }

  .table-cell:hover{
    background-color: #2c3f52;
    cursor: pointer;
  }

  .cell-input{
    width: 120px;
    outline: none;
    background: none;
    border: none;
  }

}




</style>
