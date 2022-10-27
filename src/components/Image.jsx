import React from 'react'

const Image = ({post_id, image_id, channel, isVideo}) => {
    // const image_src = `../../../../Webscraping/${channel}/images/${post_id}/${image_id}.jpg`
    // const image_src = './B_5aj9QFl6t_1.jpg'
    // const image_src = `https://tuc.cloud/index.php/s/a7SY9MnHnggCJGD/${channel}/images/${post_id}/${image_id}.jpg`
    const image_src = `https://tuc.cloud/index.php/apps/files_sharing/publicpreview/a7SY9MnHnggCJGD?file=/${channel}/images/${post_id}/${image_id}${isVideo ? '.png' : '.jpg'}&fileId=46793790&x=1800&y=1440&a=true`
  return (
    <div>
        <img src={image_src} style={{maxWidth: '500px', maxHeight: '800px'}} alt=""/>
    </div>
  )
}

export default Image