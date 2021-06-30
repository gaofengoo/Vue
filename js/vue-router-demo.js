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
const UserSettings = {
    template: `
        <div>
            <h1>User Settings</h1>
            <NavBar />
            <router-view />
            <router-view name="helper">
        </div>
    `
};
const UserProfile = {};
const UserPosts = {};
const UserHome = {};
const NotFound = {};
const UserGeneric = {};
const LeftSidebar = {};
const RightSidebar = {};
const UserEmailsSubscriptions = {};
const UserProfilePreview = {};
const UserList = {};
const UserLayout = {};
const UsersByIdLayout = {};
const Sidebar = {};
const SearchUser = {};
const User2 = {
    props: ['id'],
    template: '<div>User{{ id }}</div>'
};
const UserDetails = {
    template: ``,
    beforRouteEnter (to, from, next) {
        next(vm => {});
    },
    beforeRouteUpdate (to, from) {
        this.name = to.params.name;
    },
    beforeRouteLeave (to, from) {
        const answer = window.confirm('Do you really want to leave?you have unsaved changes!');
        if (!answer) {
            return false;
        }
    }
};

function removeQueryParams (to) {
    if (Object.keys(to.query).length) {
        return {
            path: to.path,
            query: {},
            hash: to.hash
        }
    }
}

function removeHash (to) {
    if (to.hash) {
        return {
            path: to.path,
            query: to.query,
            hash: ''
        }
    }
}

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
    }, 
   /* {
        name: 'NotFound2',
        params: {
            // pathMatch: this.$route.path.split('/')
        }
    }, {
        path: '/:orderId(\\d+)'
    }, {
        path: '/:productName'
    }, {
        path: '/:chapters+'
    }, {
        path: '/:chapters*'
    }, */
    {
        path: '/',
        component: {
            default: Home,
            LeftSidebar,
            RightSidebar
        }
    }, 
    {
        path: '/settings',
        component: UserSettings,
        children: [{
            path: 'emails',
            component: UserEmailsSubscriptions
        }, {
            path: 'profile',
            components: {
                default: UserProfile,
                helper: UserProfilePreview
            }
        }]
    }, 
    /*{
        path: '/home',
        redirect: '/' // 重定向也可以是一个命名的路由 {name: 'homepage'}
    }, {
        path: '/search/:searchText',
        redirect: to => {
            return {
                path: 'search',
                query: {
                    q: to.params.searchText
                }
            }
        }
    }, */
    {
        path: '/users',
        component: UserLayout,
        children: [
            {
                path: '',
                component: UserList,
                alias: ['/people', 'list']
            }
        ]
    }, {
        path: '/users/:id',
        component: UsersByIdLayout,
        children: [{
            path: 'profile',
            component: UserDetails,
            alias: ['/:id', '']
        }]
    }, {
        path: '/user2/:id',
        // component: User2,
        component: {
            default: User2,
            siderbar: Sidebar
        },
        props: {
            default: true,
            siderbar: false
        }
    }, {
        path: '/search',
        component: SearchUser,
        props: route => ({
            query: route.query.q
        })
    },
    // 路由独享的守卫
    {
        path: '/users2/:id',
        component: UserDetails,
        beforeEnter: (to, from) => {
            return false;
        }
    }, {
        path: '/users/:id',
        component: UserDetails,
        beforeEnter: [removeQueryParams, removeHash]
    }, {
        path: '/about',
        component: UserDetails,
        beforeEnter: [removeQueryParams]
    }
];
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
});
// 全局前置守卫
router.beforeEach((to, from, /*next*/) => {
    /*if (to.name !== 'Login' && !isAuthenticated) {
        next({
            name: 'Login'
        });
    } else {
        next();
    }*/
    return false;
});
// 全局解析守卫
router.beforeResolve(async to => {
    if (to.meta.requiresCamera) {
        try {
            await askFroCameraPermission();
        } catch (error) {
            if (error instanceof NotAllowedError) {
                return false;
            } else {
                throw error;
            }
        }
    }
});
// 全局后置钩子
router.afterEach((to, from, failure) => {
    if (!failure) {
        sendToAnalytics(to.fullPath);
    }
});
const app = Vue.createApp({});
app.use(router);
app.mount('#app');
