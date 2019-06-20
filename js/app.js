'use strict';

var maxClicksAllowed = 25;
var totalClicks = 0;
var previousImgsDisplayed = [];
var ctx = document.getElementById('myChart').getContext('2d');


//add constructor function

function ImagesInstance(name, filePath, description) {
  this.name = name;
  this.filePath = filePath;
  this.description = description;
  ImagesInstance.list.push(this);
  ImagesInstance.clicks.push(0);
  ImagesInstance.displayed.push(0);
}
ImagesInstance.list = [];
ImagesInstance.clicks = [];
ImagesInstance.displayed = [];


function loadImages() {

  new ImagesInstance('bag.jpg', './images/bag.jpg', 'Bag');
  new ImagesInstance('banana.jpg', './images/banana.jpg', 'Banana');
  new ImagesInstance('bathroom.jpg', './images/bathroom.jpg', 'Bathroom');
  new ImagesInstance('boots.jpg', './images/boots.jpg', 'Boots');
  new ImagesInstance('breakfast.jpg', './images/breakfast.jpg', 'Breakfast');
  new ImagesInstance('bubblegum.jpg', './images/bubblegum.jpg', 'BubbleGum');
  new ImagesInstance('chair.jpg', './images/chair.jpg', 'Chair');
  new ImagesInstance('cthulhu.jpg', './images/cthulhu.jpg', 'cthulhu');
  new ImagesInstance('dog-duck.jpg', './images/dog-duck.jpg', 'dog-duck');
  new ImagesInstance('dragon.jpg', './images/dragon.jpg', 'dragon');
  new ImagesInstance('pen.jpg', './images/pen.jpg', 'Pen');
  new ImagesInstance('pet-sweep.jpg', './images/pet-sweep.jpg', 'petSweep');
  new ImagesInstance('scissors.jpg', './images/scissors.jpg', 'scissors');
  new ImagesInstance('tauntaun.jpg', './images/tauntaun.jpg', 'shark');
  new ImagesInstance('unicorn.jpg', './images/unicorn.jpg', 'unicorn');
  new ImagesInstance('usb.gif', './images/usb.gif', 'usb');
  new ImagesInstance('water-can.jpg', './images/water-can.jpg', 'water-can');
  new ImagesInstance('wine-glass.jpg', './images/wine-glass.jpg', 'wine-glass');
  new ImagesInstance('shark.jpg', './images/shark.jpg', 'shark');
}

function loadStatistics() {
  var displayed = localStorage.getItem('number of times displayed');
  var clicked = localStorage.getItem('number of times clicked');

  if (displayed) {
    var displayedStats = JSON.parse(displayed);
    if (Array.isArray(displayedStats) && displayedStats.length === ImagesInstance.displayed.length) {
      ImagesInstance.displayed = displayedStats;
    }
  }

  if (clicked) {
    var clickedStats = JSON.parse(clicked);
    if (Array.isArray(clickedStats) && clickedStats.length === ImagesInstance.clicks.length) {
      ImagesInstance.clicks = clickedStats;
    }
  }

  console.log(ImagesInstance.list);
  console.log(ImagesInstance.clicks);
  console.log(ImagesInstance.displayed);

}

function setupListeners() {
  var imageContainer = document.getElementById('images-container');
  imageContainer.addEventListener('click', handleClick);

}
function removeLisnters() {
  var imageContainer = document.getElementById('images-container');
  imageContainer.removeEventListener('click', handleClick);
}

function getRandoNum() {
  return Math.floor(Math.random() * ImagesInstance.list.length);
}

function handleClick(event) {
  for (var i = 0; i < ImagesInstance.list.length; i++) {
    if (ImagesInstance.list[i].name === event.target.alt) {

      ImagesInstance.clicks[i]++;
      localStorage.setItem('number of times clicked', JSON.stringify(ImagesInstance.clicks));

      totalClicks++;

      if (totalClicks === maxClicksAllowed) {
        removeLisnters();
        createChart();
      }
      break;
    }

  }
  getRandomImages();
}

function getRandomImages() {
  var images = ['image1', 'image2', 'image3'];

  var currentImgesDisplayed = [];

  for (var i = 0; i < images.length; i++) {

    var image = document.getElementById(images[i]);

    var ok = false;

    while (ok === false) {

      var randomNumber = getRandoNum();

      if (!previousImgsDisplayed.includes(randomNumber) && !currentImgesDisplayed.includes(randomNumber)) {

        ImagesInstance.displayed[randomNumber]++;
        localStorage.setItem('number of times displayed', JSON.stringify(ImagesInstance.displayed));

        image.src = ImagesInstance.list[randomNumber].filePath;
        image.alt = ImagesInstance.list[randomNumber].name;

        currentImgesDisplayed.push(randomNumber);

        ok = true;
      }
    }
  }

  //check how many times image has been displayed...

  previousImgsDisplayed = currentImgesDisplayed;

}


function createChart() {
  var labels = [];

  // console.log(ImagesInstance.list.length, 'I am this long');
  for (var i = 0; i < ImagesInstance.list.length; i++) {
    labels.push(ImagesInstance.list[i].name);
  }

  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Number of times image was displayed',
          data: ImagesInstance.displayed,
          backgroundColor: '#000000'
        },
        {
          label: 'Number of times image was clicked',
          data: ImagesInstance.clicks,
          backgroundColor: '#ff0000'
        }
      ]
    },
    options: {
      responsive: false,
      maintainAspectRatio: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}

setupListeners();
loadImages();
loadStatistics();
getRandomImages();
