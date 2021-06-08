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
                style2: 'height: 1000px;'
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

    var vm = app.mount('#helloVue');

    vm.fullName = 'jack';
}