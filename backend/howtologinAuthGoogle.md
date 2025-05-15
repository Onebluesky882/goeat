## nest g auth

\*\* node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
for get secret password

create file auth/google.strategy.ts

```typescript
import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { name, emails, photos } = profile;
    return {
      email: emails[0].value,
      name: name.givenName,
      picture: photos[0].value,
    };
  }
}
```

## AuthService (with Drizzle insert)
