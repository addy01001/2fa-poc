import { IsNotEmpty } from "class-validator";

export class GenerateSecret {
    @IsNotEmpty()
    userId: string
}

export class CodeVerify {
    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    userId: string
}