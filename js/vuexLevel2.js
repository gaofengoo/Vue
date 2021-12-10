const store = new Vuex.Store({
	state: {
		count: 0
	},
	mutations: {
		increment (state) {
			state.count++;
		}
	}
});

store.commit('increment');
console.log(store.state.count);

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
	store: store,
	components: {
		Counter
	},
	template: `
		<div class="app">
			<counter></counter>
		</div>
	`
});