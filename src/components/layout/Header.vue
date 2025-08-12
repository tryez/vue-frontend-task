<script setup>

import { ref } from 'vue';
import Logo from '../icons/Logo.vue'

import useOutsideClick from '@/composables/useOutsideClick'


const props = defineProps({
    user: Object
})

const isDropdownOpen = ref(false);
const dropdownRef = ref(null);


function logOut(){
    alert('Logout');
    isDropdownOpen.value = false;
}


function toggleAvatarDropdown(){
    isDropdownOpen.value = !isDropdownOpen.value;
}


useOutsideClick(dropdownRef, isDropdownOpen, () => {
  isDropdownOpen.value = false;
})

</script>




<template>
    <div class="header">
        <div class="header-content">
            <div class="header-left">


                <a href="/" class="header-logo">
                    <div class="logo-wrapper">
                        <Logo />
                    </div>
                    <div class="header-logo-name">
                        Uzna Website
                    </div>
                </a>
            </div>
            <div class="header-right">
                <div class="avatar-wrapper">
                    <div class="profile-picture" @click="toggleAvatarDropdown">
                        <span class="profile-picture-renderer" :style="{backgroundImage: `url(${props.user.profile_picture_url})`}"></span>
                    </div>
                    <div :class="['avatar-dropdown-options', {'display-dropdown' : isDropdownOpen}]" ref="dropdownRef">
                        <div class="avatar-dropdown-option">{{props.user.name}}</div>
                        <div class="avatar-dropdown-option" @click="logOut">Logout</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>





<style scoped lang="scss">
.header{
    height: 60px;
    flex-shrink: 0;
    /* background-color: #0F1923; */
    background-color: #142332;
    box-shadow: 0 1px 2px #000,0 0px 2px #000;
    z-index: 2;
}

.header-content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0px 10px;
}

.header-logo{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    text-decoration: none;
    text-decoration-line: none;
}
.header-logo-name{
    
    color: #fff;
    font-weight: 600;
}

.logo-wrapper{
    width: 42px;
    height: 42px;
    --logo-color: crimson;

    svg {
        width: 100% !important;
        height: 100% !important;
    }
}


.avatar-wrapper{
    position: relative;
}

.profile-picture{
    cursor: pointer;


    .profile-picture-renderer{
        border-radius: 50%;
        width: 48px;
        height: 48px;
        border: 1px solid cyan;
        display: flex;

        background-size: cover;
        background-position: 50% 50%;
    }

    &:hover > .profile-picture-renderer{
        border-color: #fff;
    }
}




.avatar-dropdown-options {
    padding: 8px 0px;
    position: absolute;
    top: 100%;
    right: 0px;
    display: block;
    // width: 100%;
    background: #2a2c2e;
    transform-origin: top right;
    transform: scale(0, 0);
    overflow: hidden;
    /* transition: transform 0.1s ease-in-out; */
    transition: transform 0.1s cubic-bezier(0.2, 1.06, 0.58, 1);
    border-radius: 8px;
    white-space: nowrap;


    &.display-dropdown {
        display: block !important;
        transform: scale(1, 1);
        transform-origin: top right;
    }

    .avatar-dropdown-option {
        font-size: 14px;
        padding: 5px 14px;
        /* z-index: 9999; */
        cursor: pointer;
        // min-height: 36px;
        display: flex;
        align-items: center;

        &:hover{
            background: #414447;
        }
    }

    
}



</style>