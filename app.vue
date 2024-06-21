<template>
  <div class="main-container">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-2">
      <transition-group enter-active-class="transition duration-150 delay-150 ease-out"
        enter-from-class="opacity-0 scale-0" enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-0">
        <a :href="`https://x.com/${tweet.screen_name}/status/${tweet.tweet_id}`" v-for="tweet in tweets"
          :key="tweet.tweet_id" class="tweet" :style="`background-image: url(${tweet.media.photo[0].media_url_https})`">
          <div class="description">
            <div class="flex justify-between">
              <div class="screen-name">
                @{{ tweet.screen_name }}
              </div>
              <div class="likes">
                ❤️
                {{ tweet.favorites }}
              </div>
            </div>
          </div>
        </a>
      </transition-group>
    </div>
    <footer>
      made with love <a href="https://x.com/NamanyayG">by nmn</a> ⚡<br>
      <!-- check out <a href="#">his s5 idea</a> 💡 -->
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const { data: tweets } = await useAsyncData('tweets', () => queryContent('tweets').find())
</script>

<style scoped>
.main-container {
  background-color: #111;
  font-family: Inter;
  padding-bottom: 7em;
}

.tweet {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 100%;
  padding-bottom: 68.42%;
  transition: all .3s ease;
  position: relative;
}

.tweet:hover {
  transform: scale(1.05);
}

.tweet .description {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: all .5s ease;
  background-color: rgba(0, 0, 0, .75);
  color: rgba(255,255,255,.9);
  padding: 1.5em;
}

.tweet:hover .description {
  opacity: 1;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2em;
  text-align: center;
  color: white;
  background: rgba(0,0,0,.9);
  z-index: 9;
}

footer a {
  color: rgb(0, 68, 255);
  text-decoration: underline;
}
</style>

