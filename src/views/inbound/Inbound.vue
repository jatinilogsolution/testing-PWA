<template>
<Header back-button title="Inbound" />
 
  <div class=" flex flex-wrap  gap-4  px-2.5 py-4 ">
    <router-link :to="{ name: 'Receiving' }" class="NextCardCss">
      <ArrowDownNarrowWide color="green" :size="40" />
      <span class="label-color mt-2">Receiving</span>
    </router-link>
    <router-link :to="{ name: 'AsnScan' }" class="NextCardCss">

      <ScanQrCode color="blue " :size="40" />
      <span class="label-color mt-2">ASN Scan</span>
    </router-link>
    <router-link :to="{ name: 'PutAway' }" class="NextCardCss">

      <ArrowUpZA color="yellow " :size="40" />

      <span class="label-color mt-2">Put Away</span>
    </router-link>
    <router-link :to="{ name: 'InboundDocument' }" class="NextCardCss">

      <BookOpenText color="pink" :size="40" />

      <span class="label-color mt-2">Inbound Document</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
 import { ArrowDownNarrowWide, ArrowUpZA, BookOpenText, ScanQrCode } from 'lucide-vue-next';
 import  Header from "@/components/Header.vue"
</script>
