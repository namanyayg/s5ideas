import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const fetchAndSaveIdeas = async (cursor) => {
  let url
  if (!cursor) {
    url = 'https://twitter-api45.p.rapidapi.com/search.php?query=(%40_buildspace%20OR%20%40_nightsweekends)%20-filter%3Areplies%20filter%3Aimages&search_type=Latest';
  } else {
    url = `https://twitter-api45.p.rapidapi.com/search.php?query=(%40_buildspace%20OR%20%40_nightsweekends)%20-filter%3Areplies%20filter%3Aimages&search_type=Latest&cursor=${cursor}`;
  }
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
    result.timeline
      .filter(t => !!t.media && t.media.photo)
      .forEach(t => {
        delete t.entities
        const filePath = `./content/tweets/${t.tweet_id}.json`;
        if (!fs.existsSync(filePath)) {
          console.log('Saving', t)
          fs.writeFileSync(filePath, JSON.stringify(t, null, 2));
        } else {
          console.log('File already exists', filePath);
        }
      })
    await fetchAndSaveIdeas(result.next_cursor)
  } catch (error) {
    console.error(error);
  }
}

fetchAndSaveIdeas()