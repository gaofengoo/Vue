const store = new Vuex.Store({
	state: {
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
	},
	mutations: {
		increment (state) {
			state.count += 2;
		}
	},
	getters: {
		doneTodos: (state, getters) => {
			return state.todos.filter(todo => todo.done);
		},
		getTodoById: (state) => (id) => {
			return state.todos.find(todo => todo.id === id);
		} 
	}
});

console.log(store.getters.getTodoById(2));

store.commit('increment');

const Counter = {
	template: `<div>{{ count }}</div>`,
	computed: {
		count () {
			return this.$store.state.count;
		}
	}
};

const app = new Vue({
	el: '#app',
	store,
	components: {
		Counter
	},
	computed: {
		// ...Vuex.mapGetters(['doneTodos', 'getTodoById']),  // 可以采用数组或对象进行数据映射
		...Vuex.mapGetters({
			newDoneTodos: 'doneTodos',
			newGetTodoById: 'getTodoById'
		}),
		doneTodosCount () {
			return this.$store.getters.doneTodosCount;
		}
	}
});