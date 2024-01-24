import '../jquery.js'
import { FileToBase64,FileToBlob, bindCopy ,transitionChangeTitle} from '../utils.js'
import ImgFileCheckCompression from '../compression.js'
import { fileDataProcessing,uploadToGithub } from '../upload-handles.js'

// == 上传工具函数代码 ==
// 全局事件
// window.upload = {
//   evens: [],
//   onUpload: function (callback) {
//     this.evens.push(callback)
//   },
//   emit: function (data) {
//     for (let i = 0; i < this.evens.length; i++) {
//       this.evens[i](data)
//     }
//   }
// }


// === 上传逻辑 ===
// 给资源链接绑定copy功能
bindCopy(".resource_box", ".copyUrl", "href", "click");
// -- 上传前公共文件上传类 -- 
let UploadFromFile = async function (file) {
  file = await fileDataProcessing(file);
  if (file == null) return;
  file = await ImgFileCheckCompression(file);
  if (file == null) return;
  // transitionChangeTitle("base64...");
  // let base64Data = await FileToBase64(file);
  let fileData = await FileToBlob(file);
  console.log("读取数据",fileData);
  // 还原标题
  // transitionChangeTitle(); 
  uploadToGithub(fileData, file.name);

}
export { UploadFromFile }