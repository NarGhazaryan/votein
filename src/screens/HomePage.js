import React, { useState } from 'react'

import logo from '../assets/logo.png'

import CardDone from './components/CardDone'
import CardNotDone from './components/CardNotDone'
import Modal from './components/Modal'

const HomePage = ({ doneCases, setDoneCases, notDoneCases, setNotDoneCases }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={`HomePage ${showModal ? 'blur' : ''}`}>

      <header>
        <img src={logo} alt='logo' />
        <span onClick={() => setShowModal(true)} className="material-icons">add_circle_outline</span>
      </header>

      <main>
        <div className='done'>
          <div className='done__header'><p>Done Votes</p></div>
          <div className='done__main'>
            {doneCases.map((c, index) => <CardDone setDoneCases={setDoneCases} setNotDoneCases={setNotDoneCases} key={index} data={c} />)}
          </div>
        </div>
        <div className='line' />
        <div className='notDone'>
          <div className='notDone__header'><p>Not Done Votes</p></div>
          <div className='notDone__main'>
            {notDoneCases.map((c, index) => <CardNotDone setDoneCases={setDoneCases} setNotDoneCases={setNotDoneCases} key={index} data={c} />)}
          </div>
        </div>
      </main>
      {showModal ? (
        <div onClick={() => {
          if (window.confirm('Close modal?')) {
            setShowModal(false)
          }
        }} className='modal'>
          <Modal setShowModal={setShowModal} setNotDoneCases={setNotDoneCases} />
        </div>
      ) : null}
    </div>
  )
}

export default HomePage