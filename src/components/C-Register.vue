<template>
  <div>
    <b-form  @submit.prevent='handleRegister'>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text> <b-icon-person-circle /> </b-input-group-prepend>
        <b-form-input 
          placeholder="Имя"
          v-model="user.username" 
          :state="nameValidation" 
          id="feedback-user" 
        />
        <b-form-invalid-feedback :state="nameValidation"> Введите имя </b-form-invalid-feedback>
      </b-input-group> 

      
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text> <b-icon-key-fill /> </b-input-group-prepend>
        <b-form-input 
          placeholder="Ключь приглашения"
          v-model="user.invite" 
          :state="inviteValidation" 
          id="feedback-invite" 
        />
        <b-form-invalid-feedback :state="inviteValidation">Нужно получить от зарегистрированного сотрудника  </b-form-invalid-feedback>
      </b-input-group> 

      <b-input-group class="mb-2">
        <b-input-group-prepend is-text> <b-icon-lock-fill /> </b-input-group-prepend>
        <b-form-input 
          placeholder="Пароль"
          v-model="user.password"
          :state="passValidation"
          id="feedback-userPass"
          type="password" 
          />
        <b-form-invalid-feedback :state="passValidation">Пароль должен быть больше 6 символов </b-form-invalid-feedback>
      </b-input-group> 

      <b-input-group class="mb-2">
        <b-input-group-prepend is-text> <b-icon-lock-fill /> </b-input-group-prepend>
        <b-form-input 
          placeholder="Повторите пароль"
          v-model="rePass" 
          :state="rePassValidation" 
          id="feedback-userRePass" 
          type="password" 
          />
        <b-form-invalid-feedback :state="rePassValidation"> Пароли не совпадают </b-form-invalid-feedback>
        <b-form-valid-feedback :state="rePassValidation"> Пароли совпали </b-form-valid-feedback>
      </b-input-group> 

      <b-button 
        type="submit" 
        variant="primary"
        :disabled="!(nameValidation & inviteValidation & passValidation & rePassValidation)"
        >Зарегистрироваться</b-button>
    </b-form>
    <b-alert show v-if=message class='mt-2'>
      {{message.message}}
    </b-alert>
  </div>
</template>

<script>
import User from '../models/user';
import { BForm, BFormInput,BFormInvalidFeedback, BFormValidFeedback } from 'bootstrap-vue'
import { BInputGroup, BInputGroupPrepend } from 'bootstrap-vue'
import { BIconLockFill, BIconPersonCircle, BIconKeyFill } from 'bootstrap-vue'
import { BAlert } from 'bootstrap-vue'

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      message: '',
      loading: false,
      rePass: '',
      userPass: '',
    };
  },
  components: {
    BForm,
    BFormInput,
    BFormInvalidFeedback,
    BFormValidFeedback,
    BIconPersonCircle,
    BInputGroupPrepend,
    BInputGroup,
    BIconLockFill,
    BIconKeyFill,
    BAlert,
  },
  computed: {
    nameValidation() {
      return !!this.user.username 
    },
    inviteValidation() {
      return this.user.invite.length == 10
    },
    passValidation() {
      return this.user.password.length >= 6
    },
    rePassValidation() {
      return !!this.rePass  && this.user.password == this.rePass  
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    //if (this.loggedIn) {
      //console.log(this.loggedIn);
      //this.$router.push('/profile');
    //}
  },
  methods: {
    handleRegister() {
      this.loading = true;
      this.message = ""
      this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message
              this.$store.dispatch('auth/login', this.user).then(
                () => {
                  this.$router.push('/mapol');
                },
              )
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
    }
  }
</script>
