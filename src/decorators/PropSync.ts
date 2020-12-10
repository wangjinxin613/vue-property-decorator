import { createDecorator,Vue } from 'vue-class-component'
import { applyMetadata } from '../helpers/metadata'

/**
 * decorator of a synced prop
 * @param propName the name to interface with from outside, must be different from decorated property
 * @param options the options for the synced prop
 * @return PropertyDecorator | void
 */
export function PropSync(
  propName: string,
  options: any | any[] | any = {},
) {
  return (target: Vue, key: string) => {
    applyMetadata(options, target, key)
    createDecorator((componentOptions, k) => {
      ;(componentOptions.props || (componentOptions.props = {} as any))[
        propName
      ] = options
      ;(componentOptions.computed || (componentOptions.computed = {}))[k] = {
        get() {
          return (this as any)[propName]
        },
        set(this: Vue, value: any) {
          this.$emit(`update:${propName}`, value)
        },
      }
    })(target, key)
  }
}
