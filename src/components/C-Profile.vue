<template>
  <div>
    <p> Profile: {{currentUser.username}} </p>
    <p> Invite:  {{currentUser.invite}} </p>
    <li v-for="(role, k) in currentUser.roles" :key=k>
      {{role}}
    </li>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login')
    }
  }
}
</script>
