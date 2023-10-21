import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Perfil from "./Perfil";

const Clients = ({
	datos,
	f2_addCuota,
	fDeleteCuota,
	fAddPrestamo,
	fDeleteLoan,
}) => {
	const [showPerfil, setShowPerfil] = useState(false);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => setShowPerfil(!showPerfil)}
				style={styles.clientButton}
			>
				<Text style={styles.clientName}>{datos.name}</Text>
			</TouchableOpacity>
			{showPerfil && (
				<Perfil
					perfil={datos}
					f2_addCuota={f2_addCuota}
					fDeleteCuota={fDeleteCuota}
					fAddPrestamo={fAddPrestamo}
					fDeleteLoan={fDeleteLoan}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
	},
	clientContainer: {
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
	},
	clientButton: {
		backgroundColor: "#3498db",
		padding: 10,
		borderRadius: 5,
		marginBottom: 5,
	},
	clientName: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default Clients;
