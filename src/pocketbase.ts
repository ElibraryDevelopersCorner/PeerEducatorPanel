import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase('https://peersangli.pockethost.io');

export const currentUser = writable(pb.authStore.model)

pb.authStore.onChange((auth) => {
    console.log(auth)
    currentUser.set(pb.authStore.model)
}) 