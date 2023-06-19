import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, CourseModule, AuthModule]
})
export class ApiModule {}
