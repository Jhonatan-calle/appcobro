import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FormCouta from "./FormCuota";
import HistorialCuotas from "./HistorialCuotas";

const Prestamo = ({
	prestamo,
	f_addCuota,
	upd,
	setUpd,
	fDeleteCuota,
	fDeleteLoan,
}) => {
	const [addcouta, setAddCouta] = useState(false);
	const [showCuotas, setShowCuotas] = useState(false);

	const fAddIdPrestamo = (idCuota) => {
		fDeleteCuota(idCuota, prestamo._id);
	};

	return (
		<View style={styles.card}>
			<Text style={styles.text}>
				<Text style={styles.label}>Fecha del préstamo:</Text>{" "}
				{prestamo.fecha}
			</Text>
			<Text style={styles.text}>
				<Text style={styles.label}>Monto:</Text> ${prestamo.monto}
			</Text>
			<Text style={styles.text}>
				<Text style={styles.label}>Cuotas:</Text> {prestamo.cantCoutas}
			</Text>
			<Text style={styles.text}>
				<Text style={styles.label}>Monto de cada cuota:</Text>{" "}
				{prestamo.montoCuota}
			</Text>
			<Text style={styles.text}>
				<Text style={styles.label}>Abonado:</Text> ${prestamo.abonado}
			</Text>
			<Text style={styles.text}>
				<Text style={styles.label}>Resta:</Text> ${prestamo.resta}
			</Text>

			<TouchableOpacity
				style={styles.button}
				onPress={() => setAddCouta(!addcouta)}
			>
				<Text style={styles.buttonText}>
					{addcouta ? "Cancelar agregar cuota" : "Agregar cuota"}
				</Text>
			</TouchableOpacity>
			{addcouta && (
				<FormCouta
					datos={prestamo}
					f_addCuota={f_addCuota}
					upd={upd}
					setUpd={setUpd}
				/>
			)}
			<TouchableOpacity
				style={styles.button}
				onPress={() => setShowCuotas(!showCuotas)}
			>
				<Text style={styles.buttonText}>
					{showCuotas ? "Ocultar cuotas" : "Ver cuotas"}
				</Text>
			</TouchableOpacity>
			{showCuotas && (
				<View style={styles.cuotasContainer}>
					{prestamo.cuotas.map((cuota, index) => (
						<HistorialCuotas
							datos={cuota}
							key={index}
							fDelete={fAddIdPrestamo}
						/>
					))}
				</View>
			)}
			<TouchableOpacity
				style={[styles.button, styles.deleteButton]}
				onPress={() => fDeleteLoan(prestamo._id)}
			>
				<Text style={styles.buttonText}>Eliminar préstamo</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = {
	text: {
		fontSize: 18,
	},
	card: {
		padding: 10,
		backgroundColor: "#ffffff",
		marginVertical: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#cccccc",
	},
	label: {
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "#007bff",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
		marginVertical: 5,
		alignItems: "center",
	},
	deleteButton: {
		backgroundColor: "#dc3545",
	},
	buttonText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "bold",
	},
	cuotasContainer: {
		marginVertical: 10,
	},
};

export default Prestamo;
