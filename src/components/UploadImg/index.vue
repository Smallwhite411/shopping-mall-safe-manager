<template>
  <el-upload
    ref="uploadRef"
    class="upload"
    action="#"
    list-type="picture-card"
    :limit="1"
    accept=".png, .jpg, .jpeg"
    :disabled="disabledUpload"
    :file-list="fileList"
    :on-change="handleChange"
  >
    <el-icon><Tickets /></el-icon>

    <template #file="{ file }">
      <div>
        <img
          v-if="fileList.length > 0"
          class="el-upload-list__item-thumbnail"
          :style="{ 'background-color': disabledUpload ? '#f5f7fa' : '#fff' }"
          :src="fileList[0].url ? fileList[0].url : ''"
          alt=""
        />
        <span v-if="!disabledUpload" class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span class="el-upload-list__item-upload">
            <el-upload
              ref="reuploadRef"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :file-list="fileList"
              :limit="1"
              :on-exceed="handleExceed"
              accept=".png, .jpg, .jpeg"
              class="upload"
            >
              <el-icon><Upload /></el-icon>
            </el-upload>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="downScanning(fileList[0].uid, 'application/json')"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove">
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
  <img
    v-if="dialogVisible"
    id="previewImg"
    :src="dialogImageUrl"
    alt="Preview Image"
    v-preview
    style="visibility: hidden; height: 0; width: 0"
  />
</template>

<script lang="ts" setup>
import { Delete, ZoomIn } from "@element-plus/icons-vue";
import { downScanning } from "@/utils/downFile";
import { ElMessage, genFileId } from "element-plus";
import type {
  UploadInstance,
  UploadRawFile,
  UploadProps,
  UploadFile,
} from "element-plus";
import { ref } from "vue";
import { vPreview } from "vue3-image-preview";
import { getImg, uploadFile } from "@/api/public";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  imgList: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const disabledUpload = computed(() => {
  return props.disabled;
});
const fileList: any = ref([]);
watch(
  () => props.imgList,
  (newVal: any) => {
    if (newVal && newVal.length > 0 && newVal[0].uid) {
      getImg({ id: newVal[0].uid }).then((g: any) => {
        fileList.value = [
          {
            url: handleDownloadQrIMg(g.data),
            uid: newVal[0].uid,
            fileName: newVal.fileName,
          },
        ];
      });
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
//imageBase64是后台传回来的base64数据
const handleDownloadQrIMg = (imageBase64: any) => {
  // 这里是获取到的图片base64编码,这里只是个例子哈，要自行编码图片替换这里才能测试看到效果
  const imgUrl = `data:image/jpg;base64,${imageBase64}`;
  return imgUrl;
};
const uploadRef = ref();
const reuploadRef = ref<UploadInstance>();
const emit = defineEmits(["updateFile"]);

const fileType = ["image/png", "image/jpeg", "image/jpg"];

const handleChange = async (file: any) => {
  if (fileType.includes(file.raw.type)) {
    const fileObj = file.raw; // 相当于input里取得的files
    const fd = new FormData(); // FormData 对象
    fd.append("file", fileObj); // 文件对象
    fd.append("id", fileObj.uid);
    uploadFile(fd).then((res) => {
      fileList.value = [{ url: file.url, uid: res.data, fileName: file.name }];
      console.log("aksfgvbkasb", res.data, file.url, file.raw);

      emit("updateFile", fileList.value);
    });
  } else {
    fileList.value = fileList.value.length > 0 ? fileList.value : [];
    ElMessage.warning("请上传图片");
  }
};

const handleExceed: UploadProps["onExceed"] = (files) => {
  uploadRef.value?.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
};
const dialogImageUrl: any = ref({});
const dialogVisible = ref(false);
const handleRemove = () => {
  fileList.value = [];
  uploadRef.value!.clearFiles();
  emit("updateFile", fileList.value);
};
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
  setTimeout(() => {
    document.getElementById("previewImg")?.click();
  });
};
watch(
  () => document.getElementsByClassName("img-preview"),
  (newVal) => {
    console.log(newVal);
  }
);
</script>
<style lang="scss" scoped>
.el-overlay {
  .el-dialog__body {
    text-align: center;
  }
}
.upload {
  width: 100%;
  height: 148px;
  position: relative;
  overflow: hidden;
  background: #f6f7f9;
  border-radius: 8px;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  :deep(.el-upload-list) {
    width: 100%;
    height: 148px;
    position: absolute;
    top: 0;
    left: 0;
    background: #f6f7f9;
    border-radius: 8px;
    border: none;
    .el-icon {
      font-size: 30px;
      color: #0076c8;
    }
    .el-upload,
    .el-upload-list__item,
    .el-upload-list__item-thumbnail {
      display: inline-block;
      width: 100%;
      height: 148px;
      text-align: center;
      line-height: 148px;
      border: none;
      margin: 0;
    }
    .el-upload--picture-card {
      position: unset;
    }
  }
  .el-upload-list__item-actions {
    .upload {
      display: inline-block;
      width: 30px;
      height: 148px;
      .el-upload {
        background: transparent;
        border: none;
        line-height: 148px;
        border-radius: 0;
        .el-icon {
          display: inline-block;
          color: #fff;
          font-size: 20px;
          margin-top: 5px;
        }
      }
      .el-upload-list__item.is-ready {
        display: none;
      }
    }
  }
  .el-upload-list__item {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  :deep(.el-upload-list__item-actions) {
    background-color: rgba(0, 0, 0, 0.5);
    .el-icon {
      font-size: 20px;
      color: #fff;
    }
    .el-icon:hover {
      color: #0076c8;
    }
    .upload,
    .el-upload-list,
    .el-upload--picture-card {
      background-color: transparent;
      border: none;
      .el-icon:hover {
        color: #0076c8;
      }
      .el-upload-list__item {
        display: none;
      }
    }
  }
}
.avatar {
  border: 1px solid red;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 148px;
}
.preview {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 10%;
}
</style>
