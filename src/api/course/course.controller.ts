import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('course')
export class CourseController {
    @UseGuards(AuthGuard)
    @Get()
    getAll(@Res() response: Response ) {
        
        response.status(200).json({
            message: 'Courses list',
            list: []
        });        
    }
}
