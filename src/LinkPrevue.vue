<template>
  <div>
    <div v-if="!data && validUrl" id="loader-container" :style="{ width: cardWidth }">
      <slot name="loading">
        <div class="spinner"></div>
      </slot>
    </div>
    <div v-if="data">
      <slot :img="data.image" :title="data.title" :description="data.description" :url="url">
        <div class="wrapper" :style="{ width: cardWidth }">
          <div class="card-img">
            <img :src="data.image" />
          </div>
          <div class="card-info">
            <div class="card-text">
              <h1>{{ data.title }}</h1>
              <p>{{ data.description }}</p>
            </div>
            <div class="card-btn">
              <a v-if="showButton" href="javascript:;" @click="viewMore">View More</a>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    url?: string
    cardWidth?: string
    showButton?: boolean
    apiUrl?: string
    onButtonClick?: (response: Response | null) => void
  }>(),
  {
    url: '',
    cardWidth: '400px',
    showButton: true,
    apiUrl: 'https://link-preview-api.nivaldo.workers.dev/preview',
    onButtonClick: () => {
      const win = window.open(props.url, '_blank')
      win?.focus()
    }
  }
)

type LinkData = {
  title: string
  image: string
  description: string
}

const data = ref<LinkData | null>(null)
const response = ref<Response | null>(null)
const validUrl = ref(false)

function viewMore() {
  props.onButtonClick(response.value)
}

function isValidUrl(url: string): boolean {
  const regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
  validUrl.value = regex.test(url)
  return validUrl.value
}

function getLinkPreview() {
  if (isValidUrl(props.url)) {
    httpRequest(
      (r) => {
        response.value = r
      },
      () => {
        response.value = null
        validUrl.value = false
      }
    )
  }
}

function httpRequest(success: (resp: Response) => void, error: (reason: unknown) => void) {
  fetch(`${props.apiUrl}?url=${props.url}`)
    .then((response) => response.json())
    .then((linkPreviewData) => success(linkPreviewData))
    .catch(error)
}

watchEffect(() => {
  if (response.value)
    response.value.json().then((json) => {
      data.value = json as LinkData
    })
  else data.value = null
})

watch(props, (n, o) => {
  if (n.url !== o.url) {
    response.value = null
    getLinkPreview()
  }
})

getLinkPreview()
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
