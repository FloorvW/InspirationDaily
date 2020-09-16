<template>
  <div class="container">
    <img :src="image" />
    <!-- <p v-if="!Loaded">please wait while image is loading...</p> -->
    <button class="btn" @click="searchRandom">Search again</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      image: " ",
      loaded: true,
    };
  },
  methods: {
    //Random images is fetched
    //performance.now() parameter added to circumvent caching
    searchRandom() {
      this.image =
        "https://source.unsplash.com/random/800x450" +
        "?sig=" +
        performance.now();
    },
  },
  mounted() {
    this.image = "https://source.unsplash.com/random/800x450";
  },
};
</script>

<style scoped>
.container {
  padding-top: 15rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.btn {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
</style>
