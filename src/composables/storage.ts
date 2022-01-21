import { createSharedComposable } from '@vueuse/core'
import type { Ref, UnwrapRef } from 'vue'
import { ref } from 'vue'

/**
 * @summary get things from storage as a reactive item.
 * @description if you have times, you can use some state management like `Vuex` or `Pinia`,
 * or just using `inject` + `provide`.
 * I just want it be very stupid ... and want to sleep.
 * Oh, but actually, I think writing these functions is not less than writing a state management code... OwO
 */
const loadFromStorage = <T>(storage: Storage, key: string): Ref<UnwrapRef<T>> | null => {
  const item = storage.getItem(key)
  return item ? ref<T>(JSON.parse(item) as unknown as T) : null
}

const checkHasStorageItem = (storage: Storage, key: string): boolean => !!storage.getItem(key)

export const useLoadFromLocalStorage = createSharedComposable(<T>(key: string) => loadFromStorage<T>(localStorage, key))
export const useCheckHasLocalStorageItem = createSharedComposable((key: string) => checkHasStorageItem(localStorage, key))
export const useLoadFromSessionStorage = createSharedComposable(<T>(key: string) => loadFromStorage<T>(sessionStorage, key))
export const useCheckHasSessionStorageItem = createSharedComposable((key: string) => checkHasStorageItem(sessionStorage, key))
