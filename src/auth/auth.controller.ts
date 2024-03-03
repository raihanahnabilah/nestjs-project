import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  // constructor for the injector/services:
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard('jwt')) // this is like for a guard decorator
  // test(@Req() req) {
  //   console.log(req);
  // }
}


// JWT = JSON Web Tokens -> this is for AUTHORIZE
// open source industry standard
// usable for authorization or secure exchange of information between parties
// verify that the sender is who it/he/she claims
// signed by the issuer, using a secret or keypair

// JWT Structure:
// Consists of three parts:
// 1. Header -> metadata about the token (type, hashing algo)
// 2. Payload -> claims (statements about an entity -- for example, a user) and additional data
// 3. Signature -> the result of the encoded header, the encoded signed against a secret

// Example:
// User "John Doe" signs into our application. We want to create a token which John can authorize for a while
// We create a payload containing the username and role. 
// We then sign the token with an expiry time of 1 hour
// We use a secret for signing

// The process:
// Username payload that has the role IaT (the issued at the time) at which the token has been issued and expiry time for the token
// We then run this payload through a hashing algo using a private key which then generates a JWT


// How to authorize real John Doe?
// John Doe sends request to API -> He wants to delete a task
// In the request headers, we can find a JWT token
// To validate his token, we take the headers and payload, and re-generate the signature using our secret
// We then compare the result signature with the signature in his token

// JWT can be decoded by anyone -> shouldnt contain info such as passwords
// Useful for front-end app to use these tokens to toggle features conditionally
// i.e. if a user is an admin, we could show or hide a certain button based on the claims in the token
// JWT should be short-lived