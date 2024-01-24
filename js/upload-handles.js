// 引入配置对象
import configObj from './modules/config.js'
import { transitionChangeTitle, urlFormat } from './utils.js'

let viewMap = {
    resourceBox: $("#resource_box"),
    msgBox: $("#msg"),
    isUploading: false,
    clear() {
        // this.resourceBox.html("")
        this.msgBox.html("")
    },
    checkIsHasTask() {
        if (this.isUploading) alert("当前已经有正在上传的任务！");
        return this.isUploading;
    },
    msg(msg, isAppend = false) {
        let existMsg = this.msgBox.html();
        this.msgBox.html(isAppend ? existMsg + msg : msg);
    },
    placeResource(resourceHtml) {
        // this.resourceBox.html(resourceHtml);
        this.resourceBox.append(resourceHtml);
    },
    appendResourceUrl(initUrl, cdnUrl) {
        this.msg(`<span style="background:#9e9831;" >( 默认复制加速链接，如果是一些特殊文件加速链接可能打不开，所以在这里给出了原链~ )<span>`, true)
        this.placeResource(`
        <p style="color:#2cb144;" class="resource_box" > 
            <a href="${initUrl}" class="copyUrl" >文件原链<i class="fa fa-clone" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;
            <a href="${cdnUrl}" class="copyUrl">加速链接<i class="fa fa-clone" aria-hidden="true"></i></a>
        </p>`)
    },
    setUploading() {
        this.isUploading = true;
        this.clear();
        this.msg(`<p>① 正在上传，请稍等...</p>`);
        transitionChangeTitle("ing...");
    },
    setUploadCompleted(infoObj) {
        this.isUploading = false;
        if (infoObj != null && infoObj.errInfo == null) {
            this.uploadSuccess(infoObj);
        } else {
            this.uploadFail(infoObj);
        }
    },
    uploadSuccess({ initUrl, cdnUrl, isImage }) {
        // 将预图片去掉
        this.sensingArea(null)
        let mdImg = urlFormat(cdnUrl, "md")
        console.log(cdnUrl);
        let that = this;
         // 如果不是图片，显示下载链接复制选项
         that.msg(`<p id='uploadSuccessTis'>② 上传成功</p>`, true);
         transitionChangeTitle("success", 1000);
         if (!isImage) {
             that.appendResourceUrl(initUrl, cdnUrl);
         } else {
             // 图片回显
             let html = `
             <div style="width=100%;height:30px;"></div>
             <center>
             <table style="width:80%;">
             <tbody style="width:100%;"><tr style="width:100%;">
                 <td style="width:300px; text-align: center;">
                     <img width="" height="" src="${cdnUrl}" style="max-width: 300px;max-height: 300px;">
                 </td>
                 <div style="width:50px;height:100%;"></div>
                 <td style="text-align:left;">
                   <div class="dlinput_header">URL</div>
                   <div class="dlinput_container">
                       <div class="row">
                           <div class="col-md-8">
                               <input class="form-control" type="text" onclick="this.select();" value="${cdnUrl}">
                           </div>
                       </div>
                   </div>
                     <div class="dlinput_header">HTML</div>
                     <div class="dlinput_container">
                         <div class="row">
                             <div class="col-md-8">
                                 <input class="form-control" type="text" onclick="this.select();" value="${urlFormat(cdnUrl, "html")}">
                             </div>
                         </div>
                     </div>
                     <div class="dlinput_header mt3">BBCode</div>
                     <div class="dlinput_container">
                         <div class="row">
                             <div class="col-md-8">
                                 <input class="form-control" type="text" onclick="this.select();" value="${urlFormat(cdnUrl, "bb")}">
                             </div>
                         </div>
                     </div>
                     <div class="dlinput_header mt3">Markdown</div>
                     <div class="dlinput_container">
                         <div class="row">
                             <div class="col-md-8">
                                 <input class="form-control" type="text" onclick="this.select();" value="${mdImg}">
                             </div>
                         </div>
                     </div>
                 </td>

             </tr></tbody>
         </table>
         </center>
             `
             that.placeResource(html)
         }
         //复制到剪贴板
        // navigator.clipboard.writeText(isImage ? mdImg : cdnUrl).then(function () {
        //     // 如果不是图片，显示下载链接复制选项
        //     that.msg(`<p id='uploadSuccessTis'>② 上传成功了，请查看剪切板！ヾ(^▽^*)))</p>`, true);
        //     transitionChangeTitle("success", 1000);
        //     if (!isImage) {
        //         that.appendResourceUrl(initUrl, cdnUrl);
        //     } else {
        //         // 图片回显
        //         let html = `
        //         <table style="width:100%;">
        //         <tbody><tr>
        //             <td style="width:260px; text-align: center;">
        //                 <img width="" height="" src="${cdnUrl}" style="max-width: 300px;max-height: 300px;">
        //             </td>
        //             <td class="padding10" style="text-align:left;">
        //               <div class="dlinput_header">URL</div>
        //               <div class="dlinput_container">
        //                   <div class="row">
        //                       <div class="col-md-8">
        //                           <input class="form-control" type="text" onclick="this.select();" value="${cdnUrl}">
        //                       </div>
        //                   </div>
        //               </div>
        //                 <div class="dlinput_header">HTML</div>
        //                 <div class="dlinput_container">
        //                     <div class="row">
        //                         <div class="col-md-8">
        //                             <input class="form-control" type="text" onclick="this.select();" value="${urlFormat(cdnUrl, "html")}">
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div class="dlinput_header mt3">BBCode</div>
        //                 <div class="dlinput_container">
        //                     <div class="row">
        //                         <div class="col-md-8">
        //                             <input class="form-control" type="text" onclick="this.select();" value="${urlFormat(cdnUrl, "bb")}">
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div class="dlinput_header mt3">Markdown</div>
        //                 <div class="dlinput_container">
        //                     <div class="row">
        //                         <div class="col-md-8">
        //                             <input class="form-control" type="text" onclick="this.select();" value="${mdImg}">
        //                         </div>
        //                     </div>
        //                 </div>
        //             </td>

        //         </tr></tbody>
        //     </table>
        //         `
        //         that.placeResource(html)
        //     }
        // }, function () {
        //     // 用户离开的页面导致复制失败，显示手动复制
        //     that.msg("<span style='color:red'>② Writing to the clipboard failed because you are not on this page :-( </span>")
        //     that.placeResource(`<p style="color:#2cb144;" class="resource_box" > <a href="${cdnUrl}" class="copyUrl" >手动复制（MD图片）<i class="fa fa-clone" aria-hidden="true"></i></a></p>`)
        //     // 给资源链接绑定copy功能
        //     transitionChangeTitle("No way!", 500);
        // });
    },
    uploadFail({ errInfo, fileName }) {
        if (errInfo.status == 422) {
            // 将预图片去掉
            this.sensingArea(null)
            // 手动构建资源URL
            let initUrl = `https://raw.githubusercontent.com/${configObj.userAndRepo}/${configObj.branch}${configObj.path}/${new Date().Format("yyyy")}/${new Date().Format("MM")}/${new Date().Format("dd")}/${fileName}`
            let cdnUrl = cdn(initUrl)
            // 远程仓库已存在重名文件！
            this.msg(`<p style="color:#fccd09;">② 无法上传，远程仓库已存在重名文件！</p>`, true)
            this.appendResourceUrl(initUrl, cdnUrl);
            // 给资源链接绑定copy功能
            transitionChangeTitle("ed", 1000);
        } else {
            transitionChangeTitle("fail", 1000);
            this.msg("<p style='color:red'>② 上传失败了，请检查配置与网络是否正常！  ┗|｀O′|┛ 嗷~~</p>", true)
        }

    },
    sensingArea(preShowURL = null) {
        $('#img_pre_show').attr('src', preShowURL).css({
            "display": preShowURL == null ? "none" : "block"
        })
        if (preShowURL == null) {
            $("#upload_hint").show();
            // 同时清空选择的文件
            $("#myFile").val(null);
        } else {
            $("#upload_hint").hide();
        }
    }
}

