import React from 'react'
import NoveltyImage from './novelty.png'
import VisualStorytellingImage from './visual_storytelling.png'
import CuriosityImage from './curiosity.png'
import AcknowledgementImage from './acknowledgement.png'

const gamificationElements = {
    novelty: {
        name: 'novelty',
        image: NoveltyImage,
        description: 'This post is a typical type of post for Duolingo to utilise the element of Novelty. Through these kinds of posts, Duolingo announces new content and/or information – in this case announcing a new course in the app.'
    },
    ackowledgement: {
        name: 'ackowledgement',
        image: AcknowledgementImage,
        description: 'This post includes the gamification element Acknowledgement. Duolingo acknowledges the work and help of their worldwide volunteers, both in the caption as well as in the illustrated image itself. Other gamification elements in this post include cooperation – as the visual displays a community which have the same shared goal in mind, and Visual storytelling – as said community is portrayed in a familiar, characterisation adding to the narrative and imagination.'
    },
    visual_storytelling: {
        name: 'visual_storytelling',
        image: VisualStorytellingImage,
        description: 'In this post, Duolingo motivates and encourages their users through the character Duo. Duo is also used as a tool to tell the users about certain activities, events, updates, and so on, in a more playful, engaging way. Additionally, in this post the gamification element Curiosity is used “Check out our Stories to see where he’s off to first” making the users wonder about Duo and his adventures – and continuing the storytelling through the Instagram stories (i.e. interactive videos and photos).'
    },
    curiosity: {
        name: 'curiosity',
        image: CuriosityImage,
        description: 'Duolingo creates and sparks Curiosity through both the visualisation and wording used in the post. The post states that something is “Coming soon”, leaving users to guess what that might be. Additionally, the caption gives no further information as to what it is either, which further enhances the user’s need to know what is coming.'
    },
}

const Examples = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'row'}} >
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <div><h2>Examples:</h2></div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', border: '1px solid #ddd', padding: '10px'}}>
            <h4>Novelty</h4>
            <p style={{width: '500px'}}>{gamificationElements.novelty.description}</p>
            <img src={gamificationElements.novelty.image} alt="" style={{height: '150px'}} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', border: '1px solid #ddd', padding: '10px'}}>
            <h4>Visual Storytelling</h4>
            <p style={{width: '500px'}}>{gamificationElements.visual_storytelling.description}</p>
            <img src={gamificationElements.visual_storytelling.image} alt="" style={{height: '150px'}} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', border: '1px solid #ddd', padding: '10px'}}>
            <h4>Curiosity</h4>
            <p style={{width: '500px'}}>{gamificationElements.curiosity.description}</p>
            <img src={gamificationElements.curiosity.image} alt="" style={{height: '150px'}} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', border: '1px solid #ddd', padding: '10px'}}>
            <h4>Acknowledgement</h4>
            <p style={{width: '500px'}}>{gamificationElements.ackowledgement.description}</p>
            <img src={gamificationElements.ackowledgement.image} alt="" style={{height: '150px'}} />
        </div>
    </div>
</div>
  )
}

export default Examples