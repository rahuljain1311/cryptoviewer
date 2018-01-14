module Pharmacy.Direction (dirUI) where

import Prelude
import React.DOM as D
import React.DOM.Props as P
import React (ReactElement)
import Utils.Helpers (ire)
import Data.Maybe
import Data.Nullable (toMaybe, Nullable)
import Native (changeLoc, windowOpen, modalOpen)

callIcon :: ReactElement
callIcon = D.i [ P.className "fa fa-phone fa-lg", P.aria {hidden: "true"}, P.style { paddingRight: "6px"}] []

callButton :: forall props. { telNumber :: String | props } -> ReactElement
callButton props = D.button [ P.className "btn btn-primary", P.style { width: "90%", position: "relative", right: "-12px"}, P.onClick (\_ -> changeLoc ("tel:" <> props.telNumber)) ]
             [callIcon, D.text "Call"]

call :: forall props. { telNumber :: String | props } -> ReactElement
call props = D.div [ P.className "btn-group p2"] [ callButton props ]

scheduleIcon :: ReactElement
scheduleIcon = D.i [ P.className "fa fa-calendar fa-lg", P.aria {hidden: "true"}, P.style { paddingRight: "6px" }] []

scheduleSpan :: ReactElement
scheduleSpan = D.span [ P.style { textOverflow: "ellipsis" }] [ D.text "Schedule"]

scheduleBtn :: ReactElement
scheduleBtn = D.button [ P.className "btn btn-primary", P.style { width: "90%"}, P.onClick (\_ -> modalOpen "#sched-modal") ] [ scheduleIcon, scheduleSpan ]

schedule :: ReactElement
schedule = D.div [ P.className "btn-group p2" ] [ scheduleBtn ]

directionIcon :: ReactElement
directionIcon = D.i [ P.className "fa fa-map-marker fa-lg", P.aria { hidden: "true" },
                      P.style { paddingRight: "6px" }] []

directionBtn :: forall props. { googleMap :: String | props } -> ReactElement
directionBtn props = D.button [ P.className "btn btn-primary", P.onClick (\_ -> windowOpen props.googleMap)] [ directionIcon, D.text "Directions" ]

direction :: forall props. { googleMap :: String | props } -> ReactElement
direction props = D.div [ P.className "btn-group p2" ] [ directionBtn props ]

dirUI :: forall props. { googleMap :: String,
                         telNumber :: String,
                         isPCP :: Boolean,
                         overridePCP :: Boolean | props } 
-> ReactElement
dirUI props = case (props.isPCP && props.overridePCP) of
               true -> ui
               false -> ire
  where
    ui = D.div [ P.className "row pharmacy-detail-cta", P.style { paddingTop: "5px"}] 
         [ D.div [ P.className "col-xs-12"] 
           [ D.div [ P.className "btn-group btn-group-justified"] [call props, direction props, schedule]]]


