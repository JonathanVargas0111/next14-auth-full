import {User} from '@auth/client'

declare module "next-auth"{
    interface Session{
        user: User
    }
}

