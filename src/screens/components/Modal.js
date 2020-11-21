import React, { useState } from 'react'
import firebase from '../../fire'

const Modal = ({ setNotDoneCases, setShowModal }) => {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [theme, setTheme] = useState('')
  const [themeError, setThemeError] = useState('')
  const [desc, setDesc] = useState('')
  const [descError, setDescError] = useState('')
  const [image, setImage] = useState('')

  const [done, setDone] = useState(false)

  const handleCheck = () => {
    setDone(true)

    if (!name.length) {
      setNameError('Title, plz!!!')
      setDone(false)
    } else {
      setNameError('')
    }

    if (!theme.length) {
      setThemeError('Theme, plz!!!')
      setDone(false)
    } else {
      setThemeError('')
    }

    if (!desc.length) {
      setDescError('Description, plz!!!')
      setDone(false)
    } else {
      setDescError('')
    }
  }

  const handleAddVote = async () => {
    handleCheck()
    if (done) {
      if (window.confirm('Add new Vote?')) {
        const myCase = {
          name,
          comments: [],
          canRevote: true,
          description: desc,
          done: false,
          image,
          theme,
          voteFor: 0,
          voteAgainst: 0
        }
        const data = await (await firebase.firestore().collection('cases').add(myCase)).get()
        setNotDoneCases(prev => {
          return [{ id: data.id, data: myCase }, ...prev]
        })
        setShowModal(false)
      }
    }
  }


  return (
    <div onClick={e => e.stopPropagation()} className='body'>
      <div className='header'>
        <p>Add new vote</p>
      </div>
      <div className='main'>
        <div>
          <label>Title:</label>
          <input type='text' onChange={e => setName(e.target.value)} required placeholder='Settings page' />
          <p style={{ marginTop: -10, marginBottom: 3, color: 'red' }}>{nameError || ''}</p>
        </div>
        <div>
          <label>Theme:</label>
          <input type='text' onChange={e => setTheme(e.target.value)} required placeholder='Alias' />
          <p style={{ marginTop: -10, marginBottom: 3, color: 'red' }}>{themeError || ''}</p>
        </div>
        <div>
          <label>Description:</label>
          <textarea type='text' onChange={e => setDesc(e.target.value)} required placeholder='settings pagei guynery lavn es es es kexnin' />
          <p style={{ marginTop: -10, marginBottom: 3, color: 'red' }}>{descError || ''}</p>
        </div>
        <div>
          <label>Image URL:</label>
          <input type='text' onChange={e => setImage(e.target.value)} required placeholder='htpps://this.input_is.optional/image.png' />
        </div>
      </div>
      <div className='footer'>
        <div onClick={handleAddVote} className='button'>Add Vote</div>
      </div>
    </div>
  );
}

export default Modal;