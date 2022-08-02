import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

const Toast2 = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
});


@Injectable({
  providedIn: 'root'
})

export class SwalService {
    
    constructor() { }
    
    public errorTopEnd(msg: string = '') { 
        Toast2.fire({
            title: msg,
            icon: 'error'
        });
    }

    public centeredConfirm(callback: any, title: string = '', text: string = '', icon: any = '', 
    allowEscapeKey: boolean = false, allowOutsideClick: boolean = false, showCancelButton: boolean = false,
    confirmButtonText: string = 'OK', cancelButtonText: string = 'Cancel') { 
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            allowEscapeKey: allowEscapeKey,
            allowOutsideClick: allowOutsideClick,
            showCancelButton: showCancelButton,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        }).then((response: any) => {
            if (response.value) {
                callback();
            } 
        });
    }
}