/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2105053228")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.org_ids.id ?= org_id.id && @request.auth.permission_level > 2",
    "deleteRule": "@request.auth.org_ids.id ?= org_id.id && @request.auth.permission_level > 2",
    "listRule": "@request.auth.org_ids.id ?= org_id.id && @request.auth.permission_level > 1",
    "updateRule": "@request.auth.org_ids.id ?= org_id.id && @request.auth.permission_level > 2",
    "viewRule": "@request.auth.org_ids.id ?= org_id.id && @request.auth.permission_level > 1"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2105053228")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.org_id.id ?= org_id.id && @request.auth.permission_level > 2",
    "deleteRule": "@request.auth.org_id.id ?= org_id.id && @request.auth.permission_level > 2",
    "listRule": "@request.auth.org_id.id ?= org_id.id && @request.auth.permission_level > 1",
    "updateRule": "@request.auth.org_id.id ?= org_id.id && @request.auth.permission_level > 2",
    "viewRule": "@request.auth.org_id.id ?= org_id.id && @request.auth.permission_level > 1"
  }, collection)

  return app.save(collection)
})
