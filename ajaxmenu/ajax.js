// ajax.js
const code = "BBBBBBefg456margi";
const url = "http://gamf.nhely.hu/ajax2/";

async function read() {
  document.getElementById("code").innerHTML = "code=" + code;
  let response = await fetch(url, {
    method: 'post',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: "code=" + code + "&op=read"
  });
  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;
  let str = "<h1>Read</h1>";
  str += `<p>Rekordok száma: ${data.rowCount}</p>`;
  str += `<table border='1'><tr><th>ID</th><th>Name</th><th>Height</th><th>Weight</th><th>Code</th></tr>`;
  for (let i = 0; i < list.length; i++) {
    str += `<tr><td>${list[i].id}</td><td>${list[i].name}</td><td>${list[i].height}</td><td>${list[i].weight}</td><td>${list[i].code}</td></tr>`;
  }
  str += `</table>`;
  document.getElementById("readDiv").innerHTML = str;

  // statisztika
  let heights = list.map(item => parseFloat(item.height)).filter(h => !isNaN(h));
  let total = heights.reduce((a, b) => a + b, 0);
  let avg = heights.length ? (total / heights.length).toFixed(2) : 0;
  let max = heights.length ? Math.max(...heights) : 0;
  document.getElementById("statsDiv").innerHTML = `
    <h3>Magasság statisztikák (height mező):</h3>
    <p>Összeg: ${total}</p>
    <p>Átlag: ${avg}</p>
    <p>Legnagyobb: ${max}</p>`;
}

async function create() {
  let name = document.getElementById("name1").value;
  let height = document.getElementById("height1").value;
  let weight = document.getElementById("weight1").value;
  if (name && height && weight && name.length <= 100 && height.length <= 100 && weight.length <= 100) {
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `code=${code}&op=create&name=${name}&height=${height}&weight=${weight}`
    });
    let data = await response.text();
    document.getElementById("createResult").innerHTML = data > 0 ? "Sikeres létrehozás!" : "Nem sikerült létrehozni!";
    document.getElementById("name1").value = "";
    document.getElementById("height1").value = "";
    document.getElementById("weight1").value = "";
    read();
  } else {
    document.getElementById("createResult").innerHTML = "Hibás mezők!";
  }
}

async function getDataForId() {
  let id = document.getElementById("idUpd").value;
  if (!id) return;

  let response = await fetch(url, {
    method: 'post',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: "code=" + code + "&op=read"
  });

  let data = await response.text();
  data = JSON.parse(data);

  // Típuskonverzió: számot stringgé alakítjuk összehasonlítás előtt
  let found = data.list.find(item => String(item.id) === id);

  if (found) {
    document.getElementById("name2").value = found.name;
    document.getElementById("height2").value = found.height;
    document.getElementById("weight2").value = found.weight;
  } else {
    alert("Nincs ilyen ID!");
  }
}
async function update() {
  let id = document.getElementById("idUpd").value;
  let name = document.getElementById("name2").value;
  let height = document.getElementById("height2").value;
  let weight = document.getElementById("weight2").value;
  if (id && name && height && weight && name.length <= 100 && height.length <= 100 && weight.length <= 100) {
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `code=${code}&op=update&id=${id}&name=${name}&height=${height}&weight=${weight}`
    });
    let data = await response.text();
    document.getElementById("updateResult").innerHTML = data > 0 ? "Sikeres frissítés!" : "Nem sikerült frissíteni!";
    document.getElementById("idUpd").value = "";
    document.getElementById("name2").value = "";
    document.getElementById("height2").value = "";
    document.getElementById("weight2").value = "";
    read();
  } else {
    document.getElementById("updateResult").innerHTML = "Hibás mezők!";
  }
}

async function deleteF() {
  let id = document.getElementById("idDel").value;
  if (id && id.length <= 100) {
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `code=${code}&op=delete&id=${id}`
    });
    let data = await response.text();
    document.getElementById("deleteResult").innerHTML = data > 0 ? "Sikeres törlés!" : "Nem sikerült törölni!";
    document.getElementById("idDel").value = "";
    read();
  } else {
    document.getElementById("deleteResult").innerHTML = "Hibás ID!";
  }
}

window.onload = read;
