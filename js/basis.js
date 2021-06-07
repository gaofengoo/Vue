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
                ]
            }
        },
        mounted () {
            setInterval(() => {
                this.count++;
            }, 1000);
        },
        methods: {
            reverseMessage () {
                this.message = this.message.split('').reverse().join('');
            }
        }
    };

    const app = Vue.createApp(HelloVueApp);

    app.component('todo-item', {
        props: ['todo'],
        template: `<li>{{ todo.name }}</li>`
    });

    app.mount('#helloVue');
}