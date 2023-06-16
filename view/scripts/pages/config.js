const pictureWrapper = document.querySelector("#pictureWrapper")
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
                    console.log( img.src)
                    
                    img.classList.add("pictureImg");

                    pictureImage.innerHTML = "";
                    pictureImage.appendChild(img);
                });

                reader.readAsDataURL(file);
            } else {
                pictureImage.innerHTML = pictureImageTxt;
            }
        });

    } else {
        pictureWrapper.innerHTML = ''
    }

}

const alterImg = document.querySelector("#alterImg")
alterImg.onclick = updateImg

console.log(alterImg)

