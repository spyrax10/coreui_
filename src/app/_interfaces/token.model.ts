import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class TokenModel {

    constructor() {}
    private access_token: string;

    public get_accessToken(): string {
        return this.access_token;
    }
    public set_accessToken(value: string) {
        this.access_token = value;
    }
}