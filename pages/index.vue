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
        <weekly-bells v-if="login" :uid="uid" @finish="childFinish" />
        <link-button v-if="!login || !childLoading" to="/list">
          みんなのカブ価を見てみる！
        </link-button>
      </div>
    </template>
  </div>
</template>

<script>
import LinkButton from '~/components/atoms/LinkButton.vue';
import GoogleLogin from '~/components/organisms/GoogleLogin.vue';
import Loading from '~/components/organisms/Loading.vue';
import WeeklyBells from '~/components/organisms/WeeklyBells.vue';

export default {
  components: {
    LinkButton,
    GoogleLogin,
    Loading,
    WeeklyBells,
  },
  data() {
    return {
      login: false,
      uid: '',
      loading: true,
      childLoading: true,
    };
  },
  async created() {
    await this.$auth().onAuthStateChanged((user) => {
      if (user) {
        this.login = true;
        this.uid = user.uid;
      } else {
        this.login = false;
      }
      this.loading = false;
    });
  },
  methods: {
    childFinish() {
      this.childLoading = false;
    },
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
