import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { ContainerConteudo } from './conteudo.styled'
import { ChatButton, ChatInput, ChatTextArea } from '../../components/outros/inputs'

import  Api from '../../sevices/api.js'
const api = new Api();

export default function Conteudo() {
    const [chat, setChat] = useState([]);
    console.log(chat);
    const [sala, setSala] = useState('');
    const [usuario, setUsuario] = useState('');
    const [mensagem, setMensagem] = useState('');
    
    const atualizar = async () =>{
        const mensagens = await api.listaMensagens(sala);
        console.log(mensagens);
        setChat(mensagens)
        
    }
    const enviarMsg = async () => {
        const r = await api.inserirMensagens(sala , usuario, mensagem);
        console.log(r);
        alert('Foi!!')
        await atualizar();
    }

    const criaUsu = async () => {
        const r = await api.inserirUsuario(usuario);
        console.log(r);
        console.log('tamo aqui');
        alert('foi inserido ??')
    }
 
    return (
        <ContainerConteudo>
                    <div className="container-form">
                        <div className="box-sala">
                            <div>
                                <div className="label">Sala</div>
                                <ChatInput value={sala} onChange={e => setSala(e.target.value)} />
                            </div>
                            <div>
                                <div className="label">Nick</div>
                                <ChatInput value={usuario} onChange={e => setUsuario(e.target.value)} />
                            </div>
                            <div>
                                <ChatButton > Criar </ChatButton>
                                <ChatButton className="entrar" onClick={criaUsu} > Entrar </ChatButton>
                            </div>
                        </div>
                        <div className="box-mensagem">
                            <div className="label">Mensagem</div>
                            <ChatTextArea value={mensagem} onChange={e => setMensagem(e.target.value)} />
                            <ChatButton className="btn-enviar" onClick={enviarMsg}> Enviar </ChatButton>
                        </div>
                    </div>
                    
                    <div className="container-chat">
                        <img onClick={atualizar } className="chat-atualizar"  src="/assets/images/atualizar.png" alt="" />
                        <div className="chat">
                        {chat.map(x =>                         
                                <div className="chat-message">
                                    <div>({new Date(x.dt_mensagem.replace('Z', '')).toLocaleTimeString()})</div>
                                    <div><b>{x.tb_usuario.nm_usuario}</b> fala para <b>Todos</b>:</div>
                                    <div> {x.ds_mensagem}</div>
                                </div>                    
                            )}
                            
                        </div>
                    </div>
        </ContainerConteudo>
    )
}