$(document).ready(function () {
  // Figure this out to reset counter
  // 

  $('#tweet-text').on('keyup', function () {
    //tracking character count input from user using keyup
    const currCharCount = $(this).val().length

    //locating the counter element
    const counterElem = $(this).parent().children('.button').children('.counter')

    const remainingChars = 140 - currCharCount;

    //updating counter elem on DOM to reflect current changes in remaining characters
    counterElem.text(remainingChars);

    if (remainingChars < 0) {
      counterElem.css('color', 'red');
    } else {
      counterElem.css('color', '#545149');
    }

  })
});