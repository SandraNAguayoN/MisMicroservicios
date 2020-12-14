var express = require('express');
var ruta = express.Router();


//Conectando con la bd
var mongoose = require('mongoose');
require('../models/modelLibro');
const Libro = mongoose.model('Libro');//Referencia al modelo

/*
ruta.get('/', (req, res) => {
    console.log('Listado de libros');
    res.render('libros/index', { title: 'Listado de libros'});
});*/

//Metodo GET sirve para listar los registros
ruta.get('/', (req, res) => {
    //Método para buscar a todos los libros
    Libro.find().then((libros) => {
        res.json(libros);
    }).catch((error) => {
        if(error)
        throw error;
    });
});


/*
ruta.get('/', (req, res) => {
    //Método para buscar a todos lo libros
    console.log('Listado de libros');
    res.render('libros/index', { title: 'Listado de libros'});
    Libro.find().then((libros) => {
        res.json(libros);
    }).catch((error) => {
        if(error)
        throw error;
    });
});*/


//Encontrar un libro
ruta.get('/:_id', (req, res) => {
    Libro.find(req.params._id).then((libro) => {
        res.json(libro); //Solo busca un registro
    }).catch((error) => {
        if(error)
        throw error;
    });
});


//Método POST Agrega a un libro
ruta.post('/', (req, res) => {

    console.log(req.body);

    var newLibro = {
        NumeroLibro: req.body.NumeroLibro,
        Titulo: req.body.Titulo,
        Autor: req.body.Autor,
        Categoria: req.body.Categoria,
        FechaPublicacion: req.body.FechaPublicacion,
        NoEdicion: req.body.NoEdicion,
        Argumento: req.body.Argumento
    }

    var book = new Libro(newLibro);

    book.save().then(() => {
        console.log("Se creó el libro");
        res.send('Un nuevo libro se creó');
    }).catch((error) => {
        if(error) {
            console.log('Un error ocurrió al agregar el libro');
            throw error;
        }
    });
});

//Método PUT modifica un registro de libro
ruta.put('/', (req, res) => {
    Libro.findOne({NumeroLibro: req.body.NumeroLibro }).then((libro) => {
        libro.Titulo = req.body.Titulo;
        libro.Categoria = req.body.Categoria;
        libro.NoEdicion =  req.body.NoEdicion;
        libro.Argumento = req.body.Argumento;

        libro.markModified('Titulo');
        libro.markModified('Categoria');
        libro.markModified('NoEdicion');
        libro.markModified('Argumento');

        libro.save().then(() => {
            res.send('El libro se ha modificado');
        }).catch((error) => {
            if(error)
            throw error;
        });
    }).catch((error) => {
        if(error)
        throw error;
    });  
});


//Método DELETE elimina un registro de libro
ruta.delete('/:_id', (req, res) => {
    Libro.findByIdAndRemove(req.params._id).then(() => {
        res.send("El libro se eliminó exitosamente");
    }).catch((error) => {
        if(error)
        throw error;
    });
});

module.exports = ruta;