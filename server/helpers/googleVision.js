// const vision = require('@google-cloud/vision')


// const client = new vision.ImageAnnotatorClient({
//     keyFileName : './cloudVision.json'
// })

// const cekTag = (req,res,next) =>{
//     console.log('masuk tag');
    
//     if(!req.file){
//         console.log('no file in helper tag');
//         return next
//     }
//     console.log(req.file.cloudStoragePublicUrl);
//     client
//     .labelDetection(req.file.cloudStoragePublicUrl)
//     .then(result =>{
//         console.log('masuk then');
//         const labels = result[0].labelAnnotations
//         let tags = labels
//         console.log('ini labels',labels);
//         console.log('ini tags', tags);
//         next()
//     })
//     .catch(next)
// }

// module.exports = cekTag

// // client
// //   .labelDetection(`link_assets_or_image_url`)
// //   .then(results => {
// //     const labels = results[0].labelAnnotations;
// //     console.log(theLabels)
// //   })
// //   .catch(err => {
// //     console.error('ERROR:', err);
// //   });