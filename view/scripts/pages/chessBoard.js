const tokenArmazenado = localStorage.getItem('auth_chess_user')
const idArmazenado = localStorage.getItem('id_user')

const config = {
    headers: {
        Authorization: `Bearer ${tokenArmazenado}`
    }
};

axios.get('http://localhost:3000/users/'+idArmazenado, config)
.then(response =>{
    const nickname = document.getElementById("username-jogador")
    
    console.log(nickname)
    const user = response.data

    nickname.innerHTML = `<b>`+response.data.username+`</b>`

    console.log(user)
    
}).catch(e => {
    console.error(e)
})
