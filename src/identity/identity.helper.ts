import { Logger } from '@nestjs/common';
import { Contact } from 'src/db/models/contact';

const logger = new Logger('helper');
export const getPrimaryContact = async (payload): Promise<any | Contact> => {
  try {
    const { email, phoneNumber } = payload;

    const primaryContact = await Contact.query()
      .where((builder) => {
        builder.orWhere('email', email).orWhere('phoneNumber', phoneNumber);
      })
      .where('linkPrecedence', 'primary')
      .orderBy('created_at', 'ASC');

    if (primaryContact.length) {
      const [primary, secondary] = primaryContact;
      return {
        primary: primary,
        secondary: secondary,
      };
    }

    return {
      primary: {},
    };
  } catch (error) {
    logger.error(error.message);

    return {
      errors: [
        {
          type: 'getPrimaryContact',
          message: 'failed to get primary contact',
        },
      ],
    };
  }
};

export const getAllSecondaryContacts = async (id) => {
  try {
    const allSecondaries = await Contact.query().where('linkedId', id);

    return {
      data: allSecondaries,
    };
  } catch (error) {
    logger.error(error.message);

    return {
      errors: [
        {
          type: 'getAllSecondaryContacts',
          message: 'something went wrong while fetching the contacts',
        },
      ],
    };
  }
};

export const getResponse = (contacts, primaryId) => {
  if (primaryId == -1) {
    const [{ id, phoneNumber, email }] = contacts;
    return {
      primaryContatctId: id,
      emails: [email],
      phoneNumbers: [phoneNumber],
      secondaryContactIds: [],
    };
  }

  const emails = new Set();
  const phoneNumbers = new Set();
  const secondaryContactIds = new Set();

  contacts.map((contact) => {
    const { email, phoneNumber, id } = contact;
    emails.add(email);
    phoneNumbers.add(phoneNumber);
    if (id !== primaryId) secondaryContactIds.add(id);
  });

  return {
    primaryContactId: primaryId,
    emails: [...emails],
    phoneNumbers: [...phoneNumbers],
    secondaryContactIds: [...secondaryContactIds],
  };
};
