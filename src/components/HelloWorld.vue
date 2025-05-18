<template>
  <div class="hello">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <img alt="Custom Image" src="@/assets/hu.png" />
    <img alt="Custom Image" src="@/assets/nv.png" />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

// 避免直接使用v-html
<div v-html="sanitizedHtml"></div>

<script>
import DOMPurify from "dompurify"; // 安装：npm install dompurify

export default {
  computed: {
    sanitizedHtml() {
      return DOMPurify.sanitize(this.rawHtml);
    },
  },
};
</script>
