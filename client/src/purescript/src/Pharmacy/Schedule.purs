module Pharmacy.Schedule where

import Prelude
import React.DOM as D
import React.DOM.Props as P
import React (ReactElement)
import Utils.Helpers (ire)
import Data.Maybe
import Data.Nullable (toMaybe, Nullable)
import Control.Monad.Eff.Unsafe (unsafePerformEff)
import Native (timeString)
import Utils.Class
import Data.Tuple

iconUi :: ReactElement
iconUi = D.div [P.className "col-xs-1", P.style { color: "#ACB0B2"}] 
         [ D.i [P.className "fa fa-calendar-o fa-2x", P.aria { hidden: "true"}] 
           []
         ]

schedule :: forall props. {
  pcpScheduled :: Nullable {
     scheduled :: Boolean,
     time :: String | props
  },
  isPCP :: Boolean
  | props
} -> ReactElement
schedule props = case (Tuple pcpScheduled' props.isPCP) of
                   (Tuple Nothing  _) -> ire
                   (Tuple _ false) -> ire
                   (Tuple (Just sch) _) -> containerUI sch
  where
    pcpScheduled' = toMaybe props.pcpScheduled
    containerUI sch = D.div [ P.className (classNames [tclass "row", Tuple "collapse" (not sch.scheduled)])] [iconUi, timeUi sch] 
    timeUi sch = D.div [P.className "col-xs-11"] 
             [ D.p [ P.style { lineHeight: "26px"}] [D.text (appointment sch)]]
    appointment sch = "Appointment scheduled for " <> timeString (sch.time) "hh:mm A" <> " on " <> timeString (sch.time) "MMM Do"
