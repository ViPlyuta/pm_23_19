const firstName = "Brian D.";
const lastName = "Paterson";
const jobExperienceAr = [{organization:"Creative Agency"
    ,time:"2021 - Present"
    ,city:"Chicago"
    ,post:"SENIOR WEB DESIGNER",
    description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
 },
{organization:"Creative Market"
    ,time:"2018 - 2021"
    ,city:"United Kingdom"
    ,post:"GRAPHIC DESIGNER",
    description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
 },
{organization:"Marketing Agency"
    ,time:"2015 - 2018"
    ,city:"United Kingdom"
    ,post:"MARKETING MANAGER",
    description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
 },
{organization:"Creative Agency"
    ,time:"2013 - 2015"
    ,city:"Chicago"
    ,post:"JUNIOR WEB DESIGNER",
    description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
 }];
function createJobElement(data) {
    
    const container = document.createElement("div");
    container.classList.add("mb-3", "d-flex","gap-3");

   
    const timeContainer = document.createElement("div");
    timeContainer.classList.add("me-2");

    
    const time = document.createElement("div");
    time.classList.add("bg-custom-yellow", "vertical-text", "small", "fw-bold", "px-2", "py-3", "first-ags");
    time.textContent = data.time;

   
    timeContainer.appendChild(time);

   
    const infoContainer = document.createElement("div");

    
    const organization = document.createElement("h3");
    organization.classList.add("h6", "fst-italic", "fw-bold", "text-dark", "ags");
    organization.textContent = data.organization;

    
    const city = document.createElement("p");
    city.classList.add("small", "fst-italic", "text-dark", "mb-0", "ags1");
    city.textContent = data.city;

    
    const post = document.createElement("h4");
    post.classList.add("fw-semibold", "mt-1", "smaller-title", "ags2");
    post.textContent = data.post;


    const description = document.createElement("p");
    description.classList.add("small", "text-muted", "ags3");
    description.textContent = data.description;

  
    infoContainer.appendChild(organization);
    infoContainer.appendChild(city);
    infoContainer.appendChild(post);
    infoContainer.appendChild(description);

   
    container.appendChild(timeContainer);
    container.appendChild(infoContainer);


return container;
}

function createJobExperienceContent(jobExperienceAr){
    let container = document.querySelector("#job-experience-container");
    container.innerHTML='';
    jobExperienceAr.forEach(elem=>{
        let job = createJobElement(elem);
        container.append(job);
    }
    )
}

function setPersonName(firstName, lastName){
    let firstNameContainer = document.querySelector("#first-name");
    let lastNameContainer = document.querySelector("#last-name");
    console.log(firstNameContainer);
    firstNameContainer.textContent=firstName;
    lastNameContainer.textContent=lastName;
}

document.addEventListener('DOMContentLoaded', function () {
    setPersonName(firstName, lastName);
    createJobExperienceContent(jobExperienceAr);

    // SKILLS 
    document.querySelector('#show-more-skills').addEventListener('click', function () {
        let skillsContainer = document.querySelector('#skills');
        if (this.classList.contains('arrow-open')) {
            skillsContainer.classList.remove('skill-list-show');
            skillsContainer.classList.add('skill-list-hide');
            this.classList.remove('arrow-open');
        } else {
            skillsContainer.classList.add('skill-list-show');
            skillsContainer.classList.remove('skill-list-hide');
            this.classList.add('arrow-open');
        }
    });

    // HOBBIES 
    document.querySelector('#show-more-hobbies').addEventListener('click', function () {
        let hobbiesContainer = document.querySelector('#hobbies');
        if (this.classList.contains('arrow-open')) {
            hobbiesContainer.classList.remove('hobbie-list-show');
            hobbiesContainer.classList.add('hobbie-list-hide'); 
            this.classList.remove('arrow-open');
        } else {
            hobbiesContainer.classList.add('hobbie-list-show');
            hobbiesContainer.classList.remove('hobbie-list-hide');
            this.classList.add('arrow-open');
        }
    });

});

