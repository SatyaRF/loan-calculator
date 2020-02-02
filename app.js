const form = document.querySelector('#loan-form');


function calculateLoan(e) {
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*calculatedInterest*x)/(x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.querySelector('#loading').style.display = 'none';
        document.querySelector('#results').style.display = 'block';
        

    }else{
        showError('Check your inputs');
    }

    form.reset();
    
}

function showError(error) {
    document.querySelector('#loading').style.display = 'none';
    document.querySelector('#results').style.display = 'none';
    const errDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errDiv.className = 'alert alert-danger';
    errDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errDiv, heading);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 2000);
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    document.querySelector('#results').style.display = 'none';
    document.querySelector('#loading').style.display = 'block';
    setTimeout(calculateLoan, 2000);
});