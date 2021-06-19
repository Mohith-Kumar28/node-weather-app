const path=require('path') 
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app =express()
const port=process.env.PORT||3000
// const dir= path.join(__dirname,'../public')
// const aboutdir= path.join(__dirname,'../public')
const viewpath= path.join(__dirname,'../templates/views')
const partialpath= path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)
// app.use(express.static(dir))
// app.use(express.static(aboutdir))

// app.get('/help',(req,res)=>{
//         res.render('help',{
//             name:'mohith',
//             help:'hello',
//         })
//     })
// app.get('/index',(req,res)=>{
//         res.render('help',{
//             name:'mohith',
//         })
//     })



    app.get('/weather',(req,res)=>{
        const add=req.query.place
        if(!req.query.place){
            res.send('please enter a correct name')
            
        }
       
          geocode(add, (error,{latitude,longitude,location})=> {
            if (error) {
                return res.send({error})
            }

            forecast(latitude,longitude,(error,forcdata)=>{
                if (error) {
                    return res.send({error})
                }

                res.send({
                location,
                latitude,
                longitude,
                weather_report:forcdata,
                })
            })
          })
         
        })



    // app.get('/help/*',(req,res)=>{
    //     res.send('this is an wrong hheellpp  errrror')
    // })
    
    // app.get('*',(req,res)=>{
    //         res.render('404')
    //     })



// app.get('',(req,res)=>{
//     res.send('hello world')
// })
// app.get('/contact',(req,res)=>{
//     res.send('hello contact')
// })
// app.get('/help',(req,res)=>{
//     res.send('hello helo')
// })

app.listen(port,()=>{
    console.log('started at port '+port)
})