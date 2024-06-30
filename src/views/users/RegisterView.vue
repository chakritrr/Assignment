<script setup>
import { onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";

import { useStore } from "@/stores/user/store";

const name = ref("");
const idCardNumber = ref("");
const gender = ref("");
const birthdate = ref("");
const showPopup = ref(false);
const isCheckPop = ref(false);

const store = useStore();

const maxBirthdate = new Date().toISOString().split("T")[0];

onMounted(() => {
  store.deleteData();
});

watch(
  () => idCardNumber.value,
  (newValue) => {
    idCardNumber.value = formatIdCardNumber(newValue);
  }
);

function handleNameInput(event) {
  const inputValue = event.target.value;
  name.value = inputValue.replace(/[0-9]/g, "");
}

function handleIdCardInput(event) {
  idCardNumber.value = event.target.value.replace(/\D/g, "").slice(0, 13);
}

function formatIdCardNumber(value) {
  return value.replace(/^(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})$/, "$1-$2-$3-$4-$5");
}

function handleConfirm() {
  if (!name.value || !gender.value || !birthdate.value || !idCardNumber.value || idCardNumber.value.length !== 17) {
    isCheckPop.value = true;
  } else {
    showPopup.value = true;
  }
}

function handleReset() {
  name.value = "";
  idCardNumber.value = "";
  gender.value = "";
  birthdate.value = "";
  showPopup.value = false;
}

function hendleSubmitData() {
  const data = {
    name: name.value,
    idCard: idCardNumber.value,
    birthdate: birthdate.value,
    gender: gender.value,
  };

  store.submitData(data);
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="">
      <div class="p-6 rounded-lg shadow-lg">
        <div class="label">
          <span class="label-text">ชื่อ-นามสกุล</span>
        </div>
        <div>
          <span>
            <input
              v-model="name"
              @input="handleNameInput($event)"
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs rounded-lg"
            />
            <div
              v-if="!name && isCheckPop"
              class="tooltip tooltip-open tooltip-right"
              data-tip="กรุณาระบุชื่อ-นามสกุล"
            ></div>
          </span>
        </div>

        <div class="label">
          <span class="label-text">เลขบัตรประชาชน</span>
        </div>
        <div>
          <span>
            <input
              v-model="idCardNumber"
              @input="handleIdCardInput($event)"
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs rounded-lg"
            />
            <div
              v-if="(!idCardNumber && isCheckPop) || (idCardNumber.length !== 17 && isCheckPop)"
              class="tooltip tooltip-open tooltip-right"
              data-tip="กรุณาระบุเลขบัตรประชาชน"
            ></div>
          </span>
        </div>

        <div class="label">
          <span class="label-text">เพศ</span>
        </div>
        <div>
          <span>
            <select v-model="gender" class="select select-bordered w-full max-w-xs rounded-lg">
              <option>ชาย</option>
              <option>หญิง</option>
            </select>
            <div v-if="!gender && isCheckPop" class="tooltip tooltip-open tooltip-right" data-tip="กรุณาระบุเพศ"></div>
          </span>
        </div>

        <div class="label">
          <span class="label-text">วัน/เดือน/ปี เกิด</span>
        </div>
        <div>
          <span>
            <input
              v-model="birthdate"
              type="date"
              :max="maxBirthdate"
              class="input input-bordered w-full max-w-xs rounded-lg"
            />
            <div
              v-if="!birthdate && isCheckPop"
              class="tooltip tooltip-open tooltip-right"
              data-tip="กรุณาระบุ วัน/เดือน/ปี เกิด"
            ></div>
          </span>
        </div>

        <div class="flex items-center mt-4 space-x-4">
          <button @click="handleConfirm" class="btn btn-primary flex-1">ยืนยัน</button>
          <button @click="handleReset" class="btn btn-secondary flex-1">ล้างค่า</button>
        </div>

        <input v-model="showPopup" type="checkbox" id="my_modal_6" class="modal-toggle" />
        <div class="modal" v-if="showPopup">
          <div class="modal-box">
            <h3 class="text-lg font-bold">ยืนยันข้อมูล</h3>
            <div class="modal-action">
              <RouterLink to="/home"
                ><label for="my_modal_6" class="btn" @click="hendleSubmitData">ตรวจสอบ</label></RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
