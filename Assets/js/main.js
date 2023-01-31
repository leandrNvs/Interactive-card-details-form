const form = document.querySelector(".form");

const cardName = document.querySelector("span.name");
const cardValidity = document.querySelector("span.validity");
const cardCvc = document.querySelector("span.cvc");

const cardNumberArr = document.querySelectorAll(".card-number span");

const ERRORS = {
  name: "Can't be blank",
  cardNumber: {
    empty: "Can't be blank",
    size: "It must contain 16 numbers",
    format: "Wrong format, numbers only",
  },
  month: {
    empty: "Can't be blank",
    size: "Month must be between 1 and 12",
  },
  year: "Can't be blank",
  cvc: {
    empty: "Can't be blank",
    size: "It must contain 3 numbers",
  },
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  for (let field in ERRORS) {
    if (this[field].value === "") {
      if (ERRORS[field].hasOwnProperty("empty")) {
        document.querySelector(`.helper-text.input-${field}`).textContent =
          ERRORS[field].empty;
      } else {
        document.querySelector(`.helper-text.input-${field}`).textContent =
          ERRORS[field];
      }
      return;
    } else {
      document.querySelectorAll(".helper-text").forEach((item) => {
        item.textContent = "";
      });
    }
  }

  const cardNumberValue = this.cardNumber.value.replace(/\s/g, "");

  if (cardNumberValue.length !== 16) {
    document.querySelector(".helper-text.input-cardNumber").textContent =
      ERRORS.cardNumber.size;
    return;
  } else {
    document.querySelector(".helper-text.input-cardNumber").textContent = "";
  }

  const month = Number(this.month.value);

  if (month < 1 || month > 12) {
    document.querySelector(".helper-text.input-month").textContent =
      ERRORS.month.size;
    return;
  } else {
    document.querySelector(".helper-text.input-month").textContent = "";
  }

  if (this.cvc.value.length !== 3) {
    document.querySelector(".helper-text.input-cvc").textContent =
      ERRORS.cvc.size;
    return;
  } else {
    document.querySelector(".helper-text.input-cvc").textContent = "";
  }

  const cardNumber = getCardNumber(cardNumberValue);

  cardName.textContent = this.name.value;
  cardCvc.textContent = this.cvc.value;
  cardValidity.textContent = `${this.month.value}/${this.year.value}`;

  for (let i = 0; i < cardNumberArr.length; i++) {
    cardNumberArr[i].textContent = cardNumber[i].join("");
  }

  this.style.display = "none";
  document.querySelector(".completed").style.display = "flex";

  this.name.value = "";
  this.cardNumber.value = "";
  this.month.value = "";
  this.year.value = "";
  this.cvc.value = "";
});

function getCardNumber(num) {
  const cardNumber = [];
  let arr = [];

  for (let i = 0; i < num.length; i++) {
    arr.push(num[i]);

    if ((i + 1) % 4 === 0) {
      cardNumber.push(arr);
      arr = [];
    }
  }

  return cardNumber;
}
