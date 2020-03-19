"use strict";

const Property = use("App/Models/Property");

class PropertyController {
  async index({ request, response, view }) {
    const properties = await Property.all();

    return properties;
  }

  async store({ request, response }) {}

  async show({ params, request, response, view }) {
    const property = await Property.findOrFail(params.id);
    await property.load("images");
    return property;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = PropertyController;
