import UploadCropper from '../components/VueCro.vue'

/* istanbul ignore next */
UploadCropper.install = (Vue) => {
  Vue.component(UploadCropper.name, UploadCropper)
}

export default UploadCropper