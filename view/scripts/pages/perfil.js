const nickname = document.getElementById("nickname")
const ratingRapid = document.getElementById("ratingRapid")
const ratingBlitz = document.getElementById("ratingBlitz")
const ratingBullet = document.getElementById("ratingBullet")
const name = document.getElementById("name")
const status = document.getElementById("status")
const imgPerfil = document.getElementById("imgPerfil")



const tokenArmazenado = localStorage.getItem('auth_chess_user')
const idArmazenado = localStorage.getItem('id_user')
console.log("token:  "+ tokenArmazenado)
console.log("id: "+ idArmazenado)

const config = {
    headers: {
        Authorization: `Bearer ${tokenArmazenado}`
    }
};

console.log("id get axios picture: "+ idArmazenado)
axios.get('http://localhost:3000/pictures/'+idArmazenado)
.then(response =>{
    var imgSrc = response.data+''
    console.log("resposta imagem: "+imgSrc)
    imgPerfil.src = imgSrc;
})



axios.get('http://localhost:3000/users/'+idArmazenado, config)
.then(response =>{
    const user = response.data

    nickname.innerHTML = `<b>`+user.username+`</b>`
    ratingRapid.innerHTML = `Rapid <br/>`+user.ratingrapid
    ratingBlitz.innerHTML = `Blitz <br/>`+user.ratingblitz
    ratingBullet.innerHTML = `Bullet <br/>`+user.ratingbullet
    name.innerHTML =  `<p>`+user.name+`</p>`
    status.innerHTML = `<p>`+user.status+`</p>`

    
    

    console.log(user)
    
}).catch(e => {
    console.error(e)
})

