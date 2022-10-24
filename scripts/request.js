async function findUserRepos(user) {
    try {
        const response = await fetch(`https://api.github.com/users/${user}/repos`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        });
        const reposDaAPI = response.json();  
        return reposDaAPI;
    } catch(error) {
        console.log(error);
    }
}