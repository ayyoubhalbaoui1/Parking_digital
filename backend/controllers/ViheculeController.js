const db = require('../models')

const addVih = async (req, res) => {

    const {name,placeId,type} = req.body
    try {
      const data=  await db.Vihecule.create({
          name,
          type,
          PlaceId:placeId
      })
    // const data = await db.Sequelize()
      console.log(data)
res.status(201).json(data)
    } catch (error) {
        res.json(error)
    }
}

const calc = async (req, res) => {

    const placeId = req.params.id
    console.log(placeId);
    db.Vihecule.findOne({where:{PlaceId: placeId}})
    .then(async findVihucule=>{
        let price=0 ;
        if(findVihucule){

            if(findVihucule.dataValues.type === 'bike'){
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
    calc
}