const skillsList = document.getElementById("list");
const addButton=document.getElementById("add-button");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const addedSkills=document.getElementById("added-skills");
const experience=document.getElementById("experience");
const pageData = getPageFromStorage('page2');
var   fetchedData;
const skills=[];
 
debugger
if(pageData!=null){
  addedSkills.innerHTML='';
  for(let i=0; i<pageData.length; i++){
    let skill=pageData[i];
    let index=pageData.indexOf(skill);
    skills.push(getNewSkill(skill.lang, skill.exp));
    let skillToLoad= generateSkill(skill.lang,skill.exp, index);
    addedSkills.appendChild(skillToLoad);
  }
}


const myHeader = new Headers({
  'Authorization': 'Token ' + 'b8f79363-304e-4962-85a3-728a45d01b2e',
  'Content-Type': 'application/x-www-form-urlencoded',
});


FetchSkills()
  .then(data => {
    fetchedData=data;
    for (var i = 0; i<data.length; i++){
      let opt = document.createElement('option');
      opt.value = data[i].title;
      opt.innerHTML = data[i].title;;
      skillsList.appendChild(opt);
  }
  })
  .catch(err => console.error(err));




addButton.addEventListener("click", function (e) {
  let skillToPush=getNewSkill(getSelectedLanguage(), experience.value);
  skills.push(skillToPush)

  let newIndex=skills.length-1;  
  let skillToAppend=generateSkill(getSelectedLanguage(),experience.value,newIndex);
  
  addedSkills.appendChild(skillToAppend);

  savePageToStorage('page2', skills);

  experience.value='';
})

addedSkills.addEventListener("click", function(e){
  const isRemoveButton=e.target.className==='remove-button'
  
  if(!isRemoveButton)
    return;
  
  let elementToRemove=e.target.parentElement;
  let indexToRemove=elementToRemove.getAttribute('index');
  skills.splice(parseInt(indexToRemove),1);
  addedSkills.removeChild(elementToRemove)

  savePageToStorage('page2', skills);


})


nextButton.addEventListener("click", function (e) {
    e.preventDefault();
    location.href = '../pages/Page3.html';
})

prevButton.addEventListener("click", function (e) {
  location.href = '../pages/Page1.html';
})




function getNewSkill(lang, exp){
  debugger
  let skillId=findIdOfSkill(lang);
  return {
    'id':skillId,
    'lang':lang,
    'exp':exp
  }
}

function findIdOfSkill(skillName){
  for(let i=0; i<fetchedData.length; i++){
      if(fetchedData[i].title==skillName){
        return fetchedData[i].id;
      }      
  }
  return -1;
}

function generateSkill(lang, exp, index){
  let selectedLangauge=lang;
  let newFormControl = document.createElement('div');
  newFormControl.className= 'form-control';
  newFormControl.setAttribute('index', index);

  let skillName=document.createElement('p');
  skillName.textContent=selectedLangauge;
  
  let newExperience=document.createElement('p');
  newExperience.textContent=exp;


  let removeButton=document.createElement('button');
  removeButton.className='remove-button'

  let removeIcon=document.createElement('i');
  removeIcon.className='fa fa-times-circle-o';

  removeButton.appendChild(removeIcon);

  newFormControl.appendChild(skillName);
  newFormControl.appendChild(newExperience);

  newFormControl.appendChild(removeButton);
  return newFormControl;
}


function getSelectedLanguage() {
  var selectedValue = skillsList.value;
  return selectedValue;
}



async function FetchSkills() {

  const res = await fetch('https://bootcamp-2022.devtest.ge/api/skills', {
    headers: myHeader,
    method: 'GET'
  });
  const data = await res.json();
  return data;
}



