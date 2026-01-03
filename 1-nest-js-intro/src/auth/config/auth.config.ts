import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN ?? '3600', 10),
  jwtAudience: process.env.JWT_AUDIENCE,
  jwtIssuer: process.env.JWT_ISSUER,
}));
