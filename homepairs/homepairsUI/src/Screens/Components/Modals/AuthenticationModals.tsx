import React from 'react';
import {Text} from 'react-native';
import {LoadingModal} from './LoadingModal';

export function LoggingInModal(){
    return <LoadingModal><Text>Logging In...</Text></LoadingModal>;
}

export function CreatingAccountModal(){
    return <LoadingModal><Text>Creating Your Account...</Text></LoadingModal>;
}