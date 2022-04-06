import React, {useState} from "react"; 

import {
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList, 
    Pressable, 
    Modal
} from 'react-native'; 

import { AntDesign, EvilIcons } from '@expo/vector-icons'; //importando ícone


export default function Home(){
    let[idTarefaEditada, setidTarefaEditada] = useState('');
    let[TarefaEdit, setTarefaEdit] = useState('');
    let[tarefa, setTarefa] = useState('');
    let[abrirModal, setabrirModal] = useState('');
    let [Tarefas, setTarefas] = useState ([ 
        {
        id: '0',
        nome: 'Bem vindo!'
         },
       
         ])

    //Adiciona uma nova tarefa
    function adicionaTarefa(){

        if(tarefa.trim() != ''){
            const dados = {   //Criando objeto no Js
                id: String(new Date().getTime()),  //
                nome: tarefa,
            };

            //alert("clicou");
            setTarefas((oldState) => [... oldState, dados]); //arrow function, "..." pega o que tem dentro de array e junta tudo, nesse caso está pegando tudo que já tem e acrescenta o dados
            setTarefa('');
        }
        else{
            alert('Digite uma tarefa')
        }
    }

    //Deleta uma tarefa
    function deletarTarefa(index){
        
        let novasTarefas = [...Tarefas]; //criando um novo array

        novasTarefas = novasTarefas.filter((item)=>{ //vai filtrar itens do array 
            if(item.id != index) {
                return true;
            }
            else{
                return false;
            }
        });
        setTarefas(novasTarefas);
    }

    //busca a tarefa
    function buscarTarefa(id){
        let novasTarefas = [...Tarefas]; //criando um novo array

        novasTarefas = novasTarefas.filter((item)=>{ //vai filtrar itens do array 
            if(item.id != id) {
                return true;
            }
            else{
                setidTarefaEditada(id);
                setTarefaEdit(item.nome)
                return true;
            }
        });
        setTarefas(novasTarefas);
        setabrirModal(true);
    }

    //Edita tarefas
    function editarTarefa(){
        if(TarefaEdit.trim() != ''){
            let novasTarefas = [...Tarefas];
            novasTarefas = novasTarefas.filter((item)=>{
            if(item.id == idTarefaEditada){
                    item.nome = TarefaEdit;

                return true;
            }else{
                return true;
                }
        })

        setTarefas(novasTarefas);

        }else{
               alert('Digite um nome de uma tarefa')
           }

    }
   

    return(

        <View style ={styles.container}>
           <Modal 
           animationType="slide"
            transparent={true}
            visible={abrirModal}
            >
                <View style={styles.telaEdit}>
                    <TouchableOpacity //Botão Apagar
                                style={styles.botaoexcluir}
                                onPress={()=>setabrirModal(false)}>
                                <EvilIcons name='close' size={24} color="black"/>
                    </TouchableOpacity>
        
                    <Text style={styles.subtitulo}> Editar Tarefa </Text>
                    <TextInput value={TarefaEdit}
                        returnKeyType="done"
                        style={styles.campo}
                        onChangeText={setTarefaEdit}
                        placeholder="Digite a nova tarefa"
                    />
                    <TouchableOpacity style={styles.botao} onPress={() => editarTarefa()}>
                        <Text style={styles.textoBotao}>Alterar tarefa</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Text style={styles.titulo}>Lista de Tarefas</Text>
            
            <View style ={styles.adicionarTarefa}>
                <TextInput value={tarefa} 
                            returnKeyType="done" //mudar oq aparece no botão de concluído 
                            style={styles.campo} 
                            onChangeText={setTarefa}                                                                         
                        placeholder="Digite uma tarefa" //PLACEHOLDER é um texto de rótulo para o componente InputText
                />

                <TouchableOpacity style={styles.botao} onPress={adicionaTarefa}>
                    <Text style={styles.textoBotao}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subtitulo}>Minhas tarefas</Text>

            <View style={styles.lista}>
                <FlatList //Lista
                    data={Tarefas}
                    keyExtractor={(item) => item.id} //Achar o item pelo id
                    renderItem={(({item}) => //Arrow Function   
                        <View style={styles.tarefaUnidade}>
                            <View style={styles.icones}> 
                                <Text style={styles.textoTarefa}>{item.nome}</Text>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Pressable //Botão Editar
                                        //style={styles.botaoedit}
                                        onPress={()=> buscarTarefa(item.id)}>
                                        <AntDesign name="edit" size={24} color="white"/>
                                    </Pressable>

                                    <TouchableOpacity //Botão Excluir
                                        //style={}
                                        onPress={()=>deletarTarefa(item.id)}>
                                        <AntDesign name="delete" size={24} color="white"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>       
                    
                    )}
                //Fim do FlatList
                />   

            </View>

        </View>
    )

        }

const styles = StyleSheet.create({      //O style deve ficar fora da função home               

    container:{                 
        flex:1,               
        backgroundColor: '#F0F8FF',                                      
        paddingVertical: 50,
        paddingHorizontal: 20, 
    },   
    
    adicionarTarefa:{
        backgroundColor: '#87CEEB',
       // alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20, 
        borderRadius: 7,
    },

    lista: {
        backgroundColor: '#ADD8E6',
        paddingVertical: 30,
        paddingHorizontal: 15,
        borderRadius: 8,
    },

    telaEdit:{
        height: 230,
        width: 230,
        backgroundColor: 'white',
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 200,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: 'black',
    },
                                                                 
    titulo:{                
        color: 'black', //cor                                            
        fontSize: 24,  //tamanho da fonte           
        fontWeight: 'bold', //peso da fonte          
        marginBottom: 20, //  
        marginLeft: 'auto',
        marginRight: 'auto',     
        },                                  

    subtitulo:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 15,
        marginLeft: 'auto',
        marginRight: 'auto'  
    },

    icones:{
        flexDirection: 'row',
        display: 'flex',
        alignSelf: 'stretch',
        width:'100%',
        justifyContent: 'space-between',
     },

    campo:{
        backgroundColor: 'white', //Cor de fundo
        color: '#black',  //cor da fonte
        fontSize: 18,   
        margin: 'center',
        borderRadius: 7,
        padding: 15
    },

    botao:{
        backgroundColor: '#00BFFF',
        padding: 10, 
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 20,
        margin: 'center',   
    },

    tarefaUnidade:{
        backgroundColor: 'black',
        padding: 15, //distância do espaçamento de dentro 
        marginBottom: 10,
        borderRadius: 8,
        flexDirection:'row', 
        alignSelf:'stretch',
    },

    textoTarefa:{
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        width:170
    },

    textoBotao:{
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold'
    },

    botaoexcluir:{
        display: 'flex', 
        marginLeft: 178,
    }

});