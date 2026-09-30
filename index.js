const bank = [];
const odds = [];
const evens = [];

function addNumber(n) {
  bank.push(n);
  render();
}

function sort() {
  const number = bank.shift();
  if (number % 2 == 0) {
    evens.push(number);
  } else {
    odds.push(number);
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