// 文件数据格式统一为File
function fileDataProcessing(file) {
    return new Promise((resolve, reject) => {
        if (file.kind == 'file' && file instanceof DataTransferItem) {
            // 如果是DataTransferItem 就转换成File类型
            resolve(file.getAsFile());
        }
        // 统一为File
        if (!(file instanceof File) || file.size <= 0) {
            resolve(null)
        } else {
            resolve(file)
        }
    })
}
// 图片文件生成以时间缀为文件名，原后缀为后缀的fullFileName
function genTimestampImgFileName(originalFileName) {
    if (originalFileName == null) return originalFileName;
    let suffix = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
    return new Date().Format("yyyyMMdd-hhmmss") + "-" + new Date().getMilliseconds() + "." + suffix
}

// cdn加速
function cdn(url) {
    // let cdnUrl = (configObj.cdn != null && configObj.cdn.indexOf("http") == 0) ? configObj.cdn : "https://cdn.jsdelivr.net/gh";
    // if (cdnUrl.lastIndexOf("/") != cdnUrl.length - 1) cdnUrl += "/";
    // let delimiter = configObj.branch + "/";
    // let start_index = url.indexOf(delimiter);
    // let _last_str = url.substring(start_index, url.length)
    // let last_str = configObj.userAndRepo + "@" + _last_str
    // 返回加速后的链接
    // return cdnUrl + last_str;
    // return url.replace("");

    //cdn加速在服务端已完成
    return url;
}

