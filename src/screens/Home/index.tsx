import {Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { Participant } from "../../components/Participant";

import { styles } from "./styles";

export default function Home(){
  const participants = ['Isabela', 'Ingrid', 'Sylvia', 'Steice', 'Tayná', 'Tomás', 'Janaína', 'Edelvira', 'Afonso', 'Ana Raquel', 'Liah', 'Natty']


  function handleParticipantAdd(){
    if(participants.includes("Isabela")){
      return Alert.alert("Participante Existe", "Já existe um participante na lista com este nome")
    } 

    console.log("Você clicou no botão adicionar")
  }

  function handleParticipantRemove(name: string){
    Alert.alert('Remover', `Deseja realmente remover participante ${name}? 🤔`, [
      {
        text: 'Sim',
        onPress: () => Alert.alert("❌ Deletado com Sucesso!")
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])

    console.log(`Você clicou no botão para remover o nome ${name}`)
  }

  return(
    <View style={styles.container}>
    <Text style={styles.eventName}>Nome do evento</Text>
     <Text style={styles.eventDate}>
      Domingo, 12 de fevereiro de 2023
     </Text>

  <View style={styles.form}>
     <TextInput
      style={styles.input}
      placeholder="Nome do participante"
      placeholderTextColor='#6b6b6b'
     />

     <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
      <Text style={styles.buttonText}>
       +
      </Text>
     </TouchableOpacity>
    </View>

    <FlatList
      data={participants}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <Participant 
        key={item}
        name={item}
        onRemove={() => handleParticipantRemove(item)}
        />  
      )}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <Text style={styles.listEmptyText}>
          Ninguém chegou no evento ainda? Adicione participantes à sua lista de presença.
        </Text>
      )}
     /> 
  </View>
  )
}
