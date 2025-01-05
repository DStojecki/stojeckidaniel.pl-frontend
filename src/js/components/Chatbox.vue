<template>
    <div class="chatbox">
        <div class="chatbox__main">
            <div class="topbar">
                <div class="person">
                    <img src="@/assets/daniel.png" class="person" alt="" />
                    <span>Daniel Stojecki</span>
                    <img src="@/assets/icons/emoji.png" alt="" />
                </div>
                <div class="bars">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
            <div class="messages" ref="messagesBox">
                <div class="msg" v-for="message in messages" :class="{ 'msg--user': message.sender === 'You' }">
                    <div class="msg__top">
                        <div>
                            <img v-if="message.sender != 'You'" src="@/assets/daniel.png" alt="" width="30" />
                            <span v-else class="material-symbols-outlined"> person </span>
                            <span>{{ message.sender }}</span>
                        </div>
                        <span>{{ message.time }}</span>
                    </div>
                    <div class="msg__main">
                        {{ message.content }}
                    </div>
                </div>
                <div v-show="isTyping" class="msg writing">
                    <span class="writing__dot"></span>
                    <span class="writing__dot"></span>
                    <span class="writing__dot"></span>
                </div>
            </div>
            <div class="box">
                <div class="box__input" :class="{ error: !isValid }">
                    <input
                        @change="validate"
                        @input="validate"
                        @paste="validate"
                        @keyup.enter="handleInput"
                        type="text"
                        placeholder="Type a message..."
                        v-model="input"
                        :disabled="processingRequest"
                    />
                    <div class="validation-msg" ref="validationMsg"></div>
                </div>
                <button @click="handleInput">
                    <span class="material-symbols-outlined"> sms </span>
                </button>
                <div class="suggestions">
                    <div v-for="suggestion in suggestions" @click="sendMsg(suggestion)" class="suggestion">{{ suggestion }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import anime from "animejs/lib/anime.es.js";

const isTyping = ref(true);
const messages = ref([]);
const input = ref("");
const serverUrl = import.meta.env.VITE_SERVER;
const messagesBox = ref(null);
const suggestions = ["Describe your experience", "What is your tech stack?"];
let validationMsg = ref("");
let isValid = ref(true);
let threadId = "";
let processingRequest = ref(false);

const createThread = async () => {
    const url = serverUrl + "/assistant/threads";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        threadId = data.id;
    } catch (error) {
        console.log(error);
    }
};

createThread();

const validate = () => {
    const MAXCHAR = 400;

    if (input.value.length > MAXCHAR) {
        isValid.value = false;
        validationMsg.value.textContent = `Message must contain less than ${MAXCHAR} characters`;
    } else {
        isValid.value = true;
        validationMsg.value.textContent = "";
    }
};

const animationWriting = () => {
    const dots = [...document.querySelectorAll(".writing__dot")];
    anime({
        targets: dots,
        translateY: 4,
        loop: true,
        easing: "easeInOutSine",
        direction: "alternate",
        duration: 300,
        delay: anime.stagger(100),
    });
};

const handleInput = () => {
    if (!input.value) return;

    const content = input.value;
    input.value = "";

    sendMsg(content);
};

const sendMsg = async (message) => {
    messages.value.push({
        content: message,
        time: getTime(),
        sender: "You",
    });
    processingRequest.value = true;

    isTyping.value = true;
    animationWriting();

    const url = serverUrl + "/assistant/chat";
    const body = {
        threadId: threadId,
        content: message,
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log(data);
        messages.value.push({
            content: data.content[0].text.value,
            time: getTime(),
            sender: "Daniel Stojecki",
        });
        processingRequest.value = false;
        isTyping.value = false;
    } catch (error) {
        processingRequest.value = false;
        console.log(error);
    }
};

const initChat = () => {
    setTimeout(() => {
        messages.value.push({
            id: 1,
            content:
                "Hello, I'm Daniel Stojecki, a frontend developer with a strong passion for creating engaging and efficient web applications. I have extensive experience in Vue.js, along with solid foundations in React.js, Node.js and Laravel. My professional goal is to work on challenging projects, especially those involving TypeScript and AI. I'm enthusiastic about the potential of new technologies and am always eager to embrace fresh challenges in the world of frontend development.",
            time: getTime(),
            sender: "Daniel Stojecki",
        });
        isTyping.value = false;
    }, 4000);
};

const getTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
};

watch(messages.value, () => {
    setTimeout(() => {
        messagesBox.value.scrollTop = messagesBox.value.scrollHeight;
    }, 100);
});

onMounted(() => {
    animationWriting();
    initChat();
});
</script>
