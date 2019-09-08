'use strict';

let calculate = document.getElementById('start');
console.log('calculate: ', calculate);
let plus = document.getElementsByTagName('button');
console.log('plus: ', plus);
let plus1 = plus[0];
let plus2 = plus[1];
console.log('Plus1,2 : ',plus1, plus2);
let check = document.querySelector('#deposit-check');
console.log('check: ', check);
let addIncome = document.querySelectorAll('.additional_income-item');
console.log('addIncome: ', addIncome);
let resultTotal = document.querySelectorAll('.result-total');
console.log('resultTotal: ', resultTotal);
let inputRang = document.querySelector('.period-select');
console.log('inputRang: ', inputRang);
let salaryAmount = document.querySelector('.salary-amount');
console.log('salaryAmount: ', salaryAmount);
let incomeTitle = document.querySelector('.income-title');
console.log('incomeTitle: ', incomeTitle);
let incomeAmount = document.querySelector('.income-amount');
console.log('incomeAmount: ', incomeAmount);
let expensesTitle = document.querySelector('.expenses-title');
console.log('expensesTitle: ', expensesTitle);
let expensesAmount = document.querySelector('.expenses-amount');
console.log('expensesAmount: ', expensesAmount);
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log('additionalExpensesItem: ', additionalExpensesItem);
let depositAmount = document.querySelector('.deposit-amount');
console.log('depositAmount: ', depositAmount);
let depositPercent = document.querySelector('.deposit-percent');
console.log('depositPercent: ', depositPercent);


let accumulatedMonth,
  money,
  start = function () {
    money = ValidInput('Ваш месячный доход?', 25000, true);
  };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  mission: 120000,
  period: 12,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
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
    //Сумма всех расходов
    for (let i = 0; i < 2; i++) {
      let ExpensesItem = ValidInput('Какие обязательные ежемесячные расходы у вас есть?', 'Кредит Альфа');
      let ExpensesCash = ValidInput('Во сколько это обойдется?', 14000, true);
      appData.expenses[ExpensesItem] = ExpensesCash;
    }
  },

  //Сумма всех обязательных расходов
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth; // Накопления за месяц
    appData.budgetDay = Math.floor(appData.budgetMonth / 30); //наkопления за день
  },

  //Период достижения цели
  getTargetMonth: function () {
    let accumulatedMonth = appData.mission / appData.budgetMonth;
    if (accumulatedMonth <= 0) {
      return (' Цель никогда не будет достигнута! ');
    } else {
      return (' Цель будет достигнута');
    }
  },

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
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Pасходы за месяц: ' + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
  console.log('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяца(ев)');
} else {
  console.log(' Цель не будет достигнута');
}
console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log(' Наша программа включает в себя данные: ' + key + '-' + appData[key]);
}

console.log(appData.addExpenses.map(function (item) {
  return item[0].toUpperCase() + item.slice(1);
}).join(', '));

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
