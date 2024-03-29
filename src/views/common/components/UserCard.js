// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from "react-fontawesome"

type UserSquareProps = {
  translate: {[string]: string},
  followed?: boolean,
}
const UserCard = (props: UserSquareProps) => {
  const {translate, followed} = props
  // const followed = true
  return (
      <div className={followed ? 'user-card user-card-followed' : 'user-card'}>
        {followed
            ? <p className='followed-text'>{translate['Followed']}</p>
            : <FontAwesome name='plus' className='pulse follow-plus'/>
        }
        <img alt='user-profile' src='http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg' className='user-image'/>
        <div className='user-detail-container'>
          <p className='user-card-name'>نام فرد</p>
          <p className='user-card-desc'>نام فرد</p>
        </div>
      </div>
  )
}

UserCard.PropTypes = {
  translate: PropTypes.object.isRequired,
  followed: PropTypes.bool,
}
export default UserCard