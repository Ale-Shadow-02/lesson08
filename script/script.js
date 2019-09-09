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
  incomItems = document.querySelectorAll('.income-items'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  targetMonthValue = document.querySelector('.target_month-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  periodAmount = document.querySelector('.period-amount');

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  incomeMonth: 0,
  persentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  check: function () {
    if (salaryAmount.value !== '') {
      start.removeAttribute('disabled');
    }
  },
  start: function () {
    if (salaryAmount.value === '') {
      start.setAttribute('disabled', true);
      return;
    }
    let allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    incomePlus.setAttribute('disabled', 'disabled');
    expensesPlus.setAttribute('disabled', 'disabled');
    start.style.display = 'none';
    cancel.style.display = 'block';
    
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddIncom();
    appData.getAddExpenses();
    appData.getBudget();

    appData.showResult();
  },

  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
  },

  addExpensesBlock: function () {
    let clonExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(clonExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },

  addIncomeBlock: function () {
    let clonIncomItem = incomItems[0].cloneNode(1);
    incomItems[0].parentNode.insertBefore(clonIncomItem, incomePlus);
    incomItems = document.querySelectorAll('.income-items');
    if (incomItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },

  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  getIncome: function () {
    incomItems.forEach(function (item) {
      let itemIncom = item.querySelector('.income-title').value;
      let cashIncom = item.querySelector('.income-amount').value;
      if (itemIncom !== '' && cashIncom !== '') {
        appData.income[itemIncom] = cashIncom;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }

  },

  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncom: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  //Сумма всех обязательных расходов
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth; // Накопления за месяц
    appData.budgetDay = Math.floor(appData.budgetMonth / 30); //наkопления за день
  },

  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
  },

  // Число под полоской (range) первый вариант
  /* titleRange: function (avd) {
    periodAmount.innerHTML = avd.target.value;
  }, */

  //Результат дохода
  getStatusIncome: function () {
    if (appData.budgetDay >= 800) {
      return ('Высокий уровень дохода');
    } else if (appData.budgetDay >= 300) {
      return ('Средний уровень дохода');
    } else if (appData.budgetDay > 0) {
      return ('Низкий уровень дохода');
    } else {
      return ('Что то пошло не так');
    }
  },

  // получаем данные по дипозиту
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.persentDeposit = prompt(' Какой годовой процент', 8);
      }
      while (isNaN(appData.persentDeposit) || appData.persentDeposit === ' ' || appData.persentDeposit === '' || appData.persentDeposit === null);
      do {
        appData.moneyDeposit = prompt(' Какая сумма заложена', 8000);
      }
      while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === ' ' || appData.moneyDeposit === '' || appData.moneyDeposit === null);
    }
  },
  //Сколько мы накопим за определенный период если наш доход bugetMonth * на period
  calcSavedMoney: function () {
    return appData.budgetMonth * periodSelect.value;
  }
};
// Навешиваем событие
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.titleRange);

// Число под полоской (range) второй вариант
periodSelect.addEventListener('change', function () {
  periodAmount.innerHTML = periodSelect.value;
});


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
  let accumulatedMonth = appData.mission / appData.budgetMonth;
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
    appData.income[itemIncom] = cashIncom;
  }

  let addExpenses = ValidInput('Перечислете возможные расходы за рaссчитываемый период через запятую', ' Кредит');
  appData.addExpenses = addExpenses.split(',').map(function (item) {
    return item.trim();
  });

  appData.deposit = confirm('Есть ли у вас депозит в банке?');

}, */


/* console.log('Pасходы за месяц: ' + appData.expensesMonth); */

/* if (appData.getTargetMonth() > 0) {
  console.log('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяца(ев)');
} else {
  console.log(' Цель не будет достигнута');
}
console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log(' Наша программа включает в себя данные: ' + key + '-' + appData[key]);
} */

/* console.log(appData.addExpenses.map(function (item) {
  return item[0].toUpperCase() + item.slice(1);
}).join(', ')); */