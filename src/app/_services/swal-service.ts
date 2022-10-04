import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '@auth0/auth0-angular';
import { cibWindows } from '@coreui/icons';


const toast_end = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true
});

const toast_centered = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
});


@Injectable({
  providedIn: 'root'
})

export class SwalService {
    
    constructor(private authService: AuthService) { }

    public commonSwalEnd(msg: string = '', icon: any = '') {
        toast_end.fire({
            title: msg,
            icon: icon
        });
    }
    
    public commonSwalCentered(msg: string = '', icon: any = 'success') { 
        toast_centered.fire({
            title: msg,
            icon: icon
        });
    }

    public centeredConfirm(logOut: boolean = false, callback: any, title: string = '', text: string = '', icon: any = '', 
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
                if (logOut) {
                    localStorage.removeItem('aToken');
                    localStorage.removeItem('userData');
                    this.authService.logout({returnTo: window.location.origin});
                }
                else {
                    callback();
                }
            }
        });
    }

    public swalLoading(msg: string = '') {
        Swal.fire({
            title: msg,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen() {
                Swal.showLoading()
            }
        });
    }

    public swalRegForm() {
        Swal.fire({
            focusConfirm: false,
            allowOutsideClick: false,
            showCloseButton: true,
            html:
            '<div class="swalReg">' +
            '<input id="fname" class="swal2-input" placeholder="Firstname">' +
            '<input id="mname" class="swal2-input" placeholder="Middlename">' +
            '<input id="lname" class="swal2-input" placeholder="Lastname">' +
            '<input id="email" type="email" class="swal2-input" placeholder="Email Address">' + 
            '</div>',
            confirmButtonColor: '#3085d6',
            //customClass: 'swalReg',
            confirmButtonText: 'Register New User'

        })
    }
}