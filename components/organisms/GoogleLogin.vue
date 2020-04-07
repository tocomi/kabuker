<template>
  <div class="google-login-wrapper">
    <div class="login">
      <div @click="loginGoogle">
        <img :src="require('~/assets/images/google-login-button.png')" class="login__button" alt="Google">
      </div>
    </div>
    <div class="description">
      <span>ログインしてカブ価を保存するだなも！</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loginGoogle() {
      this.$auth().signInWithRedirect(new this.$auth.GoogleAuthProvider());
    },
  },
};
</script>

<style lang="scss" scoped>
.google-login-wrapper {
  .login {
    width: 100%;
    text-align: center;
    &__button {
      width: 200px;
    }
  }

  .description {
    margin-top: 16px;
    text-align: center;
  }
}
</style>
