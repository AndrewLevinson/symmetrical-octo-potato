// terminology check
// [] is a square bracket used in an array
// {} those are curly braces used in an object and function
// () those are parentheses used in many different places like functions,querySelector(), etc.

// var archiveItems = ['image-1.jpg', 'image-2.jpg', 'image-3.jpg'];

var organizedArchiveItems = [
  {
    title: 'item title 1',
    imageURL: 'image-1.jpg',
    description: 'a description',
    link: 'a url to the source',
    year: 1984
  },
  {
    title: 'item title 2',
    imageURL: 'image-2.jpg',
    description: 'a description of the second',
    link: 'a url to the source of the second',
    year: 2003
  },
  {
    title: 'item title 3',
    imageURL: 'image-3.jpg',
    description: 'a description of the third',
    link: 'a url to the source of the third',
    year: 1980
  },
  {
    title: 'item title 4',
    imageURL: 'image-4.jpg',
    description: 'a description of the fourth',
    link: 'a url to the source of the fourth',
    year: 1830
  },
  {
    title: 'item title 5',
    imageURL: 'image-5.jpg',
    description: 'a description of the fifth',
    link: 'a url to the source of the fifth',
    year: 2013
  },
  {
    title: 'item title 6',
    imageURL: 'image-6.jpg',
    description: 'a description of the sixth',
    link: 'a url to the source of the sixth',
    year: 1999
  }
];

var grid = document.querySelector('.grid');

function generate(filteredItems) {
  grid.innerHTML = '';
  filteredItems.forEach(item => {
    //   console.log(item);
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
generate(organizedArchiveItems);

function filterContent() {
  var value = +event.target.value;

  var filteredItems = organizedArchiveItems.filter(item => {
    return item.year < value;
  });
  generate(filteredItems);
}

function randomize() {
  // array shuffle code credit: https://css-tricks.com/snippets/javascript/shuffle-array/
  var randomItems = organizedArchiveItems.sort(() => {
    return 0.5 - Math.random();
  });
  generate(randomItems);
}
