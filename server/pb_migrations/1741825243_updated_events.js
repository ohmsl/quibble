/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2105053228",
    "hidden": false,
    "id": "relation2942447224",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "requiredRoles",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // remove field
  collection.fields.removeById("relation2942447224")

  return app.save(collection)
})
