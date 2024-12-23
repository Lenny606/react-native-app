import {Account, Avatars, Client, OAuthProvider} from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import {openAuthSessionAsync} from "expo-web-browser";

export const config = {
    platform: 'react-native-app',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client()

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform);

export const avatar = new Avatars(client)
export const account = new Account(client)

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