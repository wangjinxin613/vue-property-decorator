import { createDecorator } from 'vue-class-component'

export type InjectOptions = { from?: any; default?: any }
/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */

export function Inject(options?: InjectOptions | any) {
  return createDecorator((componentOptions, key) => {
    if (typeof componentOptions.inject === 'undefined') {
      componentOptions.inject = {}
    }
    if (!Array.isArray(componentOptions.inject)) {
      componentOptions.inject[key] = options || key
    }
  })
}
