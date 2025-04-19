class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  describe() {
    return `${this.name}, ${this.age} éves.`;
  }

  render(container) {
    const p = document.createElement('p');
    p.textContent = this.describe();
    container.appendChild(p);
  }
}

class Student extends Person {
  constructor(name, age, school) {
    super(name, age);
    this.school = school;
  }

  describe() {
    return `${super.describe()} Iskola: ${this.school}`;
  }
}

const people = [
  new Person("Kovács Anna", 34),
  new Person("Nagy Béla", 45),
  new Student("Szabó Petra", 16, "Széchenyi Gimnázium"),
  new Student("Kiss Dániel", 18, "Bolyai Főiskola")
];

function renderPeople() {
  const listContainer = document.getElementById("peopleList");
  listContainer.innerHTML = ""; // előző tartalom törlése
  people.forEach(person => person.render(listContainer));
}

document.getElementById("personForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("nameInput").value.trim();
  const age = parseInt(document.getElementById("ageInput").value.trim());
  const school = document.getElementById("schoolInput").value.trim();

  if (!name || isNaN(age)) {
    alert("Kérlek adj meg egy nevet és érvényes életkort!");
    return;
  }

  let newPerson;
  if (school) {
    newPerson = new Student(name, age, school);
  } else {
    newPerson = new Person(name, age);
  }

  people.push(newPerson);
  renderPeople();

  // Űrlap törlése
  document.getElementById("personForm").reset();
});

window.onload = renderPeople;
