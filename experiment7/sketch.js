const US48MAPURL = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/[-124.3,25.12,-67.3,49]/1188x623?access_token=pk.eyJ1IjoibXVyaWxsb2p1c3RpbiIsImEiOiJjbGVxcGh3Z3EwM3RoM3RvY2pybWpudnA1In0.ZwAuSGP-xLq4BSrxH7C-mw'
const IMGWIDTH = 1188;
const IMGHEIGHT = 623;

let mapimg;

let loadedJSON;
let dataTable = [];
let pulling = true;

let minLng = -124.736342;
let maxLng = -66.945392;
let minLat = 24.521208;
let maxLat = 49.382808;

let schools = [];
let schoolCount = 0;

let process_done = true;
let task_done = false;
let last_done = 0;
let delay = 100;

function preload() {
  mapimg = loadImage(US48MAPURL);
  let url = './data/data.json';
  loadedJSON = loadJSON(url);
}

function setup() {
  let cnv = createCanvas(1188, windowHeight);
  //noLoop();
  image(mapimg, 0, 0);

  cnv.parent('#sketch');
  storeData();

  textAlign(LEFT);
}

function draw() {
  if (schoolCount === 100) {
    delay = 50;
  }
  else if (schoolCount === 300) {
    delay = 20;
  }

  //processData();
  if (!task_done && process_done) {
    processData();
    task_done = true;
    process_done = false;
    last_done = millis();
  }
  else {
    if (millis() - last_done > delay) {
      task_done = false;
    }
  }

  push();
  rectMode(CENTER);
  fill(255, 255, 255, 255);
  stroke(0, 0);
  translate(width/2, height - 140);
  rect(0, -65, windowWidth, 2* (windowHeight/5));

  if (pulling) {
    printSchools();
  }
  pop();

  push();
  translate(width/10, 2 * (height/3));
  textSize(20);
  fill(0, 0, 0, 255);
  stroke(0, 0, 0, 255);

  if (pulling) {
    printSchoolCount();
  }
  else {
    printEndMessage();
  }
  
  pop();
  
  if (schools.length > 18) {
    schools.shift();
  }
}

function storeData() {
  let formatArray = loadedJSON.INCIDENT[0];
  
  for (let item = 1; item < loadedJSON.INCIDENT.length - 1; item++) {
    let obj = {};
    let objectArray = loadedJSON.INCIDENT[item];
    for (let key = 0; key < formatArray.length; key++) {
      let k = formatArray[key];
      let v = objectArray[key];
      obj[k] = v;
    }

    dataTable.push(obj);
  }
}

function processData() {
  if (dataTable.length === 0) {
    pulling = false;
    return;
  }

  if (dataTable[0]['State'] != 'Alaska' ||
      dataTable[0]['State'] != 'Hawaii') 
  {
    let date = dataTable[0]['Date'];
    let school = dataTable[0]['School'];
    let city = dataTable[0]['City'];
    let state = dataTable[0]['State'];
    let inputString = `${school},${city},${state}`;
    $.ajax({
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputString}.json?access_token=pk.eyJ1IjoibXVyaWxsb2p1c3RpbiIsImEiOiJjbGVxcGh3Z3EwM3RoM3RvY2pybWpudnA1In0.ZwAuSGP-xLq4BSrxH7C-mw&limit=1`,
    }).done(
      function(result) {
        // coordinates are in an array of size 2, [longitude, latitude]
        //console.log(result['features'][0]['geometry']['coordinates']);
        let res = result['features'][0]['geometry']['coordinates'];
        let coords = convertLatLngToXY(res[0], res[1]);
        fill(250, 0, 0, 50);
        stroke(250, 0, 0, 50);
        circle(coords.x, coords.y, 10);

        schools.push(new School(date, school, city, state));
        schoolCount++;
        dataTable.shift();
        process_done = true;
      }
    ).fail(
      function(jqXHR, textStatus, errorThrown) {
        console.log('Error:', jqXHR, textStatus, errorThrown);
      }
    );
  }
}

function printSchools() {
  textSize(20);
  fill(0, 0, 0, 255);
  stroke(0, 0, 0, 255);
  let w = -width/4;
  let h = 80;
  for (let i = schools.length - 1; i > schools.length - 18; i--) {
    if (h < - (height/4) - 20 || i < 0) {
      continue;
    }
    schools[i].draw(w, h);
    h -= 20;
  }
}

function printSchoolCount() {
  text(`# ${schoolCount}`, 0, 0)
}

function printEndMessage() {
  text(`2069 school shootings from 1970 to 2022`, 0, 0);
  text('Fatalities: 684', 0, 30);
  text('Injuries: 1937', 0, 60);
  text('Restitution: null', 0, 90);
  text('Resolution: undefined', 0, 120);
  text()
}

function convertLatLngToXY(lng, lat) {
  let x = map(lng, minLng, maxLng, 5, IMGWIDTH - 5);
  let y = map(lat, minLat, maxLat, IMGHEIGHT + 5, 15);

  return {x, y};
}
