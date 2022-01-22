<template>
  <MagicsHeader />
  <div class="flex justify-center my-6">
    <div class="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
      <p v-if="!(bag?.length ?? false)" class="text-center">
        {{ emptyBagMsg }}
      </p>
      <div v-else class="flex-1">
        <table class="w-full text-sm lg:text-base">
          <thead>
            <tr class="h-12 uppercase">
              <th class="hidden md:table-cell" />
              <th class="text-left">
                Product
              </th>
              <th class="lg:text-right text-left pl-5 lg:pl-0">
                <span class="lg:hidden" title="Quantity">Qtd</span>
                <span class="hidden lg:inline">Quantity</span>
              </th>
              <th class="hidden text-right md:table-cell">
                Unit price
              </th>
              <th class="text-right">
                Total price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in bag" :key="i">
              <td class="hidden pb-4 md:table-cell">
                <router-link :to="`${startShopPath}/${item.id}`">
                  <img :src="item.pictureUrl" class="w-20 rounded" alt="Thumbnail">
                </router-link>
              </td>
              <td>
                <p class="mb-2 md:ml-4">
                  {{ item.name }}
                </p>
                <button type="submit" class="text-gray-700 md:ml-4" @click.prevent.stop="updateBagItem(item, true)">
                  <small>x Remove item</small>
                </button>
              </td>
              <td class="justify-center md:justify-end md:flex mt-6">
                <div class="w-20 h-10">
                  <div class="relative flex flex-row w-full h-8">
                    <input
                      type="number" :value="item.quantity"
                      class="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
                      @change.prevent.stop="(e) => changeItemQuantity(e, item)"
                    >
                  </div>
                </div>
              </td>
              <td class="hidden text-right md:table-cell">
                <span class="text-sm lg:text-base font-medium">
                  ${{ item.price }}
                </span>
              </td>
              <td class="text-right">
                <span class="text-sm lg:text-base font-medium">
                  ${{ getTotalPrice(item.price, item.quantity) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <hr class="pb-6 mt-6">
        <div class="my-4 mt-6 -mx-2 lg:flex">
          <div class="lg:px-2 lg:w-1/2">
            <div class="p-4">
              <div class="flex justify-between pt-4 border-b">
                <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                  Total
                </div>
                <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                  ${{ totalPrice }}
                </div>
              </div>
              <a href="#">
                <button class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                @click.prevent="submitOrder()"
                >
                  <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z" /></svg>
                  <span class="ml-2 mt-5px">Create an order</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { get, useDebounceFn, useStorage } from '@vueuse/core'
import { useLoadFromLocalStorage } from '~/composables/storage'
import type { Magic } from '~/interfaces'
import { getTotalPrice } from '~/utils/calculateTotalPrice'
import { v4 as uuidv4 } from 'uuid';
import { addNewOrder } from '~/api'
import type { User } from '~/interfaces'

const bagKey = 'bag'
const emptyBagMsg = 'No Magic here!'
const startShopPath = '/magics'

const bag = useLoadFromLocalStorage<Array<Magic>>(bagKey)
const user = useLoadFromLocalStorage<User>('user')

const totalPrice = computed(() => {
  const _bag = get(bag)
  console.log(_bag);
  console.log(uuidv4());
  //console.log(bag.id);

  if (!_bag) return 0
  let _total = 0
  for (const item of _bag) _total += getTotalPrice(item.price, item.quantity)
  return _total
})

const updateBagItem = (item: Magic, needToBeRemoved = false) => {
  const bag = get(useLoadFromLocalStorage<Array<Magic>>(bagKey)) ?? []
  localStorage.removeItem(bagKey)
  const itemIndex = bag.findIndex(magic => magic.id === item.id)

  if (itemIndex < 0) {
    bag.push(item)
  }
  else {
    if (needToBeRemoved)
      bag.splice(itemIndex, 1)
    else
      bag[itemIndex].quantity = item.quantity
  }

  useStorage(bagKey, bag)
}

const changeItemQuantity = useDebounceFn((e: Event, item: Magic) => {
  const inputEl = e.target as HTMLInputElement
  const newQuantity = Number.parseInt(inputEl.value)

  if (Number.isNaN(newQuantity)) {
    inputEl.value = item.quantity.toString()
    return
  }

  item.quantity = newQuantity
  updateBagItem(item)

  if (newQuantity === 0)
    updateBagItem(item, true)
}, 500)

const submitOrder = async () => {
  const _bag = Object.assign([],bag?.value);
  const userId = JSON.parse(localStorage.getItem("user"))?.id
  const date = new Date().toISOString().substr(0,10).replaceAll('-','/');
  for (const item of _bag){
    await addNewOrder(userId, date, "處理中", "大家加油，同組一心", item.quantity, item.id);
  } 
  await swal({
      title: '謝謝你這個盤子',
      text: '你的訂單我收到了，但我不會發給你',
      icon: 'success',
    })
}

</script>

<style lang="scss" scoped>
#summary {
  background-color: #f6f6f6;
}
</style>
