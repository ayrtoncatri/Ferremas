import { Component } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: User[] = [];
  newUser: User = { username: '', name: '', rut: '', role: '' };
  editingUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  createUser() {
    this.userService.createUser(this.newUser).subscribe(
      (response) => {
        console.log('Usuario creado');
        this.loadUsers();
        this.newUser = { username: '', name: '', rut: '', role: '' };
      },
      (error) => {
        console.error('Error al crear usuario', error);
      }
    );
  }

  updateUser() {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser.id!, this.editingUser).subscribe(
        (response) => {
          console.log('Usuario actualizado');
          this.loadUsers();
          this.editingUser = null;
        },
        (error) => {
          console.error('Error al actualizar usuario', error);
        }
      );
    }
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        console.log('Usuario eliminado');
        this.loadUsers();
      },
      (error) => {
        console.error('Error al eliminar usuario', error);
      }
    );
  }

  editUser(user: User) {
    this.editingUser = { ...user };
  }

  cancelEdit() {
    this.editingUser = null;
  }
}
