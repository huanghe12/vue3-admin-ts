/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}
