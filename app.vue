<template>
  <div class="main-container">
    <header>
      <div class="flex flex-row justify-between">
        <div class="subtitle">
          Featuring <strong>2000+ ideas</strong> from Buildspace S5
        </div>
        <div class="sort-dropdown">
          <label for="sort">Sort by:</label>
          <select id="sort" v-model="sortOption" @change="sortTweets">
            <option value="favorites">Likes</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </header>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-2">
      <transition-group enter-active-class="transition duration-150 delay-150 ease-out"
        enter-from-class="opacity-0 scale-0" enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-0">
        <a :href="`https://x.com/${tweet.screen_name}/status/${tweet.tweet_id}`" v-for="tweet in sortedTweets"
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
      made with love <a href="https://x.com/NamanyayG">by nmn</a> ⚡ (follow me on <a href="https://twitter.com/NamanyayG">twitter</a>)<br>
      <!-- check out <a href="#">his s5 idea</a> 💡<br> -->
      <span>join our (unoffical) <a href="https://discord.gg/42JEQPd6">s5 discord</a></span>
    </footer>
  </div>
</template>

<script setup>
// set up meta
useSeoMeta({
  title: 'S5 Ideas · all ideas from Buildspace',
  description: 'All the great ideas made during Buildspace S5',
  ogImage: 'https://s5ideas.pages.dev/meta.png',
  twitterCard: 'summary_large_image',
})


// load tweets
import { ref, computed } from 'vue'
const { data: tweets } = await useAsyncData('tweets', () => queryContent('tweets').find())

const sortOption = ref('favorites')

const sortedTweets = computed(() => {
  if (sortOption.value === 'favorites') {
    return tweets.value.sort((a, b) => b.favorites - a.favorites)
  } else if (sortOption.value === 'newest') {
    return tweets.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } else if (sortOption.value === 'oldest') {
    return tweets.value.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  }
})

const sortTweets = () => {
  sortedTweets.value
}
</script>

<style scoped>
html, body, select, option, .main-container {
  font-family: Inter !important;
  font-size: 100%;
}

.main-container {
  background-color: #111;
  padding-bottom: 7em;
}

select {
  padding: .5em;
  border-radius: .2em;
  margin-left: .5em;
}

select, option {
  background: #222;
  color: white; 
}

header {
  padding: 2em;
  color: rgba(255,255,255,.9)
}

.subtitle {
  font-size: 1.25em;
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

footer span {
  opacity: .75;
}
</style>

