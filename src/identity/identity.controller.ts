import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { IdentityService } from './identity.service';
import { CreateIdentityDTO, CreateIdentityResponseDTO } from './identity-dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Identity')
@Controller('identity')
export class IdentityController {
  private readonly logger = new Logger(IdentityController.name);
  constructor(private readonly identityService: IdentityService) {}

  @Post('/')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiBody({ type: CreateIdentityDTO, required: true })
  @ApiOkResponse({
    type: CreateIdentityResponseDTO,
    isArray: false,
    description: 'response of creating identity looks like this'
  })
  async createIdentity(
    @Res() res: Response,
    @Body() payload: CreateIdentityDTO,
  ): Promise<any> {
    this.logger.log('inside identity API endpoint');
    const response = await this.identityService.createIdentity(payload);

    if (response?.contact) {
      return res.status(HttpStatus.CREATED).send(response);
    }
    return res.status(HttpStatus.BAD_REQUEST).send(response);
  }
}
