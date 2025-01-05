import { onMounted } from "vue";

export function useObserver(selector, callback, options = { threshold: 0.8 }) {
    const watch = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                callback()
                observer.disconnect();
            }
        });
    };

    onMounted(() => {
        const target = document.querySelector(selector);
        const options = {
            threshold: 0.8,
        };
        const observer = new IntersectionObserver(watch, options);

        observer.observe(target);
    });
}