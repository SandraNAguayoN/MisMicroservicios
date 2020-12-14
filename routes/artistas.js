var express = require('express');
var ruta = express.Router();

//Conectando con la bd
var mongoose = require('mongoose');
require('../models/modelArtista');
const Artista = mongoose.model('Artista');//Referencia al modelo

//Metodo GET sirve para listar los registros
ruta.get('/', (req, res) => {
    //Método para buscar a todos los Artistas
    Artista.find().then((artistas) => {
        res.json(artistas);
    }).catch((error) => {
        if(error)
        throw error;
    });
});

/*
//Encontrar un Artista por ID
ruta.get('/:_id', (req, res) => {
    Artista.findById(req.params._id).then((artista) => {
        res.json(artista); //Solo busca un registro
    }).catch((error) => {
        if(error)
        throw error;
    });
});
*/

//Encontrar un Artista por numero
ruta.get('/:numeroartista', (req, res) => {
    Artista.findOne({NumeroArtista: req.params.numeroartista}).then((artista) => {
        res.json(artista); //Solo busca un registro
    }).catch((error) => {
        if(error)
        throw error;
    });
});

//Método POST Agrega a un Artista
ruta.post('/', (req, res) => {

    console.log(req.body);

    var newArtista = {
        NumeroArtista: req.body.NumeroArtista,
        Nombres: req.body.Nombres,
        Apellidos: req.body.Apellidos,
        Edad: req.body.Edad,
        Twitter: req.body.Twitter
    }

    var artist = new Artista(newArtista);

    artist.save().then(() => {
        console.log("Se creó el Artista");
        res.send('Un nuevo Artista se creó');
    }).catch((error) => {
        if(error) {
            console.log('Un error ocurrió al agregar el Artista');
            throw error;
        }
    });
});

//Método PUT modifica un registro de Artista
ruta.put('/', (req, res) => {
    Artista.findOne({NumeroArtista: req.body.NumeroArtista }).then((artista) => {
        artista.Nombres = req.body.Nombres;
        artista.Apellidos =  req.body.Apellidos;
        artista.Edad = req.body.Edad;
        artista.Twitter = req.body.Twitter;

        artista.markModified('Nombres');
        artista.markModified('Apellidos');
        artista.markModified('Edad');
        artista.markModified('Twitter');

        artista.save().then(() => {
            res.send('El artista se ha modificado');
        }).catch((error) => {
            if(error)
            throw error;
        });
    }).catch((error) => {
        if(error)
        throw error;
    });  
});

/*
//Método DELETE elimina un registro de artista por ID
ruta.delete('/:_id', (req, res) => {
    Artista.findByIdAndRemove(req.params._id).then(() => {
        res.send("El artista se eliminó exitosamente");
    }).catch((error) => {
        if(error)
        throw error;
    });
});
*/

//Método DELETE elimina un registro de artista por numero
ruta.delete('/:numeroartista', (req, res) => {
    Artista.findOneAndRemove({NumeroArtista: req.params.numeroartista}).then(() => {
        res.send("El artista se eliminó exitosamente");
    }).catch((error) => {
        if(error)
        throw error;
    });
});

module.exports = ruta;