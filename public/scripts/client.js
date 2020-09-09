/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  
  const createTweetElement = (tweet) => {
    // const $tweet = $(`<article class="tweet">Hello world</article>`);
    // return $tweet;
    return $(`
      <article class="tweet">
        <header>
          <img src="${tweet.user.avatars}" alt="avatar">
          <h3>${tweet.user.name}</h3>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <p>${tweet.content.text}</p>
        <footer>
          <p>${tweet.create_at}</p>
        </footer>
      </article>
    `)
  };
  
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  let $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('#tweets-container').append($tweet);


  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    for (const id in tweets) {
      const tweet = tweets[id];

      
      
    }
  }
});
