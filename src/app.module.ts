import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityController } from './identity/identity.controller';
import { IdentityService } from './identity/identity.service';
import { IdentityModule } from './identity/identity.module';
import { DatabaseModule } from './db/db.module';

@Module({
  imports: [IdentityModule, DatabaseModule],
  controllers: [AppController, IdentityController],
  providers: [AppService, IdentityService],
})
export class AppModule {}
