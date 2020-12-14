const mongoose = require ('mongoose');

//Definimos el esquema de la colección 
mongoose.model('Cancion', {
    NumeroCancion: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        unique: true //El valor es único dentro de la colección
    },
    Titulo: {
        type: String,
        required: true,
        unique: false
    },
    Artista: {
        type: mongoose.SchemaTypes.ObjectId,
        //type: mongoose.SchemaTypes.Number,
        ref: 'Artista',
        required: true,
        unique: false
    },
    Año: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    Autor: {
        type: String,
        required: true,
        unique: false
    },
    Duracion: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    Genero: {
        type: mongoose.SchemaTypes.ObjectId,
        //type: mongoose.SchemaTypes.Number,
        ref: 'Genero',
        required: true
    }
    

});