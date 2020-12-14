var express = require('express');
var ruta = express.Router();

//Conectando con la bd
var mongoose = require('mongoose');
require('../models/modelPelicula');
const Pelicula = mongoose.model('Pelicula');//Referencia al modelo

//Metodo GET sirve para listar los registros
ruta.get('/', (req, res) => {
    //Método para buscar a todos las peliculas
    Pelicula.find().then((peliculas) => {
        res.json(peliculas);
    }).catch((error) => {
        if(error)
        throw error;
    });
});

//Encontrar una pelicula
ruta.get('/:NumeroPelicula', (req, res) => {
    Pelicula.findById(req.params.id).then((pelicula) => {
        res.json(pelicula); //Solo busca un registro
    }).catch((error) => {
        if(error)
        throw error;
    });
});

//Método POST Agrega a una pelicula
ruta.post('/', (req, res) => {

    console.log(req.body);

    var newPelicula = {
        NumeroPelicula: req.body.NumeroPelicula,
        Titulo: req.body.Titulo,
        Director: req.body.Director,
        Duracion: req.body.Duracion,
        LibroBasado: req.body.LibroBasado,
        FechaEstreno: req.body.FechaEstreno,
        Secuela: req.body.Secuela,
        Sinopsis: req.body.Sinopsis
    }

    var film = new Pelicula(newPelicula);

    film.save().then(() => {
        console.log("Se creó la película");
        res.send('Una nueva película se creó');
    }).catch((error) => {
        if(error) {
            console.log('Un error ocurrió al agregar la película');
            throw error;
        }
    });
});

//Método PUT modifica un registro de película
ruta.put('/', (req, res) => {
    Pelicula.findOne({NumeroPelicula: req.body.NumeroPelicula }).then((pelicula) => {
        pelicula.Titulo = req.body.Titulo;
        pelicula.Director =  req.body.Director;
        pelicula.Duracion =  req.body.Duracion;
        pelicula.LibroBasado =  req.body.LibroBasado;
        pelicula.FechaEstreno =  req.body.FechaEstreno;
        pelicula.Secuela = req.body.Secuela;
        pelicula.Sinopsis = req.body.Sinopsis;

        pelicula.markModified('Titulo');
        pelicula.markModified('Director');
        pelicula.markModified('Duracion');
        pelicula.markModified('LibroBasado');
        pelicula.markModified('FechaEstreno');
        pelicula.markModified('Secuela');
        pelicula.markModified('Sinopsis');

        pelicula.save().then(() => {
            res.send('La película se ha modificado');
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
ruta.delete('/:_id', (req, res) => {
    Pelicula.findByIdAndRemove(req.params._id).then(() => {
        res.send("La película se eliminó exitosamente");
    }).catch((error) => {
        if(error)
        throw error;
    });
});

module.exports = ruta;