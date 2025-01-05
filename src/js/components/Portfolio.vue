<template>
    <section id="portfolio">
        <div class="content">
            <h3 class="subtitle subtitle--center"><span>Portfolio</span></h3>
            <div class="portfolio">
                <div @mouseover="handleHover(0)" class="project" :class="{ active: activeIndex == 0 }">
                    <img src="@/assets/portfolio/portfolio-2.png" alt="" />
                    <h4 class="project__title">Project Name</h4>
                    <p class="project__description">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et enim debitis molestiae similique, nulla obcaecati tempora vitae deleniti illo dignissimos cumque at autem optio
                        impedit exercitationem minima facilis iusto quisquam.
                    </p>
                </div>
                <div @mouseover="handleHover(1)" class="project" :class="{ active: activeIndex == 1 }">
                    <img src="@/assets/portfolio/portfolio-1.png" alt="" />
                    <h4 class="project__title">Valider.js</h4>
                    <p class="project__description">
                        Lightweight, plug-and-play form input validation library designed specifically for developers seeking efficiency and customization in their daily work. My library stands out by
                        allowing full customization of validation messages and validation rules ensuring that you can tailor feedback precisely to your users' needs. Built with plain JavaScript, it's
                        engineered for simplicity and ease of integration, making it the go-to solution for developers looking for a straightforward, yet powerful, form and input validation tool.
                    </p>
                </div>
                <div @mouseover="handleHover(2)" class="project" :class="{ active: activeIndex == 2 }">
                    <img src="@/assets/portfolio/portfolio-5.png" alt="" />
                    <h4 class="project__title">Project Name</h4>
                    <p class="project__description">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et enim debitis molestiae similique, nulla obcaecati tempora vitae deleniti illo dignissimos cumque at autem optio
                        impedit exercitationem minima facilis iusto quisquam.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
let activeIndex = ref(1);

const handleHover = (id) => {
    activeIndex.value = id;
};
</script>
