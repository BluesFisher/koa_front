/*
e.g
    import { Component, Vue } from "vue-property-decorator";
    import { mapState, mapActions } from "vuex";

    @Component({
        computed: {
            ...mapState({
                token: (state: any) => state.auth.token
            })
        }
    })
    export default class Home extends Vue {
        public created() {
            this.$store.dispatch("auth/setToken", { token: "12" });
        }
    }
*/

import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store: any = new Vuex.Store({
    modules: {
        auth
    },
    strict: debug
});

export default store;
