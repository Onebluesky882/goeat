// src/firebase/firebase.module.ts
import { Module } from '@nestjs/common';
import { messaging } from 'src/lib/firebase';

@Module({
  providers: [
    {
      provide: 'FIREBASE_MESSAGING',
      useValue: messaging,
    },
  ],
  exports: ['FIREBASE_MESSAGING'],
})
export class FirebaseModule {}
