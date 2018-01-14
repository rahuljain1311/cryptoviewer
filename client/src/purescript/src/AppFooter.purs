module AppFooter (appFooterRE) where

import Prelude
import React.DOM as D
import React.DOM.Props as P
import React (ReactClass, createClassStateless, ReactElement, createFactory)

appContent :: ReactElement
appContent = D.div [ P.className "col-xs-7", P.style {fontSize: "9px"}] [D.text "The", D.strong' [D.text " ACME Insurance Member App "], D.text "helps you make the most of no-cost preventative care for your family."]

appLogo :: ReactElement
appLogo = D.div [ P.className "col-xs-5"] [ D.img [ P.src "../../static/images/appStore.png", P.className "img-responsive"] []]

appUi :: ReactElement
appUi = D.div [ P.className "container app-footer" ] [ D.div [P.className "row"] [appContent, appLogo]]

appFooter :: forall props. ReactClass { | props }
appFooter = createClassStateless \props -> ui props
  where
    ui props = appUi


appFooterRE :: ReactElement
appFooterRE = createFactory appFooter {}
