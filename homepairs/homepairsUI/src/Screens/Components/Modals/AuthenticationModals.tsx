import {LoadingModal} from './LoadingModal'
import React from 'react'
import {Text} from 'react-native'

export function LoggingInModal(props:any){
    return <LoadingModal><Text>Logging In...</Text></LoadingModal>
}

export function CreatingAccountModal(props:any){
    return <LoadingModal><Text>Creating Your Account...</Text></LoadingModal>
}