var express = require('express');
var ruta = express.Router();


//Conectando con la bd
var mongoose = require('mongoose');
require('../models/modelCancion');
const Cancion = mongoose.model('Cancion');//Referencia al modelo


/*
ruta.get('/', (req, res) => {
    console.log('Listado de libros');
    res.render('libros/index', { title: 'Listado de libros'});
});*/

//Metodo GET sirve para listar los registros
ruta.get('/', (req, res) => {
    //Método para buscar a todos las Canciones
    Cancion.find().then((canciones) => {
        res.json(canciones);
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

/*
//Encontrar una Cancion por ID
ruta.get('/:_id', (req, res) => {
    Cancion.findById(req.params._id).then((cancion) => {
        res.json(cancion); //Solo busca un registro
    }).catch((error) => {
        if(error)
        throw error;
    });
});
*/
//Encontrar una Cancion por numero
ruta.get('/:numerocancion', (req, res) => {
    Cancion.findOne({NumeroCancion: req.params.numerocancion}).then((cancion) => {
        res.json(cancion); //Solo busca un registro
    }).catch((error) => {
        if(error)
        throw error;
    });
});

//Método POST Agrega a una Cancion
ruta.post('/', (req, res) => {

    console.log(req.body);

    var newCancion = {
        NumeroCancion: req.body.NumeroCancion,
        Titulo: req.body.Titulo,
        Artista: req.body.Artista,
        Año: req.body.Año,
        Autor: req.body.Autor,
        Duracion: req.body.Duracion,
        Genero: req.body.Genero
    }

    var song = new Cancion(newCancion);

    song.save().then(() => {
        console.log("Se creó la canción");
        res.send('Una nueva canción se creó');
    }).catch((error) => {
        if(error) {
            console.log('Un error ocurrió al agregar la canción');
            throw error;
        }
    });
});

//Método PUT modifica un registro de Cancion
ruta.put('/', (req, res) => {
    Cancion.findOne({NumeroCancion : req.body.NumeroCancion }).then((cancion) => {
        cancion.Titulo = req.body.Titulo;
        cancion.Artista = req.body.Artista;
        cancion.Año =  req.body.Año;
        cancion.Genero = req.body.Genero;

        cancion.markModified('Titulo');
        cancion.markModified('Artista');
        cancion.markModified('Año');
        cancion.markModified('Genero');

        cancion.save().then(() => {
            res.send('La canción se ha modificado');
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
//Método DELETE elimina un registro de cancion
ruta.delete('/:_id', (req, res) => {
    Cancion.findByIdAndRemove(req.params._id).then(() => {
        res.send("La canción se eliminó exitosamente");
    }).catch((error) => {
        if(error)
        throw error;
    });
});
*/

ruta.delete('/:numerocancion', (req, res) => {
    Cancion.findOneAndRemove({NumeroCancion: req.params.numerocancion}).then(() => {
        res.send("La canción se eliminó exitosamente");
    }).catch((error) => {
        if(error)
        throw error;
    });
});


module.exports = ruta;