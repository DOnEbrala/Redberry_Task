const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const covidDate=document.getElementById("covidDate");
const vaccineDate=document.getElementById("vaccineDate");
const pageData = getPageFromStorage('page3');

const dataToSave={};

var hasErrors=false;
covidDate.value='';
vaccineDate.value='';

if(pageData!=null){
    loadPage(pageData);
}



nextButton.addEventListener("click", function (e) {
    e.preventDefault();

    checkValues();
    if(hasErrors===false){
        savePageToStorage('page3', dataToSave);
        location.href = '../pages/Page4.html';

    }
})

prevButton.addEventListener("click", function (e) {
  location.href = '../pages/Page2.html';
})

function checkValues(){
    hasErrors = false;
    const workPreference= document.querySelector('input[name="workPlace"]:checked'); 
    const workPreferenceValidationBox=   document.querySelector('input[name="workPlace"]').parentElement.parentElement;
    
    if(workPreference==null){        
        setErrorFor(workPreferenceValidationBox, "Field is Mandatroy");
    }else{
        removeErrorFor(workPreferenceValidationBox);
        dataToSave.workPreference=workPreference.value;
    }


    const covidCheck= document.querySelector('input[name="covidCheck"]:checked'); 
    const covidCheckValidationBox=   document.querySelector('input[name="covidCheck"]').parentElement.parentElement;
    
    if(covidCheck==null){        
        setErrorFor(covidCheckValidationBox, "Field is Mandatroy");
    }else{
        removeErrorFor(covidCheckValidationBox);
        dataToSave.covidCheck=covidCheck.value;

    }


    const vaccineCheck= document.querySelector('input[name="vaccineCheck"]:checked');    
    const vaccineValidationBox=   document.querySelector('input[name="vaccineCheck"]').parentElement.parentElement;

    if(vaccineCheck==null){        
        setErrorFor(vaccineValidationBox, "Field is Mandatroy");
    }else{
        removeErrorFor(vaccineValidationBox);
        dataToSave.vaccineCheck=vaccineCheck.value;

    }

    const covidDateValidationBox=covidDate.parentElement.parentElement;

    if(covidDate.value==''){
        setErrorFor(covidDateValidationBox, "Field is Mandatroy");
    }else{
        removeErrorFor(covidDateValidationBox);
        dataToSave.covidDate=covidDate.value;

    }

    const vaccineDateValidationBox=vaccineDate.parentElement;

    if(vaccineDate.value==''){
        setErrorFor(vaccineDateValidationBox, "Field is Mandatroy");
    }else{
        removeErrorFor(vaccineDateValidationBox);
        dataToSave.vaccineDate=vaccineDate.value;

    }
    
 

}

function setErrorFor(input, message) {
    hasErrors = true;
    const small = input.querySelector('small');
    input.classList.add('error');
    small.innerText = message;
  }

  function removeErrorFor(input) {
    input.classList.remove('error');
  }
  
  function loadPage(data){
    let workPlaceCheckBox=document.querySelectorAll('[value="'+data.workPreference+'"]')[0];
    workPlaceCheckBox.checked=true;
    let vaccineCheckBox=document.querySelectorAll('[value="'+data.vaccineCheck+'"]')[0];
    vaccineCheckBox.checked=true;
    let covidCheckBox=document.querySelectorAll('[value="'+data.covidCheck+'"]')[1];
    covidCheckBox.checked=true;
    
    covidDate.value=data.covidDate;
    vaccineDate.value=data.vaccineDate;

  }