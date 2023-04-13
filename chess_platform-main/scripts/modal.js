const openModal = document.querySelector("#open-modal")
const closeModal = document.querySelector("#close-modal")


const modal = document.querySelector("#modal")


const toggleModal = () => {
    modal.classList.toggle("hide")
}


[openModal, closeModal].forEach((el) =>{
    el.addEventListener("click", () => toggleModal())
})
