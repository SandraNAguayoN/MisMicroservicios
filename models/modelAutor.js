const mongoose = require ('mongoose');

//Definimos el esquema de la colección autor
mongoose.model('Autor', {
    NumeroAutor: {
        type: Number,
        require: [true, 'Se requiere un numero de autor'],
        unique: true //El valor es único dentro de la colección
    },
    Nombres: {
        type: String,
        require: true,
        unique: false
    },
    Apellidos: {
        type: String,
        require: true,
        unique: false
    },
    Edad: {
        type: Number,
        require: true,
        unique: false
    },
    Email: {
        type: String,
        require: true,
        unique: true
    }

});