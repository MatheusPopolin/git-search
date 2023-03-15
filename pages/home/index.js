function getLastUsers(){
    const lastUsersJson = localStorage.getItem("lastUsers");
    if(!lastUsersJson){
        return [];    
    }else{
        return JSON.parse(lastUsersJson);
    }
}

function createLastUserCards(){
    const lastUsers = getLastUsers();    
    lastUsers.forEach(userJson=>{
        const user = JSON.parse(userJson);
        const {name, avatar_url} = user;
        const divLastUsers = document.getElementById("lastUsers");
        const imgUser = document.createElement("img");
        imgUser.src = avatar_url;
        imgUser.alt = name;
        imgUser.addEventListener("click",()=>{
            localStorage.setItem("gitHubUser", userJson);
            window.location.replace("../pages/profile/");
        })              
        divLastUsers.appendChild(imgUser);
    })
}
createLastUserCards();

const findButton = document.getElementById("findButton");
const inputUser = document.getElementById("inputUser");
inputUser.addEventListener("keyup",(event)=>{
    if(event.target.value.length>0){
        console.log(event.target.value.length)
        findButton.removeAttribute("disabled");
    }else{
        findButton.setAttribute("disabled", true);
    }

})

function findGithubUser() {    
    const form = document.getElementById("findUser");
    form.addEventListener("submit",async event=>{
        event.preventDefault();
        findButton.innerText="";
        findButton.insertAdjacentHTML("afterbegin",`<img src="../../assets/spinner.png" alt="loading" class="loading">`);
        const userName = form.elements[0].value;
        try {
            const response = await fetch(`https://api.github.com/users/${userName}`, {
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                }
            });
            if(response.status===200){            
                const userDaAPI = await response.json(); 
                const userJson = JSON.stringify(userDaAPI);
                let lastUsers = getLastUsers();                
                lastUsers.unshift(userJson);
                if(lastUsers.length>3){
                    lastUsers.pop();
                }
                const lastUsersJson = JSON.stringify(lastUsers);
                localStorage.setItem("lastUsers", lastUsersJson);
                localStorage.setItem("gitHubUser", userJson);   
                window.location.replace("/pages/profile/index.html");
            } else{
                document.getElementById("notFound").classList.remove("none");
                findButton.innerHTML = "";
                findButton.innerText = "Ver perfil do GitHub";
            }

        } catch(error) {
        document.getElementById("notFound").classList.remove("none");
        }});
}
findGithubUser();
    
