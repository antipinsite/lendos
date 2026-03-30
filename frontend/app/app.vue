<script setup lang="ts">
import { useDayjs } from '#dayjs'
import 'dayjs/locale/ru';

const dayjs = useDayjs()

import TitleSvg from "~/assets/svg/titleSvg.vue";

const events = ref([])
const videos = ref([])

dayjs.locale('ru')

function getFormatDate (date: Date) {
  return {
    date: dayjs(date).format('DD MMMM'),
    time: dayjs(date).format('HH:mm'),
  }
}

onMounted(async () => {
  const config = useRuntimeConfig()
  events.value = await $fetch('/afishas?populate=*', {
    baseURL: import.meta.client ? 'http://localhost:1337/api' : config.public.apiBase
  })

  videos.value = await $fetch('/videos?populate=*', {
    baseURL: import.meta.client ? 'http://localhost:1337/api' : config.public.apiBase
  })
})
</script>

<template>
  <main class="w-full px-[64px] max-lg:px-[17px]">
    <div class="lg:h-screen">
      <div class="flex h-full max-lg:pt-[60px] pt-[60px] pb-[12px] relative">
        <img class="max-lg:w-[60%]" src="~/assets/images/main.jpg" />
        <TitleSvg class="lg:w-auto absolute max-lg:h-auto pt-[100px] max-lg:pt-[40px] right-0 max-lg:w-[50%]" />
      </div>
    </div>
    <p class="max-lg:text-[9px] max-lg:pt-[30px] pt-[40px] font-geist text-[25px] leading-[140%]">Денис Антипин – комик из Якутии, известный своей манерой баловаться со зрительным залом и умением одинаково легко работать как с подготовленным материалом, так и с импровизацией прямо во время выступления. Больше 10 лет в комедии, резидент Stand-Up Club #1, профессионал в жанре угаров.</p>

    <div class="mt-[120px] max-lg:mt-[40px] lg:h-screen">
      <h2 class="font-tarbarsam leading-[140%] max-lg:text-[60px] text-[170px] text-center">Афиша</h2>
      <div class="flex flex-col w-full gap-[40px]">
        <div v-for="event in events?.data" :key="event.id" class="flex w-full justify-between items-center flex-row">
          <div class="flex flex-col w-1/4 shrink-0">
            <p class="font-geist text-center max-lg:text-[13px] text-[40px] leading-[140%]">{{ getFormatDate(event?.date).date }}</p>
            <p class="font-geist text-center max-lg:text-[13px] text-[40px] leading-[140%]">{{ getFormatDate(event?.date).time }}</p>
          </div>

          <p class="text-[#FF70E0] font-tarbarsam text-center max-lg:text-[18px] text-[70px] w-full leading-[140%]">{{ event?.city }}</p>

          <NuxtLink :to="event?.link" target="_blank" class="max-lg:px-[4px] max-lg:py-[2px] px-[20px] py-[8px] leading-[140%] max-lg:text-[15px] text-[40px] border-[2px] whitespace-nowrap">
            купить билет
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="mt-[120px] max-lg:mt-[40px] lg:h-screen">
      <h2 class="font-tarbarsam leading-[140%] max-lg:text-[60px] text-[170px] text-center">Видео</h2>
      <div class="w-full place-items-center gap-y-[30px] grid max-lg:grid-cols-1 grid-cols-2">
        <NuxtImg
            v-for="video in videos?.data"
            class="max-w-[90%] cursor-pointer"
            provider="strapi"
            :src="video?.preview?.url"
            alt="Description"
            @click="navigateTo(video?.link, { open: { target: '_blank' } })"
        />
      </div>
    </div>

    <div class="mt-[120px] max-lg:h-[calc(100vh/2)] lg:h-screen relative">
      <h2 class="font-tarbarsam leading-[140%] max-lg:text-[60px] text-[170px] text-center">Мерч</h2>

      <img class="max-lg:w-[50%] absolute z-2" src="~/assets/images/merch.png" />

      <div class="pt-[40px] z-5 relative flex flex-col ml-auto items-center text-center w-fit">
        <p class="font-geist w-fit max-lg:text-[18px] text-[60px] leading-[95%]">Концептуальный вандализм</p>
        <p class="font-geist text-[50px] max-lg:text-[18px] leading-[140%]">x</p>
        <p class="text-[#FF70E0] font-tarbarsam w-fit max-lg:text-[27px] text-[90px] leading-[140%]">Денис Антипин</p>
      </div>

      <a href="tel:+79772965884" class="z-5 absolute bottom-0 right-0 max-lg:text-[12px] max-lg:px-[10px] max-lg:py-[4px] px-[20px] py-[8px] leading-[140%] text-[30px] max-lg:border-[1px] border-[2px] whitespace-nowrap">
        ПОКУПКА: +7 977 296 5884 Света
      </a>

      <img class="max-lg:w-[25%] absolute right-0 bottom-[10%] z-2" src="~/assets/images/merch2.png" />
    </div>

    <div class="mt-[120px] max-lg:mt-[40px] lg:h-screen">
        <h2 class="font-tarbarsam leading-[140%] max-lg:text-[45px] text-[170px] text-center">Социальные сети</h2>
      <div class="max-lg:mt-[20px] flex justify-between">
        <a href="#" target="_blank" class="flex flex-col gap-[50px] text-center cursor-pointer">
          <img class="max-lg:w-[90%]" src="~/assets/images/telega.png" />
          <p class="font-tarbarsam text-[#FF70E0] max-lg:text-[16px] text-[40px] leading-[140%]">Telegram</p>
        </a>
        <a href="#" target="_blank" class="flex flex-col gap-[50px] text-center cursor-pointer">
          <img class="max-lg:w-[90%]"  src="~/assets/images/insta.png" />
          <p class="font-tarbarsam text-[#FF70E0] max-lg:text-[16px] text-[40px] leading-[140%]">Instagram*</p>
        </a>
        <a href="#" target="_blank" class="flex flex-col gap-[50px] text-center cursor-pointer">
          <img class="max-lg:w-[90%]"  src="~/assets/images/youtube.png" />
          <p class="font-tarbarsam text-[#FF70E0] max-lg:text-[16px] text-[40px] leading-[140%]">Youtube</p>
        </a>
      </div>

      <p class="font-geist text-center w-full max-lg:text-[8px] pt-[70px] pb-[24px]">*Meta признана экстремистской организацией и запрещена на территории РФ</p>
    </div>
  </main>
</template>