const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", function (e) {
    debugger
    e.preventDefault();
    sendData().then(e=>{
        location.href = '../pages/Page6.html';

    }

    );

    

   
})


async function sendData(){
    const data=getDataToSend();

    const myHeader = new Headers({
        'Authorization': 'Token ' + 'b8f79363-304e-4962-85a3-728a45d01b2e',
        'Content-Type': 'application/json',
    });

    const settings = {
        method: 'POST',
        headers: myHeader,
        body: JSON.stringify(data)
    };


    try {
        const fetchResponse = await fetch('https://bootcamp-2022.devtest.ge/api/application', settings);
        const data = await fetchResponse.json();
        return data;
        
    } catch (e) {
        return e;
    }    
}

function getDataToSend(){
    const page1Data=getPageFromStorage('page1');
    const page2Data=getPageFromStorage('page2');
    const page3Data=getPageFromStorage('page3');
    const page4Data=getPageFromStorage('page4');
    debugger


    const skills=getSkills(page2Data);


    let work_preference=page3Data.workPreference;
    let had_covid;
    if(page3Data.covidCheck=="Yes"){
        had_covid=true;
    }
    else{
        had_covid=false;

    }
    let had_covid_at=page3Data.covidDate;

    let vaccinated;
    if(page3Data.vaccineCheck=="Yes"){
        vaccinated=true;
    }
    else{
        vaccinated=false;
    }

    let vaccinated_at=page3Data.vaccineDate;

    let will_organize_devtalk; 
    if(page4Data.devTalkRadioBox=="Yes"){
        will_organize_devtalk=true;
    }
    else{
        will_organize_devtalk=false;
    }

    let devtalk_topic=page4Data.devTalkText;
    let something_special=page4Data.somethingSpecial;

    const data={
        "token": "89nOpas|asdanjjh^&as",
        "first_name": page1Data.firstName,
        "last_name": page1Data.lastName,
        "email": page1Data.email,
        "phone": '+995'+page1Data.phoneNumber,
        "work_preference": work_preference,
        "had_covid": had_covid,
        "had_covid_at": had_covid_at,
        "vaccinated": vaccinated,
        "vaccinated_at": vaccinated_at,
        "will_organize_devtalk": will_organize_devtalk,
        "devtalk_topic": devtalk_topic,
        "something_special": something_special,
        "skills": skills

      };

      return data;
    
}


function getSkills(pageData){
    let skills=[]
    for(let i=0; i<pageData.length; i++){
        skills.push({
            "id":pageData[i].id,
            "experience":parseInt(pageData[i].exp)
        });
    }
    return skills;

}