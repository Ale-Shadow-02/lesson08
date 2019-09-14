'use strict';

let start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  plus = document.getElementsByTagName('button'),
  incomePlus = plus[0],
  expensesPlus = plus[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  periodSelect = document.querySelector('.period-select'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),

  incomItems = document.getElementsByClassName('income-items'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.getElementsByClassName('expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),

  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),

  targetAmount = document.querySelector('.target-amount'),
  targetMonthValue = document.querySelector('.target_month-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  periodAmount = document.querySelector('.period-amount'),
  checkBox = document.getElementById('deposit-check');

const AppData = function () {
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.incomeMonth = 0;
  this.persentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.check = function() {
  if (salaryAmount.value !== '') {
    start.removeAttribute('disabled');
  }
};

AppData.prototype.start = function () {
console.log(this);

  if (salaryAmount.value === '') {
    start.setAttribute('disabled', true);
    return;
  }
  let allInput = document.querySelectorAll('.data input[type = text]');
  allInput.forEach(item => {
    item.setAttribute('disabled', 'true');
  });
  incomePlus.setAttribute('disabled', 'true');
  expensesPlus.setAttribute('disabled', 'true');
  start.style.display = 'none';
  cancel.style.display = 'block';
  this.budget = +salaryAmount.value;
  console.log(this);
  this.getExpenses(expensesItems);
  this.getExpenses(incomItems);
  this.getExpensesMonth();
  this.getAddIncom();
  this.getAddExpenses();
  this.getInfoDeposit();
  this.getBudget();

  this.showResult();
};


AppData.prototype.showResult = function () {
  const _this = this;
  budgetMonthValue.value = Math.ceil(this.budgetMonth);
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  periodSelect.addEventListener('change', function () {
    incomePeriodValue.value = _this.calcSavedMoney();
    /* console.log(this); */
  });
};

/* AppData.prototype.addExpensesBlock = () => {
  let clonExpensesItem = expensesItems[0].cloneNode(true);
  clonExpensesItem.querySelectorAll('input').forEach(function (item) {
    item.value = '';
    });
  expensesItems[0].parentNode.insertBefore(clonExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
}; */

AppData.prototype.addBlock = (items, btnPlus) => {
  let cloneItem = items[0].cloneNode(1);
  cloneItem.querySelectorAll('input').forEach(item => {
    item.value = '';
  });
  items[0].parentNode.insertBefore(cloneItem, btnPlus);
  items = items;
  if (items.length === 3) {
    btnPlus.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function(elem) {
  [...elem].forEach(item => {
    let itemName = item.getElementsByTagName('input')[0].value;
    let cash = item.getElementsByTagName('input')[1].value;
    if (elem === expensesItems && itemName !== '' && cash !== '') {
      this.expenses[itemName] = cash;
    } else if (elem === incomItems && itemName !== '' && cash !== '') {
        this.income[itemName] = cash;
        for (let key in this.income) {
          this.incomeMonth += +this.income[key];
        }
    }
  });
    
};

// AppData.prototype.getIncome =function() {
//   [...incomItems].forEach(item => {
//     let itemIncom = item.querySelector('.income-title').value;
//     let cashIncom = item.querySelector('.income-amount').value;
//     if (itemIncom !== '' && cashIncom !== '') {
//       this.income[itemIncom] = cashIncom;
//     }
//   });
//   for (let key in this.income) {
//     this.incomeMonth += +this.income[key];
//   }
// };

AppData.prototype.getAddExpenses = function() {
  let addExpenses = additionalExpensesItem.value.split(', ');
  addExpenses.forEach(item => {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncom = function() {
  additionalIncomeItem.forEach(item => {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  });
};

//Сумма всех обязательных расходов
AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.persentDeposit) / 12; // Накопления за месяц
  this.budgetDay = Math.floor(this.budgetMonth / 30); //наkопления за день
};

AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};

//Результат дохода
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay >= 800) {
    return ('Высокий уровень дохода');
  } else if (this.budgetDay >= 300) {
    return ('Средний уровень дохода');
  } else if (this.budgetDay > 0) {
    return ('Низкий уровень дохода');
  } else {
    return ('Что то пошло не так');
  }
};

// получаем данные по дипозиту
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    this.persentDeposit = depositPercent.value;
    this.moneyDeposit = depositAmount.value;
  }
};
//Сколько мы накопим за определенный период если наш доход bugetMonth * на period
AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function () {
  let inputTextData = document.querySelectorAll('.data input[type = text]'),
    resultInputAll = document.querySelectorAll('.result input[type = text');

  inputTextData.forEach(elem => {
    elem.value = '';
    elem.removeAttribute('disabled');
    periodSelect.value = '0';
    periodAmount.innerHTML = periodSelect.value;
  });
  resultInputAll.forEach(elem => {
    elem.value = '';
  });
  /* for (let i = 0; i < incomItems.length; i++) {
    incomItems[i].parentNode.removeChild(incomItems[i]);
    incomePlus.style.display = 'block';
  } */
  while (incomItems.length !== 1) {
    incomItems[incomItems.length - 1].parentNode.removeChild(incomItems[incomItems.length - 1]);
    incomePlus.style.display = 'block';
  }

  while (expensesItems.length !== 1) {
    expensesItems[expensesItems.length - 1].parentNode.removeChild(expensesItems[expensesItems.length - 1]);
    expensesPlus.style.display = 'block';
  }

 /*  for (let i = 0; i < expensesItems.length; i++) {
    expensesItems[i].parentNode.removeChild(expensesItems[i]);
    expensesPlus.style.display = 'block';
  } */
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.incomeMonth = 0;
  this.persentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;

  cancel.style.display = 'none';
  start.style.display = 'block';
  incomePlus.removeAttribute('disabled');
  expensesPlus.removeAttribute('disabled');
  checkBox.checked = false;
  depositBank.style.display = 'none';
  depositAmount.style.display = 'none';
  depositPercent.style.display = 'none';
};

AppData.prototype.eventsListeners = function () {
  // Навешиваем событие
  start.addEventListener('click', this.start.bind(appData));
  expensesPlus.addEventListener('click', () => {
    this.addBlock(expensesItems, expensesPlus);
  });
  incomePlus.addEventListener('click', () => {
    this.addBlock(incomItems, incomePlus);
  });
  salaryAmount.addEventListener('keyup', this.check);
  //periodSelect.addEventListener('change', this.titleRange);    это вызов первого метода
  cancel.addEventListener('click', this.reset.bind(appData));

  // Число под полоской (range) второй вариант
  periodSelect.addEventListener('change', () => {
    periodAmount.innerHTML = periodSelect.value;
  });

  depositCheck.addEventListener('change', function () {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = 'true';
      depositBank.addEventListener('change', function () {
        let selectIndex = this.options[this.selectedIndex].value;
        if (selectIndex === 'other') {
          depositPercent.style.display = 'inline-block';
          depositPercent.value = '';
        } else {
          depositPercent.style.display = 'none';
          depositPercent.value = selectIndex;
        }
      });
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositAmount.value = '';
      this.deposit = 'true';
    }
  });
};


const appData = new AppData();
console.log(appData);
appData.eventsListeners();





// Функцмя проверки входных данных
function ValidInput(messenge, defaultValue, isNumb) {
  let inputValue = prompt(messenge, defaultValue);
  if (isNumb && +inputValue) {
    return inputValue.trim();
  } else if (!isNumb && inputValue !== null && inputValue !== ' ' && isNaN(inputValue)) {
    return inputValue.trim();
  } else {
    return ValidInput(messenge, defaultValue, isNumb);
  }
}















// Это пока оставил, может еще пригодиться

//Период достижения цели
/* getTargetMonth: function () {
  let accumulatedMonth = this.mission / this.budgetMonth;
  if (accumulatedMonth <= 0) {
    return (' Цель никогда не будет достигнута! ');
  } else {
    return (' Цель будет достигнута');
  }
}, */
/* asking: function () {
  if (confirm('Усть ли у вас дополнительный заработок?')) {
    let itemIncom = ValidInput(' Какой у вас дополнительный заработок? ', ' Фриланс ');
    let cashIncom = ValidInput(' Сколько в месяц вы на этом зарабатываете? ', 8000, true);
    this.income[itemIncom] = cashIncom;
  }

  let addExpenses = ValidInput('Перечислете возможные расходы за рaссчитываемый период через запятую', ' Кредит');
  this.addExpenses = addExpenses.split(',').map(function (item) {
    return item.trim();
  });

  this.deposit = confirm('Есть ли у вас депозит в банке?');

}, */


/* console.log('Pасходы за месяц: ' + this.expensesMonth); */

/* if (this.getTargetMonth() > 0) {
  console.log('Цель будет достигнута за: ' + Math.ceil(this.getTargetMonth()) + ' месяца(ев)');
} else {
  console.log(' Цель не будет достигнута');
}
console.log(this.getStatusIncome());

for (let key in this) {
  console.log(' Наша программа включает в себя данные: ' + key + '-' + this[key]);
} */

/* console.log(this.addExpenses.map(function (item) {
  return item[0].toUpperCase() + item.slice(1);
}).join(', ')); */

// Число под полоской (range) первый вариант
/* titleRange: function (avd) {
  periodAmount.innerHTML = avd.target.value;
}, */