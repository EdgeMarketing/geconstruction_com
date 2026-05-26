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

const colors = {
  gold: '#8e7b43',
  grey: '#575a5d',
}

const getOfficeInfo = () => {
  if (form.value.officeLayout === 'bozeman') {
    return '7585 Shedhorn Dr, Bozeman, MT 59718'
  }

  return '505 Shephard Way, Helena, MT 59601'
}

const cleanNumber = num => num.replace(/\D/g, '')

const getWebsiteUrl = () => {
  return form.value.website.startsWith('http')
    ? form.value.website
    : `https://${form.value.website}`
}

const generateSignature = () => {
  const accentColor = colors[form.value.color]
  const officeInfo = getOfficeInfo()

  signatureHtml.value = `
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;color:#575a5d;">
  <tr>
    <td style="padding:0 0 0 12px;border-left:4px solid ${accentColor};font-family:Arial,Helvetica,sans-serif;">
      <div style="font-size:18px;line-height:22px;font-weight:bold;letter-spacing:1px;color:#575a5d;text-transform:uppercase;">
        ${form.value.name}
      </div>

      <div style="font-size:13px;line-height:18px;color:${accentColor};text-transform:uppercase;padding-bottom:8px;">
        ${form.value.title}
      </div>

      <div style="font-size:13px;line-height:19px;color:#575a5d;">
        <strong style="color:#575a5d;">Office:</strong>
        <a href="tel:${cleanNumber(form.value.office)}" style="color:#575a5d;text-decoration:none;">
          ${form.value.office}
        </a>
        &nbsp;|&nbsp;
        <strong style="color:#575a5d;">Cell:</strong>
        <a href="tel:${cleanNumber(form.value.cell)}" style="color:#575a5d;text-decoration:none;">
          ${form.value.cell}
        </a>
        <br>

        <strong style="color:#575a5d;">Email:</strong>
        <a href="mailto:${form.value.email}" style="color:#575a5d;text-decoration:none;">
          ${form.value.email}
        </a>
        <br>

        <strong style="color:#575a5d;">Address:</strong>
        ${officeInfo}
        <br>

        <strong style="color:#575a5d;">Website:</strong>
        <a href="${getWebsiteUrl()}" style="color:#575a5d;text-decoration:none;">
          ${form.value.website}
        </a>
      </div>
    </td>
    <tr>
      <td style="padding:20px 0 0 0;">
        <img src="http://geconstruction.com/images/logo.png" alt="GE Construction Logo" style="height:30px;">
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