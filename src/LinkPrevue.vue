<template>
  <div>
    <div id="loader-container" v-if="!response && validUrl" :style="{ width: cardWidth }">
      <slot name="loading">
        <div class="spinner"></div>
      </slot>
    </div>
    <div v-if="response && shouldShowCard">
      <slot :img="response.image" :title="response.title" :description="response.description" :url="url">
        <div class="wrapper" :style="{ width: cardWidth }">
          <div class="card-img">
            <img :src="response.image" />
          </div>
          <div class="card-info">
            <div class="card-text">
              <h1>{{ response.title }}</h1>
              <p>{{ response.description }}</p>
            </div>
            <div class="card-btn">
              <a href="javascript:;" v-if="showButton" @click="viewMore" :style="buttonStyle">View More</a>
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
    hideWhenEmpty: {
      type: Boolean,
      default: false,
    },
    apiUrl: {
      type: String,
      default: "https://link-preview-api.nivaldo.workers.dev/preview",
    },
    buttonColor: {
      type: String,
      default: "#ffa9be",
    },
  },
  watch: {
    url: function () {
      this.response = null;
      this.getLinkPreview();
    },
  },
  created() {
    this.getLinkPreview();
  },
  data: function () {
    return {
      response: null,
      validUrl: false,
    };
  },
  computed: {
    shouldShowCard: function () {
      if (!this.response) return false;
      if (!this.hideWhenEmpty) return true;

      return this.response.image !== null || this.response.title !== null || this.response.description !== null;
    },
    buttonStyle: function () {
      const color = this.normalizeColor(this.buttonColor);
      return {
        backgroundColor: color,
        '--button-hover-color': this.darkenColor(color),
      };
    },
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
    getLinkPreview: function () {
      if (this.isValidUrl(this.url)) {
        this.httpRequest(
          (response) => {
            if (
              this.hideEmpty &&
              (!response.title && !response.description && !response.image)
            ) {
              this.response = null;
              this.validUrl = false;
              return;
            }

            this.response = response;
          },
          () => {
            this.response = null;
            this.validUrl = false;
          }
        );
      }
    },
    httpRequest: function (success, error) {
      fetch(`${this.apiUrl}?url=${this.url}`)
      .then(response => response.json())
      .then(linkPreviewData => success(linkPreviewData))
      .catch(() => error())
    },
    normalizeColor: function (color) {
      if (!color) return "#ffa9be";
      // If it's already a valid CSS color (starts with #, rgb, rgba, or is a named color), return as is
      if (color.startsWith("#") || color.startsWith("rgb") || color.startsWith("hsl")) {
        return color;
      }
      // If it's a hex color without #, add it
      if (/^[0-9A-Fa-f]{6}$/.test(color) || /^[0-9A-Fa-f]{3}$/.test(color)) {
        return "#" + color;
      }
      // Otherwise, assume it's a CSS color name (red, blue, etc.)
      return color;
    },
    darkenColor: function (color) {
      // Simple darkening function for hex colors
      if (color.startsWith("#")) {
        const hex = color.slice(1);
        const num = parseInt(hex, 16);
        const r = Math.max(0, ((num >> 16) & 0xff) - 20);
        const g = Math.max(0, ((num >> 8) & 0xff) - 20);
        const b = Math.max(0, (num & 0xff) - 20);
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
      }
      // Handle RGB/RGBA values
      if (color.startsWith("rgb")) {
        const match = color.match(/\d+/g);
        if (match && match.length >= 3) {
          const r = Math.max(0, parseInt(match[0]) - 20);
          const g = Math.max(0, parseInt(match[1]) - 20);
          const b = Math.max(0, parseInt(match[2]) - 20);
          if (match.length === 4) {
            // RGBA
            return `rgba(${r}, ${g}, ${b}, ${match[3]})`;
          }
          // RGB
          return `rgb(${r}, ${g}, ${b})`;
        }
      }
      // For named colors or HSL, return original (browser will handle hover)
      return color;
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
  background-color: var(--button-hover-color, #ff8fab) !important;
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
  