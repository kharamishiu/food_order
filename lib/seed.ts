import { ID } from "react-native-appwrite";
import { appWriteConfig, db, storage } from "./appwrite";
import dummyData from "./data";




interface Category {
    name: string;
    description: string;
}

interface Customization {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    categories: string;
    menuCustomizations: string[]; // list of customization names
}

interface DummyData {
    categories: Category[];
    customizations: Customization[];
    menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

async function clearAll(collectionId: string): Promise<void> {
    const list = await db.listDocuments(
        {
            databaseId: appWriteConfig.database,
            collectionId: collectionId
        }
    );

    await Promise.all(
        list.documents.map((doc) =>
            db.deleteDocument(appWriteConfig.database, collectionId, doc.$id)
        )
    );
}

async function clearStorage(): Promise<void> {
    const list = await storage.listFiles({ bucketId: appWriteConfig.bucketId });

    await Promise.all(
        list.files.map((file) =>
            storage.deleteFile(appWriteConfig.bucketId, file.$id)
        )
    );
}

async function uploadImageToStorage(imageUrl: string) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const fileObj = {
        name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
        type: 'image/png',//blob.type,
        size: blob.size,
        uri: imageUrl,
    };

    const file = await storage.createFile(
        appWriteConfig.bucketId,
        ID.unique(),
        fileObj
    );

    return storage.getFileViewURL(appWriteConfig.bucketId, file.$id);
}

//sirve solo dede web ya que react native no soporta en tiempo
//de ejecucion new Blob([ArrayBuffer])
/*
export async function uploadImageToStorage(imageUrl: string) {
    try {
        // 1. Descargar como arrayBuffer
        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();

        // 2. Convertir a un Blob
        const type = response.headers.get("content-type") || "application/octet-stream";
        const blob = new Blob([buffer], { type });

        // 3. Crear un File-like (Appwrite SDK web lo entiende aunque estés en RN)
        const file = new File(
            [blob],
            imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
            { type }
        );

        // 4. Subir directamente sin guardar en disco
        const uploaded = await storage.createFile(
            appWriteConfig.bucketId,
            ID.unique(),
            file
        );

        return storage.getFileViewURL(appWriteConfig.bucketId, uploaded.$id);
    } catch (err) {
        console.error("Error al subir imagen:", err);
        throw err;
    }
}*/


async function seed(): Promise<void> {
    // 1. Clear all
    await clearAll(appWriteConfig.categorieCollectionId);
    await clearAll(appWriteConfig.customizationCollectionId);
    await clearAll(appWriteConfig.menuCollectionId);
    await clearAll(appWriteConfig.menuCustomizationCollectionId);
    await clearStorage();

    // 2. Create Categories
    const categoryMap: Record<string, string> = {};
    for (const cat of data.categories) {
        const doc = await db.createDocument(
            appWriteConfig.database,
            appWriteConfig.categorieCollectionId,
            ID.unique(),
            cat
        );

        categoryMap[cat.name] = doc.$id;
    }

    // 3. Create Customizations
    const customizationMap: Record<string, string> = {};
    for (const cus of data.customizations) {
        const doc = await db.createDocument(
            appWriteConfig.database,
            appWriteConfig.customizationCollectionId,
            ID.unique(),
            {
                name: cus.name,
                price: cus.price,
                type: cus.type,
            }
        );

        customizationMap[cus.name] = doc.$id;
    }

    // 4. Create Menu Items
    //ver la URL de la imagen ya que ese es el prblema de no carga por el internet al parecer
    const menuMap: Record<string, string> = {};
    for (const item of data.menu) {
        const uploadedImage = await uploadImageToStorage(item.image_url);

        //console.log(uploadedImage);

        const doc = await db.createDocument(
            {
                databaseId: appWriteConfig.database,
                collectionId: appWriteConfig.menuCollectionId,
                documentId: ID.unique(),
                data: {
                    name: item.name,
                    description: item.description,
                    image_url: uploadedImage,
                    price: item.price,
                    rating: item.rating,
                    calories: item.calories,
                    protein: item.protein,
                    categories: categoryMap[item.categories],
                }
            }
        );

        console.log('====================================');
        console.log(item);
        console.log('====================================');

        menuMap[item.name] = doc.$id;

        // 5. Create menu_customizations
        for (const cusName of item.menuCustomizations) {
            await db.createDocument(
                appWriteConfig.database,
                appWriteConfig.menuCustomizationCollectionId,
                ID.unique(),
                {
                    menu: doc.$id,
                    customizations: customizationMap[cusName],
                }
            );
        }
    }

    console.log("✅ Seeding complete.");
}

export default seed;