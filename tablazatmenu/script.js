var selectedIndex = null;
var array1 = new Array();
preloadedData();
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedIndex==null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}
function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["osztaly"] = document.getElementById("osztaly").value;
    formData["osztalyzat"] = document.getElementById("osztalyzat").value;
    formData["tantargy"] = document.getElementById("tantargy").value;
    return formData;
}

function insertNewRecord(data) {
    array1[array1.length]= {"fullName":data.fullName,"osztaly":data.osztaly,"osztalyzat":data.osztalyzat,"tantargy":data.tantargy};
    printArray();
}

function preloadedData() {
    array1[array1.length]= {"fullName":"Szabó János","osztaly":"B","osztalyzat":"5","tantargy":"Matematika"};
    array1[array1.length]= {"fullName":"Nagy Vilma","osztaly":"C","osztalyzat":"2","tantargy":"Történelem"};
    array1[array1.length]= {"fullName":"Kis Mária","osztaly":"A","osztalyzat":"4","tantargy":"Fizika"};
    array1[array1.length]= {"fullName":"Aladár Béla","osztaly":"C","osztalyzat":"3","tantargy":"Matematika"};
    printArray();
}

function printArray(){
    var table = document.getElementById("tanulok").getElementsByTagName('tbody')[0];
    table.innerHTML="";
    var newRow;
    for (i = 0; i < array1.length; i++) {
        newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = array1[i].fullName;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = array1[i].osztaly;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = array1[i].osztalyzat;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = array1[i].tantargy;
        cell4 = newRow.insertCell(4);
        cell4.innerHTML = '<a id="tablamenuClass" onClick="onEdit('+i+')">Edit</a>' + '<a id="tablamenuClass" onClick="onDelete('+i+')">Delete</a>';
    }
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("osztaly").value = "";
    document.getElementById("osztalyzat").value = "";
    document.getElementById("tantargy").value = "";
    selectedIndex=null;
}
function onEdit(index) {
    document.getElementById("fullName").value = array1[index].fullName;
    document.getElementById("osztaly").value = array1[index].osztaly;
    document.getElementById("osztalyzat").value = array1[index].osztalyzat;
    document.getElementById("tantargy").value = array1[index].tantargy;
    selectedIndex=index;
}
function updateRecord(formData) {
    array1[selectedIndex].fullName=formData.fullName;
    array1[selectedIndex].osztaly=formData.osztaly;
    array1[selectedIndex].osztalyzat=formData.osztalyzat;
    array1[selectedIndex].tantargy=formData.tantargy;
    printArray();
}
function onDelete(index) {
    if (confirm('Are you sure to delete this record ?')) {
        array1.splice(index, 1); // Deleting the entry with the specified index
        resetForm();
        printArray();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        fullnameisValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        fullnameisValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
     if (document.getElementById("osztaly").value.length != 1) {
        osztalyisValid = false;
        document.getElementById("osztalyValidationError").classList.remove("hide");
    } else {
        osztalyisValid = true;
        if (!document.getElementById("osztalyValidationError").classList.contains("hide"))
            document.getElementById("osztalyValidationError").classList.add("hide");
    }
     if (document.getElementById("osztalyzat").value < 1 || document.getElementById("osztalyzat").value > 5) {
        osztalyzatisValid = false;
        document.getElementById("osztalyzatValidationError").classList.remove("hide");
    } else {
        osztalyzatisValid = true;
        if (!document.getElementById("osztalyzatValidationError").classList.contains("hide"))
            document.getElementById("osztalyzatValidationError").classList.add("hide");
    }
    if (document.getElementById("tantargy").value == "") {
        tantargyisValid = false;
        document.getElementById("tantargyValidationError").classList.remove("hide");
    } else {
        tantargyisValid = true;
        if (!document.getElementById("tantargyValidationError").classList.contains("hide"))
            document.getElementById("tantargyValidationError").classList.add("hide");
    }
    if (fullnameisValid && osztalyisValid && osztalyzatisValid && tantargy) {
	isValid = true 
    } else {
	isValid = false
    }

    return isValid;
}

//oszlopok rendezése
function sortTable(columnIndex) {
var table, rows, switching, i, x, y, shouldSwitch;
table = document.getElementById("tanulok");
switching = true;
// Addig megy a sorokon ciklusban, amíg nem lesznek rendezettek a sorok.
while (switching) {
switching = false;
rows = table.rows;
// Egyesével nézi a sorokat. Ha az i. sor nagyobb, mint az i+1. sor, akkor megcseréli azokat:
for (i = 1; i < (rows.length - 1); i++) {
shouldSwitch = false;
x = rows[i].getElementsByTagName("TD")[columnIndex];
y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
// Ha az i. elem nagyobb, mit a következő cserélni kell: shouldSwitch = true;
if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
shouldSwitch = true;
// Kilép a for ciklusból:
break;
}
}
// Ha kell cserélni:
if (shouldSwitch) {
// Az i+1. elemet beszúrja az i. elem elé:
rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
switching = true;
}
}
}

