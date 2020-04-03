<template>
    <div class="login">
        <div @click="login">login</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapActions } from "vuex";
import { IState } from "@/store/index.d";

@Component({
  components: {}
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
    console.log("login");
    await this.getUserInfo();
  }

  // 计算属性
  get token() {
    return this.$store.state.auth.token;
  }

  get computedMsg() {
    return `computed ${this.msg}-${this.token}`;
  }

  // 方法
  public async getUserInfo() {
    const { code, data } = await this.$axios.post({
      url: "/user/getUserInfo", // getUserInfo loginWithPassword
      data: {
        phone: "13612817761",
        password: "12345678"
      }
    });

    this.$utils.commonFunc.judgeRedirect(code);
  }

  public async login() {
    const { code, data } = await this.$axios.post({
      url: "/user/loginWithPassword",
      data: {
        phone: "13612817761",
        password: "12345678"
      }
    });
    await this.getUserInfo();
  }
}
</script>
