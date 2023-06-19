import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
  ],
  controllers: [CourseController]
})
export class CourseModule {}
