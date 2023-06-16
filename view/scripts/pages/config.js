const pictureWrapper = document.querySelector("#pictureWrapper")
const confirmBtn = document.querySelector("#confirmBtn")

var formData = null;
pictureWrapper.innerHTML = ''


function updateImg() {
    if (pictureWrapper.innerHTML == '') {
        pictureWrapper.innerHTML = `
            <label class="picture" for="pictureInput" tabIndex="0">
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

                formData = new FormData();
                formData.append('name', "inputNome.value");
                formData.append('file', file);


            } else {
                pictureImage.innerHTML = pictureImageTxt;
            }
        });
        console.log("input File: ")
        console.log(inputFile.value)


    } else {
        formData = null
        pictureWrapper.innerHTML = ''
    }

}

function confirm() {

    //VERIFICANDO SE EXISTE ALGUM UPLOAD DE IMAGENS
    if(formData != null){
        axios.post('http://localhost:4000/pictures', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
    }else{
        console.log("imagem não selecionada")
    }
}


confirmBtn.onclick = confirm
const alterImg = document.querySelector("#alterImg")
alterImg.onclick = updateImg

