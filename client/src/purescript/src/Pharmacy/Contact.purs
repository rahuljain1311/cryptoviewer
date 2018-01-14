module Pharmacy.Contact (contact) where

import Prelude
import React.DOM as D
import React.DOM.Props as P
import React (ReactClass, createClassStateless, ReactElement, createFactory, ReactProps, ReactRefs, Read, ReactState, Write, ReadWrite)
import Utils.Helpers (ire)
import Data.Maybe
import Data.Nullable (toMaybe, Nullable)
import Native (changeLoc, windowOpen)

callButton :: forall props. { telNumber :: String | props } -> ReactElement
callButton props = D.button [ P.className "btn btn-primary btn-lg btn-block", P.onClick (\_ -> changeLoc ("tel:" <> props.telNumber)) ] 
             [ D.i [ P.className "fa fa-phone", P.aria { hidden: "true"} ] [] , D.text "Call" ]

call :: forall props. { telNumber :: String | props } -> ReactElement
call props = D.div [ P.className "col-xs-6" ] [ callButton props ]

directionButton :: forall props. { googleMap :: String | props } -> ReactElement
directionButton props = D.button [ P.className "btn btn-primary btn-lg btn-block", P.onClick (\_ -> windowOpen props.googleMap)] 
                        [ D.i [ P.className "fa fa-map-marker", P.aria { hidden: "true"}] []
                        , D.text "Directions"]

direction :: forall props. { googleMap :: String | props } -> ReactElement
direction props = D.div [ P.className "col-xs-6" ] [ directionButton props ]

contact :: forall props. { googleMap :: String, telNumber :: String, isPCP :: Boolean, overridePCP :: Boolean | props } -> ReactElement
contact props = case (props.isPCP && props.overridePCP) of
                  false -> D.div [ P.className "row pharmacy-info" ] [ call props, direction props ]
                  true -> ire
