<template>
  <div id="info" class="container">
    <img :src="this.$route.params.photo" alt />
    <h2>{{ this.$route.params.name}}</h2>
    <h4>{{ this.$route.params.desc }}</h4>
    <h5>{{ this.$route.params.height}}px x {{this.$route.params.width}}px</h5>
    <p>{{ this.$route.params.bio }}</p>
    <h3>Other photos by same author:</h3>
    <stack class="morephotos" :column-min-width="320" monitor-images-loaded>
      <stack-item
        v-for="(image, i) in this.images"
        :key="i"
        style="transition: transform 300ms"
        @click.native="handleClick"
      >
        <img :src="image.urls.small" :alt="image.alt_description" :id="image.id" />
      </stack-item>
    </stack>
  </div>
</template>

<script>
import axios from "axios";
import { Stack, StackItem } from "vue-stack-grid";

export default {
  components: {
    Stack,
    StackItem,
  },
  data: () => ({
    images: [],
  }),
  methods: {
    //Fetches images from the same author as clicked image
    handleUser() {
      this.images = [];
      axios
        .get(
          `https://api.unsplash.com/users/${this.$route.params.user}/photos?per_page=3`,
          {
            headers: {
              Authorization:
                "Client-ID NzvzFaES6WCBY0qwjArIc45aNNnZRQDajC1CzRtYbO8",
              "Accept-Version": "v1",
            },
          }
        )
        .then((response) => {
          this.images = response.data;
        })
        .catch(() => {
          this.images = [];
        });
    },
  },
  mounted() {
    this.handleUser();
  },
};
</script>

<style scoped>
#info {
  padding-top: 18rem;
}
</style>