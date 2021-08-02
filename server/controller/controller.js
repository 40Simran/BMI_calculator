var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    const heigh = req.body.height;
    const weigh = req.body.weight;
    const bmiS = weigh / (heigh * heigh);
    
// CONDITION FOR BMI
if (bmiS < 18.5) {
    res.send(req.body.name + "<h3>UnderWeight: " + bmiS +
             "<centre><h1>You Should eat more!");
} else if (18.5 <= bmiS && bmiS < 24.9) {
    res.send(req.body.name +"<h3>Normal: " + bmiS +
             "<centre><h1>Keep Doing What you are doing!");
} else if (25 <= bmiS && bmiS < 29.9) {
    res.send(req.body.name + "<h3>OverWeight: " + bmiS +
             "<centre><h1>You Should cut done little bit!");
} else {
    res.send(req.body.name + "<h3>Obese: " + bmiS +
             "<centre><h1>You should really do something with your ASAP!");
}


    // new user
    const user = new Userdb({
        name : req.body.name,
        height : req.body.height,
        weight: req.body.weight,
        bmi : bmiS
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}