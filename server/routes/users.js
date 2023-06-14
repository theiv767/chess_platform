const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('express')
const Person = require('../model/db/User')


//POST
//Registrar
router.post('/auth/register/', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body
    console.log(username)
    console.log(email)
    console.log(password)
    console.log(confirmPassword)

    if (!username) {
        res.status(201).json({ error: 'Nome de usuário é obrigatório!' })
        return
    } else if (!email) {
        res.status(201).json({ error: 'E-mail é obrigatório!' })
        return
    } else if (!password) {
        res.status(201).json({ error: 'Senha é obrigatória!' })
        return
    }

    if (password !== confirmPassword) {
        res.status(201).json({ error: 'Senhas não conferem!' })
        return
    }

    //checar se existe usuario
    const userExist = await Person.findOne({ email: email })

    if (userExist) {
        res.status(201).json({ error: 'E-mail já registrado!' })
        return
    }

    //criar senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //criar usuario
    const person = {
        username,
        email,
        password: passwordHash,
    }

    try {
        await Person.create(person)
        res.status(201).json({ message: 'Usuário registrado com sucesso' })

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//Login
router.post('/auth/login/', async (req, res, next) => {
    const { email, password } = req.body
    console.log(email)
    console.log(password)

    if (!email) {
        return res.status(201).json({ error: 'E-mail é obrigatório!' })
    } else if (!password) {
        return res.status(201).json({ error: 'Senha é obrigatória!' })
    }

    //checar usuario
    const user = await Person.findOne({ email: email })

    if (!user) {
        return res.status(201).json({ error: 'Usuário não encontrado!' })
    }

    //checar senha
    const checkPassowrd = await bcrypt.compare(password, user.password)

    if (!checkPassowrd) {
        return res.status(201).json({ error: 'Senha inválida!' })
    }


    try{
        const expiracao = '1h'
        const secret = process.env.SECRET
        const token = jwt.sign(
        {
            id: user._id
        }, secret)
        let id = user._id;
        return res.status(200).json(
        { 
            message: 'Login efetuado com sucesso', 
            id,
            token 
        })
    }catch(e){

    }
        // Logar ...
})

//GET
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})


// ROTA PRIVADA
router.get('/:id', checkToken ,async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id }, '-password')

        if (!person) {
            res.status(404).json({ error: 'Usuário não encontrado!' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        console.log(error)
        res.status(500).json({"error": "falha de servidor"})
    }
})


function checkToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        res.status(401).json({"error": "Acesso negado!"});
        return
    }

    try{
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()

    }catch(e){
        console.log(e)
        res.status(400).json({"error": "Token inválido!"})
    }
}


//PUT
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { username, email, password } = req.body

    const person = {
        username,
        email,
        password
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }

        res.status(200).json(person)

    } catch (error) {
        console.log(error)
        res.status(500).json({"error": "erro ainda não catalogado!"})
    }
})

//DELETE
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
    }

    try {
        await Person.deleteOne({ _id: id })
        return res.status(200), json({ message: 'Usuário removido com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router
