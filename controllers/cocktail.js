var Cocktail = require("../models/cocktail");

const { param, body, validationResult } = require("express-validator");

// Create
exports.create = [
  // Check validation
  body("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),

  body("bar")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Bar must be specified."),

  // Process Request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create cocktail object with escaped and trimmed data
    var cocktail = new Cocktail({
      _id: req.body.id,
      name: req.body.name,
      bar: req.body.bar,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      cocktail.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Cocktail created successfully !");
      });
    }
  },
];

// Read
exports.getAll = function (req, res, next) {
  Cocktail.find().exec(function (err, result) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
};

exports.getById = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Cocktail.findById(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
      });
    }
  },
];

// Delete
exports.delete = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Cocktail.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("Cocktail deleted successfully !");
      });
    }
  },
];

// Update
exports.update = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),

  body("bar")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Bar must be specified."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create cocktail object with escaped and trimmed data
    var cocktail = new Cocktail({
      _id: req.params.id,
      name: req.body.name,
      bar: req.body.bar,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Cocktail.findByIdAndUpdate(req.params.id, cocktail, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Cocktail updated successfully !");
      });
    }
  },
];
