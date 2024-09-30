function click2() {
    const userName = document.getElementById("input-search").value;
    informacoes(userName);
    getUserRepositories(userName);
    
}
document.getElementById('input-search').addEventListener('keydown', function(event) {
    
    if (event.key === 'Enter') {
        const userName = document.getElementById("input-search").value;
        informacoes(userName);
        getUserRepositories(userName);
    }
});


async function informacoes(userName){
    // let repositorios = await repos(userName);
    let perfil = await getPerfil(userName);
    // const nomesRepositorios ={};
    if(perfil.message==="Not Found"){
        window.alert("Usuário Não Encontrador!")
        return
    }
    getEvents(userName)
    document.getElementById("outras").innerHTML=`
    <img src="${perfil.avatar_url}">
    <h2>Login: ${perfil.login}</h2>
    <h4>Nome: ${perfil.name ?? 'Não Possui Nome Cadastrado 😞😥'}<br>
    Bio: ${perfil.bio ?? 'Não Possui Bio Cadastrado 😞😥'}<br>
    Seguidores: ${perfil.followers}<br>
    Seguindo: ${perfil.following}</h4><br>
    `;
}

            async function getPerfil(userName){
            const perfil = await fetch(`https://api.github.com/users/${userName}`);
            return await perfil.json();
            }

            async function repos(userName){
            const reposLimit = 5;
            const repositorios = await fetch(`https://api.github.com/users/${userName}/repos?per_page=${reposLimit}`)
            return await repositorios.json();
             }

function getUserRepositories(userName){
    repos(userName).then(reposData => {
    let repositoriesItens = "";
    document.querySelector('.profile-data').innerHTML =``


    reposData.forEach(repo =>{
        repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}
        <div class="attributos-repositorios">
        <b>🍴${repo.forks_count}</b>
        <b>🌟${repo.stargazers_count}</b>
        <b>👁${repo.watchers_count}</b>
        <b>👨‍💻${repo.language ?? "😥"}</b>        
        </          \div>
        </a>
        </li>`
    })
    document.querySelector('.profile-data').innerHTML +=`
    <div class="repositories section">
    <h2>Repositórios</h2>
    <ul>${repositoriesItens}</ul>
    </div>
    `
    })
}

async function events(userName){
    const url = await fetch(`https://api.github.com/users/${userName}/events`)
    return await url.json();
}

async function getEvents(userName){
    document.querySelector('.events').innerHTML=` <h2>Eventos<br><br></h2>`

    events(userName).then(eventsData =>{
       eventsData.forEach(even =>{      
            document.querySelector('.events').innerHTML +=`
            ${even.repo.name}:  ${even.payload.commits[0].message} <br>`;

       })
    });
}
