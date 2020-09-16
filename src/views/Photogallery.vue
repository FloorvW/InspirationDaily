<template>
  <div class="container">
    <div class="button-wrapper">
      <button class="btn" @click="searchUnsplash('Fashion')">Fashion</button>
      <button class="btn" @click="searchUnsplash('Architecture')">Architecture</button>
      <button class="btn" @click="searchUnsplash('Food')">Food</button>
      <button class="btn" @click="searchUnsplash('Design')">Design</button>
      <button class="btn" @click="searchUnsplash('Travel')">Travel</button>
      <button class="btn" @click="searchUnsplash('Sports')">Sports</button>
      <button class="btn" @click="searchUnsplash('Work')">Work</button>
    </div>
    <div>
      <h3 class="colorsearch">Search by color:</h3>
      <button class="btn2 blackwhite" @click="searchColor('black_and_white')"></button>
      <button class="btn2 black" @click="searchColor('black')"></button>
      <button class="btn2 white" @click="searchColor('white')"></button>
      <button class="btn2 yellow" @click="searchColor('yellow')"></button>
      <button class="btn2 orange" @click="searchColor('orange')"></button>
      <button class="btn2 red" @click="searchColor('red')"></button>
      <button class="btn2 purple" @click="searchColor('purple')"></button>
      <button class="btn2 magenta" @click="searchColor('magenta')"></button>
      <button class="btn2 green" @click="searchColor('green')"></button>
      <button class="btn2 teal" @click="searchColor('teal')"></button>
      <button class="btn2 blue" @click="searchColor('blue')"></button>
    </div>
    <div>
      <h4 class="sort">Sort by:</h4>
      <button class="btn3" @click="sortByHeight">Height</button>
      <button class="btn3" @click="sortByWidth">Width</button>
    </div>
    <stack :column-min-width="320" monitor-images-loaded>
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
    topic: "",
  }),
  methods: {
    //Fetches latest images from UnSplash based on chosen topic
    searchUnsplash(topic) {
      this.images = [];
      this.topic = topic;

      axios
        .get(
          `https://api.unsplash.com/search/photos?query=${topic}&per_page=10&order_by=latest`,
          {
            headers: {
              Authorization:
                "Client-ID NzvzFaES6WCBY0qwjArIc45aNNnZRQDajC1CzRtYbO8",
              "Accept-Version": "v1",
            },
          }
        )
        .then((response) => {
          this.images = response.data.results;
        })
        .catch(() => {
          this.images = [];
        });
    },
    searchColor(color) {
      this.images = [];

      axios
        .get(
          `https://api.unsplash.com/search/photos?query=${this.topic}&per_page=10&order_by=latest&color=${color}`,
          {
            headers: {
              Authorization:
                "Client-ID NzvzFaES6WCBY0qwjArIc45aNNnZRQDajC1CzRtYbO8",
              "Accept-Version": "v1",
            },
          }
        )
        .then((response) => {
          this.images = response.data.results;
        })
        .catch(() => {
          this.images = [];
        });
    },
    sortByHeight() {
      this.images.sort(function (a, b) {
        if (a.height > b.height) {
          return 1;
        }
        if (a.height < b.height) {
          return -1;
        }
        return 0;
      });
    },
    sortByWidth() {
      this.images.sort(function (a, b) {
        if (a.width > b.width) {
          return 1;
        }
        if (a.width < b.width) {
          return -1;
        }
        return 0;
      });
    },
    //Called when user clicks image
    //emits to App
    handleClick(e) {
      var desc = "";
      var name = "";
      var bio = "";
      var photo = "";
      var username = "";
      var height = 0;
      var width = 0;

      var id = e.srcElement.id;
      for (var image of this.images) {
        if (image.id === id) {
          desc = image.description;
          name = image.user.name;
          bio = image.user.bio;
          photo = image.urls.small;
          username = image.user.username;
          height = image.height;
          width = image.width;
        }
      }
      this.$emit(
        "handleClick",
        desc,
        name,
        bio,
        photo,
        username,
        height,
        width
      );
    },
  },
  //Default fetched images are from topic fashion
  mounted() {
    this.searchUnsplash("fashion");
  },
};
</script>

<style>
.nav-bar {
  background-color: aquamarine;
  height: 60px;
  margin-bottom: 15px;
  width: 100%;
  /* position: fixed; */
}

.container {
  width: 80vw;
  margin: 0 auto;
}
.button-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  padding-top: 22%;
}
.btn {
  font-size: 18px;
  color: rgb(176, 194, 204);
  border: 2px solid;
  box-shadow: 2px 2px 2px 2px;
  padding: 10px;
  border-color: white;
  padding: 10px 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0%;
  background-color: white;
}

.btn:hover {
  color: rgb(176, 210, 211);
}

.btn:active {
  color: #20289e !important;
}

.colorsearch {
  display: inline;
  margin-right: 8%;
}

.sort {
  display: inline;
  margin-right: 8%;
}

.btn2 {
  border: 2px solid;
  border-radius: 30px;
  border-color: white;
  padding: 10px;
  margin-left: 1%;
  margin-right: 1%;
}
.btn2:hover {
  font-size: 18px;
  border: 2px solid;

  padding: 10px;
  color: #f1f3f8;
  padding: 10px 20px;
  margin-left: 1%;
  margin-right: 1%;
  background-color: none;
}
.btn3 {
  font-size: 18px;
  color: rgb(176, 194, 204);
  border: 2px solid;
  box-shadow: 2px 2px 2px 2px;
  padding: 10px;
  border-color: white;
  padding: 5px 10px;
  margin-left: 2px;
  margin-right: 8px;
  margin-top: 2%;
  margin-bottom: 2%;
  background-color: white;
}

.btn3:hover {
  color: rgb(176, 210, 211);
}

.btn:not(:last-child) {
  margin-right: 10px;
}

.img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.blackwhite {
  background-color: grey;
}

.black {
  background-color: black;
}

.white {
  background-color: white;
  border-color: lightgrey;
}

.yellow {
  background-color: yellow;
}

.orange {
  background-color: orange;
}

.red {
  background-color: red;
}

.purple {
  background-color: purple;
}

.magenta {
  background-color: magenta;
}

.green {
  background-color: green;
}

.teal {
  background-color: teal;
}

.blue {
  background-color: blue;
}
</style>