import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HelpersService {
    constructor() {}

    maskPhone(phone: string): string {
        if (phone.length === 10) {
            return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
        return phone;
    }

    valueBoolean(value: boolean): 'SI' | 'NO' {
        if (value) {
            return 'SI';
        } else {
            return 'NO';
        }
    }
}
