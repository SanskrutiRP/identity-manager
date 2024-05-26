import { Injectable, Logger } from '@nestjs/common';
import {
  getAllSecondaryContacts,
  getPrimaryContact,
  getResponse,
} from './identity.helper';
import { Contact } from 'src/db/models/contact';

@Injectable()
export class IdentityService {
  private readonly logger = new Logger(IdentityService.name);

  async createIdentity(payload) {
    try {
      this.logger.debug(`creating identity request:: ${payload}`);

      const { email, phoneNumber } = payload;

      const { primary, secondary, errors } = await getPrimaryContact(payload);

      if (errors) {
        return errors;
      }

      if (primary?.id && !secondary) {
        const createIdentityPayload = {
          email: email.toLowerCase(),
          phoneNumber: phoneNumber,
          linkPrecedence: 'secondary',
          linkedId: primary?.id,
        };

        await Contact.query().insert(createIdentityPayload);

        const { data } = await getAllSecondaryContacts(primary?.id);

        const response = getResponse([...data, primary], primary?.id);

        this.logger.debug(`creating identity response:: ${response}`);
        return {
          contact: response,
        };
      }

      if (primary && secondary) {
        await Contact.query().findById(secondary?.id).patch({
          linkedId: primary?.id,
          linkPrecedence: 'secondary',
        });

        const { data } = await getAllSecondaryContacts(primary?.id);

        const response = getResponse([...data, primary], primary?.id);

        this.logger.debug(`creating identity response:: ${response}`);
        return {
          contact: response,
        };
      }
      const createIdentityPayload = {
        email,
        phoneNumber,
      };

      const identity = await Contact.query().insert(createIdentityPayload);

      const response = getResponse([identity], -1);

      this.logger.debug(`creating identity response:: ${response}`);
      return {
        contact: response,
      };
    } catch (error) {
      this.logger.error(`identity manager:: ${error.message}`);

      return {
        errors: [
          {
            type: 'identity',
            message: 'something went wrong',
          },
        ],
      };
    }
  }
}
