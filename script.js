

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const jokeElement = document.getElementById('joke');


function toggleButton() {
  button.disabled = !button.disabled;
}


function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, '%20');
 
  VoiceRSS.speech({
    key: '${{ vars.API_KE }}',
    src: jokeString,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}
async function getJokes() {
  jokeElement.innerHTML = '';
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist,explicit' ;
 
    // jokeElement.innerHTML = '';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) {
      joke =   `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
     tellMe(joke);


const jokeArray = joke.split(" ");
let index = 0;
const timer = setInterval(() => {
  if (index < jokeArray.length) {
    
    const span = document.createElement('span');
    span.textContent = jokeArray[index] + " "; 
    jokeElement.appendChild(span);
    index++;
  } else {
    clearInterval(timer);
  }
}, 100);

// tellMe(joke);
jokeElement.dispatchEvent(new Event('jokeDisplayed'));
    //  jokeElement.innerText = joke;
  } catch (error) {
    
  }finally {
    
    toggleButton();
  }
}
button.addEventListener('click', getJokes);
jokeElement.addEventListener('jokeDisplayed', toggleButton);

