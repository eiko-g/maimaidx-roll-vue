<template>
  <div class="error">
    <p>404 Page</p>
  </div>
</template>

<script>
export default {
  name: "Error",
  methods: {
    backToHome() {
      setTimeout(() => {
        this.$router.push({ name: "Roll" });
      }, 3000);
    },
  },
  mounted() {
    this.backToHome();
  },
};
</script>

<style>
</style>
