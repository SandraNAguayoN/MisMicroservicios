const mongoose = require ('mongoose');

//Definimos el esquema de la colección
mongoose.model('Genero', {
    NumeroGenero: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        unique: true //El valor es único dentro de la colección
    },
    Nombre: {
        type: String,
        required: true,
        unique: true
    }
});