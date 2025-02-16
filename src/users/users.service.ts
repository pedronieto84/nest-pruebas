import { Injectable } from '@nestjs/common';
import { InjectFirestoreCollection } from '@nestjs/firestore';
import { CollectionReference } from '@google-cloud/firestore';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectFirestoreCollection('users')
    private usersCollection: CollectionReference<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const snapshot = await this.usersCollection.get();
    return snapshot.docs.map(doc => doc.data());
  }

  async create(user: User): Promise<User> {
    const docRef = await this.usersCollection.add(user);
    const doc = await docRef.get();
    return doc.data() as User;
  }
}
