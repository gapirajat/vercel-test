const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize');

function handleSequelizeError(error, res) {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.errors.map(e => e.message)
    });
  } else if (error instanceof UniqueConstraintError) {
    return res.status(409).json({
      error: 'Unique Constraint Error',
      details: error.errors.map(e => e.message)
    });
  } else if (error instanceof ForeignKeyConstraintError) {
    return res.status(400).json({
      error: 'Foreign Key Constraint Error',
      details: error.errors.map(e => e.message)
    });
  } else {
    // Handle other types of errors or unknown errors
    process.on('uncaughtException', function (err) {
        console.error(err);
        console.log("Node NOT Exiting...");
      });
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message
    });
  }
}

module.exports = handleSequelizeError;