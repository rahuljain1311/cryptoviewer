module Pharmacy.Timing where

import Prelude
import React.DOM as D
import React.DOM.Props as P
import React (ReactElement)
import Utils.Helpers (ire)
import Data.Maybe
import Data.Nullable (toMaybe, Nullable)
import Control.Monad.Eff.Unsafe (unsafePerformEff)
import Native (isOpen)

openStatus :: forall props. { hours :: Array { startTime :: Int, endTime :: Int, day :: String | props } | props } -> ReactElement
openStatus props = D.span [P.className "text-left", P.style { position: "relative", top: "-4px"}] [ D.text status]
  where 
    open' = isOpen props.hours
    status = if open'
             then "Open now"
             else "Closed"

pharmacyTime :: forall props. { start :: Int, end :: Int | props } -> ReactElement
pharmacyTime props = D.p [ P.className "pull-right text-right", 
                           P.style { position: "relative", top: "4px"
                                   } 
                         ] 
                     [ D.text "Approx. wait time:", 
                       D.span [P.className timeLevel ] [ D.text timeContent ]]
  where
    timeContent = " " <> show (props.start) <> " - " <> show (props.end) <> " mins"
    timeLevel = timeClass props.end

iconDiv :: ReactElement
iconDiv = D.i [ P.className "fa fa-clock-o fa-2x icon-pat-grey",  P.aria { hidden: "true"}] []


-- timing :: forall props. { hours :: Array { startTime :: Int, endTime :: Int, day :: String | props }, waitTime :: { start :: Int, end :: Int | props } | props } -> ReactElement
timing props = D.div [P.className "col-xs-6"] 
               [iconDiv, openStatus props, timeUi]
  where
    open' = isOpen props.hours
    timeUi = if not (props.waitTime.start == -1) && open'
             then pharmacyTime props.waitTime
             else ire


timeClass :: Int -> String
timeClass time | time <= 10 = "time-lower"
               | time <= 20 = "time-higher"
               | otherwise = "time-danger"
