import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Prestamo from "./Prestamo";
import Historial from "./Historial";
import FormPrestamo from "./FormPrestamo";

const Perfil = ({
	perfil,
	f2_addCuota,
	upd,
	setUpd,
	fDeleteCuota,
	fAddPrestamo,
	fDeleteLoan,
}) => {
	const [showHistorial, setShowHistorial] = useState(false);
	const [showNewPrestamo, setShowNewPrestamo] = useState(false);

	const f_addCuota = (prestamoId, fecha, monto) => {
		f2_addCuota(perfil._id, prestamoId, fecha, monto);
	};

	const fAddIdPerfil = (idCuota, idPrestamo) => {
		fDeleteCuota(idCuota, idPrestamo, perfil._id);
	};

	const fAddIdPerfilToAddPrestamo = (fecha, monto, cuotas) => {
		fAddPrestamo(perfil._id, fecha, monto, cuotas);
	};

	const addIdProfile = (idloan) => {
		fDeleteLoan(perfil._id, idloan);
	};

	return (
		<View style={styles.perfilContainer}>
			<View style={styles.datosPerfil}>
				<Text style={styles.text}>
					<Text style={styles.boldText}>Nombre:</Text> {perfil.name}
				</Text>
				<Text style={styles.text}>
					<Text style={styles.boldText}>DNI:</Text> {perfil.dni}
				</Text>
				<Text style={styles.text}>
					<Text style={styles.boldText}>Celular:</Text>{" "}
					{perfil.celular}
				</Text>
				<Text style={styles.text}>
					<Text style={styles.boldText}>Dirección:</Text>{" "}
					{perfil.direccion}
				</Text>
			</View>

			{perfil.activo &&
				perfil.prestamos.map((prestamo, index) => (
					<Prestamo
						prestamo={prestamo}
						key={index}
						f_addCuota={f_addCuota}
						upd={upd}
						setUpd={setUpd}
						fDeleteCuota={fAddIdPerfil}
						fDeleteLoan={addIdProfile}
					/>
				))}

			<TouchableOpacity
				style={styles.button}
				onPress={() => setShowNewPrestamo(!showNewPrestamo)}
			>
				<Text style={styles.buttonText}>Nuevo prestamo</Text>
			</TouchableOpacity>
			{showNewPrestamo && (
				<FormPrestamo f_addPrestamo={fAddIdPerfilToAddPrestamo} />
			)}

			<TouchableOpacity
				style={styles.button}
				onPress={() => setShowHistorial(!showHistorial)}
			>
				<Text style={styles.buttonText}>
					{showHistorial
						? "Ocultar prestamos anteriores"
						: "Ver prestamos anteriores"}
				</Text>
			</TouchableOpacity>
			{showHistorial && (
				<View style={styles.historialContainer}>
					{perfil.historial.map((element, index) => (
						<Historial datos={element} key={index} />
					))}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	perfilContainer: {
		padding: 10,
	},
	datosPerfil: {
		marginBottom: 10,
	},
	boldText: {
		fontWeight: "bold",
		fontSize: 18,
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
	text: {
		fontSize: 18,
	},
	historialContainer: {
		marginTop: 10,
		borderTopWidth: 1,
		borderTopColor: "#ccc",
	},
});

export default Perfil;
