var express = require('express');
var ruta = express.Router();

//Conectando con la bd
var mongoose = require('mongoose');
require('../models/modelCategoria');
const Categoria = mongoose.model('Categoria');//Referencia al modelo

//Metodo GET sirve para listar los registros
ruta.get('/', (req, res) => {
    //Método para buscar a todos los libros
    Categoria.find().then((categoria) => {
        res.json(categoria);
    }).catch((error) => {
        if(error)
        throw error;
    });
});


//Encontrar una categoria
ruta.get('/:NumeroCategoria', (req, res) => {
    Categoria.findOne(req.params.id).then((categoria) => {
        res.json(categoria); //Solo busca un registro
    }).catch((error) => {
        if(error)
        throw error;
    });
});


//Método POST Agrega a una categoria
ruta.post('/', (req, res) => {

    console.log(req.body);

    var newCategoria = {
        NumeroCategoria: req.body.NumeroCategoria,
        Nombre: req.body.Nombre
    }

    var category = new Categoria(newCategoria);

    category.save().then(() => {
        console.log("Se creó la categoría");
        res.send('Una nueva categoría se creó');
    }).catch((error) => {
        if(error) {
            console.log('Un error ocurrió al agregar la categoría');
            throw error;
        }
    });
});

//Método PUT modifica un registro de la categoría
ruta.put('/', (req, res) => {
    Categoria.findOne({NumeroCategoria: req.body.NumeroCategoria }).then((categoria) => {
        categoria.Nombre = req.body.Nombre;

        categoria.markModified('Nombre');

        categoria.save().then(() => {
            res.send('La categoría se ha modificado');
        }).catch((error) => {
            if(error)
            throw error;
        });
    }).catch((error) => {
        if(error)
        throw error;
    });  
});


//Método DELETE elimina un registro de la categoría
ruta.delete('/:_id', (req, res) => {
    Categoria.findByIdAndRemove(req.params._id).then(() => {
        res.send("La categoría se eliminó exitosamente");
    }).catch((error) => {
        if(error)
        throw error;
    });
});

module.exports = ruta;
