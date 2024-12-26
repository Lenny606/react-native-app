import {Account, Avatars, Client, Databases, OAuthProvider, Query} from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import {openAuthSessionAsync} from "expo-web-browser";
import * as querystring from "node:querystring";

export const config = {
    platform: 'react-native-app',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    agentsId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_ID,
    galeriesId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_ID,
    reviewsId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_ID,
    propertiesId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_ID,
}

export const client = new Client()

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform);

export const avatar = new Avatars(client)
export const account = new Account(client)
export const databases = new Databases(client)

export async function login() {
    try {
        const redirect = Linking.createURL('/')

        //provider from appwrite
        const response = account.createOAuth2Token(OAuthProvider.Google, redirect)

        if (!response) {
            throw new Error('Failed to login')
        }
        const browserResult = await openAuthSessionAsync(response.toString(), redirect)

        if (browserResult.type != 'success') {
            throw new Error('Failed to login')
        }

        const url = new URL(browserResult.url)
        const secret = url.searchParams.get('secret')?.toString()
        const userId = url.searchParams.get('userId')?.toString()

        if (!secret || !userId) {
            throw new Error('Failed to login')
        }

        const session = await account.createSession(userId, secret)

        if (!session) {
            throw new Error('Failed to login')
        }

        return session //or true
    } catch (e) {
        console.error(e)
        return false
    }
}

export async function logout() {
    try {
        await account.deleteSession('current')
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

export async function getUser() {
    try {
        const user = await account.get()

        if (user.$id) {
            const avatarUser = avatar.getInitials(user.name)

            return {
                ...user,
                avatar: avatarUser.toString()
            }
        }

    } catch (e) {
        console.error(e)
        return false
    }
}

export async function getLatestsProperites() {
    try {
        const results = await databases.listDocuments(
            config.databaseId!,
            config.propertiesId!,
            [Query.orderAsc('$createdAt'), Query.limit(5)]
        )
        return results.documents
    } catch (e) {
        console.error(e)
    }
}

export async function getProperites({filter, query, limit} : {
    filter?: string,
    query?: string,
    limit?: number,
}) {
    try {

        const queryBuild = [Query.orderDesc('$createdAt')]

        if (filter && filter !== "All") {
            queryBuild.push(Query.equal('type', filter))
        }

        if (query) {
            queryBuild.push(Query.or([
                Query.search("name", query),
                Query.search("address", query),
                Query.search("type", query)
            ]))
        }

        if(limit) {
            queryBuild.push(Query.limit(limit))
        }

        const results = await databases.listDocuments(
            config.databaseId!,
            config.propertiesId!,
            queryBuild
        )
        return results.documents

    } catch (e) {
        console.error(e)
    }
}