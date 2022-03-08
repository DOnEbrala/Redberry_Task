const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const email = document.getElementById('email')
const phoneNumber = document.getElementById('number')
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

const pageData = getPageFromStorage('page1');

var hasErrors = false;

if (pageData != null) {
  fname.value = pageData.firstName;
  lname.value = pageData.lastName;
  email.value = pageData.email;
  phoneNumber.value = pageData.phoneNumber;
}



nextButton.addEventListener("click", function (e) {

  checkInputs();
  if (!hasErrors) {

    let objToSave = generatePageObjectForSave();
    savePageToStorage('page1', objToSave);
    location.href = '../pages/Page2.html';
  }

})

prevButton.addEventListener("click", function (e) {
  let objToSave = generatePageObjectForSave();
  savePageToStorage('page1', objToSave);
  location.href = '../index.html';

})

function generatePageObjectForSave() {
  let objectToSave = {
    'firstName': fname.value,
    'lastName': lname.value,
    'email': email.value,
    'phoneNumber': phoneNumber.value
  };
  return objectToSave;
}


function checkInputs() {
  hasErrors = false;
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
  hasErrors = true;
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
  phone = phone.replace(/\s+/g, '');
  return /5[0-9]{6}$/.test(phone);
}