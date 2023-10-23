import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	StatusBar,
	ScrollView,
} from "react-native";
import axios from "axios";

import Cuadre from "./components/Cuadre";
import Search from "./components/Search";
import FormPerfil from "./components/FormPerfil";
import Clients from "./components/Clients";
import LoadingOverlay from "./LoadingOverlay";

function App() {
	const [datos, setdatos] = useState([]);
	const [cuadre, setCuadre] = useState([])

	const [upd, setUpd] = useState(false);
	const [addPerfil, setAddPerfil] = useState(false);
	const [showClientList, setShowClientList] = useState(false);
	const [showCuadre, setShowCuadre] = useState(false)

	const [loading, setLoading] = useState(false);

	const getdata = () => {
		console.log("staring getdata");
		axios
			.get("https://server-cobroo.glitch.me/jose")
			.then((response) => {
				if (typeof response.data === "string") {
					console.log(response.data);
					setdatos([]);
				} else {
					setdatos(response.data);
				}
				setLoading(false);
			}).then(()=>getCuadre())
			.catch((error) => {
				console.error("Error fetching data:", error);

				// Imprime más detalles sobre el error de la solicitud
				if (error.response) {
					console.error("Error response data:", error.response.data);
					console.error(
						"Error response status:",
						error.response.status
					);
					console.error(
						"Error response headers:",
						error.response.headers
					);
				}
			});
	};

	const getCuadre = () => {
		console.log("staring getCuadre");
		axios
			.get("https://server-cobroo.glitch.me/clients/cuadre")
			.then((response) => {
				if (typeof response.data === "string") {
					console.log(response.data);
					setCuadre([]);
				} else {
					setCuadre(response.data);
				}
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching cuadre:", error);

				// Imprime más detalles sobre el error de la solicitud
				if (error.response) {
					console.error("Error response data:", error.response.data);
					console.error(
						"Error response status:",
						error.response.status
					);
					console.error(
						"Error response headers:",
						error.response.headers
					);
				}
			});
	};

	useEffect(() => {
		setLoading(true);
		getdata();
	}, []);

	// añadir perfil
	const addperfil = async (nombre, dni, direccion, celular) => {
		setLoading(true);
		const newClient = {
			name: nombre,
			dni: dni,
			direccion: direccion,
			celular: celular,
		};
		try {
			// Realiza la solicitud POST al servidor con el nuevo cliente
			fetch("https://server-cobroo.glitch.me/clients", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newClient),
			})
				.then((response) => {
					// Verifica si la respuesta fue exitosa y muestra un mensaje en la consola
					if (response.ok) {
						console.log("Cliente agregado correctamente");
					} else {
						console.log("Error al agregar el cliente");
					}
				})
				.then(() => setTimeout(getdata, 300));
		} catch (error) {
			console.error("Error de red:", error);
		}
	};

	//añadir prestamo
	const addPrestamo = async (clientId, fecha, monto, cantCuotas) => {
		setLoading(true);
		console.log(typeof monto);
		const calcularMontoCuota = (monto, cantCuotas) => {
			const montoCuota = monto / cantCuotas;

			if (montoCuota % 100 === 0) {
				return montoCuota;
			} else {
				const centenaFija = Math.floor(montoCuota / 100) * 100;
				const resto = montoCuota - centenaFija;
				const totalUltimaCuota =
					Math.round((resto * cantCuotas) / 100) * 100;
				return `${cantCuotas} cuotas de ${centenaFija} más una cuota de ${totalUltimaCuota}`;
			}
		};

		const url = `https://server-cobroo.glitch.me/clients/${clientId}/loans`;
		const prestamo = {
			fecha: fecha,
			monto: monto,
			cantCoutas: cantCuotas,
			montoCuota: calcularMontoCuota(monto, cantCuotas),
		};

		try {
			// Agregar prestamo
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(prestamo),
			}).then(() => setTimeout(getdata, 300));
			if (response.ok) {
				console.log("prestamo añadido correctamente");
				return;
			}
		} catch (error) {
			console.log("Error de red:", error);
		}
	};

	//eliminar prestamo
	const fDeleteLoan = (clientId, prestamoId) => {
		setLoading(true);
		const url = `https://server-cobroo.glitch.me/clients/${clientId}/loans/${prestamoId}`;

		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.ok) {
					console.log("Cuota eliminada correctamente");
					// Assuming getdata() is defined outside the function
					setTimeout(() => {
						getdata();
					}, 250); // Call getdata after successful deletion
					return;
				} else {
					console.log("No se pudo eliminar la cuota");
				}
			})
			.catch((error) => {
				console.log("Error de red:", error);
			});
	};

	//añadir cuota
	const addcouta = async (clientId, prestamoId, fecha, monto) => {
		setLoading(true);
		console.log(clientId, prestamoId);
		const url = `https://server-cobroo.glitch.me/clients/${clientId}/loans/${prestamoId}/cuotas`;
		const cuota = {
			fecha: fecha,
			monto: monto,
		};
		try {
			// Agregar la cuota al préstamo
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(cuota),
			}).then(() => setTimeout(getdata, 300));
			if (response.ok) {
				console.log("cuota añadida correctamente");
				return;
			}
		} catch (error) {
			console.log("Error de red:", error);
		}
	};

	//eleminar cuota
	const fDeleteCuota = (cuotaId, prestamoId, clientId) => {
		setLoading(true);
		const url = `https://server-cobroo.glitch.me/clients/${clientId}/loans/${prestamoId}/cuotas/${cuotaId}`;

		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.ok) {
					console.log("Cuota eliminada correctamente");
					// Assuming getdata() is defined outside the function
					setTimeout(() => {
						getdata();
					}, 250); // Call getdata after successful deletion
					return;
				} else {
					console.log("No se pudo eliminar la cuota");
				}
			})
			.catch((error) => {
				console.log("Error de red:", error);
			});
	};

	return (
		<View>
			<StatusBar backgroundColor="white" barStyle="dark-content" />

			<ScrollView>
				<View style={styles.container}>
					<LoadingOverlay loading={loading} />
					<Search
						datos={datos}
						f2_addCuota={addcouta}
						upd={upd}
						setUpd={setUpd}
						fDeleteCuota={fDeleteCuota}
						fAddPrestamo={addPrestamo}
						fDeleteLoan={fDeleteLoan}
					/>

					<TouchableOpacity
						style={styles.button}
						onPress={() => setAddPerfil(!addPerfil)}
					>
						<Text style={styles.buttonText}>Añadir cliente</Text>
					</TouchableOpacity>

					{addPerfil && <FormPerfil addperfil={addperfil} />}

					<TouchableOpacity
						style={styles.button}
						onPress={() => setShowClientList(!showClientList)}
					>
						<Text style={styles.buttonText}>Lista de clientes</Text>
					</TouchableOpacity>

					{showClientList &&
						datos.map((perfil) => (
							<View
								key={perfil._id}
								style={styles.clientContainer}
							>
								<Clients
									datos={perfil}
									f2_addCuota={addcouta}
									upd={upd}
									setUpd={setUpd}
									fDeleteCuota={fDeleteCuota}
									fAddPrestamo={addPrestamo}
									fDeleteLoan={fDeleteLoan}
								/>
							</View>
						))}

					<TouchableOpacity
					style={styles.button}
					onPress={() => {
						setShowCuadre(!showCuadre);
					}}
					>
					<Text style={styles.buttonText}>Cuadre</Text>
					</TouchableOpacity>
					{showCuadre && cuadre.slice(-5).reverse().map((semana) => (
					<View key={semana._id} style={styles.clientContainer}>
						<Cuadre cuadre={semana} />
					</View>
					))}




				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		marginHorizontal: 20,
	},
	button: {
		backgroundColor: "#2A3132",
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
});

export default App;
