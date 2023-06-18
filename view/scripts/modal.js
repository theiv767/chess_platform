function animateScrollToTop(duration) {
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    function scrollStep(timestamp) {
        const currentTime = timestamp || new Date().getTime();
        const elapsed = currentTime - startTime;
        const scrollAmount = Math.max(start - (elapsed / duration * start), 0);

        window.scrollTo(0, scrollAmount);

        if (elapsed < duration) {
            window.requestAnimationFrame(scrollStep);
        }
    }

    window.requestAnimationFrame(scrollStep);
}

function logOut() {
    localStorage.clear()
    console.log("deslogado")

}



const modal = document.getElementById('janela-modal')
const modalRegister = document.getElementById('janela-modal-registro')
modal.classList.add('fechar')
modalRegister.classList.add('fechar')

function abrirModal() {
    modal.classList.replace('fechar', 'abrir')
}

function logar() {
    modal.classList.replace('abrir', 'fechar')
    console.log('loguei')
    let inputUserName = document.getElementById("UsernameLogin")
    let inputPassword = document.getElementById("PasswordLogin")
    let alert = document.getElementById("msgLog")

    let user = {
        email: inputUserName.value,
        password: inputPassword.value
    }

    // LOGIN ============================
    axios.post('http://localhost:3000/users/auth/login/', user)
        .then(response => {
            console.log("msg: " + response.data.message)

            
            if (response.data.message) {
                localStorage.setItem('auth_chess_user', response.data.token);
                localStorage.setItem('id_user', response.data.id)
                let perfilBtn = document.getElementById("perfilDropdown")
                let linkPerfil = document.getElementById("perfil-link").href = 'perfil'
                let linkChessBoard = document.getElementById("chessBoard-link").href = 'jogar'
                let linkConfig = document.getElementById("config-link").href = 'config'
                perfilBtn.innerHTML = `
                    <button style="background-color: var(--bg-nav-dark); border: 0px;" class="btn btn-secondary dropdown-toggle"
                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img id="navPerfil" src="../assets/img/perfil/perfil.jpg" class="rounded-circle" height="25" alt="Avatar" loading="lazy" />
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item link-navigation" href="perfil">Perfil</a></li>
                        <li><a class="dropdown-item link-navigation" href="config">Configurações</a></li>
                        <li id="liLogout" style="padding-right: 2px; padding-left: 2px;">
                        <a id="logout" class="dropdown-item" href="/" style="background-color: rgba(255, 74, 74, 0.199);">
                            <i class="fa-solid fa-arrow-right-from-bracket"></i></i> Sair
                        </a>
                        </li>
                    </ul>
                    `
                    var navPerfil = document.getElementById("navPerfil")

                    axios.get('http://localhost:3000/pictures/'+localStorage.getItem('id_user'))
                      .then(response =>{
                          var imgSrc = response.data+''
                          console.log("resposta imagem: "+imgSrc)
                          console.log(navPerfil)
                          navPerfil.src = imgSrc;
                      })
                let btnLogout = document.getElementById("logout")
                if (btnLogout) {
                    btnLogout.onclick = logOut
                }
                alert.innerHTML = `
                <div class="alert alert-success d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                    </svg>
                    <div>
                        `+ response.data.message + `
                    </div>  
                </div>`



            } else {
                alert.innerHTML = `
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div>`+ response.data.error + `
                    </div>
                </div>
                `

            }
            animateScrollToTop(500);

        })
        .catch(error => {
            console.error('Erro:', error);
            alert.innerHTML = `
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div>`+ error + `
                    </div>
                </div>
                 `
            animateScrollToTop(500);
        });

}

function registrar() {
    modalRegister.classList.replace('abrir', 'fechar')

    let inputUserName = document.getElementById("UsernameRegister")
    let inputEmail = document.getElementById("EmailRegister")
    let inputPassword = document.getElementById("PasswordRegister")
    let inputConfirmPassword = document.getElementById("ConfirmPasswordRegister")
    let alert = document.getElementById("msgLog")

    let user = {
        username: inputUserName.value,
        email: inputEmail.value,
        password: inputPassword.value,
        confirmPassword: inputConfirmPassword.value
    }

    axios.post('http://localhost:3000/users/auth/register/', user)
        .then(response => {
            console.log(response.data.message)
            console.log(alert)
            if (response.data.message) {
                alert.innerHTML = `
                <div class="alert alert-success d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                    </svg>
                    <div>
                        `+ response.data.message + `
                    </div>  
                </div>`
            } else {
                alert.innerHTML = `
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div>`+ response.data.error + `
                    </div>
                </div>
                `
            }
            animateScrollToTop(500);

        })
        .catch(error => {
            console.error('Erro:', error);
            alert.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <div>`+ error + `
                </div>
            </div>
            `
            animateScrollToTop(1);
        });
}


function registroModal() {
    modal.classList.replace('abrir', 'fechar')
    modalRegister.classList.replace('fechar', 'abrir')

    console.log('fui pro registro')

}
function loginModal() {
    modalRegister.classList.replace('abrir', 'fechar')
    modal.classList.replace('fechar', 'abrir')

    console.log('fui pro login')
}

