<template>
    <div class="login">
        <x-button type="primary" @click.native="login">登录</x-button>
    </div>
</template>

<script>
    import {XInput,XButton} from 'vux';
    import { setCookie } from '@/components/common';

    export default {
        name:'login',
        components:{XInput,XButton},
        data(){
            return{}
        },
        mounted(){
        },
        methods:{
            login(){
                setCookie('token','123',7);
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped lang="scss">

</style>