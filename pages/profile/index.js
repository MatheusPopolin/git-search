function createHeader(user){
    const {name, avatar_url, bio, email} = user
    const body = document.querySelector("body");
    body.insertAdjacentHTML("afterbegin",`
        <header>
            <div class="user_card">
                <img src="${avatar_url}" alt="">
                <div>
                <h2 class="title_4">${name}</h2>
                <h3 class="title_2 color_grey_5">${bio}</h3>
                </div>
            </div>
            <div class="menu">
                <a href="mailto:${email}" class="button_default title_5" target="blank">Email</a>
                <a href="/pages/home/" class="button_default title_5">Trocar de Usuário</a>
            </div>
        </header>`);
    return body;
}

function createRepositoryCard(repo){
    const {name, description, html_url, homepage} = repo;
    const repositoryList = document.getElementById("repositoryList");
    repositoryList.insertAdjacentHTML("beforeend",`
        <li class="repository_card">
            <h2 class="title_3">${name}</h2>
            <p class="color_grey_5 text_3">${description}</p>
            <div>
                <a href="${html_url}" class="button_small text_2" target="blank">Repositório</a>
                <a href="${homepage}" class="button_small text_2" target="blank">Demo</a> 
            </div>
        </li>`);
    return repositoryList;  
}

async function render(){
    const userJson = localStorage.getItem("gitHubUser");
    const user = JSON.parse(userJson);
    createHeader(user);
    const repos = await findUserRepos(user.login);
    repos.forEach(repo=>createRepositoryCard(repo));
}
render();



       