// 主要给 UploadFromFile 使用，是UploadFromFile的支撑
let uploadToGithub = function (fileData, fileName) {
    if (fileData == null) {
        resolve(null)
        return;
    }
    if(configObj.token != "busyo"){
        alert("秘钥错误");
        return;
    }
    // 从base64提取数据真正的数据
    // const commaIdx = base64Data.indexOf(",");
    // let fileData = base64Data.substring(commaIdx + 1);
    // 决定出是否为图片与最终的fileName
    let isImage = true;
    fileName = genTimestampImgFileName(fileName);
    // if (base64Data.startsWith("data:image")) {
    //     fileName = genTimestampImgFileName(fileName);
    //     isImage = true;
    // }
    // 判断当前是否有任务
    if (viewMap.checkIsHasTask()) return;
    // 设置为正在上传
    viewMap.setUploading();
    // $.ajax({
    //     type: 'POST',
    //     // url: `https://api.github.com/repos/${configObj.userAndRepo}/contents${configObj.path}/${new Date().Format("yyyy")}/${new Date().Format("MM")}/${new Date().Format("dd")}/${fileName}`,
    //     url: "https://119.91.196.91/imgUpload/",
    //     contentType: "application/json;charset=utf-8",
    //     dataType: 'json',
    //     data: JSON.stringify({
    //         // message: `Web tool: Upload ${fileName} file`,
    //         // branch: configObj.branch,
    //         'content': fileData,
    //         'fileName': fileName
    //     }),
    //     timeout: 3000, // 设置超时时间为0，表示无限等待
    //     success(data) {
    //         let initUrl = data.content.download_url;
    //         viewMap.setUploadCompleted({
    //             initUrl,
    //             cdnUrl: cdn(initUrl),
    //             isImage
    //         });
    //     },
    //     error(errInfo) {
    //         viewMap.setUploadCompleted({ errInfo, fileName })
    //     }
    // })

    // let controller = new AbortController();
    // //请求超时
    // let timer = setTimeout(() => {
    //     controller.abort();
    // }, 3000);

    fetch(new Request('https://119.91.196.91/imgUpload/', {
        method: 'POST',
        body: JSON.stringify({
            // message: `Web tool: Upload ${fileName} file`,
            // branch: configObj.branch,
            'content': fileData,
            'fileName': fileName
        }),
        // signal: controller.signal
    })).then(function (response) {
        let res = response.json();
        // res.then((data) => {
        //     console.log(data);
        // });
        // console.log(response, res);
        return res;
    }).then((data) => {

        console.log("data内容", data);
        let initUrl = data.content.download_url;
        if (initUrl) {
            viewMap.setUploadCompleted({
                initUrl,
                cdnUrl: cdn(initUrl),
                isImage
            });
        } else {
            viewMap.setUploadCompleted({ errInfo: data.content.err, fileName:fileName })
        }
        // clearTimeout(timer);
    })
}

export { fileDataProcessing, uploadToGithub, viewMap }