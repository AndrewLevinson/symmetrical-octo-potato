// terminology check
// [] is a square bracket used in an array
// {} those are curly braces used in an object and function
// () those are parentheses used in many different places like functions,querySelector(), etc.

// this is the OLD way we created an array. By only putting a single string in each index (between the commas,).
// This is okay at the beginning, but it only contains a single piece of information
// var archiveItems = ['image-1.jpg', 'image-2.jpg', 'image-3.jpg'];

// here, we use {Objects} in each index to hold multiple pieces of information for each archive item.
var organizedArchiveItems = [
  {
    title: '1 — Talented',
    imageURL: 'talented.jpg',
    description: 'a description',
    link: 'a url to the source',
    year: 1984
  },
  {
    title: '2 — Brilliant',
    imageURL: 'brilliant.jpg',
    description: 'a description of the second',
    link: 'a url to the source of the second',
    year: 2003
  },
  {
    title: '3 — Incredible',
    imageURL: 'incredible.jpg',
    description: 'a description of the third',
    link: 'a url to the source of the third',
    year: 1980
  },
  {
    title: '4 — Amazing',
    imageURL: 'amazing.jpg',
    description: 'a description of the fourth',
    link: 'a url to the source of the fourth',
    year: 1830
  },
  {
    title: '5 — Show-Stopping',
    imageURL: 'show-stopping.jpg',
    description: 'a description of the fifth',
    link: 'a url to the source of the fifth',
    year: 2013
  },
  {
    title: '6 — Spectacular',
    imageURL: 'spectacular.jpg',
    description: 'a description of the sixth',
    link: 'a url to the source of the sixth',
    year: 1999
  }
];

// we will select the single container only, so we can shove ALL content into it. No need for querySelectorAll
var grid = document.querySelector('.grid');

// main function that generates our content when the page loads, when we click the button, or when we filter
function generate(filteredItems) {
  grid.innerHTML = ''; // clear the existing items first
  filteredItems.forEach(item => {
    // we use += inside a loop to ADD every item, one after another.
    grid.innerHTML += `
  <div class="item">
    <p class="year">${item.year}</p>
    <img src="images/${item.imageURL}" class="archive-image"/>
    <h5>${item.title}</h5>
    <p class="description">${item.description}</p>
    <a class="source">${item.link}</a>
</div>
    `;
  });
}
generate(organizedArchiveItems); // run function on page load with our full array of items

function filterContent() {
  var value = +event.target.value; // get the value from the HTML select dropdown
  var filteredItems = organizedArchiveItems.filter(item => {
    return item.year < value; // loops through all items in array and filters out items that don't have a year less than the dropdown value
  });
  generate(filteredItems); // run function to generate content with new filteredItems array
}

function randomize() {
  // array shuffle code credit: https://css-tricks.com/snippets/javascript/shuffle-array/
  var randomItems = organizedArchiveItems.sort(() => {
    return 0.5 - Math.random(); // don't worry about why this works, it's complicated. We are creating a new array but the {objects} are in a different order (like shuffling a deck of cards)
  });
  generate(randomItems); // run function to generate content with new randomItems array
}
