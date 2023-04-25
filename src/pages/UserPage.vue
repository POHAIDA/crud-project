<template>
  
  <div class="main__page">
    <h3 @click="$router.push(`/`)">CRUD</h3>
    <button @click="$router.push(`/`)" class="main_page-btn">main page</button>
  </div>
 
  <table>
     <tr>
         <th>user info</th>
         <th>event</th>
         <th>describtion</th>
         <th>start date</th>
         <th>end date</th>
     </tr>
     
     <tr>
         <td class="td_user">
            <ul class="user_info">
              <li><strong>name: </strong>{{ user.name }}</li>
              <li><strong>email: </strong>{{ user.email }}</li>
              <li><strong>phone: </strong>{{ user.phone }}</li>
            </ul>
         </td>
         <td>
           <ol>
             <li v-for="event in user.events">{{ event.event }}</li>
           </ol>
         </td>
         <td>
           <ol>
             <li v-for="event in user.events">{{ event.description }}</li>
           </ol>
         </td>
         <td>
           <ol>
             <li v-for="event in user.events">{{ event.startDate }}</li>
           </ol>
         </td>
         <td>
           <ol>
             <li v-for="event in user.events">{{ event.endDate }}</li>
           </ol>
         </td>
     </tr>
    </table>
  <div class="User_event">
    <button class="create__user-btn" @click="showDialog">Create event</button>
    <my-dialog v-model:show="dialogVisible">
      <div class="btn_close">
               <h4>Create event</h4>
               <button @click="dialogVisible=false">close</button>
         </div>

      <form @submit.prevent="addEvent" class="form">

      <p>name event</p>

      <input class="input" type="text" v-model="event" placeholder="name event"/>

      <p>description</p>

      <textarea class="input" type="text" v-model="description" placeholder="description"></textarea>

      <p>start date</p>

      <input class="input" type="datetime-local" v-model="startDate" placeholder="start date:"/>

      <p>end date</p>
      
      <input class="input" type="datetime-local" v-model="endDate" placeholder="end date:"/>
        <br>
      <button class="submit-button" type="submit">Add event</button>
  </form>
    </my-dialog>
      
  </div>
</template>

<script>
import axios from "axios";
import MyDialog from "@/components/UI/MyDialog";
export default {
  components:{
       MyDialog
     },
  data() {
    return {
      user: {},
      event: "",
      description: "",
      startDate: "",
      endDate: "",
      dialogVisible:false,
    };
  },

  async mounted() {
    const response = await axios.get(`/api/crudList/${this.$route.params.id}`);
    this.user = response.data;
  },

  methods: {
    async addEvent() {

      try {
        const eventDates = this.user.events.map(event => event.startDate);

          if(eventDates.find(date => date === this.startDate)){
            throw new Error("This event date already exists!")
          };

        const response = await axios.post(`/api/crudList/${this.$route.params.id}`,

          {
            event: this.event,
            description:this.description,
            startDate: this.startDate,
            endDate: this.endDate,
          }

        );

          this.user = response.data; 
          this.event = "";
          this.description = "";
          this.startDate = "";
          this.endDate = "";

      } catch (error) {
        console.error(error);
        alert(error.message)
      }
    },
    showDialog(){
       this.dialogVisible = true
     },
  },
};
</script>

<style scoped>
.main__page{
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin-bottom: 100px;
}
.main_page-btn{
  background-color: #8179c7;
     color: white;
     padding: 10px;
     cursor: pointer;
     border: none;
     min-width: 70px;
     border-radius: 5px;
}
li{
  max-width: 300px;
  overflow-wrap: break-word;
}
td{
  padding-left: 10px;
  max-width: 300px;
  
}
ul{
  padding-left: 10px;
}
ol{
  padding-left: 15px;
}

.user_info{
  list-style: none;
  margin-right: 0;
}
.User_event{
  display: flex;
  margin-top: 100px
};
.input{
  overflow-wrap: break-word;
}
.submit-button{
  margin-top: 40px;
}
.create__user-btn{
 margin: auto;
}
</style>
