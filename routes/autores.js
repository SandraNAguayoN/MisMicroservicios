var express = require('express');
var ruta = express.Router();

//Conectando con la bd
var mongoose = require('mongoose');
require('../models/modelAutor');
const Autor = mongoose.model('Autor');//Referencia al modelo

//Metodo GET sirve para listar los registros
ruta.get('/', (req, res) => {
    //Método para buscar a todos los autores
    Autor.find().then((autores) => {
        res.json(autores);
    }).catch((error) => {
        if(error)
        throw error;
    });
});

//Encontrar un autor
ruta.get('/:NumeroAutor', (req, res) => {
    Autor.findById(req.params.id).then((autor) => {
        res.json(autor); //Solo busca un registro
    }).catch((error) => {
        if(error)
        throw error;
    });
});

//Método POST Agrega a un autor
ruta.post('/', (req, res) => {

    console.log(req.body);

    var newAutor = {
        NumeroAutor: req.body.NumeroAutor,
        Nombres: req.body.Nombres,
        Apellidos: req.body.Apellidos,
        Edad: req.body.Edad,
        Email: req.body.Email
    }

    var author = new Autor(newAutor);

    author.save().then(() => {
        console.log("Se creó el autor");
        res.send('Un nuevo autor se creó');
    }).catch((error) => {
        if(error) {
            console.log('Un error ocurrió al agregar el autor');
            throw error;
        }
    });
});

//Método PUT modifica un registro de autor
ruta.put('/', (req, res) => {
    Autor.findOne({NumeroAutor: req.body.NumeroAutor }).then((autor) => {
        autor.Nombres = req.body.Nombres;
        autor.Apellidos =  req.body.Apellidos;
        autor.Edad = req.body.Edad;
        autor.Email = req.body.Email;

        autor.markModified('Nombres');
        autor.markModified('Apellidos');
        autor.markModified('Edad');
        autor.markModified('Email');

        autor.save().then(() => {
            res.send('El autor se ha modificado');
        }).catch((error) => {
            if(error)
            throw error;
        });
    }).catch((error) => {
        if(error)
        throw error;
    });  
});


//Método DELETE elimina un registro de autor
ruta.delete('/:_id', (req, res) => {
    Autor.findByIdAndRemove(req.params._id).then(() => {
        res.send("El autor se eliminó exitosamente");
    }).catch((error) => {
        if(error)
        throw error;
    });
});

module.exports = ruta;