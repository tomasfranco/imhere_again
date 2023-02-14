import { useState } from "react";
import {Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { Participant } from "../../components/Participant";

import { styles } from "./styles";

export default function Home(){
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd(){
    if(participants.includes(participantName)){
      return Alert.alert("Participante Existe", "Já existe um participante na lista com este nome")
    } 

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: string){
    Alert.alert('Remover', `Deseja realmente remover participante ${name}? 🤔`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])   
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
      onChangeText={text => setParticipantName(text)}
      value={participantName}
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
