/*
##############################################
#        Seccion: Función de busqueda        #
##############################################
*/
import {DB_HOST, DB_PORT} from "./config.js"
// Obtener el campo de entrada y la lista
var buscador = document.getElementById('buscador');
var lista = document.querySelector('.lista table');

// Agregar un evento "input" al campo de entrada
buscador.addEventListener('input', function() {
  // Obtener el valor de búsqueda del campo de entrada
  var busqueda = this.value.toLowerCase();
  
  // Recorrer todas las filas de la tabla
  for (var i = 0; i < lista.rows.length; i++) {
    var fila = lista.rows[i];
    var palabra = fila.cells[0].textContent.toLowerCase();
    
    // Comprobar si la palabra coincide con la búsqueda
    if (palabra.indexOf(busqueda) !== -1) {
      // Si la palabra coincide, mostrar la fila
      fila.style.display = '';
    } else {
      // Si la palabra no coincide, ocultar la fila
      fila.style.display = 'none';
    }
  }
});

/*
##############################################
#      Seccion: Funcion Filtrado Indice      #
##############################################
*/
    function mostrarFilas(letra) {
        var tabla = document.getElementById("tabla");
        var filas = tabla.getElementsByTagName("tr");
        for (var i = 0; i < filas.length; i++) {
            var celda = filas[i].getElementsByTagName("td")[0];
            if (celda) {
                var textoCelda = celda.textContent || celda.innerText;
                if (textoCelda.charAt(0).toUpperCase() === letra.toUpperCase()) {
                    filas[i].style.display = "";
                } else {
                    filas[i].style.display = "none";
                }
            }
        }
    }
    // ... (parte superior del archivo sin cambios)

    document.addEventListener("DOMContentLoaded", fetchAbilities);

    function fetchAbilities() {
      fetch(`http://${DB_HOST}:${DB_PORT}/getAbilities`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al cargar el archivo JSON");
          }
          return response.json();
        })
        .then((data) => {
          populateTable(data);
        })
        .catch((error) => {
          console.error("Error al cargar los datos de habilidades de Pokémon:", error);
        });
    }
    
    function populateTable(abilities) {
      const tableBody = document.getElementById("pokemon-abilities-table-body");
    
      for (const ability of abilities) {
        const row = tableBody.insertRow();
    
        // Nombre de la habilidad
        const cell1 = row.insertCell();
        cell1.textContent = ability.name;
    
        // Descripción de la habilidad
        const cell2 = row.insertCell();
        cell2.textContent = ability.description;
    
        // Enlace a abilities2.html
        const cell3 = row.insertCell();
        const link = document.createElement("a");
        link.textContent = "Click here";
        link.href = `pokemon_abilities_2.html?ability=${encodeURIComponent(ability.name)}`;
        
        // Almacenar idAbility en el enlace
        link.addEventListener("click", function (event) {
          localStorage.setItem("idAbility", ability.idAbility);
        });
    
        cell3.appendChild(link);
      }
    }
    