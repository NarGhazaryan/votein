import React, { useState } from 'react'
import firebase from '../../fire'

const Card = ({ data, setDoneCases, setNotDoneCases }) => {
  const [readMore, setReadMore] = useState(false)

  let { name, theme, description, voteFor, voteAgainst, canRevote, image, comments } = data.data
  let desc = description.length > 160 && !readMore ? description.slice(-160) + '... ' : description + ' '

  const startRevote = async () => {
    await firebase.firestore().collection('cases').doc(data.id).update({
      canRevote: false,
      done: false,
      voteFor: 0,
      voteAgainst: 0
    })
    setNotDoneCases(prev => [{ id: data.id, data: { name, theme, description, voteFor: 0, voteAgainst: 0, canRevote: false, done: false, image, comments } }, ...prev])
    setDoneCases(prev => prev.filter(i => i.id !== data.id))
    let localCases = JSON.parse(localStorage.getItem('myCases'))
    localCases = localCases.filter(i => i.id === data.id)
    localStorage.setItem('myCases', JSON.stringify(localCases))
  }

  return (
    <div className='Card Card__Done'>
      <div className='header'>
        <p className='title'>{name}</p>
        <p className='theme'>{theme}</p>
      </div>
      <div className='main' style={readMore ? { height: 'auto' } : {}}>
        <p className='desc'>
          {desc}
          {description.length > 160 ? <span onClick={() => setReadMore(prev => !prev)}>{readMore ? 'close' : 'read more'}</span> : null}
        </p>
      </div>
      <div className='footer'>
        <div className='vote'>
          <div className={`vote__done ${voteFor >= voteAgainst ? 'vote__accepted' : 'vote__denyed'}`}>
            {voteFor >= voteAgainst ? 'Accepted' : 'Denyed'}
          </div>
        </div>
        <div className={`func ${!canRevote ? 'disabled' : ''}`} onClick={canRevote ? startRevote : null} >
          <p>Send to Revoteing</p>
          <span className="material-icons">settings_backup_restore</span>
        </div>
      </div>
    </div>
  );
}

export default Card