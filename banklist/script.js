'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  
  const movs = sort ? movements.slice().sort((a,b) => a- b): movements
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

const calDisplayBalance = function(account){
  const balance = account.movements.reduce((acc, mov) =>acc + mov, 0);
  account.balance = balance
  labelBalance.textContent = `${account.balance} EUR`;
}


const calcDisplaySummary = function (account){
  const incomes = account.movements
    .filter(mov => mov >0)
    .reduce((acc, mov) => acc+mov,0);
    labelSumIn.textContent = `${incomes}$`;

  const outs = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov)=> acc + mov,0)
    labelSumOut.textContent = `${Math.abs(outs)}$`;
  
  const interest = account.movements 
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((int) => {
      // 이자율이 1달러 이상일떄만 지급;
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}`
}
// calcDisplaySummary(account1.movements)

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => {
        console.log('@name:', name)
        console.log('@name[0]:', name[0])
        return name[0]
      })
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function(currentAccount){
  // Display Movements
  displayMovements(currentAccount.movements)
  // Display Balance
  calDisplayBalance(currentAccount)
  // Display Summary
  calcDisplaySummary(currentAccount)
}


let currentAccount;
btnLogin.addEventListener('click', function(e){
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log('@currentAccount:', currentAccount)
  if(currentAccount.pin === Number(inputLoginPin.value)){
    console.log('LOGIN')
    // Display UI and Message
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;

    //Clear Two Input Fields at once; New Syntax;
    inputLoginUsername.value = inputLoginPin.value = '' 
    inputLoginPin.blur();


    updateUI(currentAccount);

    
  } else {
    alert('Wrong!')
  }

})

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  console.log(amount, receiveAcc);
  if(
    amount > 0 &&
    receiveAcc && 
    currentAccount.balance >= amount &&
    receiveAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);
    

    // Update UI
    updateUI(currentAccount)
  }
})

btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  
  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount *0.1)){
    currentAccount.movements.push(amount)
    //Update UI
    updateUI(currentAccount)
  }
  inputLoanAmount.value = '';
})

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  const isName = inputCloseUsername.value === currentAccount.username
  const isPin = Number(inputClosePin.value) === currentAccount.pin
  if(isName && isPin){
    const index = accounts.findIndex(acc => 
      acc.username === currentAccount.username
    )
    console.log('Delete', index);

       // Delete account
       accounts.splice(index, 1);

       // Hide UI
       containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = ''
});

let sorted = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted
})
