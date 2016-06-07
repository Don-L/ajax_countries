var lastCountry = JSON.parse(localStorage.getItem('last country')) || [];


window.onload = function() {

  var url = "https://restcountries.eu/rest/v1";
  var request = new XMLHttpRequest();

  var body = document.getElementsByTagName('body')[0];
  body.style.backgroundColor = 'tomato';

  request.open("GET", url);
  request.onload = function() {
    if (request.status === 200) {
      console.log('got the data');
      var jsonString = request.responseText;
      countries = JSON.parse(jsonString);
     
      createForm(countries);

      var select1 = document.getElementById('region-select');
      select1.onchange = regionEventHandler;

      var select2 = document.getElementById('country-select');
      select2.onchange = changeEventHandler;

      if (lastCountry) {
        showCountryData(lastCountry);
      }
    }    
  }
  request.send(null);
}


var showCountryData = function(country) {

  var h3 = document.createElement('h3');
  h3.id = 'selected-country-name';
  var body = document.getElementsByTagName('body')[0];
  var list = document.createElement('ul');
  list.id = 'unnecessary-list';
  h3.innerText = country.name;
  var li1 = document.createElement('li');
  var p1 = document.createElement('p');
  var p2 = document.createElement('p');
  var li2 = document.createElement('li');
  var p3 = document.createElement('p');
  var p4 = document.createElement('p');
  p1.innerText = 'Capital';
  p2.innerText = country.capital;
  p3.innerText = 'Population';
  p4.innerText = country.population;
  body.appendChild(list);
  list.appendChild(h3);
  list.appendChild(li1);
  li1.appendChild(p1);
  li1.appendChild(p2);
  list.appendChild(li2);
  li2.appendChild(p3);
  li2.appendChild(p4);
}


var changeEventHandler = function(e) {

  if (document.getElementById('selected-country-name')) {
    var body = document.getElementsByTagName('body')[0];
    var list = document.getElementById('unnecessary-list');
    body.removeChild(list);
  }

  for (country of countries) {
    if (country.name === e.target.value) {
      showCountryData(country);
      locallyStore(country);
    }  
  }
}


var locallyStore = function(country) {

  lastCountry = [];
  lastCountry.push(country);
  localStorage.setItem('last country', JSON.stringify(country));
}


var createOptions = function(sortedCountries) {

  var select = document.getElementById('country-select');

  var childList = select.childNodes;

  // console.log(childList.length);

  // if (childList.length > 0) {
  //   for (child of childList) {
  //     select.removeChild(child);
  //   }
  // }

  var blankOption = document.createElement('option');
  blankOption.disabled = true;
  blankOption.selected = true;
  blankOption.innerText = 'COUNTRIES';
  select.appendChild(blankOption);

  for (country of sortedCountries) {
    var option = document.createElement('option');
    option.innerText = country.name;
    option.className = 'country-option';
    select.appendChild(option);
  }
}

var createForm = function(countries) {

  var body = document.getElementsByTagName('body')[0];
  var form = document.createElement('form');
  var label1 = document.createElement('label');
  label1.for = 'region';
  label1.innerText = 'Select Region';
  var label2 = document.createElement('label');
  label2.for = 'country name';
  label2.innerText = 'Select Country';
  var select1 = document.createElement('select');
  select1.id = 'region-select';
  var select2 = document.createElement('select');
  select2.id = 'country-select';
  body.appendChild(form);
  form.appendChild(label1);
  form.appendChild(select1);
  form.appendChild(label2);
  form.appendChild(select2);

  regionOptions(countries);
}

var regionOptions = function(countries) {

  var select = document.getElementById('region-select');
  var blankOption = document.createElement('option');
  blankOption.disabled = true;
  blankOption.selected = true;
  blankOption.innerText = 'REGIONS';
  select.appendChild(blankOption);

  var regions = [];
  for (country of countries) {
    if (regions.indexOf(country.region) === -1) {
      regions.push(country.region);
    }
  }
  for (region of regions) {
    var option = document.createElement('option');
    option.innerText = region;
    select.appendChild(option);
  }
}

var regionEventHandler = function(e) {

  sortedCountries = [];
  for (country of countries) {
    if (country.region === e.target.value) {
      sortedCountries.push(country);
    } 
  }
  createOptions(sortedCountries);
}





































