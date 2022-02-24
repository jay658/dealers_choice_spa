const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_spa_db')
const express = require('express')
const app = express()
const path = require('path')

const Food = db.define('food',{
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    }
})

app.use(express.json())

app.use('/src', express.static(path.join(__dirname, 'src')))

app.get('/', (req, res)=>res.sendFile(path.join(__dirname, 'index.html')))

app.delete('/api/foods/:id', async(req, res, next)=>{
    try{
        const food = await Food.findByPk(req.params.id)
        await food.destroy()
        res.sendStatus(204)
    }catch(ex){
        next(ex)
    }
})

app.post('/api/foods', async(req, res, next)=>{
    try{
        const food = await Food.create(req.body)
        res.send(food)
    }catch(ex){
        next(ex)
    }
})

app.get('/api/foods',async(req, res, next)=>{
    try{
        res.send(await Food.findAll())
    }catch(ex){
        next(ex)
    }
})

const setUp = async(req, res, next)=>{
    try{
        await Food.sync({force:true})
        await Food.create({name:'salad'})
        await Food.create({name:'steak'})
        await Food.create({name:'noodles'})
        await Food.create({name:'hamburger'})
        const port = process.env.PORT || 3000
        app.listen(port, ()=>console.log(`listening on port ${port}`))
    }catch(ex){
        console.log(ex)
    }
}

setUp()