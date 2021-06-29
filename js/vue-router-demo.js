window.onload = function () {
    const Home = {
        template: '<div>Home</div>'
    };
    const About = {
        template: '<div>About</div>'
    };
    const User = {
        template: `
                <div class="user">
                    <h2>User{{ $route.params.id }}</h2>
                    <router-view></router-view>
                </div>
            `,
        created () {
            this.$watch(
                () => this.$router.params,
                (toParams, previousParams) => {

                }        
            );
        },
        async beforeRouteUpdate (to, from) {
            this.userData = await fetchUser(to.params.id);
        }
    };
    const routes = [
        {
            path: '/',
            component: Home
        }, {
            path: '/about',
            component: About
        }, {
            path: '/users/:id',
            component: User,
            children: [
                {
                    path: 'profile',
                    component: UserProfile
                }, {
                    path: 'posts',
                    component: UserPosts
                }, {
                    path: '',
                    component: UserHome
                }
            ]
        }, {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        }, {
            path: '/user-:afterUser(.*)',
            component: UserGeneric
        }, {
            name: 'NotFound2',
            params: {
                pathMatch: this.$route.path.split('/')
            }
        }, {
            path: '/:orderId(\\d+)'
        }, {
            path: '/:productName'
        }, {
            path: '/:chapters+'
        }, {
            path: '/:chapters*'
        }
    ];
    const router = VueRouter.createRouter({
        history: VueRouter.createWebHashHistory(),
        routes
    });
    const app = Vue.createApp({});
    app.use(router);
    app.mount('#app');
}
