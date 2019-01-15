const form = document.querySelector('form');
const gifContainer = document.querySelector('.gifs-container');

// Gif structure
const gifHolder = (img, src) => {
   const gifParent = document.createElement('article');
   const gif = document.createElement('img');
   const link = document.createElement('a');

   gif.setAttribute('src', img);
   link.setAttribute('href', src);
   link.setAttribute('target', '_blank');

   gifContainer.append(gifParent);
   gifParent.append(link)
   gifParent.append(gif);
}

// Function to clear gif container if there are items already in
const clearDisplay = () => {
   while (gifContainer.hasChildNodes()) {
      gifContainer.removeChild(gifContainer.lastChild);
   }
}

form.addEventListener('submit', (e) => {
   // Prevent form from reloading page on submit
   e.preventDefault();

   // Get the user input
   const userInput = document.querySelector('#userInput').value;

   // Get the api url
   const getUrl = () => {
      const urlSetup = {
         apiKey: `&api_key=pb2n5H4YZUYehpFq2HEm8BPiwxSrxPMb`,
         http: `https://api.giphy.com/v1/gifs/search?`,
         searchValue: `&q=${userInput}`,
         limit: `&limit=16`
      }
      const url = urlSetup.http + urlSetup.apiKey + urlSetup.searchValue + urlSetup.limit;
      return url;
   }

   // Fetch data
   fetch(getUrl())
      .then(resp => resp.json())
      .then(data => {
         for (let i = 0; i < 16; i++) {
            gifHolder(data.data[i].images.original.url, data.data[i].images.original.url);
         }
      })

   // Clear display when new search input
   clearDisplay();
   // Clear form fields on submit
   form.reset();
});