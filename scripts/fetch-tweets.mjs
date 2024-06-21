import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const url = 'https://twitter-api45.p.rapidapi.com/search.php?query=(%40_buildspace%20OR%20%40_nightsweekends)%20-filter%3Areplies%20filter%3Aimages&search_type=Top';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': 'twitter-api45.p.rapidapi.com'
  }
};

try {
  const response = await fetch(url, options);
  const result = await response.json();
  // save each array item of "timeline" into it's own file using the tweet_id
  const tweets = result.timeline
    .filter(t => !!t.media && t.media.photo)
    .forEach(t => {
      console.log('Saving', t)
      fs.writeFileSync(`./content/tweets/${t.tweet_id}.json`, JSON.stringify(t, null, 2));
    })
  console.log(result.next_cursor)
} catch (error) {
  console.error(error);
}