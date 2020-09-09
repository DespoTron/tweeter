$(document).ready(function() {
  // document.addEventListener("dblclick", (event) => {
  //   console.log(event);
  // });

  // $('#tweet-text').on('keyup', function(e) {
  //   console.log($("#tweet-text").val().length)
  //   console.log('what is this', this); 
  // })

  // $(".new-tweet textarea").on('click', () => {
  //   console.log(this); //The this keyword here refers to something else!
  // });

  // $("#tweet-text" ).on('keyup', function() {
  //   $(".counter" ).html(`${140 - this.value.length}`);
  //   if (140 - this.value.length < 0) {
  //     $(".counter" ).css('color', 'red');
  //   } else {
  //     $(".counter").css('color', '#545149');
  //   }
  // });

  $('#tweet-text').on('keyup', function () {
    //tracking character count input from user using keyup
    const currCharCount = $(this).val().length
    
    //locating the counter element
    const counterElem = $(this).parent().children('.button').children('.counter')
      
    //represents how many characters are available 
    // const remainingChars = counterElem.val(); 

    const remainingChars = 140 - currCharCount;
    console.log(remainingChars)

    //updating counter elem on DOM to reflect current changes in remaining characters
    counterElem.text(remainingChars); 

    if (remainingChars < 0) {
      counterElem.css('color', 'red'); 
    } else {
      counterElem.css('color', '#545149'); 
    }
  })
});