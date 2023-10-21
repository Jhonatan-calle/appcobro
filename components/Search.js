import React, { useRef, useState, useEffect } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Text,
} from "react-native";
import Perfil from "./Perfil";

const Search = ({
	datos,
	f2_addCuota,
	fDeleteCuota,
	fAddPrestamo,
	fDeleteLoan,
}) => {
	const [showPerfil, setShowPerfil] = useState(false);
	const [perfil, setPerfil] = useState([]);
	const [upd, setUpd] = useState(1);
	const [input, setInput] = useState("");
	const inputRef = useRef(null);

	// useEffect(() => {
	// 	if (!(upd === 1)) {
	// 		buscar(inputRef.current.value);
	// 	} else {
	// 		setUpd(2);
	// 	}
	// }, [datos, upd]);

	const buscar = (value) => {
		let resultados = [];
		value = value && value.trim();
		if (/^\d+$/.test(value)) {
			resultados = datos.filter((perfil) => perfil.dni === value);
		} else {
			resultados = datos.filter((perfil) => perfil.name === value);
		}
		if (resultados.length === 0) {
		} else {
			setShowPerfil(true);
			setPerfil(resultados);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.searchInput}>
				<TextInput
					style={styles.input}
					placeholder="Nombre o DNI"
					onChangeText={setInput}
					ref={inputRef}
				/>
				<TouchableOpacity
					style={styles.searchButton}
					onPress={() => {
						buscar(input);
					}}
				>
					<Text style={styles.searchButtonText}>
						Buscar/Actualizar
					</Text>
				</TouchableOpacity>
			</View>
			{showPerfil && (
				<Perfil
					perfil={perfil[0]}
					f2_addCuota={f2_addCuota}
					upd={upd}
					setUpd={setUpd}
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
		margin: 5,
	},
	searchInput: {
		flexDirection: "row",
	},
	input: {
		flex: 1,
		borderRadius: 5,
		borderWidth: 1,
		padding: 8,
		margin: 5,
		width: 250,
	},
	searchButton: {
		backgroundColor: "#000",
		borderRadius: 5,
		padding: 10,
		margin: 5,
	},
	searchButtonText: {
		color: "#fff",
		fontSize: 15,
	},
});

export default Search;
