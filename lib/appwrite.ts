import { CreateUserParams, GetMenuParams, MenuItem, SignInParams, User } from '@/type';
import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

//agregamos ! final de la variable para indicar que no es nulo
export const appWriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    database: "68af1c0f00253c4c0c1f",
    bucketId: "68b1bda90008bc32ee10",
    platform: "com.mrc.foorder",
    userCollectionId: "68af1c6c001f4bec27e3",
    categorieCollectionId: "68b1b7c700308cc4a37f",
    menuCollectionId: "68b1b88000288527cd14",
    customizationCollectionId: "68b1babd00203cc14663",
    menuCustomizationCollectionId: "68b1bc0500276fa2a90f",
}

export const client = new Client();

client
    .setEndpoint(appWriteConfig.endpoint)
    .setProject(appWriteConfig.projectId)
    .setPlatform(appWriteConfig.platform)

export const account = new Account(client);

export const db = new Databases(client);

export const storage = new Storage(client);

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

export const getMenu = async ({ category, query }: GetMenuParams) => {

    try {
        const queries: string[] = []

        if (category) queries.push(Query.equal('categories', category));

        if (query) queries.push(Query.search('name', query));

        //se agregdo MenuItem
        const menu = await db.listDocuments<MenuItem>({
            databaseId: appWriteConfig.database,
            collectionId: appWriteConfig.menuCollectionId,
            queries: queries
        })

        return menu.documents;

    } catch (error) {
        throw new Error(error as string)
    }
}

export const getCategories = async () => {
    try {
        const categories = await db.listDocuments(
            {
                databaseId: appWriteConfig.database,
                collectionId: appWriteConfig.categorieCollectionId,

            }


        )

        return categories.documents;
    } catch (error) {
        throw new Error(error as string)
    }
}