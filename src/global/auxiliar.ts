import * as bcrypt from 'bcryptjs'


class Auxiliar {
    salt = bcrypt.genSaltSync(10);

     getHashUser(user: { username: string, password: string }) {
        user.password = bcrypt.hashSync(user.password, this.salt);
        return user;
    }
    async getHashAcc(acc: {
        Name: string,
        UserName: string,
        Birthday: string,
        Document: string,
        Phone: string,
        Email: string,
        Password: string
    }) {
        acc.Password = bcrypt.hashSync(acc.Password, this.salt);
        return acc;
    }
}
export default new Auxiliar();
