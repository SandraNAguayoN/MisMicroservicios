const mongoose = require ('mongoose');

//Definimos el esquema de la colección libro
mongoose.model('Libro', {
    NumeroLibro: {
        type: Number,
        require: [true, 'Se requiere un numero de libro'],
        unique: true //El valor es único dentro de la colección
    },
    Titulo: {
        type: String,
        require: true,
        unique: false
    },
    Autor: {
        type: String,
        require: true,
        unique: false
    },
    Categoria: {
        type: String,
        require: true,
        unique: false
    },
    FechaPublicacion: {
        type: Date,
        require: true
    },
    NoEdicion: {
        type: Number,
        require: true
    },
    Argumento: {
        type: String,
        require: false
    }
    

});