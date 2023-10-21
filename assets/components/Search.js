import React, { useRef, useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
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
  const inputRef = useRef(null);

  useEffect(() => {
    if (!(upd === 1)) {
      buscar(inputRef.current.value);
    } else {
      setUpd(2);
    }
  }, [datos, upd]);

  const buscar = (value) => {
    value = value.trim();
    let resultados = [];
    if (/^\d+$/.test(value)) {
      resultados = datos.filter((perfil) => perfil.dni === value);
    } else {
      resultados = datos.filter((perfil) => perfil.name === value);
    }
    if (resultados.length === 0) {
      console.log("no se encontro un perfil que coincida");
    } else {
      setShowPerfil(true);
      setPerfil(resultados);
    }
  };

  return (
    <View style={{ margin: 5 }}>
      <View style={styles.searchInput}>
        <TextInput
          style={styles.input}
          placeholder="Nombre o DNI"
          ref={inputRef}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            buscar(inputRef.current.value);
          }}
        >
          <Text style={styles.searchButtonText}>Buscar</Text>
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
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    padding: 8,
    margin: 5,
  },
  searchButton: {
    backgroundColor: "#000",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 15,
  },
});

export default Search;
