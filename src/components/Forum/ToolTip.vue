<template>
    <div class="tooltip-wrapper" @mouseover="showTooltip" @mouseleave="hideTooltip">
        <slot></slot>
        <div v-if="visible" class="tooltip">
            <img :src="user.avatar" alt="User Avatar" class="tooltip-avatar" />
            <div class="tooltip-content">
                <p class="user-name">{{ user.name }}</p>
                <p class="user-info">Novice Member • {{ user.age }} • From {{ user.location }}</p>
                <p>Joined: {{ user.joined }}</p>
                <p>Last seen: {{ user.lastSeen }}</p>
                <p>Messages: {{ user.messages }}</p>
                <p>Reaction score: {{ user.reactionScore }}</p>
                <p>Points: {{ user.points }}</p>
                <div class="tooltip-actions">
                    <button @click="followUser">Follow</button>
                    <button @click="startConversation">Start conversation</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Tooltip",
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        showTooltip() {
            this.visible = true;
        },
        hideTooltip() {
            this.visible = false;
        },
        followUser() {
            // Logic to follow the user can be implemented here
            console.log(`Following ${this.user.name}`);
        },
        startConversation() {
            // Logic to start a conversation can be implemented here
            console.log(`Starting conversation with ${this.user.name}`);
        },
    },
};
</script>

<style scoped>
.tooltip-wrapper {
    position: relative;
    display: inline-block;
}

.tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 350px;
    font-size: 14px;
    white-space: normal;
    opacity: 0;
    transition: opacity 0.3s ease;
    visibility: hidden;
    z-index: 100;
}

.tooltip-wrapper:hover .tooltip {
    visibility: visible;
    opacity: 1;
}

.tooltip-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 10px;
}

.tooltip-content {
    color: #333;
}

.user-name {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 5px;
}

.user-info {
    font-size: 14px;
    color: #888;
    margin-bottom: 10px;
}

.tooltip-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.tooltip-actions button {
    padding: 5px 10px;
    background-color: #0073e6;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.2s ease;
}

.tooltip-actions button:hover {
    background-color: #005bb5;
}
</style>
