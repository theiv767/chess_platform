const tokenArmazenado = localStorage.getItem('auth_chess_user')
const idArmazenado = localStorage.getItem('id_user')
console.log("token:  "+ tokenArmazenado)
console.log("id: "+ idArmazenado)

const config = {
    headers: {
        Authorization: `Bearer ${tokenArmazenado}`
    }
};

axios.get('http://localhost:3000/users/'+idArmazenado, config)
.then(response =>{
    const nickname = document.getElementById("nickname")
    const ratingRapid = document.getElementById("ratingRapid")
    const ratingBlitz = document.getElementById("ratingBlitz")
    const ratingBullet = document.getElementById("ratingBullet")

    const user = response.data

    nickname.innerHTML = `<b>`+user.username+`</b>`
    ratingRapid.innerHTML = `Rapid <br/>`+user.ratingrapid
    ratingBlitz.innerHTML = `Blitz <br/>`+user.ratingblitz
    ratingBullet.innerHTML = `Bullet <br/>`+user.ratingbullet
    console.log(user)
    
}).catch(e => {
    console.error(e)
})

