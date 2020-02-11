const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10000000)
  };

  addData(newUser);
};

// Borrowed from: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
const formatMoney = number =>
  '£' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

const addData = obj => {
  data.push(obj);
  updateDOM();
};

const updateDOM = (providedData = data) => {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(person => {
    const el = document.createElement('div');

    el.classList.add('person');
    el.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;

    main.appendChild(el);
  });
};

addUserBtn.addEventListener('click', getRandomUser);
