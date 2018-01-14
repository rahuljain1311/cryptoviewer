module AskFooter where

import Prelude
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (log, CONSOLE)
import React.DOM as D
import React.DOM.Props as P
import Data.Unit (Unit, unit)
import React (ReactClass, createClassStateless)
import Utils.Class (classNames, tclass)
import Data.Tuple
import Native (getRouteValue)

type FooterState eff = { hideLearn :: Boolean, routeToUrl :: String -> Unit -> Eff eff Unit, msg :: String, link :: String, campaignNo :: String, insuranceNo :: String }

-- askFooter :: forall eff. ReactClass (FooterState eff)
askFooter = createClassStateless \props -> ui props
  where
    ui props = D.div [ P.className "container pharmacy-flu-help" ] 
               [ D.div [P.className "row"] 
                 [D.div [P.className (classNames [tclass "col-xs-12 text-center", Tuple "hide" props.hideLearn]), 
                         P.onClick \_ -> props.routeToUrl (getRouteValue props.link) ] 
                  [D.p [ ] [ D.text props.msg
                           , D.span [P.className "glyphicon glyphicon-menu-right right-arrow"
                                    , P.aria {hidden:true} ] [] ]]
                 , D.div [P.className "col-xs-12 text-center"] 
                   [D.p [ ] [D.text "Unsure about your symptoms?"]]]
               , D.div [P.className "row"] 
                 [D.div [P.className "col-xs-12 center-block text-center"] 
                  [D.button [P.className "btn btn-primary", P.onClick \_ -> props.routeToUrl ("/learn/" <> props.campaignNo <> "/" <> props.insuranceNo) ] 
                   [D.img [P.src "/static/images/fluQuestion.png"] [] , D.text "Ask Question"],
                   D.button [P.className "btn btn-primary", P.onClick \_ -> props.routeToUrl ("/learn/" <> props.campaignNo <> "/" <> props.insuranceNo) ] 
                   [D.i [P.className "fa fa-phone fa-lg", P.aria {hidden:true}] [],D.text "Nurse hotline"] ]] ]



