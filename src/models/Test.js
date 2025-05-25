// This is just a boiler class to know how things work

import { Model } from "objection";

export default class Test extends Model {
  static tableName = "test";
  // add static jsonSchema, relationMappings, etc as needed
}
