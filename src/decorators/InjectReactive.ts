import { createDecorator } from 'vue-class-component'
import { reactiveInjectKey } from '../helpers/provideInject'
import { InjectOptions } from './Inject'

/**
 * decorator of a reactive inject
 * @param from key
 * @return PropertyDecorator
 */

export function InjectReactive(options?: InjectOptions | any) {
  return createDecorator((componentOptions, key) => {
    if (typeof componentOptions.inject === 'undefined') {
      componentOptions.inject = {}
    }
    if (!Array.isArray(componentOptions.inject)) {
      const fromKey = !!options ? (options as any).from || options : key
      const defaultVal = (!!options && (options as any).default) || undefined
      if (!componentOptions.computed) componentOptions.computed = {}
      componentOptions.computed![key] = function () {
        const obj = (this as any)[reactiveInjectKey]
        return obj ? obj[fromKey] : defaultVal
      }
      componentOptions.inject[reactiveInjectKey] = reactiveInjectKey
    }
  })
}
