import OASNormalize from 'oas-normalize';
// const { default: OASNormalize } = require('oas-normalize'); // If you're using CJS.

const oas = new OASNormalize(
  'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml',
  // ...or a string, path, JSON blob, whatever you've got.
);

oas
  .validate()
  .then(definition => {
    // Definition will always be JSON, and valid.
    console.log(definition);
  })
  .catch(err => {
    console.log(err);
  });