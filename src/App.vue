<template>
  <div id="app">
    <div v-transfer-dom>
        <loading v-model="isLoading" :text="loadingText"></loading>
    </div>
    <view-box ref="viewBox" body-padding-top="4.6rem">
        <x-header slot="header" class="app-header" :left-options="leftOptions" :right-options="rightOptions" :title="title" :transition="headerTransition">
            <a slot="right" v-show="rightOptions.showAdd" @click="onClickMore">添加</a>
        </x-header>

        <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter">
            <router-view class="router-view"></router-view>
        </transition>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Loading, TransferDom } from "vux";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  directives: {
    TransferDom
  },
  components: {
    ViewBox,
    XHeader,
    Loading
  },
  mounted(){
  },
  computed: {
    ...mapGetters(["userInfo","isLoading","loadingText","direction"]),
    leftOptions() {
      const parts = this.$route.path.split("/");
      const isShop =
        /shop/.test(this.$route.path) && !parts[3] && this.prePath == "/login"; //判断是否为商品页
      this.prePath = this.$route.path;
      return {
        showBack:
          this.$route.path !== "/" &&
          this.$route.path !== "/order/orderSuccess" &&
          this.$route.path !== "/main" &&
          this.$route.path !== "/login" &&
          !isShop
      };
    },
    rightOptions() {
      return {
        showMore: false,
        showAdd:
          this.$route.path == "/user" ||
          this.$route.path == "/table" ||
          this.$route.path == "/reserve" ||
          this.$route.path == "/product"
      };
    },
    headerTransition() {
      return this.direction === "forward"
        ? "vux-header-fade-in-right"
        : "vux-header-fade-in-left";
    },
    title() {
      return this.$route.name || "";
    }
  },
  methods: {
    afterEnter(el) {
      this.$root.eventHub.$emit("page.afterEnter", "1");
      if (this.$root.currentScroll.length > 0) {
        this.$root.currentScroll.forEach(scroll => {
          scroll.refresh();
        });
      }
    },
    beforeEnter(el) {
      this.$root.currentScroll = [];
    },
    onClickMore() {
      this.$root.eventHub.$emit("page.onClickMore");
    }
  }
};
</script>

<style lang="scss">
@import 'styles/common';

.app-header {
    width: 100%;
    position: absolute !important;
    left: 0;
    top: 0;
    z-index: 100;
}

.router-view {
    width: 100%;
    top: px2rem(46);
}

.router-view-three {
    width: 100%;
    top: px2rem(0);
}

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: px2rem(46);
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
}

.vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
} //无头部
.three-pop-out-enter-active,
.three-pop-out-leave-active,
.three-pop-in-enter-active,
.three-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: px2rem(0);
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
}

.three-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.three-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.three-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.three-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
</style>
