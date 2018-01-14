module SummaryHeader (summaryHeader) where

import Prelude
import React.DOM as D
import React.DOM.Props as P
import Data.Maybe
import Data.Nullable (toMaybe, Nullable)
import Utils.Class
import Data.Tuple
import Control.Monad.Eff (Eff)
import React (ReactClass, createClassStateless, ReactElement, createFactory, ReactProps, ReactRefs, Read, ReactState, Write, ReadWrite)

header1 :: ReactElement
header1 = D.div [P.className "row"] 
          [D.div [P.className "col-xs-12 text-center flu-header"] 
           [D.p [] [D.text "FLU PREVENTION SUMMARY"]]]

header2 :: forall props. { landingPageGreeting :: String | props } -> ReactElement
header2 props = D.div [P.className "row"] 
                [D.div [P.className "col-xs-12 text-center lighter"] 
                 [D.p [] [D.text props.landingPageGreeting]]]

plan :: forall props. { coverage :: String | props } -> ReactElement
plan props = D.div [P.className "row"] 
             [D.div [P.className "col-xs-8 flu-subheader"] 
              [D.p [] [D.text "Your plan should cover:"]]
             , D.div [P.className "col-xs-4 amount"] [D.text props.coverage]]

owe :: forall props. { youOwe :: String | props } -> ReactElement
owe props =  D.div [P.className "row"] 
             [D.div [P.className "col-xs-8 flu-subheader"] 
              [D.p [] [D.text "You owe:"]]
             , D.div [P.className "col-xs-4 amount"] [D.text props.youOwe]]

planSummary :: forall props. { youOwe :: String, coverage :: String | props } -> ReactElement
planSummary  props = D.div [P.className "container plan-summary"] [plan props, owe props]

summaryHeader :: forall props. { youOwe :: String, coverage :: String, landingPageGreeting :: String | props } -> ReactElement
summaryHeader props = D.div [P.className "container flu-summary"] [header1, header2 props, planSummary props]
