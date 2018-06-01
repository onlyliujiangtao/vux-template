<template>
  <div class="page">
    <button @click="$router.push('/')">main</button>
  </div>
</template>
<script>
export default {
  //组件私有数据（必须是function，而且要return对象类型）
  data() {
    return {
      title: '组件标题',
      firstName: '',
      lastName: '',
    }
  },
  //父组件传递过来的数据（两种方式声明：1.数组 2.对象）
  //数组方式
  props: ['age'],
  //对象方式
  /*props: {
    age: {
      type: Number,
      default: 0,
      required: true,
      validator: function (value) {
        return value >= 0
      }
    }
  }*/
  //计算属性
  computed: {
    
  },
  //监听
  watch: {

  },
  //函数集，自己封装，便于开发使用
  methods: {

  },
  //生命周期钩子：实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
  beforeCreated() {
    
  },
  //生命周期钩子：组件实例完成创建之后调用
  created() {

  },
  //生命周期钩子：组件实例渲染完成时调用
  mounted() {

  },
  //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
  components: {

  }
}
</script>
<style lang="scss" scoped>
/**使用scss编写样式，既可提高开发效率，也方便维护
*  scoped省略后，该样式片段会应用到页面全局
*  支持import语法引入css文件
*/

</style>
