const mongoose = require ('mongoose');

//Definimos el esquema de la colección pelicula
mongoose.model('Pelicula', {
    NumeroPelicula: {
        type: Number,
        require: [true, 'Se requiere un numero de película'],
        unique: true //El valor es único dentro de la colección
    },
    Titulo: {
        type: String,
        require: true,
        unique: false
    },
    Director: {
        type: String,
        require: true,
        unique: false
    },
    Duracion: {
        type: Number,
        require: true,
        unique: false
    },
    LibroBasado: {
        type: String,
        require: false,
        unique: false
    },
    FechaEstreno: {
        type: Date,
        require: true
    },
    Secuela: {
        type: Boolean,
        require: true
    },
    Sinopsis: {
        type: String,
        require: false
    }
    

});