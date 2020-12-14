const mongoose = require ('mongoose');

//Definimos el esquema de la colección
mongoose.model('Artista', {
    NumeroArtista: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        unique: true //El valor es único dentro de la colección
    },
    Nombres: {
        type: String,
        required: true,
        unique: false
    },
    Apellidos: {
        type: String,
        required: true,
        unique: false
    },
    Edad: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        unique: false
    },
    Twitter: {
        type: String,
        unique: true
    }

});