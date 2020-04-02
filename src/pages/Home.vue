<template>
  <div class="home">
    <HelloWorld :msg="csrfToken" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapActions } from "vuex";
import { IState } from "@/store/index.d";
import HelloWorld from "@/components/HelloWorld.vue";

@Component({
  components: {
    HelloWorld
  }
  // computed: {
  //     ...mapState({
  //         token: (state: IState) => state.auth.token
  //     })
  // }
})
export default class Home extends Vue {
  // 初始化数据
  public msg = 123;

  // 声明周期钩子
  public async created() {
    // this.$mtaH5.pgv();

    // this.$mtaH5.clickStat("test_click", { token: "12" });

    await this.getCsrfToken();
    await this.getUserInfo();
  }

  // 计算属性
  get csrfToken() {
    return this.$store.state.auth.csrfToken;
  }

  // 方法
  public greet() {
    alert(`greeting: ${this.msg}`);
  }

  public async getCsrfToken() {
    const { data = {} } = await this.$axios.get({
      url: "/getBaseInfo"
    });

    this.$store.dispatch("auth/setCsrfToken", {
      csrfToken: data.csrfToken || ""
    });
  }

  public async getUserInfo() {
    await this.$axios.post({
      url: "/user/getUserInfo", // getUserInfo loginWithPassword

      data: {
        phone: "13612817761",
        password: "12345678"
      }
    });
  }
}
</script>
