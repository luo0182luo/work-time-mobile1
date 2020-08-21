<template>
  <div class="home">
    <internationalization v-model="isShow" ref="internationalization" />
    <div class="home-content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>

    <van-tabbar
      class="home-tabbar"
      safe-area-inset-bottom
      v-model="tabbarActive"
      @change="toggleTabbar"
    >
      <van-tabbar-item name="manhour" icon="home-o">{{$t('Home.failed')}}</van-tabbar-item>
      <van-tabbar-item name="manhourcheck" icon="search">{{$t('Home.check')}}</van-tabbar-item>
    </van-tabbar>
    <div class="home-lang" @click="toggleLang">{{$t('name')}}</div>
  </div>
</template>

<script>
import Internationalization from "@/components/Internationalization";
export default {
  name: "home",
  components: {
    Internationalization,
  },
  data() {
    return {
      isShow: false,
      tabbarActive: "manhour",
    };
  },
  watch: {
    // 当前菜单选中
    "$route.name": {
      immediate: true,
      handler(val) {
        this.tabbarActive = val;
      },
    },
  },
  created() {
    const local = localStorage.getItem("worktime:local-lang");
    if (!local) {
      this.isShow = true;
    }
  },
  methods: {
    toggleLang() {
      this.isShow = true;
    },
    toggleTabbar(val) {
      this.$router.push({ name: val });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .home-tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    box-shadow: 0 2px 10px rgba(125, 126, 128, 0.16);

    /deep/ .van-tabbar-item {
      color: #cccccc;
    }
     /deep/ .van-tabbar-item--active {
      color: #007cf9;
    }
  }
  .home-lang {
    color: rgba(69, 90, 100, 0.6);
    position: fixed;
    bottom: 0;
    left: 5px;
    z-index: 10;
    line-height: 50px;
  }
  .home-content {
    margin-bottom: 50px;
  }
}
</style>
