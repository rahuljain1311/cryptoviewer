module Pharmacy.Booking (distance, booking) where

import Prelude
import React.DOM as D
import React.DOM.Props as P
import React (ReactElement)
import Utils.Helpers (ire)
import Data.Maybe
import Data.Nullable (toMaybe, Nullable)
import Native (round)

distanceDiv :: forall props. { distance :: { value :: Number | props } | props } -> ReactElement
distanceDiv props = D.span [P.style {position: "relative", top: "-4px"}] [D.text (" " <> dist <> "miles")]
  where
    dist = show $ round props.distance.value 1

idiv :: ReactElement
idiv = D.i [P.className "fa fa-map-marker fa-2x icon-pat-grey", P.aria {hidden: "true"}] []

distance :: forall props. { distance :: { value :: Number | props } | props } -> ReactElement
distance props = D.div [P.className "col-xs-6"] [idiv, distanceDiv props]

booking :: forall props. { isWalkIn :: Boolean | props } -> ReactElement
booking props = D.div [P.className "col-xs-6 text-right", P.style {marginTop: "5px", marginBottom: "5px"}] [iconUi, walkinUI]
  where
    walkinType = if props.isWalkIn
                 then " Walk-In"
                 else "Appt. Only"
    walkinIcon = if props.isWalkIn
                 then " fa-blind fa-walk "
                 else " fa-calendar-check-o "
    walkinUI = D.span [P.style { position: "relative", top: "-4px"}] [D.text walkinType]
    iconUi = D.i [ P.className ("fa" <> walkinIcon <> "fa-2x icon-pat-grey"), P.aria {hidden: "true"}] []


