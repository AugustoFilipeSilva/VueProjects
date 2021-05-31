
<template>
  <div class="container">
    <h1>{{msg}}</h1>
    <h3>Activities:</h3>

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Id
            </th>
            <th class="text-center">
              Description
            </th>
            <th class="text-center">
              Done
            </th>
            <th class="text-left">
              Delete
            </th>

          </tr>
        </thead>
        <tbody>
          <tr
            v-for="activity in activities"
            :key="activity.id"
          >
            <td>{{ activity.id }}</td>
            <td>{{ activity.description }}</td>
            <td>
              <v-checkbox
                class="text-center"
                v-model="activity.done"
                v-on:change="updateTask(activity.id)">
              </v-checkbox>
            </td>
            <td>
              <v-btn
                v-on:click=deleteTask(activity.id)
                elevation ="2">
                <v-icon
                  large
                  color = "blue darken-2">
                  mdi-delete-forever-outline
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-text-field
            v-model="newTask"
            label="Enter new activity"
            solo
            v-on:keyup.enter="enterNewTask"
          ></v-text-field>

  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'ActivityMonitor',

  props: {
    msg: String
  },

  data() {
      return {
        activities: null,
        newTask: "",
        deleteById: "",
        updateById: "",

        refreshTasks(){
          axios
          .get('http://localhost:3000/view')
          .then(res => {
              this.activities = res.data.map(item => ({id:item.id,description:item.description,done:item.done}))
          })
        },


        enterNewTask(){
          axios
            .get('http://localhost:3000/add/'+ this.newTask)
            .then(res => {
              this.newTask = "";
              this.refreshTasks();
            });
        },

        deleteTask(id){
          axios
            .get('http://localhost:3000/del/'+ id)
            .then(res => {
              this.refreshTasks();
            });
        },

        updateTask(id){
          axios
          	.get('http://localhost:3000/finish/'+id)
            .then(res => {
              this.refreshTasks();
            });
        }
      };
    },

  created: function() {
      this.refreshTasks();
    },
}

</script>

<style scoped>

h3 {
  margin: 40px 0 0;
}

</style>
