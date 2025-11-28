<template>
  <el-container>
    <el-header>
      <h1 style="font-size: 50px;margin-left: 600px;margin-top: 80px">欢迎加入</h1>
      <div style="position: absolute; right: 20px; top: 20px;">
        <span v-if="userInfo">欢迎，{{ userInfo.username }}！</span>
        <el-button @click="logout" style="margin-left: 10px;">退出登录</el-button>
      </div>
    </el-header>
    <el-main>
      <div v-if="loading">
        <p>正在验证用户信息...</p>
      </div>
      <div v-else-if="userInfo">
        <h3>用户信息</h3>
        <p>用户ID: {{ userInfo.id }}</p>
        <p>用户名: {{ userInfo.username }}</p>
        <p>姓名: {{ userInfo.name }}</p>
      </div>
      <div v-else>
        <p style="color: red;">验证失败，请重新登录</p>
        <el-button @click="$router.push('/login')">重新登录</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      userInfo: null
    }
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      console.log('=== 检查认证 ===');

      // 检查 token
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      if (!token) {
        console.log('❌ 没有 token，跳转到登录页');
        this.$message.error('请先登录');
        this.$router.replace('/login');
        return;
      }

      // 从 localStorage 获取用户信息
      const userInfoStr = localStorage.getItem('userInfo') || localStorage.getItem('honey-user');
      console.log('用户信息字符串:', userInfoStr);

      if (userInfoStr) {
        try {
          this.userInfo = JSON.parse(userInfoStr);
          console.log('✅ 用户信息:', this.userInfo);
          this.$message.success('欢迎回来！');
        } catch (error) {
          console.error('解析用户信息失败:', error);
          this.$message.error('用户信息解析失败');
        }
      } else {
        console.log('❌ 没有用户信息');
        this.$message.error('用户信息不存在');
      }
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('honey-user');
      this.$message.success('已退出登录');
      this.$router.replace('/login');
    }
  }
}
</script>