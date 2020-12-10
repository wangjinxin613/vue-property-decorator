import { createDecorator, Vue } from 'vue-class-component'
import { applyMetadata } from '../helpers/metadata'

/**
 * decorator of synced model and prop
 * @param propName the name to interface with from outside, must be different from decorated property
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
export function ModelSync(
  propName: string,
  event?: string,
  options: any | any[] | any = {},
) {
  return (target: Vue, key: string) => {
    applyMetadata(options, target, key)
    createDecorator((componentOptions, k) => {
      ;(componentOptions.props || ((componentOptions.props = {}) as any))[
        propName
      ] = options
      componentOptions.model = { prop: propName, event: event || k }
      ;(componentOptions.computed || (componentOptions.computed = {}))[k] = {
        get() {
          return (this as any)[propName]
        },
        set(value: any) {
          // @ts-ignore
          this.$emit(event, value)
        },
      }
    })(target, key)
  }
}
