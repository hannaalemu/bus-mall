'use strict';


function Family(parents, kids, pets, location) {
  this.parents = parents;
  this.kids = kids;
  this.pets = pets;
  this.location = location;
}
Family.allPeople = [];

Family.prototype.move = function () {
  this.location = "Marysville";
  var stringyFamily = JSON.stringify(family);
  localStorage.setItem('family', stringyFamily);
}

function initializeSystem() {

  var family = {};

  // is there a family in LS?
  var lsFamily = localStorage.getItem('family');
  if (lsFamily) {
    console.log('Found it in LS!!!');
    // lsFamily is going to be a JSON string, parse it
    var familyObject = JSON.parse(lsFamily);

    family = new Family(
      familyObject.parents,
      familyObject.kids,
      familyObject.pets,
      familyObject.location
    );


  }

  // Not in LS
  else {
    console.log('Doing it by hand...');

    var parents = ['John', 'Cat'];
    var kids = ['Zach', 'Allie'];
    var pets = ['Rosie'];
    var location = 'Lynnwood';

    family = new Family(parents, kids, pets, location);

    // Sanitize it for LS
    var stringyFamily = JSON.stringify(family);

    // Store it
    localStorage.setItem('family', stringyFamily);

  }

  return family;

}


console.log(family);

var family = initializeSystem();
family.move();

console.log(family);
© 2019 GitHub, Inc.