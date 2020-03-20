"use strict";

const Property = use("App/Models/Property");

class PropertyController {
  async index({ request, response, view }) {
    const { latitude, longitude } = request.all();

    const properties = await Property.query()
      .with("images")
      .nearBy(latitude, longitude, 10)
      .fetch();

    return properties;
  }

  async store({ request, response, auth }) {
    const { id } = auth.user;
    const data = request.only([
      "title",
      "address",
      "latitude",
      "longitude",
      "price"
    ]);
    const property = await Property.create({ ...data, user_id: id });

    return property;
  }

  async show({ params, request, response, view }) {
    const property = await Property.findOrFail(params.id);
    await property.load("images");
    return property;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response, auth }) {
    const property = await Property.findOrFail(params.id);

    if (property.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Not authorzed" });
    }
  }
}

module.exports = PropertyController;
