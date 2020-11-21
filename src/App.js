import React, { useEffect, useState } from 'react'
import HomePage from './screens/HomePage'
import firebase from './fire'

import loadScreen from './assets/loading.png'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [doneCases, setDoneCases] = useState([])
  const [notDoneCases, setNotDoneCases] = useState([])

  const fetchCases = async () => {
    const fetch = async (where = '') => {
      let arr = []
      arr = await firebase.firestore().collection('cases').where(...where).get()
        .then(querySnapshot => {
          querySnapshot.docs.map(doc => arr.unshift({ data: doc.data(), id: doc.id }))
          return arr
        })
      return arr
    }
    const doneCases = await fetch(['done', '==', true])
    const notDoneCases = await fetch(['done', '==', false])
    setDoneCases(doneCases)
    setNotDoneCases(notDoneCases)
    setTimeout(() => setIsLoading(false), 3500)
  }

  useEffect(() => {
    fetchCases()
  }, [])

  if (isLoading) {
    return (
      <div className='Loading'>
        <img src={loadScreen} alt={'loading'} width='100%' height='100%' />
      </div>
    )
  } else {
    return <HomePage
      doneCases={doneCases}
      setDoneCases={setDoneCases}
      notDoneCases={notDoneCases}
      setNotDoneCases={setNotDoneCases}
    />
  }
}

export default App