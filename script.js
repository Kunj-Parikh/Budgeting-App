let errorHandler = document.getElementById('errorHandler');
let balance = document.getElementById('changeEB');
let changeBudget = document.getElementById('changeBudget');
let expenseChange = document.getElementById('changeExpenses');

let totalBudget = 0;
let totalExpense = 0;
let expenses = {

}

let submitBudget = document.getElementById('budgetSUBMIT').addEventListener('click', () => {
    
    let budgeting = String(document.getElementById('budget').value);
    let budgetValue = parseFloat(document.getElementById('budget').value);
    
    if (budgeting === '' || budgeting.indexOf('e') > -1 || budgetValue < 0) {
        errorHandler.style.display = 'block';
        setTimeout(() => {
            errorHandler.style.display = 'none';
        }, 3000);
    } else {
        totalBudget += budgetValue;
        changeBudget.innerText = `$${totalBudget}`;
        document.getElementById('budget').value = '';
        balance.innerText = `$${totalBudget - totalExpense}`;
    }
});

let expenseInfo = document.getElementById('expenseInfoContainer');
let submitExpense = document.getElementById('expensesSUBMIT').addEventListener('click', (e) => {

    let expenseName = document.getElementById('expenseName').value;
    let expenseValue = parseFloat(document.getElementById('expenseValue').value);
    let expenseJD = document.getElementById('dabois');

    if (String(expenseValue) === '' || String(expenseValue).indexOf('e') > -1 || expenseValue < 0 || expenseName === '' || !expenseName.replace(/\s/g, '').length) {
        errorHandler.style.display = 'block';
        setTimeout(() => {
            errorHandler.style.display = 'none';
        }, 3000);
    } else if (expenseName in expenses) {
        errorHandler.style.display = 'block';
        setTimeout(() => {
            errorHandler.style.display = 'none';
        }, 3000);
    } else {
        expenseJD.innerHTML = '';
        
        totalExpense = totalExpense + parseFloat(expenseValue);
        expenseChange.innerText = `$${totalExpense}`;
        expenses[expenseName] = expenseValue;
        balance.innerText = `$${totalBudget - totalExpense}`;
        
        expenseName = '';
        expenseValue = '';
        
        for (const key in expenses) {
            
            expenseJD.insertAdjacentHTML('beforeend', `<div id="${key}"><p id='visibility'>${key}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;${expenses[key]}</p><a id="bonks"><i class="reddyboi fas fa-trash"></i></a></div>`);
            
            let visible = document.getElementById(`${key}`);
            
            visible.addEventListener('click', () => {
                
                balance.innerText = `$${totalBudget - totalExpense + expenses[key]}`;

                totalExpense = totalExpense - expenses[key];

                expenseChange.innerText = `$${totalExpense}`;
                expenseJD.removeChild(visible);
                delete expenses[key];
            
            });
        }
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseValue').value = '';
    }
});
