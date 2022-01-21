import { createSharedComposable } from '@vueuse/core'
import { useCheckHasLocalStorageItem } from '~/composables/storage'

const isLogin = () => useCheckHasLocalStorageItem('user')

export const useIsLogin = createSharedComposable(isLogin)
