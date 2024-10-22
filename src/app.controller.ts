import { Body, Controller, Get, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateNoticiaJornalDto } from './dtos/create-noticia-jornal-dto';

@Controller('api/v1')
export class AppController {
    private logger = new Logger(AppController.name)
    private clienteAdminBackend: ClientProxy
    constructor(){
    this.clienteAdminBackend = ClientProxyFactory.create({
      
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:123456@localhost:5672/arquivoprojetormq'],
        queue: 'admin-backend'
      }
    })
    }
    @Post('noticias')
    @UsePipes(ValidationPipe)
    async criarEmpresa(@Body() criarNoticiaJornalDto: CreateNoticiaJornalDto){
      await this.clienteAdminBackend.emit('criar-noticia', criarNoticiaJornalDto);
      this.logger.log(`noticia enviada: ${JSON.stringify(criarNoticiaJornalDto)}`)
    }

  }

