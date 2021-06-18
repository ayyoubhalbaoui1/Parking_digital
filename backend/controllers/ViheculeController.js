const db = require('../models')
const nodemailer = require('nodemailer')


const addVih = async (req, res) => {

    const {name,placeId,type} = req.body
    try {
      const data = await db.Vihecule.create({
          name,
          type,
          PlaceId:placeId
      })
    //const data = await db.Sequelize()
    res.json(data)
res.status(201).json(data)
    } catch (error) {
        res.json(error)
    }
}

// get all vihecules
const all = async (req, res) => {
    try {
        const vihs = await db.Vihecule.findAll()
        res.json(vihs)
    } catch (error) {
        res.json({message : message.error})
    }
}


const calc = async (req, res) => {

    const placeId = req.params.id
    console.log(placeId);
    db.Vihecule.findOne({where:{PlaceId: placeId}})
    .then(async findVihucule=>{
        let price=0 ;
        if(findVihucule){

            if(findVihucule.dataValues.type === 'bike') {
                price = 2
            }else{
                price = 5
            }
            await findVihucule.update({PlaceId:null})
            console.log(findVihucule.dataValues);
        res.json({findVihucule
            ,price
        })
        }
    })
    .catch(err =>console.log(err))
}

module.exports = {
    addVih,
    calc,
    all
}