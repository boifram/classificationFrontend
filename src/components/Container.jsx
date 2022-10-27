import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from './Image'
import Examples from './Examples'



const defaultElements = {
    novelty: false,
    acknowledgement: false,
    visual_storytelling: false,
    curiosity: false
}

const Container = ({user='Wolfram'}) => {
    const [currentPost, setCurrentPost] = useState(null)
    const [currentImages, setCurrentImages] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [submittedPosts, setSubmittedPosts] = useState(0)

    const [selectedElement, setSelectedElement] = useState(defaultElements)

    const [noElement, setNoElement] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        axios.get(`/${user}/count_submitted`)
            .then(response=>{
                setSubmittedPosts(response.data.count ?? 0)
            })
            .catch(err=>console.log(err))
    }, [loading, user])

    const changeSelectedElement = (element, checked) => {
        if(checked && noElement) setNoElement(false)
        setSelectedElement(prev=>({...prev, [element]: checked}))
    }

    const selectNoElement = (checked) => {
        setNoElement(checked)
        if(!checked) return
        setSelectedElement(defaultElements)
    }

    const changeSelectedImage = (newValue) => {
        if(newValue<0 || newValue>=currentImages.length) return
        setSelectedImage(newValue)
    }

    const getNewPost = () => {
        setSelectedImage(0)
        setLoading(true)
        axios.get('/random_post')
            .then(response=>{
                setCurrentPost(response.data)
                return axios.get(`/image/${response.data.post_id}`)
            })
            .then(response=>{
                setCurrentImages(response.data)
                setSelectedElement(defaultElements)
                setNoElement(false)
                setLoading(false)
            })
            .catch(err=>{
                console.log(err)
                setLoading(false)
            })
    }

    const submitCoding = () => {
        const body = {
            "novelty": selectedElement.novelty ? 1 : 0, 
            "visual_storytelling": selectedElement.visual_storytelling ? 1 : 0, 
            "curiosity": selectedElement.curiosity ? 1 : 0, 
            "acknowledgement": selectedElement.acknowledgement ? 1 : 0
          }
        axios.patch(`/${currentPost.post_id}/${user}`, body)
          .then(response=>{
            getNewPost()
          })
          .catch(err=>console.log(err))
    }

  return (
    <div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '50px'}}>
            <div style={{display: 'flex', flexDirection: 'row', padding: '10px', border: '1px solid #ddd'}}>
                <div style={{display: 'flex', flexDirection: 'column'}} >
                    <div style={{display: 'flex', flexDirection: 'row'}} >
                        {currentImages?.length>1 && <button 
                            onClick={()=>changeSelectedImage(selectedImage-1)}
                            disabled={!currentImages || currentImages.length<2 || selectedImage<=0}
                            >{'<'}</button>}
                        {currentImages && !loading && <Image post_id={currentPost.post_id} image_id={currentImages[selectedImage].image_id} channel={currentPost.channel} isVideo={currentImages[selectedImage].alt==="video"} />}
                        {loading && <div style={{width: '500px', height: '500px'}}></div>}
                        {currentImages?.length>1 && <button 
                            onClick={()=>changeSelectedImage(selectedImage+1)}
                            disabled={!currentImages || currentImages.length<2 || selectedImage>=currentImages.length-1}
                        >{'>'}</button>}
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', width: '500px', justifyContent: 'space-around'}} >
                        <span>{`Image ${selectedImage+1}/${currentImages?.length}`}</span>
                        <span>{currentImages && currentImages[selectedImage].alt==="video" && "Screenshot of Video"}</span>

                    </div>
                    {currentImages && currentImages[selectedImage].text_detection_english &&
                        <div style={{display: 'flex', flexDirection: 'column', width: '500px', alignItems: 'flex-start', justifyContent: 'center', marginTop: '15px'}} >
                        <span style={{margin: '5px 20px', fontSize: '10pt', color: '#777'}}>Translated Image Text:</span>
                        <p style={{border: '1px solid #ddd', margin: '0 10px', padding: '10px'}}>
                            {currentImages[selectedImage].text_detection_english}
                        </p>
                    </div>}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', width: '500px', gap: '30px'}} >
                    
                    <div>
                        <span style={{margin: '5px 20px', fontSize: '10pt', color: '#777'}}>Original Caption: </span>
                        <p style={{border: '1px solid #ddd', margin: '0 10px', padding: '10px'}}>
                        {currentPost?.caption}
                        </p>
                    </div>
                    {currentPost?.channel!=='duolingo' && <div>
                        <span style={{margin: '5px 20px', color: '#777', fontSize: '10pt'}}>English translation: </span>
                        <p style={{border: '1px solid #ddd', margin: '0 10px', padding: '10px'}}>
                        {currentPost?.caption_english}
                        </p>
                    </div>}
                    <div style={{marginLeft: '20px', }}>
                        <p>{`Posted by ${currentPost?.channel}, ${new Date(currentPost?.date).toLocaleDateString()}`}</p>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', gap: '50px', alignItems: 'center', margin: '30px'}} >
                <div style={{display: 'flex', flexDirection: 'column'}} >
                <form action="">
                    <div  style={{display: 'flex', flexDirection: 'row', gap: '15px'}}>
                        <div >
                            <input 
                                type="checkbox" 
                                id='novelty' 
                                name='novelty' 
                                checked={selectedElement.novelty} 
                                onChange={(e)=>changeSelectedElement('novelty', e.target.checked)} 
                            />
                            <label htmlFor="novelty">Novelty</label><br />
                            <input 
                                type="checkbox" 
                                id='visual_storytelling' 
                                name='visual_storytelling' 
                                checked={selectedElement.visual_storytelling} 
                                onChange={(e)=>changeSelectedElement('visual_storytelling', e.target.checked)} 
                                />
                            <label htmlFor="visual_storytelling">Visual Storytelling</label><br />
                        </div>
                        <div >
                            <input 
                                type="checkbox" 
                                id='curiosity' 
                                name='curiosity' 
                                checked={selectedElement.curiosity} 
                                onChange={(e)=>changeSelectedElement('curiosity', e.target.checked)} 
                                 />
                            <label htmlFor="curiosity">Curiosity</label><br />
                            <input 
                                type="checkbox" 
                                id='acknowledgement' 
                                name='acknowledgement' 
                                checked={selectedElement.acknowledgement} 
                                onChange={(e)=>changeSelectedElement('acknowledgement', e.target.checked)} 
                                />
                            <label htmlFor="acknowledgement">Acknowledgement</label><br />
                        </div>
                        <div className='switch-container'>
                        
                        <label className="switch">
                            <input 
                                type="checkbox" id='switch' checked={noElement} onChange={(e)=>selectNoElement(e.target.checked)} />
                            <span className="slider round"></span>
                            
                        </label>
                        <label className='switch-label' htmlFor="switch">No Element</label><br />
                        </div>
                    </div>
                   
                    
                </form>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}} >
                <button 
                    onClick={submitCoding} 
                    disabled={!noElement && !selectedElement.acknowledgement && !selectedElement.curiosity && !selectedElement.novelty && !selectedElement.visual_storytelling} 
                    >Submit
                </button>
                <button onClick={getNewPost}>Reload</button>
                <p style={{fontSize: '10pt', color: '#777'}}>{`You submitted ${submittedPosts} Posts.`}</p>
                </div>
            </div>
            <Examples />
        </div>
    </div>
  )
}

export default Container