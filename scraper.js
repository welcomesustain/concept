const cheerio = require('cheerio');
const fetch = require('node-fetch');
const axios = require('axios');
url = 'https://www.allrecipes.com/search/results/?wt=';
const foodies =[];



function searchfood(foodie){
   return axios.get(`${url}${foodie}`)
    .then((response) => {
  // Load the web page source code into a cheerio instance
  const $ = cheerio.load(response.data)

  // The pre.highlight.shell CSS selector matches all `pre` elements
  // that have both the `highlight` and `shell` class
  const urlElems = $('article ');
  const foodies =[];

  // We now loop through all the elements found
  for (let i = 0; i < urlElems.length; i++) {
    // Since the URL is within the span element, we can use the find method
    // To get all span elements with the `s1` class that are contained inside the
    // pre element. We select the first such element we find (since we have seen that the first span
    // element contains the URL)
    const urlSpan = $(urlElems[i]).find('h3 span')[0]
    const $img = $(urlElems[i]).find('div a img')[1]
    const $desc= $(urlElems[i]).find('article div a div')[1]

    // We proceed, only if the element exists
    if (urlSpan && $img) {

      // We wrap the span in `$` to create another cheerio instance of only the span
      // and use the `text` method to get only the text (ignoring the HTML)
      // of the span element
      const urlText = $(urlSpan).text()
      const urlimg = $($img).attr('src')
      const urldesc = $($desc).text()


      // We then print the text on to the console
      const foodie = {
          image:urlimg,
          title:urldesc,
          text :urlText
      }
      foodies.push(foodie);



    }
    //console.log(foodies);

  }
  return foodies;
});


}

searchfood('chicken');

module.exports =  {searchfood};