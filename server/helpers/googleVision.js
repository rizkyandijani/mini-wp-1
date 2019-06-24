const vision = require('@google-cloud/vision')


const client = new vision.ImageAnnotatorClient({
    keyFilename : './cloudVision.json'
})

const cekTag = (req,res,next) =>{
    console.log('masuk tag');
    
    if(!req.file){
        console.log('no file in helper tag');
        return next
    }

    console.log('req.file di gvision',req.file);
    
    console.log('req.file name image',req.file.filename);
    client
    .labelDetection(`./localStorage/${req.file.filename}`)
    .then(result =>{
        console.log('masuk then');
        const labels = result[0].labelAnnotations
        let tags = []
        labels.forEach(element => {
            tags.push(element.description)
        });
        // console.log('ini labels',labels);
        console.log('ini tags', tags);
        req.file.tags = tags
        next()
    })
    .catch(next)
}

module.exports = cekTag

// client
//   .labelDetection(`link_assets_or_image_url`)
//   .then(results => {
//     const labels = results[0].labelAnnotations;
//     console.log(theLabels)
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });