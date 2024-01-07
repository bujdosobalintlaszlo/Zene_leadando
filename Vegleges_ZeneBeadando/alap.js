var musicData;
var mod = 0;
var gombokGeneralva = false;
var csokken = false;
var kategoriaKiBe = false;
var kategoriak = [
  "Évszerinti csoportosítás",
  "Albumszerinti csoportosítás",
  "Előadószerinti csoportosítás",
];
var funcKategoria = [groupByYear, groupByAlbum, groupByArtist];

//xmlhttps request
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    musicData = JSON.parse(this.responseText);
  }
};
xhttp.open("GET", "music.json", true);
xhttp.send();
//----

//Kategoria gomb kigeneralasa
function KategoriakMutat() {
  if (kategoriaKiBe === false) {
    kategoriaKiBe = true;
    let div = document.createElement("div");
    div.id = "kategoriak";
    div.style.border = "2px solid white";
    let megDiv = document.createElement("div");
    megDiv.id = "display";
    for (let i = 0; i < 3; i++) {
      let gomb = document.createElement("input");
      gomb.type = "button";
      gomb.value = kategoriak[i];
      gomb.className = "fejlec_gomb";
      gomb.addEventListener("click", funcKategoria[i]);
      div.appendChild(gomb);
    }
    document.body.appendChild(div);
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(megDiv);
  }
}
//-------

//albumok csoportositasa es kiirasa
function groupByAlbum() {
  evGombTorol();
  gombokGeneralva = false;
  if (musicData) {
    var albums = {};
    musicData.forEach(function (item) {
      if (!albums[item.album]) {
        albums[item.album] = [];
      }
      albums[item.album].push(item);
    });
    var musicDiv = document.getElementById("display");
    musicDiv.innerHTML = "";
    for (var album in albums) {
      var albumTitle = document.createElement("div");
      albumTitle.classList.add("album-title");
      albumTitle.textContent = `${album} (${albums[album].length} dal)`;
      albumTitle.dataset.album = album;
      albumTitle.addEventListener("click", function (event) {
        var clickedAlbum = event.target.dataset.album;
        displayAlbumData(albums[clickedAlbum]);
      });
      musicDiv.appendChild(albumTitle);
    }
  }
}

function displayAlbumData(albumData) {
  var musicDiv = document.getElementById("display");
  musicDiv.innerHTML = "";
  if (Array.isArray(albumData) && albumData.length > 0) {
    albumData.forEach(function (item) {
      var musicItem = document.createElement("div");
      musicItem.classList.add("kartya");
      musicItem.innerHTML = `
          <div id="${item.id}">
            <img src="${item.cover}" alt="Cover Image" style="width: 180px; height: 180px;">
            <p>Title: ${item.title}</p>
            <p>Artist: ${item.artist}</p>
            <p>Album: ${item.album}</p>
            <p>Year: ${item.year}</p>
          </div>
        `;
      musicDiv.appendChild(musicItem);
    });
  } else {
    console.log("Hiba. :(");
  }
}
//------

//Eloadok csoportositasa es kiirasa
function displayArtistData(artistData) {
  var musicDiv = document.getElementById("display");
  musicDiv.innerHTML = "";
  if (Array.isArray(artistData) && artistData.length > 0) {
    artistData.forEach(function (item) {
      var musicItem = document.createElement("div");
      musicItem.classList.add("kartya");
      musicItem.innerHTML = `
            <div id="${item.id}">
              <img src="${item.cover}" alt="Cover Image" style="width: 180px; height: 180px;">
              <p>Title: ${item.title}</p>
              <p>Artist: ${item.artist}</p>
              <p>Album: ${item.album}</p>
              <p>Year: ${item.year}</p>
            </div>
          `;
      musicDiv.appendChild(musicItem);
    });
  } else {
    console.log("Hiba van itt most");
  }
}

