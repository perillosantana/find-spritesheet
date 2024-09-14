<script setup>
import { reactive } from "vue";

const menu = reactive([]);

const uploadFiles = () => {
  const fileInput = document.getElementById("fileInput");

  if (!fileInput.files.length) {
    alert("Upload 2 files, PNG and JSON");
    return;
  }

  for (let index = 0; index < fileInput.files.length; index++) {
    const reader = new FileReader();
    const file = fileInput.files[index];

    if (file.type === "application/json") {
      reader.onload = function (event) {
        const jsonData = event.target.result;
        const json = JSON.parse(jsonData);

        if (Object.keys(json.frames).length) {
          Object.keys(json.frames).map((item) => {
            menu.push({
              name: item,
              position: {
                x: json.frames[item].frame.x,
                y: json.frames[item].frame.y,
                w: json.frames[item].frame.w,
                h: json.frames[item].frame.h,
              },
            });
          });

          const imageContainer = document.getElementById("imageContainer");

          menu.map((menuItem) => {
            const clickableZone = document.createElement("div");

            clickableZone.style.position = "absolute";
            clickableZone.style.left = `${menuItem.position.x}px`;
            clickableZone.style.top = `${menuItem.position.y}px`;
            clickableZone.style.width = `${menuItem.position.w}px`;
            clickableZone.style.height = `${menuItem.position.h}px`;
            clickableZone.style.cursor = "pointer";

            clickableZone.addEventListener("click", function () {
              const name = menuItem.name;
              const tempInput = document.createElement("input");
              tempInput.value = name;
              document.body.appendChild(tempInput);
              tempInput.select();
              document.execCommand("copy");
              document.body.removeChild(tempInput);
              alert("Nome copiado: " + name);
            });

            imageContainer.appendChild(clickableZone);
          });
        }
      };

      reader.readAsText(file);
    }

    if (file.type === "image/png") {
      reader.onload = function (event) {
        const imageUrl = event.target.result;

        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.style.maxWidth = "none";

        const imageContainer = document.getElementById("imageContainer");
        imageContainer.appendChild(imgElement);
      };

      reader.readAsDataURL(file);
    }
  }
};

const selectImage = (item) => {
  const square = document.getElementById("square");

  square.style.width = item.position.w + "px";
  square.style.height = item.position.h + "px";
  square.style.left = item.position.x + "px";
  square.style.top = item.position.y + "px";
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-white mt-10 rounded-md shadow-md">
    <h2 class="text-xl font-semibold mb-4">Upload PNG and JSON</h2>

    <form id="uploadForm" enctype="multipart/form-data">
      <div class="mb-4">
        <input
          type="file"
          id="fileInput"
          name="files[]"
          multiple
          class="py-2 px-4 border rounded-lg"
        />
      </div>

      <button
        type="button"
        @click="uploadFiles"
        class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Upload Files
      </button>
    </form>

    <div id="status" class="mt-4"></div>
  </div>

  <div class="container px-8 m-auto">
    <div class="flex gap-6 justify-center">
      <!-- <div class="bg-green-600 text-white p-5 rounded-md flex flex-col gap-3">
        <div
          v-for="item in menu"
          :key="item.name"
          class="uppercase cursor-pointer hover:text-gray-700"
          @click="selectImage(item)"
        >
          {{ item.name }}
        </div>
      </div> -->

      <div id="imageContainer" class="relative">
        <div id="square" class="absolute bg-red-700/50"></div>
      </div>
    </div>
  </div>
</template>
