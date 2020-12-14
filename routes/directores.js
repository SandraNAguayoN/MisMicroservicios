var express = require('express');
var ruta = express.Router();

//Conectando con la bd
var mongoose = require('mongoose');
require('../models/modelDirector');
const Director = mongoose.model('Director');//Referencia al modelo

//Metodo GET sirve para listar los registros
ruta.get('/', (req, res) => {
    //Método para buscar a todos los directores
    Director.find().then((directores) => {
        res.json(directores);
    }).catch((error) => {
        if(error)
        throw error;
    });
});

//Encontrar un director
ruta.get('/:NumeroDirector', (req, res) => {
    Director.findById(req.params.id).then((director) => {
        res.json(director); //Solo busca un registro
    }).catch((error) => {
        if(error)
        throw error;
    });
});

//Método POST Agrega a un director
ruta.post('/', (req, res) => {

    console.log(req.body);

    var newDirector = {
        NumeroDirector: req.body.NumeroDirector,
        Nombres: req.body.Nombres,
        Apellidos: req.body.Apellidos,
        Edad: req.body.Edad,
        Email: req.body.Email
    }

    var dir = new Director(newDirector);

    dir.save().then(() => {
        console.log("Se creó el director");
        res.send('Un nuevo director se creó');
    }).catch((error) => {
        if(error) {
            console.log('Un error ocurrió al agregar el director');
            throw error;
        }
    });
});

//Método PUT modifica un registro de autor
ruta.put('/', (req, res) => {
    Director.findOne({NumeroDirector: req.body.NumeroDirector }).then((director) => {
        director.Nombres = req.body.Nombres;
        director.Apellidos =  req.body.Apellidos;
        director.Edad = req.body.Edad;
        director.Email = req.body.Email;

        director.markModified('Nombres');
        director.markModified('Apellidos');
        director.markModified('Edad');
        director.markModified('Email');

        director.save().then(() => {
            res.send('El director se ha modificado');
        }).catch((error) => {
            if(error)
            throw error;
        });
    }).catch((error) => {
        if(error)
        throw error;
    });  
});


//Método DELETE elimina un registro de director
ruta.delete('/:NumeroDirector', (req, res) => {
    Director.findOneAndRemove(req.params.NumeroDirector).then(() => {
        res.send("El director se eliminó exitosamente");
    }).catch((error) => {
        if(error)
        throw error;
    });
});

module.exports = ruta;