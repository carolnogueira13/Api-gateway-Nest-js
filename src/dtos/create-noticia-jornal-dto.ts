import { IsString, IsOptional, IsInt, MaxLength, IsDateString } from "class-validator";

export class CreateNoticiaJornalDto {
    
    @IsDateString()
    @IsOptional()
    noticia_jornal_data: Date;

    @IsString()
    @IsOptional()
    @MaxLength(300)
    noticia_jornal_descricao: string;
}