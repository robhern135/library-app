export const toDataURL = (src, callback) => {
  var canvas = document.createElement("canvas")
  var context = canvas.getContext("2d")
  canvas.height = this.naturalHeight
  canvas.width = this.naturalWidth
  context.drawImage(this, 0, 0)
  var dataURL = canvas.toDataURL("image/jpeg")
  callback(dataURL)
  return dataURL
}
