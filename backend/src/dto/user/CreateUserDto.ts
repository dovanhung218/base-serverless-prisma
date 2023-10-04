export class CreateUserDto {
     email:string;
     name?:string;
     password:string;
     constructor(email:string,name:string,password:string){
        this.email=email;
        this.name=name
        this.password=password
     }
}
