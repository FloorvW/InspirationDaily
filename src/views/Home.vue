<template>
  <div class="container">
    <stack :column-min-width="300" :gutter-width="15" :gutter-height="15" monitor-images-loaded>
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
    image: {
      description: "",
    },
  }),
  methods: {
    //Fetches latest images from UnSplash
    searchUnsplash() {
      this.images = [];

      axios
        .get(`https://api.unsplash.com/photos?order_by=latest`, {
          headers: {
            Authorization:
              "Client-ID NzvzFaES6WCBY0qwjArIc45aNNnZRQDajC1CzRtYbO8",
            "Accept-Version": "v1",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.images = response.data;
        })
        .catch(() => {
          this.images = [];
        });
    },
    //used when clicked on image
    //emits to App.Vue
    handleClick(e) {
      var desc = "";
      var name = "";
      var bio = "";
      var photo = "";
      var username = "";

      var id = e.srcElement.id;
      for (var image of this.images) {
        if (image.id === id) {
          desc = image.description;
          name = image.user.name;
          bio = image.user.bio;
          photo = image.urls.small;
          username = image.user.username;
        }
      }
      this.$emit("handleClick", desc, name, bio, photo, username);
    },
  },

  mounted() {
    this.searchUnsplash();
  },
};
</script>

<style scoped>
.container {
  padding-top: 18rem;
}
</style>