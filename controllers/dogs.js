const express = require('express');
const router  = express.Router();
const Dog  = require('../models/dogs');



//==============================================

router.get('/', async (req, res, next) => {

  try {
    const foundDogs = await Dog.find({})
      res.render('index.ejs', {
        dogs: foundDogs
        })
      } catch (err) {
    // next is express inherent. If the await.Dogfind fails this is where
    //the error message will go
        console.log(err);
        next(err)
      }
  });

//=================================================
router.get('/new', (req, res) => {
  res.render('new.ejs');
});


router.get('/:id', (req, res) => {
  Dog.findById(req.params.id, (err, foundDog) => {
    res.render('authors/show.ejs', {
      dog: foundDog
    });
  });
});

router.get('/:id/edit', (req, res) => {

  Dog.findById(req.params.id, (err, foundDog) => {
    res.render('edit.ejs', {
      dog: foundDog
    });
  });

});

router.put('/:id', (req, res) => {
  Dog.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedDog)=> {
    console.log(updatedDog, ' this is updatedDog');
    res.redirect('/dogs');
  });
});


router.post('/', async (req, res) => {

    try {

      //successful result from our query will be saved
      // in the variable createdDog
      const createdDog = await Dog.create(req.body);
      console.log(createdDog, 'this is createdDog');
      res.redirect('/dogs')

    } catch (err) {
      res.send(err)
    }
});


router.delete('/:id', (req, res) => {

  Dog.findByIdAndRemove(req.params.id, (err, deletedDog) => {
    console.log(deletedDog, ' this is deletedDog');
    res.redirect('/dogs')
  })

});



module.exports = router;
