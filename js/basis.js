window.onload = function () {
	const HelloVueApp = {
		data () {
			return {
				message: 'Hello Vue!',
				count: 0,
				hoverMessage: '悬停时间：' + new Date().toLocaleString(),
				seen: true,
				todos: [
					{
						text: 'HTML'
					}, {
						text: 'CSS'
					}, {
						text: 'JavaScript'
					}
				],
				items: [
					{
						id: 1,
						name: '篮球'
					}, {
						id: 2,
						name: '羽毛球'
					}, {
						id: 3,
						name: '乒乓球'
					}
				],
				rawHtml: `<span style="color: red;">rawHtml</span>`,
				customId: 'custom1',
				ok: true,
				url: 'www.baidu.com',
				attributeName: 'href',
				eventName: 'click',
				firstName: '',
				lastName: '',
				question: '',
				answer: 'answer text?',
				isActive: true,
				error: null,
				activeClass: 'active2',
				errorClass: 'text-danger2',
				styleObject: {
					color: 'red',
					fontSize: 18
				},
				baseStyles: {
					color: '#0f0',
					'font-size': 20 + 'px'   
				},
				overStyles: {
					marginTop: '20px'
				},
				some: true,
				parentMessage: 'Parent',
				myObject: {
					title: 'How to do lists in vue',
					author: 'gaofeng',
					date: '2021-06-08'
				},
				style1: 'height: 200px;overflow-y: auto;',
				style2: 'height: 1000px;',
				textMessage: '',
				textareaMessage: '',
				checked: false,
				checkedNames: [],
				picked: '',
				selected: '',
				options: [
					{
						text: 'One',
						value: 'A'
					}, {
						text: 'Two',
						value: 'B'
					}, {
						text: 'Three',
						value: 'C'
					}
				],
				selected2: 'A',
				posts: [
					{
						id: 1,
						title: 'one jack'
					}, {
						id: 2,
						title: 'one john'
					}, {
						id: 3,  
						title: 'one xiaohong'
					}
				],
				postFontSize: 1,
				modelValue: '',
				modelValue2: '',
				currentTab: 'Home',
				tabs: ['Home', 'Posts', 'Archive']
			}
		},
		mounted () {
			setInterval(() => {
				this.count++;
			}, 1000);
		},
		computed: {
			itemMessage () {
				return this.items.length > 0 ? 'YES' : 'NO';
			},
			fullName: {
				get () {
					return this.firstName + this.lastName
				},
				set (newValue) {
					const names = newValue.split('');
					this.firstName = names[0];
					this.lastName = names[names.length - 1];
				}
			},
			classObject () {
				return {
					active: this.isActive && !this.error,
					'text-danger': this.error && this.error.type === 'fatal'
				}
			},
			currentTabComponent () {
				return 'tab-' + this.currentTab.toLowerCase();
			}
		},
		watch: {
			question (newQuestion, oldQuestion) {
				if (newQuestion.indexOf('?') > -1) {
					this.getAnswer();
				}
			}
		},
		methods: {
			reverseMessage () {
				this.message = this.message.split('').reverse().join('');
			},
			getAnswer () {
				this.answer = 'Thinking...';
				axios
					.get('https://yesno.wtf/api')
					.then(response => {
						this.answer = response.data.answer
					})
					.catch(error => {
						this.answer = 'Error!Could not reach the API.' + error
					});
			},
			onScroll () {
				console.log(1);
			},
			eventUp (event) {
				console.log(event);
			},
			onEnlargeText (enlargeAmount) {
				this.postFontSize += enlargeAmount;
			}
		}
	};

	const app = Vue.createApp(HelloVueApp);

	app.component('todo-item', {
		props: ['todo'],
		template: `<li>{{ todo.name }}</li>`
	});

	app.component('my-component', {
		template: `
			<p class="foo bar">Hi!</p>
			<span :class="$attrs.class">inline-block</span>
		`
	});

	app.component('my-component2', {
		template: `
			<div>
				{{ name }}
				<button @click="$emit('remove')">Remove</button>
			</div>
		`,
		props: ['name'],
		emit: ['remove']
	});

	app.component('button-count', {
		data () {
			return {
				btnCount: 0
			}
		},
		template: `
			<button @click="btnCount++">{{ 'click ' + btnCount }}</button>
		`
	});

	app.component('blog-post', {
		props: ['title'],
		template: `
			<h4>{{ title }}</h4>
			<button @click="$emit('enlargeText', 0.1)">Enlarge text</button>
		`
	});

	app.component('custom-input', {
		props: ['modelValue'],
		emits: ['update: modelValue'],
		template: `
			<input :value="modelValue" @input="$emit('update: modelValue', $event.target.value)">
		`
	});

	app.component('custom-input2', {
		props: ['modelValue2'],
		emits: ['update: modelValue2'],
		template: `
			<input v-model="value">
		`,
		computed: {
			value: {
				get () {
					return this.modelValue2;
				},
				set (value) {
					this.$emit('update: modelValue2', value);
				}
			}
		}
	});

	app.component('alert-box', {
		template: `
			<div>
				<b>Error!</b>
				<slot></slot>
			</div>
		`
	});

	app.component('tab-home', {
		template: `<div>Home component</div>`
	});

	app.component('tab-posts', {
		template: `<div>Posts component</div>`
	});

	app.component('tab-archive', {
		template: `<div>Archive component</div>`
	});

	var vm = app.mount('#helloVue');

	vm.fullName = 'jack';
}