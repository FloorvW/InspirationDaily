<template>
  <div id="app">
    <div id="nav">
      <h1>
        Inspiration<span class="titeltwo">Daily</span>
      </h1>
      <h5>
        <i>Get inspired by the newest content, every day again...</i>
      </h5>
      <router-link class="menu" to="/">Home</router-link>
      <router-link class="menu" to="/categories">Categories</router-link>
      <router-link class="menu" to="/random">Random</router-link>
    </div>
    <router-view @handleClick="handleClick" />
    <footer class="footer is-primary">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h3 class="footertitle">
              Inspiration<span>Daily</span>
            </h3>
            <a :href="this.sites[0]">Home</a>
            <a :href="this.sites[1]">Categories</a>
            <a :href="this.sites[2]">Random</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import router from "./router/index.js";

export default {
  name: "app",
  props: {
    sites: [],
  },
  methods: {
    //called when user clicks an image
    // pushes data to Info and shows Info
    handleClick(d, n, b, p, u, h, w) {
      router.push({
        name: "Info",
        params: {
          desc: d,
          name: n,
          bio: b,
          photo: p,
          user: u,
          height: h,
          width: w,
        },
      });
    },
    //get routes in order to generate sitemap
    getRoutesList(routes, pre) {
      return routes.reduce((array, route) => {
        const path = `${pre}${route.path}`;

        if (route.path !== "*") {
          array.push(path);
        }

        if (route.children) {
          array.push(...this.getRoutesList(route.children, `${path}/`));
        }

        return array;
      }, []);
    },
    redirectTo() {},
  },
  mounted() {
    this.sites = this.getRoutesList(
      router.options.routes,
      "http://floorvanwieringen.com/InspirationDaily/#"
    );
  },
};
</script>





<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  position: fixed;
  z-index: 3;
  background-color: white;
  width: 100%;
  height: 30%;
  margin-top: -2%;
  padding-top: 0%;
  /* display: block; */
  text-align: center;
}

#nav a {
  float: center;
  text-align: center;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  font-size: 20px;
}

#nav a.router-link-exact-active {
  color: #20289e !important;
  background-color: rgb(204, 232, 233);
  border: 2px solid;
  /* border-radius: 30px; */
  border-color: white;
  box-shadow: 2px 2px 2px 2px;
  padding: 10px;
  background-color: white;
}

.menu {
  position: relative;
  text-align: center;
  margin: 1.5em;
  color: rgb(181, 202, 212) !important;
  font-weight: bold;
  font-size: 12em;
  text-transform: uppercase;
  width: 100%;

  /* border: 2px solid;
  border-radius: 30px;
  border-color: white;
  box-shadow: 2px 2px 2px 2px;
  padding: 10px;
  background-color:white; */
}

.menu:hover {
  background-color: rgb(107, 213, 216);
  border: 2px solid;
  /* border-radius: 30px; */
  border-color: white;
  box-shadow: 2px 2px 2px 2px;
  padding: 10px;
  background-color: white;
}

@media screen and (max-width: 600px) {
  .menu {
    /* float: none;
    width: 100%; */
    /* display: block; */
    width: 50%;
    margin-left: 1rem;
    margin-right: 1rem;
  
  }
}

h1 {
  font-size: 3rem;
  margin-top: 4%;
  margin-bottom: 0%;
  color: #20289e;
  text-decoration: underline;
}

h3 {
  color: #20289e;
}

h5 {
  margin-bottom: 4%;
  margin-top: 0%;
}

span {
  color: rgb(10, 42, 82);
}

footer {
  /* background-color: #f1f3f8 !important; */
  color: #fff;
  height: 100px;
  width: 100%;
}

footer a {
  margin: 2rem;
  text-decoration: none;
  color: rgb(85, 112, 138);
  font-size: 1.1rem;
}

.footertitle {
  padding-top: 1rem;
}
</style>
