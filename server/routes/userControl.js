const router = require('express').Router()
const bcrypt = require('bcrypt')

const { json } = require('express')
const Person = require('../model/db/User')

//POST
//Registrar
router.post('/auth/register/', async (req, res) => {
    const {username,email,password,confirmPassword} = req.body

    if(!username) {
        return res.status(201).json({error: 'Nome de usuário é obrigatório!'})
    } else if(!email) {
        return res.status(201).json({error: 'E-mail é obrigatório!'})
    }else if(!password) {
        return res.status(201).json({error: 'Senha é obrigatória!'})
    }

    if(password !== confirmPassword) {
        return res.status(201).json({error: 'Senhas não conferem!'})
    }

    //checar se existe usuario
    const userExist = await Person.findOne({email: email})

    if(userExist) {
        return res.status(201).json({error: 'E-mail já registrado!'})
    }

    //criar senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password,salt)

    //criar usuario
    const person = {
        username,
        email,
        password: passwordHash,
    }

    try {
        await Person.create(person)
        res.status(201).json({message: 'Pessoa inserida no sistema'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Login
router.post('/auth/login/', async (req, res) => {
    const {email, password} = req.body

    if(!email) {
        return res.status(201).json({error: 'E-mail é obrigatório!'})
    }else if(!password) {
        return res.status(201).json({error: 'Senha é obrigatória!'})
    }

    //checar usuario
    const user = await Person.findOne({email: email})

    if(!user) {
        return res.status(404).json({error: 'Usuário não encontrado!'})
    }

    //checar senha
    const checkPassowrd = await bcrypt.compare(password, user.password)

    if(!checkPassowrd) {
        return res.status(201).json({error: 'Senha inválida!'})
    } else{
        return res.status(200).json({message: 'Logou!'})
    }

    
})

//GET
router.get('/',async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})


router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id})

        if(!person) {
            res.status(422).json({message:'Usuário não encontrado!'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//PUT
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {username, email, password} = req.body
    
    const person = {
        username,
        email,
        password
    }

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)

        if(updatedPerson.matchedCount === 0) {
            res.status(422).json({message:'Usuário não encontrado!'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

//DELETE
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({_id: id})

        if(!person) {
            res.status(422).json({message:'Usuário não encontrado!'})
            return
        }

        try {
            await Person.deleteOne({_id: id})
            return res.status(200),json({message: 'Usuário removido com sucesso!'})

        } catch (error) {
            res.status(500).json({error: error})
        }
})

module.exports = router
