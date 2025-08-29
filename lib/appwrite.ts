import { CreateUserParams, SignInParams, User } from '@/type';
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

//agregamos ! final de la variable para indicar que no es nulo
export const appWriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    database: "68af1c0f00253c4c0c1f",
    platform: "com.mrc.foorder",
    userCollectionId: "68af1c6c001f4bec27e3",
}

export const client = new Client();

client
    .setEndpoint(appWriteConfig.endpoint)
    .setProject(appWriteConfig.projectId)
    .setPlatform(appWriteConfig.platform)

export const account = new Account(client);

export const db = new Databases(client);

const avatars = new Avatars(client);


export const createUser = async ({ name, email, password }: CreateUserParams) => {
    try {

        const newAccount = await account.create(
            {
                userId: ID.unique(),
                name: name,
                email: email,
                password: password
            }
        );

        if (!newAccount) throw Error;

        await signIn({ email, password });

        const avatarsUrl: URL = avatars.getInitialsURL(name)

        const newUser = await db.createDocument({
            databaseId: appWriteConfig.database,
            collectionId: appWriteConfig.userCollectionId,
            documentId: ID.unique(),
            data: {
                accountId: newAccount.$id,
                email, name, avatars: avatarsUrl
            },

        })

        return newUser;

    } catch (error) {
        throw new Error(error as string)
    }
}


export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession({ email: email, password: password });
    } catch (error) {
        throw new Error(error as string)
    }
}

export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw Error;

        // 👇 ya tipamos para que Appwrite sepa que documentos son de tipo User
        const currentUser = await db.listDocuments<User>({
            databaseId: appWriteConfig.database,
            collectionId: appWriteConfig.userCollectionId,
            queries: [Query.equal('accountId', currentAccount.$id)]
        })

        if (!currentUser || currentUser.documents.length === 0) throw Error;


        return currentUser.documents[0]


    } catch (error) {


        throw new Error(error as string)
    }
}