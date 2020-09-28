<template>
  <div>
    <div id="loader-container" v-if="!response && validUrl" :style="{width:cardWidth}">
      <slot name="loading">
        <div class="spinner"></div>
      </slot>
    </div>
    <div v-if="response">
      <slot
        :img="response.image"
        :title="response.title"
        :description="response.description"
        :url="url"
      >
        <div class="wrapper" :style="{width:cardWidth}">
          <div class="card-img">
            <img :src="response.image" />
          </div>
          <div class="card-info">
            <div class="card-text">
              <h1>{{response.title}}</h1>
              <p>{{response.description}}</p>
            </div>
            <div class="card-btn">
              <a href="javascript:;" v-if="showButton" @click="viewMore">View More</a>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "link-prevue",
  props: {
    url: {
      type: String,
      default: "",
    },
    cardWidth: {
      type: String,
      default: "400px",
    },
    onButtonClick: {
      type: Function,
      default: undefined,
    },
    showButton: {
      type: Boolean,
      default: true,
    },
    apiUrl: {
      type: String,
      default: "https://link-prevue-api-v2.herokuapp.com/preview/",
    },
    getLinkPreview: {
      type: Function,
      default: undefined,
    },
  },
  watch: {
    url: function () {
      this.response = null;
      this.loadLinkPreview();
    },
  },
  created() {
    this.loadLinkPreview();
  },
  data: function () {
    return {
      response: null,
      validUrl: false,
    };
  },
  methods: {
    viewMore: function () {
      if (this.onButtonClick !== undefined) {
        this.onButtonClick(this.response);
      } else {
        const win = window.open(this.url, "_blank");
        win.focus();
      }
    },
    isValidUrl: function (url) {
      const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
      this.validUrl = regex.test(url);
      return this.validUrl;
    },
    loadLinkPreview: function () {
      if (this.isValidUrl(this.url)) {
        const f =
          this.getLinkPreview !== undefined
            ? this.getLinkPreview
            : this.defaultGetLinkPreview;

        f(this.url)
          .then((response) => {
            this.response = response;
          })
          .catch(() => {
            this.response = null;
            this.validUrl = false;
          });
      }
    },
    defaultGetLinkPreview: function (url) {
      return this.httpRequest(url).then((response) => JSON.parse(response));
    },
    httpRequest: function (url) {
      return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
        const params = "url=" + url;
        http.open("POST", this.apiUrl, true);
        http.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        http.onreadystatechange = function () {
          if (http.readyState === 4 && http.status === 200) {
            resolve(http.responseText);
          }
          if (http.readyState === 4 && http.status === 500) {
            reject();
          }
        };
        http.send(params);
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Hind+Siliguri:400,600");

.wrapper {
  overflow: auto;
  border-radius: 7px 7px 7px 7px;
  background-color: #fff;
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}

.card-img {
  width: 100%;
}

.card-img img {
  width: 100%;
  border-radius: 7px 7px 0 0;
}

img {
  vertical-align: middle;
  border-style: none;
}

.card-info {
  border-radius: 0 0 7px 7px;
  background-color: #ffffff;
}

.card-text {
  width: 80%;
  margin: 0 auto;
  text-align: justify;
}

.card-text h1 {
  text-align: center;
  font-size: 24px;
  color: #474747;
  margin: 5px 0 5px 0;
  font-family: "Hind Siliguri", sans-serif;
}

.card-text p {
  font-family: "Hind Siliguri", sans-serif;
  color: #8d8d8d;
  font-size: 15px;
  overflow: hidden;
  margin: 0;
  text-align: center;
}

.card-btn {
  margin: 1em 0 1em 0;
  position: relative;
  text-align: center;
}

.card-btn a {
  border-radius: 2em;
  font-family: "Hind Siliguri", sans-serif;
  font-size: 14px;
  letter-spacing: 0.1em;
  color: #ffffff;
  background-color: #ffa9be;
  padding: 10px 20px 10px 20px;
  text-align: center;
  display: inline-block;
  text-decoration: none !important;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.card-btn a:hover {
  background-color: #ff8fab;
}

/* Loader */
.spinner {
  margin-top: 40%;
  margin-left: 45%;
  height: 28px;
  width: 28px;
  animation: rotate 0.8s infinite linear;
  border: 5px solid #868686;
  border-right-color: transparent;
  border-radius: 50%;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
