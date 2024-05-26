import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsMobilePhone,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIdentityDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'abc@gmail.com',
    description: 'email',
  })
  email: string;

  @IsNumber()
  @IsMobilePhone('en-IN')
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '9876543210',
    description: 'phoneNumber',
  })
  phoneNumber: string;
}

class IdentityDTO {
  @ApiProperty({
    name: 'primaryContactId',
    example: 1,
  })
  primaryContactId: number;

  @ApiProperty({
    name: 'emails',
    example: ['abc@gmail.com', 'xyz@gmail.com']
  })
  emails: string[];

  @ApiProperty({
    name: 'phoneNumbers',
    example: [1,2]
  })
  phoneNumbers: number[];

  @ApiProperty({
    name: 'secondaryContactIds',
    example: [2,3]
  })
  secondaryContactIds: number[];
}
export class CreateIdentityResponseDTO {
  @ApiProperty({ type: () => [IdentityDTO] })
  contact: [IdentityDTO];
}
