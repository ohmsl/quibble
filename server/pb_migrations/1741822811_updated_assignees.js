/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1995438148")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3572739349",
    "hidden": false,
    "id": "relation1972884478",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "member_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1995438148")

  // remove field
  collection.fields.removeById("relation1972884478")

  return app.save(collection)
})
