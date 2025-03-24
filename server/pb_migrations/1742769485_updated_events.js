/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.org_ids.id ?= org_id.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.org_id.id ?= org_id.id"
  }, collection)

  return app.save(collection)
})
