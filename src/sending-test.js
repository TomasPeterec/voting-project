import React, { useState } from 'react'

function SendingTest (votingsResult) {
  const [depositOfResults, setDepositOfResults] = useState(votingsResult)

  const handleClick = async () => {
    const data = {
      foreign_key: 5,
      mail_or_id: 'Viktor Viktorovsky',
      voted_values: JSON.stringify(
        depositOfResults.votingsResult.map((item) => {
          return { title: item.title, votingValue: item.votingValue }
        })
      )
    }

    setDepositOfResults(data)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROOT_VAR}/api/userVotes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      )

      if (response.ok) {
        console.log('Data sent successfully!')
      } else {
        console.log('Failed to send data.')
      }
    } catch (error) {
      console.error('Error sending data:', error)
    }
  }

  return <button onClick={handleClick}>Send Data</button>
}

export default SendingTest
