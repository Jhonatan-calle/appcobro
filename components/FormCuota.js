import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from '@expo/vector-icons'; // Importar el icono de Material Icons

const FormCuota = ({ datos, f_addCuota, upd, setUpd }) => {
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState(new Date()); // Fecha seleccionada
  const [showDatePicker, setShowDatePicker] = useState(false);

  const sendInf = () => {
    if (!monto) {
      alert("Por favor ingrese un monto");
      return;
    }

    f_addCuota(datos._id, fecha.toISOString().split("T")[0], parseFloat(monto));
    obtenerFechaActual();
    setMonto("");
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFecha(selectedDate);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const obtenerFechaActual = () => {
    // Obtener la fecha actual
    const fechaActual = new Date();
    setFecha(fechaActual);
  };

  useEffect(() => {
    obtenerFechaActual();
  }, []);

  return (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <Text>Abona</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={monto}
          onChangeText={(value) => setMonto(value)}
        />
        {/* Icono de calendario y fecha actual */}
        <TouchableOpacity onPress={toggleDatePicker}>
          <View style={styles.dateContainer}>
            <MaterialIcons name="date-range" size={24} color="black" />
            <Text>Fecha: {fecha.toISOString().split("T")[0]}</Text>
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fecha}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <Button title="Agregar" onPress={sendInf} />
    </View>
  );
};



const styles = {
  formContainer: {
		padding: 10,
		backgroundColor: "#f0f0f0",
	},
  formGroup: {
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    paddingLeft: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
};

export default FormCuota;
