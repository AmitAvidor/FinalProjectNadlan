const app = require('./app')

app.listen(1000, ()=>{
    console.log('running')
})

app.get('', (req ,res)=>{
    res.json('running!!!!!')
})