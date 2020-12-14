const mongoose = require ('mongoose');

//Definimos el esquema de la colección pelicula
mongoose.model('Categoria', {
    NumeroCategoria: {
        type: Number,
        require: [true, 'Se requiere un numero de categoría'],
        unique: true //El valor es único dentro de la colección
    },
    Nombre: {
        type: String,
        require: true,
        unique: false
    }
});