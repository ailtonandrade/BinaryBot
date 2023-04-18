import { enc, MD5 } from 'crypto-js';

class Auxiliar {

    formatOnlyChars(val: string) {
        return val.replaceAll("  ", " ").replace(/[^a-zA-Z\s]/g, "");
    };
    formatOnlyCharsAndNumbers(val: string) {
        return val.replaceAll(" ", "").replace(/[^\w\s]/gi, "");
    };
    formatOnlyCharsNumbersAndWhiteSpace(val: string) {
        return val.replaceAll("  ", " ").replace(/[^\w\s]/gi, "");
    };
    formatToPhone(val: string) {
        // Remove todos os caracteres não numéricos
        val = val.replace(/\D/g, '');

        if (val.length === 10) {
            // Formato: (11) 2345-6789
            return '(' + val.slice(0, 2) + ') ' + val.slice(2, 6) + '-' + val.slice(6);
        } else if (val.length === 11) {
            // Formato: (11) 9 8765-4321
            return '(' + val.slice(0, 2) + ') ' + val.slice(2, 3) + ' ' + val.slice(3, 7) + '-' + val.slice(7);
        } else {
            // Não foi possível formatar o número
            return val;
        }
    };
    formatOnlyNumbers(val: string) {
        return val.replace(/\D/g, "");
    };
    formatToDoc(val: string) {
        if (val.toLowerCase().endsWith("x")) {
            val = val.slice(0,13);
            val = val.replace(/^(\d{3})(\d{3})(\d{3})([xX\d])$/, "$1.$2.$3-$4");
            return val;
        }
        else {
            val = val.replace(/\D/g, ""); 
            val = val.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"); 
            return val;
        }

    };
    validate(p: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(p);
    }
    validateDocCharMatches(val : string){
        const DocXmatches = val.match(/x/g);
        return DocXmatches?.length ? DocXmatches?.length : 0;
    }

    getHashUser(user: { username: string, password: string }) {
        user.password = MD5(user.password).toString(enc.Hex);
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
        acc.Password = MD5(acc.Password).toString(enc.Hex);
        return acc;
    }
}
export default new Auxiliar();
