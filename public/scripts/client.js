/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  // check event for #new-post and validate with cb function
  //   // $('#new-post textarea').on('submit', checkTweetForm); {
  //   if (!checkTweetForm) {
  //     alert("No Way TweeteRoonie!");
  //     return false;
  //   } else {
  //     loadTweets();
  //   }
  // }


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
    const timeLapse = moment(userData.created_at).startOf('day').fromNow();
    let $tweet = $(`
    <article class="tweet-info">
      <header>
        <span>
          <img class="tweet-l" src=${userData.user.avatars}>
          <span class="tweet-left">${userData.user.name}</span>
        </span>
        <span class="tweet-r">${userData.user.handle}</span>
      </header>
      <p>${userData.content.text}</p>
      <div class="borderline">
        <footer>
          <span class="tweet-bot" style="line-height: 3"><em>${timeLapse}</em></span>
          <div class="tweet-icon">
           <img src="/images/flag.png" width="20" height="20">
           <img src="/images/repost.svg" width="20" height="20">
           <img src="/images/heart.svg" width="20" height="20">            
          </div>
        </footer>
      </div>
    </article>
    `)
    return $tweet;
  }

  const renderTweets = function (tweets) {
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
      console.log("WTF IS OGING ON")
      alert("You cannot tweet an empty tweet or over 140 chars are you tweeterless??");
      return;
    }

    //serialize the form data for submission to the server
    const serializeData = $(this).serialize();
    // console.log(serializeData);

    //submit serialized data to the server via a Post request to /tweets
    $.post('http://localhost:8080/tweets/', serializeData)
      .then((response) => {
        console.log(response);
        loadTweets();

        $(this).children('form').val('');
      })
  })
});






// const ERROR_MESSAGE = {
//   too_long: 'Please try a shorter tweet',
//   empty: 'Please type a tweet',
// };

// const validatingForm = () => {
//   const textInput = $('#tweet-text').val();

//   if (textInput.length > 140) {
//     return { status: false, message: ERROR_MESSAGE.too_long };
//   } else if (!textInput || textInput.length === 1) {
//     // textInput.length to send error if enter is pressed with no message
//     return {
//       status: false,
//       message: ERROR_MESSAGE.empty,
//     };
//   }
//   return { status: true };
// };


// // this below is inside submit function
// const formValidation = validatingForm();

// if (!formValidation.status) {
//   renderErrorMessage(formValidation.message);
//   return;
// }