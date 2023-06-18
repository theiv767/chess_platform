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



const pictureWrapper = document.querySelector("#pictureWrapper")
const confirmBtn = document.querySelector("#confirmBtn")

const tokenArmazenado = localStorage.getItem('auth_chess_user')
const idArmazenado = localStorage.getItem('id_user')
const alertDiv = document.getElementById("msgLog")


var user = null;
var formData = null;
pictureWrapper.innerHTML = ''


function updateImg() {
    if (pictureWrapper.innerHTML == '') {
        pictureWrapper.innerHTML = `
            <label class="picture mt-2" for="pictureInput" tabIndex="0">
                <span class="pictureImg"></span>
            </label>
            <input type="file" name="pictureInput" id="pictureInput">
            `

        // tratando imagem =============
        const inputFile = document.querySelector("#pictureInput");
        const pictureImage = document.querySelector(".pictureImg");
        const pictureImageTxt = "Choose an image";
        pictureImage.innerHTML = pictureImageTxt;

        inputFile.addEventListener("change", function (e) {
            const inputTarget = e.target;
            const file = inputTarget.files[0];

            if (file) {
                const reader = new FileReader();

                reader.addEventListener("load", function (e) {
                    const readerTarget = e.target;
                    const img = document.createElement("img");
                    img.src = readerTarget.result;

                    img.classList.add("pictureImg");

                    pictureImage.innerHTML = "";
                    pictureImage.appendChild(img);
                });

                reader.readAsDataURL(file);

                console.log("email: " + user.email)
                formData = new FormData();
                formData.append('name', user.username+"");
                formData.append('file', file);
                formData.append('userId', idArmazenado)


            } else {
                pictureImage.innerHTML = pictureImageTxt;
            }
        });


    } else {
        formData = null
        pictureWrapper.innerHTML = ''
    }

}

function confirm() {

    let modify = false
    const usernameTitle = document.querySelector("#usernameTitle")
    const inputEmail = document.querySelector("#inputEmail")
    const inputPassword = document.querySelector("#inputPassword")
    const inputConfirmPassword = document.querySelector("#inputConfirmPassword")
    const inputName = document.querySelector("#inputName")
    const inputStatus = document.querySelector("#inputStatus")

    if((inputName.value != user.name) && inputName.value != ""){
        user.name = inputName.value
        modify = true

    }

    if((inputStatus.value != user.status) && inputStatus.value != ""){
        user.status = inputStatus.value        
        modify = true

    }

    if((inputPassword.value != user.password) && inputPassword.value != ""){
        if(inputPassword.value == inputConfirmPassword.value){
            user.password = inputPassword.value
            modify = true

        }else{
            console.log("as senhas não conferem")
            alertDiv.innerHTML = `
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div>`+ "As senhas não conferem !" + `
                    </div>
                </div>
                `
                animateScrollToTop(500);
                return;
        }
    }

    if((inputEmail.value != user.email) && inputEmail.value != ""){
        user.email = inputEmail.value
        modify = true

    }

    console.log(user)

    if(formData != null){
        modify = true
        axios.post('http://localhost:3000/pictures', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
    }else{
        console.log("imagem não selecionada")
    }

    if(modify){
        axios.patch('http://localhost:3000/users/'+idArmazenado, user)
        .then(response =>{
            console.log(response.data)
            alertDiv.innerHTML = `
                <div class="alert alert-success d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                    </svg>
                    <div>
                        `+ "alterações confirmadas com sucesso !" + `
                    </div>  
                </div>`

        }).catch(e => {
            console.error(e)
            alertDiv.innerHTML = `
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div>`+ "erro encontrado !" + `
                    </div>
                </div>
                `
        })

    }else{
        console.log("nenhuma alteração observada")
        alertDiv.innerHTML = `
                <div class="alert alert-warning d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    <div>`+
                        "Nenhuma alteração confirmada !"
                    +`</div>
                </div>
                `

    }

    animateScrollToTop(500);

    
}


// ===== execução ====================================================================================
confirmBtn.onclick = confirm
const alterImg = document.querySelector("#alterImg")
alterImg.onclick = updateImg


// ========--------------------------------------

const config = {
    headers: {
        Authorization: `Bearer ${tokenArmazenado}`
    }
};

axios.get('http://localhost:3000/users/'+idArmazenado, config)
.then(response =>{
    user = response.data
    const usernameTitle = document.querySelector("#usernameTitle")
    const inputEmail = document.querySelector("#inputEmail")
    const inputName = document.querySelector("#inputName")
    const inputStatus = document.querySelector("#inputStatus")

    usernameTitle.innerHTML = user.username
    inputEmail.value = user.email
    inputName.value = user.name
    inputStatus.value = user.status

    console.log(user)
    
}).catch(e => {
    console.error(e)
})

