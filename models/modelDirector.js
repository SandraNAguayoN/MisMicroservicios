const mongoose = require ('mongoose');

//Definimos el esquema de la colección director
mongoose.model('Director', {
    NumeroDirector: {
        type: Number,
        require: [true, 'Se requiere un numero de director'],
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