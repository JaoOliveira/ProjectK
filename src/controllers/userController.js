const User = require('../database/models/userModel.js');
const { Op } = require("sequelize");
const yup = require('yup');


const schemaCreateAccount = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required().min(8),
    email: yup.string().email().required(),
});

const schemaEnterAccount = yup.object().shape({
    email: yup.string().required().email(),
    password:yup.string().min(8).required(),
})
const schemaeditAccount = yup.object().shape({
    id: yup.number().required(),
    username: yup.string(),
    password: yup.string().min(8),
    email: yup.string().email().required(),
})



module.exports = {
    async createAccount(req, res){
        if(!(await schemaCreateAccount.isValid(req.body))) {
            return res.status(404).send("Dados Inválidos");
        }
        const resQuery = await User.findOne({
            where:{
                [Op.or]:[
                    {email:req.body.email},
                    {username:req.body.username}
                ]
            }
        })
        if(resQuery == null){
            await User.create(req.body);
            return res.send("Ok");
        }
        return res.send("Usuario ja cadastrado");
    },
    async enterAccount (req, res){
        if(await schemaEnterAccount.isValid((req.body))){
            const { email, password } = req.body;
            const resQuery = await User.findOne({where:{email,password}})
            if(resQuery == null) return res.send('Usuario não encontrado');   
            return res.send("Bem vindo ao ...");
  
        } 
        return res.status(404).send('Dados invalidos ');
    },
    async editAccount (req,res){
        if(!(await schemaeditAccount.isValid(req.body))){
            return res.send(" Dado invalido ")
        }else {
            const { email, password, username, id } = req.body;
            const resQuery = await User.findOne({where:{id}})
            if(resQuery){
                await resQuery.update({email: email , password: password, username: username});
                await resQuery.save()

                return res.send("ok");
            } 
            return res.send(" usuario nao cadastrado ");
      }
    },
    async deleteAccount (req,res){
        const {id} = req.body;
        const resQuery = await User.findOne({where:{id}})
        if(!resQuery) return res.send(" usuario nao encontrado");

        await resQuery.destroy();
        res.send('Usuario deletado');
    }
};

