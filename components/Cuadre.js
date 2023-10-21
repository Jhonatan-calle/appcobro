import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Cuadre = ({ cuadre }) => {
    const date = new Date(cuadre.fechaInicio);
    const fechaInicio = `${date.getUTCDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    if(cuadre.fechaFin !== ""){
        const endDate = new Date(cuadre.fechaFin)
        cuadre.fechaFin = `${endDate.getUTCDate()}/${endDate.getMonth()}/${endDate.getFullYear()}`
    }
    //estos son los log que no coinciden con lo que deberian
    
  return (
    <View style={styles.card}>
      <Text>Fecha de Inicio: {fechaInicio}</Text>
      <Text>Fecha de Fin: {cuadre.fechaFin}</Text>
      <Text>Prestado: {cuadre.prestado}</Text>
      <Text>Adeudado: {cuadre.adeudado}</Text>
      <Text>Cobrado: {cuadre.cobrado}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
  },
});
export default Cuadre;