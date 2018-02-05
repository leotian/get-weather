<template>
  <div>
    <el-date-picker
      v-model="value"
      align="right"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions1">
    </el-date-picker>
    <el-button type="primary" @click="download">
      下载
    </el-button>
    <div class="disclaimer">Created by <a href="https://leotian.cn/">Leo.Tian</a></div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            const date = new Date();
            return time.getTime() > date.setTime(date.getTime() - 3600 * 1000 * 24);
          },
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }]
        },
        value: '',
      }
    },
    methods: {
      download() {
        if (!this.value) return this.$message.error('请选择日期')
        window.open(`/api/getWeather/${this.value}`)
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    color: #111111;
  }

  .disclaimer {
    position: absolute;
    bottom: 20px;
    width: 100%;
  }
</style>
