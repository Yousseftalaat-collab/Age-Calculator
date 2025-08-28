const inputElements = document.querySelectorAll(".card__input");
const submitButton = document.querySelector(".card__button");
const resetButton = document.querySelector(".reset__button");

const validateDay = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
};

const validateMonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
};

const validateYear = (year) => {
  const currentYear = new Date().getFullYear();

  if (year && year > 0 && year <= currentYear) {
    return true;
  }
};

const isDateValid = (dayElement, monthElement, yearElement) => {
  let isValid = [false, false, false];

  if (!validateDay(dayElement.value)) {
    dayElement.classList.add("card__input--error");
  } else {
    isValid[0] = true;
    dayElement.classList.remove("card__input--error");
  }

  if (!validateMonth(monthElement.value)) {
    monthElement.classList.add("card__input--error");
  } else {
    isValid[1] = true;
    monthElement.classList.remove("card__input--error");
  }

  if (!validateYear(yearElement.value)) {
    yearElement.classList.add("card__input--error");
  } else {
    isValid[2] = true;
    yearElement.classList.remove("card__input--error");
  }

  return isValid.every((item) => item === true);
};

const calculateAge = (year, month, day) => {
  const today = new Date();
  const birthdate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (monthDiff < 0 || (monthDiff && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
};

const convertToHijriEn = (year, month, day) => {
  const birthdate = new Date(year, month - 1, day);

  let hijri = new Intl.DateTimeFormat("en-GB-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(birthdate);

  hijri = hijri.replace(/\s?AH/i, "").replace(/\s?هـ/i, "").trim();
  return hijri;
};

const onClickHandler = () => {
  const dayElement = document.querySelector('.card__input[name="day"]');
  const monthElement = document.querySelector('.card__input[name="month"]');
  const yearElement = document.querySelector('.card__input[name="year"]');

  const resultAge = document.querySelectorAll(".card__resultValue")[0];
  const resultHijri = document.querySelectorAll(".card__resultValue")[1];

  if (!isDateValid(dayElement, monthElement, yearElement)) {
    resultAge.textContent = "--";
    resultHijri.textContent = "--";
    return;
  }
  const d = parseInt(dayElement.value, 10);
  const m = parseInt(monthElement.value, 10);
  const y = parseInt(yearElement.value, 10);

  resultAge.textContent = calculateAge(y, m, d);

  resultHijri.textContent = convertToHijriEn(y, m, d);
};

const onResetHandler = () => {
  const dayElement = document.querySelector('.card__input[name="day"]');
  const monthElement = document.querySelector('.card__input[name="month"]');
  const yearElement = document.querySelector('.card__input[name="year"]');
  const resultElement = document.querySelector(".card__resultValue");

  dayElement.value = "";
  monthElement.value = "";
  yearElement.value = "";

  dayElement.classList.remove("card__input--error");
  monthElement.classList.remove("card__input--error");
  yearElement.classList.remove("card__input--error");

  document
    .querySelectorAll(".card__resultValue")
    .forEach((el) => (el.textContent = "--"));
};

submitButton.addEventListener("click", onClickHandler);
resetButton.addEventListener("click", onResetHandler);

inputElements.forEach((item) => {
  item.addEventListener("keydown", (event) => {
    event.key === "Enter" && onClickHandler();
  });
});
