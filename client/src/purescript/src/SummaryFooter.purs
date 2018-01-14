module SummaryFooter (summaryFooter) where

import Prelude
import React.DOM as D
import React.DOM.Props as P
import React (ReactClass, createClassStateless, ReactElement, createFactory, ReactProps, ReactRefs, Read, ReactState, Write, ReadWrite, Event)
import Control.Monad.Eff (Eff)
import Data.Array (mapWithIndex)

type ReactEff e = ( props :: ReactProps, refs :: ReactRefs (read :: Read), state :: ReactState ReadWrite | e)

summaryFooter :: forall props eff a. { 
  routeToUrl :: String -> Eff (ReactEff eff) a,
  insuranceNo :: String,
  campaignNo :: String | props } -> ReactElement
summaryFooter props = D.div [P.className "container flu-home"] 
                      [D.div [P.className "row"] [D.div 
                                                  [P.className "col-xs-offset-1 col-xs-10", 
                                                   P.onClick (\_ -> props.routeToUrl url)] 
                                                  [footerContent]]]
  where
    url = "/profile/" <> props.insuranceNo <> "/" <> props.campaignNo

footerContent :: ReactElement
footerContent = D.p [] [D.text "Flu Prevention Homepage", 
                        D.span [P.className "glyphicon glyphicon-menu-right summary-right-arrow pull-right", 
                                P.aria { hidden: "true"}] []]
