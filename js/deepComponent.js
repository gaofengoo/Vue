window.onload = function () {
    const app = Vue.createApp({
        // components: {
        //     'component-a': ComponentA,
        //     'component-b': ComponentB,
        //     'component-c': ComponentC

        // }
    });
    // 局部组件
    // const ComponentA = {};
    // const ComponentB = {
    //     // 在ComponentA中使用ComponentB
    //     components: {
    //         'component-a': ComponentA
    //     }
    // };
    // const ComponentC = {};

    // 全局组件
    app.component('component-a', {});
    app.component('component-b', {});
    app.component('component-c', {});

    app.mount('#myComponent');
}