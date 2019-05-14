import Stonex from 'stonex'
import React from 'react'

export declare type MapStoreToProps = <MP=any>(state: (Stonex.StateSnapshot<MP> | object), modules: (Stonex.StonexModules<MP> | object), ownProps: any) => object

export declare type connect = (mapStoreToProps: MapStoreToProps) => (WrappedComponent: React.Component) => React.Component

export declare type ReactStonexModifier = Stonex.Modifier<any> | Function
