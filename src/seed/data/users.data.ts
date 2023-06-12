import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/enums/user-role.enum';

export const UsersData: CreateUserDto[] = [
  {
    name: 'José Jesús Gómez Delgado',
    email: 'jjesusgomezdelgado@gmail.com',
    password: 'Abc123',
    role: UserRole.Admin,
    isActive: true,
  },
  {
    name: 'Profesor',
    email: 'profesor@example.com',
    password: 'Profesor123',
    role: UserRole.Admin,
    isActive: true,
  },
];
