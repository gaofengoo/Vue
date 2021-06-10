window.onload = function () {
    const app = {
        data () {
            return {
                show: true,
                show2: true
            }
        }
    }   
    Vue.createApp(app).mount('#animation');
}