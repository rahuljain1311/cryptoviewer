module SummaryInformation (summaryInformation) where

import Prelude
import React.DOM as D
import React.DOM.Props as P
import React (ReactClass, createClassStateless, ReactElement, createFactory, ReactProps, ReactRefs, Read, ReactState, Write, ReadWrite, Event)
import Control.Monad.Eff (Eff)
import Data.Array (mapWithIndex)

type ReactEff e = ( props :: ReactProps, refs :: ReactRefs (read :: Read), state :: ReactState ReadWrite | e)

summaryInformation :: forall props eff a.
                { routeToUrl :: String
                             -> Eff (ReactEff eff) a
                , alert :: String | props
} -> ReactElement
summaryInformation props = D.div [P.className "container flu-find"] [alertDiv props, summaryRoute props]

summaryRoute :: forall props eff a.
                { routeToUrl :: String
                             -> Eff (ReactEff eff) a | props }
        -> ReactElement
summaryRoute props = D.div [P.className "row"] 
                     [D.div [P.className "col-xs-12"] 
                      [D.button [P.className "btn btn-primary btn-block", P.onClick (\_ -> props.routeToUrl "/pharmacy")] 
                       [D.i [P.className "fa fa-search", 
                             P.aria {hidden:"true"}, 
                             P.style {marginRight: "3px", position: "relative", "bottom": "1px"}] [], 
                        D.text "Find flu shots near me"]]]

alertDiv :: forall props. { alert :: String | props } -> ReactElement
alertDiv props = D.div [P.className "row"] [D.div [P.className "col-xs-12"] [D.p [] [D.text props.alert]]]
