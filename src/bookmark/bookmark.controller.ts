import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookMarkDto, EditBookMarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor(private bookMarkService: BookmarkService) { }


    @Get()
    getBookMarks(@GetUser('id') userId: number) {
        return this.bookMarkService.getBookMarks(userId)
    }
    @Get(':id')
    getBookMarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookMarkId: number) {
        return this.bookMarkService.getBookMarkById(userId, bookMarkId)
    }
    @Post()
    createBookMark(@GetUser('id') userId: number, @Body() dto: CreateBookMarkDto) {
        return this.bookMarkService.createBookMark(userId, dto)
    }
    @Patch(':id')
    editBookMarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookMarkId: number, @Body() dto: EditBookMarkDto) {
        return this.bookMarkService.editBookMarkById(userId, bookMarkId, dto)

    }
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookMarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookMarkId: number) {
        return this.bookMarkService.deleteBookMarkById(userId, bookMarkId)

    }

}
