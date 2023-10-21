import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ToastAndroid,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from '@expo/vector-icons'; // Importar el icono de Material Icons

const FormPrestamo = ({ f_addPrestamo }) => {
	const [monto, setMonto] = useState(0);
	const [cuotas, setCuotas] = useState(25);
	const [fecha, setFecha] = useState(new Date()); // Fecha seleccionada
	// const [fechaLegible, setFechaLegible] = useState(""); // Fecha legible por humanos
	const [showDatePicker, setShowDatePicker] = useState(false);

	 const toggleDatePicker = () => {
	 	setShowDatePicker(!showDatePicker);
	   };

	const handleDateChange = (event, selectedDate) => {
		setShowDatePicker(false);
		if (selectedDate) {
		setFecha(selectedDate);
		}
	};

	// const obtenerFechaActual = () => {
	// 	const fechaActual = new Date();
	// 	const dia = fechaActual.getDate();
	// 	const mes = fechaActual.getMonth() + 1;
	// 	const anio = fechaActual.getFullYear();

	// 	const formatoFecha = `${dia}/${mes}/${anio}`;
	// 	setFecha(fechaActual);
	// 	setFechaLegible(formatoFecha); // Actualiza también la fecha legible
	// };

	// useEffect(() => {
	// 	obtenerFechaActual();
	// }, []);

	const sendInf = () => {
		if (!monto || !cuotas) {
	 		alert("Por favor ingrese un monto y cantidad de cuotas");
	 		return;
	 	}

	 	f_addPrestamo(fecha, parseFloat(monto), cuotas); // Usa la fecha en formato original
	 	setFecha(new Date())
	 	setMonto(0);
	 	ToastAndroid.show("Prestamo añadido", ToastAndroid.SHORT);
	 };

	return (
		<View style={styles.formContainer}>
			<View style={styles.formGroup}>
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
			<View style={styles.formGroup}>
				<Text>Monto</Text>
				<TextInput
					style={styles.input}
					type="number"
					value={monto.toString()}
					onChangeText={(value) => setMonto(value)}
				/>
			</View>
			<View style={styles.formGroup}>
				<Text>Cuotas</Text>
				<TextInput
					style={styles.input}
					type="number"
					value={cuotas.toString()}
					onChangeText={(value) => setCuotas(value)}
				/>
			</View>
			<TouchableOpacity style={styles.button} onPress={sendInf}>
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
	formGroup: {
		marginVertical: 10,
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
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		paddingHorizontal: 10,
	},
};

export default FormPrestamo;
