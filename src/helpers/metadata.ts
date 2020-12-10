/// <reference types='reflect-metadata'/>
import { Vue } from 'vue-class-component'

/** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */
const reflectMetadataIsSupported =
  typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined'

export function applyMetadata(
  options: any | any[] | any,
  target: Vue,
  key: string,
) {
  if (reflectMetadataIsSupported) {
    if (
      !Array.isArray(options) &&
      typeof options !== 'function' &&
      !options.hasOwnProperty('type') &&
      typeof options.type === 'undefined'
    ) {
      const type = Reflect.getMetadata('design:type', target, key)
      if (type !== Object) {
        options.type = type
      }
    }
  }
}
