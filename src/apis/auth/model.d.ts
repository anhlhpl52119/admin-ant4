type LoginRequestBody = {
    email: string;
    password: string;
}

type LoginResponse = {
    user: {
        id: string;
        email: string;
        name: string;
    }
}
