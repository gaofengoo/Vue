const SOME_MUTATION = 'SOME_MUTATION';

const store = Vuex.createStore({
    state () {
        return {
            count: 0,
            todos: [
                {
                    id: 1,
                    text: '...',
                    done: true
                }, {
                    id: 2,
                    text: '...',
                    done: false
                }
            ]
        }
    },
    mutations: {
        add (state, payload) {
            state.count += payload.amount;
        },
        [SOME_MUTATION] (state) {
            api.callAsyncMethod(() => {
                state.count++;
            });
        }
    },
    getters: {
        doneTodos (state) {
            return state.todos.filter(todo => todo.done);
        },
        doneTodosCount (state, getters) {
            return getters.doneTodos.length;
        },
        getTodoById: (state) => (id) => {
            return state.todos.find(todo => todo.id === id);
        }
    },
    actions: {
        increment ({commit}) {
            commit('increment');
        },
        incrementAsync ({commit}) {
            setTimeout(() => {
                commit('increment');
            }, 1000);
        },
        checkout ({commit, state}, products) {
            const savedCartItems = [...state.cart.added];
            commit(types.CHECHOUT_REQUEST);
            shop.buyProducts(
                products,
                () => commit(types.CHECKOUT_SUCCESS),
                () => commit(types.CHECKOUT_FAILURE, savedCartItems)
            );
        },
        actionA ({commit}) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('someMutation');
                    resolve();
                }, 1000);
            });
        },
        actionB ({dispatch, commit}) {
            return dispatch('actionA').then(() => {
                commit('someOtherMution');
            });
        },
        async actionA ({commit}) {
            commit('gotData', await getData());
        },
        async actionB ({dispatch, commit}) {
            await dispatch('actionA');
            commit('gotOtherData', await getOtherData());
        }
    }
});

 // 创建一个Counter组件
 const Counter = {
     template: `<div>{{ count }}</div>`,
     computed: {
         count () {
             return this.$store.state.count;
         },
         doneTodosCount () {
             return this.$store.getters.doneTodosCount;
         }
     }
 };

const app = Vue.createApp({
    computed: Vuex.mapState({
        count: state => state.count,
        countAlias: 'count',
        countPlusLocalState (state) {
            return state.count + this.localCount;
        },
        localComputed () {

        },
        doneTodosCount () {
            return this.$store.state.todos.filter(todo => todo.done).length;
        },
        ...Vuex.mapMutations(['increment', 'incrementBy']),
        ...Vuex.mapMutations({
            add: 'increment'
        }),
        ...Vuex.mapGetters(['doneTodosCount', 'anotherGetter'])
    }),
    methods: {
        ...Vuex.mapActions(['increment', 'incrementBy']),
        ...Vuex.mapActions({
            add: 'increment'
        })
    }
});

app.use(store);

store.commit('add', {
    type: 'increment',
    amount: 10
});

// 分发Action
store.dispatch('increment');

// 以载荷形式分发
store.dispatch('increment', {
    amount: 10
});

// 以对象形式分发
store.dispatch({
    type: 'incrementAsync',
    amount: 10
});

store.dispatch('actionA').then(() => {

});

console.log(store.state.count, store.getters.doneTodosCount, store.getters.getTodoById(2));