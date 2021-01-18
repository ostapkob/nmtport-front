<template>
  <div>
    <b-form  @submit.prevent='handleLogin' width="400" >
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text> <b-icon-person-circle /> </b-input-group-prepend>
        <b-form-input 
          v-model="user.username"
          type="text" 
        />
      </b-input-group> 

      <b-input-group class="mb-2">
        <b-input-group-prepend is-text> <b-icon-lock-fill /> </b-input-group-prepend>
        <b-form-input 
          v-model="user.password" 
          type="password" 
        />
      </b-input-group> 

      <b-button @click=handleLogin type="submit" variant="primary">Войти</b-button>
    </b-form>

    <b-alert show v-if=message class='mt-2'>
      {{message.message}}
    </b-alert>

  </div>
</template>


<script>
import User from '../models/user';
import { BForm, BFormInput,} from 'bootstrap-vue'
import { BInputGroup, BInputGroupPrepend } from 'bootstrap-vue'
import {BIconLockFill, BIconPersonCircle, } from 'bootstrap-vue'
import { BAlert } from 'bootstrap-vue'

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: '',
      userId: '',
      userPass: '',
    };
  },
  components: {
    BForm,
    BFormInput,
    BIconPersonCircle,
    BInputGroupPrepend,
    BInputGroup,
    BIconLockFill,
    BAlert,
  },
  computed: {

    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    //if (this.loggedIn) {
     // this.$router.push('/profile');
   // }
  },
  methods: {
    handleLogin() {
      this.loading = true;
        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/mapol').catch(err => {console.log(err)});
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
    },
  }
};
</script>

