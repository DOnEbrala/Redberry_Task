const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const devTalkWrapper= document.getElementById("devTalkWrapper");
const somethingSpecialWrapper= document.getElementById("somethingSpecialWrapper");

const devTalkText=document.getElementById("devtalk-text");
const somethingSpecial= document.getElementById("somethingSpecial");
const radioBox1=document.getElementById("myRadioId");
const radioBox2=document.getElementById("myRadioId2");
const pageData = getPageFromStorage('page4');

var hasErrors=false;
const dataToSave={};


if(pageData!=null){
    debugger
    loadPage(pageData);
}


nextButton.addEventListener("click", function (e) {
    e.preventDefault();
    checkValues();
    
    
    if(hasErrors===false){
        savePageToStorage('page4', dataToSave);
        location.href = '../pages/Page5.html';
    }
})


prevButton.addEventListener("click", function (e) {
    e.preventDefault();

    location.href = '../pages/Page3.html';
})
  
radioBox1.addEventListener('change', function() {
    if(this.checked==true){
        devTalkWrapper.classList.remove("hide");
    }
 
});

radioBox2.addEventListener('change', function() {
    if(this.checked==true){
        if(!devTalkWrapper.classList.contains('hide'));
            devTalkWrapper.classList.add("hide");

    }
 
});





function checkValues(){
    debugger
    hasErrors = false;
    const devTalkRadioBox= document.querySelector('input[name="devTalk"]:checked'); 
    const devTalkRadioBoxValidationBox=  document.querySelector('input[name="devTalk"]').parentElement.parentElement;
  
  
    if(devTalkRadioBox==null){        
        setErrorFor(devTalkRadioBoxValidationBox, "Field is Mandatroy");
    }else{
        removeErrorFor(devTalkRadioBoxValidationBox);
        dataToSave.devTalkRadioBox=devTalkRadioBox.value;
    }

    if(!devTalkWrapper.classList.contains('hide')){
        if(devTalkText.value.length<10){
            setErrorFor(devTalkWrapper,"Field is Mandatroy(Minimium 10 Characters)");
        }
        else{
            removeErrorFor(devTalkWrapper);
            dataToSave.devTalkText=devTalkText.value;
        }
    }

    if(somethingSpecial.value==''){
        setErrorFor(somethingSpecialWrapper,"Field is Mandatroy");       
    }
    else{
        removeErrorFor(somethingSpecialWrapper);
        dataToSave.somethingSpecial=somethingSpecial.value;
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
    let devTalkRadioBox=document.querySelectorAll('[value="'+data.devTalkRadioBox+'"]')[0];
    devTalkRadioBox.checked=true;
    if(radioBox1.checked==true){
        devTalkWrapper.classList.remove("hide");
    }
    
    devTalkText.value=data.devTalkText;
    somethingSpecial.value=data.somethingSpecial;

  }