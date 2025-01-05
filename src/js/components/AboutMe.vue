<template>
    <section id="about">
        <div class="content about">
            <div class="about__top">
                <h1>Welcome to my World</h1>
                <h2>Hi, I'm <span>Daniel</span> a Web Developer.</h2>
                <p>I am proficient in builiding modern web applications & websites</p>
                <button class="btn btn-primary">Contact Us</button>
            </div>
            <div class="about__img">
                <img src="@/assets/person.png" alt="" />
            </div>
            <div class="about__about">
                <h3 class="subtitle slide-from-top">About <span>Me</span></h3>
                <p>
                    I am a software developer with over 4 years of experience in the IT industry. I started my career as a frontend specialist, focusing on creating intuitive and visually appealing
                    user interfaces. Now, I am expanding my skill set by diving into backend development, learning server-side technologies and database management. My goal is to become a versatile
                    developer, who seamlessly integrates frontend and backend expertise to deliver comprehensive software solutions. <br /><br />
                </p>
                <button class="btn btn-secondary">Download CV</button>
            </div>
            <div class="schools">
                <h3 class="subtitle">My <span>Techstack</span></h3>
                <h5 class="hobbies__subtitle">Skills</h5>
                <div class="pills">
                    <span>Reading</span><span>Writing</span><span>Painting</span><span>Drawing</span><span>Hiking</span><span>Photography</span><span>Birdwatching</span><span>Knitting</span
                    ><span>Pottery</span>
                </div>
                <div class="schools__list">
                    <div class="school">
                        <div class="dot"></div>
                        <h4>Master in Computer Science</h4>
                        <p>LLU New York <span>| 2014 - 2016</span></p>
                    </div>
                    <div class="school">
                        <div class="dot"></div>
                        <h4>B.Sc(Hon's)</h4>
                        <p>GCU USA <span>| 2014 - 2016</span></p>
                    </div>
                    <div class="school">
                        <div class="dot"></div>
                        <h4>Intermediate</h4>
                        <p>GICCL New York <span>| 2005-2007</span></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import anime from "animejs/lib/anime.es.js";
import { useObserver } from "@/js/composables/useObserver";

const keyframes = [
    { translateY: -20, opacity: 0 },
    { translateY: 0, opacity: 1 },
];
const animationTop = () => {
    const timeline = anime.timeline({
        delay: 0,
        easing: "linear",
    });
    timeline
        .add({
            targets: ".about__img",
            keyframes,
            duration: 1000,
            easing: "linear",
        })
        .add({
            targets: ".about__top h1",
            keyframes,
            duration: 600,
        })
        .add({
            targets: [".about__top h2", ".about__top p"],
            keyframes,
            duration: 600,
        })
        .add({
            targets: ".about__top button",
            keyframes,
            duration: 500,
        });
    timeline.play();
};
const animationAbout = () => {
    anime({
        targets: ".about__about",
        keyframes: [
            { translateX: -30, opacity: 0 },
            { translateX: 0, opacity: 1 },
        ],
        duration: 600,
        easing: "linear",
    });
};
const animationEducation = () => {
    anime({
        targets: ".schools",
        keyframes: [
            { translateX: 30, opacity: 0 },
            { translateX: 0, opacity: 1 },
        ],
        duration: 600,
        easing: "linear",
    });
};

useObserver(".about__top", animationTop);
useObserver(".about__about", animationAbout);
useObserver(".schools", animationEducation);
</script>
