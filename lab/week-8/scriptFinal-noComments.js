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

var grid = document.querySelector('.grid');

function generate(items) {
  grid.innerHTML = '';
  items.forEach(item => {
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
  var randomItems = organizedArchiveItems.sort(() => 0.5 - Math.random());
  generate(randomItems);
}
