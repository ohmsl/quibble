/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2105053228")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.org_id.id ?= org_id.id && @request.auth.permission_level > 2",
    "deleteRule": "@request.auth.org_id.id ?= org_id.id && @request.auth.permission_level > 2",
    "listRule": "@request.auth.org_id.id ?= org_id.id && @request.auth.permission_level > 1",
    "updateRule": "@request.auth.org_id.id ?= org_id.id && @request.auth.permission_level > 2",
    "viewRule": "@request.auth.org_id.id ?= org_id.id && @request.auth.permission_level > 1"
  }, collection)

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1053844701",
    "hidden": false,
    "id": "relation4102257691",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "org_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation2809058197",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2105053228")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  // remove field
  collection.fields.removeById("relation4102257691")

  // remove field
  collection.fields.removeById("relation2809058197")

  return app.save(collection)
})