//keresés funkció
function myFunction() {
var input, filter, table, tr, td, i, txtValue;
input = document.getElementById("myInput");
filter = input.value.toUpperCase();
table = document.getElementById("tanulok");
// a táblázat sorait kigyűjti egy listába:
tr = table.getElementsByTagName("tr");
// végig megy minden soron:
for (i = 0; i < tr.length; i++) {
// a <td> sorokat nézi, a <th> sorokat nem:
td = tr[i].getElementsByTagName("td")[0];
// a <td> sorokra
if (td) {
//txtValue = td.innerText;
txtValue = td.textContent;
// ha a megadott szöveg megtalálható a sorban, akkor megjeleníti a sort, különben eltünteti:
if (txtValue.toUpperCase().indexOf(filter) > -1)
tr[i].style.display = "";
else
tr[i].style.display = "none";
}
}
}

function myFunction2() {
var input, filter, table, tr, td, i, txtValue;
input = document.getElementById("myInput2");
filter = input.value.toUpperCase();
table = document.getElementById("tanulok");
// a táblázat sorait kigyűjti egy listába:
tr = table.getElementsByTagName("tr");
// végig megy minden soron:
for (i = 0; i < tr.length; i++) {
// a <td> sorokat nézi, a <th> sorokat nem:
td = tr[i].getElementsByTagName("td")[1];
// a <td> sorokra
if (td) {
//txtValue = td.innerText;
txtValue = td.textContent;
// ha a megadott szöveg megtalálható a sorban, akkor megjeleníti a sort, különben eltünteti:
if (txtValue.toUpperCase().indexOf(filter) > -1)
tr[i].style.display = "";
else
tr[i].style.display = "none";
}
}
}

function myFunction3() {
var input, filter, table, tr, td, i, txtValue;
input = document.getElementById("myInput3");
filter = input.value.toUpperCase();
table = document.getElementById("tanulok");
// a táblázat sorait kigyűjti egy listába:
tr = table.getElementsByTagName("tr");
// végig megy minden soron:
for (i = 0; i < tr.length; i++) {
// a <td> sorokat nézi, a <th> sorokat nem:
td = tr[i].getElementsByTagName("td")[2];
// a <td> sorokra
if (td) {
//txtValue = td.innerText;
txtValue = td.textContent;
// ha a megadott szöveg megtalálható a sorban, akkor megjeleníti a sort, különben eltünteti:
if (txtValue.toUpperCase().indexOf(filter) > -1)
tr[i].style.display = "";
else
tr[i].style.display = "none";
}
}
}

function myFunction4() {
var input, filter, table, tr, td, i, txtValue;
input = document.getElementById("myInput4");
filter = input.value.toUpperCase();
table = document.getElementById("tanulok");
// a táblázat sorait kigyűjti egy listába:
tr = table.getElementsByTagName("tr");
// végig megy minden soron:
for (i = 0; i < tr.length; i++) {
// a <td> sorokat nézi, a <th> sorokat nem:
td = tr[i].getElementsByTagName("td")[3];
// a <td> sorokra
if (td) {
//txtValue = td.innerText;
txtValue = td.textContent;
// ha a megadott szöveg megtalálható a sorban, akkor megjeleníti a sort, különben eltünteti:
if (txtValue.toUpperCase().indexOf(filter) > -1)
tr[i].style.display = "";
else
tr[i].style.display = "none";
}
}
}