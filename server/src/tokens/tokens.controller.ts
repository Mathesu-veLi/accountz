import { Controller, Post, Body } from '@nestjs/common';
import { TokenService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokenService) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokensService.create(createTokenDto);
  }
}
