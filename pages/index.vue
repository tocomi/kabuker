<template>
  <div class="index-wrapper">
    <template v-if="loading">
      <loading />
    </template>
    <template v-if="!loading">
      <div class="header">
        <span>ここにロゴを置くだなも！</span>
      </div>
      <div class="main">
        <google-login v-if="!login" />
        <weekly-bells v-if="login" :uid="uid" />
      </div>
    </template>
  </div>
</template>

<script>
import GoogleLogin from '~/components/organisms/GoogleLogin.vue';
import Loading from '~/components/organisms/Loading.vue';
import WeeklyBells from '~/components/organisms/WeeklyBells.vue';

export default {
  components: {
    GoogleLogin,
    Loading,
    WeeklyBells,
  },
  data() {
    return {
      login: false,
      uid: '',
      loading: true,
    };
  },
  async created() {
    await this.$auth().onAuthStateChanged((user) => {
      console.log('user: ', user);
      if (user) {
        this.login = true;
        this.uid = user.uid;
      } else {
        this.login = false;
      }
      this.loading = false;
    });
  },
};
</script>

<style lang="scss" scoped>
.index-wrapper {
  padding: 16px 0 64px;

  .header {
    align-items: center;
    display: flex;
    height: 160px;
    justify-content: center;
  }

  .main {
    margin-top: 16px;
  }
}
</style>
