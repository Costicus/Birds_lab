const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  // Show all:
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });
// Show one by one ID
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });


  //Create a sighting
  router.post('/', (req, res) => {
    const newData = req.body;
    collection
    .insertOne(newData)
    .then((result) => {
      res.json(result.ops[0])
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status: 500, error: err});
    });
  });

//Implement the functionality that allows the user to delete a sighting.
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  collection
  .deleteOne(( {_id: ObjectId(id)} ))
  .then((result) => {
    res.json(result)
  })
  .catch((err) => {
    console.error(err);
    res.status(500);
    res.json({status: 500, error: err});
  })
})

  return router;
};

module.exports = createRouter;
