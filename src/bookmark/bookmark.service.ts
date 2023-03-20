import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookMarkDto, EditBookMarkDto } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) { }
    getBookMarks(userId: number) {
        return this.prisma.bookMark.findMany({
            where: {
                userId
            }
        })
    }
    getBookMarkById(userId: number, bookMarkId: number) {
        return this.prisma.bookMark.findFirst({
            where: {
                id: bookMarkId,
                userId,
            },
        });
    }
    async createBookMark(userId: number, dto: CreateBookMarkDto) {
        const bookmark =
            await this.prisma.bookMark.create({
                data: {
                    userId,
                    ...dto,
                },
            });

        return bookmark;
    }
    async editBookMarkById(userId: number, bookMarkId: number, dto: EditBookMarkDto) {
        const bookmark =
            await this.prisma.bookMark.findFirst({
                where: {
                    id: bookMarkId,
                    userId
                },
            });

        if (!bookmark)
            throw new ForbiddenException(
                'Access to resources denied',
            );

        return this.prisma.bookMark.update({
            where: {
                id: bookMarkId,
            },
            data: {
                ...dto,
            },
        });
    }
    async deleteBookMarkById(userId: number, bookMarkId: number) {
        const bookmark =
            await this.prisma.bookMark.findUnique({
                where: {
                    id: bookMarkId,

                },
            });

        if (!bookmark || bookmark.userId !== userId)
            throw new ForbiddenException(
                'Access to resources denied',
            );

        await this.prisma.bookMark.delete({
            where: {
                id: bookMarkId,
            },
        });
    }
}
