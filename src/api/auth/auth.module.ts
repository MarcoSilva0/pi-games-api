import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'dev',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  exports: [
    JwtModule.register({
      secret: 'dev',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
})
export class AuthModule {}
