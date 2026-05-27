import express from 'express'
import 'dotenv/config.js'
import warehouseRoutes from './routes/warehouse_Routes.js'
import cors from 'cors'

const app = express()

let corsOptions = {
  origin: process.env.ORIGIN
}

app.use(express.json())
app.use(cors(corsOptions))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

try {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening to port ${process.env.PORT || 3000}...`)
  })
} catch (error) {
  console.log(error)
}

app.use('/warehouse', warehouseRoutes)
