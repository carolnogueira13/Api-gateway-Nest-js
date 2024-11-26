import { Body, Controller, Get, Logger, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UpdateUsuarioEnderecoDto } from './dtos/update-usuario-endereco-dto';


@Controller('api/v1')
export class AppController {
    private logger = new Logger(AppController.name)
    private clienteAdminBackend: ClientProxy
    constructor(){
    this.clienteAdminBackend = ClientProxyFactory.create({
      
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:123456@10.136.62.147:5672/arquivoprojetormq'],
        queue: 'admin-backend'
      }
    })
    }
    @Put('endereco/:id')
    @UsePipes(ValidationPipe)
    async atualizarEndereco(@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioEnderecoDto: UpdateUsuarioEnderecoDto){
      await this.clienteAdminBackend.emit('atualizar-usuario-endereco', { id, ...updateUsuarioEnderecoDto});
      this.logger.log(`endereco enviado: ${JSON.stringify({id, ...updateUsuarioEnderecoDto})}`)
    }
  }

