<template>
  <div class="record-wrapper">
    <template v-if="loading">
      <loading />
    </template>
    <template v-if="!loading">
      <div class="header">
        <span>(ここにロゴを置くだなも)</span>
      </div>
      <div class="main">
        <google-login v-if="!login" />
        <weekly-bells v-if="login" :uid="uid" @finish="childFinish" />
      </div>
    </template>
    <bottom-navigation />
  </div>
</template>

<script>
import GoogleLogin from '~/components/organisms/GoogleLogin.vue';
import Loading from '~/components/organisms/Loading.vue';
import WeeklyBells from '~/components/organisms/WeeklyBells.vue';
import BottomNavigation from '~/components/organisms/BottomNavigation.vue';

export default {
  components: {
    GoogleLogin,
    Loading,
    WeeklyBells,
    BottomNavigation,
  },
  head() {
    return {
      title: 'record',
    };
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
.record-wrapper {
  padding: 16px 0 calc(32px + #{$bottom-nav-height});

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
