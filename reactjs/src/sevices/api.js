import axios from 'axios'

const api =  axios.create({
    baseURL: 'http://localhost:3030'
})

export default class Api {

    async listaMensagens(NmSala) {
        var r = await api.get(`/chat/${NmSala}`);   
        return r.data;
    }

    async inserirMensagens(nomeSala, nomeUsuario, mensagem){
        var chat = {
            sala : {nome : nomeSala },
            usuario : {nome : nomeUsuario},
            mensagem : mensagem
        }
        let r =  await api.post('/chat', chat);
        return r.data;
    }
    async inserirUsuario(nomeUsuario){
        var usuario = { 
            nm_usuario : {nome : nomeUsuario},
                    }
        var test = await api.post(`/usuario`, usuario);
        return test.data;

    }
}