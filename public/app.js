var lastCountry = JSON.parse(localStorage.getItem('last country')) || [];


window.onload = function() {

  var url = "https://restcountries.eu/rest/v1";
  var request = new XMLHttpRequest();

  request.open("GET", url);
  request.onload = function() {
    if (request.status === 200) {
      console.log('got the data');
      var jsonString = request.responseText;
      countries = JSON.parse(jsonString);
     
      createForm(countries);

      var select = document.getElementById('country-select');
      select.onchange = changeEventHandler;

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


var createForm = function(countries) {

  var body = document.getElementsByTagName('body')[0];
  var form = document.createElement('form');
  var label = document.createElement('label');
  label.for = 'country name';
  label.innerText = 'Select Country';
  var select = document.createElement('select');
  select.id = 'country-select';
  body.appendChild(form);
  form.appendChild(label);
  form.appendChild(select);

  createOptions(countries);
}


var createOptions = function(countries) {

  var select = document.getElementsByTagName('select')[0];
  for (country of countries) {
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  }
}





































