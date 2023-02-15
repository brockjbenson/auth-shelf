const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('GET request on /shelf in shelf router');
  if (req.isAuthenticated()) {
    pool
      .query(`SELECT * FROM "item";`)
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log('Error making SELECT for items:', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const { description, image_url } = req.body;

  console.log(req.user);
  const qText = `INSERT INTO "item" ("description", "image_url", "user_id")
  VALUES ($1, $2, $3);`;
  if (req.isAuthenticated()) {
    pool
      .query(qText, [description, image_url, req.user.id])
      .then((results) => res.sendStatus(201))
      .catch((error) => {
        console.log('Error making INSERT for items:', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  console.log('in delete route');
  const qText = `DELETE FROM "item" WHERE "id" = $1 AND "user_id" = $2;`;
  if (req.isAuthenticated()) {
    pool
      .query(qText, [req.params.id, req.user.id])
      .then(response => {
        res.sendStatus(204);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
