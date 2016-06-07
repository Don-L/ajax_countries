var lastCountry = JSON.parse(localStorage.getItem('last country')) || [];
console.log(lastCountry.name);
console.log(lastCountry.length);




window.onload = function() {

  var url = "https://restcountries.eu/rest/v1";
  var request = new XMLHttpRequest();

  console.log(request);
  request.open("GET", url);
  request.onload = function() {//this will only run when we have the api data
    if (request.status === 200) { //i.e. if request successful
      console.log('got the data');
      var jsonString = request.responseText;
      countries = JSON.parse(jsonString);
      var country = countries[0];
      console.log(country.name);
      console.log(country.population);
      console.log(country.capital);
      createForm(countries);

      var select = document.getElementById('country-select');
      select.onchange = changeEventHandler;

    }


    
  }

  request.send(null); // need this to send the request. null as we're not
                      // sending any data. if the http method above were e.g
                      // 'put' instead of 'get' then we might have data in the
                      // arguments

  if (lastCountry) {
    var h3 = document.createElement('h3');
    h3.id = 'selected-country-name';
    var body = document.getElementsByTagName('body')[0];
    var list = document.createElement('ul');
    list.id = 'unnecessary-list';
    h3.innerText = lastCountry.name;
    var li1 = document.createElement('li');
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    var li2 = document.createElement('li');
    var p3 = document.createElement('p');
    var p4 = document.createElement('p');
    p1.innerText = 'Capital';
    p2.innerText = lastCountry.capital;
    p3.innerText = 'Population';
    p4.innerText = lastCountry.population;
    body.appendChild(list);
    list.appendChild(h3);
    list.appendChild(li1);
    li1.appendChild(p1);
    li1.appendChild(p2);
    list.appendChild(li2);
    li2.appendChild(p3);
    li2.appendChild(p4);
  }

}




var changeEventHandler = function(e) {

  if (document.getElementById('selected-country-name')) {

    var body = document.getElementsByTagName('body')[0];
    var list = document.getElementById('unnecessary-list');
    body.removeChild(list);
  }

  for (country of countries) {
    if (country.name === e.target.value) {
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





































