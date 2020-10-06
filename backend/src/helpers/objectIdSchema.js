/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import * as Yup from 'yup';
import { ObjectId } from 'bson';

class ObjectIdSchema extends Yup.mixed {
  constructor() {
    super({ type: 'objectId' });

    this.withMutation(schema => {
      schema.transform(function(value) {
        if (this.isType(value)) return value;
        return new ObjectId(value);
      });
    });
  }

  _typeCheck(value) {
    return ObjectId.isValid(value);
  }
}

Yup.objectId = () => new ObjectIdSchema();
