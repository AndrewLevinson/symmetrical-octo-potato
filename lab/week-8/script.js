// terminology check
// [] is a 'square bracket' used in an array
// {} those are 'curly braces' used in an object and function
// () those are 'parentheses' used in many different places like functions,querySelector(), etc.

// this is the OLD way we created an array. By only putting a single string in each index (between the commas,).
var oldItemsArrayExample = ['image-1.jpg', 'image-2.jpg', 'image-3.jpg', '...'];
// This is okay to use in the beginning, but it only contains a single piece of information. It won't work when you want more information for each item...

// INSTEAD
// here, we use {Objects} in each index to hold multiple pieces of information for each archive item.
// note the { property: 'value' } syntax similar to CSS, except here you get to create the property name too
var organizedArchiveItems = [
  {
    title: 'Talented',
    imageFile: 'talented.jpg',
    description: '1. a description of the first',
    credit: 'Photo by Jamie Street on Unsplash',
    year: 1984
  },
  {
    title: 'Brilliant',
    imageFile: 'brilliant.jpg',
    description: '2. a description of the second',
    credit: 'Photo by Anoir Chafik on Unsplash',
    year: 2003
  },
  {
    title: 'Incredible',
    imageFile: 'incredible.jpg',
    description: '3. a description of the third',
    credit: 'Photo by Martin Moreno on Unsplash',
    year: 1980
  },
  {
    title: 'Amazing',
    imageFile: 'amazing.jpg',
    description: '4. a description of the fourth',
    credit: 'Photo by Julian Schiemann on Unsplash',
    year: 1830
  },
  {
    title: 'Show-Stopping',
    imageFile: 'show-stopping.jpg',
    description: '5. a description of the fifth',
    credit: 'Photo by Jamie Street on Unsplash',
    year: 2013
  },
  {
    title: 'Spectacular',
    imageFile: 'spectacular.jpg',
    description: '6. a description of the sixth',
    credit: 'Photo by Sneaky Elbow on Unsplash',
    year: 1999
  },
  {
    title: 'Never the Same',
    imageFile: 'never-the-same.jpg',
    description: '7. a description of the seventh',
    credit: 'Photo by Sara Kurfeß on Unsplash',
    year: 2004
  },
  {
    title: 'Totally Unique',
    imageFile: 'totally-unique.jpg',
    description: '8. a description of the eighth',
    credit: 'Photo by Vitor Fontes on Unsplash',
    year: 2014
  },
  {
    title: 'Completely Not Ever Been Done Before',
    imageFile: 'completely-not-ever-been-done-before.jpg',
    description: '9. a description of the ninth',
    credit: 'Photo by NICOLAS TESSARI on Unsplash',
    year: 1999
  }
];

// we will select the single container only, so we can shove ALL content into it. No need for querySelectorAll
var grid = document.querySelector('.grid');

// main function that generates our content when the page loads, when we click the button, or when we filter
function generate(items) {
  grid.innerHTML = ''; // clear the existing items first
  items.forEach(item => {
    // we use += inside a loop to ADD every item, one after another.
    grid.innerHTML += `
  <div class="item">
    <p class="year">${item.year}</p>
    <img src="images/${item.imageFile}" class="archive-image"/>
    <h5>${item.title}</h5>
    <p class="description">${item.description}</p>
    <p class="source">${item.credit}</p>
  </div>
    `;
  });
}
generate(organizedArchiveItems); // run function on page load, passing in our full array of items

function filterContent() {
  var value = +event.target.value; // get the value from the HTML select dropdown and convert to number with "+"
  var filteredItems = organizedArchiveItems.filter(item => {
    return item.year < value; // loops through all items in array and filters out items that don't have a year less than the dropdown value
  });
  generate(filteredItems); // run function to generate content with new filteredItems array
}

function randomize() {
  // array shuffle code credit: https://css-tricks.com/snippets/javascript/shuffle-array/
  // don't worry about why this works, it's complicated. We are creating a new array based on the original organizedArchiveItems
  // but the { objects } are in a different order...like shuffling a deck of cards
  var randomItems = organizedArchiveItems.sort(() => 0.5 - Math.random());
  generate(randomItems); // run function to generate content with new randomItems array
}
