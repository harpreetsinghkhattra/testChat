import { Deserialized } from '../utils/deserialized.interface';

export class LoginModel implements Deserialized<LoginModel> {
    public email: string = '';
    public password: string = '';

    deserialized(input: any): LoginModel {
        Object.assign(this, input);
        return this;
    }
}