import React, { useCallback, useEffect, useState } from 'react'
import firebase from '../../fire'

const Card = ({ data, setNotDoneCases, setDoneCases }) => {
  const [showComments, setShowComments] = useState(false)
  const [readMore, setReadMore] = useState(false)
  const [comment, setComment] = useState('')
  const [can, setCan] = useState(true)

  const canIVote = useCallback(() => {
    let localCases = JSON.parse(localStorage.getItem('myCases')) || []
    localCases = localCases.filter(id => id === data.id)
    if (localCases.length) {
      return false
    } else {
      return true
    }
  }, [data])



  useEffect(() => {
    let cano = canIVote()
    setCan(cano)
  }, [can, canIVote])

  let { name, theme, description, image, comments, voteAgainst, voteFor } = data.data
  let desc = description.length > 160 && !readMore ? description.slice(-160) + '... ' : description + ' '

  const vote = async (v) => {
    if (window.confirm('Vote?') && canIVote()) {
      const db = firebase.firestore().collection('cases').doc(data.id)
      await db.update(v === 'up' ? { voteFor: ++voteFor } : { voteAgainst: ++voteAgainst })
      let myCases = JSON.parse(localStorage.getItem('myCases')) || []
      localStorage.setItem('myCases', JSON.stringify([data.id, ...myCases]))
      setCan(false)

      if (voteFor + voteAgainst === 7) {
        await db.update({ done: true })
        setNotDoneCases(prev => prev.filter(c => c.id !== data.id))
        setDoneCases(prev => [{
          id: data.id, data: {
            name, theme, description, image, comments, voteAgainst, voteFor
          }
        }, ...prev])
      }
    }
  }

  const addComment = async () => {
    comments.unshift(comment)
    await firebase.firestore().collection('cases').doc(data.id).update({ comments })
    setComment('')
  }

  return (
    <div className='Card Card__notDone'>
      <div className='header'>
        <p className='title'>{name}</p>
        <p className='theme'>{theme}</p>
      </div>
      <div className='main' style={readMore || image.length ? { height: 'auto' } : {}}>
        <p className='desc'>
          {desc}
          {description.length > 160 ? <span onClick={() => setReadMore(prev => !prev)}>{readMore ? 'close' : 'read more'}</span> : null}
        </p>
        {image.length ? <img src={image} alt='img' /> : null}
      </div>
      <div className='footer' style={showComments ? { height: 'auto' } : {}}>
        <div className='vote' style={!can ? { opacity: 0.5, cursor: 'not-allowed' } : {}}>
          <div onClick={can ? vote.bind(this, 'up') : null} className='vote__accepted'>
            <span className="material-icons">thumb_up</span>
          </div>
          <div onClick={can ? vote.bind(this, 'down') : null} className='vote__denyed'>
            <span className="material-icons">thumb_down</span>
          </div>
        </div>
        <div className='func' onClick={() => setShowComments(prev => !prev)} >
          <p>{showComments ? 'Hide Comments' : 'Show Comments'}</p>
          <span className="material-icons">{!showComments ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</span>
        </div>
        {
          showComments ? (
            <div className='comments'>
              <div className='comms'>
                {comments.map((c, index) => <div key={index} className='item'>{c}</div>)}
              </div>
              <div className='addComm'>
                <input className='input' type='text' value={comment} onChange={e => setComment(e.target.value)} />
                <span onClick={addComment} className="material-icons">send</span>
              </div>
            </div>
          ) : null
        }
      </div>
    </div>
  );
}

export default Card