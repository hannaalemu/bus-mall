'use strict';

var maxClicksAllowed = 25;
var totalClicks = 0;
var previousImgsDisplayed = [];

//add constructor function

function ImagesInstance(name, filePath, description){
  this.name = name;
  this.filePath = filePath;
  this.description = description;
  this.numDisplayed = 0;
  this.numClicked = 0;
  ImagesInstance.list.push(this);
}
ImagesInstance.list = [];
// console.log(ImagesInstance.list);

new ImagesInstance('bag.jpg','./images/bag.jpg', 'Bag');
new ImagesInstance('banana.jpg','./images/banana.jpg', 'Banana');
new ImagesInstance('bathroom.jpg','./images/bathroom.jpg', 'Bathroom');
new ImagesInstance('boots.jpg','./images/boots.jpg', 'Boots');
new ImagesInstance('breakfast.jpg','./images/breakfast.jpg', 'Breakfast');
new ImagesInstance('bubblegum.jpg','./images/bubblegum.jpg', 'BubbleGum');
new ImagesInstance('chair.jpg','./images/chair.jpg', 'Chair');
new ImagesInstance('cthulhu.jpg','./images/cthulhu.jpg', 'cthulhu');
new ImagesInstance('dog-duck.jpg','./images/dog-duck.jpg', 'dog-duck');
new ImagesInstance('dragon.jpg','./images/dragon.jpg', 'dragon');
new ImagesInstance('pen.jpg','./images/pen.jpg', 'Pen');
new ImagesInstance('pet-sweep.jpg','./images/pet-sweep.jpg', 'petSweep');
new ImagesInstance('scissors.jpg','./images/scissors.jpg', 'scissors');
new ImagesInstance('tauntaun.jpg','./images/tauntaun.jpg', 'shark');
new ImagesInstance('unicorn.jpg','./images/unicorn.jpg', 'unicorn');
new ImagesInstance('usb.gif','./images/usb.gif', 'usb');
new ImagesInstance('water-can.jpg','./images/water-can.jpg', 'water-can');
new ImagesInstance('wine-glass.jpg','./images/wine-glass.jpg', 'wine-glass');
new ImagesInstance('shark.jpg','./images/shark.jpg', 'shark');

//Create event listner...

function myListners(){
  var imageContainer = document.getElementById('images-container');
  imageContainer.addEventListener('click' , handleClick);

}
function removeLisnters (){

  var imageContainer = document.getElementById('images-container');
  imageContainer.removeEventListener('click', handleClick);
}

function getRandoNum() {
  return Math.floor(Math.random() * ImagesInstance.list.length);
}

function handleClick(event) {
  for (var i =0; i< ImagesInstance.list.length; i++){
    if (ImagesInstance.list[i].name === event.target.alt){
      ImagesInstance.list[i].numClicked++;
      totalClicks++;

      if (totalClicks === maxClicksAllowed){
        removeLisnters();
        createChart();
      }
      break;
    }

  }
  getRandomImages();
}

function getRandomImages() {
  var images = ['image1' , 'image2' , 'image3'];

  var currentImgesDisplayed = [];

  for (var i = 0; i< images.length; i++) {

    var image = document.getElementById(images[i]);

    var ok =false;

    while (ok === false) {

      var randomNumber = getRandoNum();

      if (!previousImgsDisplayed.includes(randomNumber) && !currentImgesDisplayed.includes(randomNumber)) {

        ImagesInstance.list[randomNumber].numDisplayed++;

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

myListners();
getRandomImages();

var ctx = document.getElementById('myChart').getContext('2d');
function createChart (){
  var labels = [];
  var imgDisplayedTimes =[];
  var imgClickedTimes =[];
  // console.log(ImagesInstance.list.length, 'I am this long');
  for (var i = 0; i<ImagesInstance.list.length; i++){
    labels.push(ImagesInstance.list[i].name);
    imgDisplayedTimes.push(ImagesInstance.list[i].numDisplayed);
    imgClickedTimes.push(ImagesInstance.list[i].numClicked);
  }

  // local storage part.
  // increment displayed times
  console.log(imgDisplayedTimes, 'before');

  var stringImgDisplayedTimes= JSON.stringify(imgDisplayedTimes);

  localStorage.setItem('number of times displayed' , stringImgDisplayedTimes);

  var retrievedData = localStorage.getItem('number of times displayed');
  var imgDisplayedTimes2 = JSON.parse(retrievedData);
  if(imgDisplayedTimes2.length !== 0 ){

    for(var j = 0; j < imgDisplayedTimes2.length; j++){
      imgDisplayedTimes[i] = imgDisplayedTimes[i] + imgDisplayedTimes2[i];

    }
    localStorage.setItem('number of times displayed' , stringImgDisplayedTimes);
    console.log(imgDisplayedTimes, 'after');
  }

  //increment clicked times..

  console.log(imgClickedTimes , 'before');

  var stringImgClickedTimes = JSON.stringify(imgClickedTimes);

  localStorage.setItem('number of times clicked' , stringImgClickedTimes);

  var retrieveData = localStorage.getItem('number of times clicked');
  
  var imgClickedTimes2 = JSON.parse(retrieveData);
  if(imgClickedTimes2.length !== 0 ){

    for(var k = 0; k < imgClickedTimes2.length; k++){
      imgClickedTimes[i] = imgClickedTimes[i] + imgClickedTimes2[i];

    }
    localStorage.setItem('number of times clicked' , stringImgClickedTimes);
    console.log(imgClickedTimes, 'after');
  }
  
  //function to draw chart


  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Number of times image was displayed',
          data: imgDisplayedTimes,
          backgroundColor: '#000000'
        },
        {
          label: 'Number of times image was clicked',
          data: imgClickedTimes,
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
