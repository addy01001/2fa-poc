import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import * as twofactor from "node-2fa"
import { CodeVerify, GenerateSecret } from './user.validations';
import { JsonDB, Config } from 'node-json-db';
const db = new JsonDB(new Config("myDataBase", true, false, '/'));

@Controller('user')
export class UserController {
    @Post()
    async create(@Body() request: GenerateSecret) {
        let secret = twofactor.generateSecret({ name: "Test App", account: "Joe" })
        await db.push(request.userId, secret.secret)
        return { secret, ...request }
    }

    @Post('verify')
    async verify(@Body() request: CodeVerify) {
        let data = await db.getData(request.userId)
        const result = twofactor.verifyToken(data, request.code)
        if (!result) {
            throw new HttpException("Invalid code", HttpStatus.FORBIDDEN)
        }
        return { status: true }
    }
}
