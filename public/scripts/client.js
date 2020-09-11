/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  // hide errors when input is detected
  $('.new-tweet textarea').on("input", function () {
    $(this).parent().children("p").hide();
  })

  loadTweets();

  //get tweets request
  function loadTweets() {
    $.ajax({
      type: 'GET',
      url: '/tweets/',
      datatype: 'json',
      success: function (res) {
        renderTweets(res);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // The user should be given an error that their tweet content is too long or that it is not present (ideally separate messages for each scenario)
  // The form should not be cleared
  // The form should not submit
  function checkTweetForm() {

    let tweetForm = $('#new-post textarea').val();
    if (!tweetForm) {
      //alert("You cannot tweet an empty tweet are you tweeterless??");
      return false;
    } else if (tweetForm.length > 140) {
      //alert("Please tweet under 140 characters fellow tweeter");
      return false;
    }
    return true;
  }

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const createTweetElement = function (tweet) {
    const userData = tweet;
    const timeLapse = moment(userData.created_at).fromNow();
    console.log('userData.created_at:', userData.created_at)
    console.log(moment(userData.created_at))
    console.log(timeLapse);
    let $tweet = $(`
    <article class="tweet-info">
      <header>
        <span>
          <img class="tweet-l" src=${userData.user.avatars}>
          <span class="tweet-left">${userData.user.name}</span>
        </span>
        <span class="tweet-r">${userData.user.handle}</span>
      </header>
      <p>${escape(userData.content.text)}</p>

      <div class="borderline"><div>
        <footer>
          <span class="tweet-bot" style="line-height: 3"><em>${timeLapse}</em> ago</span>
          <div class="tweet-icon">
           <img src="/images/flag.png" width="20" height="20">
           <img src="/images/repost.svg" width="20" height="20">
           <img src="/images/heart.svg" width="20" height="20">            
          </div>
        </footer>
    </article>
    `)
    return $tweet;
  }

  const renderTweets = function (tweets) {
    $('#tweet-feed').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);

      $('#tweet-feed').prepend($tweet);
    }
  }

  // renderTweets(data);  

  const $tweetPost = $('#new-post');

  $tweetPost.on('submit', function (event) {
    //prevent the default browser behaviour
    event.preventDefault();
    const formValidation = checkTweetForm()
    // console.log('formValidation:', formValidation)

    // console.log('checkTweetForm:', checkTweetForm)

    if (!formValidation) {

      $('.new-tweet p').text('⚠️ ' + 'Are you being tweeterless!?!' + ' ⚠️').slideDown(600);
      $('p').fadeOut(3000);
      return false;
    }
    if (!formValidation.length > 140) {
      $('.new-tweet p').text('⚠ ' + 'Please 140 tweeters or less' + ' ⚠️').slideDown(600);
      $('p').fadeOut(3000);
      return false;
    }

    //serialize the form data for submission to the server
    const serializeData = $(this).serialize();
    // console.log(serializeData);

    //submit serialized data to the server via a Post request to /tweets
    $.post('http://localhost:8080/tweets/', serializeData)
      .then((response) => {
        console.log(response);
        loadTweets();
        // console.log('IS THIS STILL THIS', this)
        $(this).children('textarea').val('');
        $('.counter').text(140);
      })
  })

});