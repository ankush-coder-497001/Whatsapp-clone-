export const Mediadownload =  (e,originalname)=>{
  e.preventDefault();
try {
  fetch(originalname).then(res=>res.blob()).then((blob)=>{
const url = window.URL.createObjectURL(blob)
const a =  document.createElement('a');
a.style.display = 'none'
a.href = url
const namesplit = originalname.split('/')
const dublicatename = namesplit.pop()
a.download = "" + dublicatename + ""
document.body.appendChild(a)
a.click();
window.URL.revokeObjectURL(url)
  }).catch(error=>console.log('error while downloading'))
} catch (error) {
  console.log('error while downloading')
}
}