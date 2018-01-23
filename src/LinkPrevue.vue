<template>
  <div>
    <div class="loader-container" v-if="!response && validUrl" :style="{width:cardWidth}">
      <div id="loader">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
    <div v-if="response">
      <slot :img="response.images[0]" :title="response.title" :description="response.description" :url="url">
      	<div class="wrapper" :style="{width:cardWidth}">
            <div class="card-img">
          		<img :src="response.images[0]">
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
  name: 'link-prevue',
  props: {
    url: {
      type: String,
      default: ''
    },
    cardWidth: {
      type: String,
      default: '400px'
    },
    onButtonClick: {
      type: Function,
      default: undefined
    },
    showButton: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    url: function(value) {
      this.response = null
      this.getLinkPreview()
    }
  },
  created() {
    this.getLinkPreview()
  },
  data: function() {
    return {
      response: null,
      validUrl: false
    }
  },
  methods: {
    viewMore: function() {
      if (this.onButtonClick !== undefined) {
        this.onButtonClick(this.response)
      } else {
        const win = window.open(this.url, '_blank')
        win.focus()
      }
    },
    isValidUrl: function(url) {
      const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      this.validUrl = regex.test(url)
      return this.validUrl
    },
    getLinkPreview: function() {
      if (this.isValidUrl(this.url)) {
        this.httpRequest((response) => {
          this.response = JSON.parse(response)
        }, () => {
          this.response = null
          this.validUrl = false
        })
      }
    },
    httpRequest: function(success, error) {
      const http = new XMLHttpRequest()
      const APIUrl = 'https://linkpreview-api.herokuapp.com/'
      const params = 'url=' + this.url
      http.open('POST', APIUrl, true)
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      http.onreadystatechange = function() {
    		if (http.readyState === 4 && http.status === 200) {
        	   success(http.responseText)
    		   }
        if (http.readyState === 4 && http.status === 500) {
        	   error()
    		   }
      }
      http.send(params)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Hind+Siliguri:400,600');

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
  background-color: #fdf1ec;
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
  font-family: 'Hind Siliguri', sans-serif;
}

.card-text p {
  font-family: 'Hind Siliguri', sans-serif;
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
  font-family: 'Hind Siliguri', sans-serif;
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
.loader-container {
  overflow: auto;
}

#loader {
  height: 100px;
  width: 100%;
}
#loader ul {
  margin: 0 auto;
  list-style: none;
  width: 90px;
  position: relative;
  padding: 0;
  height: 100%;
}
#loader ul li {
  position: absolute;
  width: 2px;
  height: 0;
  background-color: #000;
  bottom: 0;
}
@keyframes sequence1 {
  0% {
    height: 10px;
  }
  50% {
    height: 50px;
  }
  100% {
    height: 10px;
  }
}
@keyframes sequence2 {
  0% {
    height: 20px;
  }
  50% {
    height: 65px;
  }
  100% {
    height: 20px;
  }
}
#loader li:nth-child(1) {
  left: 0;
  animation: sequence1 1s ease infinite 0;
}
#loader li:nth-child(2) {
  left: 15px;
  animation: sequence2 1s ease infinite 0.1s;
}
#loader li:nth-child(3) {
  left: 30px;
  animation: sequence1 1s ease-in-out infinite 0.2s;
}
#loader li:nth-child(4) {
  left: 45px;
  animation: sequence2 1s ease-in infinite 0.3s;
}
#loader li:nth-child(5) {
  left: 60px;
  animation: sequence1 1s ease-in-out infinite 0.4s;
}
#loader li:nth-child(6) {
  left: 75px;
  animation: sequence2 1s ease infinite 0.5s;
}
</style>
