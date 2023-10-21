import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const FormPerfil = ({ addperfil }) => {
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");

  const handleFormSubmit = () => {
    if (!nombre || !direccion || !celular || !dni) {
      alert("Por favor complete todos los datos");
      return;
    }

    // Llamar a la función addperfil con los datos ingresados
    addperfil(nombre, dni, direccion, celular);

    // Limpiar los campos del formulario
    setNombre("");
    setDni("");
    setDireccion("");
    setCelular("");
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <Text>Nombre:</Text>
        <TextInput
          style={styles.input}
          type="text"
          value={nombre}
          onChangeText={(value) => setNombre(value)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>DNI:</Text>
        <TextInput
          style={styles.input}
          type="number"
          value={dni}
          onChangeText={(value) => setDni(value)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Dirección:</Text>
        <TextInput
          style={styles.input}
          type="text"
          value={direccion}
          onChangeText={(value) => setDireccion(value)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Celular:</Text>
        <TextInput
          style={styles.input}
          type="number"
          value={celular}
          onChangeText={(value) => setCelular(value)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleFormSubmit}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  formContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  button: {
    backgroundColor: "#336B87",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  formGroup: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
};

export default FormPerfil;
