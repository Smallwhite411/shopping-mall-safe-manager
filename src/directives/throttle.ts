import { Directive, DirectiveBinding } from 'vue';

const throttleFn = <T>(fn: (...args: any[]) => T, delay = 800) => {
    let last: any = 0;
    return (...args: any[]) => {
        const context = this;
        const now = +new Date();
        // if (timer) return;
        if (now - last > delay) {
            fn.apply(context, args);
            last = now;
        }
    };
};

export const throttle: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        if (typeof binding.value.fn !== 'function' || !binding.value.event) return;
        el.addEventListener(
            binding.value.event,
            throttleFn(binding.value.fn, binding.value.delay)
        );
    },
    beforeUnmount(el: HTMLElement, binding: DirectiveBinding) {
        if (typeof binding.value.fn !== 'function' || !binding.value.event) return;
        el.removeEventListener(
            binding.value.event,
            throttleFn(binding.value.fn, binding.value.delay)
        );
    }
};
