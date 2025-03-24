/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.org_ids.id ?= org_id.id && @request.auth.permission_level > 1",
    "deleteRule": "@request.auth.org_ids.id ?= org_id.id && @request.auth.permission_level > 1",
    "listRule": "@request.auth.org_id.id ?= org_id.id",
    "updateRule": "@request.auth.org_ids.id ?= org_id.id && @request.auth.permission_level > 1",
    "viewRule": "@request.auth.org_ids.id ?= org_id.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // update collection data
  unmarshal({
    "createRule": "org_id.id = @request.auth.org_id && @request.auth.permission_level > 1",
    "deleteRule": "org_id.id = @request.auth.org_id && @request.auth.permission_level > 1",
    "listRule": "org_id.id = @request.auth.org_id",
    "updateRule": "org_id.id = @request.auth.org_id && @request.auth.permission_level > 1",
    "viewRule": "org_id.id = @request.auth.org_id"
  }, collection)

  return app.save(collection)
})
