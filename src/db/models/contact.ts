import { Model } from 'objection';

export class Contact extends Model {
  id: number;
  phoneNumber: string;
  email: string;
  linkedId: number;
  linkPrecedence: string;
  deletedAt: string;
  static get tableName() {
    return 'contact';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email'],
      properties: {
        phone_number: { type: 'string' },
        email: { type: 'string' },
      },
    };
  }
}
