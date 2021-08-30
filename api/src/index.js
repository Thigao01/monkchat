import db from './db.js';
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json())

app.get('/chat/:nomeS', async (req, resp) =>{
    try {
        var id = await db.tb_sala.findOne({where :{nm_sala: req.params.nomeS}});
        let mensagens = await
            db.tb_chat.findAll({
                where:  {
                    id_sala : id.id_sala
                },
                include : ['tb_usuario', 'tb_sala'],

            });
         resp.send(mensagens) ;
    }catch(e){
        resp.send(e.toString())
    }

})
app.post('/chat', async (req, resp) => {
    var chat = req.body;
    console.log(chat);
    let sala = await db.tb_sala.findOne({where : {nm_sala: chat.sala.nome}});
    let usu = await db.tb_usuario.findOne({where : {nm_usuario: chat.usuario.nome}})
    console.log(sala);
    console.log(usu);
    let chatS = {
        id_sala : sala.id_sala,
        id_usuario : usu.id_usuario,
        ds_mensagem : chat.mensagem,
        dt_mensagem : new Date()

    }
    var r = await db.tb_chat.create(chatS);
    resp.send(r)
    
})
app.post('/usuario', async (req, resp) =>{
    let  confi = await db.tb_usuario.findOne({where: {nm_usuario: req.body.nome}});
    let  test = {
        nm_usuario : req.body.nome
    }
    if (confi === null) { 
        var foi = await db.tb_usuario.create(test);
        resp.send(foi);
    } else {
        resp.sendStatus(400);
        

    }
})

app.put('/usuario', async (req,resp) =>{
    var id = req.body.usuario;
    console.log(id);
    var r = await db.tb_usuario.update({nm_usuario:req.body.nome }, {where: {id_usuario: id}});
    resp.sendStatus(200);

})

app.delete('/usuario', async (req, resp) => {
    try{
        let id = req.body.id_usuario
        var r = await db.tb_usuario.destroy({where : {id_usuario : id}});
        resp.sendStatus(200);
    }catch(e){
        resp.send(e.toString());
    }
})

/*Sala*/

app.get('/sala/:idSala', async (req, resp) => {

    var x = await  db.tb_sala.findOne({where : {id_sala : req.params.idSala }});
    console.log(x);
    var test =  {
        id_sala : x.id_sala,
        nm_sala : x.nm_sala,
        bt_ativa : x.bt_ativa

    }
    resp.send(test);
})

app.post('/sala', async (req, resp) =>{
    let conf = await db.tb_sala.findOne({where : {nm_sala : req.body.nm_sala}});
    var sala = { 
        nm_sala : req.body.nm_sala,
        bt_ativa : req.body.bt_ativa
    }
    if(conf === null){
        let  neo = await db.tb_sala.create(sala);
        resp.send("ta enviando");

    }else{
        resp.sendStatus(400);
    }
})

app.put('/sala', async (req, resp ) => {
    var x = req.body.id_sala;
    var atu = await db.tb_sala.update({nm_sala: req.body.nome}, {where: {id_sala : x}});
    console.log(x);
    resp.send("foi");
})
 app.delete('/sala', async (req, resp) =>{
     var del = await db.tb_sala.destroy({where : {id_sala : req.body.id}});
     resp.sendStatus(200);

 })

app.listen(process.env.PORT, x => console.log(`serve up at port ${process.env.PORT}`))