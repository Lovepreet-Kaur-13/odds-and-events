const bank = [];
const odds = [];
const evens = [];

function addNumber(n) {
  if (bank.includes(n)) {
    alert("number is already exist in the bank");
  } else {
    bank.push(n);
  }
  ascendingOrder(bank);
  render();
}

function addRandomNumber() {
  const number = Math.floor(Math.random() * 100);
  addNumber(number);
}

function ascendingOrder(array) {
  array.sort((a, b) => a - b);
}

function sort() {
  const number = bank.shift();
  if (number % 2 == 0) {
    evens.push(number);
    ascendingOrder(evens);
  } else {
    odds.push(number);
    ascendingOrder(odds);
  }
}

function sortOne() {
  sort();
  render();
}

function sortAll() {
  while (bank.length > 0) {
    sortOne();
  }
  render();
}

function NumberBank(number) {
  const $span = document.createElement("span");
  $span.textContent = number;
  return $span;
}

function NumbersBank(label, number) {
  const $section = document.createElement("section");
  $section.innerHTML = `
    <h2>${label}</h2>
    <output></output>
    `;
  const $children = number.map(NumberBank);
  $section.querySelector("output").replaceChildren(...$children);
  return $section;
}

function InputForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>Add number to the bank
    <input type="number" name="number"/>
    </label>
    <button type="submit" name="action" value="add">Add number</button>
    <button type="submit" name="action" value="sortOne">Sort 1</button>
    <button type="submit" name="action" value ="sortAll">Sort All</button>
    <button type="submit" name="action" value="randomNumber">Add Random Number</button>
    `;
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const action = event.submitter.value;
    if (action === "add") {
      const data = new FormData($form);
      const number = data.get("number");
      if (number) {
        addNumber(+number);
      }
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    } else if (action === "randomNumber") {
      addRandomNumber();
    }
  });
  return $form;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odds and Events</h1>
    <NumberBank></NumberBank>
    <NumberBank id="bank"></NumberBank>
    <NumberBank id="odds"></NumberBank>
    <NumberBank id="evens"></NumberBank>
    `;

  $app.querySelector("NumberBank").replaceWith(InputForm());
  $app.querySelector("NumberBank#bank").replaceWith(NumbersBank("Bank", bank));
  $app.querySelector("NumberBank#odds").replaceWith(NumbersBank("Odds", odds));
  $app
    .querySelector("NumberBank#evens")
    .replaceWith(NumbersBank("Evens", evens));
}

render();
