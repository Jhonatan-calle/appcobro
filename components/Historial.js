import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Historial = ({ datos }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fecha préstamo: {datos.fecha}</Text>
      <Text style={styles.text}>Fecha pagado: {datos.fechaPagado}</Text>
      <Text style={styles.text}>Monto: ${datos.monto}</Text>
      <Text style={styles.statusText}>Estado: {datos.cancelado ? "Pagado" : "Adeudado"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  statusText: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#3498db",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
});

export default Historial;
