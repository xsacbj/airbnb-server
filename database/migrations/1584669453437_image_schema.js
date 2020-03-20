"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ImageSchema extends Schema {
  up() {
    this.table("images", table => {
      table.renameColumn("propery_id", "property_id");
    });
  }

  down() {
    this.table("images", table => {
      table.renameColumn("property_id", "propery_id");
    });
  }
}

module.exports = ImageSchema;
