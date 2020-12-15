var express = require('express');
var ruta = express.Router();

//Conectando con la bd
var mongoose = require('mongoose');
require('../models/modelGenero');
const Genero = mongoose.model('Genero');//Referencia al modelo

//Metodo GET sirve para listar los registros
ruta.get('/', (req, res) => {
    //Método para buscar a todos los género
    Genero.find().then((genero) => {
        res.json(genero);
    }).catch((error) => {
        if(error)
        throw error;
    });
});

//Encontrar una género por Numero
ruta.get('/:numerogenero', (req, res) => {
    Genero.findOne({NumeroGenero: req.params.numerogenero}).then((genero) => {
        res.json(genero); //Solo busca un registro
    }).catch((error) => {
        if(error)
        throw error;
    });
});

//Método POST Agrega a un género
ruta.post('/', (req, res) => {

    console.log(req.body);

    var newGenero = {
        NumeroGenero: req.body.NumeroGenero,
        Nombre: req.body.Nombre
    }

    var gender = new Genero(newGenero);

    gender.save().then(() => {
        console.log("Se creó el Género");
        res.send('Un nuevo Género se creó');
    }).catch((error) => {
        if(error) {
            console.log('Un error ocurrió al agregar el Género');
            throw error;
        }
    });
});

//Método PUT modifica un registro del género
ruta.put('/', (req, res) => {
    Genero.findOne({NumeroGenero: req.body.NumeroGenero }).then((genero) => {
        genero.Nombre = req.body.Nombre;

        genero.markModified('Nombre');

        genero.save().then(() => {
            res.send('El género se ha modificado');
        }).catch((error) => {
            if(error)
            throw error;
        });
    }).catch((error) => {
        if(error)
        throw error;
    });  
});

//Método DELETE elimina un registro del género por numero
ruta.delete('/:numerogenero', (req, res) => {
    Genero.findOneAndRemove({NumeroGenero: req.params.numerogenero}).then(() => {
        res.send("El género se eliminó exitosamente");
    }).catch((error) => {
        if(error)
        throw error;
    });
});

module.exports = ruta;
