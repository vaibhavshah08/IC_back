import { Body, Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { promises } from 'fs';
import multer from 'multer';
import * as fs from 'fs';
import { File } from 'fs-extra';
import { Express, Response } from 'express'
import { FileService } from './file.service';
import { AuthGuard } from 'src/guards/auth.guards';
import * as path from 'path';

@UseGuards(AuthGuard)
@Controller('insta_cmd')
export class FileController {
    constructor(private readonly service2:FileService){}
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any,@Res() res: Response) {
        console.log(file)
        console.log(body.prompt)
        const filecontent = await fs.promises.readFile(file.path, 'utf-8');
        const content = await this.service2.getModelAnswer(filecontent,body.prompt)
        const download = `modified_${file.originalname}`
        const uploadFolderPath = path.join(process.cwd(), 'uploads'); // Construct upload folder path
        const downloadFilePath = path.join(uploadFolderPath, download);
        await fs.promises.writeFile(downloadFilePath,content,'utf-8')
        const data = {
            content: content,
            filename:download
        }
        res.json(data);
        await fs.promises.unlink(file.path);
        await fs.promises.unlink(downloadFilePath);

    }

    @Post('/viewfile')
    @UseInterceptors(FileInterceptor('file'))
    async viewFile(@UploadedFile() file: Express.Multer.File,@Res() res: Response) {
        console.log(file)
        const fileContent = await fs.promises.readFile(file.path, 'utf-8');
        const data = {
            content: fileContent
        }
        res.json(data);
        await fs.promises.unlink(file.path);
    }
}