function groupByArtist() {
  evGombTorol();
  gombokGeneralva = false;
  if (musicData) {
    var eloadok = {};
    musicData.forEach(function (item) {
      if (!eloadok[item.artist]) {
        eloadok[item.artist] = [];
      }
      eloadok[item.artist].push(item);
    });
    var musicDiv = document.getElementById("display");
    musicDiv.innerHTML = "";
    for (var eloado in eloadok) {
      var cim = document.createElement("div");
      cim.classList.add("album-title");
      cim.textContent = `${eloado} (${eloadok[eloado].length} dal)`;
      cim.dataset.artist = eloado;
      cim.addEventListener("click", function (event) {
        var clickedArtist = event.target.dataset.artist;
        displayArtistData(eloadok[clickedArtist]);
      });
      musicDiv.appendChild(cim);
    }
  }
}
//------

//Evek szerint csoportositas es kiiras
function groupByYear() {
  PlusszGomb();
  if (musicData) {
    var evek = {};
    musicData.forEach(function (item) {
      if (!evek[item.year]) {
        evek[item.year] = [];
      }
      evek[item.year].push(item);
    });

    var orderedYears = Object.keys(evek).sort((a, b) => Number(a) - Number(b)); // Rendezés az évek alapján

    var musicDiv = document.getElementById("display");
    musicDiv.innerHTML = "";
    if (orderedYears && orderedYears.length > 0) {
      if (csokken) {
        orderedYears.reverse(); // Ha csökkenő sorrendben akarjuk megjeleníteni
      }
      orderedYears.forEach(function (ev) {
        var cim = document.createElement("div");
        cim.classList.add("album-title");
        cim.textContent = `${ev} (${evek[ev].length} dal)`;
        cim.dataset.year = ev;
        cim.addEventListener("click", function (event) {
          var evClick = event.target.dataset.year;
          displayYearData(evek[evClick]);
        });
        musicDiv.appendChild(cim);
      });
    }
  }
}
function displayYearData(yearData) {
  var musicDiv = document.getElementById("display");
  musicDiv.innerHTML = "";
  if (Array.isArray(yearData) && yearData.length > 0) {
    yearData.forEach(function (item) {
      var musicItem = document.createElement("div");
      musicItem.classList.add("kartya");
      musicItem.innerHTML = `
            <div id="${item.id}">
              <img src="${item.cover}" alt="Cover Image" style="width: 180px; height: 180px;">
              <p>Title: ${item.title}</p>
              <p>Artist: ${item.artist}</p>
              <p>Album: ${item.album}</p>
              <p>Year: ${item.year}</p>
            </div>
          `;
      musicDiv.appendChild(musicItem);
    });
  } else {
    console.log("Hiba");
  }
}
//-----

//Rendezes sorrendjenek eldontese
function OrderByAscending() {
  csokken = false;
  groupByYear();
}

function OrderByDescending() {
  csokken = true;
  groupByYear();
}
//----

//Csokkeno es novekvo gomb kigeneralasa
function PlusszGomb() {
  if (gombokGeneralva === false) {
    let hely = document.getElementById("fejlec");

    let gomb = document.createElement("input");
    gomb.type = "button";
    gomb.className = "fejlec_gomb";
    gomb.value = "Csökkenő";
    gomb.id = "csok";
    gomb.addEventListener("click", OrderByAscending);
    hely.appendChild(gomb);

    let gomb2 = document.createElement("input");
    gomb2.type = "button";
    gomb2.className = "fejlec_gomb";
    gomb2.value = "Növekvő";
    gomb2.id = "nov"; 
    
    gomb2.addEventListener("click", OrderByDescending);
    hely.appendChild(gomb2);
    gombokGeneralva = true;
  }
}
//----

//Csokkeno es novekvo gomb torlese
function evGombTorol() {
  var csokButton = document.getElementById("csok");
  var novButton = document.getElementById("nov");
  if (csokButton && novButton) {
    csokButton.remove();
    novButton.remove();
  }
}
//----