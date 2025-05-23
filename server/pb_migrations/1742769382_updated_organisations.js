/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1053844701")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "@request.auth.org_id.id ?= id && @request.auth.permission_level > 3",
    "listRule": "@request.auth.org_id.id ?= id",
    "updateRule": "@request.auth.org_id.id ?= id && @request.auth.permission_level > 3",
    "viewRule": "@request.auth.org_id.id ?= id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1053844701")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
