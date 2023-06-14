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

    console.log(response.data)
    
}).catch(e => {
    console.error(e)
})

