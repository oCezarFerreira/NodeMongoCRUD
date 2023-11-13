const router = require('express').Router()

const Person = require('../models/Person')

// CREATE - Criação de dados
router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body

  const person = {
    name,
    salary,
    approved
  }

  if (!name) {
    res.status(422).json({ error: 'O nome é obrigatótio!' })
    return
  }

  try {
    await Person.create(person)

    res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
  } catch (error) {
    res.status(500).json(error)
  }
})

// READ - Leitura de dados
router.get('/', async (req, res) => {
  try {
    const people = await Person.find()

    res.status(200).json({ people })
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const person = await Person.findOne({ _id: id })

    if (!person) {
      res.status(422).json({ message: 'O usuário não foi encontrado!' })
      return
    }

    res.status(200).json({ person })
  } catch (error) {
    res.status(500).json({ error })
  }
})

// UPDATE - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {
  const personId = req.params.id
  const { name, salary, approved } = req.body
  const person = {
    name,
    salary,
    approved
  }

  if (!person) {
    res.status(422).json({ message: 'O usuário não foi encontrado!' })
    return
  }

  try {
    const updatedPerson = await Person.updateOne({ _id: personId }, person)

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: 'O usuário não foi encontrado!' })
      return
    }

    res.status(200).json({ person })
  } catch (error) {
    res.status(500).json({ error })
  }
})

// DELETE - Deletar dados
router.delete('/:id', async (req, res) => {
  const personId = req.params.id

  try {
    await Person.deleteOne({ _id: personId })

    res.status(200).json({ message: 'Usuário deletado com sucesso!' })
  } catch (error) {
    res.status(422).json({ message: 'O usuário não foi encontrado!' })
  }
})

module.exports = router
