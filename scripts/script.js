const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const email = document.getElementById('email')
const phoneNumber = document.getElementById('number')

const form = document.getElementById('form')
const errorElement = document.getElementById('error')
var nextButton = document.getElementById("next");

nextButton.addEventListener("click", function (e) {
  debugger
  e.preventDefault()
  checkInputs();

})


function checkInputs() {
  
  if (fname.value === '' || fname.value == null) {
    setErrorFor(fname, 'First Name cannot be blank');
  }
  else if (fname.value.length <= 2) {
    setErrorFor(fname, 'First Name  Should be longer than 2 characters!');
  }
  else {
    removeErrorFor(fname);
  }


  if (lname.value === '' || lname.value == null) {
    setErrorFor(lname, 'Last Name cannot be blank');
  }
  else if (lname.value.length <= 2) {
    setErrorFor(lname, 'Last Name  Should be longer than 2 characters!');
  }
  else {
    removeErrorFor(lname);
  }

  if (email.value === '') {
    setErrorFor(email, 'Email cannot be blank');
  } else if (!isEmail(email.value)) {
    setErrorFor(email, 'Not a valid email');
  }
  else {
    removeErrorFor(email);
  }

  if (phoneNumber.value === '') {
    setErrorFor(phoneNumber, 'Phone number cannot be blank');
  } else if (!isPhoneNumber(phoneNumber.value)) {
    setErrorFor(phoneNumber, 'Not a valid number');
  }
  else {
    removeErrorFor(phoneNumber);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}
function removeErrorFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control';
}


function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isPhoneNumber(phone) {
  return /((\+995))5[0-9]{8}$/.test(phone);
}