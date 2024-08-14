import { comparePassword, hashePassword } from '@/lib/bcrypt';
import { prismaMock } from '../prisma';
import request from 'supertest';
import App from '@/app';
import { User } from '@prisma/client';

comparePassword;

jest.mock('@/lib/bcrypt');

const requestBody = {
  email: 'mock@mail.com',
  password: 'Admin123',
};

const user: User = {
  id: 1,
  name: 'Mock user',
  email: 'mock@mail.com',
  password: 'hashedPassword',
  provider: 'CREDENTIALS',
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeAll(() => {
  //ini bakalan dijalankan sebelum testing pertama dijalankan
});

beforeEach(() => {
  //ini bakalan jalan sebelum setiap test
});

afterEach(() => {
  //ini bakalan jalan setelah setiap test
});

afterAll(() => {
  //ini bakalan dijalankan setelah testing terakhir
});

describe('POST /api/auth/login', () => {
  const { app } = new App();
  it('should login user successfully', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(user);

    (comparePassword as jest.Mock).mockResolvedValueOnce(true);

    const response = await request(app)
      .post('/api/auth/login')
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return error if email does not exist', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);
    const response = await request(app)
      .post('/api/auth/login')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Invalid Email Address');
  });

  it('should return error if password not match', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(user);

    (comparePassword as jest.Mock).mockResolvedValueOnce(false);

    const response = await request(app)
      .post('/api/auth/login')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Incorrect Password');
  });

  describe('POST /api/auth/register', () => {
    const { app } = new App();

    it('should register user successfully', async () => {
      prismaMock.user.findFirst.mockResolvedValueOnce(null);

      (hashePassword as jest.Mock).mockResolvedValueOnce('hashedPassword');
      prismaMock.user.create.mockResolvedValueOnce(user);

      const response = await request(app)
        .post('/api/auth/register')
        .send(requestBody);

      expect(response.status).toBe(200);
      expect(response.body.id).toBeDefined();
      expect(response.body.name).toBeDefined();
    });
  });

  it('should return error if email already exist', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(user);

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Email already exist');
  });
});
