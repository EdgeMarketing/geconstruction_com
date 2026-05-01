<script setup>
import { onMounted, ref, watch } from 'vue'

const form = ref({
  name: 'ADAM SENECHAL',
  title: 'PRESIDENT',
  office: '406.449.7228',
  cell: '406.438.2574',
  email: 'Adam@GEConstruction.com',
  website: 'GEConstruction.com',
  officeLayout: 'helena',
  color: 'gold',
})

const signatureHtml = ref('')

const images = {
  gold: {
    top: 'https://geconstruction.com/images/sig-gold-top.png',
    left: 'https://geconstruction.com/images/sig-gold-right.png',
    bottom: 'https://geconstruction.com/images/sig-gold-bottom.png',
    bg: '#8e7b43',
  },
  grey: {
    top: 'https://geconstruction.com/images/sig-grey-top.png',
    left: 'https://geconstruction.com/images/sig-grey-right.png',
    bottom: 'https://geconstruction.com/images/sig-grey-bottom.png',
    bg: '#575a5d',
  },
}

const getOfficeInfo = () => {
  if (form.value.officeLayout === 'bozeman') {
    return '7585 Shedhorn Dr<br>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Bozeman, MT 59718'
  }

  return '505 Shephard Way<br>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Helena, MT 59601'
}

const cleanNumber = num => num.replace(/\D/g, '')

const generateSignature = () => {
  const theme = images[form.value.color]
  const officeInfo = getOfficeInfo()

  signatureHtml.value = `
<table cellpadding="0" cellspacing="0" border="0" width="500" style="width:500px;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td colspan="2" style="padding:0;margin:0;font-size:0;line-height:0;">
      <img src="${theme.top}" width="500" alt="" style="display:block;width:500px;height:auto;border:0;outline:none;text-decoration:none;">
    </td>
  </tr>

  <tr>
    <td width="250" style="width:250px;padding:0;margin:0;font-size:0;line-height:0;vertical-align:top;">
      <img src="${theme.left}" width="250" alt="Golden Eagle Construction" style="display:block;width:250px;height:auto;border:0;outline:none;text-decoration:none;">
    </td>

    <td width="250" style="width:250px;background-color:${theme.bg};padding:18px 18px 14px 0px;vertical-align:top;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
      <div style="font-size:20px;line-height:22px;font-weight:bold;letter-spacing:1.5px;color:#ffffff;">
        ${form.value.name}
      </div>

      <div style="font-size:13px;line-height:17px;color:#ffffff;text-transform:uppercase;">
        ${form.value.title}
      </div>

      <div style="line-height:6px;font-size:6px;">&nbsp;</div>

      <div style="font-size:13px;line-height:18px;color:#ffffff;">

        <strong>Office:</strong>

        <span style="color:#ffffff;">

          <a href="tel:${cleanNumber(form.value.office)}" style="color:#ffffff;text-decoration:none;">

            ${form.value.office}

          </a>

        </span>

        <br>

        <strong>Cell:</strong>

        <span style="color:#ffffff;">

          <a href="tel:${cleanNumber(form.value.cell)}" style="color:#ffffff;text-decoration:none;">

            ${form.value.cell}

          </a>

        </span>

      </div>

      <div style="line-height:6px;font-size:6px;">&nbsp;</div>

      <div style="font-size:13px;line-height:18px;color:#ffffff;">
        <strong>Email:</strong>
        <span style="color:#ffffff;">
          <a href="mailto:${form.value.email}"
            style="color:#ffffff;text-decoration:none;">
            ${form.value.email}
          </a>
        </span>
      </div>

      <div style="line-height:6px;font-size:6px;">&nbsp;</div>

      <div style="font-size:13px;line-height:17px;color:#ffffff;">
        <strong>Address:</strong> ${officeInfo}
      </div>

      <div style="line-height:6px;font-size:6px;">&nbsp;</div>

      <div style="font-size:13px;line-height:18px;color:#ffffff;">
        <strong>Website:</strong> ${form.value.website}
      </div>
    </td>
  </tr>

  <tr>
    <td colspan="2" style="padding:0;margin:0;font-size:0;line-height:0;">
      <img src="${theme.bottom}" width="500" alt="" style="display:block;width:500px;height:auto;border:0;outline:none;text-decoration:none;">
    </td>
  </tr>
</table>
`
}

onMounted(generateSignature)
watch(form, generateSignature, { deep: true })

const copyHtml = async () => {
  await navigator.clipboard.writeText(signatureHtml.value)
  alert('Copied HTML to clipboard!')
}

const copyWysiwyg = async () => {
  await navigator.clipboard.write([
    new ClipboardItem({
      'text/html': new Blob([signatureHtml.value], { type: 'text/html' }),
    }),
  ])
  alert('Copied for Outlook!')
}
</script>

<template>
  <div class="esig-wrap">
    <form class="esig-form">
      <input v-model="form.name" type="text" placeholder="Full Name">
      <input v-model="form.title" type="text" placeholder="Title">
      <input v-model="form.office" type="text" placeholder="Office Phone">
      <input v-model="form.cell" type="text" placeholder="Cell Phone">
      <input v-model="form.email" type="email" placeholder="Email">
      <input v-model="form.website" type="text" placeholder="Website">

      <select v-model="form.color">
        <option value="gold">
          Gold
        </option>
        <option value="grey">
          Grey
        </option>
      </select>

      <select v-model="form.officeLayout">
        <option value="helena">
          Helena
        </option>
        <option value="bozeman">
          Bozeman
        </option>
      </select>
    </form>

    <div class="preview">
      <div v-html="signatureHtml" />
    </div>

    <div class="buttons">
      <button type="button" @click="copyHtml">
        Copy HTML
      </button>
      <button type="button" @click="copyWysiwyg">
        Copy for Outlook
      </button>
    </div>
  </div>
</template>

<style>
.esig-wrap {
  max-width: 760px;
  margin: 80px auto;
  padding: 24px;
  font-family: Arial, Helvetica, sans-serif;
}

.esig-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.esig-form input,
.esig-form select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.preview {
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  overflow: auto;
}

.buttons {
  display: flex;
  gap: 12px;
  margin-top: 18px;
}

.buttons button {
  padding: 9px 15px;
  border: 0;
  background: #948247;
  color: #fff;
  cursor: pointer;
}
</style>