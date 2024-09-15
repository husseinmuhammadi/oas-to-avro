var { openapiSchemaToJsonSchema: toJsonSchema } = require("@openapi-contrib/openapi-schema-to-json-schema");
var OASNormalize = require("oas-normalize");
var fs = require('fs');

const OAS_PATH = 'resources/ah-txms-rh-oas.yaml'
const CONFIG_PATH = 'resources/config.json'

const oas = new OASNormalize(
  OAS_PATH, { enablePaths: true }
);

const getByPath = (object, path) => {
  let currentObject = object
  const parts = path.split(".")
  for (const part of parts) {
      currentObject = currentObject[part]
      if (!currentObject) {
          throw new Error("path not found: " + part)
      }
  }
  return currentObject
}

const {objectPath, propertiesToRemove} = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'))


oas
  .validate()
  .then(schema => {

    const responseObject = getByPath(schema, objectPath)
    console.log(JSON.stringify(responseObject))

    var convertedSchema = toJsonSchema(responseObject);
    // console.log(JSON.stringify(convertedSchema));
  })
  .catch(err => {
    console.log(err);
  });

