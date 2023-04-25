const { Router } = require('express')
const Crud = require('../../models/Crud')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const crudList = await Crud.find()
        if (!crudList) throw new Error('No Crud List found')
        res.status(200).json(crudList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newCrud = new Crud(req.body)
    try {
        const crud = await newCrud.save()
        if (!crud) throw new Error('Something went wrong saving the Crud')
        res.status(200).json(crud)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Crud.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const crud = await Crud.findById(id)
      if (!crud) throw new Error('No Crud found')
      res.status(200).json(crud)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
  
  
  router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { event, description, startDate, endDate} = req.body; 
    try {
      const crud = await Crud.findById(id);
      if (!crud) throw new Error('No Crud found');
  
      crud.events.push({ event, description, startDate, endDate }); 
      const updatedCrud = await crud.save();
  
      res.status(200).json(updatedCrud);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


module.exports = router