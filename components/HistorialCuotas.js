import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const HistorialCuotas = ({ datos, fDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Fecha: {datos.fecha} {"  "} Monto: ${datos.monto}
      </Text>
      <TouchableOpacity onPress={() => fDelete(datos._id)} style={styles.button}>
        <Feather name="x" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f5f5f5",
    marginVertical: 5,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
  button: {
    padding: 5,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
});

export default HistorialCuotas;
