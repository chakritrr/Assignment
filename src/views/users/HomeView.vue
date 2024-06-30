<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

import { useStore } from "@/stores/user/store";

const isCheckStatus = ref(true);

const store = useStore();

function formatDateOfBirthThai(dateOfBirth) {
  const monthsThai = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const [year, month, day] = dateOfBirth.split("-");
  const monthThai = monthsThai[parseInt(month, 10) - 1];
  const yearThai = parseInt(year, 10) + 543;

  return `${parseInt(day, 10)} ${monthThai} ${yearThai}`;
}

function calStatus(birthdate, gender) {
  const birthdayStr = birthdate;
  const birthday = new Date(birthdayStr);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthday.getFullYear();

  if (
    currentDate.getMonth() < birthday.getMonth() ||
    (currentDate.getMonth() === birthday.getMonth() && currentDate.getDate() < birthday.getDate())
  ) {
    age--;
  }

  if (age >= 65 && gender == "ชาย") {
    isCheckStatus.value = false;
    return `ไม่สามารถเข้ารับบริการได้`;
  } else {
    isCheckStatus.value = true;
    return `สามารถเข้ารับบริการได้`;
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen hero bg-base-200">
    <div class="card bg-base-100 w-96 shadow-xl">
      <div class="card-body">
        <div class="card-actions">
          <RouterLink to="/">
            <button class="btn btn-primary">ย้อนกลับ</button>
          </RouterLink>
        </div>
        <div>ชื่อ-นามสกุล : {{ store.dataObject.name }}</div>
        <div>เลขบัตรประชาชน : {{ store.dataObject.idCard }}</div>
        <div>เพศ : {{ store.dataObject.gender }}</div>
        <div>วัน/เดือน/ปี เกิด : {{ formatDateOfBirthThai(store.dataObject.birthdate) }}</div>
        <div>
          สถานะการเข้ารับบริการ :
          <span :class="{ 'text-green-400': isCheckStatus, 'text-red-600': !isCheckStatus }">
            {{ calStatus(store.dataObject.birthdate, store.dataObject.gender) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
