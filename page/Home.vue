<script>
    export default {
        computed: {
            username () {
                return this.$route.params.username;
            }
        },
        methods: {
            goToDashboard () {
                if (isAuthenticated) {
                    this.$router.push('/dashboard');
                } else {
                    this.$router.push('/login');
                }
            }
        }
    }
</script>
