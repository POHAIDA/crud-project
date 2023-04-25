<template>
    <div class="main">
    <router-view></router-view>
     <h3>CRUD</h3>
     <button class="create__user-btn" @click="showDialog">Create user</button>
     <my-dialog v-model:show="dialogVisible">
       <div class="btn_close">
               <h4>Create user</h4>
               <button @click="dialogVisible=false">close</button>
         </div>
       <form @submit="submitForm" class="form" >
       <input class="input" v-model="name" type="text" name="name" placeholder="Name" />
       <br />
       <input class="input" v-model="email" type="text" name="email"  placeholder="email" />
       <br />
       <input class="input" v-model="phone" type="text" name="phone"  placeholder="phone" />
       <br>
       <button class="submit-button" @click="addCrud">Add user</button>
     </form>
     </my-dialog>
     
   
     <div class="crud-container">
       <div>
               <table>
                   <tr>
                       <th>name</th>
                       <th>mail</th>
                       <th>phone</th>
                       <th>event</th>
                       <th>date event</th>
                       <th>action</th>
                   </tr>
                   
                   <tr v-for="user,i in users">
                       <td>{{ user.name }}</td>
                       <td>{{ user.email }}</td>
                       <td>{{ user.phone }}</td>
                       <td>{{ user.events.length }}</td>
                       <td>{{ user.events.length > 0 ? user.events[0].startDate : '-' }}</td>
                       <div class="btn__container">
                       <td class="td-button"><button @click="$router.push(`/user/${user._id}`)" class="delete-btn">USER</button></td>
                       <td class="td-button"><button class="delete-btn" @click="removeCrud(user, i)">DELETE</button></td>
                       </div>
                      
                   </tr>
               </table>
           </div>
   
     </div>
     </div>
   </template>
   
   <script>
   import UserPage from "@/pages/UserPage";
   import MyDialog from "@/components/UI/MyDialog";
   import axios from "axios";
   export default {
     components:{
       MyDialog,
       UserPage,
     },
     name: "App",
     data() {
       return {
         users: [],
         email: "",
         name: "",
         phone: "",
         dialogVisible:false,
       };
     },
     async mounted() {
       const response = await axios.get("api/crudList/");
       this.users = response.data;
     },
     
     methods: {
       async addCrud(e) {
         e.preventDefault();
         const response = await axios.post("api/crudList/", {
          name: this.name,
          email: this.email,
          phone: this.phone,
          // event: this.event,
          // dateEvent: this.dateEvent,
         });

         this.users.push(response.data);
         this.name = "";
         this.email = "";
         this.phone = "";
         this.dialogVisible = false
       },

       async removeCrud(item, i) {
         await axios.delete("api/crudList/" + item._id);
         this.users.splice(i, 1);
       },

       showDialog(){
       this.dialogVisible = true
     },
     }
   };
   </script>
   
   <style>
   h3{
     color: #abafd9;
     cursor: pointer;
   }
   .main {
     margin: auto;
     max-width: 400px;
   }
   .create__user-btn{
    cursor: pointer;
     padding: 30px;
     border-radius: 10px;
     border: none;
     background-color: #abafd9;
     font-size: 20px;
     width: 400px;
     margin-top: 100px;
   }
   .btn_close{
     display: flex;
     justify-content: space-between;
     align-items: center;
   }
   .form {
     display: flex;
     flex-direction: column;
     align-items: center;
   }
   
    h3{
     font-size: 42px;
     font-weight: bold;
     text-align: center;
   }
   
   .input {
     width: 100%;
     padding: 10px;
   }
   
   .submit-button {
     width: 400px;
     padding: 10px;
     background-color:#abafd9;
     color: white;
     cursor: pointer;
     border-radius: 5px;
     border: none;
   }
   
   .crud-container {
     display: flex;
     flex-direction: column;
     align-items: center;
   }
   
   table{
       max-width: 70%;
       border-collapse: separate;
       border-spacing: 5px;
       background: rgb(224, 228, 231);
       border-radius: 10px;
       margin: 0 auto;
       margin-top: 65px;
       
       padding: 10px 10px;
       font-size: 20px;
       
   }
   th{    
       min-width: 100px;
       height: 50px;
       max-width: 300px;
       
   }
   td{
       padding: 0 20px;
       min-width: 100px;
       height: 50px;
       background-color: rgb(206, 199, 212);
   }
   .td-button{
       padding-left: 0;
       display: flex;
       align-items: center;
       justify-content: center;
   }
   
   .btn__container{
     display: flex;
   }
   .delete-btn {
     background-color: #8179c7;
     color: white;
     padding: 10px;
     cursor: pointer;
     border: none;
     width: 70px;
     border-radius: 5px;
   }
   </style>
   